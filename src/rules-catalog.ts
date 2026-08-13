import type {
  AtomicDataType,
  AtomicField,
  AtomicRecord,
  EntityTemplate,
  EntityType,
  GuidedField,
  LocalText,
  PropertyType,
  ReferenceRecord,
  StorageMode,
  TableDefinition,
} from "./model";
import type { RuleActionType } from "./rule-system";

const text = (en: string, ru = en, sv = en): LocalText => ({ en, ru, sv });
const atomicId = (key: string) => `wsg.atomic.${key}`;
const categoryId = (key: string) => `wsg.category.${key}`;

type FieldOptions = Partial<
  Omit<AtomicField, "id" | "key" | "name" | "dataType">
>;
const field = (
  key: string,
  en: string,
  ru: string,
  dataType: AtomicDataType,
  options: FieldOptions = {},
): AtomicField => ({
  id: key,
  key,
  name: text(en, ru),
  dataType,
  required: options.required ?? false,
  ...options,
});

type AtomicOptions = Partial<
  Omit<
    AtomicRecord,
    | "id"
    | "key"
    | "name"
    | "description"
    | "categoryId"
    | "dataType"
    | "storageMode"
    | "locked"
    | "previousIds"
  >
>;
const atomic = (
  key: string,
  en: string,
  ru: string,
  category: string,
  dataType: AtomicDataType,
  storageMode: StorageMode,
  description: string,
  options: AtomicOptions = {},
): AtomicRecord => ({
  id: atomicId(key),
  key,
  name: text(en, ru),
  description: text(description, description),
  categoryId: categoryId(category),
  dataType,
  storageMode,
  packId: "wsg",
  locked: true,
  previousIds: [],
  ...options,
});

const dice = [2, 3, 4, 6, 8, 10, 12, 20, 100].map((sides) =>
  atomic(
    `d${sides}`,
    `d${sides}`,
    `к${sides}`,
    "dice_randomness",
    "die",
    "constant",
    `Random integer from 1 to ${sides}.`,
    { dieSides: sides, minimum: 1, maximum: sides, unit: "die" },
  ),
);

const coreAtomics: AtomicRecord[] = [
  atomic(
    "experience_points",
    "Experience Points",
    "Очки опыта",
    "level_progression",
    "integer",
    "input",
    "Experience entered by CCL or VTT. It is the only source of total character level.",
    { minimum: 0, unit: "XP" },
  ),
  atomic(
    "level",
    "Level",
    "Уровень",
    "level_progression",
    "integer",
    "derived",
    "Total character level derived from the Character Advancement table using Experience Points.",
    {
      minimum: 1,
      maximum: 20,
      unit: "LVL",
      dependencyIds: [atomicId("experience_points")],
      rule: text(
        "Lookup the greatest XP threshold not exceeding current XP; cap at level 20.",
        "Выбрать наибольший порог опыта, не превышающий текущий опыт; максимум 20 уровень.",
      ),
    },
  ),
  atomic(
    "class_levels",
    "Class Levels",
    "Уровни классов",
    "classes_multiclassing",
    "collection",
    "input",
    "Distribution of the total level among the base class and multiclass classes.",
    {
      dependencyIds: [atomicId("level")],
      warningOnly: true,
      rule: text(
        "Sum of class levels should equal total level; mismatch creates a warning only.",
        "Сумма уровней классов должна равняться общему уровню; несовпадение создаёт только предупреждение.",
      ),
      fields: [
        field("class_id", "Class", "Класс", "reference", {
          required: true,
          optionGroup: "entity.class",
        }),
        field("level", "Class Level", "Уровень класса", "integer", {
          required: true,
          minimum: 1,
          maximum: 20,
        }),
      ],
    },
  ),
  atomic(
    "level_up_pending",
    "Level-Up Pending",
    "Требуется повышение уровня",
    "level_progression",
    "boolean",
    "derived",
    "Warning that XP level is higher than the sum of allocated class levels.",
    {
      dependencyIds: [atomicId("level"), atomicId("class_levels")],
      warningOnly: true,
    },
  ),
  atomic(
    "proficiency_bonus",
    "Proficiency Bonus",
    "Бонус мастерства",
    "level_progression",
    "integer",
    "derived",
    "Bonus derived from total level by the Character Advancement table.",
    {
      unit: "PB",
      dependencyIds: [atomicId("level")],
      rule: text(
        "Levels 1–4: +2; 5–8: +3; 9–12: +4; 13–16: +5; 17–20: +6.",
        "Уровни 1–4: +2; 5–8: +3; 9–12: +4; 13–16: +5; 17–20: +6.",
      ),
    },
  ),
  atomic(
    "hit_points",
    "Hit Points",
    "Очки здоровья",
    "hit_points_healing",
    "record",
    "runtime",
    "Current, maximum and temporary Hit Points.",
    {
      fields: [
        field("current", "Current HP", "Текущие ОЗ", "integer", {
          required: true,
          storageMode: "runtime",
          minimum: 0,
          unit: "HP",
        }),
        field("maximum", "Maximum HP", "Максимальные ОЗ", "integer", {
          required: true,
          storageMode: "derived",
          minimum: 0,
          unit: "HP",
        }),
        field("temporary", "Temporary HP", "Временные ОЗ", "integer", {
          storageMode: "runtime",
          minimum: 0,
          unit: "HP",
        }),
      ],
      dependencyIds: [atomicId("hit_point_level_gains"), atomicId("abilities")],
      rule: text(
        "Temporary HP never stack; the player chooses the old or new value.",
        "Временные ОЗ не складываются; игрок выбирает старое или новое значение.",
      ),
    },
  ),
  atomic(
    "hit_point_level_gains",
    "Hit Point Level Gains",
    "Получение ОЗ по уровням",
    "hit_points_healing",
    "collection",
    "input",
    "Permanent history of HP gained at every character level.",
    {
      fields: [
        field(
          "character_level",
          "Character Level",
          "Уровень персонажа",
          "integer",
          { required: true, minimum: 1, maximum: 20 },
        ),
        field("class_id", "Class", "Класс", "reference", {
          required: true,
          optionGroup: "entity.class",
        }),
        field("class_level", "Class Level", "Уровень класса", "integer", {
          required: true,
          minimum: 1,
          maximum: 20,
        }),
        field("method", "Method", "Способ", "enum", {
          required: true,
          optionGroup: "hp_gain_method",
        }),
        field("hit_die", "Hit Die", "Кость хитов", "reference", {
          required: true,
          optionGroup: "atomic.die",
        }),
        field("die_result", "Die Result", "Результат кости", "integer", {
          minimum: 1,
        }),
        field(
          "constitution_modifier",
          "Constitution Modifier",
          "Модификатор Телосложения",
          "integer",
          { required: true },
        ),
        field("other_bonus", "Other Bonus", "Другой бонус", "integer"),
        field("gained_hp", "Gained HP", "Получено ОЗ", "integer", {
          required: true,
          minimum: 1,
        }),
      ],
      dependencyIds: [
        atomicId("level"),
        atomicId("class_levels"),
        atomicId("abilities"),
      ],
      rule: text(
        "The first character level uses the maximum Hit Die. Later levels use a roll or the class fixed value; minimum gain is 1.",
        "Первый уровень персонажа использует максимум кости хитов. Последующие используют бросок или фиксированное значение класса; минимум 1 ОЗ.",
      ),
    },
  ),
  atomic(
    "hit_dice",
    "Hit Dice",
    "Кости хитов",
    "hit_points_healing",
    "collection",
    "runtime",
    "Available and maximum Hit Dice grouped by die and class.",
    {
      fields: [
        field("class_id", "Class", "Класс", "reference", {
          optionGroup: "entity.class",
        }),
        field("die", "Hit Die", "Кость хитов", "reference", {
          required: true,
          optionGroup: "atomic.die",
        }),
        field("maximum", "Maximum", "Максимум", "integer", {
          required: true,
          minimum: 0,
        }),
        field("current", "Current", "Текущее", "integer", {
          required: true,
          minimum: 0,
        }),
      ],
      dependencyIds: [atomicId("class_levels"), atomicId("rest")],
    },
  ),
  atomic(
    "armor_class",
    "Armor Class",
    "Класс защиты",
    "armor_class",
    "integer",
    "derived",
    "One selected base AC calculation plus modifiers from entities.",
    {
      minimum: 0,
      unit: "AC",
      dependencyIds: [atomicId("abilities")],
      rule: text(
        "Use exactly one base AC formula, then apply bonuses, penalties, minimums and maximums.",
        "Использовать ровно одну базовую формулу КЗ, затем применить бонусы, штрафы, минимумы и максимумы.",
      ),
    },
  ),
  atomic(
    "abilities",
    "Abilities",
    "Характеристики",
    "abilities",
    "collection",
    "derived",
    "Six ability records with score, modifier and saving throw statistics.",
    {
      fields: [
        field("ability_id", "Ability", "Характеристика", "enum", {
          required: true,
          optionGroup: "ability",
        }),
        field("base_score", "Base Score", "Базовое значение", "integer", {
          required: true,
          storageMode: "input",
          minimum: 1,
        }),
        field("entity_bonus", "Entity Bonus", "Бонус сущностей", "integer", {
          storageMode: "derived",
        }),
        field("score", "Final Score", "Итоговое значение", "integer", {
          required: true,
          storageMode: "derived",
          minimum: 1,
        }),
        field("modifier", "Modifier", "Модификатор", "integer", {
          required: true,
          storageMode: "derived",
        }),
        field(
          "save_proficient",
          "Saving Throw Proficiency",
          "Владение спасброском",
          "boolean",
          { storageMode: "derived" },
        ),
        field(
          "save_bonus",
          "Saving Throw Bonus",
          "Бонус спасброска",
          "integer",
          { storageMode: "derived" },
        ),
      ],
      dependencyIds: [atomicId("proficiency_bonus")],
      rule: text(
        "Modifier = floor((score − 10) / 2). Save bonus = modifier + PB when proficient + entity modifiers.",
        "Модификатор = округление вниз ((значение − 10) / 2). Спасбросок = модификатор + БМ при владении + модификаторы сущностей.",
      ),
    },
  ),
  atomic(
    "point_buy_points",
    "Point Buy Points",
    "Очки покупки характеристик",
    "abilities",
    "integer",
    "input",
    "Creation-only point-buy resource, separate from later Ability Score Improvements.",
    { minimum: 0, unit: "points" },
  ),
  atomic(
    "ability_score_improvements",
    "Ability Score Improvements",
    "Очки повышения характеристик",
    "abilities",
    "integer",
    "derived",
    "Unspent score increases granted by levels, feats or other entities.",
    { minimum: 0, dependencyIds: [atomicId("class_levels")] },
  ),
  atomic(
    "skills",
    "Skills",
    "Навыки",
    "skills_checks",
    "collection",
    "derived",
    "Skill ability, proficiency rank, bonus and passive score.",
    {
      fields: [
        field("skill_id", "Skill", "Навык", "reference", {
          required: true,
          optionGroup: "skill",
        }),
        field("ability_id", "Ability", "Характеристика", "enum", {
          required: true,
          optionGroup: "ability",
        }),
        field("rank", "Proficiency Rank", "Ранг владения", "enum", {
          required: true,
          optionGroup: "skill_rank",
        }),
        field("bonus", "Check Bonus", "Бонус проверки", "integer", {
          storageMode: "derived",
        }),
        field("passive", "Passive Score", "Пассивное значение", "integer", {
          storageMode: "derived",
        }),
      ],
      dependencyIds: [
        atomicId("abilities"),
        atomicId("proficiency_bonus"),
        atomicId("exhaustion"),
      ],
      rule: text(
        "Rank is None, Proficient or Expertise. Expertise cannot exist without proficiency.",
        "Ранг: нет, владение или экспертность. Экспертность невозможна без владения.",
      ),
    },
  ),
  atomic(
    "initiative",
    "Initiative",
    "Инициатива",
    "encounters_initiative",
    "record",
    "runtime",
    "Initiative modifier and rolled combat result.",
    {
      fields: [
        field("modifier", "Modifier", "Модификатор", "integer", {
          storageMode: "derived",
        }),
        field("roll", "Roll", "Бросок", "integer", { storageMode: "runtime" }),
        field("score", "Initiative Score", "Значение инициативы", "integer", {
          storageMode: "derived",
        }),
      ],
      dependencyIds: [
        atomicId("abilities"),
        atomicId("d20_roll_mode"),
        atomicId("exhaustion"),
      ],
    },
  ),
  atomic(
    "speeds",
    "Speeds",
    "Скорости",
    "movement_position",
    "collection",
    "derived",
    "Walking and special movement speeds.",
    {
      fields: [
        field("speed_type", "Speed Type", "Тип скорости", "enum", {
          required: true,
          optionGroup: "speed_type",
        }),
        field("base", "Base Speed", "Базовая скорость", "integer", {
          minimum: 0,
          unit: "ft",
        }),
        field("value", "Current Speed", "Текущая скорость", "integer", {
          storageMode: "derived",
          minimum: 0,
          unit: "ft",
        }),
      ],
      dependencyIds: [atomicId("exhaustion")],
      rule: text(
        "Changes to Speed also change special speeds by the same amount unless a rule says otherwise.",
        "Изменения Скорости также изменяют специальные скорости на ту же величину, если правило не говорит иначе.",
      ),
    },
  ),
  atomic(
    "active_conditions",
    "Active Conditions",
    "Активные состояния",
    "conditions",
    "collection",
    "runtime",
    "Active conditions with independent sources and expiration rules.",
    {
      fields: [
        field("condition_id", "Condition", "Состояние", "reference", {
          required: true,
          optionGroup: "condition",
        }),
        field("source_ids", "Sources", "Источники", "reference", {
          multiple: true,
        }),
        field("started_at", "Started At", "Начало", "duration"),
        field("duration", "Duration", "Длительность", "duration"),
        field(
          "expiration_event",
          "Expiration Event",
          "Событие завершения",
          "enum",
          { optionGroup: "expiration_event" },
        ),
        field(
          "saving_throw_dc",
          "Saving Throw DC",
          "Сложность спасброска",
          "integer",
        ),
        field("active", "Active", "Активно", "boolean", {
          storageMode: "derived",
        }),
      ],
      dependencyIds: [atomicId("condition_immunities")],
      rule: text(
        "A condition remains active while at least one source remains. Immune targets reject it and log the attempt.",
        "Состояние активно, пока остаётся хотя бы один источник. Иммунная цель отклоняет состояние, а попытка записывается в журнал.",
      ),
    },
  ),
  atomic(
    "condition_immunities",
    "Condition Immunities",
    "Иммунитеты к состояниям",
    "immunities_exceptions",
    "collection",
    "derived",
    "Conditions that cannot affect the target.",
    {
      fields: [
        field("condition_id", "Condition", "Состояние", "reference", {
          required: true,
          optionGroup: "condition",
        }),
        field("source_ids", "Sources", "Источники", "reference", {
          multiple: true,
        }),
      ],
    },
  ),
  atomic(
    "damage_traits",
    "Damage Traits",
    "Отношение к типам урона",
    "damage_defense",
    "collection",
    "derived",
    "Resistance, vulnerability and immunity sources for every damage type.",
    {
      fields: [
        field("damage_type_id", "Damage Type", "Тип урона", "reference", {
          required: true,
          optionGroup: "damage_type",
        }),
        field(
          "resistance_sources",
          "Resistance Sources",
          "Источники сопротивления",
          "reference",
          { multiple: true },
        ),
        field(
          "vulnerability_sources",
          "Vulnerability Sources",
          "Источники уязвимости",
          "reference",
          { multiple: true },
        ),
        field(
          "immunity_sources",
          "Immunity Sources",
          "Источники иммунитета",
          "reference",
          { multiple: true },
        ),
      ],
      rule: text(
        "Apply adjustments, then Resistance, then Vulnerability. Immunity makes damage 0. Identical traits do not stack.",
        "Применить модификаторы, затем сопротивление, затем уязвимость. Иммунитет обнуляет урон. Одинаковые свойства не складываются.",
      ),
    },
  ),
  atomic(
    "d20_roll_mode",
    "D20 Roll Mode",
    "Режим броска d20",
    "dice_randomness",
    "record",
    "derived",
    "Advantage, normal or Disadvantage resolved from source lists.",
    {
      fields: [
        field(
          "advantage_sources",
          "Advantage Sources",
          "Источники преимущества",
          "reference",
          { multiple: true },
        ),
        field(
          "disadvantage_sources",
          "Disadvantage Sources",
          "Источники помехи",
          "reference",
          { multiple: true },
        ),
        field("mode", "Resolved Mode", "Итоговый режим", "enum", {
          storageMode: "derived",
          optionGroup: "d20_mode",
        }),
      ],
      rule: text(
        "Any Advantage and any Disadvantage cancel; identical sources never add more dice.",
        "Любое преимущество и любая помеха взаимно отменяются; одинаковые источники не добавляют кости.",
      ),
    },
  ),
  atomic(
    "weapon_damage",
    "Weapon Damage",
    "Урон оружия",
    "weapons_mastery",
    "collection",
    "derived",
    "One or more independently resolved weapon damage components.",
    {
      fields: [
        field("dice", "Dice", "Кости", "dice_expression", { required: true }),
        field("flat_bonus", "Flat Bonus", "Постоянный бонус", "integer"),
        field("damage_type_id", "Damage Type", "Тип урона", "reference", {
          required: true,
          optionGroup: "damage_type",
        }),
        field("source_id", "Source", "Источник", "reference"),
      ],
      dependencyIds: [atomicId("abilities")],
    },
  ),
  atomic(
    "attack",
    "Attack",
    "Атака",
    "attacks_hits",
    "record",
    "runtime",
    "Complete attack configuration and result.",
    {
      fields: [
        field("attack_type", "Attack Type", "Тип атаки", "enum", {
          required: true,
          optionGroup: "attack_type",
        }),
        field("ability_id", "Ability", "Характеристика", "enum", {
          optionGroup: "ability",
        }),
        field("proficient", "Proficient", "Есть владение", "boolean"),
        field("attack_bonus", "Attack Bonus", "Бонус атаки", "integer", {
          storageMode: "derived",
        }),
        field("roll_mode", "Roll Mode", "Режим броска", "enum", {
          optionGroup: "d20_mode",
        }),
        field("target_id", "Target", "Цель", "reference"),
        field("target_ac", "Target AC", "КЗ цели", "integer"),
        field("result", "Result", "Результат", "enum", {
          storageMode: "runtime",
          optionGroup: "attack_result",
        }),
        field("damage", "Damage Components", "Компоненты урона", "collection", {
          atomicId: atomicId("weapon_damage"),
        }),
      ],
      dependencyIds: [
        atomicId("abilities"),
        atomicId("proficiency_bonus"),
        atomicId("d20_roll_mode"),
        atomicId("exhaustion"),
      ],
    },
  ),
  atomic(
    "exhaustion",
    "Exhaustion",
    "Истощение",
    "conditions",
    "integer",
    "runtime",
    "Cumulative Exhaustion level from 0 to 6.",
    {
      minimum: 0,
      maximum: 6,
      dependencyIds: [atomicId("d20_roll_mode"), atomicId("speeds")],
      rule: text(
        "Subtract 2 × Exhaustion from every D20 Test; reduce every Speed by 5 ft × Exhaustion; level 6 means death.",
        "Вычитать 2 × Истощение из каждой проверки d20; уменьшать каждую Скорость на 5 фт × Истощение; уровень 6 означает смерть.",
      ),
    },
  ),
  atomic(
    "heroic_inspiration",
    "Heroic Inspiration",
    "Героическое вдохновение",
    "dice_randomness",
    "boolean",
    "runtime",
    "A single Heroic Inspiration that can reroll one die and must use the new result.",
    {
      rule: text(
        "Maximum one. It may be gained, transferred or spent.",
        "Максимум одно. Его можно получить, передать или потратить.",
      ),
    },
  ),
  atomic(
    "proficiencies",
    "Equipment and Language Proficiencies",
    "Владения снаряжением и языками",
    "proficiencies",
    "collection",
    "derived",
    "Weapon, armor, tool and language proficiencies only.",
    {
      fields: [
        field("type", "Proficiency Type", "Тип владения", "enum", {
          required: true,
          optionGroup: "proficiency_type",
        }),
        field("target_id", "Target", "Объект владения", "reference", {
          required: true,
        }),
        field("source_ids", "Sources", "Источники", "reference", {
          multiple: true,
        }),
        field("active", "Active", "Активно", "boolean", {
          storageMode: "derived",
        }),
      ],
    },
  ),
  atomic(
    "size",
    "Size",
    "Размер",
    "creature_body",
    "enum",
    "derived",
    "Creature size category.",
    { optionGroup: "size" },
  ),
  atomic(
    "carrying_capacity",
    "Carrying Capacity",
    "Грузоподъёмность",
    "items_inventory",
    "record",
    "derived",
    "Maximum carried and pushed, dragged or lifted weight.",
    {
      fields: [
        field("carry_lb", "Carry", "Перенос", "decimal", {
          unit: "lb",
          storageMode: "derived",
        }),
        field(
          "push_drag_lift_lb",
          "Push, Drag or Lift",
          "Толчок, волочение или подъём",
          "decimal",
          { unit: "lb", storageMode: "derived" },
        ),
      ],
      dependencyIds: [atomicId("abilities"), atomicId("size")],
      rule: text(
        "Tiny: STR×7.5/15; Small or Medium: ×15/30; Large: ×30/60; Huge: ×60/120; Gargantuan: ×120/240 lb.",
        "Крошечный: СИЛ×7,5/15; Маленький или Средний: ×15/30; Большой: ×30/60; Огромный: ×60/120; Колоссальный: ×120/240 фнт.",
      ),
    },
  ),
  atomic(
    "jump_distance",
    "Jump Distance",
    "Дистанция прыжка",
    "movement_position",
    "record",
    "derived",
    "Running and standing Long Jump and High Jump distances.",
    {
      fields: [
        field(
          "running_long",
          "Running Long Jump",
          "Длинный с разбега",
          "decimal",
          { unit: "ft" },
        ),
        field(
          "standing_long",
          "Standing Long Jump",
          "Длинный с места",
          "decimal",
          { unit: "ft" },
        ),
        field(
          "running_high",
          "Running High Jump",
          "Высокий с разбега",
          "decimal",
          { unit: "ft" },
        ),
        field(
          "standing_high",
          "Standing High Jump",
          "Высокий с места",
          "decimal",
          { unit: "ft" },
        ),
      ],
      dependencyIds: [atomicId("abilities"), atomicId("speeds")],
      rule: text(
        "Running Long = STR score; Running High = max(0, 3 + STR modifier); standing distances are half.",
        "Длинный с разбега = значение СИЛ; высокий с разбега = максимум(0, 3 + модификатор СИЛ); с места — половина.",
      ),
    },
  ),
  atomic(
    "saving_throw_dc",
    "Saving Throw DC",
    "Сложность спасброска",
    "saving_throws",
    "collection",
    "derived",
    "Any number of independently calculated save DCs.",
    {
      fields: [
        field("source_id", "Source", "Источник", "reference", {
          required: true,
        }),
        field("ability_id", "Ability", "Характеристика", "enum", {
          optionGroup: "ability",
        }),
        field("base", "Base", "База", "integer", { required: true }),
        field("bonus", "Other Bonus", "Другой бонус", "integer"),
        field("dc", "DC", "Сложность", "integer", { storageMode: "derived" }),
      ],
      dependencyIds: [atomicId("abilities"), atomicId("proficiency_bonus")],
      rule: text(
        "Usually 8 + PB + chosen ability modifier + other bonuses.",
        "Обычно 8 + БМ + модификатор выбранной характеристики + другие бонусы.",
      ),
    },
  ),
  atomic(
    "item_type",
    "Item Type",
    "Тип предмета",
    "items_inventory",
    "reference",
    "input",
    "Stable reference ID used for equality checks; localized names are display-only.",
    { optionGroup: "item_type" },
  ),
  atomic(
    "dice_expression",
    "Dice Expression",
    "Выражение костей",
    "dice_randomness",
    "record",
    "input",
    "One dice term used by attacks, healing and effects.",
    {
      fields: [
        field("count", "Count", "Количество", "integer", {
          required: true,
          minimum: 1,
        }),
        field("die_id", "Die", "Кость", "reference", {
          required: true,
          optionGroup: "atomic.die",
        }),
        field("modifier", "Modifier", "Модификатор", "integer"),
      ],
    },
  ),
  atomic(
    "round_duration",
    "Duration in Rounds",
    "Длительность в раундах",
    "duration",
    "integer",
    "input",
    "Every game duration is stored as a whole number of rounds. The VTT knows that one round equals six seconds.",
    { unit: "rounds", minimum: 0 },
  ),
  atomic(
    "damage_type",
    "Damage Type",
    "Тип урона",
    "damage_defense",
    "reference",
    "input",
    "Stable damage-type reference ID.",
    { optionGroup: "damage_type" },
  ),
  atomic(
    "periodic_damage",
    "Periodic Damage",
    "Периодический урон",
    "damage_defense",
    "collection",
    "runtime",
    "Damage components that trigger repeatedly for a duration.",
    {
      fields: [
        field("damage", "Damage", "Урон", "dice_expression", {
          required: true,
        }),
        field("flat_bonus", "Flat Bonus", "Постоянный бонус", "integer"),
        field("damage_type_id", "Damage Type", "Тип урона", "reference", {
          required: true,
          optionGroup: "damage_type",
        }),
        field("target_ids", "Targets", "Цели", "reference", { multiple: true }),
        field("trigger", "Trigger", "Срабатывание", "enum", {
          required: true,
          optionGroup: "periodic_trigger",
        }),
        field("interval_rounds", "Interval", "Интервал", "integer", {
          minimum: 1,
          unit: "rounds",
        }),
        field("remaining_rounds", "Remaining", "Осталось", "integer", {
          minimum: 0,
          unit: "rounds",
        }),
        field("save_dc", "Save DC", "Сложность спасброска", "integer"),
        field("save_result", "On Success", "При успехе", "enum", {
          optionGroup: "save_success",
        }),
      ],
      dependencyIds: [atomicId("round_duration"), atomicId("damage_traits")],
    },
  ),
  atomic(
    "target",
    "Target",
    "Цель",
    "targets_areas",
    "record",
    "runtime",
    "Target selected by an action or entity.",
    {
      fields: [
        field("target_type", "Target Type", "Тип цели", "enum", {
          required: true,
          optionGroup: "target_type",
        }),
        field("target_id", "Target ID", "ID цели", "text"),
        field("position", "Position", "Позиция", "position"),
        field("selected", "Selected", "Выбрано", "boolean", {
          storageMode: "runtime",
        }),
      ],
    },
  ),
  atomic(
    "position",
    "Position",
    "Координаты",
    "movement_position",
    "position",
    "runtime",
    "Three-dimensional integer coordinates measured in 2.5-foot cells.",
    {
      fields: [
        field("x", "X", "X", "integer", { required: true, unit: "half-cell" }),
        field("y", "Y", "Y", "integer", { required: true, unit: "half-cell" }),
        field("z", "Z", "Z", "integer", { required: true, unit: "half-cell" }),
      ],
      rule: text(
        "One smallest cell is 2.5×2.5 ft; a 5×5-ft square is a 2×2 block of four cells.",
        "Одна минимальная клетка — 2,5×2,5 фута; квадрат 5×5 футов — блок 2×2 из четырёх клеток.",
      ),
    },
  ),
  atomic(
    "area",
    "Area",
    "Область",
    "targets_areas",
    "record",
    "runtime",
    "Geometric area that resolves contained cells into target IDs.",
    {
      fields: [
        field("shape", "Shape", "Форма", "enum", {
          required: true,
          optionGroup: "area_shape",
        }),
        field("origin", "Origin", "Начало", "position", { required: true }),
        field("direction", "Direction", "Направление", "position"),
        field("radius_ft", "Radius", "Радиус", "decimal", {
          minimum: 0,
          unit: "ft",
        }),
        field("length_ft", "Length", "Длина", "decimal", {
          minimum: 0,
          unit: "ft",
        }),
        field("width_ft", "Width", "Ширина", "decimal", {
          minimum: 0,
          unit: "ft",
        }),
        field("height_ft", "Height", "Высота", "decimal", {
          minimum: 0,
          unit: "ft",
        }),
        field(
          "attached_target_id",
          "Attached Target",
          "Привязанная цель",
          "text",
        ),
        field("target_ids", "Resolved Targets", "Найденные цели", "reference", {
          storageMode: "derived",
          multiple: true,
        }),
      ],
      dependencyIds: [atomicId("position"), atomicId("target")],
    },
  ),
  atomic(
    "roll_dice",
    "Roll Dice",
    "Бросок кубика",
    "dice_randomness",
    "action",
    "runtime",
    "Action performed by CCL, VTT or Bestiary to roll selected dice.",
    {
      fields: [
        field(
          "expression",
          "Dice Expression",
          "Выражение костей",
          "dice_expression",
          { required: true },
        ),
        field("mode", "Roll Mode", "Режим броска", "enum", {
          optionGroup: "d20_mode",
        }),
        field("all_results", "All Results", "Все результаты", "collection", {
          storageMode: "runtime",
        }),
        field(
          "selected_result",
          "Selected Result",
          "Выбранный результат",
          "integer",
          { storageMode: "runtime" },
        ),
        field("total", "Total", "Итого", "integer", { storageMode: "runtime" }),
      ],
    },
  ),
  atomic(
    "rest",
    "Rest",
    "Отдых",
    "rest_recovery",
    "action",
    "runtime",
    "Short or Long Rest action that emits recovery events.",
    {
      fields: [
        field("rest_type", "Rest Type", "Тип отдыха", "enum", {
          required: true,
          optionGroup: "rest_type",
        }),
        field("started_at", "Started At", "Начало", "duration"),
        field("completed", "Completed", "Завершён", "boolean", {
          storageMode: "runtime",
        }),
        field("event", "Recovery Event", "Событие восстановления", "event", {
          storageMode: "runtime",
        }),
      ],
    },
  ),
  atomic(
    "resources",
    "Resources",
    "Ресурсы",
    "resources_charges",
    "collection",
    "runtime",
    "Generic spell slots, feature uses, charges and other tracked resources.",
    {
      fields: [
        field("resource_id", "Resource ID", "ID ресурса", "text", {
          required: true,
        }),
        field("source_id", "Source", "Источник", "reference"),
        field("current", "Current", "Текущее", "integer", {
          required: true,
          minimum: 0,
        }),
        field("maximum", "Maximum", "Максимум", "integer", {
          required: true,
          minimum: 0,
        }),
        field(
          "recovery_event",
          "Recovery Event",
          "Событие восстановления",
          "enum",
          { optionGroup: "recovery_event" },
        ),
        field(
          "recovery_amount",
          "Recovery Amount",
          "Величина восстановления",
          "dice_expression",
        ),
      ],
      dependencyIds: [atomicId("rest")],
    },
  ),
  atomic(
    "senses",
    "Senses",
    "Чувства",
    "senses_perception",
    "collection",
    "derived",
    "Normal and special senses with ranges.",
    {
      fields: [
        field("sense_type", "Sense Type", "Тип чувства", "enum", {
          required: true,
          optionGroup: "sense_type",
        }),
        field("range_ft", "Range", "Дальность", "integer", {
          required: true,
          minimum: 0,
          unit: "ft",
        }),
        field("source_ids", "Sources", "Источники", "reference", {
          multiple: true,
        }),
        field("active", "Active", "Активно", "boolean", {
          storageMode: "derived",
        }),
      ],
      rule: text(
        "Range 0 means the sense is absent.",
        "Дальность 0 означает отсутствие чувства.",
      ),
    },
  ),
  atomic(
    "death_saves",
    "Death Saving Throws",
    "Спасброски от смерти",
    "death_stabilization",
    "record",
    "runtime",
    "Death save successes, failures and stability.",
    {
      fields: [
        field("successes", "Successes", "Успехи", "integer", {
          minimum: 0,
          maximum: 3,
        }),
        field("failures", "Failures", "Провалы", "integer", {
          minimum: 0,
          maximum: 3,
        }),
        field("stable", "Stable", "Стабилен", "boolean"),
        field("dead", "Dead", "Мёртв", "boolean", { storageMode: "derived" }),
      ],
      dependencyIds: [atomicId("hit_points")],
    },
  ),
  atomic(
    "concentration",
    "Concentration",
    "Концентрация",
    "magic_spells",
    "record",
    "runtime",
    "Current concentration source and saving throw state.",
    {
      fields: [
        field("active", "Active", "Активна", "boolean"),
        field("source_id", "Source", "Источник", "reference"),
        field("started_at", "Started At", "Начало", "duration"),
        field(
          "duration",
          "Maximum Duration",
          "Максимальная длительность",
          "duration",
        ),
        field("save_dc", "Current Save DC", "Текущая сложность", "integer", {
          storageMode: "derived",
        }),
      ],
    },
  ),
  atomic(
    "currency",
    "Currency",
    "Монеты",
    "economy_currency",
    "record",
    "runtime",
    "All five SRD coin denominations and derived total value.",
    {
      fields: [
        field("cp", "Copper Pieces", "Медные монеты", "integer", {
          minimum: 0,
          unit: "CP",
        }),
        field("sp", "Silver Pieces", "Серебряные монеты", "integer", {
          minimum: 0,
          unit: "SP",
        }),
        field("ep", "Electrum Pieces", "Электрумовые монеты", "integer", {
          minimum: 0,
          unit: "EP",
        }),
        field("gp", "Gold Pieces", "Золотые монеты", "integer", {
          minimum: 0,
          unit: "GP",
        }),
        field("pp", "Platinum Pieces", "Платиновые монеты", "integer", {
          minimum: 0,
          unit: "PP",
        }),
        field("total_cp", "Total Value", "Общая стоимость", "integer", {
          storageMode: "derived",
          unit: "CP",
        }),
      ],
      rule: text(
        "1 SP=10 CP; 1 EP=50 CP; 1 GP=100 CP; 1 PP=1000 CP. Conversion is a separate action.",
        "1 СП=10 ММ; 1 ЭМ=50 ММ; 1 ЗМ=100 ММ; 1 ПМ=1000 ММ. Обмен выполняется отдельным действием.",
      ),
    },
  ),
  atomic(
    "range_and_reach",
    "Range and Reach",
    "Дальность и досягаемость",
    "targets_areas",
    "record",
    "derived",
    "Normal range, long range and melee reach.",
    {
      fields: [
        field("reach_ft", "Reach", "Досягаемость", "integer", {
          minimum: 0,
          unit: "ft",
        }),
        field(
          "normal_range_ft",
          "Normal Range",
          "Нормальная дальность",
          "integer",
          { minimum: 0, unit: "ft" },
        ),
        field(
          "long_range_ft",
          "Long Range",
          "Максимальная дальность",
          "integer",
          { minimum: 0, unit: "ft" },
        ),
      ],
    },
  ),
  atomic(
    "duration",
    "Duration",
    "Длительность",
    "duration",
    "duration",
    "input",
    "A duration measured only in rounds or ended by a prepared game event.",
    {
      fields: [
        field("rounds", "Rounds", "Раунды", "integer", {
          minimum: 0,
          unit: "rounds",
        }),
        field(
          "expiration_event",
          "Expiration Event",
          "Событие завершения",
          "enum",
          { optionGroup: "expiration_event" },
        ),
      ],
    },
  ),
  ...dice,
];

const property = (
  key: string,
  en: string,
  ru: string,
  category: string,
  propertyType: PropertyType,
  options: Partial<ReferenceRecord> = {},
): ReferenceRecord => ({
  id: `wsg.ref.parameter.${key}`,
  key,
  kind: "parameter",
  name: text(en, ru),
  description: options.description ?? text(""),
  categoryId: categoryId(category),
  packId: "wsg",
  locked: true,
  previousIds: [],
  propertyType,
  required: false,
  multiple: ["references", "entities", "list", "damage", "choice_set"].includes(
    propertyType,
  ),
  ...options,
});
const ui = (
  key: string,
  en: string,
  ru: string,
  type: GuidedField["type"],
  options: Partial<GuidedField> = {},
): GuidedField => ({ key, name: text(en, ru), type, ...options });
const option = (
  group: string,
  key: string,
  en: string,
  ru: string,
  category = "values_options",
): ReferenceRecord => ({
  id: `wsg.ref.value.${group}.${key}`,
  key,
  kind: "value",
  name: text(en, ru),
  description: text(""),
  categoryId: categoryId(category),
  optionGroup: group,
  packId: "wsg",
  locked: true,
  previousIds: [],
  value: key,
});
const effect = (
  key: string,
  en: string,
  ru: string,
  target: string,
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
    | "remove",
  source: "number" | "atomic" | "input" | "die" = "input",
): ReferenceRecord => {
  const directActions: Record<string, RuleActionType> = {
    heal: "heal",
    deal_damage: "deal_damage",
    grant_temporary_hp: "temporary_hit_points",
    grant_condition: "grant_condition",
    remove_condition: "remove_condition",
    grant_condition_immunity: "grant_condition_immunity",
    grant_resistance: "grant_resistance",
    grant_vulnerability: "grant_vulnerability",
    grant_damage_immunity: "grant_damage_immunity",
    remove_damage_trait: "remove_damage_trait",
    grant_advantage: "grant_advantage",
    grant_disadvantage: "grant_disadvantage",
    remove_roll_modifier: "remove_roll_modifier",
    grant_proficiency: "grant_proficiency",
    remove_proficiency: "remove_proficiency",
    grant_sense: "grant_sense",
    remove_sense: "remove_sense",
    spend_resource: "spend_resource",
    restore_resource: "restore_resource",
    roll_dice: "roll_dice",
  };
  const genericActions: Record<typeof operator, RuleActionType> = {
    add: "add",
    subtract: "subtract",
    multiply: "multiply",
    divide: "replace_calculation",
    set: "set",
    minimum: "set_minimum",
    maximum: "set_maximum",
    roll: "roll_dice",
    grant: "grant_entity",
    remove: "set",
  };
  const actionType = directActions[key] ?? genericActions[operator];
  return {
    id: `wsg.ref.effect.${key}`,
    key,
    kind: "effect",
    name: text(en, ru),
    description: text(""),
    categoryId: categoryId("effects"),
    packId: "wsg",
    locked: true,
    previousIds: [],
    ruleSet: {
      version: 1,
      rules: [
        {
          id: `${key}.rule_1`,
          name: text(en, ru),
          enabled: true,
          event: "always",
          frequency: "every_time",
          conditions: { mode: "all", predicates: [] },
          actions: [
            {
              id: `${key}.action_1`,
              type: actionType,
              target: "self",
              atomicId: atomicId(target),
              value:
                source === "die"
                  ? { kind: "die_roll", dieId: atomicId("d20"), diceCount: 1 }
                  : { kind: "number", number: 0 },
            },
          ],
          duration: {
            type: "permanent",
            rounds: 0,
            concentration: false,
            expiration: "source_removed",
          },
          priority: 100,
          stacking: "unique_source",
        },
      ],
    },
  };
};
const table = (
  columns: Array<[string, string, string, PropertyType]>,
  rows: Array<Record<string, unknown>>,
): TableDefinition => ({
  columns: columns.map(([key, en, ru, type]) => ({
    id: key,
    key,
    name: text(en, ru),
    type,
    required: true,
  })),
  rows: rows.map((values, index) => ({ rowId: `row_${index + 1}`, values })),
});

const entityTypes: EntityType[] = [
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
const commonParameters = [
  property(
    "name",
    "Name",
    "Название",
    "character_identity",
    "localized_short",
    { required: true },
  ),
  property(
    "description",
    "Description",
    "Описание",
    "narrative_social",
    "localized_long",
  ),
  property("image", "Image", "Изображение", "character_identity", "string"),
  property(
    "prerequisites",
    "Prerequisites",
    "Требования",
    "prerequisites",
    "condition_set",
  ),
  property(
    "granted_features",
    "Granted Features",
    "Выдаваемые умения",
    "effects",
    "entities",
    { allowedEntityTypes: ["feature"], multiple: true },
  ),
  property("choices", "Choices", "Выборы", "choices", "choice_set", {
    multiple: true,
  }),
  property(
    "activation",
    "Activation",
    "Активация",
    "actions_timing",
    "select",
    { optionGroup: "activation" },
  ),
  property("trigger", "Trigger", "Триггер", "triggers_automation", "select", {
    optionGroup: "trigger",
  }),
  property(
    "duration",
    "Duration",
    "Длительность",
    "duration",
    "duration_rounds",
  ),
  property("targets", "Targets", "Цели", "targets_areas", "target_selector"),
  property("area", "Area", "Область", "targets_areas", "area"),
  property(
    "effects",
    "Rules and Automation",
    "Правила и автоматизация",
    "effects",
    "rule_set",
  ),
  property(
    "resources",
    "Resources",
    "Ресурсы",
    "resources_charges",
    "resource",
  ),
  property(
    "recovery",
    "Recovery",
    "Восстановление",
    "rest_recovery",
    "select",
    { optionGroup: "recovery_event" },
  ),
];

const templateParameters = [
  property(
    "class_primary_abilities",
    "Primary Abilities",
    "Основные характеристики",
    "classes_multiclassing",
    "references",
    { optionGroup: "ability", allowedEntityTypes: ["class"] },
  ),
  property(
    "class_hit_die",
    "Hit Die",
    "Кость хитов",
    "hit_points_healing",
    "reference",
    { optionGroup: "atomic.die", allowedEntityTypes: ["class"] },
  ),
  property(
    "class_hit_point_progression",
    "Hit Point Progression",
    "Прогрессия ОЗ",
    "hit_points_healing",
    "hp_progression",
    { allowedEntityTypes: ["class"] },
  ),
  property(
    "class_saving_throw_proficiencies",
    "Saving Throw Proficiencies",
    "Владения спасбросками",
    "saving_throws",
    "references",
    { optionGroup: "ability", allowedEntityTypes: ["class"] },
  ),
  property(
    "class_skill_choices",
    "Skill Choices",
    "Выбор навыков",
    "skills_checks",
    "references",
    { optionGroup: "skill", allowedEntityTypes: ["class"] },
  ),
  property(
    "class_weapon_proficiencies",
    "Weapon Proficiencies",
    "Владения оружием",
    "proficiencies",
    "references",
    {
      optionGroup: "weapon_category",
      allowedEntityTypes: ["class", "multiclass"],
    },
  ),
  property(
    "class_armor_proficiencies",
    "Armor Training",
    "Владение доспехами",
    "armor",
    "references",
    {
      optionGroup: "armor_category",
      allowedEntityTypes: ["class", "multiclass"],
    },
  ),
  property(
    "class_tool_proficiencies",
    "Tool Proficiencies",
    "Владения инструментами",
    "proficiencies",
    "references",
    { optionGroup: "tool_type", allowedEntityTypes: ["class", "multiclass"] },
  ),
  property(
    "class_starting_equipment",
    "Starting Equipment",
    "Начальное снаряжение",
    "items_inventory",
    "guided_list",
    {
      allowedEntityTypes: ["class"],
      uiFields: [
        ui("item", "Item", "Предмет", "entity", {
          allowedEntityTypes: ["item"],
        }),
        ui("quantity", "Quantity", "Количество", "number", {
          minimum: 1,
          defaultValue: 1,
        }),
        ui(
          "optional",
          "Player may choose an alternative",
          "Игрок может выбрать альтернативу",
          "boolean",
        ),
      ],
    },
  ),
  property(
    "class_progression",
    "Class Progression",
    "Прогрессия класса",
    "level_progression",
    "table",
    {
      allowedEntityTypes: ["class"],
      table: table(
        [
          ["level", "LVL", "УР.", "integer"],
          ["proficiency_bonus", "PB", "БМ", "integer"],
          ["features", "Features", "Умения", "string"],
        ],
        Array.from({ length: 20 }, (_, index) => ({
          level: index + 1,
          proficiency_bonus: 2 + Math.floor(index / 4),
          features: "",
        })),
      ),
    },
  ),
  property(
    "class_subclass_level",
    "Subclass Level",
    "Уровень подкласса",
    "classes_multiclassing",
    "integer",
    { allowedEntityTypes: ["class"] },
  ),
  property(
    "class_spellcasting_ability",
    "Spellcasting Ability",
    "Заклинательная характеристика",
    "magic_spells",
    "reference",
    { optionGroup: "ability", allowedEntityTypes: ["class"] },
  ),
  property(
    "class_spell_progression",
    "Spell Progression",
    "Прогрессия заклинаний",
    "magic_spells",
    "table",
    {
      allowedEntityTypes: ["class"],
      table: table(
        [
          ["level", "LVL", "УР.", "integer"],
          ["cantrips", "Cantrips", "Заговоры", "integer"],
          ["prepared", "Prepared", "Подготовлено", "integer"],
          ["slot_1", "1", "1", "integer"],
          ["slot_2", "2", "2", "integer"],
          ["slot_3", "3", "3", "integer"],
          ["slot_4", "4", "4", "integer"],
          ["slot_5", "5", "5", "integer"],
          ["slot_6", "6", "6", "integer"],
          ["slot_7", "7", "7", "integer"],
          ["slot_8", "8", "8", "integer"],
          ["slot_9", "9", "9", "integer"],
        ],
        Array.from({ length: 20 }, (_, index) => ({
          level: index + 1,
          cantrips: 0,
          prepared: 0,
          slot_1: 0,
          slot_2: 0,
          slot_3: 0,
          slot_4: 0,
          slot_5: 0,
          slot_6: 0,
          slot_7: 0,
          slot_8: 0,
          slot_9: 0,
        })),
      ),
    },
  ),
  property(
    "multiclass_prerequisites",
    "Multiclass Prerequisites",
    "Требования мультикласса",
    "classes_multiclassing",
    "condition_set",
    { allowedEntityTypes: ["multiclass"] },
  ),
  property(
    "multiclass_base_class",
    "Base Class",
    "Базовый класс",
    "classes_multiclassing",
    "entity",
    { allowedEntityTypes: ["multiclass"] },
  ),
  property(
    "multiclass_grants",
    "Multiclass Grants",
    "Получаемое при мультиклассе",
    "classes_multiclassing",
    "guided_list",
    {
      allowedEntityTypes: ["multiclass"],
      uiFields: [
        ui("grant_type", "What is granted", "Что выдаётся", "select", {
          optionGroup: "proficiency_type",
        }),
        ui("entity", "Entity", "Сущность", "entity", {
          allowedEntityTypes: ["feature", "item"],
        }),
        ui("quantity", "Quantity", "Количество", "number", {
          minimum: 1,
          defaultValue: 1,
        }),
      ],
    },
  ),
  property(
    "subclass_parent_class",
    "Parent Class",
    "Родительский класс",
    "classes_multiclassing",
    "entity",
    { allowedEntityTypes: ["subclass"] },
  ),
  property(
    "subclass_progression",
    "Subclass Progression",
    "Прогрессия подкласса",
    "level_progression",
    "table",
    {
      allowedEntityTypes: ["subclass"],
      table: table(
        [
          ["level", "LVL", "УР.", "integer"],
          ["features", "Features", "Умения", "string"],
        ],
        [],
      ),
    },
  ),
  property(
    "species_creature_type",
    "Creature Type",
    "Тип существа",
    "creature_body",
    "select",
    { optionGroup: "creature_type", allowedEntityTypes: ["species"] },
  ),
  property(
    "species_size_options",
    "Size Options",
    "Варианты размера",
    "creature_body",
    "references",
    { optionGroup: "size", allowedEntityTypes: ["species"] },
  ),
  property(
    "species_speeds",
    "Speeds",
    "Скорости",
    "movement_position",
    "guided_list",
    {
      allowedEntityTypes: ["species"],
      uiFields: [
        ui("type", "Movement type", "Тип движения", "select", {
          optionGroup: "speed_type",
        }),
        ui("feet", "Speed, ft", "Скорость, фт", "number", { minimum: 0 }),
      ],
    },
  ),
  property(
    "species_senses",
    "Senses",
    "Чувства",
    "senses_perception",
    "guided_list",
    {
      allowedEntityTypes: ["species"],
      uiFields: [
        ui("type", "Sense", "Чувство", "select", { optionGroup: "sense_type" }),
        ui(
          "range",
          "Range, ft (0 = absent)",
          "Дальность, фт (0 = нет)",
          "number",
          { minimum: 0 },
        ),
      ],
    },
  ),
  property(
    "species_languages",
    "Languages",
    "Языки",
    "languages",
    "references",
    { optionGroup: "language", allowedEntityTypes: ["species"] },
  ),
  property(
    "species_damage_traits",
    "Damage Traits",
    "Отношение к урону",
    "damage_defense",
    "guided_list",
    {
      allowedEntityTypes: ["species"],
      uiFields: [
        ui("damage_type", "Damage type", "Тип урона", "select", {
          optionGroup: "damage_type",
        }),
        ui("trait", "Trait", "Отношение", "select", {
          optionGroup: "damage_trait",
        }),
      ],
    },
  ),
  property(
    "species_condition_immunities",
    "Condition Immunities",
    "Иммунитеты к состояниям",
    "conditions",
    "references",
    { optionGroup: "condition", allowedEntityTypes: ["species"] },
  ),
  property(
    "background_ability_options",
    "Ability Score Options",
    "Варианты характеристик",
    "abilities",
    "references",
    { optionGroup: "ability", allowedEntityTypes: ["background"] },
  ),
  property(
    "background_origin_feats",
    "Origin Feats",
    "Стартовые черты",
    "choices",
    "entities",
    { allowedEntityTypes: ["feat"] },
  ),
  property(
    "background_skill_proficiencies",
    "Skill Proficiencies",
    "Владения навыками",
    "skills_checks",
    "references",
    { optionGroup: "skill", allowedEntityTypes: ["background"] },
  ),
  property(
    "background_tool_proficiencies",
    "Tool Proficiencies",
    "Владения инструментами",
    "proficiencies",
    "references",
    { optionGroup: "tool_type", allowedEntityTypes: ["background"] },
  ),
  property(
    "background_languages",
    "Languages",
    "Языки",
    "languages",
    "references",
    { optionGroup: "language", allowedEntityTypes: ["background"] },
  ),
  property(
    "background_equipment",
    "Equipment Options",
    "Варианты снаряжения",
    "items_inventory",
    "guided_list",
    {
      allowedEntityTypes: ["background"],
      uiFields: [
        ui("item", "Item", "Предмет", "entity", {
          allowedEntityTypes: ["item"],
        }),
        ui("quantity", "Quantity", "Количество", "number", {
          minimum: 1,
          defaultValue: 1,
        }),
        ui(
          "optional",
          "Empty slot lets player choose",
          "Пустой слот выбирает игрок",
          "boolean",
          { defaultValue: true },
        ),
      ],
    },
  ),
  property(
    "background_currency",
    "Starting Currency",
    "Начальные монеты",
    "economy_currency",
    "guided",
    {
      allowedEntityTypes: ["background"],
      uiFields: [
        ui("cp", "CP", "ММ", "number", { minimum: 0 }),
        ui("sp", "SP", "СМ", "number", { minimum: 0 }),
        ui("ep", "EP", "ЭМ", "number", { minimum: 0 }),
        ui("gp", "GP", "ЗМ", "number", { minimum: 0 }),
        ui("pp", "PP", "ПМ", "number", { minimum: 0 }),
      ],
    },
  ),
  property(
    "feat_category",
    "Feat Category",
    "Категория черты",
    "choices",
    "select",
    { optionGroup: "feat_category", allowedEntityTypes: ["feat"] },
  ),
  property(
    "feat_repeatable",
    "Repeatable",
    "Повторяемая",
    "stacking_priority",
    "boolean",
    { allowedEntityTypes: ["feat"] },
  ),
  property(
    "feat_ability_increases",
    "Ability Score Increases",
    "Повышения характеристик",
    "abilities",
    "guided_list",
    {
      allowedEntityTypes: ["feat"],
      uiFields: [
        ui("ability", "Ability", "Характеристика", "select", {
          optionGroup: "ability",
        }),
        ui("amount", "Increase", "Повышение", "number", {
          minimum: 1,
          defaultValue: 1,
        }),
        ui("maximum", "Maximum score", "Максимальное значение", "number", {
          minimum: 1,
          defaultValue: 20,
        }),
      ],
    },
  ),
  property(
    "feature_behavior",
    "Feature Behavior",
    "Тип работы умения",
    "effects",
    "select",
    { optionGroup: "feature_behavior", allowedEntityTypes: ["feature"] },
  ),
  property(
    "feature_level",
    "Granted at Level",
    "Выдаётся на уровне",
    "level_progression",
    "integer",
    { allowedEntityTypes: ["feature"] },
  ),
  property(
    "feature_uses",
    "Uses",
    "Использования",
    "resources_charges",
    "resource",
    { allowedEntityTypes: ["feature"] },
  ),
  property(
    "feature_damage",
    "Damage Components",
    "Компоненты урона",
    "damage_defense",
    "damage",
    { allowedEntityTypes: ["feature"] },
  ),
  property(
    "feature_healing",
    "Healing",
    "Исцеление",
    "hit_points_healing",
    "dice",
    { allowedEntityTypes: ["feature"] },
  ),
  property(
    "feature_conditions",
    "Conditions",
    "Состояния",
    "conditions",
    "references",
    { optionGroup: "condition", allowedEntityTypes: ["feature"] },
  ),
  property(
    "item_type",
    "Item Type",
    "Тип предмета",
    "items_inventory",
    "select",
    { optionGroup: "item_type", allowedEntityTypes: ["item"] },
  ),
  property("item_cost", "Cost", "Стоимость", "economy_currency", "guided", {
    allowedEntityTypes: ["item"],
    uiFields: [
      ui("amount", "Amount", "Количество", "number", { minimum: 0 }),
      ui("currency", "Currency", "Монета", "select", {
        optionGroup: "currency",
        defaultValue: "wsg.ref.value.currency.gp",
      }),
    ],
  }),
  property("item_weight", "Weight", "Вес", "units_measurements", "decimal", {
    allowedEntityTypes: ["item"],
  }),
  property(
    "item_quantity",
    "Quantity",
    "Количество",
    "items_inventory",
    "integer",
    { allowedEntityTypes: ["item"] },
  ),
  property(
    "item_requires_attunement",
    "Requires Attunement",
    "Требует настройку",
    "prerequisites",
    "boolean",
    { allowedEntityTypes: ["item"] },
  ),
  property(
    "item_charges",
    "Charges",
    "Заряды",
    "resources_charges",
    "integer",
    { allowedEntityTypes: ["item"] },
  ),
  property(
    "item_weapon_category",
    "Weapon Category",
    "Категория оружия",
    "weapons_mastery",
    "select",
    { optionGroup: "weapon_category", allowedEntityTypes: ["item"] },
  ),
  property(
    "item_damage",
    "Weapon Damage",
    "Урон оружия",
    "damage_defense",
    "damage",
    { allowedEntityTypes: ["item"] },
  ),
  property(
    "item_versatile_damage",
    "Versatile Damage",
    "Урон универсального оружия",
    "damage_defense",
    "damage",
    { allowedEntityTypes: ["item"] },
  ),
  property(
    "item_weapon_properties",
    "Weapon Properties",
    "Свойства оружия",
    "weapons_mastery",
    "references",
    { optionGroup: "weapon_property", allowedEntityTypes: ["item"] },
  ),
  property(
    "item_mastery",
    "Mastery Property",
    "Свойство мастерства",
    "weapons_mastery",
    "select",
    { optionGroup: "weapon_mastery", allowedEntityTypes: ["item"] },
  ),
  property(
    "item_range",
    "Range and Reach",
    "Дальность и досягаемость",
    "targets_areas",
    "guided",
    {
      allowedEntityTypes: ["item"],
      uiFields: [
        ui("reach", "Reach, ft", "Досягаемость, фт", "number", {
          minimum: 0,
          defaultValue: 5,
        }),
        ui("normal", "Normal range, ft", "Нормальная дальность, фт", "number", {
          minimum: 0,
        }),
        ui("long", "Long range, ft", "Большая дальность, фт", "number", {
          minimum: 0,
        }),
      ],
    },
  ),
  property(
    "item_armor_category",
    "Armor Category",
    "Категория доспеха",
    "armor",
    "select",
    { optionGroup: "armor_category", allowedEntityTypes: ["item"] },
  ),
  property("item_base_ac", "Base AC", "Базовый КЗ", "armor_class", "integer", {
    allowedEntityTypes: ["item"],
  }),
  property(
    "item_dexterity_ac",
    "Dexterity in AC",
    "Ловкость в КЗ",
    "armor_class",
    "select",
    { optionGroup: "dexterity_ac", allowedEntityTypes: ["item"] },
  ),
  property(
    "item_strength_requirement",
    "Strength Requirement",
    "Требование Силы",
    "prerequisites",
    "integer",
    { allowedEntityTypes: ["item"] },
  ),
  property(
    "item_stealth_disadvantage",
    "Stealth Disadvantage",
    "Помеха Скрытности",
    "skills_checks",
    "boolean",
    { allowedEntityTypes: ["item"] },
  ),
  property(
    "item_consumable",
    "Consumable",
    "Расходуемый",
    "items_inventory",
    "boolean",
    { allowedEntityTypes: ["item"] },
  ),
  property(
    "item_contents",
    "Contents",
    "Содержимое",
    "items_inventory",
    "guided_list",
    {
      allowedEntityTypes: ["item"],
      uiFields: [
        ui("item", "Item", "Предмет", "entity", {
          allowedEntityTypes: ["item"],
        }),
        ui("quantity", "Quantity", "Количество", "number", {
          minimum: 1,
          defaultValue: 1,
        }),
      ],
    },
  ),
  property(
    "item_material_component",
    "Spell Material Component",
    "Материальный компонент",
    "components_casting",
    "boolean",
    { allowedEntityTypes: ["item"] },
  ),
  property(
    "item_base_item",
    "Base Item",
    "Базовый предмет",
    "items_inventory",
    "entity",
    { allowedEntityTypes: ["item"] },
  ),
  property("item_magical", "Magical", "Магический", "magic_spells", "boolean", {
    allowedEntityTypes: ["item"],
  }),
  property("item_rarity", "Rarity", "Редкость", "magic_spells", "select", {
    optionGroup: "item_rarity",
    allowedEntityTypes: ["item"],
  }),
  property(
    "item_magic_bonus",
    "Magic Bonus",
    "Магический бонус",
    "effects",
    "integer",
    { allowedEntityTypes: ["item"] },
  ),
  property("item_cursed", "Cursed", "Проклятый", "afflictions", "boolean", {
    allowedEntityTypes: ["item"],
  }),
  property(
    "item_attunement_prerequisites",
    "Attunement Prerequisites",
    "Требования настройки",
    "prerequisites",
    "condition_set",
    { allowedEntityTypes: ["item"] },
  ),
  property(
    "item_equipment_slot",
    "Equipment Slot",
    "Слот экипировки",
    "items_inventory",
    "select",
    { optionGroup: "equipment_slot", allowedEntityTypes: ["item"] },
  ),
  property(
    "item_stack_size",
    "Stack Size",
    "Размер стопки",
    "items_inventory",
    "integer",
    { allowedEntityTypes: ["item"] },
  ),
  property(
    "item_tool_type",
    "Tool Type",
    "Тип инструмента",
    "proficiencies",
    "select",
    { optionGroup: "tool_type", allowedEntityTypes: ["item"] },
  ),
  property(
    "item_tool_ability",
    "Tool Ability",
    "Характеристика инструмента",
    "proficiencies",
    "select",
    { optionGroup: "ability", allowedEntityTypes: ["item"] },
  ),
  property(
    "item_poison_type",
    "Poison Type",
    "Вид яда",
    "damage_defense",
    "select",
    { optionGroup: "poison_type", allowedEntityTypes: ["item"] },
  ),
  property(
    "item_substance_type",
    "Substance Type",
    "Тип вещества",
    "items_inventory",
    "select",
    { optionGroup: "substance_type", allowedEntityTypes: ["item"] },
  ),
  property(
    "item_ammunition_container",
    "Ammunition Container",
    "Контейнер боеприпасов",
    "items_inventory",
    "localized_short",
    { allowedEntityTypes: ["item"] },
  ),
  property(
    "item_original_pack_quantity",
    "Original Pack Quantity",
    "Количество в исходной упаковке",
    "items_inventory",
    "integer",
    { allowedEntityTypes: ["item"] },
  ),
  property(
    "item_container_capacity",
    "Container Capacity",
    "Вместимость контейнера",
    "items_inventory",
    "guided",
    {
      allowedEntityTypes: ["item"],
      uiFields: [
        ui("weight_lb", "Weight, lb", "Вес, фунты", "number", { minimum: 0 }),
        ui(
          "volume_cubic_ft",
          "Volume, cubic ft",
          "Объём, куб. футы",
          "number",
          { minimum: 0 },
        ),
      ],
    },
  ),
  property(
    "item_focus_type",
    "Focus Type",
    "Тип фокусировки",
    "components_casting",
    "select",
    { optionGroup: "focus_type", allowedEntityTypes: ["item"] },
  ),
  property(
    "item_material_consumed",
    "Consumed by Spell",
    "Расходуется заклинанием",
    "components_casting",
    "boolean",
    { allowedEntityTypes: ["item"] },
  ),
  property(
    "item_material_minimum_cost",
    "Required Component Cost",
    "Требуемая стоимость компонента",
    "components_casting",
    "guided",
    {
      allowedEntityTypes: ["item"],
      uiFields: [
        ui("amount", "Minimum amount", "Минимальная стоимость", "number", {
          minimum: 0,
        }),
        ui("currency", "Currency", "Монета", "select", {
          optionGroup: "currency",
          defaultValue: "wsg.ref.value.currency.gp",
        }),
      ],
    },
  ),
  property(
    "item_used_by_spells",
    "Used by Spells",
    "Используется заклинаниями",
    "components_casting",
    "entities",
    { allowedEntityTypes: ["spell"], multiple: true },
  ),
  property(
    "item_vehicle_type",
    "Mount or Vehicle Type",
    "Тип ездового животного или транспорта",
    "mounts_vehicles",
    "select",
    { optionGroup: "vehicle_type", allowedEntityTypes: ["item"] },
  ),
  property(
    "item_capacity",
    "Creature or Cargo Capacity",
    "Вместимость существ или груза",
    "mounts_vehicles",
    "guided",
    {
      allowedEntityTypes: ["item"],
      uiFields: [
        ui("creatures", "Creatures", "Существа", "number", { minimum: 0 }),
        ui("cargo_lb", "Cargo, lb", "Груз, фунты", "number", { minimum: 0 }),
      ],
    },
  ),
  property(
    "item_speed",
    "Item Speed",
    "Скорость предмета",
    "movement_position",
    "guided_list",
    {
      allowedEntityTypes: ["item"],
      uiFields: [
        ui("type", "Movement type", "Тип движения", "select", {
          optionGroup: "speed_type",
        }),
        ui("feet", "Speed, ft", "Скорость, фт", "number", { minimum: 0 }),
      ],
    },
  ),
  property(
    "item_treasure_type",
    "Treasure Type",
    "Тип сокровища",
    "economy_currency",
    "select",
    { optionGroup: "treasure_type", allowedEntityTypes: ["item"] },
  ),
  property(
    "spell_level",
    "Spell Level",
    "Уровень заклинания",
    "magic_spells",
    "integer",
    { allowedEntityTypes: ["spell"] },
  ),
  property("spell_school", "School", "Школа", "magic_spells", "select", {
    optionGroup: "spell_school",
    allowedEntityTypes: ["spell"],
  }),
  property(
    "spell_casting_time",
    "Casting Time",
    "Время накладывания",
    "actions_timing",
    "guided",
    {
      allowedEntityTypes: ["spell"],
      uiFields: [
        ui("action", "Action type", "Тип действия", "select", {
          optionGroup: "activation",
        }),
        ui("amount", "Amount", "Количество", "number", {
          minimum: 1,
          defaultValue: 1,
        }),
      ],
    },
  ),
  property("spell_range", "Range", "Дальность", "targets_areas", "guided", {
    allowedEntityTypes: ["spell"],
    uiFields: [
      ui("type", "Range type", "Тип дальности", "select", {
        optionGroup: "range_type",
      }),
      ui("feet", "Distance, ft", "Дистанция, фт", "number", { minimum: 0 }),
    ],
  }),
  property(
    "spell_components",
    "Components",
    "Компоненты",
    "components_casting",
    "references",
    { optionGroup: "spell_component", allowedEntityTypes: ["spell"] },
  ),
  property(
    "spell_material_items",
    "Material Items",
    "Материальные предметы",
    "components_casting",
    "entities",
    { allowedEntityTypes: ["item"] },
  ),
  property(
    "spell_material_requirements",
    "Material Requirements",
    "Требования к материалам",
    "components_casting",
    "guided_list",
    {
      allowedEntityTypes: ["spell"],
      multiple: true,
      uiFields: [
        ui("item", "Material item", "Материальный предмет", "entity", {
          allowedEntityTypes: ["item"],
        }),
        ui("quantity", "Quantity", "Количество", "number", {
          minimum: 1,
          defaultValue: 1,
        }),
        ui(
          "minimum_cost_cp",
          "Minimum cost, CP",
          "Минимальная стоимость, ММ",
          "number",
          { minimum: 0 },
        ),
        ui("consumed", "Consumed", "Расходуется", "boolean"),
        ui(
          "per_target",
          "Required per target",
          "Требуется на каждую цель",
          "boolean",
        ),
      ],
    },
  ),
  property(
    "spell_duration",
    "Spell Duration",
    "Длительность заклинания",
    "duration",
    "duration_rounds",
    { allowedEntityTypes: ["spell"] },
  ),
  property(
    "spell_concentration",
    "Concentration",
    "Концентрация",
    "magic_spells",
    "boolean",
    { allowedEntityTypes: ["spell"] },
  ),
  property("spell_ritual", "Ritual", "Ритуал", "magic_spells", "boolean", {
    allowedEntityTypes: ["spell"],
  }),
  property(
    "spell_attack",
    "Spell Attack",
    "Атака заклинанием",
    "attacks_hits",
    "guided",
    {
      allowedEntityTypes: ["spell"],
      uiFields: [
        ui("type", "Attack type", "Тип атаки", "select", {
          optionGroup: "attack_type",
        }),
        ui("ability", "Ability", "Характеристика", "select", {
          optionGroup: "ability",
        }),
        ui("bonus", "Additional bonus", "Дополнительный бонус", "calculation"),
      ],
    },
  ),
  property(
    "spell_save",
    "Saving Throw",
    "Спасбросок",
    "saving_throws",
    "guided",
    {
      allowedEntityTypes: ["spell"],
      uiFields: [
        ui(
          "ability",
          "Saving throw ability",
          "Характеристика спасброска",
          "select",
          { optionGroup: "ability" },
        ),
        ui("dc", "Difficulty Class", "Сложность", "calculation"),
      ],
    },
  ),
  property("spell_damage", "Damage", "Урон", "damage_defense", "damage", {
    allowedEntityTypes: ["spell"],
  }),
  property(
    "spell_periodic_damage",
    "Periodic Damage",
    "Периодический урон",
    "damage_defense",
    "damage",
    { allowedEntityTypes: ["spell"] },
  ),
  property(
    "spell_healing",
    "Healing",
    "Исцеление",
    "hit_points_healing",
    "guided_list",
    {
      allowedEntityTypes: ["spell"],
      multiple: true,
      uiFields: [
        ui("amount", "Healing amount", "Количество лечения", "calculation"),
        ui("temporary", "Temporary Hit Points", "Временные ОЗ", "boolean"),
      ],
    },
  ),
  property(
    "spell_conditions",
    "Applied Conditions",
    "Накладываемые состояния",
    "conditions",
    "references",
    { optionGroup: "condition", allowedEntityTypes: ["spell"] },
  ),
  property(
    "spell_scaling",
    "Higher-Level Scaling",
    "Усиление на высоких уровнях",
    "magic_spells",
    "guided_list",
    {
      allowedEntityTypes: ["spell"],
      uiFields: [
        ui(
          "per_slot_levels",
          "For each slot levels",
          "За каждые уровни ячейки",
          "number",
          { minimum: 1, defaultValue: 1 },
        ),
        ui("damage_dice", "Additional damage", "Дополнительный урон", "dice"),
        ui(
          "healing",
          "Additional healing",
          "Дополнительное лечение",
          "calculation",
        ),
        ui("targets", "Additional targets", "Дополнительные цели", "number", {
          minimum: 0,
        }),
      ],
    },
  ),
  property(
    "spell_classes",
    "Spell Lists",
    "Списки классов",
    "magic_spells",
    "entities",
    { allowedEntityTypes: ["class"] },
  ),
  property(
    "spell_categories",
    "Spell Categories",
    "Категории заклинания",
    "magic_spells",
    "references",
    {
      optionGroup: "spell_category",
      allowedEntityTypes: ["spell"],
      multiple: true,
    },
  ),
  property(
    "spell_areas",
    "Spell Areas",
    "Области заклинания",
    "targets_areas",
    "area",
    { allowedEntityTypes: ["spell"], multiple: true },
  ),
  property(
    "spell_source_profiles",
    "Workbook Profiles",
    "Профили таблицы",
    "magic_spells",
    "list",
    { allowedEntityTypes: ["spell"], multiple: true },
  ),
  property(
    "spell_higher_level",
    "Has Higher-Level Scaling",
    "Есть усиление на высоких уровнях",
    "magic_spells",
    "boolean",
    { allowedEntityTypes: ["spell"] },
  ),
];

const advancement = property(
  "character_advancement",
  "Character Advancement",
  "Развитие персонажа",
  "level_progression",
  "table",
  {
    table: table(
      [
        ["level", "LVL", "УР.", "integer"],
        ["xp", "Experience Points", "Очки опыта", "integer"],
        ["pb", "Proficiency Bonus", "Бонус мастерства", "integer"],
      ],
      [
        [1, 0, 2],
        [2, 300, 2],
        [3, 900, 2],
        [4, 2700, 2],
        [5, 6500, 3],
        [6, 14000, 3],
        [7, 23000, 3],
        [8, 34000, 3],
        [9, 48000, 4],
        [10, 64000, 4],
        [11, 85000, 4],
        [12, 100000, 4],
        [13, 120000, 5],
        [14, 140000, 5],
        [15, 165000, 5],
        [16, 195000, 5],
        [17, 225000, 6],
        [18, 265000, 6],
        [19, 305000, 6],
        [20, 355000, 6],
      ].map(([level, xp, pb]) => ({ level, xp, pb })),
    ),
  },
);
const carrying = property(
  "carrying_capacity_by_size",
  "Carrying Capacity by Size",
  "Грузоподъёмность по размеру",
  "items_inventory",
  "table",
  {
    table: table(
      [
        ["size", "Size", "Размер", "string"],
        ["carry", "Carry Multiplier", "Множитель переноса", "decimal"],
        ["push", "Push Multiplier", "Множитель толчка", "decimal"],
      ],
      [
        ["tiny", 7.5, 15],
        ["small", 15, 30],
        ["medium", 15, 30],
        ["large", 30, 60],
        ["huge", 60, 120],
        ["gargantuan", 120, 240],
      ].map(([size, carry, push]) => ({ size, carry, push })),
    ),
  },
);
const pointBuy = property(
  "point_buy_costs",
  "Point Buy Costs",
  "Стоимость покупки характеристик",
  "abilities",
  "table",
  {
    table: table(
      [
        ["score", "Score", "Значение", "integer"],
        ["cost", "Cost", "Стоимость", "integer"],
      ],
      [
        [8, 0],
        [9, 1],
        [10, 2],
        [11, 3],
        [12, 4],
        [13, 5],
        [14, 7],
        [15, 9],
      ].map(([score, cost]) => ({ score, cost })),
    ),
  },
);

const valueGroups: Array<[string, string, string, string, string?]> = [
  ...[
    ["strength", "Strength", "Сила"],
    ["dexterity", "Dexterity", "Ловкость"],
    ["constitution", "Constitution", "Телосложение"],
    ["intelligence", "Intelligence", "Интеллект"],
    ["wisdom", "Wisdom", "Мудрость"],
    ["charisma", "Charisma", "Харизма"],
  ].map(
    ([k, e, r]) =>
      ["ability", k, e, r, "abilities"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["none", "None", "Нет"],
    ["proficient", "Proficient", "Владение"],
    ["expertise", "Expertise", "Экспертность"],
  ].map(
    ([k, e, r]) =>
      ["skill_rank", k, e, r, "skills_checks"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["tiny", "Tiny", "Крошечный"],
    ["small", "Small", "Маленький"],
    ["medium", "Medium", "Средний"],
    ["large", "Large", "Большой"],
    ["huge", "Huge", "Огромный"],
    ["gargantuan", "Gargantuan", "Колоссальный"],
  ].map(
    ([k, e, r]) =>
      ["size", k, e, r, "creature_body"] as [
        string,
        string,
        string,
        string,
        string,
      ],
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
  ].map(
    (k) =>
      [
        "damage_type",
        k,
        k[0].toUpperCase() + k.slice(1),
        k,
        "damage_defense",
      ] as [string, string, string, string, string],
  ),
  ...[
    ["normal", "Normal", "Обычное"],
    ["resistance", "Resistance", "Сопротивление"],
    ["vulnerability", "Vulnerability", "Уязвимость"],
    ["immunity", "Immunity", "Иммунитет"],
  ].map(
    ([k, e, r]) =>
      ["damage_trait", k, e, r, "damage_defense"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["cp", "Copper Pieces", "Медные монеты"],
    ["sp", "Silver Pieces", "Серебряные монеты"],
    ["ep", "Electrum Pieces", "Электрумовые монеты"],
    ["gp", "Gold Pieces", "Золотые монеты"],
    ["pp", "Platinum Pieces", "Платиновые монеты"],
  ].map(
    ([k, e, r]) =>
      ["currency", k, e, r, "economy_currency"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["self", "Self", "На себя"],
    ["touch", "Touch", "Касание"],
    ["distance", "Distance", "Дистанция"],
    ["sight", "Видимость", "Видимость"],
    ["unlimited", "Unlimited", "Неограниченно"],
    ["special", "Special", "Особая"],
  ].map(
    ([k, e, r]) =>
      ["range_type", k, e, r, "targets_areas"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["blinded", "Blinded", "Ослеплён"],
    ["charmed", "Charmed", "Очарован"],
    ["deafened", "Deafened", "Оглох"],
    ["frightened", "Frightened", "Испуган"],
    ["grappled", "Grappled", "Схвачен"],
    ["incapacitated", "Incapacitated", "Недееспособен"],
    ["invisible", "Invisible", "Невидим"],
    ["paralyzed", "Paralyzed", "Парализован"],
    ["petrified", "Petrified", "Окаменел"],
    ["poisoned", "Poisoned", "Отравлен"],
    ["prone", "Prone", "Сбит с ног"],
    ["restrained", "Restrained", "Опутан"],
    ["stunned", "Stunned", "Оглушён"],
    ["unconscious", "Unconscious", "Без сознания"],
  ].map(
    ([k, e, r]) =>
      ["condition", k, e, r, "conditions"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["advantage", "Advantage", "Преимущество"],
    ["normal", "Normal", "Обычный"],
    ["disadvantage", "Disadvantage", "Помеха"],
  ].map(
    ([k, e, r]) =>
      ["d20_mode", k, e, r, "dice_randomness"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["weapon", "Weapon", "Оружие"],
    ["armor", "Armor", "Доспех"],
    ["tool", "Tool", "Инструмент"],
    ["language", "Language", "Язык"],
  ].map(
    ([k, e, r]) =>
      ["proficiency_type", k, e, r, "proficiencies"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["walk", "Walking", "Ходьба"],
    ["burrow", "Burrowing", "Рытьё"],
    ["climb", "Climbing", "Лазание"],
    ["fly", "Flying", "Полёт"],
    ["swim", "Swimming", "Плавание"],
  ].map(
    ([k, e, r]) =>
      ["speed_type", k, e, r, "movement_position"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["normal_vision", "Normal Vision", "Обычное зрение"],
    ["darkvision", "Darkvision", "Темнозрение"],
    ["blindsight", "Blindsight", "Слепое зрение"],
    ["truesight", "Truesight", "Истинное зрение"],
    ["tremorsense", "Tremorsense", "Чувство вибрации"],
  ].map(
    ([k, e, r]) =>
      ["sense_type", k, e, r, "senses_perception"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["cone", "Cone", "Конус"],
    ["cube", "Cube", "Куб"],
    ["cylinder", "Cylinder", "Цилиндр"],
    ["emanation", "Emanation", "Эманация"],
    ["line", "Line", "Линия"],
    ["sphere", "Sphere", "Сфера"],
  ].map(
    ([k, e, r]) =>
      ["area_shape", k, e, r, "targets_areas"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["creature", "Creature", "Существо"],
    ["object", "Object", "Предмет"],
    ["space", "Space", "Клетка"],
    ["point", "Point", "Точка"],
    ["self", "Self", "На себя"],
  ].map(
    ([k, e, r]) =>
      ["target_type", k, e, r, "targets_areas"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["weapon", "Weapon", "Оружие"],
    ["armor", "Armor", "Доспех"],
    ["shield", "Shield", "Щит"],
    ["boots", "Boots", "Сапоги"],
    ["bracers", "Bracers", "Наручи"],
    ["belt", "Belt", "Пояс"],
    ["cloak", "Cloak", "Плащ"],
    ["headwear", "Helmet or Hat", "Шлем или шляпа"],
    ["ring", "Ring", "Кольцо"],
    ["amulet", "Amulet", "Амулет"],
    ["ammunition", "Ammunition", "Боеприпасы"],
    ["tool", "Tool", "Инструмент"],
    ["adventuring_gear", "Adventuring Gear", "Снаряжение"],
    ["consumable", "Consumable", "Расходуемый предмет"],
    ["potion", "Potion", "Зелье"],
    ["poison", "Poison", "Яд"],
    ["substance", "Substance", "Вещество"],
    ["equipment_kit", "Equipment Kit", "Комплект снаряжения"],
    ["container", "Container", "Контейнер"],
    ["spellcasting_focus", "Spellcasting Focus", "Фокусировка"],
    ["mount_vehicle", "Mount or Vehicle", "Ездовое животное или транспорт"],
    ["material_component", "Material Component", "Материальный компонент"],
    ["treasure", "Treasure", "Сокровище"],
    ["currency", "Currency", "Монета"],
  ].map(
    ([k, e, r]) =>
      ["item_type", k, e, r, "items_inventory"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["mundane", "Mundane", "Немагический"],
    ["common", "Common", "Обычный"],
    ["uncommon", "Uncommon", "Необычный"],
    ["rare", "Rare", "Редкий"],
    ["very_rare", "Very Rare", "Очень редкий"],
    ["legendary", "Legendary", "Легендарный"],
    ["artifact", "Artifact", "Артефакт"],
  ].map(
    ([k, e, r]) =>
      ["item_rarity", k, e, r, "magic_spells"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["held", "Held", "В руках"],
    ["armor", "Armor", "Доспех"],
    ["shield", "Shield", "Щит"],
    ["boots", "Boots", "Сапоги"],
    ["bracers", "Bracers", "Наручи"],
    ["belt", "Belt", "Пояс"],
    ["cloak", "Cloak", "Плащ"],
    ["head", "Head", "Голова"],
    ["ring", "Ring", "Кольцо"],
    ["neck", "Neck", "Шея"],
    ["body", "Body", "Тело"],
    ["none", "No Slot", "Без слота"],
  ].map(
    ([k, e, r]) =>
      ["equipment_slot", k, e, r, "items_inventory"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["artisan", "Artisan's Tool", "Ремесленный инструмент"],
    ["gaming", "Gaming Set", "Игровой набор"],
    ["musical", "Musical Instrument", "Музыкальный инструмент"],
    ["other", "Other Tool", "Другой инструмент"],
  ].map(
    ([k, e, r]) =>
      ["tool_type", k, e, r, "proficiencies"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["ingested", "Ingested", "Поглощаемый"],
    ["inhaled", "Inhaled", "Вдыхаемый"],
    ["contact", "Contact", "Контактный"],
    ["injury", "Injury", "Оружейный"],
    ["ingested_or_injury", "Ingested or Injury", "Поглощаемый или оружейный"],
  ].map(
    ([k, e, r]) =>
      ["poison_type", k, e, r, "damage_defense"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["substance", "Substance", "Вещество"],
    ["drug", "Drug", "Наркотик"],
  ].map(
    ([k, e, r]) =>
      ["substance_type", k, e, r, "items_inventory"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["arcane", "Arcane Focus", "Магическая фокусировка"],
    ["druidic", "Druidic Focus", "Друидическая фокусировка"],
    ["holy_symbol", "Holy Symbol", "Священный символ"],
    ["other", "Other Focus", "Другая фокусировка"],
  ].map(
    ([k, e, r]) =>
      ["focus_type", k, e, r, "components_casting"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["mount", "Mount", "Ездовое животное"],
    ["land_vehicle", "Land Vehicle", "Наземный транспорт"],
    ["water_vehicle", "Water Vehicle", "Водный транспорт"],
    ["air_vehicle", "Air Vehicle", "Воздушный транспорт"],
    ["object", "Object", "Объект"],
  ].map(
    ([k, e, r]) =>
      ["vehicle_type", k, e, r, "mounts_vehicles"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["gemstone", "Gemstone", "Драгоценный камень"],
    ["art_object", "Art Object", "Предмет искусства"],
    ["trade_good", "Trade Good", "Товар"],
    ["currency", "Currency", "Валюта"],
    ["other", "Other Treasure", "Другое сокровище"],
  ].map(
    ([k, e, r]) =>
      ["treasure_type", k, e, r, "economy_currency"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["ammunition", "Ammunition", "Боеприпас"],
    ["finesse", "Finesse", "Фехтовальное"],
    ["heavy", "Heavy", "Тяжёлое"],
    ["light", "Light", "Лёгкое"],
    ["loading", "Loading", "Перезарядка"],
    ["reach", "Reach", "Досягаемость"],
    ["thrown", "Thrown", "Метательное"],
    ["two_handed", "Two-Handed", "Двуручное"],
    ["versatile", "Versatile", "Универсальное"],
  ].map(
    ([k, e, r]) =>
      ["weapon_property", k, e, r, "weapons_mastery"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["cleave", "Cleave", "Рассечение"],
    ["graze", "Graze", "Скользящий удар"],
    ["nick", "Nick", "Быстрый удар"],
    ["push", "Push", "Толчок"],
    ["sap", "Sap", "Ошеломление"],
    ["slow", "Slow", "Замедление"],
    ["topple", "Topple", "Опрокидывание"],
    ["vex", "Vex", "Досаждение"],
  ].map(
    ([k, e, r]) =>
      ["weapon_mastery", k, e, r, "weapons_mastery"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["short_rest", "Short Rest", "Короткий отдых"],
    ["long_rest", "Long Rest", "Долгий отдых"],
  ].map(
    ([k, e, r]) =>
      ["rest_type", k, e, r, "rest_recovery"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["manual", "Manual", "Вручную"],
    ["start_of_turn", "Start of Turn", "Начало хода"],
    ["end_of_turn", "End of Turn", "Конец хода"],
    ["start_of_round", "Start of Round", "Начало раунда"],
    ["end_of_round", "End of Round", "Конец раунда"],
    ["short_rest", "Short Rest", "Короткий отдых"],
    ["long_rest", "Long Rest", "Долгий отдых"],
    ["successful_save", "Successful Save", "Успешный спасбросок"],
  ].map(
    ([k, e, r]) =>
      ["expiration_event", k, e, r, "duration"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["never", "Never", "Никогда"],
    ["short_rest", "Short Rest", "Короткий отдых"],
    ["long_rest", "Long Rest", "Долгий отдых"],
    ["dawn", "Dawn", "Рассвет"],
    ["start_of_turn", "Start of Turn", "Начало хода"],
    ["end_of_turn", "End of Turn", "Конец хода"],
  ].map(
    ([k, e, r]) =>
      ["recovery_event", k, e, r, "rest_recovery"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["round", "Round", "Раунд"],
    ["until_event", "Until Event", "До события"],
    ["instantaneous", "Instantaneous", "Мгновенно"],
    ["permanent", "Permanent", "Постоянно"],
  ].map(
    ([k, e, r]) =>
      ["duration_unit", k, e, r, "duration"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["roll", "Roll", "Бросок"],
    ["fixed", "Fixed Value", "Фиксированное значение"],
    ["first_level_maximum", "First-Level Maximum", "Максимум первого уровня"],
  ].map(
    ([k, e, r]) =>
      ["hp_gain_method", k, e, r, "hit_points_healing"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["melee_weapon", "Melee Weapon", "Рукопашное оружие"],
    ["ranged_weapon", "Ranged Weapon", "Дальнобойное оружие"],
    ["spell", "Spell Attack", "Атака заклинанием"],
    ["unarmed", "Unarmed Strike", "Безоружный удар"],
  ].map(
    ([k, e, r]) =>
      ["attack_type", k, e, r, "attacks_hits"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["miss", "Miss", "Промах"],
    ["hit", "Hit", "Попадание"],
    ["critical_hit", "Critical Hit", "Критическое попадание"],
  ].map(
    ([k, e, r]) =>
      ["attack_result", k, e, r, "attacks_hits"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["action", "Action", "Действие"],
    ["bonus_action", "Bonus Action", "Бонусное действие"],
    ["reaction", "Reaction", "Реакция"],
    ["free", "No Action", "Без действия"],
    ["special", "Special", "Особое"],
  ].map(
    ([k, e, r]) =>
      ["activation", k, e, r, "actions_timing"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["passive", "Passive", "Пассивное"],
    ["on_use", "On Use", "При использовании"],
    ["on_hit", "On Hit", "При попадании"],
    ["on_damage", "On Damage", "При получении урона"],
    ["turn_start", "Turn Start", "Начало хода"],
    ["turn_end", "Turn End", "Конец хода"],
    ["rest_completed", "Rest Completed", "Отдых завершён"],
  ].map(
    ([k, e, r]) =>
      ["trigger", k, e, r, "triggers_automation"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["start_of_turn", "Start of Turn", "Начало хода"],
    ["end_of_turn", "End of Turn", "Конец хода"],
    ["start_of_round", "Start of Round", "Начало раунда"],
    ["end_of_round", "End of Round", "Конец раунда"],
  ].map(
    ([k, e, r]) =>
      ["periodic_trigger", k, e, r, "damage_defense"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["none", "No Damage", "Нет урона"],
    ["half", "Half Damage", "Половина урона"],
    ["full", "Full Damage", "Полный урон"],
    ["ends", "Ends Effect", "Завершает эффект"],
  ].map(
    ([k, e, r]) =>
      ["save_success", k, e, r, "saving_throws"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["simple", "Simple Weapon", "Простое оружие"],
    ["martial", "Martial Weapon", "Воинское оружие"],
  ].map(
    ([k, e, r]) =>
      ["weapon_category", k, e, r, "weapons_mastery"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["light", "Light Armor", "Лёгкий доспех"],
    ["medium", "Medium Armor", "Средний доспех"],
    ["heavy", "Heavy Armor", "Тяжёлый доспех"],
    ["shield", "Shield", "Щит"],
  ].map(
    ([k, e, r]) =>
      ["armor_category", k, e, r, "armor"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["none", "None", "Нет"],
    ["full", "Full Modifier", "Полный модификатор"],
    ["maximum_two", "Maximum +2", "Максимум +2"],
  ].map(
    ([k, e, r]) =>
      ["dexterity_ac", k, e, r, "armor_class"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["origin", "Origin Feat", "Стартовая черта"],
    ["general", "General Feat", "Общая черта"],
    ["fighting_style", "Fighting Style", "Боевой стиль"],
    ["epic_boon", "Epic Boon", "Эпический дар"],
  ].map(
    ([k, e, r]) =>
      ["feat_category", k, e, r, "choices"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["one_time", "One-Time", "Единоразовое"],
    ["passive", "Passive", "Пассивное"],
    ["active", "Active", "Активное"],
  ].map(
    ([k, e, r]) =>
      ["feature_behavior", k, e, r, "effects"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["aberration", "Aberration", "Аберрация"],
    ["beast", "Beast", "Зверь"],
    ["celestial", "Celestial", "Небожитель"],
    ["construct", "Construct", "Конструкт"],
    ["dragon", "Dragon", "Дракон"],
    ["elemental", "Elemental", "Элементаль"],
    ["fey", "Fey", "Фея"],
    ["fiend", "Fiend", "Исчадие"],
    ["giant", "Giant", "Великан"],
    ["humanoid", "Humanoid", "Гуманоид"],
    ["monstrosity", "Monstrosity", "Монстр"],
    ["ooze", "Ooze", "Слизь"],
    ["plant", "Plant", "Растение"],
    ["undead", "Undead", "Нежить"],
  ].map(
    ([k, e, r]) =>
      ["creature_type", k, e, r, "creature_body"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["abjuration", "Abjuration", "Ограждение"],
    ["conjuration", "Conjuration", "Вызов"],
    ["divination", "Divination", "Прорицание"],
    ["enchantment", "Enchantment", "Очарование"],
    ["evocation", "Evocation", "Воплощение"],
    ["illusion", "Illusion", "Иллюзия"],
    ["necromancy", "Necromancy", "Некромантия"],
    ["transmutation", "Transmutation", "Преобразование"],
  ].map(
    ([k, e, r]) =>
      ["spell_school", k, e, r, "magic_spells"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["verbal", "Verbal", "Вербальный"],
    ["somatic", "Somatic", "Соматический"],
    ["material", "Material", "Материальный"],
  ].map(
    ([k, e, r]) =>
      ["spell_component", k, e, r, "components_casting"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
  ...[
    ["damage", "Damage", "Урон"],
    ["healing", "Healing", "Исцеление"],
    ["neutral", "Neutral", "Нейтральное"],
  ].map(
    ([k, e, r]) =>
      ["spell_category", k, e, r, "magic_spells"] as [
        string,
        string,
        string,
        string,
        string,
      ],
  ),
];

const skillRows = [
  ["acrobatics", "Acrobatics", "Акробатика"],
  ["animal_handling", "Animal Handling", "Уход за животными"],
  ["arcana", "Arcana", "Магия"],
  ["athletics", "Athletics", "Атлетика"],
  ["deception", "Deception", "Обман"],
  ["history", "History", "История"],
  ["insight", "Insight", "Проницательность"],
  ["intimidation", "Intimidation", "Запугивание"],
  ["investigation", "Investigation", "Анализ"],
  ["medicine", "Medicine", "Медицина"],
  ["nature", "Nature", "Природа"],
  ["perception", "Perception", "Восприятие"],
  ["performance", "Performance", "Выступление"],
  ["persuasion", "Persuasion", "Убеждение"],
  ["religion", "Religion", "Религия"],
  ["sleight_of_hand", "Sleight of Hand", "Ловкость рук"],
  ["stealth", "Stealth", "Скрытность"],
  ["survival", "Survival", "Выживание"],
].map(([k, e, r]) => option("skill", k, e, r, "skills_checks"));

const effects = [
  effect("add_value", "Add Value", "Прибавить значение", "level", "add"),
  effect(
    "subtract_value",
    "Subtract Value",
    "Вычесть значение",
    "level",
    "subtract",
  ),
  effect(
    "multiply_value",
    "Multiply Value",
    "Умножить значение",
    "level",
    "multiply",
  ),
  effect(
    "divide_value",
    "Divide Value",
    "Разделить значение",
    "level",
    "divide",
  ),
  effect("set_value", "Set Value", "Задать значение", "level", "set"),
  effect("set_minimum", "Set Minimum", "Задать минимум", "level", "minimum"),
  effect("set_maximum", "Set Maximum", "Задать максимум", "level", "maximum"),
  effect("heal", "Heal", "Исцелить", "hit_points", "add"),
  effect(
    "deal_damage",
    "Deal Damage",
    "Нанести урон",
    "hit_points",
    "subtract",
  ),
  effect(
    "grant_temporary_hp",
    "Grant Temporary HP",
    "Выдать временные ОЗ",
    "hit_points",
    "set",
  ),
  effect(
    "modify_armor_class",
    "Modify Armor Class",
    "Изменить КЗ",
    "armor_class",
    "add",
  ),
  effect(
    "modify_ability",
    "Modify Ability",
    "Изменить характеристику",
    "abilities",
    "add",
  ),
  effect("modify_skill", "Modify Skill", "Изменить навык", "skills", "add"),
  effect(
    "modify_initiative",
    "Modify Initiative",
    "Изменить инициативу",
    "initiative",
    "add",
  ),
  effect("modify_speed", "Modify Speed", "Изменить скорость", "speeds", "add"),
  effect(
    "grant_condition",
    "Grant Condition",
    "Наложить состояние",
    "active_conditions",
    "grant",
  ),
  effect(
    "remove_condition",
    "Remove Condition",
    "Снять состояние",
    "active_conditions",
    "remove",
  ),
  effect(
    "grant_condition_immunity",
    "Grant Condition Immunity",
    "Выдать иммунитет к состоянию",
    "condition_immunities",
    "grant",
  ),
  effect(
    "remove_condition_immunity",
    "Remove Condition Immunity",
    "Убрать иммунитет к состоянию",
    "condition_immunities",
    "remove",
  ),
  effect(
    "grant_resistance",
    "Grant Resistance",
    "Выдать сопротивление",
    "damage_traits",
    "grant",
  ),
  effect(
    "grant_vulnerability",
    "Grant Vulnerability",
    "Выдать уязвимость",
    "damage_traits",
    "grant",
  ),
  effect(
    "grant_damage_immunity",
    "Grant Damage Immunity",
    "Выдать иммунитет к урону",
    "damage_traits",
    "grant",
  ),
  effect(
    "remove_damage_trait",
    "Remove Damage Trait",
    "Убрать отношение к урону",
    "damage_traits",
    "remove",
  ),
  effect(
    "grant_advantage",
    "Grant Advantage",
    "Выдать преимущество",
    "d20_roll_mode",
    "grant",
  ),
  effect(
    "grant_disadvantage",
    "Grant Disadvantage",
    "Выдать помеху",
    "d20_roll_mode",
    "grant",
  ),
  effect(
    "remove_roll_modifier",
    "Remove Roll Modifier",
    "Убрать модификатор броска",
    "d20_roll_mode",
    "remove",
  ),
  effect(
    "grant_proficiency",
    "Grant Proficiency",
    "Выдать владение",
    "proficiencies",
    "grant",
  ),
  effect(
    "remove_proficiency",
    "Remove Proficiency",
    "Убрать владение",
    "proficiencies",
    "remove",
  ),
  effect("grant_sense", "Grant Sense", "Выдать чувство", "senses", "grant"),
  effect("remove_sense", "Remove Sense", "Убрать чувство", "senses", "remove"),
  effect(
    "spend_resource",
    "Spend Resource",
    "Потратить ресурс",
    "resources",
    "subtract",
  ),
  effect(
    "restore_resource",
    "Restore Resource",
    "Восстановить ресурс",
    "resources",
    "add",
  ),
  effect("roll_dice", "Roll Dice", "Бросить кости", "roll_dice", "roll", "die"),
  effect(
    "grant_heroic_inspiration",
    "Grant Heroic Inspiration",
    "Выдать героическое вдохновение",
    "heroic_inspiration",
    "set",
  ),
  effect(
    "spend_heroic_inspiration",
    "Spend Heroic Inspiration",
    "Потратить героическое вдохновение",
    "heroic_inspiration",
    "remove",
  ),
  effect(
    "start_concentration",
    "Start Concentration",
    "Начать концентрацию",
    "concentration",
    "grant",
  ),
  effect(
    "end_concentration",
    "End Concentration",
    "Завершить концентрацию",
    "concentration",
    "remove",
  ),
];

interface TemplateFieldSpec {
  name: string;
  required?: boolean;
  multiple?: boolean;
  defaultValue?: unknown;
}
interface TemplateSpec {
  key: string;
  type: EntityType;
  category: string;
  en: string;
  ru: string;
  fields: Array<string | TemplateFieldSpec>;
}

const itemCore: Array<string | TemplateFieldSpec> = [
  "Description",
  "Image",
  "Cost",
  "Weight",
  "Quantity",
  "Stack Size",
  "Base Item",
  "Magical",
  "Rarity",
  "Magic Bonus",
  "Requires Attunement",
  "Attunement Prerequisites",
  "Cursed",
  "Charges",
  "Consumable",
  "Resources",
  "Prerequisites",
  "Granted Features",
  "Influences",
  "Choices",
  "Effects",
];
const spellCore = [
  "Description",
  "Image",
  "Spell Level",
  "School",
  "Spell Categories",
  "Casting Time",
  "Range",
  "Components",
  "Material Items",
  "Material Requirements",
  "Spell Duration",
  "Concentration",
  "Ritual",
  "Spell Lists",
  "Spell Areas",
  "Has Higher-Level Scaling",
  "Targets",
  "Area",
  "Spell Attack",
  "Saving Throw",
  "Damage",
  "Periodic Damage",
  "Healing",
  "Applied Conditions",
  "Higher-Level Scaling",
  "Granted Features",
  "Resources",
  "Prerequisites",
  "Choices",
  "Influences",
  "Effects",
];

const templateSpecs: TemplateSpec[] = [
  {
    key: "class",
    type: "class",
    category: "template_classes",
    en: "Class",
    ru: "Класс",
    fields: [
      "Description",
      "Image",
      "Primary Abilities",
      "Hit Die",
      "Hit Point Progression",
      "Saving Throw Proficiencies",
      "Skill Choices",
      "Weapon Proficiencies",
      "Armor Training",
      "Tool Proficiencies",
      "Starting Equipment",
      "Class Progression",
      "Subclass Level",
      "Spellcasting Ability",
      "Spell Progression",
      "Granted Features",
      "Choices",
      "Influences",
      "Effects",
    ],
  },
  {
    key: "multiclass",
    type: "multiclass",
    category: "template_multiclasses",
    en: "Multiclass Profile",
    ru: "Профиль мультикласса",
    fields: [
      "Description",
      "Image",
      "Base Class",
      "Multiclass Prerequisites",
      "Weapon Proficiencies",
      "Armor Training",
      "Tool Proficiencies",
      "Multiclass Grants",
      "Granted Features",
      "Choices",
      "Influences",
    ],
  },
  {
    key: "subclass",
    type: "subclass",
    category: "template_subclasses",
    en: "Subclass",
    ru: "Подкласс",
    fields: [
      "Description",
      "Image",
      "Parent Class",
      "Subclass Progression",
      "Granted Features",
      "Choices",
      "Influences",
    ],
  },
  {
    key: "species",
    type: "species",
    category: "template_species",
    en: "Species",
    ru: "Вид",
    fields: [
      "Description",
      "Image",
      "Creature Type",
      "Size Options",
      "Speeds",
      "Senses",
      "Languages",
      "Damage Traits",
      "Condition Immunities",
      "Granted Features",
      "Choices",
      "Influences",
    ],
  },
  {
    key: "background",
    type: "background",
    category: "template_backgrounds",
    en: "Background",
    ru: "Предыстория",
    fields: [
      "Description",
      "Image",
      "Ability Score Options",
      "Origin Feats",
      "Skill Proficiencies",
      "Tool Proficiencies",
      "Languages",
      "Equipment Options",
      "Starting Currency",
      "Granted Features",
      "Choices",
      "Influences",
    ],
  },
  {
    key: "feat_origin",
    type: "feat",
    category: "template_feats",
    en: "Origin Feat",
    ru: "Стартовая черта",
    fields: [
      "Description",
      "Image",
      {
        name: "Feat Category",
        defaultValue: "wsg.ref.value.feat_category.origin",
      },
      "Repeatable",
      "Prerequisites",
      "Ability Score Increases",
      "Granted Features",
      "Choices",
      "Influences",
      "Effects",
    ],
  },
  {
    key: "feat_general",
    type: "feat",
    category: "template_feats",
    en: "General Feat",
    ru: "Общая черта",
    fields: [
      "Description",
      "Image",
      {
        name: "Feat Category",
        defaultValue: "wsg.ref.value.feat_category.general",
      },
      "Repeatable",
      "Prerequisites",
      "Ability Score Increases",
      "Granted Features",
      "Choices",
      "Influences",
      "Effects",
    ],
  },
  {
    key: "feat_fighting_style",
    type: "feat",
    category: "template_feats",
    en: "Fighting Style Feat",
    ru: "Черта боевого стиля",
    fields: [
      "Description",
      "Image",
      {
        name: "Feat Category",
        defaultValue: "wsg.ref.value.feat_category.fighting_style",
      },
      "Repeatable",
      "Prerequisites",
      "Ability Score Increases",
      "Granted Features",
      "Choices",
      "Influences",
      "Effects",
    ],
  },
  {
    key: "feat_epic_boon",
    type: "feat",
    category: "template_feats",
    en: "Epic Boon Feat",
    ru: "Черта эпического дара",
    fields: [
      "Description",
      "Image",
      {
        name: "Feat Category",
        defaultValue: "wsg.ref.value.feat_category.epic_boon",
      },
      "Repeatable",
      "Prerequisites",
      "Ability Score Increases",
      "Granted Features",
      "Choices",
      "Influences",
      "Effects",
    ],
  },
  {
    key: "feature_one_time",
    type: "feature",
    category: "template_features",
    en: "One-Time Feature",
    ru: "Единоразовое умение",
    fields: [
      "Description",
      "Image",
      {
        name: "Feature Behavior",
        defaultValue: "wsg.ref.value.feature_behavior.one_time",
      },
      "Granted at Level",
      "Prerequisites",
      "Damage Components",
      "Healing",
      "Conditions",
      "Choices",
      "Influences",
      "Effects",
    ],
  },
  {
    key: "feature_passive",
    type: "feature",
    category: "template_features",
    en: "Passive Feature",
    ru: "Пассивное умение",
    fields: [
      "Description",
      "Image",
      {
        name: "Feature Behavior",
        defaultValue: "wsg.ref.value.feature_behavior.passive",
      },
      "Granted at Level",
      "Prerequisites",
      "Activation",
      "Trigger",
      "Duration",
      "Targets",
      "Area",
      "Damage Components",
      "Healing",
      "Conditions",
      "Choices",
      "Influences",
      "Effects",
    ],
  },
  {
    key: "feature_active",
    type: "feature",
    category: "template_features",
    en: "Active Feature",
    ru: "Активное умение",
    fields: [
      "Description",
      "Image",
      {
        name: "Feature Behavior",
        defaultValue: "wsg.ref.value.feature_behavior.active",
      },
      "Granted at Level",
      "Prerequisites",
      "Activation",
      "Trigger",
      "Uses",
      "Recovery",
      "Resources",
      "Duration",
      "Targets",
      "Area",
      "Damage Components",
      "Healing",
      "Conditions",
      "Choices",
      "Influences",
      "Effects",
    ],
  },
  {
    key: "weapon",
    type: "item",
    category: "template_item_weapons",
    en: "Weapon",
    ru: "Оружие",
    fields: [
      ...itemCore,
      { name: "Item Type", defaultValue: "wsg.ref.value.item_type.weapon" },
      "Equipment Slot",
      "Weapon Category",
      "Weapon Damage",
      "Versatile Damage",
      "Weapon Properties",
      "Mastery Property",
      "Range and Reach",
    ],
  },
  {
    key: "ammunition",
    type: "item",
    category: "template_item_ammunition",
    en: "Ammunition",
    ru: "Боеприпасы",
    fields: [
      ...itemCore,
      { name: "Item Type", defaultValue: "wsg.ref.value.item_type.ammunition" },
      "Weapon Properties",
      "Range and Reach",
      "Ammunition Container",
      "Original Pack Quantity",
    ],
  },
  {
    key: "armor",
    type: "item",
    category: "template_item_armor",
    en: "Armor",
    ru: "Доспех",
    fields: [
      ...itemCore,
      { name: "Item Type", defaultValue: "wsg.ref.value.item_type.armor" },
      {
        name: "Equipment Slot",
        defaultValue: "wsg.ref.value.equipment_slot.armor",
      },
      "Armor Category",
      "Base AC",
      "Dexterity in AC",
      "Strength Requirement",
      "Stealth Disadvantage",
    ],
  },
  {
    key: "shield",
    type: "item",
    category: "template_item_shields",
    en: "Shield",
    ru: "Щит",
    fields: [
      ...itemCore,
      { name: "Item Type", defaultValue: "wsg.ref.value.item_type.shield" },
      {
        name: "Equipment Slot",
        defaultValue: "wsg.ref.value.equipment_slot.shield",
      },
      "Base AC",
    ],
  },
  {
    key: "boots",
    type: "item",
    category: "template_item_boots",
    en: "Boots",
    ru: "Сапоги",
    fields: [
      ...itemCore,
      { name: "Item Type", defaultValue: "wsg.ref.value.item_type.boots" },
      {
        name: "Equipment Slot",
        defaultValue: "wsg.ref.value.equipment_slot.boots",
      },
    ],
  },
  {
    key: "bracers",
    type: "item",
    category: "template_item_bracers",
    en: "Bracers",
    ru: "Наручи",
    fields: [
      ...itemCore,
      { name: "Item Type", defaultValue: "wsg.ref.value.item_type.bracers" },
      {
        name: "Equipment Slot",
        defaultValue: "wsg.ref.value.equipment_slot.bracers",
      },
    ],
  },
  {
    key: "belt",
    type: "item",
    category: "template_item_belts",
    en: "Belt",
    ru: "Пояс",
    fields: [
      ...itemCore,
      { name: "Item Type", defaultValue: "wsg.ref.value.item_type.belt" },
      {
        name: "Equipment Slot",
        defaultValue: "wsg.ref.value.equipment_slot.belt",
      },
    ],
  },
  {
    key: "cloak",
    type: "item",
    category: "template_item_cloaks",
    en: "Cloak",
    ru: "Плащ",
    fields: [
      ...itemCore,
      { name: "Item Type", defaultValue: "wsg.ref.value.item_type.cloak" },
      {
        name: "Equipment Slot",
        defaultValue: "wsg.ref.value.equipment_slot.cloak",
      },
    ],
  },
  {
    key: "headwear",
    type: "item",
    category: "template_item_headwear",
    en: "Helmet or Hat",
    ru: "Шлем или шляпа",
    fields: [
      ...itemCore,
      { name: "Item Type", defaultValue: "wsg.ref.value.item_type.headwear" },
      {
        name: "Equipment Slot",
        defaultValue: "wsg.ref.value.equipment_slot.head",
      },
    ],
  },
  {
    key: "ring",
    type: "item",
    category: "template_item_rings",
    en: "Ring",
    ru: "Кольцо",
    fields: [
      ...itemCore,
      { name: "Item Type", defaultValue: "wsg.ref.value.item_type.ring" },
      {
        name: "Equipment Slot",
        defaultValue: "wsg.ref.value.equipment_slot.ring",
      },
    ],
  },
  {
    key: "amulet",
    type: "item",
    category: "template_item_treasure",
    en: "Amulet",
    ru: "Амулет",
    fields: [
      ...itemCore,
      { name: "Item Type", defaultValue: "wsg.ref.value.item_type.amulet" },
      {
        name: "Equipment Slot",
        defaultValue: "wsg.ref.value.equipment_slot.neck",
      },
    ],
  },
  {
    key: "tool",
    type: "item",
    category: "template_item_tools",
    en: "Tool",
    ru: "Инструмент",
    fields: [
      ...itemCore,
      { name: "Item Type", defaultValue: "wsg.ref.value.item_type.tool" },
      "Tool Type",
      "Tool Ability",
    ],
  },
  {
    key: "potion",
    type: "item",
    category: "template_item_consumables",
    en: "Potion",
    ru: "Зелье",
    fields: [
      ...itemCore,
      { name: "Item Type", defaultValue: "wsg.ref.value.item_type.potion" },
      { name: "Consumable", defaultValue: true },
    ],
  },
  {
    key: "poison",
    type: "item",
    category: "template_item_consumables",
    en: "Poison",
    ru: "Яд",
    fields: [
      ...itemCore,
      { name: "Item Type", defaultValue: "wsg.ref.value.item_type.poison" },
      { name: "Consumable", defaultValue: true },
      "Poison Type",
    ],
  },
  {
    key: "substance",
    type: "item",
    category: "template_item_consumables",
    en: "Substance",
    ru: "Вещество",
    fields: [
      ...itemCore,
      { name: "Item Type", defaultValue: "wsg.ref.value.item_type.substance" },
      { name: "Consumable", defaultValue: true },
      "Substance Type",
    ],
  },
  {
    key: "equipment_kit",
    type: "item",
    category: "template_item_gear",
    en: "Equipment Kit",
    ru: "Комплект снаряжения",
    fields: [
      ...itemCore,
      {
        name: "Item Type",
        defaultValue: "wsg.ref.value.item_type.equipment_kit",
      },
      "Contents",
    ],
  },
  {
    key: "consumable",
    type: "item",
    category: "template_item_consumables",
    en: "Consumable",
    ru: "Расходуемый предмет",
    fields: [
      ...itemCore,
      { name: "Item Type", defaultValue: "wsg.ref.value.item_type.consumable" },
      "Consumable",
    ],
  },
  {
    key: "container",
    type: "item",
    category: "template_item_containers",
    en: "Container",
    ru: "Контейнер",
    fields: [
      ...itemCore,
      { name: "Item Type", defaultValue: "wsg.ref.value.item_type.container" },
      "Container Capacity",
      "Contents",
    ],
  },
  {
    key: "adventuring_gear",
    type: "item",
    category: "template_item_gear",
    en: "Adventuring Gear",
    ru: "Снаряжение",
    fields: [
      ...itemCore,
      {
        name: "Item Type",
        defaultValue: "wsg.ref.value.item_type.adventuring_gear",
      },
      "Contents",
    ],
  },
  {
    key: "spellcasting_focus",
    type: "item",
    category: "template_item_focuses",
    en: "Spellcasting Focus",
    ru: "Магическая фокусировка",
    fields: [
      ...itemCore,
      {
        name: "Item Type",
        defaultValue: "wsg.ref.value.item_type.spellcasting_focus",
      },
      "Focus Type",
    ],
  },
  {
    key: "material_component",
    type: "item",
    category: "template_item_materials",
    en: "Material Component",
    ru: "Материальный компонент",
    fields: [
      ...itemCore,
      {
        name: "Item Type",
        defaultValue: "wsg.ref.value.item_type.material_component",
      },
      "Spell Material Component",
      "Consumed by Spell",
      "Required Component Cost",
      "Used by Spells",
    ],
  },
  {
    key: "mount_vehicle",
    type: "item",
    category: "template_item_vehicles",
    en: "Mount or Vehicle",
    ru: "Ездовое животное или транспорт",
    fields: [
      ...itemCore,
      {
        name: "Item Type",
        defaultValue: "wsg.ref.value.item_type.mount_vehicle",
      },
      "Mount or Vehicle Type",
      "Creature or Cargo Capacity",
      "Item Speed",
    ],
  },
  {
    key: "treasure",
    type: "item",
    category: "template_item_treasure",
    en: "Treasure",
    ru: "Сокровище",
    fields: [
      ...itemCore,
      { name: "Item Type", defaultValue: "wsg.ref.value.item_type.treasure" },
      "Treasure Type",
    ],
  },
  {
    key: "spell_attack",
    type: "spell",
    category: "template_spells",
    en: "Attack Spell",
    ru: "Атакующее заклинание",
    fields: [
      ...spellCore,
      "Spell Attack",
      "Damage",
      "Applied Conditions",
      "Higher-Level Scaling",
      "Influences",
    ],
  },
  {
    key: "spell_save",
    type: "spell",
    category: "template_spells",
    en: "Saving Throw Spell",
    ru: "Заклинание со спасброском",
    fields: [
      ...spellCore,
      "Saving Throw",
      "Damage",
      "Applied Conditions",
      "Higher-Level Scaling",
      "Influences",
    ],
  },
  {
    key: "spell_healing",
    type: "spell",
    category: "template_spells",
    en: "Healing Spell",
    ru: "Исцеляющее заклинание",
    fields: [...spellCore, "Healing", "Higher-Level Scaling", "Influences"],
  },
  {
    key: "spell_area",
    type: "spell",
    category: "template_spells",
    en: "Area Spell",
    ru: "Заклинание по области",
    fields: [
      ...spellCore,
      "Area",
      "Saving Throw",
      "Damage",
      "Applied Conditions",
      "Higher-Level Scaling",
      "Influences",
    ],
  },
  {
    key: "spell_periodic",
    type: "spell",
    category: "template_spells",
    en: "Periodic Area Spell",
    ru: "Периодическое заклинание по области",
    fields: [
      ...spellCore,
      "Area",
      "Saving Throw",
      "Periodic Damage",
      "Applied Conditions",
      "Higher-Level Scaling",
      "Resources",
      "Influences",
    ],
  },
  {
    key: "spell_utility",
    type: "spell",
    category: "template_spells",
    en: "Utility Spell",
    ru: "Вспомогательное заклинание",
    fields: [
      ...spellCore,
      "Targets",
      "Area",
      "Granted Features",
      "Resources",
      "Influences",
    ],
  },
];

function buildTemplates(references: ReferenceRecord[]): EntityTemplate[] {
  const parameters = references.filter(
    (reference) => reference.kind === "parameter",
  );
  return templateSpecs.map((spec) => {
    const completeFields = spec.fields.some(
      (entry) => (typeof entry === "string" ? entry : entry.name) === "Effects",
    )
      ? spec.fields
      : [...spec.fields, "Effects"];
    return {
      id: `wsg.temp.${spec.key}`,
      type: spec.type,
      categoryId: categoryId(spec.category),
      name: text(spec.en, spec.ru),
      previousIds: [],
      fields: completeFields
        .filter(
          (entry) =>
            (typeof entry === "string" ? entry : entry.name) !== "Influences",
        )
        .filter((entry, index, all) => {
          const name = typeof entry === "string" ? entry : entry.name;
          return (
            all.findIndex(
              (candidate) =>
                (typeof candidate === "string" ? candidate : candidate.name) ===
                name,
            ) === index
          );
        })
        .map((entry, order) => {
          const fieldSpec = typeof entry === "string" ? { name: entry } : entry;
          const resolvedName =
            fieldSpec.name === "Effects"
              ? "Rules and Automation"
              : fieldSpec.name;
          const parameter = parameters.find(
            (candidate) => candidate.name.en === resolvedName,
          );
          if (!parameter)
            throw new Error(`Missing template parameter: ${fieldSpec.name}`);
          return {
            id: `wsg.temp.${spec.key}.field_${order + 1}`,
            referenceId: parameter.id,
            required: fieldSpec.required ?? Boolean(parameter.required),
            multiple: fieldSpec.multiple ?? Boolean(parameter.multiple),
            order,
            defaultValue: fieldSpec.defaultValue,
          };
        }),
    };
  });
}

export function buildCoreRulesCatalog() {
  const values = valueGroups.map(([group, key, en, ru, category]) =>
    option(group, key, en, ru, category),
  );
  const source = [
    advancement,
    carrying,
    pointBuy,
    ...commonParameters,
    ...templateParameters,
    ...values,
    ...skillRows,
  ];
  const merged = new Map<string, ReferenceRecord>();
  for (const reference of source) {
    const identity =
      reference.kind === "parameter"
        ? `parameter:${reference.name.en.trim().toLowerCase()}`
        : `${reference.kind}:${reference.optionGroup ?? ""}:${reference.key}`;
    const existing = merged.get(identity);
    if (!existing) {
      merged.set(identity, reference);
      continue;
    }
    existing.allowedEntityTypes = [
      ...new Set([
        ...(existing.allowedEntityTypes ?? []),
        ...(reference.allowedEntityTypes ?? []),
      ]),
    ];
    existing.multiple ||= reference.multiple;
    existing.required ||= reference.required;
  }
  const references = [...merged.values()];
  return {
    atomics: structuredClone(coreAtomics),
    references: structuredClone(references),
    templates: structuredClone(buildTemplates(references)),
  };
}

export const CORE_ENTITY_TYPES = entityTypes;
