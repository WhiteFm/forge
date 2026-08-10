export type Locale = "ru" | "en";
export type EntityType = "reference" | "species" | "class" | "subclass" | "background" | "feat" | "feature" | "item" | "spell";
export type ContentStatus = "draft" | "review" | "published" | "deprecated";
export type AbilityId = "str" | "dex" | "con" | "int" | "wis" | "cha";
export type EffectMode = "always_on" | "manual_unlimited" | "limited_use" | "equipped" | "attuned" | "on_event";

export interface LocalizedText {
  name: string;
  description: string;
}

export interface Effect {
  id: string;
  target: string;
  operation: "add" | "subtract" | "set" | "set_minimum" | "set_maximum" | "multiply" | "replace_formula" | "grant" | "grant_proficiency" | "upgrade_proficiency" | "grant_advantage" | "grant_disadvantage" | "create_resource" | "restore_resource";
  valueType: "number" | "boolean" | "string" | "formula" | "dice" | "reference";
  value: string;
  activation: EffectMode;
  actionCost: "none" | "action" | "bonus_action" | "reaction" | "free_action" | "special";
  trigger: string;
  conditions: string[];
  stacking: "sum" | "maximum" | "minimum" | "replace" | "non_stacking" | "unique_by_source";
  stackingGroup: string;
  priority: number;
  resourceId: string;
  durationType: "instant" | "rounds" | "minutes" | "hours" | "until_rest" | "permanent";
  durationValue: number;
  restType: "short" | "long";
  automationLevel: "full" | "partial" | "manual";
  notes: string;
}

export interface ChoiceDefinition {
  id: string;
  selectionType: "reference" | "entity" | "number" | "text";
  min: number;
  max: number;
  optionIds: string[];
  filter: string;
}

export interface LevelEntry {
  level: number;
  featureIds: string[];
}

export interface ChoiceApplication {
  choiceId: string;
  target: string;
  operation: "grant" | "grant_proficiency" | "set" | "add";
  valueTemplate: string;
}

export interface AbilityScoreIncrease {
  allowedAbilities: AbilityId[];
  distributions: number[][];
  maximumScore: number;
}

export interface GrantedSpell {
  spellId: string;
  atCharacterLevel: number;
  alwaysPrepared: boolean;
  freeUsesFormula: string;
  recovery: "short_rest" | "long_rest" | "both" | "dawn" | "manual" | "never";
  allowSpellSlots: boolean;
  spellcastingAbilityOptions: AbilityId[];
}

export interface ClassProgressionEntry {
  level: number;
  proficiencyBonus: number;
  cantripsKnown: number;
  preparedSpells: number;
  spellSlots: number[];
}

export interface ForgeEntity {
  id: string;
  entityType: EntityType;
  rulesetId: string;
  sourceId: string;
  sourceVersion: string;
  licenseId: string;
  status: ContentStatus;
  tags: string[];
  localization: Record<Locale, LocalizedText>;

  referenceCategory?: "ability" | "skill" | "language" | "tool" | "damage_type" | "condition" | "sense" | "movement_type" | "size" | "rest_type" | "action_type" | "weapon_property" | "weapon_mastery" | "armor_training" | "spell_school";
  referenceValue?: Record<string, unknown>;

  sizeOptions?: string[];
  creatureTypeId?: string;
  lifespanYears?: number;
  baseSpeeds?: Record<string, number>;
  featureIds?: string[];
  choices?: ChoiceDefinition[];
  choiceApplications?: ChoiceApplication[];

  hitDie?: "d6" | "d8" | "d10" | "d12";
  primaryAbilities?: AbilityId[];
  multiclassPrerequisite?: string;
  startingHpFormula?: string;
  levelUpHpFormula?: string;
  startingProficiencies?: string[];
  multiclassProficiencies?: string[];
  spellcastingAbility?: AbilityId | "";
  casterProgression?: "none" | "full" | "half_down" | "half_up" | "third" | "pact" | "custom";
  casterLevelFormula?: string;
  levels?: LevelEntry[];
  classProgression?: ClassProgressionEntry[];

  classId?: string;
  subclassLevels?: LevelEntry[];

  abilityOptions?: AbilityId[];
  abilityScoreIncrease?: AbilityScoreIncrease;
  featId?: string;
  featChoiceSelections?: Array<{ choiceId: string; optionIds: string[] }>;
  proficiencyGrants?: string[];
  equipmentOptions?: Array<{ id: string; items: Array<{ itemId: string; quantity: number }>; choiceItems?: Array<{ choiceId: string; quantity: number }>; currencyCp: number }>;

  featCategory?: "origin" | "general" | "fighting_style" | "epic_boon" | "custom";
  repeatable?: boolean;
  repeatConstraint?: string;
  prerequisites?: string[];

  mode?: "always_on" | "manual_unlimited" | "limited_use";
  activation?: "none" | "action" | "bonus_action" | "reaction" | "free_action" | "special";
  resource?: { id: string; maximumFormula: string; recovery: "short_rest" | "long_rest" | "both" | "dawn" | "turn_start" | "initiative" | "initiative_or_rest" | "manual" | "never"; recoveryFormula: string };
  effects?: Effect[];
  spellGrants?: GrantedSpell[];
  automationLevel?: "full" | "partial" | "manual";

  itemType?: "gear" | "weapon" | "armor" | "shield" | "tool" | "consumable" | "container" | "wondrous" | "currency" | "custom";
  weightLb?: number;
  costCp?: number;
  stackable?: boolean;
  consumable?: boolean;
  requiresAttunement?: boolean;
  equipmentSlots?: string[];
  requirements?: string[];
  weaponProfile?: {
    category: "simple_melee" | "simple_ranged" | "martial_melee" | "martial_ranged" | "custom";
    damage: string;
    damageTypeId: string;
    scalingAbility: "str" | "dex" | "finesse" | "custom";
    rangeNormalFeet: number;
    rangeLongFeet: number;
    propertyIds: string[];
    masteryId: string;
  };
  armorProfile?: {
    category: "light" | "medium" | "heavy" | "shield" | "custom";
    baseAc: number;
    addsDexterity: boolean;
    maxDexterityBonus: number;
    strengthRequirement: number;
    stealthDisadvantage: boolean;
  };
  charges?: { maximumFormula: string; recovery: "short_rest" | "long_rest" | "both" | "dawn" | "manual" | "never" };
  containedItems?: Array<{ itemId: string; quantity: number }>;
  spellcastingFocusFor?: string[];

  spellLevel?: number;
  schoolId?: string;
  casting?: { actionType: "action" | "bonus_action" | "reaction" | "minute" | "hour" | "special"; value: number; reactionTrigger: string };
  range?: { type: "self" | "touch" | "distance" | "sight" | "unlimited" | "special"; distanceFeet: number };
  area?: { shape: "none" | "cone" | "cube" | "cylinder" | "emanation" | "line" | "sphere" | "wall"; sizeFeet: number };
  duration?: { type: "instant" | "rounds" | "minutes" | "hours" | "days" | "until_dispelled" | "special"; value: number; concentration: boolean };
  components?: { verbal: boolean; somatic: boolean; material: boolean; materialText: string; materialCostCp: number; materialConsumed: boolean };
  ritual?: boolean;
  attackType?: "none" | "melee_spell" | "ranged_spell";
  savingThrowAbility?: AbilityId | "";
  spellClassIds?: string[];
  scaling?: Array<{ type: "character_level" | "spell_slot_level" | "class_level"; at: number; value: string }>;
}

export interface ForgeProject {
  schemaVersion: string;
  projectId: string;
  pack: {
    id: string;
    version: string;
    name: string;
    rulesetId: string;
    sourceId: string;
    licenseId: string;
    author: string;
    defaultLocale?: Locale;
    attribution?: string;
  };
  entities: ForgeEntity[];
  updatedAt: string;
}

export interface ValidationIssue {
  severity: "error" | "warning";
  entityId?: string;
  path: string;
  message: string;
}
