import type { Effect, ForgeEntity, ForgeProject, ValidationIssue } from "./types";

const idPattern = /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)+$/;
const packIdPattern = /^[a-z][a-z0-9_]*$/;
const targetPattern = /^[a-z][A-Za-z0-9]*(?:\.[A-Za-z0-9_*-]+)+$/;
const semverPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
const allowedFunctions = new Set(["character_level", "class_level", "ability_score", "ability_modifier", "proficiency_bonus", "has_feature", "min", "max", "floor", "ceil", "abs"]);

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

export function validateProject(project: ForgeProject, locale: "en" | "ru" = "en"): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!packIdPattern.test(project.pack.id)) issues.push({ severity: "error", path: "pack.id", message: "ID пакета имеет неверный формат" });
  if (!semverPattern.test(project.pack.version)) issues.push({ severity: "error", path: "pack.version", message: "Версия должна иметь формат 1.0.0" });
  const ids = new Set<string>();
  const allIds = new Set(project.entities.map((entity) => entity.id));
  const entityById = new Map(project.entities.map((entity) => [entity.id, entity]));

  for (const entity of project.entities) {
    if (!idPattern.test(entity.id)) issues.push({ severity: "error", entityId: entity.id, path: "id", message: "ID должен содержать namespace, тип и машинное имя" });
    if (ids.has(entity.id)) issues.push({ severity: "error", entityId: entity.id, path: "id", message: "Такой ID уже существует в пакете" });
    ids.add(entity.id);
    if (!entity.localization.ru.name.trim()) issues.push({ severity: "error", entityId: entity.id, path: "name_ru", message: "Русское название обязательно" });
    if (!entity.localization.en.name.trim()) issues.push({ severity: "error", entityId: entity.id, path: "name_en", message: "Английское название обязательно" });

    for (const [formulaIndex, formula] of (entity.prerequisites ?? []).entries()) {
      const error = validateFormula(formula);
      if (error) issues.push({ severity: "error", entityId: entity.id, path: `prerequisites.${formulaIndex}`, message: error });
    }
    if (entity.multiclassPrerequisite) {
      const error = validateFormula(entity.multiclassPrerequisite);
      if (error) issues.push({ severity: "error", entityId: entity.id, path: "multiclassPrerequisite", message: error });
    }

    if (entity.entityType === "class") {
      const levels = entity.levels ?? [];
      if (levels.length < 1 || levels.length > 20) issues.push({ severity: "error", entityId: entity.id, path: "levels", message: "Класс должен содержать от 1 до 20 уровней" });
      if (levels.some((level, index) => level.level !== index + 1)) issues.push({ severity: "error", entityId: entity.id, path: "levels", message: "Уровни класса должны идти подряд с первого уровня" });
      if (entity.classProgression && entity.classProgression.length !== levels.length) issues.push({ severity: "error", entityId: entity.id, path: "classProgression", message: "Таблица прогрессии должна совпадать с количеством уровней класса" });
      for (const [rowIndex, row] of (entity.classProgression ?? []).entries()) if (row.spellSlots.length !== 9) issues.push({ severity: "error", entityId: entity.id, path: `classProgression.${rowIndex}.spellSlots`, message: "Строка прогрессии должна содержать 9 уровней ячеек" });
      if (!entity.primaryAbilities?.length) issues.push({ severity: "error", entityId: entity.id, path: "primaryAbilities", message: "Выберите минимум одну основную характеристику" });
      if (entity.casterProgression !== "none" && !entity.spellcastingAbility) issues.push({ severity: "error", entityId: entity.id, path: "spellcastingAbility", message: "Заклинательному классу нужна базовая характеристика" });
    }
    if (entity.entityType === "subclass" && !entity.classId) issues.push({ severity: "error", entityId: entity.id, path: "classId", message: "Подкласс должен ссылаться на базовый класс" });
    if (entity.entityType === "background" && entity.abilityOptions?.length !== 3) issues.push({ severity: "error", entityId: entity.id, path: "abilityOptions", message: "Предыстория должна предлагать ровно 3 характеристики" });
    if (entity.entityType === "background" && (!entity.abilityScoreIncrease || entity.abilityScoreIncrease.allowedAbilities.length !== 3 || !entity.abilityScoreIncrease.distributions.length)) issues.push({ severity: "error", entityId: entity.id, path: "abilityScoreIncrease", message: "Предыстории нужна схема повышения характеристик" });
    if (entity.entityType === "feature" && entity.mode === "limited_use" && (!entity.resource?.id || !entity.resource.maximumFormula)) issues.push({ severity: "error", entityId: entity.id, path: "resource", message: "Активному умению нужен ресурс, максимум и восстановление" });
    if (entity.entityType === "item") {
      if ((entity.weightLb ?? 0) < 0 || (entity.costCp ?? 0) < 0 || (entity.costCp ?? 0) > 999999) issues.push({ severity: "error", entityId: entity.id, path: "item", message: "Вес не может быть отрицательным, стоимость должна быть от 0 до 999999 cp" });
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
      if (entity.components?.material && entity.components.materialText && !(entity.materialGroups ?? []).length) issues.push({ severity: "error", entityId: entity.id, path: "materialGroups", message: "Материальные компоненты должны быть связаны с предметами инвентаря" });
      for (const [groupIndex, group] of (entity.materialGroups ?? []).entries()) {
        if (!group.entries.length) issues.push({ severity: "error", entityId: entity.id, path: `materialGroups.${groupIndex}.entries`, message: "Добавьте хотя бы один предмет материального компонента" });
        for (const [entryIndex, entry] of group.entries.entries()) {
          const materialItem = entityById.get(entry.itemId);
          if (!materialItem || materialItem.entityType !== "item") issues.push({ severity: "error", entityId: entity.id, path: `materialGroups.${groupIndex}.entries.${entryIndex}.itemId`, message: "Материальный компонент должен ссылаться на предмет этого пака" });
          if (entry.quantity < 1) issues.push({ severity: "error", entityId: entity.id, path: `materialGroups.${groupIndex}.entries.${entryIndex}.quantity`, message: "Количество материального компонента должно быть не меньше 1" });
        }
      }
    }

    const effectIds = new Set<string>();
    for (const [effectIndex, effect] of (entity.effects ?? []).entries()) {
      issues.push(...validateEffect(effect, entity, effectIndex));
      if (effectIds.has(effect.id)) issues.push({ severity: "error", entityId: entity.id, path: `effects.${effectIndex}.id`, message: "ID эффекта дублируется внутри сущности" });
      effectIds.add(effect.id);
    }
    const choiceIds = new Set((entity.choices ?? []).map((choice) => choice.id));
    for (const [applicationIndex, application] of (entity.choiceApplications ?? []).entries()) if (!choiceIds.has(application.choiceId)) issues.push({ severity: "error", entityId: entity.id, path: `choiceApplications.${applicationIndex}.choiceId`, message: "Применение ссылается на отсутствующий выбор" });
  }

  const references: Array<{ owner: ForgeEntity; id: string; path: string }> = [];
  for (const entity of project.entities) {
    for (const id of entity.featureIds ?? []) references.push({ owner: entity, id, path: "featureIds" });
    for (const level of entity.levels ?? []) for (const id of level.featureIds) references.push({ owner: entity, id, path: `levels.${level.level}` });
    for (const level of entity.subclassLevels ?? []) for (const id of level.featureIds) references.push({ owner: entity, id, path: `subclassLevels.${level.level}` });
    if (entity.classId) references.push({ owner: entity, id: entity.classId, path: "classId" });
    for (const id of entity.featIds ?? []) references.push({ owner: entity, id, path: "featIds" });
    for (const id of entity.skillProficiencySlots ?? []) if (id) references.push({ owner: entity, id, path: "skillProficiencySlots" });
    for (const id of entity.toolProficiencySlots ?? []) if (id) references.push({ owner: entity, id, path: "toolProficiencySlots" });
    for (const id of entity.backgroundFeatureSlots ?? []) if (id) references.push({ owner: entity, id, path: "backgroundFeatureSlots" });
    for (const [grantIndex, grant] of (entity.spellGrants ?? []).entries()) references.push({ owner: entity, id: grant.spellId, path: `spellGrants.${grantIndex}.spellId` });
  }
  const externalReferencePrefixes = ["skill.", "tool.", "language.", "weapon.", "armor.", "save."];
  for (const reference of references) if (reference.id && !allIds.has(reference.id) && !reference.id.startsWith("srd52.") && !externalReferencePrefixes.some((prefix) => reference.id.startsWith(prefix))) issues.push({ severity: "warning", entityId: reference.owner.id, path: reference.path, message: `Ссылка ${reference.id} не найдена в этом пакете` });
  return locale === "en" ? issues.map((issue) => ({ ...issue, message: translateValidationMessage(issue.message) })) : issues;
}

const validationTranslations: Record<string, string> = {
  "ID пакета имеет неверный формат": "Pack ID has an invalid format",
  "Версия должна иметь формат 1.0.0": "Version must use the 1.0.0 format",
  "ID должен содержать namespace, тип и машинное имя": "ID must include a namespace, entity type, and machine name",
  "Такой ID уже существует в пакете": "This ID already exists in the pack",
  "Русское название обязательно": "Russian name is required",
  "Английское название обязательно": "English name is required",
  "Класс должен содержать от 1 до 20 уровней": "A class must contain between 1 and 20 levels",
  "Уровни класса должны идти подряд с первого уровня": "Class levels must be sequential starting at level 1",
  "Таблица прогрессии должна совпадать с количеством уровней класса": "The progression table must match the number of class levels",
  "Строка прогрессии должна содержать 9 уровней ячеек": "Each progression row must contain all 9 spell-slot levels",
  "Выберите минимум одну основную характеристику": "Select at least one primary ability",
  "Заклинательному классу нужна базовая характеристика": "A spellcasting class needs a spellcasting ability",
  "Подкласс должен ссылаться на базовый класс": "A subclass must reference its base class",
  "Предыстория должна предлагать ровно 3 характеристики": "A background must offer exactly 3 abilities",
  "Предыстории нужна схема повышения характеристик": "A background needs an ability-score increase scheme",
  "Применение ссылается на отсутствующий выбор": "A choice application references a missing choice",
  "Активному умению нужен ресурс, максимум и восстановление": "A limited-use feature needs a resource, maximum, and recovery",
  "Вес не может быть отрицательным, стоимость должна быть от 0 до 999999 cp": "Weight cannot be negative; cost must be between 0 and 999999 cp",
  "Оружию нужен профиль урона": "A weapon needs a damage profile",
  "Доспеху нужен профиль КД": "Armor needs an AC profile",
  "Уровень заклинания должен быть от 0 до 9": "Spell level must be between 0 and 9",
  "Укажите школу заклинания": "Select a spell school",
  "Для дистанции укажите число футов": "A distance range needs a value in feet",
  "Материальные компоненты должны быть связаны с предметами инвентаря": "Material components must be linked to inventory items",
  "Добавьте хотя бы один предмет материального компонента": "Add at least one material-component item",
  "Материальный компонент должен ссылаться на предмет этого пака": "A material component must reference an item in this pack",
  "Количество материального компонента должно быть не меньше 1": "Material-component quantity must be at least 1",
  "ID эффекта должен быть стабильным техническим идентификатором": "Effect ID must be a stable technical identifier",
  "Цель эффекта должна иметь вид combat.initiative": "Effect target must use a path such as combat.initiative",
  "Укажите значение эффекта": "Enter an effect value",
  "Ограниченный эффект должен ссылаться на ресурс": "A limited-use effect must reference a resource",
  "Без группы нельзя надёжно определить дублирование эффекта": "A stacking group is required to detect duplicate effects reliably",
  "ID эффекта дублируется внутри сущности": "Effect ID is duplicated inside the entity",
  "Формула не заполнена": "Formula is empty",
  "Формула содержит запрещённые символы": "Formula contains forbidden characters",
  "Нарушен порядок скобок": "Parentheses are in the wrong order",
  "Скобки не сбалансированы": "Parentheses are not balanced"
};

function translateValidationMessage(message: string) {
  if (validationTranslations[message]) return validationTranslations[message];
  if (message.startsWith("Неизвестная функция ")) return message.replace("Неизвестная функция ", "Unknown function ");
  const missingReference = message.match(/^Ссылка (.+) не найдена в этом пакете$/);
  if (missingReference) return `Reference ${missingReference[1]} was not found in this pack`;
  return message;
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
      kind: project.pack.id === "srd52" ? "official" : "homebrew",
      author: project.pack.author,
      defaultLocale: project.pack.defaultLocale ?? "en",
      locales: ["en", "ru"],
      license: { id: project.pack.licenseId, name: project.pack.licenseId, attribution: project.pack.attribution ?? project.pack.author },
      portability: { embedTechnicalData: true, embedLocalizedText: true, allowDerivativePacks: true, requiresEntitlement: false },
      createdAt: project.updatedAt,
    },
    entities,
    localizations,
    assets: [],
  };
}
