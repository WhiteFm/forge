export type Locale = "ru" | "en";
export type EntityType = "reference" | "species" | "class" | "subclass" | "background" | "feat" | "feature" | "item" | "spell";
export type ContentStatus = "draft" | "review" | "published" | "deprecated";
export type AbilityId = "str" | "dex" | "con" | "int" | "wis" | "cha";
export type EffectMode = "always_on" | "manual_unlimited" | "limited_use" | "equipped" | "attuned" | "on_event";

export interface LocalizedText {
  name: string;
  description: string;
}

export type RuleOperandKind = "number" | "boolean" | "ability_score" | "ability_modifier" | "proficiency_bonus" | "character_level" | "class_level" | "entity" | "selected_value" | "legacy";
export type RuleOperator = "+" | "-" | "*" | "/" | "==" | "!=" | ">" | ">=" | "<" | "<=" | "contains" | "and" | "or";

export interface RuleOperand {
  kind: RuleOperandKind;
  value: string;
  entityId?: string;
  abilityId?: AbilityId;
}

export interface RuleExpression {
  operands: RuleOperand[];
  operators: RuleOperator[];
}

export interface Effect {
  id: string;
  name?: string;
  nameRu?: string;
  target: string;
  operation: "add" | "subtract" | "set" | "set_minimum" | "set_maximum" | "multiply" | "replace_formula" | "grant" | "grant_proficiency" | "upgrade_proficiency" | "grant_advantage" | "grant_disadvantage" | "create_resource" | "restore_resource";
  valueType: "number" | "boolean" | "string" | "formula" | "dice" | "reference";
  value: string;
  valueExpression?: RuleExpression;
  activation: EffectMode;
  actionCost: "none" | "action" | "bonus_action" | "reaction" | "free_action" | "special";
  trigger: string;
  conditions: string[];
  conditionExpressions?: RuleExpression[];
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
  name: string;
  nameRu?: string;
  selectionType: "reference" | "entity" | "number" | "text";
  min: number;
  max: number;
  optionIds: string[];
  filter: string;
  filterExpression?: RuleExpression;
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
  status: ContentStatus;
  localization: Record<Locale, LocalizedText>;

  referenceCategory?: "ability" | "skill" | "language" | "tool" | "damage_type" | "condition" | "sense" | "movement_type" | "size" | "rest_type" | "action_type" | "weapon_property" | "weapon_mastery" | "armor_training" | "spell_school";
  referenceValue?: Record<string, unknown>;

  sizeOptions?: string[];
  lifespanYears?: number;
  baseSpeeds?: Record<string, number>;
  senses?: { vision: number; darkvision: number; blindsight: number };
  featureIds?: string[];
  choices?: ChoiceDefinition[];
  choiceApplications?: ChoiceApplication[];

  hitDie?: "d6" | "d8" | "d10" | "d12";
  primaryAbilities?: AbilityId[];
  multiclassPrerequisite?: string;
  multiclassPrerequisiteExpression?: RuleExpression;
  startingHpFormula?: string;
  startingHpExpression?: RuleExpression;
  levelUpHpFormula?: string;
  levelUpHpExpression?: RuleExpression;
  startingProficiencies?: string[];
  multiclassProficiencies?: string[];
  spellcastingAbility?: AbilityId | "";
  casterProgression?: "none" | "full" | "half_down" | "half_up" | "third" | "pact" | "custom";
  casterLevelFormula?: string;
  casterLevelExpression?: RuleExpression;
  levels?: LevelEntry[];
  classProgression?: ClassProgressionEntry[];

  classId?: string;
  subclassLevels?: LevelEntry[];

  abilityOptions?: AbilityId[];
  abilityScoreIncrease?: AbilityScoreIncrease;
  featIds?: string[];
  skillProficiencySlots?: string[];
  toolProficiencySlots?: string[];
  backgroundFeatureSlots?: string[];
  featChoiceSelections?: Array<{ choiceId: string; optionIds: string[] }>;
  equipmentOptions?: Array<{ id: string; name?: string; nameRu?: string; items: Array<{ itemId: string; quantity: number }>; choiceItems?: Array<{ choiceId: string; quantity: number }>; currencyCp: number }>;

  featCategory?: "origin" | "general" | "fighting_style" | "epic_boon" | "custom";
  repeatable?: boolean;
  repeatConstraint?: string;
  prerequisites?: string[];
  prerequisiteExpressions?: RuleExpression[];

  mode?: "always_on" | "manual_unlimited" | "limited_use";
  activation?: "none" | "action" | "bonus_action" | "reaction" | "free_action" | "special";
  resource?: { id: string; maximumFormula: string; maximumExpression?: RuleExpression; recovery: "short_rest" | "long_rest" | "both" | "dawn" | "turn_start" | "initiative" | "initiative_or_rest" | "manual" | "never"; recoveryFormula: string; recoveryExpression?: RuleExpression };
  effects?: Effect[];
  spellGrants?: GrantedSpell[];
  automationLevel?: "full" | "partial" | "manual";

  itemType?: "gear" | "weapon" | "armor" | "shield" | "tool" | "consumable" | "container" | "wondrous" | "currency" | "spell_material" | "custom";
  weightLb?: number;
  costCp?: number;
  stackable?: boolean;
  consumable?: boolean;
  requiresAttunement?: boolean;
  equipmentSlots?: string[];
  requirements?: string[];
  requirementExpressions?: RuleExpression[];
  materialProfile?: { sourceName: string; observedCostsCp: number[]; usedBySpellIds: string[] };
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
  charges?: { maximumFormula: string; maximumExpression?: RuleExpression; recovery: "short_rest" | "long_rest" | "both" | "dawn" | "manual" | "never" };
  containedItems?: Array<{ itemId: string; quantity: number }>;
  spellcastingFocusFor?: string[];

  spellLevel?: number;
  schoolId?: string;
  casting?: { actionType: "action" | "bonus_action" | "reaction" | "minute" | "hour" | "special"; value: number; reactionTrigger: string; raw?: string };
  range?: { type: "self" | "touch" | "distance" | "sight" | "unlimited" | "special"; distanceFeet: number; distanceValue?: number; distanceUnit?: "feet" | "miles"; raw?: string };
  area?: { shape: "none" | "cone" | "cube" | "cylinder" | "emanation" | "line" | "sphere" | "wall"; sizeFeet: number };
  areas?: Array<{ shape: "none" | "cone" | "cube" | "cylinder" | "emanation" | "line" | "sphere" | "wall" | string; sizeFeet: number; rawShape: string; rawSize: string; dimensionsFeet: Array<{ value: number; kind: string }> }>;
  duration?: { type: "instant" | "rounds" | "minutes" | "hours" | "days" | "until_dispelled" | "special"; value: number; concentration: boolean; raw?: string };
  components?: { verbal: boolean; somatic: boolean; material: boolean; materialText: string; materialCostCp: number; materialConsumed: boolean };
  materialGroups?: Array<{ id: string; name?: string; nameRu?: string; sourceText: string; minimumTotalCostCp: number; sourceCurrency: string; consumed: boolean; entries: Array<{ itemId: string; quantity: number; minimumCostCp: number; consumed: boolean }> }>;
  spellCategories?: Array<"damage" | "healing" | "neutral" | string>;
  spellProfiles?: Array<{ sourceSheet: string; sourceRow: number; category: string; dice: { initialCount: number; initialDie: string; periodicCount: number; periodicDie: string; periodRounds: number }; higherLevel: { enabled: boolean } }>;
  ritual?: boolean;
  attackType?: "none" | "melee_spell" | "ranged_spell";
  savingThrowAbility?: AbilityId | "";
  spellClassIds?: string[];
  scaling?: Array<{ type: "character_level" | "spell_slot_level" | "class_level"; at: number; value: string }>;
}

export interface ForgeProject {
  schemaVersion: string;
  pack: {
    id: string;
    version: string;
    name: string;
    rulesetId: string;
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
