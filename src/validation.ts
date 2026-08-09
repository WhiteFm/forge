import type { Effect, ForgeEntity, ForgeProject, ValidationIssue } from "./types";

const idPattern = /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)+$/;
const targetPattern = /^[a-z][a-z0-9]*(?:\.[A-Za-z0-9_*-]+)+$/;
const semverPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
const allowedFunctions = new Set(["character_level", "class_level", "ability_score", "ability_modifier", "proficiency_bonus", "min", "max", "floor", "ceil", "abs"]);

export function validateFormula(formula: string): string | null {
  if (!formula.trim()) return "Формула не заполнена";
  if (!/^[A-Za-z0-9_().,+\-*/%<>=!&|"'\s]+$/.test(formula)) return "Формула содержит запрещённые символы";
  let depth = 0;
  for (const symbol of formula) {
    if (symbol === "(") depth += 1;
    if (symbol === ")") depth -= 1;
    if (depth < 0) return "Нарушен порядок скобок";
  }
  if (depth !== 0) return "Скобки не сбалансированы";
  const calls = formula.matchAll(/([A-Za-z_][A-Za-z0-9_]*)\s*\(/g);
  for (const call of calls) if (!allowedFunctions.has(call[1])) return `Неизвестная функция ${call[1]}()`;
  return null;
}

function validateEffect(effect: Effect, entity: ForgeEntity, index: number): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const path = `effects.${index}`;
  if (!idPattern.test(effect.id)) issues.push({ severity: "error", entityId: entity.id, path: `${path}.id`, message: "ID эффекта должен быть стабильным техническим идентификатором" });
  if (!targetPattern.test(effect.target)) issues.push({ severity: "error", entityId: entity.id, path: `${path}.target`, message: "Цель эффекта должна иметь вид combat.initiative" });
  if (!effect.value.trim()) issues.push({ severity: "error", entityId: entity.id, path: `${path}.value`, message: "Укажите значение эффекта" });
  if (effect.valueType === "formula") {
    const formulaError = validateFormula(effect.value);
    if (formulaError) issues.push({ severity: "error", entityId: entity.id, path: `${path}.value`, message: formulaError });
  }
  for (const [conditionIndex, condition] of effect.conditions.entries()) {
    const conditionError = validateFormula(condition);
    if (conditionError) issues.push({ severity: "error", entityId: entity.id, path: `${path}.conditions.${conditionIndex}`, message: conditionError });
  }
  if (["limited_use", "restore_resource"].includes(effect.activation) && !effect.resourceId) issues.push({ severity: "error", entityId: entity.id, path: `${path}.resourceId`, message: "Ограниченный эффект должен ссылаться на ресурс" });
  if (["non_stacking", "unique_by_source"].includes(effect.stacking) && !effect.stackingGroup) issues.push({ severity: "warning", entityId: entity.id, path: `${path}.stackingGroup`, message: "Без группы нельзя надёжно определить дублирование эффекта" });
  return issues;
}

export function validateProject(project: ForgeProject): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!idPattern.test(project.pack.id)) issues.push({ severity: "error", path: "pack.id", message: "ID пакета имеет неверный формат" });
  if (!semverPattern.test(project.pack.version)) issues.push({ severity: "error", path: "pack.version", message: "Версия должна иметь формат 1.0.0" });
  const ids = new Set<string>();

  for (const entity of project.entities) {
    if (!idPattern.test(entity.id)) issues.push({ severity: "error", entityId: entity.id, path: "id", message: "ID должен содержать namespace, тип и машинное имя" });
    if (ids.has(entity.id)) issues.push({ severity: "error", entityId: entity.id, path: "id", message: "Такой ID уже существует в пакете" });
    ids.add(entity.id);
    if (!entity.localization.ru.name.trim()) issues.push({ severity: "error", entityId: entity.id, path: "name_ru", message: "Русское название обязательно" });
    if (!entity.localization.en.name.trim()) issues.push({ severity: "error", entityId: entity.id, path: "name_en", message: "Английское название обязательно" });
    if (!entity.rulesetId || !entity.sourceId || !entity.licenseId) issues.push({ severity: "error", entityId: entity.id, path: "provenance", message: "Нужны ruleset, источник и лицензия" });

    for (const [formulaIndex, formula] of (entity.prerequisites ?? []).entries()) {
      const error = validateFormula(formula);
      if (error) issues.push({ severity: "error", entityId: entity.id, path: `prerequisites.${formulaIndex}`, message: error });
    }
    if (entity.multiclassPrerequisite) {
      const error = validateFormula(entity.multiclassPrerequisite);
      if (error) issues.push({ severity: "error", entityId: entity.id, path: "multiclassPrerequisite", message: error });
    }

    if (entity.entityType === "class") {
      if ((entity.levels ?? []).length !== 20) issues.push({ severity: "error", entityId: entity.id, path: "levels", message: "Класс должен содержать ровно 20 уровней" });
      if (!entity.primaryAbilities?.length) issues.push({ severity: "error", entityId: entity.id, path: "primaryAbilities", message: "Выберите минимум одну основную характеристику" });
      if (entity.casterProgression !== "none" && !entity.spellcastingAbility) issues.push({ severity: "error", entityId: entity.id, path: "spellcastingAbility", message: "Заклинательному классу нужна базовая характеристика" });
    }
    if (entity.entityType === "subclass" && !entity.classId) issues.push({ severity: "error", entityId: entity.id, path: "classId", message: "Подкласс должен ссылаться на базовый класс" });
    if (entity.entityType === "background" && entity.abilityOptions?.length !== 3) issues.push({ severity: "error", entityId: entity.id, path: "abilityOptions", message: "Предыстория должна предлагать ровно 3 характеристики" });
    if (entity.entityType === "feature" && entity.mode === "limited_use" && (!entity.resource?.id || !entity.resource.maximumFormula)) issues.push({ severity: "error", entityId: entity.id, path: "resource", message: "Активному умению нужен ресурс, максимум и восстановление" });
    if (entity.entityType === "item") {
      if ((entity.weightLb ?? 0) < 0 || (entity.costCp ?? 0) < 0) issues.push({ severity: "error", entityId: entity.id, path: "item", message: "Вес и стоимость не могут быть отрицательными" });
      if (entity.itemType === "weapon" && !entity.weaponProfile) issues.push({ severity: "error", entityId: entity.id, path: "weaponProfile", message: "Оружию нужен профиль урона" });
      if (["armor", "shield"].includes(entity.itemType ?? "") && !entity.armorProfile) issues.push({ severity: "error", entityId: entity.id, path: "armorProfile", message: "Доспеху нужен профиль КД" });
      for (const [requirementIndex, requirement] of (entity.requirements ?? []).entries()) {
        const error = validateFormula(requirement);
        if (error) issues.push({ severity: "error", entityId: entity.id, path: `requirements.${requirementIndex}`, message: error });
      }
    }
    if (entity.entityType === "spell") {
      if ((entity.spellLevel ?? -1) < 0 || (entity.spellLevel ?? 10) > 9) issues.push({ severity: "error", entityId: entity.id, path: "spellLevel", message: "Уровень заклинания должен быть от 0 до 9" });
      if (!entity.schoolId) issues.push({ severity: "error", entityId: entity.id, path: "schoolId", message: "Укажите школу заклинания" });
      if (entity.range?.type === "distance" && entity.range.distanceFeet <= 0) issues.push({ severity: "error", entityId: entity.id, path: "range", message: "Для дистанции укажите число футов" });
    }

    const effectIds = new Set<string>();
    for (const [effectIndex, effect] of (entity.effects ?? []).entries()) {
      issues.push(...validateEffect(effect, entity, effectIndex));
      if (effectIds.has(effect.id)) issues.push({ severity: "error", entityId: entity.id, path: `effects.${effectIndex}.id`, message: "ID эффекта дублируется внутри сущности" });
      effectIds.add(effect.id);
    }
  }

  const references: Array<{ owner: ForgeEntity; id: string; path: string }> = [];
  for (const entity of project.entities) {
    for (const id of entity.featureIds ?? []) references.push({ owner: entity, id, path: "featureIds" });
    for (const level of entity.levels ?? []) for (const id of level.featureIds) references.push({ owner: entity, id, path: `levels.${level.level}` });
    for (const level of entity.subclassLevels ?? []) for (const id of level.featureIds) references.push({ owner: entity, id, path: `subclassLevels.${level.level}` });
    if (entity.classId) references.push({ owner: entity, id: entity.classId, path: "classId" });
    if (entity.featId) references.push({ owner: entity, id: entity.featId, path: "featId" });
  }
  for (const reference of references) if (reference.id && !ids.has(reference.id) && !reference.id.startsWith("srd52.")) issues.push({ severity: "warning", entityId: reference.owner.id, path: reference.path, message: `Ссылка ${reference.id} не найдена в этом пакете` });
  return issues;
}

function canonicalEffect(effect: Effect) {
  let value: unknown = effect.value;
  if (effect.valueType === "number") value = Number(effect.value);
  if (effect.valueType === "boolean") value = effect.value === "true";
  if (effect.valueType === "formula") value = { type: "formula", expression: effect.value };
  if (effect.valueType === "dice") value = { type: "dice", dice: effect.value };
  if (effect.valueType === "reference") value = { type: "reference", reference: { id: effect.value } };
  return {
    id: effect.id, target: effect.target, operation: effect.operation, value, activation: effect.activation,
    actionCost: effect.actionCost, trigger: effect.trigger || undefined, conditions: effect.conditions.length ? effect.conditions : undefined,
    stacking: effect.stacking, stackingGroup: effect.stackingGroup || undefined, priority: effect.priority,
    resourceId: effect.resourceId || undefined,
    duration: { type: effect.durationType, value: ["rounds", "minutes", "hours"].includes(effect.durationType) ? effect.durationValue : undefined, restType: effect.durationType === "until_rest" ? effect.restType : undefined },
    automationLevel: effect.automationLevel, notes: effect.notes || undefined,
  };
}

export function toCanonicalPack(project: ForgeProject) {
  const localizations = { ru: {} as Record<string, unknown>, en: {} as Record<string, unknown> };
  const entities = project.entities.map((entity) => {
    localizations.ru[entity.id] = entity.localization.ru;
    localizations.en[entity.id] = entity.localization.en;
    const { localization: _localization, spellLevel, featCategory, referenceCategory, referenceValue, effects, ...base } = entity;
    const result: Record<string, unknown> = { ...base };
    if (spellLevel !== undefined) result.level = spellLevel;
    if (featCategory !== undefined) result.category = featCategory;
    if (referenceCategory !== undefined) { result.category = referenceCategory; result.value = referenceValue ?? {}; }
    if (effects) result.effects = effects.map(canonicalEffect);
    return result;
  });
  return {
    manifest: {
      schemaVersion: project.schemaVersion,
      packId: project.pack.id,
      namespace: project.pack.id.split(".").slice(0, 2).join("."),
      version: project.pack.version,
      rulesetId: project.pack.rulesetId,
      kind: project.entities.every((entity) => entity.tags.includes("official")) ? "official" : "homebrew",
      author: project.pack.author,
      defaultLocale: "ru",
      locales: ["ru", "en"],
      license: { id: project.pack.licenseId, name: project.pack.licenseId, attribution: project.pack.author },
      portability: { embedTechnicalData: true, embedLocalizedText: true, allowDerivativePacks: true, requiresEntitlement: false },
      createdAt: project.updatedAt,
    },
    entities,
    localizations,
    assets: [],
  };
}
