from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

import pdfplumber


ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / "tmp" / "pdfs" / "SRD_CC_v5.2.1.pdf"
SPELLS = ROOT / "scripts" / "data" / "dnd55-spells.json"
OUTPUT = ROOT / "src" / "srd-items.generated.json"


def cp(value: str | int | float) -> float:
    if isinstance(value, (int, float)):
        return float(value)
    amount, unit = value.replace(",", "").split()
    return float(amount) * {"CP": 1, "SP": 10, "EP": 50, "GP": 100, "PP": 1000}[unit]


def number(value: str) -> float:
    value = value.strip().replace("lb.", "").replace("mph", "").replace(",", "")
    value = value.replace("½", ".5").replace("¼", ".25")
    if "/" in value:
        left, right = value.split("/", 1)
        return float(left) / float(right)
    return float(value)


def item(name: str, category: str, cost: str | int | float = 0, weight: str | int | float = 0, **extra: Any) -> dict[str, Any]:
    result: dict[str, Any] = {
        "name": name,
        "category": category,
        "quantity": 1,
        "unit": "piece",
        "costCp": cp(cost),
        "weightLb": number(str(weight)) if weight not in (None, "", "—", "Varies") else 0,
        "source": "SRD 5.2.1",
    }
    result.update(extra)
    return result


WEAPONS = [
    ("Club", "Simple", "Melee", "1d4", "Bludgeoning", "Light", "Slow", "2", "1 SP"),
    ("Dagger", "Simple", "Melee", "1d4", "Piercing", "Finesse, Light, Thrown (Range 20/60)", "Nick", "1", "2 GP"),
    ("Greatclub", "Simple", "Melee", "1d8", "Bludgeoning", "Two-Handed", "Push", "10", "2 SP"),
    ("Handaxe", "Simple", "Melee", "1d6", "Slashing", "Light, Thrown (Range 20/60)", "Vex", "2", "5 GP"),
    ("Javelin", "Simple", "Melee", "1d6", "Piercing", "Thrown (Range 30/120)", "Slow", "2", "5 SP"),
    ("Light Hammer", "Simple", "Melee", "1d4", "Bludgeoning", "Light, Thrown (Range 20/60)", "Nick", "2", "2 GP"),
    ("Mace", "Simple", "Melee", "1d6", "Bludgeoning", "", "Sap", "4", "5 GP"),
    ("Quarterstaff", "Simple", "Melee", "1d6", "Bludgeoning", "Versatile (1d8)", "Topple", "4", "2 SP"),
    ("Sickle", "Simple", "Melee", "1d4", "Slashing", "Light", "Nick", "2", "1 GP"),
    ("Spear", "Simple", "Melee", "1d6", "Piercing", "Thrown (Range 20/60), Versatile (1d8)", "Sap", "3", "1 GP"),
    ("Dart", "Simple", "Ranged", "1d4", "Piercing", "Finesse, Thrown (Range 20/60)", "Vex", ".25", "5 CP"),
    ("Light Crossbow", "Simple", "Ranged", "1d8", "Piercing", "Ammunition (Range 80/320; Bolt), Loading, Two-Handed", "Slow", "5", "25 GP"),
    ("Shortbow", "Simple", "Ranged", "1d6", "Piercing", "Ammunition (Range 80/320; Arrow), Two-Handed", "Vex", "2", "25 GP"),
    ("Sling", "Simple", "Ranged", "1d4", "Bludgeoning", "Ammunition (Range 30/120; Bullet)", "Slow", "0", "1 SP"),
    ("Battleaxe", "Martial", "Melee", "1d8", "Slashing", "Versatile (1d10)", "Topple", "4", "10 GP"),
    ("Flail", "Martial", "Melee", "1d8", "Bludgeoning", "", "Sap", "2", "10 GP"),
    ("Glaive", "Martial", "Melee", "1d10", "Slashing", "Heavy, Reach, Two-Handed", "Graze", "6", "20 GP"),
    ("Greataxe", "Martial", "Melee", "1d12", "Slashing", "Heavy, Two-Handed", "Cleave", "7", "30 GP"),
    ("Greatsword", "Martial", "Melee", "2d6", "Slashing", "Heavy, Two-Handed", "Graze", "6", "50 GP"),
    ("Halberd", "Martial", "Melee", "1d10", "Slashing", "Heavy, Reach, Two-Handed", "Cleave", "6", "20 GP"),
    ("Lance", "Martial", "Melee", "1d10", "Piercing", "Heavy, Reach, Two-Handed (unless mounted)", "Topple", "6", "10 GP"),
    ("Longsword", "Martial", "Melee", "1d8", "Slashing", "Versatile (1d10)", "Sap", "3", "15 GP"),
    ("Maul", "Martial", "Melee", "2d6", "Bludgeoning", "Heavy, Two-Handed", "Topple", "10", "10 GP"),
    ("Morningstar", "Martial", "Melee", "1d8", "Piercing", "", "Sap", "4", "15 GP"),
    ("Pike", "Martial", "Melee", "1d10", "Piercing", "Heavy, Reach, Two-Handed", "Push", "18", "5 GP"),
    ("Rapier", "Martial", "Melee", "1d8", "Piercing", "Finesse", "Vex", "2", "25 GP"),
    ("Scimitar", "Martial", "Melee", "1d6", "Slashing", "Finesse, Light", "Nick", "3", "25 GP"),
    ("Shortsword", "Martial", "Melee", "1d6", "Piercing", "Finesse, Light", "Vex", "2", "10 GP"),
    ("Trident", "Martial", "Melee", "1d8", "Piercing", "Thrown (Range 20/60), Versatile (1d10)", "Topple", "4", "5 GP"),
    ("Warhammer", "Martial", "Melee", "1d8", "Bludgeoning", "Versatile (1d10)", "Push", "5", "15 GP"),
    ("War Pick", "Martial", "Melee", "1d8", "Piercing", "Versatile (1d10)", "Sap", "2", "5 GP"),
    ("Whip", "Martial", "Melee", "1d4", "Slashing", "Finesse, Reach", "Slow", "3", "2 GP"),
    ("Blowgun", "Martial", "Ranged", "1", "Piercing", "Ammunition (Range 25/100; Needle), Loading", "Vex", "1", "10 GP"),
    ("Hand Crossbow", "Martial", "Ranged", "1d6", "Piercing", "Ammunition (Range 30/120; Bolt), Light, Loading", "Vex", "3", "75 GP"),
    ("Heavy Crossbow", "Martial", "Ranged", "1d10", "Piercing", "Ammunition (Range 100/400; Bolt), Heavy, Loading, Two-Handed", "Push", "18", "50 GP"),
    ("Longbow", "Martial", "Ranged", "1d8", "Piercing", "Ammunition (Range 150/600; Arrow), Heavy, Two-Handed", "Slow", "2", "50 GP"),
    ("Musket", "Martial", "Ranged", "1d12", "Piercing", "Ammunition (Range 40/120; Bullet), Loading, Two-Handed", "Slow", "10", "500 GP"),
    ("Pistol", "Martial", "Ranged", "1d10", "Piercing", "Ammunition (Range 30/90; Bullet), Loading", "Vex", "3", "250 GP"),
]


ARMOR = [
    ("Padded Armor", "Light Armor", 11, "Full modifier", 0, True, 8, "5 GP"),
    ("Leather Armor", "Light Armor", 11, "Full modifier", 0, False, 10, "10 GP"),
    ("Studded Leather Armor", "Light Armor", 12, "Full modifier", 0, False, 13, "45 GP"),
    ("Hide Armor", "Medium Armor", 12, "Maximum +2", 0, False, 12, "10 GP"),
    ("Chain Shirt", "Medium Armor", 13, "Maximum +2", 0, False, 20, "50 GP"),
    ("Scale Mail", "Medium Armor", 14, "Maximum +2", 0, True, 45, "50 GP"),
    ("Breastplate", "Medium Armor", 14, "Maximum +2", 0, False, 20, "400 GP"),
    ("Half Plate Armor", "Medium Armor", 15, "Maximum +2", 0, True, 40, "750 GP"),
    ("Ring Mail", "Heavy Armor", 14, "None", 0, True, 40, "30 GP"),
    ("Chain Mail", "Heavy Armor", 16, "None", 13, True, 55, "75 GP"),
    ("Splint Armor", "Heavy Armor", 17, "None", 15, True, 60, "200 GP"),
    ("Plate Armor", "Heavy Armor", 18, "None", 15, True, 65, "1500 GP"),
    ("Shield", "Shield", 2, "None", 0, False, 6, "10 GP"),
]


AMMUNITION = [
    ("Arrow", 20, "Quiver", 1, "1 GP"),
    ("Crossbow Bolt", 20, "Case, Crossbow Bolt", 1.5, "1 GP"),
    ("Firearm Bullet", 10, "Pouch", 2, "3 GP"),
    ("Sling Bullet", 20, "Pouch", 1.5, "4 CP"),
    ("Blowgun Needle", 50, "Pouch", 1, "1 GP"),
]


FOCUSES = [
    ("Arcane Focus, Crystal", 1, "10 GP"), ("Arcane Focus, Orb", 3, "20 GP"),
    ("Arcane Focus, Rod", 2, "10 GP"), ("Arcane Focus, Staff", 4, "5 GP"), ("Arcane Focus, Wand", 1, "10 GP"),
    ("Druidic Focus, Sprig of Mistletoe", 0, "1 GP"), ("Druidic Focus, Wooden Staff", 4, "5 GP"), ("Druidic Focus, Yew Wand", 1, "10 GP"),
    ("Holy Symbol, Amulet", 1, "5 GP"), ("Holy Symbol, Emblem", 0, "5 GP"), ("Holy Symbol, Reliquary", 2, "5 GP"),
]


GEAR = [
    ("Acid", 1, "25 GP"), ("Alchemist’s Fire", 1, "50 GP"), ("Antitoxin", 0, "50 GP"),
    ("Backpack", 5, "2 GP"), ("Ball Bearings", 2, "1 GP", 1000), ("Barrel", 70, "2 GP"),
    ("Basket", 2, "4 SP"), ("Bedroll", 7, "1 GP"), ("Bell", 0, "1 GP"), ("Blanket", 3, "5 SP"),
    ("Block and Tackle", 5, "1 GP"), ("Book", 5, "25 GP"), ("Bottle, Glass", 2, "2 GP"),
    ("Bucket", 2, "5 CP"), ("Burglar’s Pack", 42, "16 GP"), ("Caltrop", 2, "1 GP", 20),
    ("Candle", 0, "1 CP"), ("Case, Crossbow Bolt", 1, "1 GP"), ("Case, Map or Scroll", 1, "1 GP"),
    ("Chain", 10, "5 GP"), ("Chest", 25, "5 GP"), ("Climber’s Kit", 12, "25 GP"),
    ("Clothes, Fine", 6, "15 GP"), ("Clothes, Traveler’s", 4, "2 GP"), ("Component Pouch", 2, "25 GP"),
    ("Costume", 4, "5 GP"), ("Crowbar", 5, "2 GP"), ("Diplomat’s Pack", 39, "39 GP"),
    ("Dungeoneer’s Pack", 55, "12 GP"), ("Entertainer’s Pack", 58.5, "40 GP"), ("Explorer’s Pack", 55, "10 GP"),
    ("Flask", 1, "2 CP"), ("Grappling Hook", 4, "2 GP"), ("Healer’s Kit", 3, "5 GP"),
    ("Holy Water", 1, "25 GP"), ("Hunting Trap", 25, "5 GP"), ("Ink", 0, "10 GP"),
    ("Ink Pen", 0, "2 CP"), ("Jug", 4, "2 CP"), ("Ladder", 25, "1 SP"), ("Lamp", 1, "5 SP"),
    ("Lantern, Bullseye", 2, "10 GP"), ("Lantern, Hooded", 2, "5 GP"), ("Lock", 1, "10 GP"),
    ("Magnifying Glass", 0, "100 GP"), ("Manacles", 6, "2 GP"), ("Map", 0, "1 GP"), ("Mirror", .5, "5 GP"),
    ("Net", 3, "1 GP"), ("Oil", 1, "1 SP"), ("Paper", 0, "2 SP"), ("Parchment", 0, "1 SP"),
    ("Perfume", 0, "5 GP"), ("Poison, Basic", 0, "100 GP"), ("Pole", 7, "5 CP"), ("Pot, Iron", 10, "2 GP"),
    ("Potion of Healing", .5, "50 GP"), ("Pouch", 1, "5 SP"), ("Priest’s Pack", 29, "33 GP"),
    ("Quiver", 1, "1 GP"), ("Ram, Portable", 35, "4 GP"), ("Rations", 2, "5 SP"), ("Robe", 4, "1 GP"),
    ("Rope", 5, "1 GP"), ("Sack", .5, "1 CP"), ("Scholar’s Pack", 22, "40 GP"), ("Shovel", 5, "2 GP"),
    ("Signal Whistle", 0, "5 CP"), ("Spell Scroll (Cantrip)", 0, "30 GP"), ("Spell Scroll (Level 1)", 0, "50 GP"),
    ("Spike, Iron", 5, "1 GP", 10), ("Spyglass", 1, "1000 GP"), ("String", 0, "1 SP", 10),
    ("Tent", 20, "2 GP"), ("Tinderbox", 1, "5 SP"), ("Torch", 1, "1 CP"), ("Vial", 0, "1 GP"),
    ("Waterskin", 5, "2 SP"),
]


PACKS: dict[str, list[tuple[str, float]]] = {
    "Burglar’s Pack": [("Backpack", 1), ("Ball Bearings", 1000), ("Bell", 1), ("Candle", 10), ("Crowbar", 1), ("Lantern, Hooded", 1), ("Oil", 7), ("Rations", 5), ("Rope", 1), ("Tinderbox", 1), ("Waterskin", 1)],
    "Diplomat’s Pack": [("Chest", 1), ("Clothes, Fine", 1), ("Ink", 1), ("Ink Pen", 5), ("Lamp", 1), ("Case, Map or Scroll", 2), ("Oil", 4), ("Paper", 5), ("Parchment", 5), ("Perfume", 1), ("Tinderbox", 1)],
    "Dungeoneer’s Pack": [("Backpack", 1), ("Caltrop", 20), ("Crowbar", 1), ("Oil", 2), ("Rations", 10), ("Rope", 1), ("Tinderbox", 1), ("Torch", 10), ("Waterskin", 1)],
    "Entertainer’s Pack": [("Backpack", 1), ("Bedroll", 1), ("Bell", 1), ("Lantern, Bullseye", 1), ("Costume", 3), ("Mirror", 1), ("Oil", 8), ("Rations", 9), ("Tinderbox", 1), ("Waterskin", 1)],
    "Explorer’s Pack": [("Backpack", 1), ("Bedroll", 1), ("Oil", 2), ("Rations", 10), ("Rope", 1), ("Tinderbox", 1), ("Torch", 10), ("Waterskin", 1)],
    "Priest’s Pack": [("Backpack", 1), ("Blanket", 1), ("Holy Water", 1), ("Lamp", 1), ("Rations", 7), ("Robe", 1), ("Tinderbox", 1)],
    "Scholar’s Pack": [("Backpack", 1), ("Book", 1), ("Ink", 1), ("Ink Pen", 1), ("Lamp", 1), ("Oil", 10), ("Parchment", 10), ("Tinderbox", 1)],
}


TOOLS = [
    ("Alchemist’s Supplies", "Intelligence", 8, "50 GP", "Identify a substance (DC 15), or start a fire (DC 15)", "Acid; Alchemist’s Fire; Component Pouch; Oil; Paper; Perfume"),
    ("Brewer’s Supplies", "Intelligence", 9, "20 GP", "Detect poisoned drink (DC 15), or identify alcohol (DC 10)", "Antitoxin"),
    ("Calligrapher’s Supplies", "Dexterity", 5, "10 GP", "Write text with impressive flourishes that guard against forgery (DC 15)", "Ink; Spell Scroll"),
    ("Carpenter’s Tools", "Strength", 6, "8 GP", "Seal or pry open a door or container (DC 20)", "Club; Greatclub; Quarterstaff; Barrel; Chest; Ladder; Pole; Portable Ram; Torch"),
    ("Cartographer’s Tools", "Wisdom", 6, "15 GP", "Draft a map of a small area (DC 15)", "Map"),
    ("Cobbler’s Tools", "Dexterity", 5, "5 GP", "Modify footwear to give Advantage on the wearer’s next Dexterity (Acrobatics) check (DC 10)", "Climber’s Kit"),
    ("Cook’s Utensils", "Wisdom", 8, "1 GP", "Improve food’s flavor (DC 10), or detect spoiled or poisoned food (DC 15)", "Rations"),
    ("Glassblower’s Tools", "Intelligence", 5, "30 GP", "Discern what a glass object held in the past 24 hours (DC 15)", "Glass Bottle; Magnifying Glass; Spyglass; Vial"),
    ("Jeweler’s Tools", "Intelligence", 2, "25 GP", "Discern a gem’s value (DC 15)", "Arcane Focus; Holy Symbol"),
    ("Leatherworker’s Tools", "Dexterity", 5, "5 GP", "Add a design to a leather item (DC 10)", "Sling; Whip; Hide Armor; Leather Armor; Studded Leather Armor; Backpack; Crossbow Bolt Case; Map or Scroll Case; Parchment; Pouch; Quiver; Waterskin"),
    ("Mason’s Tools", "Strength", 8, "10 GP", "Chisel a symbol or hole in stone (DC 10)", "Block and Tackle"),
    ("Painter’s Supplies", "Wisdom", 5, "10 GP", "Paint a recognizable image of something you’ve seen (DC 10)", "Druidic Focus; Holy Symbol"),
    ("Potter’s Tools", "Intelligence", 3, "10 GP", "Discern what a ceramic object held in the past 24 hours (DC 15)", "Jug; Lamp"),
    ("Smith’s Tools", "Strength", 8, "20 GP", "Pry open a door or container (DC 20)", "Melee weapons; Medium armor; Heavy armor; metal adventuring gear"),
    ("Tinker’s Tools", "Dexterity", 10, "50 GP", "Assemble a Tiny item composed of scrap, which falls apart in 1 minute (DC 20)", "Musket; Pistol; Bell; Bullseye Lantern; Flask; Hooded Lantern; Hunting Trap; Lock; Manacles; Mirror; Shovel; Signal Whistle; Tinderbox"),
    ("Weaver’s Tools", "Dexterity", 5, "1 GP", "Mend a tear in clothing (DC 10), or sew a Tiny design (DC 10)", "Padded Armor; Basket; Bedroll; Blanket; Fine Clothes; Net; Robe; Rope; Sack; String; Tent; Traveler’s Clothes"),
    ("Woodcarver’s Tools", "Dexterity", 5, "1 GP", "Carve a pattern in wood (DC 10)", "Wooden weapons; Arcane Focus; Arrows; Bolts; Druidic Focus; Ink Pen; Needles"),
    ("Disguise Kit", "Charisma", 3, "25 GP", "Apply makeup (DC 10)", "Costume"),
    ("Forgery Kit", "Dexterity", 5, "15 GP", "Mimic 10 or fewer words of someone else’s handwriting (DC 15), or duplicate a wax seal (DC 20)", ""),
    ("Herbalism Kit", "Intelligence", 3, "5 GP", "Identify a plant (DC 10)", "Antitoxin; Candle; Healer’s Kit; Potion of Healing"),
    ("Navigator’s Tools", "Wisdom", 2, "25 GP", "Plot a course (DC 10), or determine position by stargazing (DC 15)", ""),
    ("Poisoner’s Kit", "Intelligence", 2, "50 GP", "Detect a poisoned object (DC 10)", "Basic Poison"),
    ("Thieves’ Tools", "Dexterity", 1, "25 GP", "Pick a lock (DC 15), or disarm a trap (DC 15)", ""),
]

GAMING_SETS = [("Dice Set", 0, "1 SP"), ("Dragonchess Set", .5, "1 GP"), ("Playing Card Set", 0, "5 SP"), ("Three-Dragon Ante Set", 0, "1 GP")]
INSTRUMENTS = [("Bagpipes", 6, "30 GP"), ("Drum", 3, "6 GP"), ("Dulcimer", 10, "25 GP"), ("Flute", 1, "2 GP"), ("Horn", 2, "3 GP"), ("Lute", 2, "35 GP"), ("Lyre", 2, "30 GP"), ("Pan Flute", 2, "12 GP"), ("Shawm", 1, "2 GP"), ("Viol", 1, "30 GP")]

MOUNTS = [("Camel", 450, "50 GP"), ("Elephant", 1320, "200 GP"), ("Horse, Draft", 540, "50 GP"), ("Horse, Riding", 480, "75 GP"), ("Mastiff", 195, "25 GP"), ("Mule", 420, "8 GP"), ("Pony", 225, "30 GP"), ("Warhorse", 540, "400 GP")]
VEHICLES = [
    ("Carriage", 600, "100 GP"), ("Cart", 200, "15 GP"), ("Chariot", 100, "250 GP"), ("Sled", 300, "20 GP"), ("Wagon", 400, "35 GP"),
]
SHIPS = [
    ("Airship", 8, 10, 20, 1, 13, 300, 0, "40000 GP"), ("Galley", 4, 80, 0, 150, 15, 500, 20, "30000 GP"),
    ("Keelboat", 1, 1, 6, .5, 15, 100, 10, "3000 GP"), ("Longship", 3, 40, 150, 10, 15, 300, 15, "10000 GP"),
    ("Rowboat", 1.5, 1, 3, 0, 11, 50, 0, "50 GP"), ("Sailing Ship", 2, 20, 20, 100, 15, 300, 15, "10000 GP"),
    ("Warship", 2.5, 60, 60, 200, 15, 500, 20, "25000 GP"),
]


def clean_text(lines: list[str]) -> str:
    output = ""
    for line in lines:
        line = re.sub(r"\s+", " ", line).strip()
        if not line:
            continue
        if output.endswith("-") and line[:1].islower():
            output = output[:-1] + line
        else:
            output += (" " if output else "") + line
    return output


def page_columns(document: pdfplumber.PDF, first: int, last: int) -> list[dict[str, Any]]:
    result: list[dict[str, Any]] = []
    for page_number in range(first, last + 1):
        page = document.pages[page_number - 1]
        words = page.extract_words(extra_attrs=["size", "fontname"])
        for column in (0, 1):
            selected = [word for word in words if (word["x0"] < 300) == (column == 0) and word["top"] < 735]
            groups: list[list[dict[str, Any]]] = []
            for word in sorted(selected, key=lambda entry: (entry["top"], entry["x0"])):
                group = next((line for line in reversed(groups[-3:]) if abs(line[0]["top"] - word["top"]) < 1.2), None)
                if group is None:
                    group = []
                    groups.append(group)
                group.append(word)
            for group in groups:
                ordered = sorted(group, key=lambda entry: entry["x0"])
                result.append({
                    "page": page_number,
                    "column": column,
                    "top": min(float(word["top"]) for word in ordered),
                    "text": " ".join(str(word["text"]) for word in ordered),
                    "title": any(abs(float(word["size"]) - 12) < .25 and "SemiBold" in str(word["fontname"]) for word in ordered),
                    "italic": all("Italic" in str(word["fontname"]) for word in ordered),
                })
    return sorted(result, key=lambda entry: (entry["page"], entry["column"], entry["top"]))


def extract_magic_items(document: pdfplumber.PDF) -> list[dict[str, Any]]:
    lines = page_columns(document, 209, 253)
    starts = [index for index, line in enumerate(lines) if line["title"]]
    groups: list[dict[str, Any]] = []
    cursor = 0
    while cursor < len(starts):
        start = starts[cursor]
        title_lines = [lines[start]["text"]]
        while cursor + 1 < len(starts):
            candidate = starts[cursor + 1]
            previous = starts[cursor]
            if lines[candidate]["page"] == lines[previous]["page"] and lines[candidate]["column"] == lines[previous]["column"] and lines[candidate]["top"] - lines[previous]["top"] < 14:
                title_lines.append(lines[candidate]["text"])
                cursor += 1
            else:
                break
        last_title = starts[cursor]
        metadata_start = next((index for index in range(last_title + 1, min(last_title + 12, len(lines)))
            if lines[index]["italic"] and lines[index]["page"] == lines[last_title]["page"] and lines[index]["column"] == lines[last_title]["column"] and lines[index]["top"] - lines[last_title]["top"] < 65), None)
        if metadata_start is None:
            cursor += 1
            continue
        metadata_lines: list[str] = []
        metadata_end = metadata_start
        while metadata_end < len(lines) and lines[metadata_end]["italic"] and lines[metadata_end]["page"] == lines[metadata_start]["page"] and lines[metadata_end]["column"] == lines[metadata_start]["column"]:
            metadata_lines.append(lines[metadata_end]["text"])
            metadata_end += 1
        title = clean_text(title_lines)
        metadata = clean_text(metadata_lines)
        groups.append({"title": title, "metadata": metadata, "metadataEnd": metadata_end})
        cursor += 1
    records: list[dict[str, Any]] = []
    for group_index, group in enumerate(groups):
        title = group["title"]
        metadata = group["metadata"]
        end = groups[group_index + 1]["metadataEnd"] - 1 if group_index + 1 < len(groups) else len(lines)
        description = clean_text([line["text"] for line in lines[group["metadataEnd"]:end] if not line["title"] and not line["italic"]])
        rarity_match = re.search(r"\b(Very Rare|Uncommon|Common|Rare|Legendary|Artifact|Varies)\b", metadata, re.I)
        rarity = rarity_match.group(1).title() if rarity_match else "Varies"
        magic_type = metadata.split(",", 1)[0].strip()
        magic_type = re.sub(r"\s*\([^)]*\)\s*", "", magic_type)
        magic_type = magic_type if magic_type in {"Armor", "Potion", "Ring", "Rod", "Scroll", "Staff", "Wand", "Weapon", "Wondrous Item"} else "Other"
        charges = [int(value) for value in re.findall(r"(?:has|have|maximum of|with|starts with|its)\s+(\d+)\s+[Cc]harges", description)]
        for count, sides, modifier in re.findall(r"(?:has|have|with|starts with)\s+(\d+)d(\d+)\s*([+−-]\s*\d+)?\s+[Cc]harges", description):
            signed_modifier = int((modifier or "0").replace("−", "-").replace(" ", ""))
            charges.append(int(count) * int(sides) + signed_modifier)
        recharge_sentences = [sentence.strip() for sentence in re.split(r"(?<=[.!?])\s+", description) if re.search(r"regain|recharge|expended [Cc]harges", sentence, re.I)]
        timing = ""
        recharge_text = " ".join(recharge_sentences[:3])
        lowered = recharge_text.lower()
        if "dawn" in lowered: timing = "Daily at Dawn"
        elif "dusk" in lowered: timing = "Daily at Dusk"
        elif "midnight" in lowered: timing = "At Midnight"
        elif "long rest" in lowered: timing = "After a Long Rest"
        elif "short rest" in lowered: timing = "After a Short Rest"
        elif recharge_text: timing = "Special"
        dice_match = re.search(r"(\d+)d(\d+)(?:\s*\+\s*(\d+))?", recharge_text, re.I)
        flat_match = re.search(r"regains?\s+(\d+)\s+expended", recharge_text, re.I)
        record = item(title, "Magic Item", 0, 0,
            magicType=magic_type, rarity=rarity, attunement="requires attunement" in metadata.lower(),
            attunementPrerequisite=(re.search(r"Requires Attunement(?: by ([^)]+))?", metadata, re.I).group(1) or "" if re.search(r"Requires Attunement(?: by ([^)]+))?", metadata, re.I) else ""),
            description=description, metadata=metadata, charges=max(charges) if charges else 0,
            recharge=[recharge_text] if recharge_text else [], rechargeTiming=timing,
            rechargeDice={"count": int(dice_match.group(1)), "sides": int(dice_match.group(2)), "modifier": int(dice_match.group(3) or 0)} if dice_match else None,
            rechargeFlat=int(flat_match.group(1)) if flat_match else (max(charges) if charges and re.search(r"regains? all expended charges", recharge_text, re.I) else 0),
            destroyedOnZero=bool(re.search(r"(?:destroyed|crumbles|disappears).{0,80}(?:0 charges|last charge)|(?:0 charges|last charge).{0,80}(?:destroyed|crumbles|disappears)", description, re.I)),
            consumable=bool(re.search(r"Potion|Oil|Elixir|Philter|Dust|Ammunition|Spell Scroll", title, re.I)),
        )
        bonus_variants = {
            "Ammunition, +1, +2, or +3": [("Ammunition +1", "Uncommon"), ("Ammunition +2", "Rare"), ("Ammunition +3", "Very Rare")],
            "Armor, +1, +2, or +3": [("Armor +1", "Rare"), ("Armor +2", "Very Rare"), ("Armor +3", "Legendary")],
            "Shield, +1, +2, or +3": [("Shield +1", "Uncommon"), ("Shield +2", "Rare"), ("Shield +3", "Very Rare")],
            "Wand of the War Mage, +1, +2, or +3": [("Wand of the War Mage +1", "Uncommon"), ("Wand of the War Mage +2", "Rare"), ("Wand of the War Mage +3", "Very Rare")],
            "Weapon, +1, +2, or +3": [("Weapon +1", "Uncommon"), ("Weapon +2", "Rare"), ("Weapon +3", "Very Rare")],
        }
        if title in bonus_variants:
            record["variants"] = [{"name": name, "rarity": variant_rarity, "costCp": 0, "charges": 0, "details": ""} for name, variant_rarity in bonus_variants[title]]
        if title == "Potions of Healing":
            record["variants"] = [
                {"name": "Potion of Healing", "rarity": "Common", "costCp": 5000, "charges": 1, "details": "Restores 2d4 + 2 Hit Points."},
                {"name": "Potion of Greater Healing", "rarity": "Uncommon", "costCp": 0, "charges": 1, "details": "Restores 4d4 + 4 Hit Points."},
                {"name": "Potion of Superior Healing", "rarity": "Rare", "costCp": 0, "charges": 1, "details": "Restores 8d4 + 8 Hit Points."},
                {"name": "Potion of Supreme Healing", "rarity": "Very Rare", "costCp": 0, "charges": 1, "details": "Restores 10d4 + 20 Hit Points."},
            ]
        records.append(record)
    return records


def build() -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    for name, weapon_category, range_type, damage, damage_type, properties, mastery, weight, cost in WEAPONS:
        match = re.fullmatch(r"(\d+)d(\d+)", damage)
        ranges = re.search(r"Range (\d+)/(\d+)", properties)
        records.append(item(name, "Weapon", cost, weight, weaponCategory=weapon_category, weaponRangeType=range_type,
            damage={"count": int(match.group(1)), "sides": int(match.group(2)), "modifier": 0} if match else None,
            damageFlat=int(damage) if damage.isdigit() else 0, damageType=damage_type,
            weaponProperties=[value for value in ["Ammunition", "Finesse", "Heavy", "Light", "Loading", "Reach", "Thrown", "Two-Handed", "Versatile"] if value in properties],
            weaponMastery=mastery, normalRange=int(ranges.group(1)) if ranges else 0, longRange=int(ranges.group(2)) if ranges else 0,
            description=properties))
    for name, category, armor_class, dexterity, strength, stealth, weight, cost in ARMOR:
        records.append(item(name, "Shield" if category == "Shield" else "Armor", cost, weight, armorCategory=category,
            baseAc=armor_class, dexterityToAc=dexterity, strengthRequirement=strength, stealthDisadvantage=stealth,
            equipmentSlot="Off Hand" if category == "Shield" else "Armor"))
    for name, amount, storage, weight, cost in AMMUNITION:
        records.append(item(name, "Ammunition", cp(cost) / amount, weight / amount, sourcePackQuantity=amount,
            sourcePackCostCp=cp(cost), stackLimit=amount, description=f"SRD package: {amount} pieces; typical storage: {storage}."))
    for name, weight, cost in FOCUSES:
        records.append(item(name, "Adventuring Gear", cost, weight))
    for row in GEAR:
        name, weight, cost, *package = row
        quantity = package[0] if package else 1
        category = "Consumable" if re.search(r"Acid|Fire|Antitoxin|Caltrop|Candle|Holy Water|Oil|Perfume|Poison|Potion|Rations|Scroll|Torch", name, re.I) else "Container" if re.search(r"Backpack|Barrel|Basket|Bottle|Bucket|Case|Chest|Flask|Jug|Pot|Pouch|Quiver|Sack|Vial|Waterskin", name, re.I) else "Adventuring Gear"
        record = item(name, category, cp(cost) / quantity, float(weight) / quantity if quantity else 0,
            sourcePackQuantity=quantity, sourcePackCostCp=cp(cost), stackLimit=quantity if quantity > 1 else 1,
            charges=10 if name == "Healer’s Kit" else 0, consumable=category == "Consumable")
        if name in PACKS:
            record["contents"] = [{"item": entry, "quantity": amount} for entry, amount in PACKS[name]]
        records.append(record)
    for name, ability, weight, cost, utilize, craft in TOOLS:
        records.append(item(name, "Tool", cost, weight, toolAbility=ability, toolUtilize=[utilize], toolCraft=[part.strip() for part in craft.split(";") if part.strip()]))
    for name, weight, cost in GAMING_SETS:
        records.append(item(name, "Tool", cost, weight, toolAbility="Wisdom", toolUtilize=["Discern whether someone is cheating (DC 10), or win the game (DC 20)"]))
    for name, weight, cost in INSTRUMENTS:
        records.append(item(name, "Tool", cost, weight, toolAbility="Charisma", toolUtilize=["Play a known tune (DC 10), or improvise a song (DC 15)"]))
    for name, capacity, cost in MOUNTS:
        records.append(item(name, "Mount", cost, 0, carryingCapacityLb=capacity))
    for name, weight, cost in VEHICLES:
        records.append(item(name, "Vehicle", cost, weight))
    for name, speed, crew, passengers, cargo, ac, hp, threshold, cost in SHIPS:
        records.append(item(name, "Vehicle", cost, 0, vehicleSpeedMph=speed, vehicleCrew=crew, vehiclePassengers=passengers,
            vehicleCargoTons=cargo, vehicleAc=ac, vehicleHp=hp, vehicleDamageThreshold=threshold))
    records.extend([
        item("Feed", "Food or Drink", "5 CP", 10, unit="day"), item("Saddle, Exotic", "Adventuring Gear", "60 GP", 40),
        item("Saddle, Military", "Adventuring Gear", "20 GP", 30), item("Saddle, Riding", "Adventuring Gear", "10 GP", 25),
        item("Barding", "Armor", 0, 0, description="Armor made for a mount. It costs four times and weighs twice as much as the corresponding armor."),
        item("Stabling", "Service", "5 SP", 0, unit="day"), item("Ale (Mug)", "Food or Drink", "4 CP"),
        item("Bread (Loaf)", "Food or Drink", "2 CP"), item("Cheese (Wedge)", "Food or Drink", "1 SP"),
        item("Wine, Common (Bottle)", "Food or Drink", "2 SP"), item("Wine, Fine (Bottle)", "Food or Drink", "10 GP"),
    ])
    for name, cost in [("Inn Stay, Squalid", "7 CP"), ("Inn Stay, Poor", "1 SP"), ("Inn Stay, Modest", "5 SP"), ("Inn Stay, Comfortable", "8 SP"), ("Inn Stay, Wealthy", "2 GP"), ("Inn Stay, Aristocratic", "4 GP")]:
        records.append(item(name, "Service", cost, 0, unit="day"))
    for name, cost in [("Meal, Squalid", "1 CP"), ("Meal, Poor", "2 CP"), ("Meal, Modest", "1 SP"), ("Meal, Comfortable", "2 SP"), ("Meal, Wealthy", "3 SP"), ("Meal, Aristocratic", "6 SP")]:
        records.append(item(name, "Service", cost, 0, unit="meal"))
    for name, cost in [("Lifestyle, Wretched", 0), ("Lifestyle, Squalid", "1 SP"), ("Lifestyle, Poor", "2 SP"), ("Lifestyle, Modest", "1 GP"), ("Lifestyle, Comfortable", "2 GP"), ("Lifestyle, Wealthy", "4 GP"), ("Lifestyle, Aristocratic", "10 GP")]:
        records.append(item(name, "Service", cost, 0, unit="day"))
    records.extend([item("Skilled Hireling", "Service", "2 GP", 0, unit="day"), item("Untrained Hireling", "Service", "2 SP", 0, unit="day"), item("Messenger", "Service", "2 CP", 0, unit="mile")])
    for level, availability, cost in [("Cantrip", "Village, town, or city", "30 GP"), ("1", "Village, town, or city", "50 GP"), ("2", "Village, town, or city", "200 GP"), ("3", "Town or city only", "300 GP"), ("4–5", "Town or city only", "2000 GP"), ("6–8", "City only", "20000 GP"), ("9", "City only", "100000 GP")]:
        records.append(item(f"Spellcasting Service (Level {level})", "Service", cost, 0, description=availability))
    with pdfplumber.open(PDF) as document:
        records.extend(extract_magic_items(document))
    spell_data = json.loads(SPELLS.read_text(encoding="utf-8"))
    spell_names = {spell.get("id"): spell.get("name", spell.get("id", "")) for spell in spell_data.get("spells", [])}
    for material in spell_data.get("materials", []):
        material_name = material["name"].strip()
        material_name = material_name[:1].upper() + material_name[1:]
        used_by = [spell_names.get(spell_id, spell_id) for spell_id in material.get("usedBy", [])]
        records.append(item(material_name, "Spell Material", material.get("costCp", 0), 0,
            materialComponent=True, consumable=bool(material.get("consumed")),
            description=f"Material component used by: {', '.join(used_by)}.",
            materialSpells=used_by))
    by_name: dict[str, dict[str, Any]] = {}
    merged: list[dict[str, Any]] = []
    for record in records:
        name_key = record["name"].lower()
        existing = by_name.get(name_key)
        if record["category"] == "Spell Material" and existing and existing["category"] != "Magic Item":
            existing["materialComponent"] = True
            existing["consumable"] = bool(existing.get("consumable") or record.get("consumable"))
            existing["materialSpells"] = sorted(set(existing.get("materialSpells", []) + record.get("materialSpells", [])))
            material_note = record.get("description", "")
            existing["description"] = f"{existing.get('description', '')} {material_note}".strip()
            continue
        if record["category"] == "Spell Material" and existing and existing["category"] == "Magic Item":
            record["name"] = f"{record['name']} (Spell Material)"
            name_key = record["name"].lower()
        by_name[name_key] = record
        merged.append(record)
    unique: dict[str, dict[str, Any]] = {}
    for record in merged:
        key = re.sub(r"[^a-z0-9]+", "_", record["name"].lower()).strip("_")
        if key in unique:
            suffix = re.sub(r"[^a-z0-9]+", "_", record.get("category", "item").lower()).strip("_")
            key = f"{key}_{suffix}"
        record["key"] = key
        unique[key] = record
    return list(unique.values())


if __name__ == "__main__":
    catalog = build()
    OUTPUT.write_text(json.dumps({"source": "System Reference Document 5.2.1", "items": catalog}, ensure_ascii=False, indent=2), encoding="utf-8")
    counts: dict[str, int] = {}
    for entry in catalog:
        counts[entry["category"]] = counts.get(entry["category"], 0) + 1
    print(json.dumps({"total": len(catalog), "categories": counts}, ensure_ascii=False, indent=2))
