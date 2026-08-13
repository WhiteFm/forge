from __future__ import annotations

import json
import re
import sys
from collections import defaultdict
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
WORKBOOK_SOURCE = ROOT / "tmp" / "spell-audit" / "spells-source.json"
PDF_SOURCE = Path(r"C:\Users\WhiteFm\Desktop\SRD_CC_v5.2.1.pdf")
OUTPUT = ROOT / "scripts" / "data" / "dnd55-spells.json"

SCHOOLS = (
    "Abjuration",
    "Conjuration",
    "Divination",
    "Enchantment",
    "Evocation",
    "Illusion",
    "Necromancy",
    "Transmutation",
)
DAMAGE_TYPES = (
    "Acid",
    "Bludgeoning",
    "Cold",
    "Fire",
    "Force",
    "Lightning",
    "Necrotic",
    "Piercing",
    "Poison",
    "Psychic",
    "Radiant",
    "Slashing",
    "Thunder",
)
NAME_CORRECTIONS = {
    "Acid SplASh": "Acid Splash",
    "Zona of truth": "Zone of Truth",
}
CURRENCY_TO_CP = {"CP": 1, "SP": 10, "EP": 50, "GP": 100, "PP": 1000, "None": 0, "": 0}


def clean_inline(value: object) -> str:
    return re.sub(r"\s+", " ", str(value or "")).strip()


def slug(value: str) -> str:
    normalized = value.lower().replace("’", "").replace("'", "")
    return re.sub(r"^_+|_+$", "", re.sub(r"[^a-z0-9]+", "_", normalized))


def as_bool(value: object) -> bool:
    return clean_inline(value).lower() in {"true", "yes", "1"}


def as_number(value: object, fallback: int = 0) -> int:
    try:
        return int(float(value))
    except (TypeError, ValueError):
        return fallback


def clean_pdf_body(value: str) -> str:
    value = value.replace("\u00ad", "")
    value = re.sub(r"([A-Za-z])\s*-\s*\n\s*([a-z])", r"\1\2", value)
    value = re.sub(r"([A-Za-z])\s+-\s+([a-z])", r"\1\2", value)
    value = re.sub(r"([A-Za-z])\s+([’'][a-z]+)", r"\1\2", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def parse_materials(value: str) -> tuple[list[dict[str, object]], str, bool]:
    raw = clean_pdf_body(value)
    if not raw or raw.lower() == "none":
        return [], "all", False
    raw = re.sub(r"(?<=\d),(?=\d)", "", raw)
    per_target = bool(re.match(r"for each of the spell[’']s targets,?\s*", raw, re.I) or re.search(r"\s+for each (?:corpse|target)\s*$", raw, re.I))
    raw = re.sub(r"^for each of the spell[’']s targets,?\s*", "", raw, flags=re.I)
    raw = re.sub(r",?\s*(?:all of )?which the spell consumes\b", "", raw, flags=re.I)
    raw = re.sub(r",?\s*which you and the target must wear for the duration\b", "", raw, flags=re.I)
    raw = re.sub(r",?\s*that the target must wear for the duration\b", "", raw, flags=re.I)
    raw = re.sub(r",?\s*such as\s+.*$", "", raw, flags=re.I)
    raw = re.sub(r",?\s*either\s+.*$", "", raw, flags=re.I)
    has_alternatives = bool(re.search(r"\s+or\s+", raw, re.I))
    if has_alternatives:
        parts = re.split(r"\s*,\s*(?:or\s+)?|\s+or\s+", raw, flags=re.I)
    else:
        raw = re.sub(r"\s+and\s+of\s+", " and a bit of ", raw, flags=re.I)
        raw = re.sub(r"\s+and\s+(?=attuned\b|that\b|the target\b)", " __KEEP_AND__ ", raw, flags=re.I)
        parts = re.split(
            r"\s*;\s*|\s*,\s*(?:and\s+)?(?=(?:a|an|the|some|one|two|three|four|five|six|seven|eight|nine|ten)\b)|\s*,\s+and\s+|\s+and\s+",
            raw,
            flags=re.I,
        )
    quantity_words = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10}
    result: list[dict[str, object]] = []
    for part in parts:
        part = clean_inline(part.replace("__KEEP_AND__", "and"))
        if not part:
            continue
        cost_match = re.search(r"\bworth(?: at least)?\s+([\d]+)\+?\s*(CP|SP|EP|GP|PP)(\s+each)?\b", part, re.I)
        leading_cost_match = re.match(r"^(?:one\s+)?([\d]+)\+?\s*(CP|SP|EP|GP|PP)\s+", part, re.I)
        if not cost_match and leading_cost_match:
            cost_match = leading_cost_match
        total_cost_cp = int(cost_match.group(1)) * CURRENCY_TO_CP[cost_match.group(2).upper()] if cost_match else 0
        each = bool(cost_match and (cost_match.lastindex or 0) >= 3 and cost_match.group(3))
        quantity = 1
        quantity_match = re.match(r"^(one|two|three|four|five|six|seven|eight|nine|ten)\s+", part, re.I)
        if quantity_match:
            quantity = quantity_words[quantity_match.group(1).lower()]
            part = part[quantity_match.end():]
        elif re.match(r"^a pair of\s+", part, re.I):
            quantity = 2
            part = re.sub(r"^a pair of\s+", "", part, flags=re.I)
        part = re.sub(r"^(?:a|an|the|some)\s+", "", part, flags=re.I)
        part = re.sub(r"^[\d]+\+?\s*(?:CP|SP|EP|GP|PP)\s+", "", part, flags=re.I)
        part = re.sub(r"\s+worth(?: at least)?\s+[\d]+\+?\s*(?:CP|SP|EP|GP|PP)(?:\s+each)?\b.*$", "", part, flags=re.I)
        part = re.sub(r"\s+valued at\s+[\d]+\+?\s*(?:CP|SP|EP|GP|PP)\b.*$", "", part, flags=re.I)
        part = re.sub(r"\s+and that is\s*$", "", part, flags=re.I)
        part = re.sub(r"\s+for each (?:corpse|target)\s*$", "", part, flags=re.I)
        part = clean_inline(part.strip(" ,—-"))
        if not part or part.lower() in {"none", "or", "all of"}:
            continue
        cost_cp = total_cost_cp if each or quantity == 1 else (total_cost_cp + quantity - 1) // quantity
        record = {"name": part, "quantity": quantity, "minimumCostCp": cost_cp}
        if not any(entry["name"].lower() == part.lower() for entry in result):
            result.append(record)
    if has_alternatives:
        known_costs = [int(entry["minimumCostCp"]) for entry in result if int(entry["minimumCostCp"]) > 0]
        if len(known_costs) == 1:
            for entry in result:
                if not entry["minimumCostCp"]:
                    entry["minimumCostCp"] = known_costs[0]
    return result, "any" if has_alternatives else "all", per_target


def parse_casting(value: str) -> dict[str, object]:
    raw = clean_inline(value)
    ritual = bool(re.search(r"\bor Ritual\b", raw, re.I))
    non_ritual = re.sub(r"\s+or Ritual\b", "", raw, flags=re.I).strip()
    lower = non_ritual.lower()
    if lower.startswith("reaction"):
        kind = "reaction"
    elif lower == "bonus action":
        kind = "bonus_action"
    elif lower.startswith("action"):
        kind = "action"
    elif "hour" in lower:
        kind = "hour"
    elif "minute" in lower:
        kind = "minute"
    else:
        kind = "special"
    match = re.search(r"\d+", non_ritual)
    return {
        "actionType": kind,
        "value": int(match.group()) if match else 1,
        "reactionTrigger": re.sub(r"^Reaction,?\s*", "", non_ritual, flags=re.I) if kind == "reaction" else "",
        "raw": raw,
        "ritual": ritual,
    }


def parse_range(value: str) -> dict[str, object]:
    raw = clean_inline(value)
    lower = raw.lower()
    if lower in {"self", "touch", "sight", "unlimited"}:
        return {"type": lower, "distanceFeet": 0, "distanceValue": 0, "distanceUnit": "feet", "raw": raw}
    match = re.search(r"[\d,]+", raw)
    amount = int(match.group().replace(",", "")) if match else 0
    if "mile" in lower:
        return {"type": "distance", "distanceFeet": amount * 5280, "distanceValue": amount, "distanceUnit": "miles", "raw": raw}
    if "feet" in lower or "foot" in lower:
        return {"type": "distance", "distanceFeet": amount, "distanceValue": amount, "distanceUnit": "feet", "raw": raw}
    return {"type": "special", "distanceFeet": 0, "distanceValue": 0, "distanceUnit": "feet", "raw": raw or "Special"}


def parse_duration(value: str) -> dict[str, object]:
    raw = clean_inline(value)
    concentration = raw.lower().startswith("concentration")
    normalized = re.sub(r"^Concentration,?\s*(?:up to\s+)?", "", raw, flags=re.I)
    lower = normalized.lower()
    if lower == "instantaneous":
        kind = "instant"
    elif lower == "until dispelled":
        kind = "until_dispelled"
    elif "round" in lower:
        kind = "rounds"
    elif "minute" in lower:
        kind = "minutes"
    elif "hour" in lower:
        kind = "hours"
    elif "day" in lower:
        kind = "days"
    else:
        kind = "special"
    match = re.search(r"\d+", normalized)
    return {"type": kind, "value": int(match.group()) if match else 1, "concentration": concentration, "raw": raw}


def parse_areas(shapes_value: object, sizes_value: object) -> list[dict[str, object]]:
    shapes = [part.strip() for part in clean_inline(shapes_value or "None").split(",") if part.strip()]
    raw_size = clean_inline(sizes_value or "None")
    dimensions = [
        {"value": int(match.group(1)), "kind": (match.group(2) or "size").lower()}
        for match in re.finditer(r"(\d+)-foot(?:-(radius|height|width|long|wide))?", raw_size, re.I)
    ]
    return [
        {
            "shape": "none" if shape.lower() == "none" else shape.lower(),
            "sizeFeet": (dimensions[index] if index < len(dimensions) else dimensions[0] if dimensions else {"value": 0})["value"],
            "rawShape": shape,
            "rawSize": raw_size,
            "dimensionsFeet": dimensions,
        }
        for index, shape in enumerate(shapes or ["None"])
    ]


def extract_rolls(description: str) -> tuple[list[dict[str, object]], list[dict[str, object]]]:
    damage: list[dict[str, object]] = []
    healing: list[dict[str, object]] = []
    damage_pattern = re.compile(
        rf"(?P<count>\d+)d(?P<sides>\d+)(?P<modifier>\s*[+−-]\s*\d+)?\s+(?P<type>{'|'.join(DAMAGE_TYPES)})\s+damage",
        re.I,
    )
    for match in damage_pattern.finditer(description):
        record = {
            "count": int(match.group("count")),
            "sides": int(match.group("sides")),
            "modifier": clean_inline(match.group("modifier")).replace("−", "-") or "",
            "damageType": match.group("type").lower(),
        }
        if record not in damage:
            damage.append(record)
    healing_pattern = re.compile(r"(?P<count>\d+)d(?P<sides>\d+)(?P<modifier>\s*[+−-]\s*[^.,;]{1,45})?.{0,90}?Hit Points", re.I)
    for match in healing_pattern.finditer(description):
        record = {
            "count": int(match.group("count")),
            "sides": int(match.group("sides")),
            "modifier": clean_inline(match.group("modifier")).replace("−", "-") if match.group("modifier") else "",
        }
        if record not in healing:
            healing.append(record)
    return damage, healing


def read_spell_entries(names: list[str]) -> tuple[dict[str, dict[str, object]], int]:
    reader = PdfReader(str(PDF_SOURCE))
    page_texts = [(page.extract_text() or "") for page in reader.pages]
    page_offsets: list[int] = []
    chunks: list[str] = []
    offset = 0
    for page_number, page_text in enumerate(page_texts, start=1):
        page_offsets.append(offset)
        marker = f"\n[[PDF_PAGE_{page_number}]]\n"
        chunks.append(marker)
        chunks.append(page_text)
        offset += len(marker) + len(page_text)
    text = "".join(chunks)
    start = text.find("Spell Descriptions", page_offsets[100])
    if start < 0:
        raise RuntimeError("Could not locate the SRD spell descriptions section")
    spell_text = text[start:]
    glossary_start = spell_text.find("\nRules Glossary")
    if glossary_start < 0:
        raise RuntimeError("Could not locate the end of the SRD spell descriptions section")
    school_pattern = "|".join(SCHOOLS)
    found: list[tuple[int, int, str, re.Match[str]]] = []
    for name in names:
        name_pattern = r"\s+".join(re.escape(part) for part in name.split())
        heading = re.compile(r"^" + name_pattern + rf"\s*(?:(?:Level\s+([1-9])\s+({school_pattern}))|(?:({school_pattern})\s+Cantrip))\s*\((.*?)\)", re.I | re.S | re.M)
        candidates = list(heading.finditer(spell_text))
        if not candidates:
            continue
        match = candidates[0]
        found.append((match.start(), match.end(), name, match))
    found.sort()
    entries: dict[str, dict[str, object]] = {}
    for index, (position, header_end, name, match) in enumerate(found):
        end = found[index + 1][0] if index + 1 < len(found) else glossary_start
        block = spell_text[header_end:end]
        stats = re.match(
            r"\s*Casting Time:\s*(.*?)\s+Range:\s*(.*?)\s+Components?:\s*(.*?)\s+Duration:\s*(.*?)\n(.*)",
            block,
            re.I | re.S,
        )
        if not stats:
            continue
        level = int(match.group(1)) if match.group(1) else 0
        school = (match.group(2) or match.group(3)).title()
        classes = [clean_inline(part) for part in re.split(r",", clean_inline(match.group(4))) if clean_inline(part)]
        casting_raw = clean_inline(stats.group(1))
        range_raw = clean_inline(stats.group(2))
        components_raw = clean_inline(stats.group(3))
        duration_raw = clean_inline(stats.group(4))
        description = clean_pdf_body(stats.group(5))
        page_number = 1
        absolute_position = start + position
        for candidate, candidate_offset in enumerate(page_offsets, start=1):
            if candidate_offset > absolute_position:
                break
            page_number = candidate
        material_match = re.search(r"\bM\s*\((.*)\)\s*$", components_raw, re.I)
        entries[name] = {
            "level": level,
            "school": school,
            "classes": classes,
            "castingTime": casting_raw,
            "range": range_raw,
            "components": components_raw,
            "materialText": clean_pdf_body(material_match.group(1)) if material_match else "",
            "duration": duration_raw,
            "description": description,
            "pdfPage": page_number,
        }
    return entries, len(reader.pages)


def main() -> None:
    source_rows = json.loads(WORKBOOK_SOURCE.read_text(encoding="utf-8"))
    for row in source_rows:
        row["Name"] = NAME_CORRECTIONS.get(row["Name"], row["Name"])
    names = sorted({clean_inline(row["Name"]) for row in source_rows}, key=str.casefold)
    srd_entries, pdf_pages = read_spell_entries(names)
    missing = sorted(set(names) - set(srd_entries), key=str.casefold)
    if missing:
        raise RuntimeError(f"Could not parse {len(missing)} SRD spell entries: {missing}")

    rows_by_name: dict[str, list[dict[str, object]]] = defaultdict(list)
    for row in source_rows:
        rows_by_name[clean_inline(row["Name"])].append(row)

    spells: list[dict[str, object]] = []
    material_usage: dict[str, dict[str, object]] = {}
    mismatch_counts = defaultdict(int)
    for name in names:
        workbook_rows = rows_by_name[name]
        srd = srd_entries[name]
        primary = max(workbook_rows, key=lambda row: len(clean_inline(row.get("Discription"))))
        for field, workbook_key in (("level", "Level"), ("school", "School"), ("castingTime", "Casting time"), ("range", "Range"), ("duration", "Duration")):
            workbook_value = 0 if clean_inline(primary.get(workbook_key)).lower() == "cantrip" else primary.get(workbook_key)
            if clean_inline(srd[field]).lower() != clean_inline(workbook_value).lower():
                mismatch_counts[field] += 1

        components_text = clean_inline(srd["components"])
        material_text = clean_inline(srd["materialText"])
        casting = parse_casting(str(srd["castingTime"]))
        duration = parse_duration(str(srd["duration"]))
        materials, material_selection_mode, material_per_target = parse_materials(material_text)
        quantity = max(1, as_number(primary.get("Count materials"), 1))
        currency = clean_inline(primary.get("Currency") or "None").upper()
        if currency not in CURRENCY_TO_CP:
            currency = "None"
        minimum_total_cost_cp = as_number(primary.get("Minimal Cost")) * CURRENCY_TO_CP[currency]
        consumed = bool(re.search(r"spell consumes", material_text, re.I))
        material_group = None
        if materials:
            entries = []
            for material_index, material in enumerate(materials):
                material_name = str(material["name"])
                item_id = f"srd52.item.{slug(material_name)}"
                item_quantity = int(material["quantity"]) if int(material["quantity"]) > 1 else quantity if len(materials) == 1 else 1
                item_cost = int(material["minimumCostCp"])
                if not item_cost and len(materials) == 1 and minimum_total_cost_cp:
                    item_cost = (minimum_total_cost_cp + item_quantity - 1) // item_quantity
                entries.append({"itemId": item_id, "quantity": item_quantity, "minimumCostCp": item_cost, "consumed": consumed})
                usage = material_usage.setdefault(item_id, {"id": item_id, "name": material_name, "usedBy": [], "costsCp": [], "consumed": False})
                usage["usedBy"].append(f"srd52.spell.{slug(name)}")
                if item_cost:
                    usage["costsCp"].append(item_cost)
                usage["consumed"] = bool(usage["consumed"] or consumed)
            material_group = {
                "id": f"srd52.spell.{slug(name)}.materials_1",
                "name": "Material Components",
                "sourceText": material_text,
                "minimumTotalCostCp": minimum_total_cost_cp,
                "sourceCurrency": currency,
                "consumed": consumed,
                "selectionMode": material_selection_mode,
                "perTarget": material_per_target,
                "entries": entries,
            }
            computed_costs = [int(entry["minimumCostCp"]) * int(entry["quantity"]) for entry in entries]
            if computed_costs:
                material_group["minimumTotalCostCp"] = min(computed_costs) if material_selection_mode == "any" else sum(computed_costs)

        damage_rolls, healing_rolls = extract_rolls(str(srd["description"]))
        source_profiles = []
        for row in workbook_rows:
            source_profiles.append({
                "sheet": clean_inline(row.get("Source Sheet")),
                "category": clean_inline(row.get("Type Spell") or row.get("Source Sheet")).lower(),
                "workbookDice": {
                    "initialCount": as_number(row.get("Count Dices")),
                    "initialDie": clean_inline(row.get("Type Dices")),
                    "periodicCount": as_number(row.get("Round count dices")),
                    "periodicDie": clean_inline(row.get("Round dices")),
                    "periodRounds": as_number(row.get("Round count")),
                },
            })
        categories = sorted({profile["category"] for profile in source_profiles})
        spell = {
            "id": f"srd52.spell.{slug(name)}",
            "name": name,
            "description": srd["description"],
            "level": srd["level"],
            "schoolId": f"wsg.ref.value.spell_school.{str(srd['school']).lower()}",
            "classIds": sorted({f"srd52.class.{slug(class_name)}" for class_name in srd["classes"]}),
            "ritual": bool(casting.pop("ritual")),
            "casting": casting,
            "range": parse_range(str(srd["range"])),
            "duration": duration,
            "areas": parse_areas(primary.get("Areas"), primary.get("Areas size")),
            "components": {
                "verbal": bool(re.search(r"(?:^|,)\s*V(?:,|$)", components_text)),
                "somatic": bool(re.search(r"(?:^|,)\s*S(?:,|$)", components_text)),
                "material": bool(re.search(r"(?:^|,)\s*M(?:\s*\(|,|$)", components_text)),
                "materialText": material_text,
                "materialCostCp": minimum_total_cost_cp,
                "materialConsumed": consumed,
                "raw": components_text,
            },
            "materialGroups": [material_group] if material_group else [],
            "categories": categories,
            "profiles": source_profiles,
            "damageRolls": damage_rolls,
            "healingRolls": healing_rolls,
            "higherLevel": {"enabled": bool(re.search(r"(?:Higher-Level Spell Slot|Cantrip Upgrade)", str(srd["description"]), re.I))},
            "sourceRows": [{"sheet": clean_inline(row.get("Source Sheet")), "row": as_number(row.get("Source Row"))} for row in workbook_rows],
            "srdPage": srd["pdfPage"],
        }
        spells.append(spell)

    materials = []
    for material in sorted(material_usage.values(), key=lambda item: str(item["name"]).casefold()):
        costs = sorted(set(material.pop("costsCp")))
        materials.append({
            **material,
            "usedBy": sorted(set(material["usedBy"])),
            "costCp": min(costs) if costs else 0,
            "knownCostsCp": costs,
        })

    output = {
        "schemaVersion": "2.0.0",
        "sources": {
            "workbook": "DnD 5.5 Spells.xlsm",
            "srd": "SRD_CC_v5.2.1.pdf",
            "srdVersion": "5.2.1",
            "srdPages": pdf_pages,
        },
        "stats": {"spells": len(spells), "materialItems": len(materials), "sourceRows": len(source_rows)},
        "audit": {
            "duplicateWorkbookRows": len(source_rows) - len(spells),
            "canonicalNameCorrections": NAME_CORRECTIONS,
            "workbookMetadataMismatches": dict(sorted(mismatch_counts.items())),
        },
        "spells": spells,
        "materials": materials,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"output": str(OUTPUT), **output["stats"], **output["audit"]}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(str(error), file=sys.stderr)
        raise
