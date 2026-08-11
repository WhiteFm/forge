import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const forgePath = resolve(root, "projects/srd52-wizard-evoker.forge.json");
const packPath = resolve(root, "projects/srd52-wizard-evoker.wsgpack");

function slug(value, fallback = "untitled") {
  return String(value ?? "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\./g, "").replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || fallback;
}

function titleFromId(id, fallback) {
  const last = String(id ?? "").split(".").at(-1) || fallback;
  return last.replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function replaceDeep(value, replacements) {
  if (typeof value === "string") {
    for (const [oldId, newId] of replacements) {
      if (value === oldId) return newId;
      if (value.startsWith(`${oldId}.`)) return `${newId}${value.slice(oldId.length)}`;
    }
    return value;
  }
  if (Array.isArray(value)) return value.map((entry) => replaceDeep(entry, replacements));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, replaceDeep(entry, replacements)]));
  return value;
}

const source = JSON.parse(await readFile(forgePath, "utf8"));
delete source.projectId;
delete source.pack.sourceId;
source.schemaVersion = "2.0.0";
source.pack.id = "srd52";

const entityMap = new Map();
const usedIds = new Set();
for (const entity of source.entities) {
  const base = `${source.pack.id}.${entity.entityType}.${slug(entity.localization.en.name, entity.entityType)}`;
  let id = base;
  let suffix = 2;
  while (usedIds.has(id)) id = `${base}_${suffix++}`;
  usedIds.add(id);
  entityMap.set(entity.id, id);
}
source.entities = replaceDeep(source.entities, entityMap);

source.entities = source.entities.map((entity) => {
  delete entity.tags;
  delete entity.rulesetId;
  delete entity.sourceId;
  delete entity.sourceVersion;
  delete entity.licenseId;
  delete entity.creatureTypeId;

  if (entity.entityType === "class") {
    entity.levels = Array.from({ length: 20 }, (_, index) => entity.levels?.find((row) => row.level === index + 1) ?? { level: index + 1, featureIds: [] });
    entity.classProgression = entity.levels.map((level, index) => ({ ...(entity.classProgression?.find((row) => row.level === level.level) ?? { proficiencyBonus: 2 + Math.floor(index / 4), cantripsKnown: 0, preparedSpells: 0, spellSlots: Array(9).fill(0) }), level: level.level }));
  }
  if (entity.entityType === "species") {
    entity.sizeOptions = (entity.sizeOptions ?? ["medium"]).map((size) => size.replace(/^size\./, ""));
    entity.senses ??= { vision: 0, darkvision: 0, blindsight: 0 };
  }
  if (entity.entityType === "background") {
    entity.featIds = entity.featIds ?? (entity.featId ? [entity.featId] : []);
    entity.skillProficiencySlots = entity.skillProficiencySlots ?? (entity.proficiencyGrants ?? []).filter((id) => id.startsWith("skill."));
    entity.toolProficiencySlots = entity.toolProficiencySlots ?? (entity.proficiencyGrants ?? []).filter((id) => id.startsWith("tool."));
    entity.backgroundFeatureSlots ??= [];
    delete entity.featId;
    delete entity.proficiencyGrants;
  }
  if (entity.entityType === "item") entity.costCp = Math.min(999999, Math.max(0, entity.costCp ?? 0));

  const subMap = new Map();
  entity.choices = (entity.choices ?? []).map((choice, index) => {
    const name = choice.name || titleFromId(choice.id, `Choice ${index + 1}`);
    const id = `${entity.id}.${slug(name, `choice_${index + 1}`)}`;
    subMap.set(choice.id, id);
    const next = { ...choice, id, name, nameRu: choice.nameRu || `Выбор ${index + 1}` };
    if (/\btags\b/i.test(next.filter ?? "")) { next.filter = ""; delete next.filterExpression; }
    return next;
  });
  entity.equipmentOptions = (entity.equipmentOptions ?? []).map((option, index) => {
    const name = option.name || `Equipment Set ${index + 1}`;
    const id = `${entity.id}.${slug(name, `equipment_set_${index + 1}`)}`;
    subMap.set(option.id, id);
    return { ...option, id, name, nameRu: option.nameRu || `Комплект ${index + 1}`, currencyCp: Math.min(999999, Math.max(0, option.currencyCp ?? 0)) };
  });
  entity.effects = (entity.effects ?? []).map((effect, index) => {
    const name = effect.name || titleFromId(effect.id, `Effect ${index + 1}`);
    const id = `${entity.id}.${slug(name, `effect_${index + 1}`)}`;
    subMap.set(effect.id, id);
    return { ...effect, id, name, nameRu: effect.nameRu || `Эффект ${index + 1}` };
  });
  entity.materialGroups = (entity.materialGroups ?? []).map((group, index) => {
    const name = group.name || `Material Group ${index + 1}`;
    const id = `${entity.id}.${slug(name, `material_group_${index + 1}`)}`;
    subMap.set(group.id, id);
    return { ...group, id, name, nameRu: group.nameRu || `Группа материалов ${index + 1}`, minimumTotalCostCp: Math.min(999999, Math.max(0, group.minimumTotalCostCp ?? 0)), entries: group.entries.map((entry) => ({ ...entry, minimumCostCp: Math.min(999999, Math.max(0, entry.minimumCostCp ?? 0)) })) };
  });
  return replaceDeep(entity, subMap);
});

source.updatedAt = new Date().toISOString();
await writeFile(forgePath, `${JSON.stringify(source, null, 2)}\n`, "utf8");

const localizations = { en: {}, ru: {} };
const entities = source.entities.map((entity) => {
  localizations.en[entity.id] = entity.localization.en;
  localizations.ru[entity.id] = entity.localization.ru;
  const { localization, spellLevel, featCategory, referenceCategory, referenceValue, ...base } = entity;
  if (spellLevel !== undefined) base.level = spellLevel;
  if (featCategory !== undefined) base.category = featCategory;
  if (referenceCategory !== undefined) { base.category = referenceCategory; base.value = referenceValue ?? {}; }
  return base;
});
const canonical = {
  manifest: { schemaVersion: source.schemaVersion, packId: source.pack.id, namespace: source.pack.id, version: source.pack.version, rulesetId: source.pack.rulesetId, kind: source.pack.id === "srd52" ? "official" : "homebrew", author: source.pack.author, defaultLocale: source.pack.defaultLocale ?? "en", locales: ["en", "ru"], license: { id: source.pack.licenseId, name: source.pack.licenseId, attribution: source.pack.attribution ?? source.pack.author }, portability: { embedTechnicalData: true, embedLocalizedText: true, allowDerivativePacks: true, requiresEntitlement: false }, createdAt: source.updatedAt },
  entities,
  localizations,
  assets: [],
};
await writeFile(packPath, `${JSON.stringify(canonical, null, 2)}\n`, "utf8");
console.log(`Migrated ${source.entities.length} entities to Forge schema ${source.schemaVersion}.`);
