from __future__ import annotations

import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "scripts" / "data" / "dnd55-spells.json"
CACHE = ROOT / "tmp" / "spell-audit" / "translations-ru-cache.json"
OUTPUT = ROOT / "scripts" / "data" / "dnd55-spells-ru.json"
DELIMITER = "[[[WSG_SPLIT_9F3E]]]"


def normalize_terms(value: str) -> str:
    replacements = (
        (r"\b[Хх]ит[- ]?поинт(?:ы|ов|ам|ами|ах)?\b", "Очки здоровья"),
        (r"\b[Оо]чк(?:и|ов|ам|ами|ах) [Жж]изни\b", "Очки здоровья"),
        (r"\b[Кк]ласс [Бб]рони\b", "Класс защиты"),
        (r"\b[Сс]пасательн(?:ый|ого|ому|ым|ом|ая|ой|ую|ые|ых|ыми) брос(?:ок|ка|ку|ком|ке|ки|ков|кам|ками|ках)\b", "спасбросок"),
        (r"\b[Пп]ровер(?:ка|ки|ку|кой|ке) спасения\b", "спасбросок"),
        (r"\b[Яя]чейк(?:а|и|у|ой|е) заклинания\b", "ячейка заклинаний"),
        (r"\b[Дд]лительн(?:ый|ого|ому|ым|ом) отдых\b", "долгий отдых"),
        (r"\b[Кк]ратк(?:ий|ого|ому|им|ом) отдых\b", "короткий отдых"),
    )
    for pattern, replacement in replacements:
        value = re.sub(pattern, replacement, value)
    value = value.replace("класс сложности", "сложность").replace("Класс сложности", "Сложность")
    return value.strip()


def translate(value: str) -> str:
    if not value.strip():
        return ""
    if len(value) > 4200:
        sentences = re.split(r"(?<=[.!?])\s+", value)
        chunks: list[str] = []
        current = ""
        for sentence in sentences:
            candidate = f"{current} {sentence}".strip()
            if current and len(candidate) > 4000:
                chunks.append(current)
                current = sentence
            else:
                current = candidate
        if current:
            chunks.append(current)
        return normalize_terms(" ".join(translate(chunk) for chunk in chunks))
    query = urllib.parse.urlencode({"client": "gtx", "sl": "en", "tl": "ru", "dt": "t", "q": value})
    request = urllib.request.Request(
        "https://translate.googleapis.com/translate_a/single?" + query,
        headers={"User-Agent": "Mozilla/5.0 WSGuild-Forge/1.0"},
    )
    last_error: Exception | None = None
    for attempt in range(5):
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                payload = json.loads(response.read().decode("utf-8"))
            return normalize_terms("".join(chunk[0] for chunk in payload[0] if chunk and chunk[0]))
        except Exception as error:  # pragma: no cover - network retry path
            last_error = error
            time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"Translation failed after retries: {last_error}")


def save_cache(cache: dict[str, object]) -> None:
    CACHE.parent.mkdir(parents=True, exist_ok=True)
    CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    source = json.loads(SOURCE.read_text(encoding="utf-8"))
    cache = json.loads(CACHE.read_text(encoding="utf-8")) if CACHE.exists() else {"spells": {}, "materials": {}}
    spell_cache: dict[str, object] = cache.setdefault("spells", {})
    material_cache: dict[str, object] = cache.setdefault("materials", {})

    for index, spell in enumerate(source["spells"], start=1):
        spell_id = spell["id"]
        if spell_id not in spell_cache:
            source_fields = [
                spell["name"],
                spell["description"],
                spell["casting"]["raw"],
                spell["range"]["raw"],
                spell["duration"]["raw"],
                spell["components"]["materialText"],
            ]
            combined_source = ("\n" + DELIMITER + "\n").join(source_fields)
            try:
                translated = translate(combined_source) if len(combined_source) < 6500 else ""
            except RuntimeError:
                translated = ""
            fields = [normalize_terms(field) for field in re.split(rf"\s*{re.escape(DELIMITER)}\s*", translated)] if translated else []
            if len(fields) != len(source_fields):
                fields = [translate(field) for field in source_fields]
            spell_cache[spell_id] = {
                "name": fields[0],
                "description": fields[1],
                "castingRaw": fields[2],
                "rangeRaw": fields[3],
                "durationRaw": fields[4],
                "materialText": fields[5],
            }
            save_cache(cache)
        if index % 20 == 0:
            print(f"Translated spells: {index}/{len(source['spells'])}")

    for index, material in enumerate(source["materials"], start=1):
        material_id = material["id"]
        if material_id not in material_cache:
            material_cache[material_id] = {"name": translate(material["name"])}
            save_cache(cache)
        if index % 25 == 0:
            print(f"Translated materials: {index}/{len(source['materials'])}")

    spell_output = {spell["id"]: spell_cache[spell["id"]] for spell in source["spells"]}
    material_output = {material["id"]: material_cache[material["id"]] for material in source["materials"]}
    output = {
        "schemaVersion": "1.0.0",
        "sourceSchemaVersion": source["schemaVersion"],
        "locale": "ru",
        "stats": {"spells": len(spell_output), "materialItems": len(material_output)},
        "spells": spell_output,
        "materials": material_output,
    }
    OUTPUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"output": str(OUTPUT), **output["stats"]}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
