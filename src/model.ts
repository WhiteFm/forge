import { buildCoreRulesCatalog } from "./rules-catalog";
import { PH24_EQUIPMENT } from "./equipment-catalog";
import {
  DEFAULT_RULE_ENGINE,
  type RuleEngineDefinition,
  type RuleSet,
  type ValueExpression,
} from "./rule-system";

export type Locale = "en" | "ru" | "sv";
export type LocalText = { en: string; ru?: string; sv?: string };
export type StorageMode = "input" | "derived" | "runtime" | "constant";
export type AtomicDataType =
  | "integer"
  | "decimal"
  | "boolean"
  | "text"
  | "die"
  | "enum"
  | "reference"
  | "record"
  | "collection"
  | "action"
  | "event"
  | "position"
  | "duration"
  | "dice_expression";
export type ReferenceKind = "parameter" | "value" | "effect";
export type EntityType =
  | "class"
  | "multiclass"
  | "subclass"
  | "species"
  | "background"
  | "feat"
  | "feature"
  | "item"
  | "spell";
export type PropertyType =
  | "string"
  | "localized_short"
  | "localized_long"
  | "integer"
  | "decimal"
  | "boolean"
  | "select"
  | "reference"
  | "references"
  | "entity"
  | "entities"
  | "group"
  | "list"
  | "formula"
  | "condition"
  | "effect"
  | "dice"
  | "table"
  | "guided"
  | "guided_list"
  | "rule_set"
  | "condition_set"
  | "calculation"
  | "hp_progression"
  | "resource"
  | "duration_rounds"
  | "area"
  | "damage"
  | "choice_set"
  | "target_selector";

export interface GuidedField {
  key: string;
  name: LocalText;
  type:
    | "number"
    | "boolean"
    | "select"
    | "reference"
    | "entity"
    | "dice"
    | "calculation";
  optionGroup?: string;
  allowedEntityTypes?: EntityType[];
  minimum?: number;
  maximum?: number;
  defaultValue?: unknown;
}

export interface Category {
  id: string;
  name: LocalText;
  locked: true;
}

export interface AtomicRecord {
  id: string;
  key: string;
  name: LocalText;
  description: LocalText;
  categoryId: string;
  dataType: AtomicDataType;
  storageMode: StorageMode;
  unit?: string;
  minimum?: number;
  maximum?: number;
  calculation?: ValueExpression;
  /** @deprecated Kept only so old editable projects can be migrated. */
  formula?: string;
  dieSides?: number;
  optionGroup?: string;
  fields?: AtomicField[];
  dependencyIds?: string[];
  rule?: LocalText;
  warningOnly?: boolean;
  packId?: string;
  locked: boolean;
  previousIds: string[];
}

export interface AtomicField {
  id: string;
  key: string;
  name: LocalText;
  dataType: AtomicDataType;
  required: boolean;
  storageMode?: StorageMode;
  unit?: string;
  minimum?: number;
  maximum?: number;
  optionGroup?: string;
  atomicId?: string;
  multiple?: boolean;
}

export interface TableColumn {
  id: string;
  key: string;
  name: LocalText;
  type: PropertyType;
  required: boolean;
  formula?: string;
}

export interface TableDefinition {
  columns: TableColumn[];
  rows: Array<{ rowId: string; values: Record<string, unknown> }>;
  keyMode?: "manual" | "sequential";
  maximumRows?: number;
}

export interface EffectOperation {
  id: string;
  operator:
    | "add"
    | "subtract"
    | "multiply"
    | "divide"
    | "set"
    | "minimum"
    | "maximum"
    | "roll"
    | "grant"
    | "remove";
  targetAtomicId: string;
  valueSource: "number" | "atomic" | "input" | "die";
  value: string | number;
}

export interface ReferenceRecord {
  id: string;
  key: string;
  kind: ReferenceKind;
  name: LocalText;
  description: LocalText;
  categoryId: string;
  packId?: string;
  locked: boolean;
  previousIds: string[];
  propertyType?: PropertyType;
  required?: boolean;
  multiple?: boolean;
  minimum?: number;
  maximum?: number;
  allowedReferenceKinds?: ReferenceKind[];
  optionGroup?: string;
  allowedEntityTypes?: EntityType[];
  value?: unknown;
  table?: TableDefinition;
  ruleSet?: RuleSet;
  /** @deprecated Kept only so old editable projects can be migrated. */
  operations?: EffectOperation[];
  uiFields?: GuidedField[];
}

export interface TemplateField {
  id: string;
  referenceId: string;
  required: boolean;
  multiple: boolean;
  order: number;
  defaultValue?: unknown;
}

export interface EntityTemplate {
  id: string;
  type: EntityType;
  categoryId: string;
  name: LocalText;
  fields: TemplateField[];
  previousIds: string[];
}

export interface ForgeEntity {
  id: string;
  key: string;
  type: EntityType;
  templateId: string;
  name: LocalText;
  values: Record<string, unknown>;
  previousIds: string[];
  packId?: string;
}

export interface Dependency {
  refId: string;
  minimumVersion: string;
  compatibleMajor: number;
  access: "editable" | "read_only";
  verified: boolean;
  embedded?: ForgeProject;
}

export interface ForgeProject {
  format: "wsg-forge-project";
  schemaVersion: 3;
  catalogVersion: 12;
  namespace: string;
  version: string;
  defaultLocale: "en";
  ruleEngine: RuleEngineDefinition;
  reference: { id: string; key: string; name: LocalText; version: string };
  pack: {
    id: string;
    key: string;
    name: LocalText;
    subtitle: LocalText;
    description: LocalText;
    version: string;
    requiredRefs: Array<{
      id: string;
      minimumVersion: string;
      compatibleMajor: number;
    }>;
  };
  categories: Category[];
  atomics: AtomicRecord[];
  references: ReferenceRecord[];
  templates: EntityTemplate[];
  entities: ForgeEntity[];
  dependencies: Dependency[];
  createdAt: string;
  updatedAt: string;
}

const categoryRows: Array<[string, string, string, string]> = [
  ["general", "General", "Общее", "Allmänt"],
  [
    "values_options",
    "Values and Options",
    "Значения и варианты",
    "Värden och alternativ",
  ],
  [
    "character_identity",
    "Character Identity",
    "Идентичность персонажа",
    "Karaktärsidentitet",
  ],
  [
    "creature_body",
    "Creature and Body",
    "Существо и тело",
    "Varelse och kropp",
  ],
  [
    "level_progression",
    "Level and Progression",
    "Уровни и прогрессия",
    "Nivå och progression",
  ],
  ["abilities", "Abilities", "Характеристики", "Grundegenskaper"],
  [
    "skills_checks",
    "Skills and Checks",
    "Навыки и проверки",
    "Färdigheter och slag",
  ],
  ["saving_throws", "Saving Throws", "Спасброски", "Räddningsslag"],
  [
    "hit_points_healing",
    "Hit Points and Healing",
    "Хиты и лечение",
    "Träffpoäng och läkning",
  ],
  [
    "damage_defense",
    "Damage and Defense",
    "Урон и защита",
    "Skada och försvar",
  ],
  [
    "armor_class",
    "Armor Class and Defense",
    "Класс доспеха и защита",
    "Rustningsklass och försvar",
  ],
  ["conditions", "Conditions", "Состояния", "Tillstånd"],
  [
    "actions_timing",
    "Actions and Timing",
    "Действия и время",
    "Handlingar och timing",
  ],
  [
    "attacks_hits",
    "Attacks and Hits",
    "Атаки и попадания",
    "Attacker och träffar",
  ],
  ["targets_areas", "Targets and Areas", "Цели и области", "Mål och områden"],
  [
    "movement_position",
    "Movement and Position",
    "Движение и позиция",
    "Förflyttning och position",
  ],
  [
    "senses_perception",
    "Senses and Perception",
    "Чувства и восприятие",
    "Sinnen och varseblivning",
  ],
  ["proficiencies", "Proficiencies", "Владения", "Kompetenser"],
  ["languages", "Languages", "Языки", "Språk"],
  [
    "weapons_mastery",
    "Weapons and Mastery",
    "Оружие и мастерство",
    "Vapen och mästerskap",
  ],
  ["armor", "Armor", "Доспехи", "Rustningar"],
  [
    "items_inventory",
    "Items and Inventory",
    "Предметы и инвентарь",
    "Föremål och inventarium",
  ],
  [
    "economy_currency",
    "Economy and Currency",
    "Экономика и валюта",
    "Ekonomi och valuta",
  ],
  [
    "resources_charges",
    "Resources and Charges",
    "Ресурсы и заряды",
    "Resurser och laddningar",
  ],
  [
    "rest_recovery",
    "Rest and Recovery",
    "Отдых и восстановление",
    "Vila och återhämtning",
  ],
  [
    "magic_spells",
    "Magic and Spells",
    "Магия и заклинания",
    "Magi och besvärjelser",
  ],
  [
    "components_casting",
    "Components and Casting",
    "Компоненты и сотворение",
    "Komponenter och kastande",
  ],
  ["duration", "Duration", "Длительность", "Varaktighet"],
  ["choices", "Choices", "Выборы", "Val"],
  ["prerequisites", "Prerequisites", "Требования", "Förkrav"],
  [
    "dice_randomness",
    "Dice and Randomness",
    "Кости и случайность",
    "Tärningar och slump",
  ],
  [
    "formulas",
    "Formulas and Calculations",
    "Формулы и расчёты",
    "Formler och beräkningar",
  ],
  ["tables", "Tables", "Таблицы", "Tabeller"],
  ["effects", "Effects", "Эффекты", "Effekter"],
  [
    "triggers_automation",
    "Triggers and Automation",
    "Триггеры и автоматизация",
    "Utlösare och automation",
  ],
  [
    "summons_companions",
    "Summons and Companions",
    "Призывы и спутники",
    "Åkallelser och följeslagare",
  ],
  [
    "narrative_social",
    "Narrative and Social",
    "Нарратив и общение",
    "Berättelse och socialt",
  ],
  [
    "units_measurements",
    "Units and Measurements",
    "Единицы измерения",
    "Enheter och mått",
  ],
  [
    "death_stabilization",
    "Death and Stabilization",
    "Смерть и стабилизация",
    "Död och stabilisering",
  ],
  [
    "light_visibility",
    "Light and Visibility",
    "Свет и видимость",
    "Ljus och sikt",
  ],
  [
    "cover_line",
    "Cover and Line of Effect",
    "Укрытие и линия эффекта",
    "Skydd och effektlinje",
  ],
  [
    "environment_hazards",
    "Environment and Hazards",
    "Окружение и опасности",
    "Miljö och faror",
  ],
  [
    "travel_exploration",
    "Travel and Exploration",
    "Путешествия и исследование",
    "Resor och utforskning",
  ],
  [
    "classes_multiclassing",
    "Classes and Multiclassing",
    "Классы и мультиклассирование",
    "Klasser och multiklassning",
  ],
  [
    "creatures_statblocks",
    "Creatures and Stat Blocks",
    "Существа и блоки параметров",
    "Varelser och statistikblock",
  ],
  [
    "mounts_vehicles",
    "Mounts, Vehicles and Objects",
    "Ездовые, транспорт и объекты",
    "Riddjur, fordon och objekt",
  ],
  [
    "afflictions",
    "Poisons, Diseases and Curses",
    "Яды, болезни и проклятия",
    "Gifter, sjukdomar och förbannelser",
  ],
  [
    "downtime_services",
    "Downtime, Crafting and Services",
    "Свободное время, ремесло и услуги",
    "Fritid, hantverk och tjänster",
  ],
  [
    "stacking_priority",
    "Stacking and Priority",
    "Сложение и приоритет",
    "Stapling och prioritet",
  ],
  [
    "ownership_control",
    "Ownership and Control",
    "Владение и контроль",
    "Ägande och kontroll",
  ],
  [
    "encounters_initiative",
    "Encounters and Initiative",
    "Столкновения и инициатива",
    "Möten och initiativ",
  ],
  [
    "objects_structures",
    "Objects and Structures",
    "Объекты и сооружения",
    "Objekt och strukturer",
  ],
  ["transformations", "Transformations", "Трансформации", "Förvandlingar"],
  ["auras_zones", "Auras and Zones", "Ауры и зоны", "Auror och zoner"],
  [
    "reactions_interrupts",
    "Reactions and Interrupts",
    "Реакции и прерывания",
    "Reaktioner och avbrott",
  ],
  [
    "immunities_exceptions",
    "Immunities and Rule Exceptions",
    "Иммунитеты и исключения",
    "Immuniteter och regelundantag",
  ],
  ["template_classes", "Class Templates", "Шаблоны классов", "Klassmallar"],
  [
    "template_multiclasses",
    "Multiclass Templates",
    "Шаблоны мультиклассов",
    "Multiklassmallar",
  ],
  [
    "template_subclasses",
    "Subclass Templates",
    "Шаблоны подклассов",
    "Underklassmallar",
  ],
  ["template_species", "Species Templates", "Шаблоны видов", "Artmallar"],
  [
    "template_backgrounds",
    "Background Templates",
    "Шаблоны предысторий",
    "Bakgrundsmallar",
  ],
  ["template_feats", "Feat Templates", "Шаблоны черт", "Talangmallar"],
  ["template_features", "Feature Templates", "Шаблоны умений", "Förmågemallar"],
  ["template_item_weapons", "Weapons", "Оружие", "Vapen"],
  ["template_item_ammunition", "Ammunition", "Боеприпасы", "Ammunition"],
  ["template_item_armor", "Armor", "Доспехи", "Rustningar"],
  ["template_item_shields", "Shields", "Щиты", "Sköldar"],
  ["template_item_boots", "Boots", "Сапоги", "Stövlar"],
  ["template_item_bracers", "Bracers", "Наручи", "Armskydd"],
  ["template_item_belts", "Belts", "Пояса", "Bälten"],
  ["template_item_cloaks", "Cloaks", "Плащи", "Mantlar"],
  [
    "template_item_headwear",
    "Helmets and Hats",
    "Шлемы и шляпы",
    "Hjälmar och hattar",
  ],
  ["template_item_rings", "Rings", "Кольца", "Ringar"],
  ["template_item_tools", "Tools", "Инструменты", "Verktyg"],
  [
    "template_item_consumables",
    "Consumables",
    "Расходуемые предметы",
    "Förbrukningsföremål",
  ],
  ["template_item_containers", "Containers", "Контейнеры", "Behållare"],
  [
    "template_item_gear",
    "Adventuring Gear",
    "Снаряжение",
    "Äventyrsutrustning",
  ],
  [
    "template_item_focuses",
    "Spellcasting Focuses",
    "Магические фокусировки",
    "Besvärjelsefokus",
  ],
  [
    "template_item_materials",
    "Material Components",
    "Материальные компоненты",
    "Materiella komponenter",
  ],
  [
    "template_item_vehicles",
    "Mounts and Vehicles",
    "Ездовые животные и транспорт",
    "Riddjur och fordon",
  ],
  [
    "template_item_treasure",
    "Treasure and Currency",
    "Сокровища и валюта",
    "Skatter och valuta",
  ],
  [
    "template_spells",
    "Spell Templates",
    "Шаблоны заклинаний",
    "Besvärjelsemallar",
  ],
  ["custom", "Custom", "Пользовательское", "Anpassat"],
];

export const STANDARD_CATEGORIES: Category[] = categoryRows.map(
  ([key, en, ru, sv]) => ({
    id: `wsg.category.${key}`,
    name: { en, ru, sv },
    locked: true,
  }),
);

const atomicRows: Array<
  [
    string,
    string,
    string,
    string,
    string,
    AtomicDataType,
    StorageMode,
    string?,
    number?,
    number?,
  ]
> = [
  [
    "level",
    "Level",
    "Уровень",
    "Nivå",
    "level_progression",
    "integer",
    "input",
    "LVL",
    1,
    20,
  ],
  [
    "experience",
    "Experience",
    "Опыт",
    "Erfarenhet",
    "level_progression",
    "integer",
    "input",
    "XP",
    0,
  ],
  [
    "proficiency_bonus",
    "Proficiency Bonus",
    "Бонус мастерства",
    "Kompetensbonus",
    "level_progression",
    "integer",
    "derived",
    "PB",
  ],
  [
    "armor_class",
    "Armor Class",
    "Класс доспеха",
    "Rustningsklass",
    "armor_class",
    "integer",
    "derived",
    "AC",
    0,
  ],
  [
    "initiative",
    "Initiative",
    "Инициатива",
    "Initiativ",
    "encounters_initiative",
    "integer",
    "derived",
  ],
  [
    "hit_points_current",
    "Current Hit Points",
    "Текущие хиты",
    "Nuvarande träffpoäng",
    "hit_points_healing",
    "integer",
    "runtime",
    "HP",
    0,
  ],
  [
    "hit_points_maximum",
    "Maximum Hit Points",
    "Максимальные хиты",
    "Maximala träffpoäng",
    "hit_points_healing",
    "integer",
    "derived",
    "HP",
    0,
  ],
  [
    "hit_points_temporary",
    "Temporary Hit Points",
    "Временные хиты",
    "Tillfälliga träffpoäng",
    "hit_points_healing",
    "integer",
    "runtime",
    "HP",
    0,
  ],
  [
    "strength",
    "Strength",
    "Сила",
    "Styrka",
    "abilities",
    "integer",
    "input",
    "STR",
    1,
    30,
  ],
  [
    "dexterity",
    "Dexterity",
    "Ловкость",
    "Smidighet",
    "abilities",
    "integer",
    "input",
    "DEX",
    1,
    30,
  ],
  [
    "constitution",
    "Constitution",
    "Телосложение",
    "Fysik",
    "abilities",
    "integer",
    "input",
    "CON",
    1,
    30,
  ],
  [
    "intelligence",
    "Intelligence",
    "Интеллект",
    "Intelligens",
    "abilities",
    "integer",
    "input",
    "INT",
    1,
    30,
  ],
  [
    "wisdom",
    "Wisdom",
    "Мудрость",
    "Visdom",
    "abilities",
    "integer",
    "input",
    "WIS",
    1,
    30,
  ],
  [
    "charisma",
    "Charisma",
    "Харизма",
    "Karisma",
    "abilities",
    "integer",
    "input",
    "CHA",
    1,
    30,
  ],
  [
    "speed_walk",
    "Walking Speed",
    "Скорость ходьбы",
    "Gånghastighet",
    "movement_position",
    "integer",
    "derived",
    "ft",
    0,
  ],
  [
    "speed_fly",
    "Flying Speed",
    "Скорость полёта",
    "Flyghastighet",
    "movement_position",
    "integer",
    "derived",
    "ft",
    0,
  ],
  [
    "speed_swim",
    "Swimming Speed",
    "Скорость плавания",
    "Simhastighet",
    "movement_position",
    "integer",
    "derived",
    "ft",
    0,
  ],
  [
    "speed_climb",
    "Climbing Speed",
    "Скорость лазания",
    "Klättringshastighet",
    "movement_position",
    "integer",
    "derived",
    "ft",
    0,
  ],
  [
    "vision",
    "Vision Range",
    "Дальность зрения",
    "Synräckvidd",
    "senses_perception",
    "integer",
    "derived",
    "ft",
    0,
  ],
  [
    "darkvision",
    "Darkvision Range",
    "Дальность темнозрения",
    "Mörkersyn",
    "senses_perception",
    "integer",
    "derived",
    "ft",
    0,
  ],
  [
    "blindsight",
    "Blindsight Range",
    "Дальность слепого зрения",
    "Blindseende",
    "senses_perception",
    "integer",
    "derived",
    "ft",
    0,
  ],
  [
    "carrying_capacity",
    "Carrying Capacity",
    "Грузоподъёмность",
    "Bärkapacitet",
    "items_inventory",
    "integer",
    "derived",
    "lb",
    0,
  ],
  [
    "push_drag_lift",
    "Push, Drag or Lift",
    "Толчок, волочение или подъём",
    "Skjuta, dra eller lyfta",
    "items_inventory",
    "integer",
    "derived",
    "lb",
    0,
  ],
];

const dice = [2, 3, 4, 6, 8, 10, 12, 20, 100];

export const STANDARD_ATOMICS: AtomicRecord[] = [
  ...atomicRows.map(
    ([
      key,
      en,
      ru,
      sv,
      category,
      dataType,
      storageMode,
      unit,
      minimum,
      maximum,
    ]) => ({
      id: `wsg.atomic.${key}`,
      key,
      name: { en, ru, sv },
      description: { en: "", ru: "", sv: "" },
      categoryId: `wsg.category.${category}`,
      dataType,
      storageMode,
      unit,
      minimum,
      maximum,
      locked: true,
      previousIds: [],
    }),
  ),
  ...dice.map((sides) => ({
    id: `wsg.atomic.d${sides}`,
    key: `d${sides}`,
    name: { en: `d${sides}`, ru: `к${sides}`, sv: `t${sides}` },
    description: { en: "", ru: "", sv: "" },
    categoryId: "wsg.category.dice_randomness",
    dataType: "die" as const,
    storageMode: "input" as const,
    dieSides: sides,
    minimum: 1,
    maximum: sides,
    locked: true,
    previousIds: [],
  })),
];

const parameter = (
  key: string,
  en: string,
  ru: string,
  sv: string,
  category: string,
  propertyType: PropertyType,
  required = false,
): ReferenceRecord => ({
  id: `wsg.ref.parameter.${key}`,
  key,
  kind: "parameter",
  name: { en, ru, sv },
  description: { en: "", ru: "", sv: "" },
  categoryId: `wsg.category.${category}`,
  locked: true,
  previousIds: [],
  propertyType,
  required,
  multiple: ["references", "entities"].includes(propertyType),
  table:
    propertyType === "table"
      ? {
          columns: [
            {
              id: "level",
              key: "level",
              name: { en: "LVL", ru: "УР.", sv: "NV." },
              type: "integer",
              required: true,
            },
          ],
          rows: [],
        }
      : undefined,
});
const value = (
  key: string,
  en: string,
  ru: string,
  sv: string,
  category: string,
): ReferenceRecord => ({
  id: `wsg.ref.value.${key}`,
  key,
  kind: "value",
  name: { en, ru, sv },
  description: { en: "", ru: "", sv: "" },
  categoryId: `wsg.category.${category}`,
  locked: true,
  previousIds: [],
  value: key,
});
const effect = (
  key: string,
  en: string,
  ru: string,
  sv: string,
  operation: EffectOperation["operator"],
): ReferenceRecord => ({
  id: `wsg.ref.effect.${key}`,
  key,
  kind: "effect",
  name: { en, ru, sv },
  description: { en: "", ru: "", sv: "" },
  categoryId: "wsg.category.effects",
  locked: true,
  previousIds: [],
  operations: [
    {
      id: `${key}.operation_1`,
      operator: operation,
      targetAtomicId: "",
      valueSource: "input",
      value: "",
    },
  ],
});

export const STANDARD_REFERENCES: ReferenceRecord[] = [
  parameter(
    "name",
    "Name",
    "Название",
    "Namn",
    "character_identity",
    "localized_short",
    true,
  ),
  parameter(
    "description",
    "Description",
    "Описание",
    "Beskrivning",
    "narrative_social",
    "localized_long",
  ),
  parameter(
    "level",
    "Level",
    "Уровень",
    "Nivå",
    "level_progression",
    "integer",
  ),
  parameter(
    "prerequisites",
    "Prerequisites",
    "Требования",
    "Förkrav",
    "prerequisites",
    "condition",
  ),
  parameter(
    "features",
    "Granted Features",
    "Получаемые умения",
    "Erhållna förmågor",
    "effects",
    "entities",
  ),
  parameter(
    "influences",
    "Influences",
    "Влияния",
    "Påverkningar",
    "effects",
    "references",
  ),
  parameter("choices", "Choices", "Выборы", "Val", "choices", "list"),
  parameter(
    "progression",
    "Progression",
    "Прогрессия",
    "Progression",
    "tables",
    "table",
  ),
  parameter(
    "parent_class",
    "Parent Class",
    "Родительский класс",
    "Överordnad klass",
    "classes_multiclassing",
    "entity",
  ),
  parameter(
    "base_class",
    "Base Class",
    "Базовый класс",
    "Basklass",
    "classes_multiclassing",
    "entity",
  ),
  parameter(
    "spell_level",
    "Spell Level",
    "Уровень заклинания",
    "Besvärjelsenivå",
    "magic_spells",
    "integer",
  ),
  parameter(
    "cost_cp",
    "Cost, cp",
    "Стоимость, мм",
    "Kostnad, cp",
    "economy_currency",
    "integer",
  ),
  ...[
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma",
  ].map((key) =>
    value(
      key,
      key[0].toUpperCase() + key.slice(1),
      (
        {
          strength: "Сила",
          dexterity: "Ловкость",
          constitution: "Телосложение",
          intelligence: "Интеллект",
          wisdom: "Мудрость",
          charisma: "Харизма",
        } as Record<string, string>
      )[key],
      (
        {
          strength: "Styrka",
          dexterity: "Smidighet",
          constitution: "Fysik",
          intelligence: "Intelligens",
          wisdom: "Visdom",
          charisma: "Karisma",
        } as Record<string, string>
      )[key],
      "abilities",
    ),
  ),
  ...["tiny", "small", "medium", "large", "huge", "gargantuan"].map((key) =>
    value(
      key,
      key[0].toUpperCase() + key.slice(1),
      (
        {
          tiny: "Крошечный",
          small: "Маленький",
          medium: "Средний",
          large: "Большой",
          huge: "Огромный",
          gargantuan: "Колоссальный",
        } as Record<string, string>
      )[key],
      (
        {
          tiny: "Pytteliten",
          small: "Liten",
          medium: "Medelstor",
          large: "Stor",
          huge: "Enorm",
          gargantuan: "Gigantisk",
        } as Record<string, string>
      )[key],
      "creature_body",
    ),
  ),
  ...[
    "acid",
    "bludgeoning",
    "cold",
    "fire",
    "force",
    "lightning",
    "necrotic",
    "piercing",
    "poison",
    "psychic",
    "radiant",
    "slashing",
    "thunder",
  ].map((key) =>
    value(key, key[0].toUpperCase() + key.slice(1), key, key, "damage_defense"),
  ),
  effect(
    "modify_atomic",
    "Modify Atomic",
    "Изменить атомарное значение",
    "Ändra atomärt värde",
    "add",
  ),
  effect(
    "deal_damage",
    "Deal Damage",
    "Нанести урон",
    "Tillfoga skada",
    "subtract",
  ),
  effect("heal", "Heal", "Исцелить", "Läk", "add"),
  effect(
    "set_minimum",
    "Set Minimum",
    "Задать минимум",
    "Sätt minimum",
    "minimum",
  ),
  effect(
    "set_maximum",
    "Set Maximum",
    "Задать максимум",
    "Sätt maximum",
    "maximum",
  ),
  effect("roll_dice", "Roll Dice", "Бросить кости", "Slå tärningar", "roll"),
  effect("grant", "Grant", "Выдать", "Ge", "grant"),
  effect("remove", "Remove", "Удалить", "Ta bort", "remove"),
];

export const ENTITY_TYPES: EntityType[] = [
  "class",
  "multiclass",
  "subclass",
  "species",
  "background",
  "feat",
  "feature",
  "item",
  "spell",
];

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[.']/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function localized(text: LocalText, locale: Locale) {
  return text[locale]?.trim() || text.en;
}

export function createCleanProject(): ForgeProject {
  const now = new Date().toISOString();
  const namespace = "mygame";
  const refKey = "core";
  const packKey = "characters";
  const catalog = buildCoreRulesCatalog();
  const project: ForgeProject = {
    format: "wsg-forge-project",
    schemaVersion: 3,
    catalogVersion: 12,
    namespace,
    version: "1.0.0",
    defaultLocale: "en",
    ruleEngine: structuredClone(DEFAULT_RULE_ENGINE),
    reference: {
      id: `${namespace}.ref.${refKey}`,
      key: refKey,
      name: {
        en: "Core Reference",
        ru: "Основной справочник",
        sv: "Grundreferens",
      },
      version: "1.0.0",
    },
    pack: {
      id: `${namespace}.pack.${packKey}`,
      key: packKey,
      name: {
        en: "New Content Pack",
        ru: "Новый пак контента",
        sv: "Nytt innehållspaket",
      },
      subtitle: { en: "" },
      description: { en: "" },
      version: "1.0.0",
      requiredRefs: [
        {
          id: `${namespace}.ref.${refKey}`,
          minimumVersion: "1.0.0",
          compatibleMajor: 1,
        },
      ],
    },
    categories: structuredClone(STANDARD_CATEGORIES),
    atomics: catalog.atomics,
    references: catalog.references,
    templates: catalog.templates,
    entities: structuredClone(PH24_EQUIPMENT),
    dependencies: [],
    createdAt: now,
    updatedAt: now,
  };
  return recalculateProjectIds(project);
}

export function upgradeProjectCatalog(project: ForgeProject): ForgeProject {
  if (project.catalogVersion === 12 && project.ruleEngine) return project;
  // Schema 12 starts from the no-code rules model and the PH24 item catalog. Older
  // projects contained executable strings and incompatible field structures,
  // so silently carrying them over would produce incorrect game math.
  return createCleanProject();
}

export function recalculateProjectIds(project: ForgeProject): ForgeProject {
  const next = structuredClone(project);
  const mapping = new Map<string, string>();
  const refId = `${next.namespace}.ref.${slugify(next.reference.key) || "core"}`;
  const packId = `${next.namespace}.pack.${slugify(next.pack.key) || "characters"}`;
  mapping.set(next.reference.id, refId);
  mapping.set(next.pack.id, packId);
  next.reference.id = refId;
  next.pack.id = packId;
  next.pack.requiredRefs = [
    {
      id: refId,
      minimumVersion: next.reference.version,
      compatibleMajor: Number(next.reference.version.split(".")[0]) || 1,
    },
  ];
  for (const item of next.atomics.filter((entry) => !entry.locked)) {
    const owner = item.packId === "wsg" ? "wsg" : next.namespace;
    const id = `${owner}.atomic.${slugify(item.name.en) || item.key}`;
    mapping.set(item.id, id);
    if (item.id !== id)
      item.previousIds = [...new Set([...item.previousIds, item.id])];
    item.id = id;
    item.key = slugify(item.name.en) || item.key;
  }
  for (const item of next.references.filter((entry) => !entry.locked)) {
    const owner = item.packId === "wsg" ? "wsg" : next.namespace;
    const group =
      item.kind === "value" && item.optionGroup
        ? `${slugify(item.optionGroup)}.`
        : "";
    const id = `${owner}.ref.${item.kind}.${group}${slugify(item.name.en) || item.key}`;
    mapping.set(item.id, id);
    if (item.id !== id)
      item.previousIds = [...new Set([...item.previousIds, item.id])];
    item.id = id;
    item.key = slugify(item.name.en);
  }
  for (const item of next.templates) {
    const id = `${next.namespace}.temp.${slugify(item.name.en) || `${item.type}_template`}`;
    mapping.set(item.id, id);
    if (item.id !== id)
      item.previousIds = [...new Set([...item.previousIds, item.id])];
    item.id = id;
    item.fields.forEach((field, index) => {
      field.id = `${id}.field_${index + 1}`;
      if (typeof field.defaultValue === "string")
        field.defaultValue =
          mapping.get(field.defaultValue) ?? field.defaultValue;
    });
  }
  for (const item of next.entities) {
    const owner = item.packId === "srd52" ? "srd52" : next.namespace;
    const generatedKey = /[А-Яа-яЁё]/.test(item.name.en)
      ? item.key
      : slugify(item.name.en) || item.key;
    const id = `${owner}.${item.type}.${generatedKey}`;
    mapping.set(item.id, id);
    if (item.id !== id)
      item.previousIds = [...new Set([...item.previousIds, item.id])];
    item.id = id;
    item.key = generatedKey;
  }
  for (const atomic of next.atomics) {
    atomic.dependencyIds = atomic.dependencyIds?.map(
      (id) => mapping.get(id) ?? id,
    );
    atomic.fields?.forEach((field) => {
      if (field.atomicId)
        field.atomicId = mapping.get(field.atomicId) ?? field.atomicId;
    });
    if (atomic.calculation)
      atomic.calculation = remapIdsDeep(atomic.calculation, mapping);
  }
  for (const reference of next.references) {
    reference.operations?.forEach((op) => {
      op.targetAtomicId = mapping.get(op.targetAtomicId) ?? op.targetAtomicId;
    });
    if (reference.ruleSet)
      reference.ruleSet = remapIdsDeep(reference.ruleSet, mapping);
  }
  for (const template of next.templates)
    template.fields.forEach((field) => {
      field.referenceId = mapping.get(field.referenceId) ?? field.referenceId;
    });
  for (const entity of next.entities) {
    entity.templateId = mapping.get(entity.templateId) ?? entity.templateId;
    entity.values = remapIdsDeep(
      Object.fromEntries(
        Object.entries(entity.values).map(([key, value]) => [
          mapping.get(key) ?? key,
          value,
        ]),
      ),
      mapping,
    );
  }
  next.updatedAt = new Date().toISOString();
  return next;
}

function remapIdsDeep(value: unknown, mapping: Map<string, string>): any {
  if (typeof value === "string") return mapping.get(value) ?? value;
  if (Array.isArray(value))
    return value.map((entry) => remapIdsDeep(entry, mapping));
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        key,
        remapIdsDeep(entry, mapping),
      ]),
    );
  return value;
}

export interface ValidationIssue {
  severity: "error" | "warning";
  code: string;
  message: string;
  targetId?: string;
}

export function validateProject(project: ForgeProject): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (project.ruleEngine.roundSeconds !== 6)
    issues.push({
      severity: "error",
      code: "round_length",
      message: "One round must equal exactly 6 seconds.",
    });
  if (project.ruleEngine.gridUnitFeet !== 2.5)
    issues.push({
      severity: "error",
      code: "grid_scale",
      message: "The smallest VTT grid unit must equal 2.5 feet.",
    });
  const all = [
    ...project.atomics,
    ...project.references,
    ...project.templates,
    ...project.entities,
  ];
  const ids = new Map<string, number>();
  for (const item of all) ids.set(item.id, (ids.get(item.id) ?? 0) + 1);
  for (const [id, count] of ids)
    if (count > 1)
      issues.push({
        severity: "error",
        code: "duplicate_id",
        message: `Duplicate ID: ${id}`,
        targetId: id,
      });
  if (!/^[a-z][a-z0-9_]*$/.test(project.namespace))
    issues.push({
      severity: "error",
      code: "namespace",
      message:
        "Namespace must start with a lowercase Latin letter and contain only a–z, 0–9 and _.",
    });
  if (!/^\d+\.\d+\.\d+$/.test(project.version))
    issues.push({
      severity: "error",
      code: "version",
      message: "Project version must use SemVer, for example 1.0.0.",
    });
  const referenceIds = new Set(project.references.map((item) => item.id));
  const atomicIds = new Set(project.atomics.map((item) => item.id));
  for (const atomic of project.atomics) {
    if (!atomic.name.en.trim())
      issues.push({
        severity: "error",
        code: "english_required",
        message: `${atomic.id}: English atomic name is required.`,
        targetId: atomic.id,
      });
    for (const dependencyId of atomic.dependencyIds ?? [])
      if (!atomicIds.has(dependencyId))
        issues.push({
          severity: "error",
          code: "missing_atomic",
          message: `${atomic.id} depends on missing ${dependencyId}`,
          targetId: atomic.id,
        });
    for (const field of atomic.fields ?? [])
      if (field.atomicId && !atomicIds.has(field.atomicId))
        issues.push({
          severity: "error",
          code: "missing_atomic",
          message: `${atomic.id}.${field.key} uses missing ${field.atomicId}`,
          targetId: atomic.id,
        });
    if (atomic.formula?.trim())
      issues.push({
        severity: "error",
        code: "raw_formula",
        message: `${atomic.id} still contains a legacy text formula. Rebuild it with the visual calculation editor.`,
        targetId: atomic.id,
      });
  }
  for (const template of project.templates) {
    if (!template.name.en.trim())
      issues.push({
        severity: "error",
        code: "english_required",
        message: `${template.id}: English template name is required.`,
        targetId: template.id,
      });
    if (
      !project.categories.some(
        (category) => category.id === template.categoryId,
      )
    )
      issues.push({
        severity: "error",
        code: "missing_category",
        message: `${template.id} uses missing ${template.categoryId}`,
        targetId: template.id,
      });
    for (const field of template.fields) {
      if (!referenceIds.has(field.referenceId))
        issues.push({
          severity: "error",
          code: "missing_reference",
          message: `${template.id} uses missing ${field.referenceId}`,
          targetId: template.id,
        });
      if (
        typeof field.defaultValue === "string" &&
        field.defaultValue.startsWith("wsg.ref.") &&
        !referenceIds.has(field.defaultValue)
      )
        issues.push({
          severity: "error",
          code: "missing_default_reference",
          message: `${template.id} uses missing default ${field.defaultValue}`,
          targetId: template.id,
        });
    }
    const legacyField = template.fields.find((field) => {
      const type = project.references.find(
        (reference) => reference.id === field.referenceId,
      )?.propertyType;
      return ["formula", "condition", "effect", "group", "list"].includes(
        type ?? "",
      );
    });
    if (legacyField)
      issues.push({
        severity: "error",
        code: "legacy_template_field",
        message: `${template.id} contains a legacy technical field.`,
        targetId: template.id,
      });
  }
  for (const reference of project.references) {
    for (const operation of reference.operations ?? [])
      if (operation.targetAtomicId && !atomicIds.has(operation.targetAtomicId))
        issues.push({
          severity: "error",
          code: "missing_atomic",
          message: `${reference.id} uses missing ${operation.targetAtomicId}`,
          targetId: reference.id,
        });
    if (reference.operations?.length)
      issues.push({
        severity: "error",
        code: "legacy_operation",
        message: `${reference.id} contains legacy technical operations. Rebuild it with visual rules.`,
        targetId: reference.id,
      });
    if (reference.kind === "effect" && !reference.ruleSet)
      issues.push({
        severity: "error",
        code: "missing_visual_rule",
        message: `${reference.id} has no visual rule definition.`,
        targetId: reference.id,
      });
    validateRuleSet(reference.ruleSet, reference.id, atomicIds, issues, false);
  }
  for (const entity of project.entities) {
    if (!entity.name.en.trim())
      issues.push({
        severity: "error",
        code: "english_required",
        message: `${entity.id}: English name is required.`,
        targetId: entity.id,
      });
    if (
      !project.templates.some((template) => template.id === entity.templateId)
    )
      issues.push({
        severity: "error",
        code: "missing_template",
        message: `${entity.id} uses a missing template.`,
        targetId: entity.id,
      });
    for (const [key, value] of Object.entries(entity.values))
      visitRuleSets(value, (ruleSet) =>
        validateRuleSet(
          ruleSet,
          `${entity.id}:${key}`,
          atomicIds,
          issues,
          true,
        ),
      );
  }
  for (const dependency of project.dependencies)
    if (!dependency.verified)
      issues.push({
        severity: "warning",
        code: "unverified",
        message: `${dependency.refId} has not passed checksum verification.`,
        targetId: dependency.refId,
      });
  const signatures = new Map<string, string>();
  for (const reference of project.references.filter((item) => !item.locked)) {
    const signature = JSON.stringify({
      kind: reference.kind,
      optionGroup: reference.optionGroup,
      name: reference.name.en.trim().toLowerCase(),
      propertyType: reference.propertyType,
      categoryId: reference.categoryId,
      value: reference.value,
      ruleSet: reference.ruleSet,
      table: reference.table?.columns.map(
        ({ id: _id, name: _name, ...column }) => column,
      ),
    });
    const previous = signatures.get(signature);
    if (previous)
      issues.push({
        severity: "error",
        code: "semantic_duplicate",
        message: `${reference.id} duplicates ${previous}`,
        targetId: reference.id,
      });
    else signatures.set(signature, reference.id);
  }
  return issues;
}

function visitRuleSets(value: unknown, visit: (ruleSet: RuleSet) => void) {
  if (!value || typeof value !== "object") return;
  if (
    !Array.isArray(value) &&
    (value as { version?: unknown }).version === 1 &&
    Array.isArray((value as { rules?: unknown }).rules)
  ) {
    visit(value as RuleSet);
    return;
  }
  if (Array.isArray(value))
    value.forEach((entry) => visitRuleSets(entry, visit));
  else
    Object.values(value as Record<string, unknown>).forEach((entry) =>
      visitRuleSets(entry, visit),
    );
}

function expressionIsIncomplete(value: ValueExpression | undefined): boolean {
  if (!value) return true;
  if (value.kind === "number")
    return !Number.isFinite(value.number) || value.number === 0;
  if (value.kind === "atomic") return !value.atomicId;
  if (["die_roll", "die_average", "die_maximum"].includes(value.kind))
    return !value.dieId || !value.diceCount || value.diceCount < 1;
  if (value.kind === "table_lookup") return !value.tableId || !value.tableKey;
  if (value.kind === "operation")
    return (
      !value.operation ||
      !value.operands?.length ||
      value.operands.some(expressionIsIncomplete)
    );
  return false;
}

function validateRuleSet(
  ruleSet: RuleSet | undefined,
  owner: string,
  atomicIds: Set<string>,
  issues: ValidationIssue[],
  strict: boolean,
) {
  if (!ruleSet) return;
  const ids = new Set<string>();
  const atomicActions = new Set([
    "add",
    "subtract",
    "multiply",
    "set",
    "set_minimum",
    "set_maximum",
    "replace_calculation",
  ]);
  const amountActions = new Set([
    ...atomicActions,
    "deal_damage",
    "heal",
    "temporary_hit_points",
    "spend_resource",
    "restore_resource",
    "change_resource_maximum",
    "roll_dice",
    "reroll_die",
    "replace_roll",
    "add_die_to_roll",
    "move_target",
    "grant_sense",
  ]);
  for (const rule of ruleSet.rules) {
    if (ids.has(rule.id))
      issues.push({
        severity: "error",
        code: "duplicate_rule_id",
        message: `${owner} contains duplicate rule ${rule.id}.`,
        targetId: owner,
      });
    ids.add(rule.id);
    if (!rule.name.en.trim())
      issues.push({
        severity: "error",
        code: "english_required",
        message: `${owner}.${rule.id}: English rule name is required.`,
        targetId: owner,
      });
    if (!rule.actions.length)
      issues.push({
        severity: "warning",
        code: "empty_rule",
        message: `${owner}.${rule.id} does not perform any action.`,
        targetId: owner,
      });
    if (rule.duration.type === "rounds" && rule.duration.rounds < 1)
      issues.push({
        severity: "error",
        code: "duration_rounds",
        message: `${owner}.${rule.id}: duration must be at least one round.`,
        targetId: owner,
      });
    for (const action of rule.actions) {
      if (
        strict &&
        amountActions.has(action.type) &&
        expressionIsIncomplete(action.value)
      )
        issues.push({
          severity: "error",
          code: "missing_action_amount",
          message: `${owner}.${rule.id}: choose how much this action changes.`,
          targetId: owner,
        });
      if (
        strict &&
        atomicActions.has(action.type) &&
        (!action.atomicId || !atomicIds.has(action.atomicId))
      )
        issues.push({
          severity: "error",
          code: "missing_action_value",
          message: `${owner}.${rule.id}: choose the game value changed by the action.`,
          targetId: owner,
        });
      if (
        strict &&
        ["make_saving_throw", "make_ability_check"].includes(action.type) &&
        (!action.ability || !action.difficulty)
      )
        issues.push({
          severity: "error",
          code: "incomplete_check",
          message: `${owner}.${rule.id}: choose an ability and difficulty.`,
          targetId: owner,
        });
      if (
        strict &&
        action.type === "deal_damage" &&
        !action.damageTypeId
      )
        issues.push({
          severity: "error",
          code: "incomplete_damage",
          message: `${owner}.${rule.id}: choose a damage type.`,
          targetId: owner,
        });
      if (
        strict &&
        action.target === "selected_target" &&
        (!action.targetCount ||
          action.targetCount < 1 ||
          action.rangeFeet === undefined ||
          action.rangeFeet < 0)
      )
        issues.push({
          severity: "error",
          code: "incomplete_target",
          message: `${owner}.${rule.id}: choose target count and maximum distance.`,
          targetId: owner,
        });
      if (
        strict &&
        [
          "grant_condition",
          "remove_condition",
          "grant_condition_immunity",
        ].includes(action.type) &&
        !action.conditionId
      )
        issues.push({
          severity: "error",
          code: "missing_condition",
          message: `${owner}.${rule.id}: choose a condition.`,
          targetId: owner,
        });
      if (
        strict &&
        [
          "grant_resistance",
          "grant_vulnerability",
          "grant_damage_immunity",
          "remove_damage_trait",
        ].includes(action.type) &&
        !action.damageTypeId
      )
        issues.push({
          severity: "error",
          code: "missing_damage_type",
          message: `${owner}.${rule.id}: choose a damage type.`,
          targetId: owner,
        });
      if (
        strict &&
        [
          "grant_proficiency",
          "upgrade_proficiency",
          "remove_proficiency",
        ].includes(action.type) &&
        !action.proficiencyId
      )
        issues.push({
          severity: "error",
          code: "missing_proficiency",
          message: `${owner}.${rule.id}: choose a proficiency.`,
          targetId: owner,
        });
      if (
        strict &&
        ["grant_sense", "remove_sense"].includes(action.type) &&
        !action.senseTypeId
      )
        issues.push({
          severity: "error",
          code: "missing_sense",
          message: `${owner}.${rule.id}: choose a sense.`,
          targetId: owner,
        });
      if (strict && action.type === "grant_entity" && !action.entityId)
        issues.push({
          severity: "error",
          code: "missing_entity",
          message: `${owner}.${rule.id}: choose an entity.`,
          targetId: owner,
        });
      if (
        strict &&
        [
          "spend_resource",
          "restore_resource",
          "change_resource_maximum",
        ].includes(action.type) &&
        !action.resourceKey
      )
        issues.push({
          severity: "error",
          code: "missing_resource",
          message: `${owner}.${rule.id}: enter the resource name.`,
          targetId: owner,
        });
      if (strict && action.type === "create_area" && !action.area)
        issues.push({
          severity: "error",
          code: "missing_area",
          message: `${owner}.${rule.id}: configure the area.`,
          targetId: owner,
        });
    }
  }
}
