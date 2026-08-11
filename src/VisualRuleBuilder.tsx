import { useState } from "react";
import type {
  AbilityId,
  ForgeEntity,
  Locale,
  RuleExpression,
  RuleOperand,
  RuleOperandKind,
  RuleOperator,
} from "./types";
import { optionLabel } from "./option-labels";

const abilities: AbilityId[] = ["str", "dex", "con", "int", "wis", "cha"];
const arithmeticOperators: RuleOperator[] = ["+", "-", "*", "/"];
const conditionOperators: RuleOperator[] = [
  "==",
  "!=",
  ">",
  ">=",
  "<",
  "<=",
  "contains",
  "and",
  "or",
];

const labels: Record<RuleOperandKind, { en: string; ru: string }> = {
  number: { en: "Number", ru: "Число" },
  boolean: { en: "Yes / no", ru: "Да / нет" },
  ability_score: { en: "Ability score", ru: "Значение характеристики" },
  ability_modifier: {
    en: "Ability modifier",
    ru: "Модификатор характеристики",
  },
  proficiency_bonus: { en: "Proficiency bonus", ru: "Бонус мастерства" },
  character_level: { en: "Character LVL", ru: "УР. персонажа" },
  class_level: { en: "Class LVL", ru: "УР. класса" },
  entity: { en: "Entity from pack", ru: "Сущность из пака" },
  selected_value: { en: "Selected value", ru: "Выбранное значение" },
  legacy: { en: "Imported pack value", ru: "Импортированное значение" },
};

export const defaultOperand = (): RuleOperand => ({
  kind: "number",
  value: "1",
});
export const defaultExpression = (condition = false): RuleExpression =>
  condition
    ? {
        operands: [
          { kind: "ability_score", value: "str", abilityId: "str" },
          { kind: "number", value: "13" },
        ],
        operators: [">="],
      }
    : { operands: [defaultOperand()], operators: [] };

function quote(value: string) {
  return JSON.stringify(value);
}

export function compileOperand(operand: RuleOperand) {
  if (operand.kind === "number") return String(Number(operand.value || 0));
  if (operand.kind === "boolean")
    return operand.value === "true" ? "true" : "false";
  if (operand.kind === "ability_score")
    return `ability_score(${quote(operand.abilityId ?? "str")})`;
  if (operand.kind === "ability_modifier")
    return `ability_modifier(${quote(operand.abilityId ?? "str")})`;
  if (operand.kind === "proficiency_bonus") return "proficiency_bonus()";
  if (operand.kind === "character_level") return "character_level()";
  if (operand.kind === "class_level")
    return `class_level(${quote(operand.entityId ?? "")})`;
  if (operand.kind === "entity") return quote(operand.entityId ?? "");
  if (operand.kind === "legacy") return operand.value;
  return `selected_value(${quote(operand.value)})`;
}

export function compileExpression(expression: RuleExpression) {
  return expression.operands
    .map(
      (operand, index) =>
        `${index ? ` ${expression.operators[index - 1] ?? "+"} ` : ""}${compileOperand(operand)}`,
    )
    .join("");
}

function parseOperand(value: string): RuleOperand {
  const trimmed = value.trim();
  if (/^-?\d+(?:\.\d+)?$/.test(trimmed))
    return { kind: "number", value: trimmed };
  if (/^(true|false)$/.test(trimmed))
    return { kind: "boolean", value: trimmed };
  if (trimmed === "proficiency_bonus()")
    return { kind: "proficiency_bonus", value: "" };
  if (trimmed === "character_level()")
    return { kind: "character_level", value: "" };
  const ability = trimmed.match(
    /^ability_(score|modifier)\(["'](str|dex|con|int|wis|cha)["']\)$/,
  );
  if (ability)
    return {
      kind: ability[1] === "score" ? "ability_score" : "ability_modifier",
      value: ability[2],
      abilityId: ability[2] as AbilityId,
    };
  const classLevel = trimmed.match(/^class_level\(["'](.+)["']\)$/);
  if (classLevel)
    return {
      kind: "class_level",
      value: classLevel[1],
      entityId: classLevel[1],
    };
  return { kind: "legacy", value: trimmed };
}

export function parseLegacyExpression(
  value: string,
  condition = false,
): RuleExpression {
  const normalized = value.replaceAll("&&", "and").replaceAll("||", "or");
  const allowed = (condition ? conditionOperators : arithmeticOperators)
    .sort((a, b) => b.length - a.length)
    .map((operator) => operator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const matcher = new RegExp(`\\s+(${allowed})\\s+`, "g");
  const parts = normalized.split(matcher).filter((part) => part.trim());
  if (parts.length >= 3)
    return {
      operands: parts.filter((_, index) => index % 2 === 0).map(parseOperand),
      operators: parts.filter((_, index) => index % 2 === 1) as RuleOperator[],
    };
  return normalized.trim()
    ? { operands: [parseOperand(normalized)], operators: [] }
    : defaultExpression(condition);
}

function EntitySelect({
  entities,
  value,
  onChange,
  type,
  referenceCategory,
}: {
  entities: ForgeEntity[];
  value: string;
  onChange: (value: string) => void;
  type?: ForgeEntity["entityType"];
  referenceCategory?: ForgeEntity["referenceCategory"];
}) {
  const options = entities
    .filter(
      (entity) =>
        (!type || entity.entityType === type) &&
        (!referenceCategory || entity.referenceCategory === referenceCategory),
    )
    .sort((a, b) =>
      a.localization.en.name.localeCompare(b.localization.en.name),
    );
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selected = options.find((entity) => entity.id === value);
  const filtered = options
    .filter((entity) =>
      `${entity.localization.en.name} ${entity.localization.ru.name} ${entity.id}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    )
    .slice(0, 100);
  const choose = (next: string) => {
    onChange(next);
    setOpen(false);
    setSearch("");
  };
  return (
    <div className={`entity-picker${open ? " open" : ""}`}>
      <button
        className="entity-picker-trigger"
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        <span>
          {selected?.localization.en.name || value || "Select from pack"}
        </span>
        <small>
          {selected
            ? selected.entityType
            : value
              ? "linked ID"
              : `${options.length} available`}
        </small>
        <b>⌄</b>
      </button>
      {open && (
        <div className="entity-picker-popover">
          <div className="entity-picker-search">
            <span>⌕</span>
            <input
              autoFocus
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name or ID"
            />
            {value && (
              <button type="button" onClick={() => choose("")}>
                Clear
              </button>
            )}
          </div>
          <div className="entity-picker-options">
            {filtered.map((entity) => (
              <button
                className={entity.id === value ? "selected" : ""}
                type="button"
                key={entity.id}
                onClick={() => choose(entity.id)}
              >
                <span>
                  <strong>{entity.localization.en.name || entity.id}</strong>
                  <small>{entity.id}</small>
                </span>
                <em>{entity.entityType}</em>
              </button>
            ))}
            {filtered.length === 0 && <p>No matching entities</p>}
          </div>
        </div>
      )}
    </div>
  );
}

function OperandEditor({
  operand,
  entities,
  locale,
  onChange,
}: {
  operand: RuleOperand;
  entities: ForgeEntity[];
  locale: Locale;
  onChange: (operand: RuleOperand) => void;
}) {
  const kinds: RuleOperandKind[] = [
    "number",
    "boolean",
    "ability_score",
    "ability_modifier",
    "proficiency_bonus",
    "character_level",
    "class_level",
    "entity",
    "legacy",
  ];
  const changeKind = (kind: RuleOperandKind) => {
    if (["ability_score", "ability_modifier"].includes(kind))
      onChange({ kind, value: "str", abilityId: "str" });
    else if (kind === "boolean") onChange({ kind, value: "true" });
    else if (["class_level", "entity"].includes(kind))
      onChange({ kind, value: "", entityId: "" });
    else onChange({ kind, value: kind === "number" ? "1" : "" });
  };
  return (
    <div className="rule-operand">
      <select
        value={operand.kind}
        onChange={(event) => changeKind(event.target.value as RuleOperandKind)}
      >
        {kinds.map((kind) => (
          <option key={kind} value={kind}>
            {labels[kind][locale]}
          </option>
        ))}
      </select>
      {operand.kind === "number" && (
        <input
          type="number"
          value={operand.value}
          onChange={(event) =>
            onChange({ ...operand, value: event.target.value })
          }
        />
      )}
      {operand.kind === "boolean" && (
        <select
          value={operand.value}
          onChange={(event) =>
            onChange({ ...operand, value: event.target.value })
          }
        >
          <option value="true">{locale === "en" ? "Yes" : "Да"}</option>
          <option value="false">{locale === "en" ? "No" : "Нет"}</option>
        </select>
      )}
      {["ability_score", "ability_modifier"].includes(operand.kind) && (
        <select
          value={operand.abilityId ?? "str"}
          onChange={(event) =>
            onChange({
              ...operand,
              value: event.target.value,
              abilityId: event.target.value as AbilityId,
            })
          }
        >
          {abilities.map((ability) => (
            <option key={ability} value={ability}>
              {ability.toUpperCase()}
            </option>
          ))}
        </select>
      )}
      {operand.kind === "class_level" && (
        <EntitySelect
          entities={entities}
          type="class"
          value={operand.entityId ?? ""}
          onChange={(entityId) =>
            onChange({ ...operand, value: entityId, entityId })
          }
        />
      )}
      {operand.kind === "entity" && (
        <EntitySelect
          entities={entities}
          value={operand.entityId ?? ""}
          onChange={(entityId) =>
            onChange({ ...operand, value: entityId, entityId })
          }
        />
      )}
      {operand.kind === "legacy" && (
        <span className="legacy-rule-value">{operand.value || "—"}</span>
      )}
    </div>
  );
}

export function VisualExpressionBuilder({
  value,
  expression,
  entities,
  locale,
  condition = false,
  onChange,
}: {
  value: string;
  expression?: RuleExpression;
  entities: ForgeEntity[];
  locale: Locale;
  condition?: boolean;
  onChange: (value: string, expression: RuleExpression) => void;
}) {
  const model = expression ?? parseLegacyExpression(value, condition);
  const operatorOptions = condition ? conditionOperators : arithmeticOperators;
  const update = (next: RuleExpression) =>
    onChange(compileExpression(next), next);
  return (
    <div className="visual-rule-builder">
      <div className="rule-flow">
        {model.operands.map((operand, index) => (
          <div className="rule-step" key={index}>
            {index > 0 && (
              <select
                className="rule-operator"
                aria-label={locale === "en" ? "Operator" : "Оператор"}
                value={model.operators[index - 1] ?? operatorOptions[0]}
                onChange={(event) =>
                  update({
                    ...model,
                    operators: model.operators.map((operator, operatorIndex) =>
                      operatorIndex === index - 1
                        ? (event.target.value as RuleOperator)
                        : operator,
                    ),
                  })
                }
              >
                {operatorOptions.map((operator) => (
                  <option key={operator} value={operator}>
                    {optionLabel(operator, locale)}
                  </option>
                ))}
              </select>
            )}
            <OperandEditor
              operand={operand}
              entities={entities}
              locale={locale}
              onChange={(nextOperand) =>
                update({
                  ...model,
                  operands: model.operands.map((item, itemIndex) =>
                    itemIndex === index ? nextOperand : item,
                  ),
                })
              }
            />
            {model.operands.length > 1 && (
              <button
                className="icon-button danger rule-remove"
                type="button"
                aria-label={
                  locale === "en" ? "Remove operand" : "Удалить часть"
                }
                onClick={() =>
                  update({
                    operands: model.operands.filter(
                      (_, itemIndex) => itemIndex !== index,
                    ),
                    operators: model.operators.filter(
                      (_, operatorIndex) =>
                        operatorIndex !== Math.max(0, index - 1),
                    ),
                  })
                }
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="rule-footer">
        <button
          className="text-action"
          type="button"
          onClick={() =>
            update({
              operands: [...model.operands, defaultOperand()],
              operators: [...model.operators, condition ? "and" : "+"],
            })
          }
        >
          {locale === "en" ? "+ Add operation" : "+ Добавить операцию"}
        </button>
        <span className="rule-status">
          {locale === "en"
            ? "Calculated automatically"
            : "Рассчитывается автоматически"}
        </span>
      </div>
    </div>
  );
}

export function VisualExpressionList({
  values,
  expressions,
  entities,
  locale,
  onChange,
}: {
  values: string[];
  expressions?: RuleExpression[];
  entities: ForgeEntity[];
  locale: Locale;
  onChange: (values: string[], expressions: RuleExpression[]) => void;
}) {
  const models = values.map(
    (value, index) =>
      expressions?.[index] ?? parseLegacyExpression(value, true),
  );
  const updateOne = (
    index: number,
    nextValue: string,
    nextExpression: RuleExpression,
  ) =>
    onChange(
      values.map((value, valueIndex) =>
        valueIndex === index ? nextValue : value,
      ),
      models.map((model, modelIndex) =>
        modelIndex === index ? nextExpression : model,
      ),
    );
  return (
    <div className="visual-rule-list">
      {values.map((value, index) => (
        <article className="visual-rule-row" key={index}>
          <VisualExpressionBuilder
            value={value}
            expression={models[index]}
            entities={entities}
            locale={locale}
            condition
            onChange={(nextValue, nextExpression) =>
              updateOne(index, nextValue, nextExpression)
            }
          />
          <button
            className="icon-button danger"
            type="button"
            onClick={() =>
              onChange(
                values.filter((_, valueIndex) => valueIndex !== index),
                models.filter((_, modelIndex) => modelIndex !== index),
              )
            }
          >
            ×
          </button>
        </article>
      ))}
      <button
        className="secondary-button"
        type="button"
        onClick={() => {
          const model = defaultExpression(true);
          onChange([...values, compileExpression(model)], [...models, model]);
        }}
      >
        {locale === "en" ? "+ Add condition" : "+ Добавить условие"}
      </button>
    </div>
  );
}

export function EntityPicker({
  entities,
  value,
  onChange,
  type,
  referenceCategory,
}: {
  entities: ForgeEntity[];
  value: string;
  onChange: (value: string) => void;
  type?: ForgeEntity["entityType"];
  referenceCategory?: ForgeEntity["referenceCategory"];
}) {
  return (
    <EntitySelect
      entities={entities}
      value={value}
      onChange={onChange}
      type={type}
      referenceCategory={referenceCategory}
    />
  );
}

export function EntityMultiPicker({
  entities,
  value,
  locale,
  onChange,
  type,
}: {
  entities: ForgeEntity[];
  value: string[];
  locale: Locale;
  onChange: (value: string[]) => void;
  type?: ForgeEntity["entityType"];
}) {
  return (
    <div className="entity-multi-picker">
      {value.map((entityId, index) => (
        <div className="inline-row" key={`${entityId}-${index}`}>
          <EntitySelect
            entities={entities}
            value={entityId}
            type={type}
            onChange={(nextId) =>
              onChange(
                value
                  .map((item, itemIndex) =>
                    itemIndex === index ? nextId : item,
                  )
                  .filter(Boolean),
              )
            }
          />
          <button
            className="icon-button danger"
            type="button"
            onClick={() =>
              onChange(value.filter((_, itemIndex) => itemIndex !== index))
            }
          >
            ×
          </button>
        </div>
      ))}
      <button
        className="text-action"
        type="button"
        onClick={() => onChange([...value, ""])}
      >
        {locale === "en" ? "+ Add entity" : "+ Добавить сущность"}
      </button>
    </div>
  );
}
