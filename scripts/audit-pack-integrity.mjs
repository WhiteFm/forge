import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const file = resolve(process.argv[2] ?? "projects/srd52-wizard-evoker.forge.json");
const project = JSON.parse(await readFile(file, "utf8"));
const failures = [];
const ids = new Set();
const entityById = new Map(project.entities.map((entity) => [entity.id, entity]));
const normalizedName = (value) => value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "");
const names = new Map();
const russianNames = new Map();
const deprecatedTargets = new Set(["senses.darkvision.range", "senses.tremorsense.range", "senses.truesight.range", "movement.walk.speed", "movement.fly.speed"]);
const placeholders = /^(effect|choice)\s*\d+$|^(эффект|выбор)\s*\d+$/i;

const duplicateValues = (owner, path, values) => {
  const seen = new Set();
  for (const value of values ?? []) {
    if (seen.has(value)) failures.push(`${owner}: duplicate ${path} reference ${value}`);
    seen.add(value);
  }
};
const requireReference = (owner, path, id, type) => {
  const target = entityById.get(id);
  if (!target || (type && target.entityType !== type)) failures.push(`${owner}: ${path} references missing ${type ?? "entity"} ${id}`);
};

for (const entity of project.entities) {
  if (ids.has(entity.id)) failures.push(`duplicate entity ID ${entity.id}`);
  ids.add(entity.id);
  const nameKey = `${entity.entityType}:${normalizedName(entity.localization?.en?.name ?? "")}`;
  if (names.has(nameKey)) failures.push(`duplicate ${entity.entityType} name "${entity.localization.en.name}": ${names.get(nameKey)} and ${entity.id}`);
  names.set(nameKey, entity.id);
  const russianNameKey = `${entity.entityType}:${(entity.localization?.ru?.name ?? "").normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "")}`;
  if (russianNames.has(russianNameKey)) failures.push(`duplicate ${entity.entityType} Russian name "${entity.localization.ru.name}": ${russianNames.get(russianNameKey)} and ${entity.id}`);
  russianNames.set(russianNameKey, entity.id);

  duplicateValues(entity.id, "featureIds", entity.featureIds);
  for (const id of entity.featureIds ?? []) requireReference(entity.id, "featureIds", id, "feature");
  duplicateValues(entity.id, "featIds", entity.featIds);
  for (const id of entity.featIds ?? []) requireReference(entity.id, "featIds", id, "feat");
  for (const [index, level] of (entity.levels ?? []).entries()) {
    duplicateValues(entity.id, `levels.${index}.featureIds`, level.featureIds);
    for (const id of level.featureIds) requireReference(entity.id, `levels.${index}.featureIds`, id, "feature");
  }
  for (const [index, level] of (entity.subclassLevels ?? []).entries()) {
    duplicateValues(entity.id, `subclassLevels.${index}.featureIds`, level.featureIds);
    for (const id of level.featureIds) requireReference(entity.id, `subclassLevels.${index}.featureIds`, id, "feature");
  }
  for (const [index, grant] of (entity.spellGrants ?? []).entries()) requireReference(entity.id, `spellGrants.${index}`, grant.spellId, "spell");
  for (const [groupIndex, group] of (entity.materialGroups ?? []).entries()) for (const [entryIndex, entry] of group.entries.entries()) requireReference(entity.id, `materialGroups.${groupIndex}.entries.${entryIndex}`, entry.itemId, "item");
  for (const [index, item] of (entity.containedItems ?? []).entries()) requireReference(entity.id, `containedItems.${index}`, item.itemId, "item");
  for (const [setIndex, set] of (entity.equipmentOptions ?? []).entries()) for (const [itemIndex, item] of set.items.entries()) requireReference(entity.id, `equipmentOptions.${setIndex}.items.${itemIndex}`, item.itemId, "item");

  const effectIds = new Set();
  const effectSemantics = new Set();
  for (const [index, effect] of (entity.effects ?? []).entries()) {
    if (effectIds.has(effect.id)) failures.push(`${entity.id}: duplicate effect ID ${effect.id}`);
    effectIds.add(effect.id);
    const semanticKey = JSON.stringify([effect.target, effect.operation, effect.valueType, effect.value, effect.activation, effect.conditions ?? []]);
    if (effectSemantics.has(semanticKey)) failures.push(`${entity.id}: duplicate semantic effect at effects.${index}`);
    effectSemantics.add(semanticKey);
    if (!effect.name?.trim() || !effect.nameRu?.trim() || placeholders.test(effect.name) || placeholders.test(effect.nameRu)) failures.push(`${entity.id}: untranslated effect at effects.${index}`);
    if (deprecatedTargets.has(effect.target) || effect.target.split(".").some((segment) => segment.includes("-") || /[A-Z]/.test(segment))) failures.push(`${entity.id}: deprecated effect target ${effect.target}`);
  }
  const choiceIds = new Set();
  for (const [index, choice] of (entity.choices ?? []).entries()) {
    if (choiceIds.has(choice.id)) failures.push(`${entity.id}: duplicate choice ID ${choice.id}`);
    choiceIds.add(choice.id);
    if (!choice.name?.trim() || !choice.nameRu?.trim() || placeholders.test(choice.name) || placeholders.test(choice.nameRu)) failures.push(`${entity.id}: untranslated choice at choices.${index}`);
  }
}

for (const species of project.entities.filter((entity) => entity.entityType === "species")) {
  let grantedDarkvision = 0;
  for (const featureId of species.featureIds ?? []) {
    const feature = entityById.get(featureId);
    for (const effect of feature?.effects ?? []) if (effect.target === "senses.darkvision" && ["set", "set_minimum"].includes(effect.operation)) grantedDarkvision = Math.max(grantedDarkvision, Number(effect.value) || 0);
  }
  if ((species.senses?.darkvision ?? 0) < grantedDarkvision) failures.push(`${species.id}: darkvision field ${species.senses?.darkvision ?? 0} is below granted ${grantedDarkvision}`);
}

const counts = Object.fromEntries([...new Set(project.entities.map((entity) => entity.entityType))].sort().map((type) => [type, project.entities.filter((entity) => entity.entityType === type).length]));
if (failures.length) {
  console.error(`Integrity audit failed (${failures.length}):\n${failures.map((entry) => `- ${entry}`).join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Integrity audit passed: ${project.entities.length} entities ${JSON.stringify(counts)}`);
}
