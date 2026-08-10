import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const inputPath = resolve("tmp/spell-workbook/spells-extracted.json");
const outputPath = resolve("scripts/data/dnd55-spells.json");
const source = JSON.parse(await readFile(inputPath, "utf8"));

const clean = (value) => String(value ?? "")
  .replaceAll("вЂ™", "’")
  .replaceAll("вЂњ", "“")
  .replaceAll("вЂќ", "”")
  .replaceAll("вЂ“", "–")
  .replaceAll("вЂ”", "—")
  .replaceAll("в€’", "−")
  .replaceAll("Г—", "×")
  .replace(/\s+/g, " ")
  .trim();

const slug = (value) => clean(value).toLowerCase()
  .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const asBool = (value) => value === true || /^(true|yes|1)$/i.test(clean(value));
const asNumber = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const currencyToCp = { CP: 1, SP: 10, EP: 50, GP: 100, PP: 1000, None: 0 };
const classIds = Object.fromEntries(["Bard", "Cleric", "Druid", "Paladin", "Ranger", "Sorcerer", "Warlock", "Wizard"].map((name) => [name, `srd52.class.${name.toLowerCase()}`]));

function parseCasting(value) {
  const raw = clean(value);
  const lower = raw.toLowerCase();
  if (lower.startsWith("reaction")) return { actionType: "reaction", value: 1, reactionTrigger: raw.replace(/^Reaction,?\s*/i, ""), raw };
  if (lower === "bonus action") return { actionType: "bonus_action", value: 1, reactionTrigger: "", raw };
  if (lower.startsWith("action")) return { actionType: "action", value: 1, reactionTrigger: lower === "action" ? "" : raw.replace(/^Action,?\s*/i, ""), raw };
  const amount = asNumber(raw.match(/\d+/)?.[0], 1);
  if (/hour/i.test(raw)) return { actionType: "hour", value: amount, reactionTrigger: "", raw };
  if (/minute/i.test(raw)) return { actionType: "minute", value: amount, reactionTrigger: "", raw };
  return { actionType: "special", value: 1, reactionTrigger: raw, raw };
}

function parseRange(value) {
  const raw = clean(value);
  const lower = raw.toLowerCase();
  if (lower === "self") return { type: "self", distanceFeet: 0, distanceValue: 0, distanceUnit: "feet", raw };
  if (lower === "touch") return { type: "touch", distanceFeet: 0, distanceValue: 0, distanceUnit: "feet", raw };
  if (lower === "sight") return { type: "sight", distanceFeet: 0, distanceValue: 0, distanceUnit: "feet", raw };
  if (lower === "unlimited") return { type: "unlimited", distanceFeet: 0, distanceValue: 0, distanceUnit: "feet", raw };
  const amount = asNumber(raw.match(/[\d,.]+/)?.[0]?.replaceAll(",", ""), 0);
  if (/mile/i.test(raw)) return { type: "distance", distanceFeet: amount * 5280, distanceValue: amount, distanceUnit: "miles", raw };
  if (/feet|foot/i.test(raw)) return { type: "distance", distanceFeet: amount, distanceValue: amount, distanceUnit: "feet", raw };
  return { type: "special", distanceFeet: 0, distanceValue: 0, distanceUnit: "feet", raw: raw || "Special" };
}

function parseDuration(value, concentration) {
  const raw = clean(value);
  const lower = raw.toLowerCase();
  if (lower === "instantaneous") return { type: "instant", value: 1, concentration, raw };
  if (lower === "until dispelled") return { type: "until_dispelled", value: 1, concentration, raw };
  const amount = asNumber(raw.match(/\d+/)?.[0], 1);
  if (/round/i.test(raw)) return { type: "rounds", value: amount, concentration, raw };
  if (/minute/i.test(raw)) return { type: "minutes", value: amount, concentration, raw };
  if (/hour/i.test(raw)) return { type: "hours", value: amount, concentration, raw };
  if (/day/i.test(raw)) return { type: "days", value: amount, concentration, raw };
  return { type: "special", value: 1, concentration, raw: raw || "Special" };
}

function parseAreas(shapesValue, sizesValue) {
  const rawShapes = clean(shapesValue || "None").split(",").map((part) => part.trim()).filter(Boolean);
  const rawSize = clean(sizesValue || "None");
  const dimensionsFeet = [...rawSize.matchAll(/(\d+)-foot(?:-(radius|height|width))?/gi)].map((match) => ({ value: Number(match[1]), kind: match[2]?.toLowerCase() ?? "size" }));
  return rawShapes.map((shape, index) => ({
    shape: shape.toLowerCase() === "none" ? "none" : shape.toLowerCase(),
    sizeFeet: dimensionsFeet[index]?.value ?? dimensionsFeet[0]?.value ?? 0,
    rawShape: shape,
    rawSize,
    dimensionsFeet,
  }));
}

function materialParts(value) {
  const raw = clean(value);
  if (!raw || raw.toLowerCase() === "none") return [];
  return raw.split(/[,;]/).map((part) => clean(part)).filter(Boolean);
}

function normalizeRow(row) {
  const components = clean(row.components).toUpperCase();
  const currency = clean(row.currency || "None");
  const minimumCost = asNumber(row.minimumCost);
  const materialText = clean(row.materials);
  const parts = materialParts(materialText);
  const quantity = Math.max(1, asNumber(row.materialCount, 1));
  const minimumCostCp = minimumCost * (currencyToCp[currency] ?? 0);
  const materialGroup = parts.length ? {
    id: `material-group.${slug(row.name)}.${row.sourceSheet.toLowerCase()}`,
    sourceText: materialText,
    minimumTotalCostCp: minimumCostCp,
    sourceCurrency: currency,
    consumed: asBool(row.consumed),
    entries: parts.map((part) => ({
      itemId: `srd52.item.spell-material.${slug(part)}`,
      quantity: parts.length === 1 ? quantity : 1,
      minimumCostCp: parts.length === 1 ? minimumCostCp : 0,
      consumed: asBool(row.consumed),
    })),
  } : null;
  const areas = parseAreas(row.areaShapes, row.areaSizes);
  return {
    sourceSheet: clean(row.sourceSheet),
    sourceRow: asNumber(row.sourceRow),
    category: clean(row.spellType || row.sourceSheet).toLowerCase(),
    level: clean(row.level).toLowerCase() === "cantrip" ? 0 : asNumber(row.level),
    schoolId: `spell_school.${clean(row.school).toLowerCase()}`,
    classIds: clean(row.classes).split(",").map((part) => clean(part)).filter(Boolean).map((name) => classIds[name] ?? `srd52.class.${slug(name)}`),
    ritual: asBool(row.ritual),
    casting: parseCasting(row.castingTime),
    range: parseRange(row.range),
    duration: parseDuration(row.duration, asBool(row.concentration)),
    areas,
    components: {
      verbal: /(^|,)\s*V\s*(,|$)/.test(components),
      somatic: /(^|,)\s*S\s*(,|$)/.test(components),
      material: /(^|,)\s*M\s*(,|$)/.test(components),
      materialText: materialText.toLowerCase() === "none" ? "" : materialText,
      materialCostCp: minimumCostCp,
      materialConsumed: asBool(row.consumed),
    },
    materialGroup,
    dice: {
      initialCount: asNumber(row.diceCount),
      initialDie: clean(row.diceType),
      periodicCount: asNumber(row.periodicDiceCount),
      periodicDie: clean(row.periodicDiceType),
      periodRounds: asNumber(row.roundCount),
    },
    higherLevel: { enabled: asBool(row.higherLevel) },
    description: clean(row.description),
  };
}

const grouped = new Map();
for (const row of source.rows) {
  const key = clean(row.name).toLocaleLowerCase("en");
  const group = grouped.get(key) ?? [];
  group.push(normalizeRow(row));
  grouped.set(key, group);
}

const spells = [...grouped.entries()].map(([key, profiles]) => {
  const name = clean(source.rows.find((row) => clean(row.name).toLocaleLowerCase("en") === key)?.name);
  const primary = [...profiles].sort((a, b) => b.description.length - a.description.length)[0];
  const materialGroups = profiles.map((profile) => profile.materialGroup).filter(Boolean).filter((group, index, all) => all.findIndex((entry) => entry.sourceText === group.sourceText && entry.minimumTotalCostCp === group.minimumTotalCostCp) === index);
  return {
    id: `srd52.spell.${slug(name)}`,
    name,
    description: primary.description,
    level: primary.level,
    schoolId: primary.schoolId,
    classIds: [...new Set(profiles.flatMap((profile) => profile.classIds))],
    ritual: profiles.some((profile) => profile.ritual),
    casting: primary.casting,
    range: primary.range,
    duration: primary.duration,
    areas: primary.areas,
    components: primary.components,
    materialGroups,
    categories: [...new Set(profiles.map((profile) => profile.category))],
    profiles: profiles.map(({ materialGroup: _materialGroup, description: _description, ...profile }) => profile),
    sourceRows: profiles.map((profile) => ({ sheet: profile.sourceSheet, row: profile.sourceRow })),
  };
}).sort((a, b) => a.name.localeCompare(b.name));

const materialUsage = new Map();
for (const spell of spells) for (const group of spell.materialGroups) for (const entry of group.entries) {
  const name = materialParts(group.sourceText).find((part) => `srd52.item.spell-material.${slug(part)}` === entry.itemId) ?? group.sourceText;
  const current = materialUsage.get(entry.itemId) ?? { id: entry.itemId, name, usedBy: [], costsCp: [], consumed: false };
  current.usedBy.push(spell.id);
  if (entry.minimumCostCp > 0) current.costsCp.push(entry.minimumCostCp);
  current.consumed ||= entry.consumed;
  materialUsage.set(entry.itemId, current);
}

const materials = [...materialUsage.values()].map((material) => ({
  ...material,
  usedBy: [...new Set(material.usedBy)],
  costCp: material.costsCp.length ? Math.min(...material.costsCp) : 0,
  costsCp: [...new Set(material.costsCp)].sort((a, b) => a - b),
})).sort((a, b) => a.name.localeCompare(b.name));

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, JSON.stringify({
  schemaVersion: "1.0.0",
  sourceWorkbook: "DnD 5.5 Spells.xlsm",
  sourceSheets: ["Damage", "Healing", "Neutral"],
  stats: { spells: spells.length, materialItems: materials.length, sourceRows: source.rows.length },
  spells,
  materials,
}, null, 2) + "\n", "utf8");
console.log(`Created ${spells.length} spells and ${materials.length} material inventory items at ${outputPath}`);
