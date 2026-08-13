export type RuleLocale = "en" | "ru" | "sv";
export type RuleText = { en: string; ru?: string; sv?: string };

export type RuleEvent =
  | "always"
  | "character_created"
  | "level_gained"
  | "entity_granted"
  | "equipped"
  | "unequipped"
  | "activated"
  | "attack_started"
  | "attack_hit"
  | "attack_missed"
  | "damage_dealt"
  | "damage_received"
  | "save_succeeded"
  | "save_failed"
  | "turn_started"
  | "turn_ended"
  | "round_started"
  | "round_ended"
  | "area_created"
  | "area_entered"
  | "area_moved_within"
  | "area_turn_started"
  | "area_turn_ended"
  | "area_exited"
  | "short_rest_completed"
  | "long_rest_completed"
  | "resource_spent"
  | "resource_restored"
  | "hit_points_zero"
  | "concentration_ended";

export type RuleTarget =
  | "self"
  | "source"
  | "attacker"
  | "defender"
  | "attack_target"
  | "selected_target"
  | "area_targets"
  | "area_allies"
  | "area_enemies"
  | "equipped_item"
  | "source_resource";

export type ValueKind =
  | "number"
  | "atomic"
  | "ability_score"
  | "ability_modifier"
  | "proficiency_bonus"
  | "character_level"
  | "class_level"
  | "die_roll"
  | "die_average"
  | "die_maximum"
  | "table_lookup"
  | "count"
  | "operation";

export type ValueOperation =
  | "sum"
  | "subtract"
  | "multiply"
  | "divide"
  | "minimum"
  | "maximum"
  | "clamp";
export type RoundingMode = "none" | "down" | "up" | "nearest";

export interface ValueExpression {
  kind: ValueKind;
  number?: number;
  atomicId?: string;
  ability?:
    | "strength"
    | "dexterity"
    | "constitution"
    | "intelligence"
    | "wisdom"
    | "charisma";
  classSelector?: "source_class" | "base_class" | "all_caster_classes" | string;
  dieId?: string;
  diceCount?: number;
  tableId?: string;
  tableKey?: string;
  countOf?:
    | "character_levels"
    | "class_levels"
    | "targets"
    | "entities"
    | "conditions";
  operation?: ValueOperation;
  operands?: ValueExpression[];
  rounding?: RoundingMode;
}

export type PredicateOperator =
  | "equals"
  | "not_equals"
  | "greater_than"
  | "at_least"
  | "less_than"
  | "at_most"
  | "contains"
  | "not_contains";

export interface RulePredicate {
  id: string;
  left: ValueExpression;
  operator: PredicateOperator;
  right: ValueExpression;
}

export interface ConditionGroup {
  mode: "all" | "any" | "none";
  predicates: RulePredicate[];
}

export type RuleActionType =
  | "add"
  | "subtract"
  | "multiply"
  | "set"
  | "set_minimum"
  | "set_maximum"
  | "replace_calculation"
  | "deal_damage"
  | "heal"
  | "temporary_hit_points"
  | "grant_condition"
  | "remove_condition"
  | "grant_condition_immunity"
  | "grant_resistance"
  | "grant_vulnerability"
  | "grant_damage_immunity"
  | "remove_damage_trait"
  | "grant_advantage"
  | "grant_disadvantage"
  | "remove_roll_modifier"
  | "grant_proficiency"
  | "upgrade_proficiency"
  | "remove_proficiency"
  | "grant_sense"
  | "remove_sense"
  | "spend_resource"
  | "restore_resource"
  | "change_resource_maximum"
  | "make_attack_roll"
  | "make_saving_throw"
  | "make_ability_check"
  | "roll_dice"
  | "reroll_die"
  | "replace_roll"
  | "add_die_to_roll"
  | "create_area"
  | "move_target"
  | "grant_entity"
  | "start_concentration"
  | "end_concentration";

export interface RuleAction {
  id: string;
  type: RuleActionType;
  target: RuleTarget;
  atomicId?: string;
  value?: ValueExpression;
  damageTypeId?: string;
  conditionId?: string;
  proficiencyId?: string;
  senseTypeId?: string;
  entityId?: string;
  resourceKey?: string;
  ability?:
    | "strength"
    | "dexterity"
    | "constitution"
    | "intelligence"
    | "wisdom"
    | "charisma";
  skillId?: string;
  difficulty?: ValueExpression;
  area?: AreaDefinition;
  saveOutcome?: "full" | "half" | "none";
  /** Required execution details for a manually selected creature or object. */
  targetCount?: number;
  rangeFeet?: number;
  requiresLineOfSight?: boolean;
}

export interface RoundDuration {
  type:
    | "instant"
    | "rounds"
    | "until_turn_start"
    | "until_turn_end"
    | "while_in_area"
    | "until_rest"
    | "permanent";
  rounds: number;
  concentration: boolean;
  expiration:
    | "automatic"
    | "source_removed"
    | "condition_ended"
    | "area_exited"
    | "short_rest"
    | "long_rest";
}

export interface AutomationRule {
  id: string;
  name: RuleText;
  enabled: boolean;
  event: RuleEvent;
  frequency:
    | "every_time"
    | "once_per_turn"
    | "once_per_round"
    | "once_per_target"
    | "once";
  conditions: ConditionGroup;
  actions: RuleAction[];
  duration: RoundDuration;
  priority: number;
  stacking: "sum" | "highest" | "lowest" | "replace" | "unique_source";
}

export interface RuleSet {
  version: 1;
  rules: AutomationRule[];
}

export interface HitPointProgression {
  firstLevel: { mode: "maximum_hit_die"; addConstitutionModifier: true };
  laterLevels: {
    allowedModes: Array<"roll" | "average" | "manual">;
    defaultMode: "roll" | "average" | "manual";
    averageRounding: "up";
    manualMinimum: 1;
    manualMaximumSource: "hit_die";
    preserveResultPerClassLevel: true;
  };
  constitution: {
    appliesPerCharacterLevel: true;
    recalculatesRetroactively: true;
  };
  bonusRules: RuleSet;
}

export interface ResourceDefinition {
  key: string;
  name: RuleText;
  maximum: ValueExpression;
  initial: "maximum" | "zero" | "manual";
  minimum: number;
  recovery: Array<{
    event:
      | "short_rest"
      | "long_rest"
      | "turn_start"
      | "round_start"
      | "initiative"
      | "dawn"
      | "manual";
    amount: "all" | ValueExpression;
  }>;
}

export interface AreaDefinition {
  shape:
    | "none"
    | "sphere"
    | "cylinder"
    | "cone"
    | "cube"
    | "line"
    | "wall"
    | "circle"
    | "custom";
  anchor: "point" | "caster" | "target" | "moving_target";
  radiusFeet: number;
  lengthFeet: number;
  widthFeet: number;
  heightFeet: number;
  targetFilter: "all" | "allies" | "enemies" | "creatures" | "objects";
  movement: "fixed" | "moves_with_source" | "moves_with_target";
}

export interface DamageComponent {
  id: string;
  dice: ValueExpression;
  damageTypeId: string;
  saveOutcome: "full" | "half" | "none";
  periodic: boolean;
  trigger: RuleEvent;
  intervalRounds: number;
  durationRounds: number;
  frequency: "once_per_turn" | "once_per_round" | "every_time";
}

export interface ChoiceDefinition {
  id: string;
  name: RuleText;
  minimum: number;
  maximum: number;
  source: "prepared_options" | "entities" | "references" | "numbers";
  entityTypes: string[];
  optionGroup: string;
  optionIds: string[];
  emptySlotAllowsPlayerChoice: boolean;
}

export interface RuleCatalogEntry<T extends string = string> {
  id: T;
  name: RuleText;
  description?: RuleText;
}

export interface RuleEngineDefinition {
  version: 1;
  roundSeconds: 6;
  gridUnitFeet: 2.5;
  events: RuleCatalogEntry<RuleEvent>[];
  targets: RuleCatalogEntry<RuleTarget>[];
  actions: RuleCatalogEntry<RuleActionType>[];
  valueKinds: RuleCatalogEntry<ValueKind>[];
  pipelines: Array<{ id: string; name: RuleText; steps: string[] }>;
  coreRules: Array<{
    id: string;
    name: RuleText;
    description: RuleText;
    locked: true;
  }>;
}

const tr = (en: string, ru: string, sv = en): RuleText => ({ en, ru, sv });
const entry = <T extends string>(
  id: T,
  en: string,
  ru: string,
): RuleCatalogEntry<T> => ({ id, name: tr(en, ru) });

export const RULE_EVENTS: RuleCatalogEntry<RuleEvent>[] = [
  entry("always", "Always", "Постоянно"),
  entry("character_created", "Character created", "Персонаж создан"),
  entry("level_gained", "Level gained", "Получен уровень"),
  entry("entity_granted", "Entity granted", "Сущность получена"),
  entry("equipped", "Item equipped", "Предмет экипирован"),
  entry("unequipped", "Item unequipped", "Предмет снят"),
  entry("activated", "Activated", "Активировано"),
  entry("attack_started", "Attack started", "Атака начата"),
  entry("attack_hit", "Attack hit", "Атака попала"),
  entry("attack_missed", "Attack missed", "Атака промахнулась"),
  entry("damage_dealt", "Damage dealt", "Урон нанесён"),
  entry("damage_received", "Damage received", "Урон получен"),
  entry("save_succeeded", "Saving throw succeeded", "Спасбросок успешен"),
  entry("save_failed", "Saving throw failed", "Спасбросок провален"),
  entry("turn_started", "Turn started", "Ход начался"),
  entry("turn_ended", "Turn ended", "Ход закончился"),
  entry("round_started", "Round started", "Раунд начался"),
  entry("round_ended", "Round ended", "Раунд закончился"),
  entry("area_created", "Area created", "Область создана"),
  entry("area_entered", "Entered area", "Вход в область"),
  entry("area_moved_within", "Moved inside area", "Движение внутри области"),
  entry("area_turn_started", "Turn started in area", "Ход начат в области"),
  entry("area_turn_ended", "Turn ended in area", "Ход закончен в области"),
  entry("area_exited", "Exited area", "Выход из области"),
  entry(
    "short_rest_completed",
    "Short rest completed",
    "Короткий отдых завершён",
  ),
  entry("long_rest_completed", "Long rest completed", "Долгий отдых завершён"),
  entry("resource_spent", "Resource spent", "Ресурс потрачен"),
  entry("resource_restored", "Resource restored", "Ресурс восстановлен"),
  entry("hit_points_zero", "Hit Points reached zero", "ОЗ опустились до нуля"),
  entry("concentration_ended", "Concentration ended", "Концентрация завершена"),
];

export const RULE_TARGETS: RuleCatalogEntry<RuleTarget>[] = [
  entry("self", "Self", "Сам персонаж"),
  entry("source", "Rule source", "Источник правила"),
  entry("attacker", "Attacker", "Атакующий"),
  entry("defender", "Defender", "Защищающийся"),
  entry("attack_target", "Attack target", "Цель атаки"),
  entry("selected_target", "Selected target", "Выбранная цель"),
  entry("area_targets", "All targets in area", "Все цели в области"),
  entry("area_allies", "Allies in area", "Союзники в области"),
  entry("area_enemies", "Enemies in area", "Противники в области"),
  entry("equipped_item", "Equipped item", "Экипированный предмет"),
  entry("source_resource", "Source resource", "Ресурс источника"),
];

export const RULE_ACTIONS: RuleCatalogEntry<RuleActionType>[] = [
  entry("add", "Add value", "Добавить значение"),
  entry("subtract", "Subtract value", "Вычесть значение"),
  entry("multiply", "Multiply value", "Умножить значение"),
  entry("set", "Set value", "Установить значение"),
  entry("set_minimum", "Set minimum", "Установить минимум"),
  entry("set_maximum", "Set maximum", "Установить максимум"),
  entry("replace_calculation", "Replace calculation", "Заменить расчёт"),
  entry("deal_damage", "Deal damage", "Нанести урон"),
  entry("heal", "Restore Hit Points", "Восстановить ОЗ"),
  entry(
    "temporary_hit_points",
    "Grant temporary Hit Points",
    "Выдать временные ОЗ",
  ),
  entry("grant_condition", "Apply condition", "Наложить состояние"),
  entry("remove_condition", "Remove condition", "Снять состояние"),
  entry(
    "grant_condition_immunity",
    "Grant condition immunity",
    "Выдать иммунитет к состоянию",
  ),
  entry("grant_resistance", "Grant resistance", "Выдать сопротивление"),
  entry("grant_vulnerability", "Grant vulnerability", "Выдать уязвимость"),
  entry(
    "grant_damage_immunity",
    "Grant damage immunity",
    "Выдать иммунитет к урону",
  ),
  entry(
    "remove_damage_trait",
    "Remove damage trait",
    "Убрать отношение к урону",
  ),
  entry("grant_advantage", "Grant advantage", "Дать преимущество"),
  entry("grant_disadvantage", "Grant disadvantage", "Дать помеху"),
  entry(
    "remove_roll_modifier",
    "Remove roll modifier",
    "Убрать модификатор броска",
  ),
  entry("grant_proficiency", "Grant proficiency", "Выдать владение"),
  entry(
    "upgrade_proficiency",
    "Upgrade to expertise",
    "Повысить до экспертности",
  ),
  entry("remove_proficiency", "Remove proficiency", "Убрать владение"),
  entry("grant_sense", "Grant sense", "Выдать чувство"),
  entry("remove_sense", "Remove sense", "Убрать чувство"),
  entry("spend_resource", "Spend resource", "Потратить ресурс"),
  entry("restore_resource", "Restore resource", "Восстановить ресурс"),
  entry(
    "change_resource_maximum",
    "Change resource maximum",
    "Изменить максимум ресурса",
  ),
  entry("make_attack_roll", "Make an attack roll", "Выполнить бросок атаки"),
  entry("make_saving_throw", "Request a saving throw", "Запросить спасбросок"),
  entry(
    "make_ability_check",
    "Request an ability check",
    "Запросить проверку характеристики",
  ),
  entry("roll_dice", "Roll dice", "Бросить кости"),
  entry("reroll_die", "Reroll die", "Перебросить кость"),
  entry("replace_roll", "Replace roll", "Заменить результат"),
  entry("add_die_to_roll", "Add die to roll", "Добавить кость к броску"),
  entry("create_area", "Create area", "Создать область"),
  entry("move_target", "Move target", "Переместить цель"),
  entry("grant_entity", "Grant entity", "Выдать сущность"),
  entry("start_concentration", "Start concentration", "Начать концентрацию"),
  entry("end_concentration", "End concentration", "Завершить концентрацию"),
];

export const VALUE_KINDS: RuleCatalogEntry<ValueKind>[] = [
  entry("number", "Number", "Число"),
  entry("atomic", "Game value", "Игровое значение"),
  entry("ability_score", "Ability score", "Значение характеристики"),
  entry("ability_modifier", "Ability modifier", "Модификатор характеристики"),
  entry("proficiency_bonus", "Proficiency Bonus", "Бонус мастерства"),
  entry("character_level", "Character level", "Общий уровень"),
  entry("class_level", "Class level", "Уровень класса"),
  entry("die_roll", "Roll dice", "Бросок костей"),
  entry("die_average", "Die average", "Среднее кости"),
  entry("die_maximum", "Die maximum", "Максимум кости"),
  entry("table_lookup", "Value from table", "Значение из таблицы"),
  entry("count", "Count records", "Количество записей"),
  entry("operation", "Calculation block", "Блок расчёта"),
];

export const DEFAULT_RULE_ENGINE: RuleEngineDefinition = {
  version: 1,
  roundSeconds: 6,
  gridUnitFeet: 2.5,
  events: RULE_EVENTS,
  targets: RULE_TARGETS,
  actions: RULE_ACTIONS,
  valueKinds: VALUE_KINDS,
  pipelines: [
    {
      id: "hit_points",
      name: tr("Maximum Hit Points", "Максимальные ОЗ"),
      steps: [
        "first_level_hit_die_maximum",
        "saved_later_level_results",
        "constitution_per_character_level",
        "entity_bonuses",
        "minimum_and_maximum",
        "rounding",
      ],
    },
    {
      id: "damage",
      name: tr("Damage resolution", "Обработка урона"),
      steps: [
        "select_targets",
        "attack_or_save",
        "roll_components",
        "save_outcome",
        "source_modifiers",
        "immunity",
        "resistance_or_vulnerability",
        "temporary_hit_points",
        "current_hit_points",
        "concentration_check",
        "zero_hit_points_events",
      ],
    },
    {
      id: "area",
      name: tr("Area resolution", "Обработка области"),
      steps: [
        "resolve_geometry_on_2_5_ft_grid",
        "resolve_target_filter",
        "detect_enter_move_start_end_exit",
        "apply_per_target_frequency",
        "perform_checks",
        "apply_actions",
        "decrease_round_duration",
        "remove_expired_area",
      ],
    },
    {
      id: "d20",
      name: tr("D20 Test", "Проверка d20"),
      steps: [
        "collect_advantage_and_disadvantage",
        "cancel_opposites",
        "roll_d20",
        "apply_proficiency",
        "apply_ability",
        "apply_exhaustion",
        "apply_other_modifiers",
        "compare_dc",
      ],
    },
    {
      id: "rest",
      name: tr("Rest and recovery", "Отдых и восстановление"),
      steps: [
        "emit_rest_event",
        "restore_matching_resources",
        "remove_expiring_conditions",
        "restore_hit_dice_when_applicable",
        "recalculate_derived_values",
      ],
    },
  ],
  coreRules: [
    {
      id: "round",
      name: tr("Combat round", "Боевой раунд"),
      description: tr(
        "All durations are stored in rounds. One round equals 6 seconds for VTT presentation only.",
        "Все длительности хранятся в раундах. Один раунд равен 6 секундам только для отображения в VTT.",
      ),
      locked: true,
    },
    {
      id: "level",
      name: tr("Level from experience", "Уровень по опыту"),
      description: tr(
        "Total level is determined only by the Character Advancement table.",
        "Общий уровень определяется только таблицей развития персонажа.",
      ),
      locked: true,
    },
    {
      id: "ability_modifier",
      name: tr("Ability modifier", "Модификатор характеристики"),
      description: tr(
        "Round down (score - 10) / 2.",
        "Округлить вниз (значение - 10) / 2.",
      ),
      locked: true,
    },
    {
      id: "proficiency_bonus",
      name: tr("Proficiency Bonus", "Бонус мастерства"),
      description: tr(
        "Resolved from total level by the advancement table.",
        "Определяется общим уровнем по таблице развития.",
      ),
      locked: true,
    },
    {
      id: "hp_progression",
      name: tr("Hit Point progression", "Прогрессия ОЗ"),
      description: tr(
        "First level uses maximum Hit Die. Later levels use a saved roll, rounded-up average, or manual value within the Hit Die. Constitution recalculates retroactively for every character level.",
        "Первый уровень использует максимум кости хитов. Последующие уровни используют сохранённый бросок, среднее с округлением вверх или ручное значение в пределах кости. Телосложение пересчитывается за каждый общий уровень.",
      ),
      locked: true,
    },
    {
      id: "area_frequency",
      name: tr("Area frequency", "Частота области"),
      description: tr(
        "Movement across multiple cells never repeats an effect beyond its per-turn or per-round limit.",
        "Движение через несколько клеток не повторяет эффект чаще установленного ограничения за ход или раунд.",
      ),
      locked: true,
    },
    {
      id: "advantage",
      name: tr("Advantage and disadvantage", "Преимущество и помеха"),
      description: tr(
        "Multiple sources do not stack; any advantage and any disadvantage cancel each other.",
        "Несколько источников не складываются; любое преимущество и любая помеха взаимно отменяются.",
      ),
      locked: true,
    },
    {
      id: "damage_traits",
      name: tr("Damage traits", "Отношение к урону"),
      description: tr(
        "Immunity is resolved first; otherwise resistance and vulnerability are applied to each damage component by type.",
        "Сначала применяется иммунитет; затем сопротивление или уязвимость отдельно к каждому компоненту урона.",
      ),
      locked: true,
    },
    {
      id: "multiclass",
      name: tr("Multiclass levels", "Уровни мультикласса"),
      description: tr(
        "Each class keeps its own level; total level is their sum. Spell-slot contribution is calculated by the selected caster progression.",
        "Каждый класс хранит собственный уровень; общий уровень равен их сумме. Вклад в ячейки рассчитывается выбранной прогрессией заклинателя.",
      ),
      locked: true,
    },
  ],
};

export const emptyExpression = (): ValueExpression => ({
  kind: "number",
  number: 0,
  rounding: "none",
});
export const emptyConditions = (): ConditionGroup => ({
  mode: "all",
  predicates: [],
});
export const emptyDuration = (): RoundDuration => ({
  type: "instant",
  rounds: 0,
  concentration: false,
  expiration: "automatic",
});
export const emptyRule = (index = 1): AutomationRule => ({
  id: `rule_${index}`,
  name: tr(`Rule ${index}`, `Правило ${index}`),
  enabled: true,
  event: "always",
  frequency: "every_time",
  conditions: emptyConditions(),
  actions: [],
  duration: emptyDuration(),
  priority: 100,
  stacking: "unique_source",
});
export const emptyRuleSet = (): RuleSet => ({ version: 1, rules: [] });
export const emptyHitPointProgression = (): HitPointProgression => ({
  firstLevel: { mode: "maximum_hit_die", addConstitutionModifier: true },
  laterLevels: {
    allowedModes: ["roll", "average", "manual"],
    defaultMode: "average",
    averageRounding: "up",
    manualMinimum: 1,
    manualMaximumSource: "hit_die",
    preserveResultPerClassLevel: true,
  },
  constitution: {
    appliesPerCharacterLevel: true,
    recalculatesRetroactively: true,
  },
  bonusRules: emptyRuleSet(),
});
export const emptyResource = (): ResourceDefinition => ({
  key: "uses",
  name: tr("Uses", "Использования"),
  maximum: { kind: "number", number: 1 },
  initial: "maximum",
  minimum: 0,
  recovery: [],
});
export const emptyArea = (): AreaDefinition => ({
  shape: "none",
  anchor: "point",
  radiusFeet: 0,
  lengthFeet: 0,
  widthFeet: 0,
  heightFeet: 0,
  targetFilter: "creatures",
  movement: "fixed",
});
export const emptyDamage = (index = 1): DamageComponent => ({
  id: `damage_${index}`,
  dice: { kind: "die_roll", dieId: "wsg.atomic.d6", diceCount: 1 },
  damageTypeId: "",
  saveOutcome: "full",
  periodic: false,
  trigger: "damage_dealt",
  intervalRounds: 1,
  durationRounds: 0,
  frequency: "once_per_turn",
});
export const emptyChoice = (index = 1): ChoiceDefinition => ({
  id: `choice_${index}`,
  name: tr(`Choice ${index}`, `Выбор ${index}`),
  minimum: 1,
  maximum: 1,
  source: "prepared_options",
  entityTypes: [],
  optionGroup: "",
  optionIds: [],
  emptySlotAllowsPlayerChoice: true,
});
