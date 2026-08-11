export type Locale = "en" | "ru" | "sv";
export type LocalText = { en: string; ru?: string; sv?: string };
export type StorageMode = "input" | "derived" | "runtime";
export type AtomicDataType = "integer" | "decimal" | "boolean" | "text" | "die";
export type ReferenceKind = "parameter" | "value" | "effect";
export type EntityType = "class" | "multiclass" | "subclass" | "species" | "background" | "feat" | "feature" | "item" | "spell";
export type PropertyType = "string" | "localized_short" | "localized_long" | "integer" | "decimal" | "boolean" | "select" | "reference" | "references" | "entity" | "entities" | "group" | "list" | "formula" | "condition" | "effect" | "dice" | "table";

export interface Category {
  id: string;
  name: LocalText;
  locked: true;
}

export interface AtomicRecord {
  id: string;
  key: string;
  name: LocalText;
  categoryId: string;
  dataType: AtomicDataType;
  storageMode: StorageMode;
  unit?: string;
  minimum?: number;
  maximum?: number;
  formula?: string;
  dieSides?: number;
  packId?: string;
  locked: boolean;
  previousIds: string[];
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
}

export interface EffectOperation {
  id: string;
  operator: "add" | "subtract" | "multiply" | "divide" | "set" | "minimum" | "maximum" | "roll" | "grant" | "remove";
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
  value?: unknown;
  table?: TableDefinition;
  operations?: EffectOperation[];
}

export interface TemplateField {
  id: string;
  referenceId: string;
  required: boolean;
  multiple: boolean;
  order: number;
}

export interface EntityTemplate {
  id: string;
  type: EntityType;
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
}

export interface Influence {
  id: string;
  key: string;
  name: LocalText;
  effectIds: string[];
  parameters: Record<string, unknown>;
  previousIds: string[];
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
  namespace: string;
  version: string;
  defaultLocale: "en";
  reference: { id: string; key: string; name: LocalText; version: string };
  pack: { id: string; key: string; name: LocalText; version: string; requiredRefs: Array<{ id: string; minimumVersion: string; compatibleMajor: number }> };
  categories: Category[];
  atomics: AtomicRecord[];
  references: ReferenceRecord[];
  influences: Influence[];
  templates: EntityTemplate[];
  entities: ForgeEntity[];
  dependencies: Dependency[];
  createdAt: string;
  updatedAt: string;
}

const categoryRows: Array<[string, string, string, string]> = [
  ["general", "General", "Общее", "Allmänt"],
  ["values_options", "Values and Options", "Значения и варианты", "Värden och alternativ"],
  ["character_identity", "Character Identity", "Идентичность персонажа", "Karaktärsidentitet"],
  ["creature_body", "Creature and Body", "Существо и тело", "Varelse och kropp"],
  ["level_progression", "Level and Progression", "Уровни и прогрессия", "Nivå och progression"],
  ["abilities", "Abilities", "Характеристики", "Grundegenskaper"],
  ["skills_checks", "Skills and Checks", "Навыки и проверки", "Färdigheter och slag"],
  ["saving_throws", "Saving Throws", "Спасброски", "Räddningsslag"],
  ["hit_points_healing", "Hit Points and Healing", "Хиты и лечение", "Träffpoäng och läkning"],
  ["damage_defense", "Damage and Defense", "Урон и защита", "Skada och försvar"],
  ["armor_class", "Armor Class and Defense", "Класс доспеха и защита", "Rustningsklass och försvar"],
  ["conditions", "Conditions", "Состояния", "Tillstånd"],
  ["actions_timing", "Actions and Timing", "Действия и время", "Handlingar och timing"],
  ["attacks_hits", "Attacks and Hits", "Атаки и попадания", "Attacker och träffar"],
  ["targets_areas", "Targets and Areas", "Цели и области", "Mål och områden"],
  ["movement_position", "Movement and Position", "Движение и позиция", "Förflyttning och position"],
  ["senses_perception", "Senses and Perception", "Чувства и восприятие", "Sinnen och varseblivning"],
  ["proficiencies", "Proficiencies", "Владения", "Kompetenser"],
  ["languages", "Languages", "Языки", "Språk"],
  ["weapons_mastery", "Weapons and Mastery", "Оружие и мастерство", "Vapen och mästerskap"],
  ["armor", "Armor", "Доспехи", "Rustningar"],
  ["items_inventory", "Items and Inventory", "Предметы и инвентарь", "Föremål och inventarium"],
  ["economy_currency", "Economy and Currency", "Экономика и валюта", "Ekonomi och valuta"],
  ["resources_charges", "Resources and Charges", "Ресурсы и заряды", "Resurser och laddningar"],
  ["rest_recovery", "Rest and Recovery", "Отдых и восстановление", "Vila och återhämtning"],
  ["magic_spells", "Magic and Spells", "Магия и заклинания", "Magi och besvärjelser"],
  ["components_casting", "Components and Casting", "Компоненты и сотворение", "Komponenter och kastande"],
  ["duration", "Duration", "Длительность", "Varaktighet"],
  ["choices", "Choices", "Выборы", "Val"],
  ["prerequisites", "Prerequisites", "Требования", "Förkrav"],
  ["dice_randomness", "Dice and Randomness", "Кости и случайность", "Tärningar och slump"],
  ["formulas", "Formulas and Calculations", "Формулы и расчёты", "Formler och beräkningar"],
  ["tables", "Tables", "Таблицы", "Tabeller"],
  ["effects", "Effects", "Эффекты", "Effekter"],
  ["triggers_automation", "Triggers and Automation", "Триггеры и автоматизация", "Utlösare och automation"],
  ["summons_companions", "Summons and Companions", "Призывы и спутники", "Åkallelser och följeslagare"],
  ["narrative_social", "Narrative and Social", "Нарратив и общение", "Berättelse och socialt"],
  ["units_measurements", "Units and Measurements", "Единицы измерения", "Enheter och mått"],
  ["death_stabilization", "Death and Stabilization", "Смерть и стабилизация", "Död och stabilisering"],
  ["light_visibility", "Light and Visibility", "Свет и видимость", "Ljus och sikt"],
  ["cover_line", "Cover and Line of Effect", "Укрытие и линия эффекта", "Skydd och effektlinje"],
  ["environment_hazards", "Environment and Hazards", "Окружение и опасности", "Miljö och faror"],
  ["travel_exploration", "Travel and Exploration", "Путешествия и исследование", "Resor och utforskning"],
  ["classes_multiclassing", "Classes and Multiclassing", "Классы и мультиклассирование", "Klasser och multiklassning"],
  ["creatures_statblocks", "Creatures and Stat Blocks", "Существа и блоки параметров", "Varelser och statistikblock"],
  ["mounts_vehicles", "Mounts, Vehicles and Objects", "Ездовые, транспорт и объекты", "Riddjur, fordon och objekt"],
  ["afflictions", "Poisons, Diseases and Curses", "Яды, болезни и проклятия", "Gifter, sjukdomar och förbannelser"],
  ["downtime_services", "Downtime, Crafting and Services", "Свободное время, ремесло и услуги", "Fritid, hantverk och tjänster"],
  ["stacking_priority", "Stacking and Priority", "Сложение и приоритет", "Stapling och prioritet"],
  ["ownership_control", "Ownership and Control", "Владение и контроль", "Ägande och kontroll"],
  ["encounters_initiative", "Encounters and Initiative", "Столкновения и инициатива", "Möten och initiativ"],
  ["objects_structures", "Objects and Structures", "Объекты и сооружения", "Objekt och strukturer"],
  ["transformations", "Transformations", "Трансформации", "Förvandlingar"],
  ["auras_zones", "Auras and Zones", "Ауры и зоны", "Auror och zoner"],
  ["reactions_interrupts", "Reactions and Interrupts", "Реакции и прерывания", "Reaktioner och avbrott"],
  ["immunities_exceptions", "Immunities and Rule Exceptions", "Иммунитеты и исключения", "Immuniteter och regelundantag"],
  ["custom", "Custom", "Пользовательское", "Anpassat"],
];

export const STANDARD_CATEGORIES: Category[] = categoryRows.map(([key, en, ru, sv]) => ({
  id: `wsg.category.${key}`,
  name: { en, ru, sv },
  locked: true,
}));

const atomicRows: Array<[string, string, string, string, string, AtomicDataType, StorageMode, string?, number?, number?]> = [
  ["level", "Level", "Уровень", "Nivå", "level_progression", "integer", "input", "LVL", 1, 20],
  ["experience", "Experience", "Опыт", "Erfarenhet", "level_progression", "integer", "input", "XP", 0],
  ["proficiency_bonus", "Proficiency Bonus", "Бонус мастерства", "Kompetensbonus", "level_progression", "integer", "derived", "PB"],
  ["armor_class", "Armor Class", "Класс доспеха", "Rustningsklass", "armor_class", "integer", "derived", "AC", 0],
  ["initiative", "Initiative", "Инициатива", "Initiativ", "encounters_initiative", "integer", "derived"],
  ["hit_points_current", "Current Hit Points", "Текущие хиты", "Nuvarande träffpoäng", "hit_points_healing", "integer", "runtime", "HP", 0],
  ["hit_points_maximum", "Maximum Hit Points", "Максимальные хиты", "Maximala träffpoäng", "hit_points_healing", "integer", "derived", "HP", 0],
  ["hit_points_temporary", "Temporary Hit Points", "Временные хиты", "Tillfälliga träffpoäng", "hit_points_healing", "integer", "runtime", "HP", 0],
  ["strength", "Strength", "Сила", "Styrka", "abilities", "integer", "input", "STR", 1, 30],
  ["dexterity", "Dexterity", "Ловкость", "Smidighet", "abilities", "integer", "input", "DEX", 1, 30],
  ["constitution", "Constitution", "Телосложение", "Fysik", "abilities", "integer", "input", "CON", 1, 30],
  ["intelligence", "Intelligence", "Интеллект", "Intelligens", "abilities", "integer", "input", "INT", 1, 30],
  ["wisdom", "Wisdom", "Мудрость", "Visdom", "abilities", "integer", "input", "WIS", 1, 30],
  ["charisma", "Charisma", "Харизма", "Karisma", "abilities", "integer", "input", "CHA", 1, 30],
  ["speed_walk", "Walking Speed", "Скорость ходьбы", "Gånghastighet", "movement_position", "integer", "derived", "ft", 0],
  ["speed_fly", "Flying Speed", "Скорость полёта", "Flyghastighet", "movement_position", "integer", "derived", "ft", 0],
  ["speed_swim", "Swimming Speed", "Скорость плавания", "Simhastighet", "movement_position", "integer", "derived", "ft", 0],
  ["speed_climb", "Climbing Speed", "Скорость лазания", "Klättringshastighet", "movement_position", "integer", "derived", "ft", 0],
  ["vision", "Vision Range", "Дальность зрения", "Synräckvidd", "senses_perception", "integer", "derived", "ft", 0],
  ["darkvision", "Darkvision Range", "Дальность темнозрения", "Mörkersyn", "senses_perception", "integer", "derived", "ft", 0],
  ["blindsight", "Blindsight Range", "Дальность слепого зрения", "Blindseende", "senses_perception", "integer", "derived", "ft", 0],
  ["carrying_capacity", "Carrying Capacity", "Грузоподъёмность", "Bärkapacitet", "items_inventory", "integer", "derived", "lb", 0],
  ["push_drag_lift", "Push, Drag or Lift", "Толчок, волочение или подъём", "Skjuta, dra eller lyfta", "items_inventory", "integer", "derived", "lb", 0],
];

const dice = [2, 3, 4, 6, 8, 10, 12, 20, 100];

export const STANDARD_ATOMICS: AtomicRecord[] = [
  ...atomicRows.map(([key, en, ru, sv, category, dataType, storageMode, unit, minimum, maximum]) => ({
    id: `wsg.atomic.${key}`, key, name: { en, ru, sv }, categoryId: `wsg.category.${category}`,
    dataType, storageMode, unit, minimum, maximum, locked: true, previousIds: [],
  })),
  ...dice.map((sides) => ({
    id: `wsg.atomic.d${sides}`, key: `d${sides}`, name: { en: `d${sides}`, ru: `к${sides}`, sv: `t${sides}` },
    categoryId: "wsg.category.dice_randomness", dataType: "die" as const, storageMode: "input" as const,
    dieSides: sides, minimum: 1, maximum: sides, locked: true, previousIds: [],
  })),
];

const parameter = (key: string, en: string, ru: string, sv: string, category: string, propertyType: PropertyType, required = false): ReferenceRecord => ({
  id: `wsg.ref.parameter.${key}`, key, kind: "parameter", name: { en, ru, sv }, description: { en: "", ru: "", sv: "" },
  categoryId: `wsg.category.${category}`, locked: true, previousIds: [], propertyType, required, multiple: ["references", "entities"].includes(propertyType),
  table: propertyType === "table" ? { columns: [{ id: "level", key: "level", name: { en: "LVL", ru: "УР.", sv: "NV." }, type: "integer", required: true }], rows: [] } : undefined,
});
const value = (key: string, en: string, ru: string, sv: string, category: string): ReferenceRecord => ({
  id: `wsg.ref.value.${key}`, key, kind: "value", name: { en, ru, sv }, description: { en: "", ru: "", sv: "" },
  categoryId: `wsg.category.${category}`, locked: true, previousIds: [], value: key,
});
const effect = (key: string, en: string, ru: string, sv: string, operation: EffectOperation["operator"]): ReferenceRecord => ({
  id: `wsg.ref.effect.${key}`, key, kind: "effect", name: { en, ru, sv }, description: { en: "", ru: "", sv: "" },
  categoryId: "wsg.category.effects", locked: true, previousIds: [], operations: [{ id: `${key}.operation_1`, operator: operation, targetAtomicId: "", valueSource: "input", value: "" }],
});

export const STANDARD_REFERENCES: ReferenceRecord[] = [
  parameter("name", "Name", "Название", "Namn", "character_identity", "localized_short", true),
  parameter("description", "Description", "Описание", "Beskrivning", "narrative_social", "localized_long"),
  parameter("level", "Level", "Уровень", "Nivå", "level_progression", "integer"),
  parameter("prerequisites", "Prerequisites", "Требования", "Förkrav", "prerequisites", "condition"),
  parameter("features", "Granted Features", "Получаемые умения", "Erhållna förmågor", "effects", "entities"),
  parameter("influences", "Influences", "Влияния", "Påverkningar", "effects", "references"),
  parameter("choices", "Choices", "Выборы", "Val", "choices", "list"),
  parameter("progression", "Progression", "Прогрессия", "Progression", "tables", "table"),
  parameter("parent_class", "Parent Class", "Родительский класс", "Överordnad klass", "classes_multiclassing", "entity"),
  parameter("base_class", "Base Class", "Базовый класс", "Basklass", "classes_multiclassing", "entity"),
  parameter("spell_level", "Spell Level", "Уровень заклинания", "Besvärjelsenivå", "magic_spells", "integer"),
  parameter("cost_cp", "Cost, cp", "Стоимость, мм", "Kostnad, cp", "economy_currency", "integer"),
  ...["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"].map((key) => value(key, key[0].toUpperCase() + key.slice(1), ({strength:"Сила",dexterity:"Ловкость",constitution:"Телосложение",intelligence:"Интеллект",wisdom:"Мудрость",charisma:"Харизма"} as Record<string,string>)[key], ({strength:"Styrka",dexterity:"Smidighet",constitution:"Fysik",intelligence:"Intelligens",wisdom:"Visdom",charisma:"Karisma"} as Record<string,string>)[key], "abilities")),
  ...["tiny", "small", "medium", "large", "huge", "gargantuan"].map((key) => value(key, key[0].toUpperCase() + key.slice(1), ({tiny:"Крошечный",small:"Маленький",medium:"Средний",large:"Большой",huge:"Огромный",gargantuan:"Колоссальный"} as Record<string,string>)[key], ({tiny:"Pytteliten",small:"Liten",medium:"Medelstor",large:"Stor",huge:"Enorm",gargantuan:"Gigantisk"} as Record<string,string>)[key], "creature_body")),
  ...["acid", "bludgeoning", "cold", "fire", "force", "lightning", "necrotic", "piercing", "poison", "psychic", "radiant", "slashing", "thunder"].map((key) => value(key, key[0].toUpperCase() + key.slice(1), key, key, "damage_defense")),
  effect("modify_atomic", "Modify Atomic", "Изменить атомарное значение", "Ändra atomärt värde", "add"),
  effect("deal_damage", "Deal Damage", "Нанести урон", "Tillfoga skada", "subtract"),
  effect("heal", "Heal", "Исцелить", "Läk", "add"),
  effect("set_minimum", "Set Minimum", "Задать минимум", "Sätt minimum", "minimum"),
  effect("set_maximum", "Set Maximum", "Задать максимум", "Sätt maximum", "maximum"),
  effect("roll_dice", "Roll Dice", "Бросить кости", "Slå tärningar", "roll"),
  effect("grant", "Grant", "Выдать", "Ge", "grant"),
  effect("remove", "Remove", "Удалить", "Ta bort", "remove"),
];

export const ENTITY_TYPES: EntityType[] = ["class", "multiclass", "subclass", "species", "background", "feat", "feature", "item", "spell"];

export function slugify(value: string) {
  return value.trim().toLowerCase().normalize("NFKD").replace(/[.']/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

export function localized(text: LocalText, locale: Locale) {
  return text[locale]?.trim() || text.en;
}

export function createCleanProject(): ForgeProject {
  const now = new Date().toISOString();
  const namespace = "mygame";
  const refKey = "core";
  const packKey = "characters";
  return {
    format: "wsg-forge-project", schemaVersion: 3, namespace, version: "1.0.0", defaultLocale: "en",
    reference: { id: `${namespace}.ref.${refKey}`, key: refKey, name: { en: "Core Reference", ru: "Основной справочник", sv: "Grundreferens" }, version: "1.0.0" },
    pack: { id: `${namespace}.pack.${packKey}`, key: packKey, name: { en: "New Content Pack", ru: "Новый пак контента", sv: "Nytt innehållspaket" }, version: "1.0.0", requiredRefs: [{ id: `${namespace}.ref.${refKey}`, minimumVersion: "1.0.0", compatibleMajor: 1 }] },
    categories: structuredClone(STANDARD_CATEGORIES),
    atomics: structuredClone(STANDARD_ATOMICS),
    references: structuredClone(STANDARD_REFERENCES),
    influences: [],
    templates: ENTITY_TYPES.map((type) => ({ id: `${namespace}.temp.${type}`, type, name: { en: `${type[0].toUpperCase()}${type.slice(1)} template` }, fields: [], previousIds: [] })),
    entities: [], dependencies: [], createdAt: now, updatedAt: now,
  };
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
  next.pack.requiredRefs = [{ id: refId, minimumVersion: next.reference.version, compatibleMajor: Number(next.reference.version.split(".")[0]) || 1 }];
  for (const item of next.atomics.filter((entry) => !entry.locked)) {
    const id = `${next.namespace}.atomic.${slugify(item.name.en) || item.key}`;
    mapping.set(item.id, id); if (item.id !== id) item.previousIds = [...new Set([...item.previousIds, item.id])]; item.id = id; item.key = slugify(item.name.en);
  }
  for (const item of next.references.filter((entry) => !entry.locked)) {
    const id = `${next.namespace}.ref.${item.kind}.${slugify(item.name.en) || item.key}`;
    mapping.set(item.id, id); if (item.id !== id) item.previousIds = [...new Set([...item.previousIds, item.id])]; item.id = id; item.key = slugify(item.name.en);
  }
  for (const item of next.templates) {
    const id = `${next.namespace}.temp.${item.type}`;
    mapping.set(item.id, id); item.id = id;
  }
  for (const item of next.entities) {
    const id = `${next.namespace}.${item.type}.${slugify(item.name.en) || item.key}`;
    mapping.set(item.id, id); if (item.id !== id) item.previousIds = [...new Set([...item.previousIds, item.id])]; item.id = id; item.key = slugify(item.name.en);
  }
  for (const item of next.influences) {
    const id = `${next.namespace}.influence.${slugify(item.name.en) || item.key}`;
    mapping.set(item.id, id); if (item.id !== id) item.previousIds = [...new Set([...item.previousIds, item.id])]; item.id = id; item.key = slugify(item.name.en);
  }
  for (const reference of next.references) reference.operations?.forEach((op) => { op.targetAtomicId = mapping.get(op.targetAtomicId) ?? op.targetAtomicId; });
  for (const template of next.templates) template.fields.forEach((field) => { field.referenceId = mapping.get(field.referenceId) ?? field.referenceId; });
  for (const entity of next.entities) {
    entity.templateId = mapping.get(entity.templateId) ?? entity.templateId;
    entity.values = Object.fromEntries(Object.entries(entity.values).map(([key, value]) => [mapping.get(key) ?? key, value]));
  }
  next.updatedAt = new Date().toISOString();
  return next;
}

export interface ValidationIssue { severity: "error" | "warning"; code: string; message: string; targetId?: string }

export function validateProject(project: ForgeProject): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const all = [...project.atomics, ...project.references, ...project.templates, ...project.entities, ...project.influences];
  const ids = new Map<string, number>();
  for (const item of all) ids.set(item.id, (ids.get(item.id) ?? 0) + 1);
  for (const [id, count] of ids) if (count > 1) issues.push({ severity: "error", code: "duplicate_id", message: `Duplicate ID: ${id}`, targetId: id });
  if (!/^[a-z][a-z0-9_]*$/.test(project.namespace)) issues.push({ severity: "error", code: "namespace", message: "Namespace must start with a lowercase Latin letter and contain only a–z, 0–9 and _." });
  if (!/^\d+\.\d+\.\d+$/.test(project.version)) issues.push({ severity: "error", code: "version", message: "Project version must use SemVer, for example 1.0.0." });
  const referenceIds = new Set(project.references.map((item) => item.id));
  const atomicIds = new Set(project.atomics.map((item) => item.id));
  const effectIds = new Set(project.references.filter((item) => item.kind === "effect").map((item) => item.id));
  for (const template of project.templates) for (const field of template.fields) if (!referenceIds.has(field.referenceId)) issues.push({ severity: "error", code: "missing_reference", message: `${template.id} uses missing ${field.referenceId}`, targetId: template.id });
  for (const reference of project.references) for (const operation of reference.operations ?? []) if (operation.targetAtomicId && !atomicIds.has(operation.targetAtomicId)) issues.push({ severity: "error", code: "missing_atomic", message: `${reference.id} uses missing ${operation.targetAtomicId}`, targetId: reference.id });
  for (const influence of project.influences) for (const effectId of influence.effectIds) if (!effectIds.has(effectId)) issues.push({ severity: "error", code: "missing_effect", message: `${influence.id} uses missing ${effectId}`, targetId: influence.id });
  for (const entity of project.entities) {
    if (!entity.name.en.trim()) issues.push({ severity: "error", code: "english_required", message: `${entity.id}: English name is required.`, targetId: entity.id });
    if (!project.templates.some((template) => template.id === entity.templateId)) issues.push({ severity: "error", code: "missing_template", message: `${entity.id} uses a missing template.`, targetId: entity.id });
  }
  for (const dependency of project.dependencies) if (!dependency.verified) issues.push({ severity: "warning", code: "unverified", message: `${dependency.refId} has not passed checksum verification.`, targetId: dependency.refId });
  const signatures = new Map<string, string>();
  for (const reference of project.references.filter((item) => !item.locked)) {
    const signature = JSON.stringify({ kind: reference.kind, name: reference.name.en.trim().toLowerCase(), propertyType: reference.propertyType, categoryId: reference.categoryId, value: reference.value, operations: reference.operations?.map(({ id: _id, ...operation }) => operation), table: reference.table?.columns.map(({ id: _id, name: _name, ...column }) => column) });
    const previous = signatures.get(signature);
    if (previous) issues.push({ severity: "error", code: "semantic_duplicate", message: `${reference.id} duplicates ${previous}`, targetId: reference.id });
    else signatures.set(signature, reference.id);
  }
  return issues;
}
