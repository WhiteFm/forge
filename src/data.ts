import type { ClassProgressionEntry, Effect, EntityType, ForgeEntity, ForgeProject, LevelEntry } from "./types";

export const entityTypes: EntityType[] = ["class", "subclass", "species", "background", "feat", "feature", "item", "spell", "reference"];

export const abilities = ["str", "dex", "con", "int", "wis", "cha"] as const;

export const entityTypeLabels: Record<EntityType, { ru: string; en: string }> = {
  class: { ru: "Классы", en: "Classes" },
  subclass: { ru: "Подклассы", en: "Subclasses" },
  species: { ru: "Виды", en: "Species" },
  background: { ru: "Предыстории", en: "Backgrounds" },
  feat: { ru: "Черты", en: "Feats" },
  feature: { ru: "Умения", en: "Features" },
  item: { ru: "Предметы", en: "Items" },
  spell: { ru: "Заклинания", en: "Spells" },
  reference: { ru: "Справочники", en: "References" },
};

export const targetSuggestions = [
  "abilities.str.score", "abilities.dex.score", "abilities.con.score", "abilities.int.score", "abilities.wis.score", "abilities.cha.score",
  "combat.initiative", "combat.armor_class", "combat.hit_points.current", "combat.hit_points.maximum", "combat.temporary_hit_points", "combat.target.hit_points.current", "combat.area.targets.hit_points.current", "combat.saving_throws.*", "combat.attacks.*.bonus",
  "skills.*.proficiency", "skills.*.checks", "proficiencies.weapons", "proficiencies.armor", "proficiencies.tools",
  "movement.walk", "movement.fly", "movement.swim", "movement.climb", "movement.burrow",
  "senses.darkvision", "defenses.resistances", "defenses.immunities", "defenses.vulnerabilities",
  "spellcasting.save_dc", "spellcasting.attack_bonus", "spellcasting.slots.*", "spellcasting.prepared.spells", "spellcasting.spellbook.spells", "inventory.carry_capacity", "inventory.items", "inventory.currency",
];

export const emptyEffect = (index = 1): Effect => ({
  id: `effect.${index}`,
  target: "combat.initiative",
  operation: "add",
  valueType: "formula",
  value: "proficiency_bonus()",
  valueExpression: { operands: [{ kind: "proficiency_bonus", value: "" }], operators: [] },
  activation: "always_on",
  actionCost: "none",
  trigger: "",
  conditions: [],
  stacking: "sum",
  stackingGroup: "",
  priority: 100,
  resourceId: "",
  durationType: "permanent",
  durationValue: 1,
  restType: "long",
  automationLevel: "full",
  notes: "",
});

const twentyLevels = (): LevelEntry[] => Array.from({ length: 20 }, (_, index) => ({ level: index + 1, featureIds: [] }));
const emptyClassProgression = (): ClassProgressionEntry[] => Array.from({ length: 20 }, (_, index) => ({
  level: index + 1,
  proficiencyBonus: 2 + Math.floor(index / 4),
  cantripsKnown: 0,
  preparedSpells: 0,
  spellSlots: Array(9).fill(0),
}));

export function slugifyId(value: string, fallback = "untitled") {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return slug || fallback;
}

export function makeEntityId(packId: string, entityType: EntityType, englishName: string) {
  return `${slugifyId(packId, "pack")}.${entityType}.${slugifyId(englishName, `new_${entityType}`)}`;
}

export function makeSubentityId(entityId: string, englishName: string, fallback: string) {
  return `${entityId}.${slugifyId(englishName, fallback)}`;
}

function replaceIdsDeep<T>(value: T, replacements: Map<string, string>): T {
  if (typeof value === "string") {
    for (const [oldId, newId] of replacements) {
      if (value === oldId) return newId as T;
      if (value.startsWith(`${oldId}.`)) return `${newId}${value.slice(oldId.length)}` as T;
    }
    return value;
  }
  if (Array.isArray(value)) return value.map((entry) => replaceIdsDeep(entry, replacements)) as T;
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, replaceIdsDeep(entry, replacements)])) as T;
  return value;
}

export function normalizeProject(input: ForgeProject): ForgeProject {
  const project = structuredClone(input) as ForgeProject & { projectId?: string; pack: ForgeProject["pack"] & { sourceId?: string } };
  delete project.projectId;
  delete project.pack.sourceId;
  project.schemaVersion = "2.0.0";
  const legacyPackPrefix = (project.pack.id || "").split(".pack.")[0];
  project.pack.id = slugifyId(legacyPackPrefix || project.pack.id || "pack", "pack");
  project.pack.name ||= "Untitled Pack";
  project.pack.version ||= "1.0.0";
  project.pack.rulesetId ||= "dnd5e.2024";
  project.pack.licenseId ||= "license.homebrew";
  project.pack.author ||= "";

  const used = new Set<string>();
  const replacements = new Map<string, string>();
  for (const entity of project.entities ?? []) {
    let desired = makeEntityId(project.pack.id, entity.entityType, entity.localization?.en?.name || "untitled");
    const base = desired;
    let suffix = 2;
    while (used.has(desired)) desired = `${base}_${suffix++}`;
    used.add(desired);
    replacements.set(entity.id, desired);
  }
  project.entities = replaceIdsDeep(project.entities ?? [], replacements);

  project.entities = project.entities.map((entity) => {
    const legacy = entity as ForgeEntity & { rulesetId?: string; sourceId?: string; sourceVersion?: string; licenseId?: string; creatureTypeId?: string; featId?: string; proficiencyGrants?: string[] };
    delete legacy.rulesetId;
    delete legacy.sourceId;
    delete legacy.sourceVersion;
    delete legacy.licenseId;
    delete legacy.creatureTypeId;
    if (entity.entityType === "class") {
      const levels = Array.from({ length: 20 }, (_, index) => entity.levels?.find((entry) => entry.level === index + 1) ?? { level: index + 1, featureIds: [] });
      entity.levels = levels;
      entity.classProgression = levels.map((level, index) => ({ ...(entity.classProgression?.find((entry) => entry.level === level.level) ?? emptyClassProgression()[index]), level: level.level }));
    }
    if (entity.entityType === "species") {
      entity.sizeOptions = (entity.sizeOptions ?? ["medium"]).map((size) => size.replace(/^size\./, ""));
      entity.senses ??= { vision: 0, darkvision: 0, blindsight: 0 };
    }
    if (entity.entityType === "background") {
      entity.featIds ??= legacy.featId ? [legacy.featId] : [];
      entity.skillProficiencySlots ??= (legacy.proficiencyGrants ?? []).filter((id) => id.startsWith("skill."));
      entity.toolProficiencySlots ??= (legacy.proficiencyGrants ?? []).filter((id) => id.startsWith("tool."));
      entity.backgroundFeatureSlots ??= [];
      delete legacy.featId;
      delete legacy.proficiencyGrants;
    }
    if (entity.entityType === "item") entity.costCp = Math.min(999999, Math.max(0, entity.costCp ?? 0));
    const choiceReplacements = new Map<string, string>();
    entity.choices = (entity.choices ?? []).map((choice, index) => {
      const name = choice.name || `Choice ${index + 1}`;
      const id = makeSubentityId(entity.id, name, `choice_${index + 1}`);
      choiceReplacements.set(choice.id, id);
      return { ...choice, id, name, nameRu: choice.nameRu || `Выбор ${index + 1}` };
    });
    if (choiceReplacements.size) entity = replaceIdsDeep(entity, choiceReplacements);
    entity.equipmentOptions = (entity.equipmentOptions ?? []).map((option, index) => {
      const name = option.name || `Equipment Set ${index + 1}`;
      return { ...option, name, nameRu: option.nameRu || `Комплект ${index + 1}`, id: makeSubentityId(entity.id, name, `equipment_set_${index + 1}`), currencyCp: Math.min(999999, Math.max(0, option.currencyCp ?? 0)) };
    });
    entity.effects = (entity.effects ?? []).map((effect, index) => {
      const name = effect.name || `Effect ${index + 1}`;
      return { ...effect, name, nameRu: effect.nameRu || `Эффект ${index + 1}`, id: makeSubentityId(entity.id, name, `effect_${index + 1}`) };
    });
    entity.materialGroups = (entity.materialGroups ?? []).map((group, index) => {
      const name = group.name || `Material Group ${index + 1}`;
      return { ...group, name, nameRu: group.nameRu || `Группа материалов ${index + 1}`, id: makeSubentityId(entity.id, name, `material_group_${index + 1}`), minimumTotalCostCp: Math.min(999999, Math.max(0, group.minimumTotalCostCp ?? 0)), entries: group.entries.map((entry) => ({ ...entry, minimumCostCp: Math.min(999999, Math.max(0, entry.minimumCostCp ?? 0)) })) };
    });
    return entity;
  });
  project.updatedAt ||= new Date().toISOString();
  return project;
}

export function createEntity(entityType: EntityType, number: number, packId = "homebrew"): ForgeEntity {
  const englishName = `New ${entityType} ${number}`;
  const id = makeEntityId(packId, entityType, englishName);
  const common: ForgeEntity = {
    id,
    entityType,
    status: "draft",
    tags: ["homebrew"],
    localization: {
      ru: { name: "Новая сущность", description: "" },
      en: { name: englishName, description: "" },
    },
  };

  if (entityType === "class") return { ...common, hitDie: "d8", primaryAbilities: ["str"], multiclassPrerequisite: "ability_score(\"str\") >= 13", startingHpFormula: "8 + ability_modifier(\"con\")", levelUpHpFormula: "5 + ability_modifier(\"con\")", startingProficiencies: [], multiclassProficiencies: [], spellcastingAbility: "", casterProgression: "none", casterLevelFormula: "0", levels: twentyLevels(), classProgression: emptyClassProgression(), choices: [], equipmentOptions: [] };
  if (entityType === "subclass") return { ...common, classId: "", subclassLevels: [{ level: 3, featureIds: [] }] };
  if (entityType === "species") return { ...common, lifespanYears: 80, sizeOptions: ["medium"], baseSpeeds: { walk: 30 }, senses: { vision: 0, darkvision: 0, blindsight: 0 }, featureIds: [], choices: [] };
  if (entityType === "background") return { ...common, abilityOptions: ["str", "dex", "con"], abilityScoreIncrease: { allowedAbilities: ["str", "dex", "con"], distributions: [[2, 1], [1, 1, 1]], maximumScore: 20 }, featIds: [], skillProficiencySlots: [], toolProficiencySlots: [], backgroundFeatureSlots: [], featChoiceSelections: [], choices: [], equipmentOptions: [{ id: makeSubentityId(id, "Equipment Set 1", "equipment_set_1"), name: "Equipment Set 1", nameRu: "Комплект 1", items: [], choiceItems: [], currencyCp: 0 }] };
  if (entityType === "feat") return { ...common, featCategory: "general", repeatable: false, repeatConstraint: "", prerequisites: [], featureIds: [], choices: [] };
  if (entityType === "feature") return { ...common, mode: "always_on", activation: "none", prerequisites: [], choices: [], effects: [emptyEffect()], automationLevel: "full" };
  if (entityType === "item") return { ...common, itemType: "gear", weightLb: 0, costCp: 0, stackable: false, consumable: false, requiresAttunement: false, equipmentSlots: [], requirements: [], effects: [] };
  if (entityType === "spell") return { ...common, spellLevel: 0, schoolId: "spell_school.evocation", casting: { actionType: "action", value: 1, reactionTrigger: "", raw: "Action" }, range: { type: "distance", distanceFeet: 60, distanceValue: 60, distanceUnit: "feet", raw: "60 feet" }, area: { shape: "none", sizeFeet: 0 }, areas: [{ shape: "none", sizeFeet: 0, rawShape: "None", rawSize: "None", dimensionsFeet: [] }], duration: { type: "instant", value: 1, concentration: false, raw: "Instantaneous" }, components: { verbal: true, somatic: true, material: false, materialText: "", materialCostCp: 0, materialConsumed: false }, materialGroups: [], spellCategories: ["neutral"], spellProfiles: [], ritual: false, attackType: "none", savingThrowAbility: "", effects: [], scaling: [], automationLevel: "full" };
  return { ...common, referenceCategory: "ability", referenceValue: { code: "custom", order: 100 } };
}

export const initialProject: ForgeProject = {
  schemaVersion: "2.0.0",
  pack: { id: "wsguild_starter", version: "0.1.0", name: "WSGuild Starter Pack", rulesetId: "dnd5e.2024", licenseId: "license.cc-by-4.0", author: "WhiteFm" },
  entities: [],
  updatedAt: new Date().toISOString(),
};
