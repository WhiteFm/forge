import type { Effect, EntityType, ForgeEntity, ForgeProject, LevelEntry } from "./types";

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
  "combat.initiative", "combat.armor_class", "combat.hit_points.maximum", "combat.saving_throws.*", "combat.attacks.*.bonus",
  "skills.*.proficiency", "skills.*.checks", "proficiencies.weapons", "proficiencies.armor", "proficiencies.tools",
  "movement.walk", "movement.fly", "movement.swim", "movement.climb", "movement.burrow",
  "senses.darkvision", "defenses.resistances", "defenses.immunities", "defenses.vulnerabilities",
  "spellcasting.save_dc", "spellcasting.attack_bonus", "spellcasting.slots.*", "inventory.carry_capacity",
];

export const emptyEffect = (index = 1): Effect => ({
  id: `effect.${index}`,
  target: "combat.initiative",
  operation: "add",
  valueType: "formula",
  value: "proficiency_bonus()",
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

export function createEntity(entityType: EntityType, number: number): ForgeEntity {
  const id = `homebrew.${entityType}.new-${number}`;
  const common: ForgeEntity = {
    id,
    entityType,
    rulesetId: "dnd5e.2024",
    sourceId: "homebrew.source.local",
    sourceVersion: "1.0.0",
    licenseId: "license.homebrew",
    status: "draft",
    tags: ["homebrew"],
    localization: {
      ru: { name: "Новая сущность", description: "" },
      en: { name: "New entity", description: "" },
    },
  };

  if (entityType === "class") return { ...common, hitDie: "d8", primaryAbilities: ["str"], multiclassPrerequisite: "ability_score(\"str\") >= 13", startingHpFormula: "8 + ability_modifier(\"con\")", levelUpHpFormula: "5 + ability_modifier(\"con\")", startingProficiencies: [], multiclassProficiencies: [], spellcastingAbility: "", casterProgression: "none", casterLevelFormula: "0", levels: twentyLevels() };
  if (entityType === "subclass") return { ...common, classId: "", subclassLevels: [{ level: 3, featureIds: [] }] };
  if (entityType === "species") return { ...common, sizeOptions: ["size.medium"], baseSpeeds: { walk: 30 }, featureIds: [], choices: [] };
  if (entityType === "background") return { ...common, abilityOptions: ["str", "dex", "con"], featId: "", proficiencyGrants: [], choices: [], equipmentOptions: [{ id: "equipment.a", items: [], currencyCp: 0 }] };
  if (entityType === "feat") return { ...common, featCategory: "general", repeatable: false, prerequisites: [], featureIds: [], choices: [] };
  if (entityType === "feature") return { ...common, mode: "always_on", activation: "none", prerequisites: [], choices: [], effects: [emptyEffect()], automationLevel: "full" };
  if (entityType === "item") return { ...common, itemType: "gear", weightLb: 0, costCp: 0, stackable: false, consumable: false, requiresAttunement: false, equipmentSlots: [], requirements: [], effects: [] };
  if (entityType === "spell") return { ...common, spellLevel: 0, schoolId: "spell_school.evocation", casting: { actionType: "action", value: 1, reactionTrigger: "" }, range: { type: "distance", distanceFeet: 60 }, area: { shape: "none", sizeFeet: 0 }, duration: { type: "instant", value: 1, concentration: false }, components: { verbal: true, somatic: true, material: false, materialText: "", materialCostCp: 0, materialConsumed: false }, ritual: false, attackType: "none", savingThrowAbility: "", effects: [], scaling: [], automationLevel: "full" };
  return { ...common, referenceCategory: "ability", referenceValue: { code: "custom", order: 100 } };
}

export const initialProject: ForgeProject = {
  schemaVersion: "1.0.0",
  projectId: "wsguild-forge-demo",
  pack: { id: "wsguild.pack.starter", version: "0.1.0", name: "WSGuild Starter Pack", rulesetId: "dnd5e.2024", sourceId: "srd52.source.core", licenseId: "license.cc-by-4.0", author: "WhiteFm" },
  entities: [],
  updatedAt: new Date().toISOString(),
};
