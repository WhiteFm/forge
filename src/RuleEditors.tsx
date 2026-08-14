import type { ForgeProject, GuidedField, Locale, LocalText } from "./model";
import { localized } from "./model";
import {
  RULE_ACTIONS,
  RULE_EVENTS,
  RULE_TARGETS,
  VALUE_KINDS,
  emptyArea,
  emptyChoice,
  emptyConditions,
  emptyDamage,
  emptyDuration,
  emptyExpression,
  emptyHitPointProgression,
  emptyResource,
  emptyRule,
  emptyRuleSet,
  type AreaDefinition,
  type AutomationRule,
  type ChoiceDefinition,
  type ConditionGroup,
  type DamageComponent,
  type HitPointProgression,
  type ResourceDefinition,
  type RoundDuration,
  type RuleAction,
  type RuleActionType,
  type RuleEvent,
  type RuleSet,
  type RuleTarget,
  type ValueExpression,
  type ValueKind,
} from "./rule-system";

type Props<T> = {
  label: string;
  value: T | undefined;
  project: ForgeProject;
  locale: Locale;
  onChange: (value: T) => void;
};
const text = (locale: Locale, en: string, ru: string, sv = en) =>
  locale === "ru" ? ru : locale === "sv" ? sv : en;
const optionText = (
  name: { en: string; ru?: string; sv?: string },
  locale: Locale,
) => name[locale]?.trim() || name.en;

function Field({
  label,
  children,
  wide = false,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <label className={`field${wide ? " rule-wide" : ""}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}
function NumberInput({
  value,
  onChange,
  min,
  max,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  );
}
function Select({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      {children}
    </select>
  );
}
function Toggle({
  checked,
  onChange,
  yes,
  no,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  yes: string;
  no: string;
}) {
  return (
    <button
      type="button"
      className={`compact-toggle ${checked ? "active" : ""}`}
      onClick={() => onChange(!checked)}
    >
      {checked ? yes : no}
    </button>
  );
}

const abilities = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
] as const;

type RulePresetId =
  | "passive_bonus"
  | "equipped_bonus"
  | "active_damage"
  | "active_healing"
  | "active_healing_charge"
  | "save_damage"
  | "area_enter_damage"
  | "area_turn_damage"
  | "temporary_condition"
  | "rest_recovery";

const rulePresets: Array<{ id: RulePresetId; name: LocalText }> = [
  {
    id: "passive_bonus",
    name: {
      en: "Permanent bonus",
      ru: "Постоянный бонус",
      sv: "Permanent bonus",
    },
  },
  {
    id: "equipped_bonus",
    name: {
      en: "Bonus while equipped",
      ru: "Бонус от экипированного предмета",
      sv: "Bonus medan utrustad",
    },
  },
  {
    id: "active_damage",
    name: {
      en: "Activated damage",
      ru: "Активируемый урон",
      sv: "Aktiverad skada",
    },
  },
  {
    id: "active_healing",
    name: {
      en: "Activated healing",
      ru: "Активируемое лечение",
      sv: "Aktiverad läkning",
    },
  },
  {
    id: "active_healing_charge",
    name: {
      en: "Healing that spends a charge",
      ru: "Исцеление с расходом заряда",
      sv: "Läkning som förbrukar en laddning",
    },
  },
  {
    id: "save_damage",
    name: {
      en: "Saving throw and damage",
      ru: "Спасбросок и урон",
      sv: "Räddningsslag och skada",
    },
  },
  {
    id: "area_enter_damage",
    name: {
      en: "Damage when entering an area",
      ru: "Урон при входе в область",
      sv: "Skada vid inträde i område",
    },
  },
  {
    id: "area_turn_damage",
    name: {
      en: "Damage at turn start in an area",
      ru: "Урон в начале хода в области",
      sv: "Skada vid turstart i område",
    },
  },
  {
    id: "temporary_condition",
    name: {
      en: "Temporary condition",
      ru: "Временное состояние",
      sv: "Tillfälligt tillstånd",
    },
  },
  {
    id: "rest_recovery",
    name: {
      en: "Recover a resource after rest",
      ru: "Восстановление ресурса после отдыха",
      sv: "Återställ resurs efter vila",
    },
  },
];

function presetRule(id: RulePresetId, index: number): AutomationRule[] {
  const rule = emptyRule(index);
  const die = {
    kind: "die_roll" as const,
    dieId: "wsg.atomic.d6",
    diceCount: 1,
    rounding: "none" as const,
  };
  const number = {
    kind: "number" as const,
    number: 1,
    rounding: "none" as const,
  };
  const action = (
    type: RuleActionType,
    target: RuleTarget,
    value?: ValueExpression,
  ): RuleAction => ({
    id: `action_${index}_1`,
    type,
    target,
    value,
    ...(target === "selected_target"
      ? { targetCount: 1, rangeFeet: 5, requiresLineOfSight: true }
      : {}),
  });
  if (id === "passive_bonus")
    return [
      {
        ...rule,
        name: {
          en: "Permanent bonus",
          ru: "Постоянный бонус",
          sv: "Permanent bonus",
        },
        event: "always",
        actions: [action("add", "self", number)],
        duration: {
          ...emptyDuration(),
          type: "permanent",
          expiration: "source_removed",
        },
      },
    ];
  if (id === "equipped_bonus")
    return [
      {
        ...rule,
        name: {
          en: "Equipped bonus",
          ru: "Бонус при экипировке",
          sv: "Utrustningsbonus",
        },
        event: "equipped",
        actions: [action("add", "self", number)],
        duration: {
          ...emptyDuration(),
          type: "permanent",
          expiration: "source_removed",
        },
      },
    ];
  if (id === "active_damage")
    return [
      {
        ...rule,
        name: {
          en: "Activated damage",
          ru: "Активируемый урон",
          sv: "Aktiverad skada",
        },
        event: "activated",
        frequency: "once_per_target",
        actions: [action("deal_damage", "selected_target", die)],
      },
    ];
  if (id === "active_healing")
    return [
      {
        ...rule,
        name: {
          en: "Activated healing",
          ru: "Активируемое лечение",
          sv: "Aktiverad läkning",
        },
        event: "activated",
        frequency: "once_per_target",
        actions: [action("heal", "selected_target", die)],
      },
    ];
  if (id === "active_healing_charge")
    return [
      {
        ...rule,
        name: {
          en: "Spend one charge and heal",
          ru: "Потратить заряд и исцелить",
          sv: "Förbruka en laddning och läk",
        },
        event: "activated",
        frequency: "once_per_target",
        actions: [
          {
            ...action("spend_resource", "source_resource", number),
            resourceKey: "charges",
          },
          action("heal", "selected_target", die),
        ],
      },
    ];
  if (id === "area_enter_damage")
    return [
      {
        ...rule,
        name: {
          en: "Entered the area",
          ru: "Вход в область",
          sv: "Gick in i området",
        },
        event: "area_entered",
        frequency: "once_per_target",
        actions: [action("deal_damage", "area_targets", die)],
        duration: {
          ...emptyDuration(),
          type: "while_in_area",
          expiration: "area_exited",
        },
      },
    ];
  if (id === "area_turn_damage")
    return [
      {
        ...rule,
        name: {
          en: "Turn started in the area",
          ru: "Начало хода в области",
          sv: "Tur startade i området",
        },
        event: "area_turn_started",
        frequency: "once_per_turn",
        actions: [action("deal_damage", "area_targets", die)],
        duration: {
          ...emptyDuration(),
          type: "while_in_area",
          expiration: "area_exited",
        },
      },
    ];
  if (id === "temporary_condition")
    return [
      {
        ...rule,
        name: {
          en: "Apply condition",
          ru: "Наложить состояние",
          sv: "Tillämpa tillstånd",
        },
        event: "activated",
        frequency: "once_per_target",
        actions: [action("grant_condition", "selected_target")],
        duration: { ...emptyDuration(), type: "rounds", rounds: 1 },
      },
    ];
  if (id === "rest_recovery")
    return [
      {
        ...rule,
        name: {
          en: "Recover after a long rest",
          ru: "Восстановить после долгого отдыха",
          sv: "Återställ efter lång vila",
        },
        event: "long_rest_completed",
        frequency: "once",
        actions: [
          {
            ...action("restore_resource", "source_resource", number),
            resourceKey: "uses",
          },
        ],
      },
    ];
  return [
    {
      ...rule,
      id: `rule_${index}`,
      name: {
        en: "Request saving throw",
        ru: "Запросить спасбросок",
        sv: "Begär räddningsslag",
      },
      event: "activated",
      frequency: "once_per_target",
      actions: [
        {
          ...action("make_saving_throw", "selected_target"),
          ability: "dexterity",
          difficulty: { kind: "number", number: 10 },
        },
      ],
    },
    {
      ...emptyRule(index + 1),
      id: `rule_${index + 1}`,
      name: {
        en: "Damage on a failed save",
        ru: "Урон при провале спасброска",
        sv: "Skada vid misslyckat räddningsslag",
      },
      event: "save_failed",
      frequency: "once_per_target",
      actions: [action("deal_damage", "selected_target", die)],
    },
    {
      ...emptyRule(index + 2),
      id: `rule_${index + 2}`,
      name: {
        en: "Damage on a successful save",
        ru: "Урон при успешном спасброске",
        sv: "Skada vid lyckat räddningsslag",
      },
      event: "save_succeeded",
      frequency: "once_per_target",
      actions: [
        {
          ...action("deal_damage", "selected_target", die),
          saveOutcome: "half",
        },
      ],
    },
  ];
}

export function ValueExpressionEditor({
  value,
  project,
  locale,
  onChange,
}: Omit<Props<ValueExpression>, "label">) {
  const expression = value ?? emptyExpression();
  const setKind = (kind: ValueKind) =>
    onChange(
      kind === "operation"
        ? {
            kind,
            operation: "sum",
            operands: [emptyExpression(), emptyExpression()],
            rounding: "none",
          }
        : kind === "die_roll"
          ? { kind, dieId: "wsg.atomic.d6", diceCount: 1, rounding: "none" }
          : {
              kind,
              number: kind === "number" ? 0 : undefined,
              rounding: "none",
            },
    );
  const dice = project.atomics.filter((item) => item.dataType === "die");
  const tables = project.references.filter(
    (item) => item.kind === "parameter" && item.propertyType === "table",
  );
  return (
    <div className="expression-editor">
      <Field
        label={text(locale, "Value source", "Источник значения", "Värdekälla")}
      >
        <Select
          value={expression.kind}
          onChange={(kind) => setKind(kind as ValueKind)}
        >
          {VALUE_KINDS.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {optionText(entry.name, locale)}
            </option>
          ))}
        </Select>
      </Field>
      {expression.kind === "number" && (
        <Field label={text(locale, "Number", "Число", "Tal")}>
          <NumberInput
            value={expression.number ?? 0}
            onChange={(number) => onChange({ ...expression, number })}
          />
        </Field>
      )}
      {expression.kind === "atomic" && (
        <Field
          label={text(locale, "Game value", "Игровое значение", "Spelvärde")}
        >
          <Select
            value={expression.atomicId ?? project.atomics[0]?.id ?? ""}
            onChange={(atomicId) => onChange({ ...expression, atomicId })}
          >
            {project.atomics.map((item) => (
              <option key={item.id} value={item.id}>
                {localized(item.name, locale)}
              </option>
            ))}
          </Select>
        </Field>
      )}
      {["ability_score", "ability_modifier"].includes(expression.kind) && (
        <Field label={text(locale, "Ability", "Характеристика", "Egenskap")}>
          <Select
            value={expression.ability ?? "constitution"}
            onChange={(ability) =>
              onChange({
                ...expression,
                ability: ability as ValueExpression["ability"],
              })
            }
          >
            {abilities.map((ability) => (
              <option key={ability} value={ability}>
                {text(
                  locale,
                  ability[0].toUpperCase() + ability.slice(1),
                  (
                    {
                      strength: "Сила",
                      dexterity: "Ловкость",
                      constitution: "Телосложение",
                      intelligence: "Интеллект",
                      wisdom: "Мудрость",
                      charisma: "Харизма",
                    } as Record<string, string>
                  )[ability],
                )}
              </option>
            ))}
          </Select>
        </Field>
      )}
      {expression.kind === "class_level" && (
        <Field
          label={text(locale, "Which class", "Какой класс", "Vilken klass")}
        >
          <Select
            value={expression.classSelector ?? "source_class"}
            onChange={(classSelector) =>
              onChange({ ...expression, classSelector })
            }
          >
            <option value="source_class">
              {text(
                locale,
                "Class that owns the rule",
                "Класс — источник правила",
              )}
            </option>
            <option value="base_class">
              {text(locale, "Base class", "Базовый класс")}
            </option>
            <option value="all_caster_classes">
              {text(
                locale,
                "All spellcasting classes",
                "Все заклинательные классы",
              )}
            </option>
            {project.entities
              .filter((entity) => entity.type === "class")
              .map((entity) => (
                <option key={entity.id} value={entity.id}>
                  {localized(entity.name, locale)}
                </option>
              ))}
          </Select>
        </Field>
      )}
      {["die_roll", "die_average", "die_maximum"].includes(expression.kind) && (
        <>
          <Field label={text(locale, "Die", "Кость", "Tärning")}>
            <Select
              value={expression.dieId ?? dice[0]?.id ?? ""}
              onChange={(dieId) => onChange({ ...expression, dieId })}
            >
              {dice.map((item) => (
                <option key={item.id} value={item.id}>
                  {localized(item.name, locale)}
                </option>
              ))}
            </Select>
          </Field>
          {expression.kind === "die_roll" && (
            <Field
              label={text(
                locale,
                "Number of dice",
                "Количество костей",
                "Antal tärningar",
              )}
            >
              <NumberInput
                min={1}
                value={expression.diceCount ?? 1}
                onChange={(diceCount) => onChange({ ...expression, diceCount })}
              />
            </Field>
          )}
        </>
      )}
      {expression.kind === "table_lookup" && (
        <Field label={text(locale, "Table", "Таблица", "Tabell")}>
          <Select
            value={expression.tableId ?? tables[0]?.id ?? ""}
            onChange={(tableId) => onChange({ ...expression, tableId })}
          >
            {tables.map((item) => (
              <option key={item.id} value={item.id}>
                {localized(item.name, locale)}
              </option>
            ))}
          </Select>
        </Field>
      )}
      {expression.kind === "count" && (
        <Field label={text(locale, "Count", "Что считать", "Räkna")}>
          <Select
            value={expression.countOf ?? "character_levels"}
            onChange={(countOf) =>
              onChange({
                ...expression,
                countOf: countOf as ValueExpression["countOf"],
              })
            }
          >
            <option value="character_levels">
              {text(locale, "Character levels", "Уровни персонажа")}
            </option>
            <option value="class_levels">
              {text(locale, "Levels of a class", "Уровни класса")}
            </option>
            <option value="targets">{text(locale, "Targets", "Цели")}</option>
            <option value="entities">
              {text(locale, "Owned entities", "Полученные сущности")}
            </option>
            <option value="conditions">
              {text(locale, "Conditions", "Состояния")}
            </option>
          </Select>
        </Field>
      )}
      {expression.kind === "operation" && (
        <div className="rule-wide calculation-block">
          <Field label={text(locale, "Calculation", "Расчёт", "Beräkning")}>
            <Select
              value={expression.operation ?? "sum"}
              onChange={(operation) =>
                onChange({
                  ...expression,
                  operation: operation as ValueExpression["operation"],
                })
              }
            >
              {[
                ["sum", "Add", "Сложить"],
                ["subtract", "Subtract", "Вычесть"],
                ["multiply", "Multiply", "Умножить"],
                ["divide", "Divide", "Разделить"],
                ["minimum", "Use lowest", "Взять наименьшее"],
                ["maximum", "Use highest", "Взять наибольшее"],
                ["clamp", "Limit range", "Ограничить диапазоном"],
              ].map(([id, en, ru]) => (
                <option key={id} value={id}>
                  {text(locale, en, ru)}
                </option>
              ))}
            </Select>
          </Field>
          <div className="calculation-operands">
            {(expression.operands ?? []).map((operand, index) => (
              <div className="calculation-operand" key={index}>
                <ValueExpressionEditor
                  value={operand}
                  project={project}
                  locale={locale}
                  onChange={(next) =>
                    onChange({
                      ...expression,
                      operands: (expression.operands ?? []).map(
                        (item, current) => (current === index ? next : item),
                      ),
                    })
                  }
                />
                <button
                  className="icon-button danger"
                  onClick={() =>
                    onChange({
                      ...expression,
                      operands: (expression.operands ?? []).filter(
                        (_, current) => current !== index,
                      ),
                    })
                  }
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            className="button ghost compact"
            onClick={() =>
              onChange({
                ...expression,
                operands: [...(expression.operands ?? []), emptyExpression()],
              })
            }
          >
            + {text(locale, "Value", "Значение", "Värde")}
          </button>
        </div>
      )}
    </div>
  );
}

export function ConditionSetEditor({
  label,
  value,
  project,
  locale,
  onChange,
}: Props<ConditionGroup>) {
  const group = value ?? emptyConditions();
  return (
    <section className="dynamic-card rule-editor">
      <span className="dynamic-label">{label}</span>
      <div className="rule-toolbar">
        <Field label={text(locale, "Match", "Проверять", "Matcha")}>
          <Select
            value={group.mode}
            onChange={(mode) =>
              onChange({ ...group, mode: mode as ConditionGroup["mode"] })
            }
          >
            <option value="all">
              {text(locale, "All conditions", "Все условия")}
            </option>
            <option value="any">
              {text(locale, "Any condition", "Любое условие")}
            </option>
            <option value="none">
              {text(locale, "None of conditions", "Ни одно условие")}
            </option>
          </Select>
        </Field>
      </div>
      {group.predicates.map((predicate, index) => (
        <article className="visual-rule-row" key={predicate.id}>
          <span className="step">{index + 1}</span>
          <ValueExpressionEditor
            value={predicate.left}
            project={project}
            locale={locale}
            onChange={(left) =>
              onChange({
                ...group,
                predicates: group.predicates.map((item, current) =>
                  current === index ? { ...item, left } : item,
                ),
              })
            }
          />
          <Field label={text(locale, "Comparison", "Сравнение", "Jämförelse")}>
            <Select
              value={predicate.operator}
              onChange={(operator) =>
                onChange({
                  ...group,
                  predicates: group.predicates.map((item, current) =>
                    current === index
                      ? { ...item, operator: operator as typeof item.operator }
                      : item,
                  ),
                })
              }
            >
              {[
                ["equals", "Equals", "Равно"],
                ["not_equals", "Not equal", "Не равно"],
                ["greater_than", "Greater than", "Больше"],
                ["at_least", "At least", "Не меньше"],
                ["less_than", "Less than", "Меньше"],
                ["at_most", "At most", "Не больше"],
                ["contains", "Contains", "Содержит"],
                ["not_contains", "Does not contain", "Не содержит"],
              ].map(([id, en, ru]) => (
                <option key={id} value={id}>
                  {text(locale, en, ru)}
                </option>
              ))}
            </Select>
          </Field>
          <ValueExpressionEditor
            value={predicate.right}
            project={project}
            locale={locale}
            onChange={(right) =>
              onChange({
                ...group,
                predicates: group.predicates.map((item, current) =>
                  current === index ? { ...item, right } : item,
                ),
              })
            }
          />
          <button
            className="icon-button danger"
            onClick={() =>
              onChange({
                ...group,
                predicates: group.predicates.filter(
                  (_, current) => current !== index,
                ),
              })
            }
          >
            ×
          </button>
        </article>
      ))}
      <button
        className="button ghost compact"
        onClick={() =>
          onChange({
            ...group,
            predicates: [
              ...group.predicates,
              {
                id: `condition_${group.predicates.length + 1}`,
                left: emptyExpression(),
                operator: "equals",
                right: emptyExpression(),
              },
            ],
          })
        }
      >
        + {text(locale, "Condition", "Условие", "Villkor")}
      </button>
    </section>
  );
}

function DurationEditor({
  value,
  locale,
  onChange,
}: {
  value: RoundDuration;
  locale: Locale;
  onChange: (value: RoundDuration) => void;
}) {
  return (
    <div className="rule-grid">
      <Field label={text(locale, "Duration", "Длительность", "Varaktighet")}>
        <Select
          value={value.type}
          onChange={(type) =>
            onChange({
              ...value,
              type: type as RoundDuration["type"],
              rounds: type === "rounds" ? Math.max(1, value.rounds) : 0,
            })
          }
        >
          <option value="instant">
            {text(locale, "Instant", "Мгновенно")}
          </option>
          <option value="rounds">
            {text(locale, "Number of rounds", "Количество раундов")}
          </option>
          <option value="until_turn_start">
            {text(
              locale,
              "Until next turn starts",
              "До начала следующего хода",
            )}
          </option>
          <option value="until_turn_end">
            {text(locale, "Until next turn ends", "До конца следующего хода")}
          </option>
          <option value="while_in_area">
            {text(locale, "While target is in area", "Пока цель в области")}
          </option>
          <option value="until_rest">
            {text(locale, "Until rest", "До отдыха")}
          </option>
          <option value="permanent">
            {text(locale, "Permanent", "Постоянно")}
          </option>
        </Select>
      </Field>
      {value.type === "rounds" && (
        <Field label={text(locale, "Rounds", "Раунды", "Rundor")}>
          <NumberInput
            min={1}
            value={value.rounds}
            onChange={(rounds) => onChange({ ...value, rounds })}
          />
        </Field>
      )}
      <Field
        label={text(locale, "Concentration", "Концентрация", "Koncentration")}
      >
        <Toggle
          checked={value.concentration}
          onChange={(concentration) => onChange({ ...value, concentration })}
          yes={text(locale, "Required", "Требуется")}
          no={text(locale, "Not required", "Не требуется")}
        />
      </Field>
    </div>
  );
}

function expressionIsIncomplete(value: ValueExpression | undefined) {
  if (!value) return true;
  if (value.kind === "number") return !Number.isFinite(value.number) || value.number === 0;
  if (value.kind === "atomic") return !value.atomicId;
  if (["die_roll", "die_average", "die_maximum"].includes(value.kind))
    return !value.dieId || !value.diceCount || value.diceCount < 1;
  if (value.kind === "table_lookup") return !value.tableId || !value.tableKey;
  if (value.kind === "operation")
    return !value.operation || !value.operands?.length || value.operands.some(expressionIsIncomplete);
  return false;
}

function actionProblemCount(action: RuleAction) {
  let count = 0;
  const atomicActions: RuleActionType[] = [
    "add",
    "subtract",
    "multiply",
    "set",
    "set_minimum",
    "set_maximum",
    "replace_calculation",
    "grant_advantage",
    "grant_disadvantage",
    "remove_roll_modifier",
  ];
  const amountActions: RuleActionType[] = [
    "add",
    "subtract",
    "multiply",
    "set",
    "set_minimum",
    "set_maximum",
    "replace_calculation",
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
  ];
  if (atomicActions.includes(action.type) && !action.atomicId) count += 1;
  if (amountActions.includes(action.type) && expressionIsIncomplete(action.value)) count += 1;
  if (action.type === "deal_damage" && !action.damageTypeId) count += 1;
  if (["make_saving_throw", "make_ability_check"].includes(action.type) && (!action.ability || expressionIsIncomplete(action.difficulty))) count += 1;
  if (["grant_condition", "remove_condition", "grant_condition_immunity"].includes(action.type) && !action.conditionId) count += 1;
  if (["grant_resistance", "grant_vulnerability", "grant_damage_immunity", "remove_damage_trait"].includes(action.type) && !action.damageTypeId) count += 1;
  if (["grant_proficiency", "upgrade_proficiency", "remove_proficiency"].includes(action.type) && !action.proficiencyId) count += 1;
  if (["grant_sense", "remove_sense"].includes(action.type) && !action.senseTypeId) count += 1;
  if (action.type === "grant_entity" && !action.entityId) count += 1;
  if (["spend_resource", "restore_resource", "change_resource_maximum"].includes(action.type) && !action.resourceKey) count += 1;
  if (action.type === "create_area" && !action.area) count += 1;
  if (action.target === "selected_target" && (!action.targetCount || action.targetCount < 1 || action.rangeFeet === undefined || action.rangeFeet < 0)) count += 1;
  return count;
}

function ruleProblemCount(rule: AutomationRule) {
  return (
    (rule.name.en.trim() ? 0 : 1) +
    (rule.actions.length ? 0 : 1) +
    (rule.duration.type === "rounds" && rule.duration.rounds < 1 ? 1 : 0) +
    rule.actions.reduce((sum, action) => sum + actionProblemCount(action), 0)
  );
}

function ActionEditor({
  action,
  project,
  locale,
  simple = false,
  onChange,
  remove,
}: {
  action: RuleAction;
  project: ForgeProject;
  locale: Locale;
  simple?: boolean;
  onChange: (value: RuleAction) => void;
  remove: () => void;
}) {
  const needsValueFor = (type: RuleActionType) =>
    [
      "add",
      "subtract",
      "multiply",
      "set",
      "set_minimum",
      "set_maximum",
      "replace_calculation",
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
    ].includes(type);
  const needsAtomicFor = (type: RuleActionType) =>
    [
      "add",
      "subtract",
      "multiply",
      "set",
      "set_minimum",
      "set_maximum",
      "replace_calculation",
      "grant_advantage",
      "grant_disadvantage",
      "remove_roll_modifier",
    ].includes(type);
  const needsValue = needsValueFor(action.type);
  const needsAtomic = needsAtomicFor(action.type);
  const problems = actionProblemCount(action);
  const valueOptions = (group: string) =>
    project.references.filter(
      (item) => item.kind === "value" && item.optionGroup === group,
    );
  return (
    <article className={`visual-action${problems ? " incomplete" : ""}`}>
      {problems > 0 && (
        <div className="action-warning rule-wide">
          {text(
            locale,
            `${problems} required settings are missing`,
            `Не заполнено обязательных настроек: ${problems}`,
            `${problems} obligatoriska inställningar saknas`,
          )}
        </div>
      )}
      {!simple && <Field label={text(locale, "Action", "Действие", "Åtgärd")}>
        <Select
          value={action.type}
          onChange={(nextType) => {
            const type = nextType as RuleActionType;
            const requestsCheck = [
              "make_saving_throw",
              "make_ability_check",
            ].includes(type);
            onChange({
              id: action.id,
              type,
              target:
                ["deal_damage", "heal", "temporary_hit_points", "grant_condition", "remove_condition"].includes(type)
                  ? "selected_target"
                  : action.target,
              value: needsValueFor(type)
                ? (action.value ?? emptyExpression())
                : undefined,
              atomicId: needsAtomicFor(type) ? action.atomicId : undefined,
              ability: requestsCheck
                ? (action.ability ?? "constitution")
                : undefined,
              difficulty: requestsCheck
                ? (action.difficulty ?? { kind: "number", number: 10 })
                : undefined,
              ...(["deal_damage", "heal", "temporary_hit_points", "grant_condition", "remove_condition"].includes(type)
                ? {
                    targetCount: action.targetCount ?? 1,
                    rangeFeet: action.rangeFeet ?? 5,
                    requiresLineOfSight: action.requiresLineOfSight ?? true,
                  }
                : {}),
            });
          }}
        >
          {RULE_ACTIONS.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {optionText(entry.name, locale)}
            </option>
          ))}
        </Select>
      </Field>}
      <Field label={text(locale, "Target", "Цель", "Mål")}>
        <Select
          value={action.target}
          onChange={(target) => {
            const nextTarget = target as RuleTarget;
            onChange({
              ...action,
              target: nextTarget,
              ...(nextTarget === "selected_target"
                ? {
                    targetCount: action.targetCount ?? 1,
                    rangeFeet: action.rangeFeet ?? 5,
                    requiresLineOfSight: action.requiresLineOfSight ?? true,
                  }
                : {}),
            });
          }}
        >
          {RULE_TARGETS.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {optionText(entry.name, locale)}
            </option>
          ))}
        </Select>
      </Field>
      {action.target === "selected_target" && (
        <>
          <Field label={text(locale, "Number of targets", "Количество целей", "Antal mål") }>
            <NumberInput
              value={action.targetCount ?? 1}
              min={1}
              onChange={(targetCount) => onChange({ ...action, targetCount })}
            />
          </Field>
          <Field label={text(locale, "Maximum distance, ft", "Максимальная дистанция, фт", "Maxavstånd, fot") }>
            <NumberInput
              value={action.rangeFeet ?? 5}
              min={0}
              onChange={(rangeFeet) => onChange({ ...action, rangeFeet })}
            />
          </Field>
          <Field label={text(locale, "Line of sight", "Линия видимости", "Siktlinje") }>
            <Toggle
              checked={action.requiresLineOfSight ?? true}
              onChange={(requiresLineOfSight) => onChange({ ...action, requiresLineOfSight })}
              yes={text(locale, "Required", "Нужна", "Krävs")}
              no={text(locale, "Not required", "Не нужна", "Krävs inte")}
            />
          </Field>
        </>
      )}
      {needsAtomic && (
        <Field
          label={text(locale, "Game value", "Игровое значение", "Spelvärde")}
        >
          <Select
            value={action.atomicId ?? ""}
            onChange={(atomicId) => onChange({ ...action, atomicId })}
          >
            <option value="">—</option>
            {project.atomics.map((item) => (
              <option key={item.id} value={item.id}>
                {localized(item.name, locale)}
              </option>
            ))}
          </Select>
        </Field>
      )}
      {action.type === "deal_damage" && (
        <>
          <Field label={text(locale, "Damage type", "Тип урона", "Skadetyp")}>
            <Select
              value={action.damageTypeId ?? ""}
              onChange={(damageTypeId) => onChange({ ...action, damageTypeId })}
            >
              <option value="">—</option>
              {valueOptions("damage_type").map((item) => (
                <option key={item.id} value={item.id}>
                  {localized(item.name, locale)}
                </option>
              ))}
            </Select>
          </Field>
          <Field
            label={text(
              locale,
              "Successful save",
              "Успешный спасбросок",
              "Lyckat räddningsslag",
            )}
          >
            <Select
              value={action.saveOutcome ?? "full"}
              onChange={(saveOutcome) =>
                onChange({
                  ...action,
                  saveOutcome: saveOutcome as RuleAction["saveOutcome"],
                })
              }
            >
              <option value="full">
                {text(locale, "Full damage", "Полный урон", "Full skada")}
              </option>
              <option value="half">
                {text(locale, "Half damage", "Половина урона", "Halv skada")}
              </option>
              <option value="none">
                {text(locale, "No damage", "Без урона", "Ingen skada")}
              </option>
            </Select>
          </Field>
        </>
      )}
      {[
        "grant_condition",
        "remove_condition",
        "grant_condition_immunity",
      ].includes(action.type) && (
        <Field label={text(locale, "Condition", "Состояние", "Tillstånd")}>
          <Select
            value={action.conditionId ?? ""}
            onChange={(conditionId) => onChange({ ...action, conditionId })}
          >
            <option value="">—</option>
            {valueOptions("condition").map((item) => (
              <option key={item.id} value={item.id}>
                {localized(item.name, locale)}
              </option>
            ))}
          </Select>
        </Field>
      )}
      {["make_saving_throw", "make_ability_check"].includes(action.type) && (
        <>
          <Field label={text(locale, "Ability", "Характеристика", "Egenskap")}>
            <Select
              value={action.ability ?? "constitution"}
              onChange={(ability) =>
                onChange({
                  ...action,
                  ability: ability as RuleAction["ability"],
                })
              }
            >
              {abilities.map((ability) => (
                <option key={ability} value={ability}>
                  {text(
                    locale,
                    ability[0].toUpperCase() + ability.slice(1),
                    (
                      {
                        strength: "Сила",
                        dexterity: "Ловкость",
                        constitution: "Телосложение",
                        intelligence: "Интеллект",
                        wisdom: "Мудрость",
                        charisma: "Харизма",
                      } as Record<string, string>
                    )[ability],
                  )}
                </option>
              ))}
            </Select>
          </Field>
          {action.type === "make_ability_check" && (
            <Field
              label={text(
                locale,
                "Skill (optional)",
                "Навык (необязательно)",
                "Färdighet (valfritt)",
              )}
            >
              <Select
                value={action.skillId ?? ""}
                onChange={(skillId) =>
                  onChange({ ...action, skillId: skillId || undefined })
                }
              >
                <option value="">
                  {text(
                    locale,
                    "Ability only",
                    "Только характеристика",
                    "Endast egenskap",
                  )}
                </option>
                {valueOptions("skill").map((item) => (
                  <option key={item.id} value={item.id}>
                    {localized(item.name, locale)}
                  </option>
                ))}
              </Select>
            </Field>
          )}
          <div className="rule-wide">
            <span className="dynamic-label">
              {text(
                locale,
                "Difficulty Class",
                "Сложность проверки",
                "Svårighetsgrad",
              )}
            </span>
            <ValueExpressionEditor
              value={action.difficulty ?? { kind: "number", number: 10 }}
              project={project}
              locale={locale}
              onChange={(difficulty) => onChange({ ...action, difficulty })}
            />
          </div>
        </>
      )}
      {[
        "grant_proficiency",
        "upgrade_proficiency",
        "remove_proficiency",
      ].includes(action.type) && (
        <Field label={text(locale, "Proficiency", "Владение", "Färdighet")}>
          <Select
            value={action.proficiencyId ?? ""}
            onChange={(proficiencyId) => onChange({ ...action, proficiencyId })}
          >
            <option value="">—</option>
            {project.references
              .filter(
                (item) =>
                  item.kind === "value" &&
                  [
                    "skill",
                    "language",
                    "tool_type",
                    "proficiency_type",
                  ].includes(item.optionGroup ?? ""),
              )
              .map((item) => (
                <option key={item.id} value={item.id}>
                  {localized(item.name, locale)}
                </option>
              ))}
            {project.entities
              .filter((item) => item.type === "item")
              .map((item) => (
                <option key={item.id} value={item.id}>
                  {localized(item.name, locale)}
                </option>
              ))}
          </Select>
        </Field>
      )}
      {["grant_sense", "remove_sense"].includes(action.type) && (
        <Field label={text(locale, "Sense", "Чувство", "Sinne")}>
          <Select
            value={action.senseTypeId ?? ""}
            onChange={(senseTypeId) => onChange({ ...action, senseTypeId })}
          >
            <option value="">—</option>
            {valueOptions("sense_type").map((item) => (
              <option key={item.id} value={item.id}>
                {localized(item.name, locale)}
              </option>
            ))}
          </Select>
        </Field>
      )}
      {action.type === "grant_entity" && (
        <Field label={text(locale, "Entity", "Сущность", "Entitet")}>
          <Select
            value={action.entityId ?? ""}
            onChange={(entityId) => onChange({ ...action, entityId })}
          >
            <option value="">—</option>
            {project.entities.map((item) => (
              <option key={item.id} value={item.id}>
                {localized(item.name, locale)}
              </option>
            ))}
          </Select>
        </Field>
      )}
      {[
        "spend_resource",
        "restore_resource",
        "change_resource_maximum",
      ].includes(action.type) && (
        <Field
          label={text(
            locale,
            "Resource name (English)",
            "Название ресурса (английское)",
            "Resursnamn (engelska)",
          )}
        >
          <input
            value={action.resourceKey ?? ""}
            placeholder={text(
              locale,
              "For example: Channel Divinity",
              "Например: Божественный канал",
              "Till exempel: Channel Divinity",
            )}
            onChange={(event) =>
              onChange({
                ...action,
                resourceKey: event.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "_")
                  .replace(/^_|_$/g, ""),
              })
            }
          />
        </Field>
      )}
      {action.type === "create_area" && (
        <div className="rule-wide">
          <AreaEditor
            label={text(
              locale,
              "Area to create",
              "Создаваемая область",
              "Område att skapa",
            )}
            value={action.area}
            project={project}
            locale={locale}
            onChange={(area) => onChange({ ...action, area })}
          />
        </div>
      )}
      {[
        "grant_resistance",
        "grant_vulnerability",
        "grant_damage_immunity",
        "remove_damage_trait",
      ].includes(action.type) && (
        <Field label={text(locale, "Damage type", "Тип урона", "Skadetyp")}>
          <Select
            value={action.damageTypeId ?? ""}
            onChange={(damageTypeId) => onChange({ ...action, damageTypeId })}
          >
            <option value="">—</option>
            {valueOptions("damage_type").map((item) => (
              <option key={item.id} value={item.id}>
                {localized(item.name, locale)}
              </option>
            ))}
          </Select>
        </Field>
      )}
      {needsValue && (
        <div className="rule-wide">
          <span className="dynamic-label">
            {text(locale, "How much", "Сколько", "Hur mycket")}
          </span>
          <ValueExpressionEditor
            value={action.value ?? emptyExpression()}
            project={project}
            locale={locale}
            onChange={(value) => onChange({ ...action, value })}
          />
        </div>
      )}
      <button className="icon-button danger" onClick={remove}>
        ×
      </button>
    </article>
  );
}

export function RuleSetEditor({
  label,
  value,
  project,
  locale,
  simple = false,
  onChange,
}: Props<RuleSet> & { simple?: boolean }) {
  const set = value ?? emptyRuleSet();
  const updateRule = (index: number, rule: AutomationRule) =>
    onChange({
      ...set,
      rules: set.rules.map((item, current) =>
        current === index ? rule : item,
      ),
    });
  return (
    <section className={`dynamic-card rule-set${simple ? " simple-rule-set" : ""}`}>
      <div className="rule-set-heading">
        <div>
          <span className="dynamic-label">{label}</span>
          <p>
            {text(
              locale,
              "Build game logic from prepared events, conditions and actions. No code or formulas are required.",
              "Соберите механику из готовых событий, условий и действий. Код и формулы не нужны.",
              "Bygg spellogik av färdiga händelser, villkor och åtgärder.",
            )}
          </p>
        </div>
        <div className="rule-create-tools">
          <Field
            label={text(
              locale,
              "Ready-made scenario",
              "Готовый сценарий",
              "Färdigt scenario",
            )}
          >
            <Select
              value=""
              onChange={(presetId) => {
                if (!presetId) return;
                onChange({
                  ...set,
                  rules: [
                    ...set.rules,
                    ...presetRule(
                      presetId as RulePresetId,
                      set.rules.length + 1,
                    ),
                  ],
                });
              }}
            >
              <option value="">
                {text(
                  locale,
                  "Choose what should happen…",
                  "Выберите, что должно происходить…",
                  "Välj vad som ska hända…",
                )}
              </option>
              {rulePresets.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {localized(preset.name, locale)}
                </option>
              ))}
            </Select>
          </Field>
          {!simple && (
            <button
              className="button ghost compact"
              onClick={() =>
                onChange({
                  ...set,
                  rules: [...set.rules, emptyRule(set.rules.length + 1)],
                })
              }
            >
              + {text(locale, "Empty rule", "Пустое правило", "Tom regel")}
            </button>
          )}
        </div>
      </div>
      {set.rules.length === 0 && (
        <div className="empty">
          {text(
            locale,
            "No automation rules. Add a rule only when this entity changes game values or reacts to an event.",
            "Правил пока нет. Добавьте правило, если сущность меняет игровые значения или реагирует на событие.",
          )}
        </div>
      )}
      {set.rules.map((rule, index) => {
        const problems = ruleProblemCount(rule);
        return (
        <details className={`automation-rule${problems ? " incomplete" : " complete"}`} key={rule.id} open>
          <summary>
            <span className="step">{index + 1}</span>
            <strong>{localized(rule.name as LocalText, locale)}</strong>
            <em>
              {optionText(
                RULE_EVENTS.find((item) => item.id === rule.event)?.name ?? {
                  en: rule.event,
                },
                locale,
              )}
              {problems > 0
                ? ` · ${text(locale, `${problems} settings missing`, `Не заполнено: ${problems}`, `${problems} inställningar saknas`)}`
                : ` · ${text(locale, "Ready", "Готово", "Klar")}`}
            </em>
            <button
              className="icon-button danger"
              onClick={(event) => {
                event.preventDefault();
                onChange({
                  ...set,
                  rules: set.rules.filter((_, current) => current !== index),
                });
              }}
            >
              ×
            </button>
          </summary>
          <div className="automation-rule-body">
            {problems > 0 && (
              <div className="rule-warning">
                {text(
                  locale,
                  "Complete the highlighted settings. An unfinished rule cannot be exported.",
                  "Заполните выделенные настройки. Незавершённое правило нельзя экспортировать.",
                  "Fyll i de markerade inställningarna. En ofullständig regel kan inte exporteras.",
                )}
              </div>
            )}
            {simple && (
              <div className="simple-rule-summary">
                <strong>
                  {optionText(
                    RULE_EVENTS.find((item) => item.id === rule.event)?.name ?? {
                      en: rule.event,
                    },
                    locale,
                  )}
                </strong>
                <span>→</span>
                <strong>
                  {rule.actions
                    .map((action) =>
                      optionText(
                        RULE_ACTIONS.find((item) => item.id === action.type)
                          ?.name ?? { en: action.type },
                        locale,
                      ),
                    )
                    .join(", ")}
                </strong>
                <small>
                  {text(
                    locale,
                    "Timing and technical conditions are already filled by the selected scenario. They remain available in Developer mode.",
                    "Момент срабатывания и технические условия уже заполнены выбранным сценарием. Их можно изменить в режиме разработчика.",
                    "Tidpunkt och tekniska villkor fylls redan i av det valda scenariot. De kan ändras i utvecklarläget.",
                  )}
                </small>
              </div>
            )}
            <div className="locale-grid">
              <Field label="EN">
                <input
                  value={rule.name.en}
                  onChange={(event) =>
                    updateRule(index, {
                      ...rule,
                      name: { ...rule.name, en: event.target.value },
                    })
                  }
                />
              </Field>
              <Field label="RU">
                <input
                  value={rule.name.ru ?? ""}
                  onChange={(event) =>
                    updateRule(index, {
                      ...rule,
                      name: { ...rule.name, ru: event.target.value },
                    })
                  }
                />
              </Field>
              <Field label="SV">
                <input
                  value={rule.name.sv ?? ""}
                  onChange={(event) =>
                    updateRule(index, {
                      ...rule,
                      name: { ...rule.name, sv: event.target.value },
                    })
                  }
                />
              </Field>
            </div>
            <div className="subsection rule-timing">
              <h3>
                {text(locale, "1. When does it happen?", "1. Когда это происходит?", "1. När händer det?")}
              </h3>
            <div className="rule-grid">
              <Field label={text(locale, "When", "Когда", "När")}>
                <Select
                  value={rule.event}
                  onChange={(event) =>
                    updateRule(index, { ...rule, event: event as RuleEvent })
                  }
                >
                  {RULE_EVENTS.map((entry) => (
                    <option key={entry.id} value={entry.id}>
                      {optionText(entry.name, locale)}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field
                label={text(
                  locale,
                  "How often per target",
                  "Как часто для одной цели",
                  "Hur ofta per mål",
                )}
              >
                <Select
                  value={rule.frequency}
                  onChange={(frequency) =>
                    updateRule(index, {
                      ...rule,
                      frequency: frequency as AutomationRule["frequency"],
                    })
                  }
                >
                  <option value="every_time">
                    {text(locale, "Every trigger", "Каждое срабатывание")}
                  </option>
                  <option value="once_per_turn">
                    {text(locale, "Once per turn", "Один раз за ход")}
                  </option>
                  <option value="once_per_round">
                    {text(locale, "Once per round", "Один раз за раунд")}
                  </option>
                  <option value="once_per_target">
                    {text(locale, "Once per target", "Один раз для цели")}
                  </option>
                  <option value="once">
                    {text(locale, "Once", "Один раз")}
                  </option>
                </Select>
              </Field>
              <Field label={text(locale, "Stacking", "Сложение", "Stapling")}>
                <Select
                  value={rule.stacking}
                  onChange={(stacking) =>
                    updateRule(index, {
                      ...rule,
                      stacking: stacking as AutomationRule["stacking"],
                    })
                  }
                >
                  <option value="sum">
                    {text(locale, "Add all sources", "Сложить источники")}
                  </option>
                  <option value="highest">
                    {text(locale, "Use highest", "Взять наибольшее")}
                  </option>
                  <option value="lowest">
                    {text(locale, "Use lowest", "Взять наименьшее")}
                  </option>
                  <option value="replace">
                    {text(locale, "Replace", "Заменить")}
                  </option>
                  <option value="unique_source">
                    {text(
                      locale,
                      "Once from each source",
                      "Один раз от источника",
                    )}
                  </option>
                </Select>
              </Field>
            </div>
            </div>
            <ConditionSetEditor
              label={text(locale, "Only if", "Только если", "Endast om")}
              value={rule.conditions}
              project={project}
              locale={locale}
              onChange={(conditions) =>
                updateRule(index, { ...rule, conditions })
              }
            />
            <div className="subsection">
              <div className="subsection-head">
                <h3>
                  {text(locale, "Then do", "Затем выполнить", "Gör sedan")}
                </h3>
                {!simple && <button
                  className="button ghost compact"
                  onClick={() =>
                    updateRule(index, {
                      ...rule,
                      actions: [
                        ...rule.actions,
                        {
                          id: `action_${rule.actions.length + 1}`,
                          type: "add",
                          target: "self",
                          value: emptyExpression(),
                        },
                      ],
                    })
                  }
                >
                  + {text(locale, "Action", "Действие", "Åtgärd")}
                </button>}
              </div>
              {rule.actions.map((action, actionIndex) => (
                <ActionEditor
                  key={action.id}
                  action={action}
                  project={project}
                  locale={locale}
                  simple={simple}
                  onChange={(next) =>
                    updateRule(index, {
                      ...rule,
                      actions: rule.actions.map((item, current) =>
                        current === actionIndex ? next : item,
                      ),
                    })
                  }
                  remove={() =>
                    updateRule(index, {
                      ...rule,
                      actions: rule.actions.filter(
                        (_, current) => current !== actionIndex,
                      ),
                    })
                  }
                />
              ))}
            </div>
            <div className="subsection">
              <h3>
                {text(locale, "4. How long does it last?", "4. Как долго это действует?", "4. Hur länge varar det?")}
              </h3>
              <DurationEditor
                value={rule.duration}
                locale={locale}
                onChange={(duration) => updateRule(index, { ...rule, duration })}
              />
            </div>
          </div>
        </details>
        );
      })}
    </section>
  );
}

export function HitPointProgressionEditor({
  label,
  value,
  project,
  locale,
  onChange,
}: Props<HitPointProgression>) {
  const hp = value ?? emptyHitPointProgression();
  const modes = [
    ["roll", "Roll Hit Die", "Бросок кости хитов"],
    ["average", "Rounded-up average", "Среднее с округлением вверх"],
    ["manual", "Manual result within die", "Ручной результат в пределах кости"],
  ] as const;
  return (
    <section className="dynamic-card hp-editor">
      <span className="dynamic-label">{label}</span>
      <div className="info-strip">
        {text(
          locale,
          "Character level 1 always uses the maximum Hit Die of the starting class. Every later character level, including a new multiclass, saves its chosen roll, average, or manual result. Constitution is recalculated for every total character level.",
          "На 1 уровне персонажа всегда используется максимум кости хитов начального класса. Каждый следующий общий уровень, включая новый мультикласс, сохраняет выбранный бросок, среднее или ручной результат. Телосложение пересчитывается за каждый общий уровень.",
        )}
      </div>
      <div className="hp-step">
        <span className="step">1</span>
        <strong>
          {text(locale, "First character level", "Первый уровень персонажа")}
        </strong>
        <p>
          {text(
            locale,
            "Maximum Hit Die + Constitution modifier",
            "Максимум кости хитов + модификатор Телосложения",
          )}
        </p>
      </div>
      <div className="hp-step">
        <span className="step">2+</span>
        <strong>
          {text(
            locale,
            "Each later character level",
            "Каждый следующий уровень персонажа",
          )}
        </strong>
        <div className="choice-checks">
          {modes.map(([id, en, ru]) => (
            <label className="check-field" key={id}>
              <input
                type="checkbox"
                checked={hp.laterLevels.allowedModes.includes(id)}
                onChange={(event) =>
                  onChange({
                    ...hp,
                    laterLevels: {
                      ...hp.laterLevels,
                      allowedModes: event.target.checked
                        ? [...hp.laterLevels.allowedModes, id]
                        : hp.laterLevels.allowedModes.filter(
                            (mode) => mode !== id,
                          ),
                    },
                  })
                }
              />
              <span>{text(locale, en, ru)}</span>
            </label>
          ))}
        </div>
        <Field
          label={text(
            locale,
            "Default choice",
            "Выбор по умолчанию",
            "Standardval",
          )}
        >
          <Select
            value={hp.laterLevels.defaultMode}
            onChange={(defaultMode) =>
              onChange({
                ...hp,
                laterLevels: {
                  ...hp.laterLevels,
                  defaultMode:
                    defaultMode as HitPointProgression["laterLevels"]["defaultMode"],
                },
              })
            }
          >
            {modes
              .filter(([id]) => hp.laterLevels.allowedModes.includes(id))
              .map(([id, en, ru]) => (
                <option key={id} value={id}>
                  {text(locale, en, ru)}
                </option>
              ))}
          </Select>
        </Field>
      </div>
      <RuleSetEditor
        label={text(
          locale,
          "Additional HP rules from this class",
          "Дополнительные правила ОЗ этого класса",
          "Ytterligare KP-regler",
        )}
        value={hp.bonusRules}
        project={project}
        locale={locale}
        onChange={(bonusRules) => onChange({ ...hp, bonusRules })}
      />
    </section>
  );
}

export function ResourceEditor({
  label,
  value,
  project,
  locale,
  onChange,
}: Props<ResourceDefinition>) {
  const resource = value ?? emptyResource();
  return (
    <section className="dynamic-card resource-editor">
      <span className="dynamic-label">{label}</span>
      <div className="locale-grid">
        <Field label="EN">
          <input
            value={resource.name.en}
            onChange={(event) =>
              onChange({
                ...resource,
                name: { ...resource.name, en: event.target.value },
                key:
                  event.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "_")
                    .replace(/^_|_$/g, "") || "resource",
              })
            }
          />
        </Field>
        <Field label="RU">
          <input
            value={resource.name.ru ?? ""}
            onChange={(event) =>
              onChange({
                ...resource,
                name: { ...resource.name, ru: event.target.value },
              })
            }
          />
        </Field>
        <Field label="SV">
          <input
            value={resource.name.sv ?? ""}
            onChange={(event) =>
              onChange({
                ...resource,
                name: { ...resource.name, sv: event.target.value },
              })
            }
          />
        </Field>
      </div>
      <h4>
        {text(
          locale,
          "Maximum uses",
          "Максимум использований",
          "Maximal användning",
        )}
      </h4>
      <ValueExpressionEditor
        value={resource.maximum}
        project={project}
        locale={locale}
        onChange={(maximum) => onChange({ ...resource, maximum })}
      />
      <div className="rule-grid">
        <Field
          label={text(
            locale,
            "Starts with",
            "Начальное значение",
            "Startar med",
          )}
        >
          <Select
            value={resource.initial}
            onChange={(initial) =>
              onChange({
                ...resource,
                initial: initial as ResourceDefinition["initial"],
              })
            }
          >
            <option value="maximum">
              {text(locale, "Maximum", "Максимум")}
            </option>
            <option value="zero">{text(locale, "Zero", "Ноль")}</option>
            <option value="manual">
              {text(locale, "Set by player", "Вводит игрок")}
            </option>
          </Select>
        </Field>
      </div>
      <div className="subsection-head">
        <h3>{text(locale, "Recovery", "Восстановление", "Återhämtning")}</h3>
        <button
          className="button ghost compact"
          onClick={() =>
            onChange({
              ...resource,
              recovery: [
                ...resource.recovery,
                { event: "long_rest", amount: "all" },
              ],
            })
          }
        >
          + {text(locale, "Recovery", "Восстановление")}
        </button>
      </div>
      {resource.recovery.map((recovery, index) => (
        <div className="resource-recovery" key={index}>
          <Field label={text(locale, "When", "Когда", "När")}>
            <Select
              value={recovery.event}
              onChange={(event) =>
                onChange({
                  ...resource,
                  recovery: resource.recovery.map((item, current) =>
                    current === index
                      ? { ...item, event: event as typeof item.event }
                      : item,
                  ),
                })
              }
            >
              {[
                ["short_rest", "Short rest", "Короткий отдых"],
                ["long_rest", "Long rest", "Долгий отдых"],
                ["turn_start", "Turn start", "Начало хода"],
                ["round_start", "Round start", "Начало раунда"],
                ["initiative", "Roll initiative", "Бросок инициативы"],
                ["dawn", "Dawn", "Рассвет"],
                ["sunset", "Sunset", "Закат"],
                ["combat_start", "Combat start", "Начало боя"],
                ["manual", "Manual", "Вручную"],
              ].map(([id, en, ru]) => (
                <option key={id} value={id}>
                  {text(locale, en, ru)}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={text(locale, "Restore", "Восстановить", "Återställ")}>
            <Select
              value={recovery.amount === "all" ? "all" : "value"}
              onChange={(mode) =>
                onChange({
                  ...resource,
                  recovery: resource.recovery.map((item, current) =>
                    current === index
                      ? {
                          ...item,
                          amount: mode === "all" ? "all" : emptyExpression(),
                        }
                      : item,
                  ),
                })
              }
            >
              <option value="all">{text(locale, "All", "Всё")}</option>
              <option value="value">
                {text(locale, "Calculated amount", "Рассчитываемое количество")}
              </option>
            </Select>
          </Field>
          {recovery.amount !== "all" && (
            <ValueExpressionEditor
              value={recovery.amount}
              project={project}
              locale={locale}
              onChange={(amount) =>
                onChange({
                  ...resource,
                  recovery: resource.recovery.map((item, current) =>
                    current === index ? { ...item, amount } : item,
                  ),
                })
              }
            />
          )}
          <button
            className="icon-button danger"
            onClick={() =>
              onChange({
                ...resource,
                recovery: resource.recovery.filter(
                  (_, current) => current !== index,
                ),
              })
            }
          >
            ×
          </button>
        </div>
      ))}
    </section>
  );
}

export function RoundDurationEditor({
  label,
  value,
  project: _project,
  locale,
  onChange,
}: Props<RoundDuration>) {
  return (
    <section className="dynamic-card">
      <span className="dynamic-label">{label}</span>
      <DurationEditor
        value={value ?? emptyDuration()}
        locale={locale}
        onChange={onChange}
      />
    </section>
  );
}

export function AreaEditor({
  label,
  value,
  project: _project,
  locale,
  onChange,
}: Props<AreaDefinition>) {
  const area = value ?? emptyArea();
  return (
    <section className="dynamic-card area-editor">
      <span className="dynamic-label">{label}</span>
      <div className="info-strip">
        {text(
          locale,
          "The VTT resolves this geometry on a 2.5-foot grid and tracks enter, movement, turn start/end, and exit events automatically.",
          "VTT рассчитывает геометрию по сетке 2,5 фута и автоматически отслеживает вход, движение, начало/конец хода и выход.",
        )}
      </div>
      <div className="rule-grid">
        <Field label={text(locale, "Shape", "Форма", "Form")}>
          <Select
            value={area.shape}
            onChange={(shape) =>
              onChange({ ...area, shape: shape as AreaDefinition["shape"] })
            }
          >
            {[
              ["none", "No area", "Нет области"],
              ["sphere", "Sphere", "Сфера"],
              ["cylinder", "Cylinder", "Цилиндр"],
              ["cone", "Cone", "Конус"],
              ["cube", "Cube", "Куб"],
              ["line", "Line", "Линия"],
              ["wall", "Wall", "Стена"],
              ["circle", "Circle", "Круг"],
              ["custom", "VTT custom area", "Произвольная область VTT"],
            ].map(([id, en, ru]) => (
              <option key={id} value={id}>
                {text(locale, en, ru)}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={text(locale, "Attached to", "Привязка", "Fäst vid")}>
          <Select
            value={area.anchor}
            onChange={(anchor) =>
              onChange({ ...area, anchor: anchor as AreaDefinition["anchor"] })
            }
          >
            <option value="point">
              {text(locale, "Selected point", "Выбранная точка")}
            </option>
            <option value="caster">
              {text(locale, "Caster", "Заклинатель")}
            </option>
            <option value="target">
              {text(locale, "Selected target", "Выбранная цель")}
            </option>
            <option value="moving_target">
              {text(locale, "Moving target", "Движущаяся цель")}
            </option>
          </Select>
        </Field>
        <Field label={text(locale, "Targets", "Цели", "Mål")}>
          <Select
            value={area.targetFilter}
            onChange={(targetFilter) =>
              onChange({
                ...area,
                targetFilter: targetFilter as AreaDefinition["targetFilter"],
              })
            }
          >
            <option value="all">{text(locale, "Everything", "Все")}</option>
            <option value="allies">{text(locale, "Allies", "Союзники")}</option>
            <option value="enemies">
              {text(locale, "Enemies", "Противники")}
            </option>
            <option value="creatures">
              {text(locale, "Creatures", "Существа")}
            </option>
            <option value="objects">
              {text(locale, "Objects", "Объекты")}
            </option>
          </Select>
        </Field>
        {area.shape !== "none" && (
          <>
            <Field
              label={text(locale, "Radius, ft", "Радиус, фт", "Radie, ft")}
            >
              <NumberInput
                min={0}
                value={area.radiusFeet}
                onChange={(radiusFeet) => onChange({ ...area, radiusFeet })}
              />
            </Field>
            <Field label={text(locale, "Length, ft", "Длина, фт", "Längd, ft")}>
              <NumberInput
                min={0}
                value={area.lengthFeet}
                onChange={(lengthFeet) => onChange({ ...area, lengthFeet })}
              />
            </Field>
            <Field label={text(locale, "Width, ft", "Ширина, фт", "Bredd, ft")}>
              <NumberInput
                min={0}
                value={area.widthFeet}
                onChange={(widthFeet) => onChange({ ...area, widthFeet })}
              />
            </Field>
            <Field label={text(locale, "Height, ft", "Высота, фт", "Höjd, ft")}>
              <NumberInput
                min={0}
                value={area.heightFeet}
                onChange={(heightFeet) => onChange({ ...area, heightFeet })}
              />
            </Field>
          </>
        )}
      </div>
    </section>
  );
}

export function DamageEditor({
  label,
  value,
  project,
  locale,
  onChange,
}: Props<DamageComponent[]>) {
  const components = Array.isArray(value) ? value : [];
  const damageTypes = project.references.filter(
    (item) => item.kind === "value" && item.optionGroup === "damage_type",
  );
  return (
    <section className="dynamic-card damage-editor">
      <div className="rule-set-heading">
        <span className="dynamic-label">{label}</span>
        <button
          className="button ghost compact"
          onClick={() =>
            onChange([...components, emptyDamage(components.length + 1)])
          }
        >
          + {text(locale, "Damage", "Урон", "Skada")}
        </button>
      </div>
      {components.map((component, index) => (
        <article className="damage-component" key={component.id}>
          <span className="step">{index + 1}</span>
          <div className="damage-fields">
            <ValueExpressionEditor
            value={component.dice}
            project={project}
            locale={locale}
            onChange={(dice) =>
              onChange(
                components.map((item, current) =>
                  current === index ? { ...item, dice } : item,
                ),
              )
            }
            />
            <Field label={text(locale, "Damage type", "Тип урона", "Skadetyp")}>
            <Select
              value={component.damageTypeId}
              onChange={(damageTypeId) =>
                onChange(
                  components.map((item, current) =>
                    current === index ? { ...item, damageTypeId } : item,
                  ),
                )
              }
            >
              <option value="">—</option>
              {damageTypes.map((item) => (
                <option key={item.id} value={item.id}>
                  {localized(item.name, locale)}
                </option>
              ))}
            </Select>
            </Field>
            <Field
            label={text(
              locale,
              "On successful save",
              "При успешном спасброске",
              "Vid lyckat räddningsslag",
            )}
          >
            <Select
              value={component.saveOutcome}
              onChange={(saveOutcome) =>
                onChange(
                  components.map((item, current) =>
                    current === index
                      ? {
                          ...item,
                          saveOutcome:
                            saveOutcome as DamageComponent["saveOutcome"],
                        }
                      : item,
                  ),
                )
              }
            >
              <option value="full">
                {text(locale, "Full damage", "Полный урон")}
              </option>
              <option value="half">
                {text(locale, "Half damage", "Половина урона")}
              </option>
              <option value="none">
                {text(locale, "No damage", "Без урона")}
              </option>
            </Select>
            </Field>
            <Field label={text(locale, "Periodic", "Периодический", "Periodisk")}>
            <Toggle
              checked={component.periodic}
              onChange={(periodic) =>
                onChange(
                  components.map((item, current) =>
                    current === index ? { ...item, periodic } : item,
                  ),
                )
              }
              yes={text(locale, "Yes", "Да")}
              no={text(locale, "No", "Нет")}
            />
            </Field>
            {component.periodic && (
            <>
              <Field
                label={text(
                  locale,
                  "Repeat when",
                  "Повторять когда",
                  "Upprepa när",
                )}
              >
                <Select
                  value={component.trigger}
                  onChange={(trigger) =>
                    onChange(
                      components.map((item, current) =>
                        current === index
                          ? { ...item, trigger: trigger as RuleEvent }
                          : item,
                      ),
                    )
                  }
                >
                  {RULE_EVENTS.filter((entry) =>
                    [
                      "turn_started",
                      "turn_ended",
                      "round_started",
                      "round_ended",
                      "area_entered",
                      "area_turn_started",
                      "area_turn_ended",
                    ].includes(entry.id),
                  ).map((entry) => (
                    <option key={entry.id} value={entry.id}>
                      {optionText(entry.name, locale)}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field
                label={text(
                  locale,
                  "Interval, rounds",
                  "Интервал, раунды",
                  "Intervall, rundor",
                )}
              >
                <NumberInput
                  min={1}
                  value={component.intervalRounds}
                  onChange={(intervalRounds) =>
                    onChange(
                      components.map((item, current) =>
                        current === index ? { ...item, intervalRounds } : item,
                      ),
                    )
                  }
                />
              </Field>
              <Field
                label={text(
                  locale,
                  "Duration, rounds",
                  "Длительность, раунды",
                  "Varaktighet, rundor",
                )}
              >
                <NumberInput
                  min={0}
                  value={component.durationRounds}
                  onChange={(durationRounds) =>
                    onChange(
                      components.map((item, current) =>
                        current === index ? { ...item, durationRounds } : item,
                      ),
                    )
                  }
                />
              </Field>
              <Field label={text(locale, "Limit", "Ограничение", "Gräns")}>
                <Select
                  value={component.frequency}
                  onChange={(frequency) =>
                    onChange(
                      components.map((item, current) =>
                        current === index
                          ? {
                              ...item,
                              frequency:
                                frequency as DamageComponent["frequency"],
                            }
                          : item,
                      ),
                    )
                  }
                >
                  <option value="once_per_turn">
                    {text(locale, "Once per turn", "Один раз за ход")}
                  </option>
                  <option value="once_per_round">
                    {text(locale, "Once per round", "Один раз за раунд")}
                  </option>
                  <option value="every_time">
                    {text(locale, "Every trigger", "Каждое срабатывание")}
                  </option>
                </Select>
              </Field>
            </>
            )}
          </div>
          <button
            className="icon-button danger"
            onClick={() =>
              onChange(components.filter((_, current) => current !== index))
            }
          >
            ×
          </button>
        </article>
      ))}
    </section>
  );
}

export function ChoiceSetEditor({
  label,
  value,
  project,
  locale,
  onChange,
}: Props<ChoiceDefinition[]>) {
  const choices = Array.isArray(value) ? value : [];
  return (
    <section className="dynamic-card choice-editor">
      <div className="rule-set-heading">
        <span className="dynamic-label">{label}</span>
        <button
          className="button ghost compact"
          onClick={() =>
            onChange([...choices, emptyChoice(choices.length + 1)])
          }
        >
          + {text(locale, "Choice", "Выбор", "Val")}
        </button>
      </div>
      {choices.map((choice, index) => (
        <article className="choice-card" key={choice.id}>
          <header>
            <span className="step">{index + 1}</span>
            <div className="locale-grid">
              <Field label="EN">
                <input
                  value={choice.name.en}
                  onChange={(event) =>
                    onChange(
                      choices.map((item, current) =>
                        current === index
                          ? {
                              ...item,
                              name: { ...item.name, en: event.target.value },
                              id: `choice_${index + 1}`,
                            }
                          : item,
                      ),
                    )
                  }
                />
              </Field>
              <Field label="RU">
                <input
                  value={choice.name.ru ?? ""}
                  onChange={(event) =>
                    onChange(
                      choices.map((item, current) =>
                        current === index
                          ? {
                              ...item,
                              name: { ...item.name, ru: event.target.value },
                            }
                          : item,
                      ),
                    )
                  }
                />
              </Field>
              <Field label="SV">
                <input
                  value={choice.name.sv ?? ""}
                  onChange={(event) =>
                    onChange(
                      choices.map((item, current) =>
                        current === index
                          ? {
                              ...item,
                              name: { ...item.name, sv: event.target.value },
                            }
                          : item,
                      ),
                    )
                  }
                />
              </Field>
            </div>
            <button
              className="icon-button danger"
              onClick={() =>
                onChange(choices.filter((_, current) => current !== index))
              }
            >
              ×
            </button>
          </header>
          <div className="rule-grid">
            <Field label={text(locale, "Minimum", "Минимум", "Minimum")}>
              <NumberInput
                min={0}
                value={choice.minimum}
                onChange={(minimum) =>
                  onChange(
                    choices.map((item, current) =>
                      current === index ? { ...item, minimum } : item,
                    ),
                  )
                }
              />
            </Field>
            <Field label={text(locale, "Maximum", "Максимум", "Maximum")}>
              <NumberInput
                min={choice.minimum}
                value={choice.maximum}
                onChange={(maximum) =>
                  onChange(
                    choices.map((item, current) =>
                      current === index ? { ...item, maximum } : item,
                    ),
                  )
                }
              />
            </Field>
            <Field
              label={text(locale, "Choose from", "Выбирать из", "Välj från")}
            >
              <Select
                value={choice.source}
                onChange={(source) =>
                  onChange(
                    choices.map((item, current) =>
                      current === index
                        ? {
                            ...item,
                            source: source as ChoiceDefinition["source"],
                          }
                        : item,
                    ),
                  )
                }
              >
                <option value="prepared_options">
                  {text(locale, "Prepared options", "Подготовленные варианты")}
                </option>
                <option value="entities">
                  {text(
                    locale,
                    "Entities of selected types",
                    "Сущности выбранных типов",
                  )}
                </option>
                <option value="references">
                  {text(locale, "Reference values", "Значения справочника")}
                </option>
                <option value="numbers">
                  {text(locale, "Number range", "Диапазон чисел")}
                </option>
              </Select>
            </Field>
            <Field
              label={text(locale, "Empty slot", "Пустой слот", "Tom plats")}
            >
              <Toggle
                checked={choice.emptySlotAllowsPlayerChoice}
                onChange={(emptySlotAllowsPlayerChoice) =>
                  onChange(
                    choices.map((item, current) =>
                      current === index
                        ? { ...item, emptySlotAllowsPlayerChoice }
                        : item,
                    ),
                  )
                }
                yes={text(locale, "Player chooses", "Выбирает игрок")}
                no={text(locale, "Must be filled here", "Заполнить в Кузнице")}
              />
            </Field>
          </div>
          {choice.source === "entities" && (
            <div className="choice-checks">
              {[
                "class",
                "multiclass",
                "subclass",
                "species",
                "background",
                "feat",
                "feature",
                "item",
                "spell",
              ].map((type) => (
                <label className="check-field" key={type}>
                  <input
                    type="checkbox"
                    checked={choice.entityTypes.includes(type)}
                    onChange={(event) =>
                      onChange(
                        choices.map((item, current) =>
                          current === index
                            ? {
                                ...item,
                                entityTypes: event.target.checked
                                  ? [...item.entityTypes, type]
                                  : item.entityTypes.filter(
                                      (entry) => entry !== type,
                                    ),
                              }
                            : item,
                        ),
                      )
                    }
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          )}
        </article>
      ))}
    </section>
  );
}

export function TargetSelectorEditor({
  label,
  value,
  project: _project,
  locale,
  onChange,
}: Props<RuleTarget>) {
  return (
    <section className="dynamic-card">
      <span className="dynamic-label">{label}</span>
      <Field label={text(locale, "Target", "Цель", "Mål")}>
        <Select
          value={value ?? "selected_target"}
          onChange={(target) => onChange(target as RuleTarget)}
        >
          {RULE_TARGETS.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {optionText(entry.name, locale)}
            </option>
          ))}
        </Select>
      </Field>
    </section>
  );
}

function defaultGuidedRow(fields: GuidedField[]) {
  return Object.fromEntries(
    fields.map((field) => [
      field.key,
      field.defaultValue ??
        (field.type === "number"
          ? 0
          : field.type === "boolean"
            ? false
            : field.type === "dice"
              ? { kind: "die_roll", dieId: "wsg.atomic.d6", diceCount: 1 }
              : field.type === "calculation"
                ? emptyExpression()
                : ""),
    ]),
  );
}

function GuidedRow({
  fields,
  value,
  project,
  locale,
  onChange,
}: {
  fields: GuidedField[];
  value: Record<string, unknown>;
  project: ForgeProject;
  locale: Locale;
  onChange: (value: Record<string, unknown>) => void;
}) {
  return (
    <div className="guided-grid">
      {fields.map((field) => {
        const label = localized(field.name, locale);
        const current = value[field.key] ?? field.defaultValue;
        if (field.type === "boolean")
          return (
            <Field key={field.key} label={label}>
              <Toggle
                checked={Boolean(current)}
                onChange={(next) => onChange({ ...value, [field.key]: next })}
                yes={text(locale, "Yes", "Да")}
                no={text(locale, "No", "Нет")}
              />
            </Field>
          );
        if (field.type === "number")
          return (
            <Field key={field.key} label={label}>
              <NumberInput
                value={Number(current ?? 0)}
                min={field.minimum}
                max={field.maximum}
                onChange={(next) => onChange({ ...value, [field.key]: next })}
              />
            </Field>
          );
        if (field.type === "select" || field.type === "reference") {
          const options = project.references.filter(
            (item) =>
              item.kind === "value" &&
              (!field.optionGroup || item.optionGroup === field.optionGroup),
          );
          return (
            <Field key={field.key} label={label}>
              <Select
                value={String(current ?? "")}
                onChange={(next) => onChange({ ...value, [field.key]: next })}
              >
                <option value="">—</option>
                {options.map((item) => (
                  <option key={item.id} value={item.id}>
                    {localized(item.name, locale)}
                  </option>
                ))}
              </Select>
            </Field>
          );
        }
        if (field.type === "entity") {
          const options = project.entities.filter(
            (item) =>
              !field.allowedEntityTypes?.length ||
              field.allowedEntityTypes.includes(item.type),
          );
          return (
            <Field key={field.key} label={label}>
              <Select
                value={String(current ?? "")}
                onChange={(next) => onChange({ ...value, [field.key]: next })}
              >
                <option value="">—</option>
                {options.map((item) => (
                  <option key={item.id} value={item.id}>
                    {localized(item.name, locale)}
                  </option>
                ))}
              </Select>
            </Field>
          );
        }
        if (field.type === "dice" || field.type === "calculation")
          return (
            <div className="rule-wide" key={field.key}>
              <span className="dynamic-label">{label}</span>
              <ValueExpressionEditor
                value={current as ValueExpression | undefined}
                project={project}
                locale={locale}
                onChange={(next) => onChange({ ...value, [field.key]: next })}
              />
            </div>
          );
        return null;
      })}
    </div>
  );
}

export function GuidedEditor({
  label,
  value,
  fields,
  list,
  project,
  locale,
  onChange,
}: {
  label: string;
  value: unknown;
  fields: GuidedField[];
  list: boolean;
  project: ForgeProject;
  locale: Locale;
  onChange: (value: unknown) => void;
}) {
  const rows = list
    ? Array.isArray(value)
      ? (value as Record<string, unknown>[])
      : []
    : [
        value && typeof value === "object" && !Array.isArray(value)
          ? (value as Record<string, unknown>)
          : defaultGuidedRow(fields),
      ];
  return (
    <section className="dynamic-card guided-editor">
      <div className="rule-set-heading">
        <span className="dynamic-label">{label}</span>
        {list && (
          <button
            className="button ghost compact"
            onClick={() => onChange([...rows, defaultGuidedRow(fields)])}
          >
            + {text(locale, "Entry", "Запись", "Post")}
          </button>
        )}
      </div>
      {rows.map((row, index) => (
        <article className="guided-row" key={index}>
          {list && <span className="step">{index + 1}</span>}
          <GuidedRow
            fields={fields}
            value={row}
            project={project}
            locale={locale}
            onChange={(next) =>
              onChange(
                list
                  ? rows.map((item, current) =>
                      current === index ? next : item,
                    )
                  : next,
              )
            }
          />
          {list && (
            <button
              className="icon-button danger"
              onClick={() =>
                onChange(rows.filter((_, current) => current !== index))
              }
            >
              ×
            </button>
          )}
        </article>
      ))}
    </section>
  );
}
