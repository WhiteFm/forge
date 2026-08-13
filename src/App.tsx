import {
  Children,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { decodeBundle, downloadText, encodeBundle } from "./codec";
import {
  AreaEditor,
  ChoiceSetEditor,
  ConditionSetEditor,
  DamageEditor,
  GuidedEditor,
  HitPointProgressionEditor,
  ResourceEditor,
  RoundDurationEditor,
  RuleSetEditor,
  TargetSelectorEditor,
  ValueExpressionEditor,
} from "./RuleEditors";
import {
  type AreaDefinition,
  type ChoiceDefinition as VisualChoiceDefinition,
  type ConditionGroup,
  type DamageComponent,
  type HitPointProgression,
  type ResourceDefinition,
  type RoundDuration,
  type RuleSet,
  type RuleTarget,
  type ValueExpression,
} from "./rule-system";
import {
  ENTITY_TYPES,
  createCleanProject,
  localized,
  recalculateProjectIds,
  slugify,
  upgradeProjectCatalog,
  validateProject,
  type AtomicDataType,
  type AtomicField,
  type AtomicRecord,
  type EntityTemplate,
  type EntityType,
  type ForgeEntity,
  type ForgeProject,
  type Locale,
  type LocalText,
  type PropertyType,
  type ReferenceKind,
  type ReferenceRecord,
  type StorageMode,
  type TableDefinition,
} from "./model";

type Page =
  | "overview"
  | "atomics"
  | "references"
  | "templates"
  | "entities"
  | "dependencies";
type Dialog = "settings" | "debug" | "export" | null;

const STORAGE_KEY = "wsguild.forge.project.v3";
const LOCALE_KEY = "wsguild.forge.locale.v3";

const labels = {
  en: {
    overview: "Overview",
    atomics: "Atomics",
    references: "References",
    templates: "Templates",
    entities: "Entities",
    dependencies: "Dependencies",
    project: "Project",
    clean: "New clean project",
    import: "Import",
    export: "Export",
    debug: "Debug",
    settings: "Settings",
    search: "Search by name",
    add: "Create",
    delete: "Delete",
    english: "English",
    russian: "Russian",
    swedish: "Swedish",
    englishRequired:
      "English is required. Russian and Swedish fall back to English when empty.",
    locked: "Standard · locked",
    custom: "Custom",
    id: "ID",
    name: "Name",
    description: "Description",
    category: "Sorting category",
    type: "Type",
    dataType: "Data type",
    storage: "Storage",
    input: "Persistent / input",
    derived: "Calculated",
    runtime: "Current / runtime",
    constant: "Constant",
    formula: "Formula",
    unit: "Unit",
    minimum: "Minimum",
    maximum: "Maximum",
    dieSides: "Die sides",
    parameters: "Parameters",
    values: "Values",
    effects: "Effects",
    influences: "Influences",
    table: "Table",
    required: "Required",
    multiple: "Multiple",
    fields: "Template fields",
    noSelection: "Select a record on the left or create a new one.",
    emptyGroup: "No records in this category.",
    usedBy: "Used by",
    noItems: "Nothing has been created yet.",
    packContent: "Pack content",
    refContent: "Reference content",
    records: "records",
    errors: "Errors",
    warnings: "Warnings",
    json: "JSON",
    readonlyJson: "Generated JSON is read-only.",
    valid: "No blocking errors.",
    version: "Version",
    namespace: "Namespace",
    refName: "Reference name",
    packName: "Pack name",
    packSubtitle: "Pack label",
    packDescription: "Pack description",
    key: "Key",
    template: "Template",
    localStorage:
      "The working project is stored only in this browser. CCL, VTT and Bestiary load installed .wsgref and .wsgpack files from each user's computer.",
    flow1: "Define universal values and dice",
    flow2: "Build parameters, values and reusable effects",
    flow3: "Assemble any number of reusable entity templates",
    flow4: "Create content without writing JSON",
    editable: "Editable in Forge",
    readOnly: "Read-only in Forge",
    exportRefs: "Export references and templates",
    exportPack: "Export game entities",
    exportProject: "Export editable project",
    operation: "Operation",
    target: "Target atomic",
    source: "Value source",
    valueLabel: "Value",
    addOperation: "Add operation",
    columns: "Columns",
    rows: "Rows",
    addColumn: "Add column",
    addRow: "Add row",
    pasteTable: "Paste a copied Excel range into the selected cell.",
    attach: "Install local dependency",
    dependencyHelp:
      "A .wsgpack requires its declared .wsgref. Installed dependencies remain local and are embedded in the editable project file only.",
    templateHelp:
      "A type can have any number of templates, such as Weapon, Armor and Tool for Items. Template changes preserve entity values whose parameter IDs remain unchanged.",
    entityHelp:
      "Choose a template, then create an entity. Entity IDs are generated from namespace, type and English name.",
    createTemplateFirst:
      "Create at least one template for this entity type first.",
    confirmTemplateDelete:
      "Deleting this template will also delete the entities created from it.",
    access: "Forge access",
    cancel: "Cancel",
    done: "Done",
    confirmReset:
      "Create a new clean project? Current local changes will be replaced.",
    removeBlocked:
      "This record is still used. Removing it will create missing links and block export.",
  },
  ru: {
    overview: "Обзор",
    atomics: "Атомарные",
    references: "Справочники",
    templates: "Шаблоны",
    entities: "Сущности",
    dependencies: "Зависимости",
    project: "Проект",
    clean: "Новый чистый проект",
    import: "Импорт",
    export: "Экспорт",
    debug: "Debug",
    settings: "Настройки",
    search: "Поиск по названию",
    add: "Создать",
    delete: "Удалить",
    english: "Английский",
    russian: "Русский",
    swedish: "Шведский",
    englishRequired:
      "Английский обязателен. Пустой русский или шведский заменяется английским.",
    locked: "Стандартное · заблокировано",
    custom: "Пользовательское",
    id: "ID",
    name: "Название",
    description: "Описание",
    category: "Категория сортировки",
    type: "Тип",
    dataType: "Тип данных",
    storage: "Хранение",
    input: "Постоянное / ввод",
    derived: "Вычисляемое",
    runtime: "Текущее / игровое",
    constant: "Константа",
    formula: "Формула",
    unit: "Единица",
    minimum: "Минимум",
    maximum: "Максимум",
    dieSides: "Грани кости",
    parameters: "Параметры",
    values: "Значения",
    effects: "Эффекты",
    influences: "Влияния",
    table: "Таблица",
    required: "Обязательно",
    multiple: "Несколько",
    fields: "Поля шаблона",
    noSelection: "Выберите запись слева или создайте новую.",
    emptyGroup: "В этой категории нет записей.",
    usedBy: "Используется",
    noItems: "Пока ничего не создано.",
    packContent: "Содержимое пака",
    refContent: "Содержимое справочника",
    records: "записей",
    errors: "Ошибки",
    warnings: "Предупреждения",
    json: "JSON",
    readonlyJson: "Сгенерированный JSON доступен только для чтения.",
    valid: "Блокирующих ошибок нет.",
    version: "Версия",
    namespace: "Пространство имён",
    refName: "Название справочника",
    packName: "Название пака",
    packSubtitle: "Надпись пака",
    packDescription: "Описание пака",
    key: "Ключ",
    template: "Шаблон",
    localStorage:
      "Рабочий проект хранится только в этом браузере. CCL, VTT и Бестиарий загружают установленные .wsgref и .wsgpack с компьютера каждого пользователя.",
    flow1: "Определите общие значения и кости",
    flow2: "Соберите параметры, значения и переиспользуемые эффекты",
    flow3: "Создайте любое количество переиспользуемых шаблонов",
    flow4: "Создавайте контент без написания JSON",
    editable: "Можно редактировать в Кузнице",
    readOnly: "Только чтение в Кузнице",
    exportRefs: "Экспорт справочников и шаблонов",
    exportPack: "Экспорт игровых сущностей",
    exportProject: "Экспорт редактируемого проекта",
    operation: "Операция",
    target: "Целевое атомарное",
    source: "Источник значения",
    valueLabel: "Значение",
    addOperation: "Добавить операцию",
    columns: "Столбцы",
    rows: "Строки",
    addColumn: "Добавить столбец",
    addRow: "Добавить строку",
    pasteTable: "Вставьте скопированный диапазон Excel в выбранную ячейку.",
    attach: "Установить локальную зависимость",
    dependencyHelp:
      ".wsgpack требует объявленный .wsgref. Установленные зависимости остаются локальными и встраиваются только в редактируемый файл проекта.",
    templateHelp:
      "Для одного типа можно создать сколько угодно шаблонов: например «Оружие», «Броня» и «Инструмент» для предметов. При изменении шаблона сохраняются значения неизменившихся параметров.",
    entityHelp:
      "Выберите шаблон, затем создайте сущность. ID создаётся из пространства имён, типа и английского названия.",
    createTemplateFirst:
      "Сначала создайте хотя бы один шаблон для этого типа сущности.",
    confirmTemplateDelete:
      "Вместе с шаблоном будут удалены созданные по нему сущности.",
    access: "Доступ в Кузнице",
    cancel: "Отмена",
    done: "Готово",
    confirmReset:
      "Создать новый чистый проект? Текущие локальные изменения будут заменены.",
    removeBlocked:
      "Запись всё ещё используется. Удаление создаст отсутствующие ссылки и заблокирует экспорт.",
  },
  sv: {
    overview: "Översikt",
    atomics: "Atomära",
    references: "Referenser",
    templates: "Mallar",
    entities: "Entiteter",
    dependencies: "Beroenden",
    project: "Projekt",
    clean: "Nytt rent projekt",
    import: "Importera",
    export: "Exportera",
    debug: "Debug",
    settings: "Inställningar",
    search: "Sök efter namn",
    add: "Skapa",
    delete: "Ta bort",
    english: "Engelska",
    russian: "Ryska",
    swedish: "Svenska",
    englishRequired:
      "Engelska krävs. Tom ryska eller svenska ersätts med engelska.",
    locked: "Standard · låst",
    custom: "Anpassad",
    id: "ID",
    name: "Namn",
    description: "Beskrivning",
    category: "Sorteringskategori",
    type: "Typ",
    dataType: "Datatyp",
    storage: "Lagring",
    input: "Beständig / inmatning",
    derived: "Beräknad",
    runtime: "Aktuell / speltid",
    constant: "Konstant",
    formula: "Formel",
    unit: "Enhet",
    minimum: "Minimum",
    maximum: "Maximum",
    dieSides: "Tärningssidor",
    parameters: "Parametrar",
    values: "Värden",
    effects: "Effekter",
    influences: "Påverkningar",
    table: "Tabell",
    required: "Obligatorisk",
    multiple: "Flera",
    fields: "Mallfält",
    noSelection: "Välj en post till vänster eller skapa en ny.",
    emptyGroup: "Inga poster i kategorin.",
    usedBy: "Används av",
    noItems: "Inget har skapats ännu.",
    packContent: "Paketinnehåll",
    refContent: "Referensinnehåll",
    records: "poster",
    errors: "Fel",
    warnings: "Varningar",
    json: "JSON",
    readonlyJson: "Genererad JSON är skrivskyddad.",
    valid: "Inga blockerande fel.",
    version: "Version",
    namespace: "Namnrymd",
    refName: "Referensnamn",
    packName: "Paketnamn",
    packSubtitle: "Paketetikett",
    packDescription: "Paketbeskrivning",
    key: "Nyckel",
    template: "Mall",
    localStorage:
      "Arbetsprojektet lagras bara i denna webbläsare. CCL, VTT och Bestiary läser installerade .wsgref- och .wsgpack-filer från varje användares dator.",
    flow1: "Definiera universella värden och tärningar",
    flow2: "Bygg parametrar, värden och återanvändbara effekter",
    flow3: "Skapa valfritt antal återanvändbara entitetsmallar",
    flow4: "Skapa innehåll utan att skriva JSON",
    editable: "Redigerbar i Forge",
    readOnly: "Skrivskyddad i Forge",
    exportRefs: "Exportera referenser och mallar",
    exportPack: "Exportera spelentiteter",
    exportProject: "Exportera redigerbart projekt",
    operation: "Operation",
    target: "Målatomär",
    source: "Värdekälla",
    valueLabel: "Värde",
    addOperation: "Lägg till operation",
    columns: "Kolumner",
    rows: "Rader",
    addColumn: "Lägg till kolumn",
    addRow: "Lägg till rad",
    pasteTable: "Klistra in ett kopierat Excel-område i vald cell.",
    attach: "Installera lokalt beroende",
    dependencyHelp:
      "Ett .wsgpack kräver deklarerad .wsgref. Installerade beroenden förblir lokala och bäddas endast in i projektfilen.",
    templateHelp:
      "En typ kan ha valfritt antal mallar, till exempel Vapen, Rustning och Verktyg för Föremål. Malländringar bevarar värden med oförändrade parameter-ID:n.",
    entityHelp:
      "Välj en mall och skapa sedan en entitet. ID skapas från namnrymd, typ och engelskt namn.",
    createTemplateFirst: "Skapa först minst en mall för denna entitetstyp.",
    confirmTemplateDelete:
      "När mallen tas bort tas även entiteter som skapats från den bort.",
    access: "Forge-åtkomst",
    cancel: "Avbryt",
    done: "Klar",
    confirmReset: "Skapa ett nytt rent projekt? Lokala ändringar ersätts.",
    removeBlocked:
      "Posten används fortfarande. Borttagning skapar saknade länkar och blockerar export.",
  },
} as const;

type LabelKey = keyof typeof labels.en;
const entityNames: Record<EntityType, LocalText> = {
  class: { en: "Classes", ru: "Классы", sv: "Klasser" },
  multiclass: {
    en: "Multiclass profiles",
    ru: "Профили мультикласса",
    sv: "Multiklassprofiler",
  },
  subclass: { en: "Subclasses", ru: "Подклассы", sv: "Underklasser" },
  species: { en: "Species", ru: "Виды", sv: "Arter" },
  background: { en: "Backgrounds", ru: "Предыстории", sv: "Bakgrunder" },
  feat: { en: "Feats", ru: "Черты", sv: "Talanger" },
  feature: { en: "Features", ru: "Умения", sv: "Förmågor" },
  item: { en: "Items", ru: "Предметы", sv: "Föremål" },
  spell: { en: "Spells", ru: "Заклинания", sv: "Besvärjelser" },
};

const propertyTypes: PropertyType[] = [
  "string",
  "localized_short",
  "localized_long",
  "integer",
  "decimal",
  "boolean",
  "select",
  "reference",
  "references",
  "entity",
  "entities",
  "dice",
  "table",
  "guided",
  "guided_list",
  "rule_set",
  "condition_set",
  "calculation",
  "hp_progression",
  "resource",
  "duration_rounds",
  "area",
  "damage",
  "choice_set",
  "target_selector",
];
const optionNames: Record<string, LocalText> = {
  string: { en: "Text", ru: "Текст", sv: "Text" },
  localized_short: {
    en: "Localized short text",
    ru: "Короткий переводимый текст",
    sv: "Kort lokaliserad text",
  },
  localized_long: {
    en: "Localized long text",
    ru: "Длинный переводимый текст",
    sv: "Lång lokaliserad text",
  },
  integer: { en: "Whole number", ru: "Целое число", sv: "Heltal" },
  decimal: { en: "Decimal number", ru: "Десятичное число", sv: "Decimaltal" },
  boolean: { en: "Yes / No", ru: "Да / Нет", sv: "Ja / Nej" },
  select: { en: "Single choice", ru: "Один вариант", sv: "Ett val" },
  reference: {
    en: "Reference value",
    ru: "Значение справочника",
    sv: "Referensvärde",
  },
  references: {
    en: "Reference list",
    ru: "Список значений",
    sv: "Referenslista",
  },
  entity: { en: "One entity", ru: "Одна сущность", sv: "En entitet" },
  entities: { en: "Entity list", ru: "Список сущностей", sv: "Entitetslista" },
  group: {
    en: "Structured group",
    ru: "Группа параметров",
    sv: "Strukturerad grupp",
  },
  list: {
    en: "Repeatable list",
    ru: "Повторяемый список",
    sv: "Upprepningsbar lista",
  },
  formula: {
    en: "Visual formula",
    ru: "Визуальная формула",
    sv: "Visuell formel",
  },
  condition: {
    en: "Visual condition",
    ru: "Визуальное условие",
    sv: "Visuellt villkor",
  },
  effect: { en: "Effect", ru: "Эффект", sv: "Effekt" },
  dice: { en: "Dice expression", ru: "Формула костей", sv: "Tärningsuttryck" },
  table: { en: "Table", ru: "Таблица", sv: "Tabell" },
  guided: {
    en: "Prepared form",
    ru: "Готовая форма",
    sv: "Förberett formulär",
  },
  guided_list: {
    en: "List of prepared forms",
    ru: "Список готовых форм",
    sv: "Lista med förberedda formulär",
  },
  rule_set: {
    en: "Rules and automation",
    ru: "Правила и автоматизация",
    sv: "Regler och automation",
  },
  condition_set: { en: "Conditions", ru: "Условия", sv: "Villkor" },
  calculation: {
    en: "Visual calculation",
    ru: "Визуальный расчёт",
    sv: "Visuell beräkning",
  },
  hp_progression: {
    en: "Hit Point progression",
    ru: "Рост Очков Здоровья",
    sv: "Utveckling av träffpoäng",
  },
  resource: {
    en: "Limited-use resource",
    ru: "Ресурс с ограничением использований",
    sv: "Begränsad resurs",
  },
  duration_rounds: {
    en: "Duration in rounds",
    ru: "Длительность в раундах",
    sv: "Varaktighet i rundor",
  },
  area: {
    en: "Area on the VTT map",
    ru: "Область на карте VTT",
    sv: "Område på VTT-kartan",
  },
  damage: { en: "Damage", ru: "Урон", sv: "Skada" },
  choice_set: { en: "Player choices", ru: "Выборы игрока", sv: "Spelarval" },
  target_selector: { en: "Target selection", ru: "Выбор цели", sv: "Målval" },
  add: { en: "Add", ru: "Прибавить", sv: "Lägg till" },
  subtract: { en: "Subtract", ru: "Вычесть", sv: "Subtrahera" },
  multiply: { en: "Multiply", ru: "Умножить", sv: "Multiplicera" },
  divide: { en: "Divide", ru: "Разделить", sv: "Dividera" },
  set: { en: "Set value", ru: "Задать значение", sv: "Sätt värde" },
  minimum: { en: "Set minimum", ru: "Задать минимум", sv: "Sätt minimum" },
  maximum: { en: "Set maximum", ru: "Задать максимум", sv: "Sätt maximum" },
  roll: { en: "Roll dice", ru: "Бросить кости", sv: "Slå tärningar" },
  grant: { en: "Grant", ru: "Выдать", sv: "Ge" },
  remove: { en: "Remove", ru: "Убрать", sv: "Ta bort" },
  number: { en: "Number", ru: "Число", sv: "Tal" },
  atomic: { en: "Atomic value", ru: "Атомарное значение", sv: "Atomärt värde" },
  input: {
    en: "Input parameter",
    ru: "Входной параметр",
    sv: "Indataparameter",
  },
  die: { en: "Die", ru: "Кость", sv: "Tärning" },
  enum: {
    en: "One option from a prepared list",
    ru: "Один вариант из готового списка",
    sv: "Ett alternativ från en färdig lista",
  },
  record: {
    en: "Group of related values",
    ru: "Группа связанных значений",
    sv: "Grupp med relaterade värden",
  },
  collection: {
    en: "Repeatable group",
    ru: "Повторяемая группа",
    sv: "Upprepningsbar grupp",
  },
  action: {
    en: "Action performed by an app",
    ru: "Действие программы",
    sv: "Åtgärd som utförs av programmet",
  },
  event: { en: "Game event", ru: "Игровое событие", sv: "Spelhändelse" },
  position: {
    en: "Position on the VTT map",
    ru: "Позиция на карте VTT",
    sv: "Position på VTT-kartan",
  },
  duration: {
    en: "Duration in rounds",
    ru: "Длительность в раундах",
    sv: "Varaktighet i rundor",
  },
  dice_expression: {
    en: "One or more dice",
    ru: "Одна или несколько костей",
    sv: "En eller flera tärningar",
  },
  equals: { en: "Equals", ru: "Равно", sv: "Lika med" },
  not_equals: { en: "Does not equal", ru: "Не равно", sv: "Inte lika med" },
  greater_than: { en: "Greater than", ru: "Больше", sv: "Större än" },
  at_least: { en: "At least", ru: "Не меньше", sv: "Minst" },
  less_than: { en: "Less than", ru: "Меньше", sv: "Mindre än" },
  at_most: { en: "At most", ru: "Не больше", sv: "Högst" },
};
const optionLabel = (value: string, locale: Locale) =>
  localized(optionNames[value] ?? { en: value.replaceAll("_", " ") }, locale);

function compareVersions(left: string, right: string) {
  const a = left.split(".").map(Number);
  const b = right.split(".").map(Number);
  for (let index = 0; index < 3; index += 1) {
    if ((a[index] || 0) !== (b[index] || 0))
      return (a[index] || 0) - (b[index] || 0);
  }
  return 0;
}

function loadProject() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const value = JSON.parse(saved) as ForgeProject;
      if (value.format === "wsg-forge-project" && value.schemaVersion === 3)
        return upgradeProjectCatalog(value);
    }
  } catch {
    /* A damaged local cache starts clean. */
  }
  return createCleanProject();
}

function TextField({
  label,
  value,
  onChange,
  disabled,
  hint,
  multiline,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  disabled?: boolean;
  hint?: string;
  multiline?: boolean;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
        />
      )}{" "}
      {hint && <small>{hint}</small>}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  children,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  disabled?: boolean;
}) {
  const hasCurrentOption = Children.toArray(children).some(
    (child) =>
      isValidElement<{ value?: string }>(child) && child.props.value === value,
  );
  const fallbackLabel = value
    .replaceAll("_", " ")
    .replace(/^./, (letter) => letter.toUpperCase());
  return (
    <label className="field">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      >
        {!hasCurrentOption && value && (
          <option value={value}>{fallbackLabel}</option>
        )}
        {children}
      </select>
    </label>
  );
}

function CheckField({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className="check-field">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        disabled={disabled}
      />
      <span>{label}</span>
    </label>
  );
}

function LocalizedFields({
  value,
  onChange,
  t,
  multiline = false,
  disabled = false,
}: {
  value: LocalText;
  onChange: (value: LocalText) => void;
  t: (key: LabelKey) => string;
  multiline?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="locale-grid">
      <TextField
        label={`${t(multiline ? "description" : "name")} · EN *`}
        value={value.en}
        onChange={(en) => onChange({ ...value, en })}
        multiline={multiline}
        disabled={disabled}
      />
      <TextField
        label={`${t(multiline ? "description" : "name")} · RU`}
        value={value.ru ?? ""}
        onChange={(ru) => onChange({ ...value, ru })}
        multiline={multiline}
        disabled={disabled}
      />
      <TextField
        label={`${t(multiline ? "description" : "name")} · SV`}
        value={value.sv ?? ""}
        onChange={(sv) => onChange({ ...value, sv })}
        multiline={multiline}
        disabled={disabled}
      />
    </div>
  );
}

function Panel({
  title,
  kicker,
  actions,
  children,
  className = "",
}: {
  title: string;
  kicker?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      <header className="panel-head">
        <div>
          {kicker && <span className="kicker">{kicker}</span>}
          <h2>{title}</h2>
        </div>
        {actions && <div className="panel-actions">{actions}</div>}
      </header>
      <div className="panel-body">{children}</div>
    </section>
  );
}

function App() {
  const [locale, setLocale] = useState<Locale>(
    () => (localStorage.getItem(LOCALE_KEY) as Locale) || "en",
  );
  const [project, setProject] = useState<ForgeProject>(loadProject);
  const [page, setPage] = useState<Page>("overview");
  const [dialog, setDialog] = useState<Dialog>(null);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string>("");
  const [referenceKind, setReferenceKind] =
    useState<ReferenceKind>("parameter");
  const [entityType, setEntityType] = useState<EntityType>("class");
  const [debugTab, setDebugTab] = useState<"issues" | "json">("issues");
  const [exportAccess, setExportAccess] = useState<"editable" | "read_only">(
    "editable",
  );
  const [notice, setNotice] = useState("");
  const importRef = useRef<HTMLInputElement>(null);
  const t = (key: LabelKey) => labels[locale][key] || labels.en[key];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  }, [project]);
  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);
  useEffect(() => {
    if (!selectedId) return;
    const all = [
      ...project.atomics,
      ...project.references,
      ...project.templates,
      ...project.entities,
    ];
    if (all.some((item) => item.id === selectedId)) return;
    const renamed = all.find((item) => item.previousIds?.includes(selectedId));
    if (renamed) setSelectedId(renamed.id);
  }, [project, selectedId]);

  const issues = useMemo(() => validateProject(project), [project]);
  const updateProject = (recipe: (draft: ForgeProject) => void) =>
    setProject((current) => {
      const draft = structuredClone(current);
      recipe(draft);
      draft.updatedAt = new Date().toISOString();
      return recalculateProjectIds(draft);
    });

  const changePage = (next: Page) => {
    setPage(next);
    setSelectedId("");
    setSearch("");
  };
  const resetProject = () => {
    if (!window.confirm(t("confirmReset"))) return;
    setProject(createCleanProject());
    setSelectedId("");
    setPage("overview");
    setNotice(t("clean"));
  };

  async function importFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const source = await file.text();
      if (file.name.toLowerCase().endsWith(".json")) {
        const next = JSON.parse(source) as ForgeProject;
        if (next.format !== "wsg-forge-project" || next.schemaVersion !== 3)
          throw new Error("This is not a Forge schema v3 project.");
        setProject(upgradeProjectCatalog(next));
        setNotice(`${t("import")}: ${file.name}`);
        return;
      }
      const { envelope, verified } = await decodeBundle(source);
      if (
        !verified &&
        !window.confirm("Checksum mismatch. Open this file as UNVERIFIED?")
      )
        return;
      if (envelope.format === "wsgref") {
        const payload = envelope.payload as Partial<ForgeProject> & {
          reference?: ForgeProject["reference"];
        };
        updateProject((draft) => {
          const dependencyProject = {
            ...createCleanProject(),
            ...payload,
          } as ForgeProject;
          const existing = draft.dependencies.find(
            (item) => item.refId === payload.reference?.id,
          );
          const dependency = {
            refId: payload.reference?.id ?? file.name,
            minimumVersion: payload.reference?.version ?? "0.0.0",
            compatibleMajor: Number(
              (payload.reference?.version ?? "0").split(".")[0],
            ),
            access: envelope.access,
            verified,
            embedded: dependencyProject,
          } as const;
          if (existing) Object.assign(existing, dependency);
          else draft.dependencies.push(dependency);
        });
        setPage("dependencies");
      } else {
        const payload = envelope.payload as {
          pack: ForgeProject["pack"];
          entities: ForgeEntity[];
        };
        const installedRefs = new Map<string, string>([
          [project.reference.id, project.reference.version],
          ...project.dependencies.map(
            (item) => [item.refId, item.minimumVersion] as [string, string],
          ),
        ]);
        const missing = payload.pack.requiredRefs.filter((required) => {
          const installed = installedRefs.get(required.id);
          return (
            !installed ||
            Number(installed.split(".")[0]) !== required.compatibleMajor ||
            compareVersions(installed, required.minimumVersion) < 0
          );
        });
        if (missing.length)
          throw new Error(
            `Required reference is not installed: ${missing.map((item) => item.id).join(", ")}`,
          );
        if (envelope.access === "read_only") {
          setNotice(`${file.name}: ${t("readOnly")}`);
        } else {
          updateProject((draft) => {
            draft.pack = payload.pack;
            draft.entities = payload.entities;
          });
          setPage("entities");
        }
      }
    } catch (error) {
      window.alert(error instanceof Error ? error.message : String(error));
    }
  }

  async function exportFile(kind: "json" | "wsgref" | "wsgpack") {
    if (kind !== "json" && issues.some((issue) => issue.severity === "error")) {
      setDialog("debug");
      setDebugTab("issues");
      return;
    }
    const root = kind === "wsgref" ? project.reference.id : project.pack.id;
    if (kind === "json")
      downloadText(
        `${project.namespace}.forge.json`,
        JSON.stringify(project, null, 2),
        "application/json",
      );
    else
      downloadText(
        `${root}.${kind}`,
        await encodeBundle(project, kind, exportAccess),
      );
    setDialog(null);
  }

  const nav: Array<[Page, string, number]> = [
    ["overview", t("overview"), 0],
    ["atomics", t("atomics"), project.atomics.length],
    ["references", t("references"), project.references.length],
    ["templates", t("templates"), project.templates.length],
    ["entities", t("entities"), project.entities.length],
    ["dependencies", t("dependencies"), project.dependencies.length],
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => changePage("overview")}>
          <img src="/forge-logo.svg" alt="WSGuild Forge" />
          <span>
            <strong>
              <span>WSGuild</span>
              <span>Forge</span>
            </strong>
          </span>
        </button>
        <div className="project-card">
          <span>{t("project")}</span>
          <strong>{localized(project.pack.name, locale)}</strong>
          <code>{project.pack.id}</code>
        </div>
        <nav>
          {nav.map(([id, name, count], index) => (
            <button
              key={id}
              className={page === id ? "active" : ""}
              onClick={() => changePage(id)}
            >
              <span className="nav-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{name}</span>
              {count > 0 && <em>{count}</em>}
            </button>
          ))}
        </nav>
        <div className="sidebar-foot">
          <button className="quiet" onClick={() => setDialog("settings")}>
            {t("settings")}
          </button>
          <div className="locale-switch">
            {(["en", "ru", "sv"] as Locale[]).map((id) => (
              <button
                key={id}
                className={locale === id ? "active" : ""}
                onClick={() => setLocale(id)}
              >
                {id.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div>
            <span className="eyebrow">
              {localized(project.reference.name, locale)} · {project.version}
            </span>
            <h1>{t(page)}</h1>
          </div>
          <div className="top-actions">
            <button className="button ghost" onClick={() => setDialog("debug")}>
              <span
                className={
                  issues.some((item) => item.severity === "error")
                    ? "status-dot error"
                    : "status-dot"
                }
              />
              {t("debug")}
              <b>{issues.length}</b>
            </button>
            <button
              className="button ghost"
              onClick={() => importRef.current?.click()}
            >
              {t("import")}
            </button>
            <button
              className="button primary"
              onClick={() => setDialog("export")}
            >
              {t("export")}
            </button>
            <input
              ref={importRef}
              className="hidden"
              type="file"
              accept=".json,.wsgref,.wsgpack"
              onChange={importFile}
            />
          </div>
        </header>
        {notice && (
          <button className="notice" onClick={() => setNotice("")}>
            {notice}
            <span>×</span>
          </button>
        )}
        <div className="workspace">
          {page === "overview" && (
            <Overview
              project={project}
              locale={locale}
              t={t}
              onClean={resetProject}
              onNavigate={changePage}
            />
          )}
          {page === "atomics" && (
            <CoreAtomicsPage
              project={project}
              locale={locale}
              t={t}
              search={search}
              setSearch={setSearch}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              updateProject={updateProject}
            />
          )}
          {page === "references" && (
            <ReferencesPage
              project={project}
              locale={locale}
              t={t}
              search={search}
              setSearch={setSearch}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              kind={referenceKind}
              setKind={setReferenceKind}
              updateProject={updateProject}
            />
          )}
          {page === "templates" && (
            <TemplatesPage
              project={project}
              locale={locale}
              t={t}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              updateProject={updateProject}
            />
          )}
          {page === "entities" && (
            <EntitiesPage
              project={project}
              locale={locale}
              t={t}
              type={entityType}
              setType={setEntityType}
              search={search}
              setSearch={setSearch}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              updateProject={updateProject}
            />
          )}
          {page === "dependencies" && (
            <DependenciesPage
              project={project}
              locale={locale}
              t={t}
              importRef={importRef}
              updateProject={updateProject}
            />
          )}
        </div>
      </main>

      {dialog && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setDialog(null)
          }
        >
          <div className={`modal ${dialog === "debug" ? "wide" : ""}`}>
            {dialog === "settings" && (
              <Settings
                project={project}
                locale={locale}
                t={t}
                updateProject={updateProject}
                close={() => setDialog(null)}
              />
            )}
            {dialog === "debug" && (
              <DebugDialog
                project={project}
                issues={issues}
                tab={debugTab}
                setTab={setDebugTab}
                t={t}
                close={() => setDialog(null)}
              />
            )}
            {dialog === "export" && (
              <ExportDialog
                access={exportAccess}
                setAccess={setExportAccess}
                t={t}
                close={() => setDialog(null)}
                exportFile={exportFile}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Overview({
  project,
  locale,
  t,
  onClean,
  onNavigate,
}: {
  project: ForgeProject;
  locale: Locale;
  t: (key: LabelKey) => string;
  onClean: () => void;
  onNavigate: (page: Page) => void;
}) {
  const cards: Array<[Page, string, string, number]> = [
    ["atomics", "01", t("flow1"), project.atomics.length],
    ["references", "02", t("flow2"), project.references.length],
    ["templates", "03", t("flow3"), project.templates.length],
    ["entities", "04", t("flow4"), project.entities.length],
  ];
  const subtitle = localized(project.pack.subtitle, locale);
  const description = localized(project.pack.description, locale);
  return (
    <>
      <section className="hero">
        <div>
          {subtitle && <span className="kicker">{subtitle}</span>}
          <h2>{localized(project.pack.name, locale)}</h2>
          {description && <p>{description}</p>}
          <div className="hero-actions">
            <button
              className="button primary"
              onClick={() => onNavigate("atomics")}
            >
              {t("atomics")}
            </button>
            <button className="button ghost" onClick={onClean}>
              {t("clean")}
            </button>
          </div>
        </div>
        <div className="seal">
          <span>{project.entities.length}</span>
          <small>{t("packContent")}</small>
        </div>
      </section>
      <div className="flow-grid">
        {cards.map(([page, index, text, count]) => (
          <button
            key={page}
            className="flow-card"
            onClick={() => onNavigate(page)}
          >
            <span>{index}</span>
            <strong>{t(page)}</strong>
            <p>{text}</p>
            <em>
              {count} {t("records")}
            </em>
          </button>
        ))}
      </div>
      <div className="overview-grid">
        <Panel title={t("refContent")} kicker={`v${project.reference.version}`}>
          <dl className="metrics">
            <div>
              <dt>{t("atomics")}</dt>
              <dd>{project.atomics.length}</dd>
            </div>
            <div>
              <dt>{t("references")}</dt>
              <dd>{project.references.length}</dd>
            </div>
            <div>
              <dt>{t("templates")}</dt>
              <dd>{project.templates.length}</dd>
            </div>
          </dl>
        </Panel>
        <Panel title={t("packContent")} kicker={`v${project.pack.version}`}>
          <dl className="metrics">
            <div>
              <dt>{t("entities")}</dt>
              <dd>{project.entities.length}</dd>
            </div>
            <div>
              <dt>{t("dependencies")}</dt>
              <dd>{project.dependencies.length}</dd>
            </div>
            <div>
              <dt>{t("version")}</dt>
              <dd>{project.pack.version}</dd>
            </div>
          </dl>
        </Panel>
      </div>
      <div className="info-strip">{t("localStorage")}</div>
    </>
  );
}

interface CollectionProps {
  project: ForgeProject;
  locale: Locale;
  t: (key: LabelKey) => string;
  search: string;
  setSearch: (value: string) => void;
  selectedId: string;
  setSelectedId: (value: string) => void;
  updateProject: (recipe: (draft: ForgeProject) => void) => void;
}

function CollectionLayout({
  toolbar,
  list,
  editor,
}: {
  toolbar: ReactNode;
  list: ReactNode;
  editor: ReactNode;
}) {
  return (
    <>
      <div className="collection-toolbar">{toolbar}</div>
      <div className="collection-layout">
        <aside className="record-list">{list}</aside>
        <div className="record-editor">{editor}</div>
      </div>
    </>
  );
}

function GroupedList({
  items,
  categories,
  locale,
  selectedId,
  setSelectedId,
  empty,
}: {
  items: Array<{
    id: string;
    name: LocalText;
    categoryId: string;
    locked: boolean;
  }>;
  categories: ForgeProject["categories"];
  locale: Locale;
  selectedId: string;
  setSelectedId: (id: string) => void;
  empty: string;
}) {
  if (!items.length) return <div className="empty">{empty}</div>;
  const used = categories.filter((category) =>
    items.some((item) => item.categoryId === category.id),
  );
  return (
    <>
      {used.map((category) => (
        <details key={category.id} open>
          <summary>
            <span>{localized(category.name, locale)}</span>
            <em>
              {items.filter((item) => item.categoryId === category.id).length}
            </em>
          </summary>
          <div>
            {items
              .filter((item) => item.categoryId === category.id)
              .map((item) => (
                <button
                  key={item.id}
                  className={selectedId === item.id ? "selected" : ""}
                  onClick={() => setSelectedId(item.id)}
                >
                  <span>{localized(item.name, locale)}</span>
                  <small>{item.locked ? "WSG" : item.id.split(".")[0]}</small>
                </button>
              ))}
          </div>
        </details>
      ))}
    </>
  );
}

function AtomicsPage(props: CollectionProps) {
  const {
    project,
    locale,
    t,
    search,
    setSearch,
    selectedId,
    setSelectedId,
    updateProject,
  } = props;
  const filtered = project.atomics.filter((item) =>
    `${localized(item.name, locale)} ${item.id}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const selected = project.atomics.find(
    (item) => item.id === selectedId || item.previousIds.includes(selectedId),
  );
  const create = () => {
    const index = project.atomics.filter((item) => !item.locked).length + 1;
    const id = `${project.namespace}.atomic.atomic_${index}`;
    updateProject((draft) => {
      const item: AtomicRecord = {
        id,
        key: `atomic_${index}`,
        name: { en: `Atomic ${index}` },
        description: { en: "" },
        categoryId: "wsg.category.custom",
        dataType: "integer",
        storageMode: "input",
        packId: draft.namespace,
        locked: false,
        previousIds: [],
      };
      draft.atomics.push(item);
    });
    setSelectedId(id);
  };
  const remove = () => {
    if (!selected || selected.locked) return;
    const used = project.references.some((item) =>
      item.operations?.some(
        (operation) => operation.targetAtomicId === selected.id,
      ),
    );
    if (used && !window.confirm(t("removeBlocked"))) return;
    updateProject((draft) => {
      draft.atomics = draft.atomics.filter((item) => item.id !== selected.id);
    });
    setSelectedId("");
  };
  return (
    <CollectionLayout
      toolbar={
        <>
          <input
            className="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("search")}
          />
          <button className="button primary" onClick={create}>
            + {t("add")}
          </button>
        </>
      }
      list={
        <GroupedList
          items={filtered}
          categories={project.categories}
          locale={locale}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          empty={t("noItems")}
        />
      }
      editor={
        selected ? (
          <Panel
            title={localized(selected.name, locale)}
            kicker={selected.locked ? t("locked") : t("custom")}
            actions={
              !selected.locked && (
                <button className="icon-button danger" onClick={remove}>
                  ×
                </button>
              )
            }
          >
            <div className="editor-stack">
              <LocalizedFields
                value={selected.name}
                t={t}
                disabled={selected.locked}
                onChange={(name) =>
                  updateProject((draft) => {
                    Object.assign(
                      draft.atomics.find((item) => item.id === selected.id)!,
                      { name },
                    );
                  })
                }
              />
              <div className="form-grid four">
                <SelectField
                  label={t("category")}
                  value={selected.categoryId}
                  disabled={selected.locked}
                  onChange={(categoryId) =>
                    updateProject((draft) => {
                      draft.atomics.find(
                        (item) => item.id === selected.id,
                      )!.categoryId = categoryId;
                    })
                  }
                >
                  {project.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {localized(category.name, locale)}
                    </option>
                  ))}
                </SelectField>
                <SelectField
                  label={t("dataType")}
                  value={selected.dataType}
                  disabled={selected.locked}
                  onChange={(dataType) =>
                    updateProject((draft) => {
                      draft.atomics.find(
                        (item) => item.id === selected.id,
                      )!.dataType = dataType as AtomicDataType;
                    })
                  }
                >
                  {["integer", "decimal", "boolean", "text", "die"].map(
                    (value) => (
                      <option key={value}>{value}</option>
                    ),
                  )}
                </SelectField>
                <SelectField
                  label={t("storage")}
                  value={selected.storageMode}
                  disabled={selected.locked || selected.dataType === "die"}
                  onChange={(storageMode) =>
                    updateProject((draft) => {
                      draft.atomics.find(
                        (item) => item.id === selected.id,
                      )!.storageMode = storageMode as StorageMode;
                    })
                  }
                >
                  <option value="input">{t("input")}</option>
                  <option value="derived">{t("derived")}</option>
                  <option value="runtime">{t("runtime")}</option>
                </SelectField>
                <TextField
                  label={t("unit")}
                  value={selected.unit ?? ""}
                  disabled={selected.locked}
                  onChange={(unit) =>
                    updateProject((draft) => {
                      draft.atomics.find(
                        (item) => item.id === selected.id,
                      )!.unit = unit;
                    })
                  }
                />
              </div>
              <div className="form-grid four">
                <TextField
                  label={t("minimum")}
                  value={selected.minimum ?? ""}
                  disabled={selected.locked}
                  onChange={(minimum) =>
                    updateProject((draft) => {
                      draft.atomics.find(
                        (item) => item.id === selected.id,
                      )!.minimum = minimum === "" ? undefined : Number(minimum);
                    })
                  }
                />
                <TextField
                  label={t("maximum")}
                  value={selected.maximum ?? ""}
                  disabled={selected.locked}
                  onChange={(maximum) =>
                    updateProject((draft) => {
                      draft.atomics.find(
                        (item) => item.id === selected.id,
                      )!.maximum = maximum === "" ? undefined : Number(maximum);
                    })
                  }
                />
                {selected.dataType === "die" && (
                  <TextField
                    label={t("dieSides")}
                    value={selected.dieSides ?? ""}
                    disabled={selected.locked}
                    onChange={(dieSides) =>
                      updateProject((draft) => {
                        draft.atomics.find(
                          (item) => item.id === selected.id,
                        )!.dieSides = Number(dieSides);
                      })
                    }
                  />
                )}
                {selected.storageMode === "derived" && (
                  <TextField
                    label={t("formula")}
                    value={selected.formula ?? ""}
                    disabled={selected.locked}
                    onChange={(formula) =>
                      updateProject((draft) => {
                        draft.atomics.find(
                          (item) => item.id === selected.id,
                        )!.formula = formula;
                      })
                    }
                  />
                )}
              </div>
            </div>
          </Panel>
        ) : (
          <div className="empty editor-empty">{t("noSelection")}</div>
        )
      }
    />
  );
}

const atomicDataTypes: AtomicDataType[] = [
  "integer",
  "decimal",
  "boolean",
  "text",
  "die",
  "enum",
  "reference",
  "record",
  "collection",
  "action",
  "event",
  "position",
  "duration",
  "dice_expression",
];

function CoreAtomicsPage(props: CollectionProps) {
  const {
    project,
    locale,
    t,
    search,
    setSearch,
    selectedId,
    setSelectedId,
    updateProject,
  } = props;
  const filtered = project.atomics.filter((item) =>
    `${localized(item.name, locale)} ${item.id}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const selected = project.atomics.find(
    (item) => item.id === selectedId || item.previousIds.includes(selectedId),
  );
  const label = (en: string, ru: string, sv: string) =>
    ({ en, ru, sv })[locale];
  const mutate = (recipe: (item: AtomicRecord) => void) =>
    updateProject((draft) => {
      const item = draft.atomics.find(
        (entry) =>
          entry.id === selected?.id ||
          entry.previousIds.includes(selected?.id ?? ""),
      );
      if (item) recipe(item);
    });
  const create = () => {
    const index =
      project.atomics.filter((item) => item.packId !== "wsg").length + 1;
    const id = `${project.namespace}.atomic.atomic_${index}`;
    updateProject((draft) =>
      draft.atomics.push({
        id,
        key: `atomic_${index}`,
        name: { en: `Atomic ${index}` },
        description: { en: "" },
        categoryId: "wsg.category.custom",
        dataType: "integer",
        storageMode: "input",
        packId: draft.namespace,
        locked: false,
        previousIds: [],
      }),
    );
    setSelectedId(id);
  };
  const remove = () => {
    if (!selected) return;
    if (selected.locked) return;
    const usedBy = [
      ...project.atomics
        .filter(
          (item) =>
            item.dependencyIds?.includes(selected.id) ||
            item.fields?.some((field) => field.atomicId === selected.id),
        )
        .map((item) => item.id),
      ...project.references
        .filter((item) =>
          JSON.stringify(item.ruleSet ?? {}).includes(`"${selected.id}"`),
        )
        .map((item) => item.id),
    ];
    const warning = usedBy.length
      ? `${t("removeBlocked")}\n\n${usedBy.join("\n")}`
      : `${t("delete")}: ${localized(selected.name, locale)}?`;
    if (!window.confirm(warning)) return;
    updateProject((draft) => {
      draft.atomics = draft.atomics.filter((item) => item.id !== selected.id);
    });
    setSelectedId("");
  };
  const addField = () =>
    mutate((item) => {
      const index = (item.fields?.length ?? 0) + 1;
      item.fields = [
        ...(item.fields ?? []),
        {
          id: `field_${index}`,
          key: `field_${index}`,
          name: { en: `Field ${index}` },
          dataType: "integer",
          required: false,
        },
      ];
    });
  return (
    <CollectionLayout
      toolbar={
        <>
          <input
            className="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("search")}
          />
          <button className="button primary" onClick={create}>
            + {t("add")}
          </button>
        </>
      }
      list={
        <GroupedList
          items={filtered}
          categories={project.categories}
          locale={locale}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          empty={t("noItems")}
        />
      }
      editor={
        selected ? (
          <Panel
            title={localized(selected.name, locale)}
            kicker={selected.packId === "wsg" ? "WSG CORE" : t("custom")}
            actions={
              !selected.locked && (
                <button className="icon-button danger" onClick={remove}>
                  ×
                </button>
              )
            }
          >
            <div className="editor-stack">
              <LocalizedFields
                value={selected.name}
                t={t}
                disabled={selected.locked}
                onChange={(name) =>
                  mutate((item) => {
                    item.name = name;
                  })
                }
              />
              <LocalizedFields
                value={selected.description}
                t={t}
                multiline
                disabled={selected.locked}
                onChange={(description) =>
                  mutate((item) => {
                    item.description = description;
                  })
                }
              />
              <div className="form-grid four">
                <SelectField
                  label={t("category")}
                  value={selected.categoryId}
                  disabled={selected.locked}
                  onChange={(categoryId) =>
                    mutate((item) => {
                      item.categoryId = categoryId;
                    })
                  }
                >
                  {project.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {localized(category.name, locale)}
                    </option>
                  ))}
                </SelectField>
                <SelectField
                  label={t("dataType")}
                  value={selected.dataType}
                  disabled={selected.locked}
                  onChange={(dataType) =>
                    mutate((item) => {
                      item.dataType = dataType as AtomicDataType;
                    })
                  }
                >
                  {atomicDataTypes.map((value) => (
                    <option key={value} value={value}>
                      {optionLabel(value, locale)}
                    </option>
                  ))}
                </SelectField>
                <SelectField
                  label={t("storage")}
                  value={selected.storageMode}
                  disabled={selected.locked}
                  onChange={(storageMode) =>
                    mutate((item) => {
                      item.storageMode = storageMode as StorageMode;
                    })
                  }
                >
                  <option value="input">{t("input")}</option>
                  <option value="derived">{t("derived")}</option>
                  <option value="runtime">{t("runtime")}</option>
                  <option value="constant">{t("constant")}</option>
                </SelectField>
                <TextField
                  label={t("unit")}
                  value={selected.unit ?? ""}
                  disabled={selected.locked}
                  onChange={(unit) =>
                    mutate((item) => {
                      item.unit = unit || undefined;
                    })
                  }
                />
                <TextField
                  label={t("minimum")}
                  value={selected.minimum ?? ""}
                  disabled={selected.locked}
                  onChange={(value) =>
                    mutate((item) => {
                      item.minimum = value === "" ? undefined : Number(value);
                    })
                  }
                />
                <TextField
                  label={t("maximum")}
                  value={selected.maximum ?? ""}
                  disabled={selected.locked}
                  onChange={(value) =>
                    mutate((item) => {
                      item.maximum = value === "" ? undefined : Number(value);
                    })
                  }
                />
                {selected.dataType === "die" && (
                  <TextField
                    label={t("dieSides")}
                    value={selected.dieSides ?? ""}
                    disabled={selected.locked}
                    onChange={(value) =>
                      mutate((item) => {
                        item.dieSides = Number(value);
                        item.minimum = 1;
                        item.maximum = Number(value);
                      })
                    }
                  />
                )}
                <CheckField
                  label={label(
                    "Warning only",
                    "Только предупреждение",
                    "Endast varning",
                  )}
                  checked={Boolean(selected.warningOnly)}
                  disabled={selected.locked}
                  onChange={(warningOnly) =>
                    mutate((item) => {
                      item.warningOnly = warningOnly;
                    })
                  }
                />
              </div>
              {selected.storageMode === "derived" && !selected.locked && (
                <section className="dynamic-card">
                  <span className="dynamic-label">
                    {label(
                      "How this value is calculated",
                      "Как рассчитывается это значение",
                      "Hur v\u00e4rdet ber\u00e4knas",
                    )}
                  </span>
                  <ValueExpressionEditor
                    value={selected.calculation}
                    project={project}
                    locale={locale}
                    onChange={(calculation) =>
                      mutate((item) => {
                        item.calculation = calculation;
                        item.formula = undefined;
                      })
                    }
                  />
                </section>
              )}
              <LocalizedFields
                value={selected.rule ?? { en: "" }}
                t={t}
                multiline
                disabled={selected.locked}
                onChange={(rule) =>
                  mutate((item) => {
                    item.rule = rule;
                  })
                }
              />
              <MultiPicker
                label={label("Dependencies", "Зависимости", "Beroenden")}
                value={selected.dependencyIds ?? []}
                disabled={selected.locked}
                options={project.atomics
                  .filter((item) => item.id !== selected.id)
                  .map((item) => ({
                    id: item.id,
                    name: localized(item.name, locale),
                  }))}
                onChange={(dependencyIds) =>
                  mutate((item) => {
                    item.dependencyIds = dependencyIds;
                  })
                }
              />
              <div className="subsection">
                <div className="subsection-head">
                  <div>
                    <span className="kicker">STRUCTURE</span>
                    <h3>{label("Fields", "Поля", "Fält")}</h3>
                  </div>
                  {!selected.locked && (
                    <button className="button ghost compact" onClick={addField}>
                      + {t("add")}
                    </button>
                  )}
                </div>
                {(selected.fields ?? []).length === 0 ? (
                  <div className="empty">{t("noItems")}</div>
                ) : (
                  <div className="editor-stack">
                    {(selected.fields ?? []).map((field, index) => (
                      <AtomicFieldEditor
                        key={field.id}
                        field={field}
                        index={index}
                        project={project}
                        locale={locale}
                        disabled={selected.locked}
                        remove={() =>
                          mutate((item) => {
                            item.fields = item.fields?.filter(
                              (_, current) => current !== index,
                            );
                          })
                        }
                        change={(patch) =>
                          mutate((item) => {
                            if (item.fields?.[index])
                              Object.assign(item.fields[index], patch);
                          })
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Panel>
        ) : (
          <div className="empty editor-empty">{t("noSelection")}</div>
        )
      }
    />
  );
}

function AtomicFieldEditor({
  field,
  index,
  project,
  locale,
  disabled,
  change,
  remove,
}: {
  field: AtomicField;
  index: number;
  project: ForgeProject;
  locale: Locale;
  disabled: boolean;
  change: (patch: Partial<AtomicField>) => void;
  remove: () => void;
}) {
  const label = (en: string, ru: string, sv: string) =>
    ({ en, ru, sv })[locale];
  const optionGroups = [
    ...new Set(
      project.references
        .map((item) => item.optionGroup)
        .filter(Boolean) as string[],
    ),
  ].map((id) => {
    const sample = project.references.find((item) => item.optionGroup === id);
    const category = project.categories.find(
      (item) => item.id === sample?.categoryId,
    );
    return {
      id,
      name: category
        ? localized(category.name, locale)
        : id.replaceAll("_", " "),
    };
  });
  return (
    <div className="dynamic-card">
      <div className="subsection-head">
        <span className="step">{index + 1}</span>
        <strong>{localized(field.name, locale)}</strong>
        {!disabled && (
          <button className="icon-button danger" onClick={remove}>
            ×
          </button>
        )}
      </div>
      <div className="form-grid three">
        <TextField
          label="EN *"
          value={field.name.en}
          disabled={disabled}
          onChange={(en) =>
            change({
              name: { ...field.name, en },
              key: slugify(en),
              id: slugify(en) || field.id,
            })
          }
        />
        <TextField
          label="RU"
          value={field.name.ru ?? ""}
          disabled={disabled}
          onChange={(ru) => change({ name: { ...field.name, ru } })}
        />
        <TextField
          label="SV"
          value={field.name.sv ?? ""}
          disabled={disabled}
          onChange={(sv) => change({ name: { ...field.name, sv } })}
        />
        <SelectField
          label={label("Data type", "Тип данных", "Datatyp")}
          value={field.dataType}
          disabled={disabled}
          onChange={(dataType) =>
            change({ dataType: dataType as AtomicDataType })
          }
        >
          {atomicDataTypes.map((value) => (
            <option key={value} value={value}>
              {optionLabel(value, locale)}
            </option>
          ))}
        </SelectField>
        <SelectField
          label={label("Storage override", "Режим хранения", "Lagringsläge")}
          value={field.storageMode ?? ""}
          disabled={disabled}
          onChange={(storageMode) =>
            change({
              storageMode: storageMode
                ? (storageMode as StorageMode)
                : undefined,
            })
          }
        >
          <option value="">—</option>
          <option value="input">Input</option>
          <option value="derived">Derived</option>
          <option value="runtime">Runtime</option>
          <option value="constant">Constant</option>
        </SelectField>
        <TextField
          label={label("Unit", "Единица", "Enhet")}
          value={field.unit ?? ""}
          disabled={disabled}
          onChange={(unit) => change({ unit: unit || undefined })}
        />
        {!disabled && (
          <SelectField
            label={label(
              "Allowed values",
              "Допустимые значения",
              "Tillåtna värden",
            )}
            value={field.optionGroup ?? ""}
            onChange={(optionGroup) =>
              change({ optionGroup: optionGroup || undefined })
            }
          >
            <option value="">
              {label(
                "No prepared list",
                "Без готового списка",
                "Ingen förberedd lista",
              )}
            </option>
            {optionGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </SelectField>
        )}
        <SelectField
          label={label(
            "Atomic structure",
            "Атомарная структура",
            "Atomär struktur",
          )}
          value={field.atomicId ?? ""}
          disabled={disabled}
          onChange={(atomicId) => change({ atomicId: atomicId || undefined })}
        >
          <option value="">—</option>
          {project.atomics.map((item) => (
            <option key={item.id} value={item.id}>
              {localized(item.name, locale)}
            </option>
          ))}
        </SelectField>
        <div className="checks">
          <CheckField
            label={label("Required", "Обязательно", "Obligatoriskt")}
            checked={field.required}
            disabled={disabled}
            onChange={(required) => change({ required })}
          />
          <CheckField
            label={label("Multiple", "Несколько", "Flera")}
            checked={Boolean(field.multiple)}
            disabled={disabled}
            onChange={(multiple) => change({ multiple })}
          />
        </div>
      </div>
    </div>
  );
}

function ReferencesPage(
  props: CollectionProps & {
    kind: ReferenceKind;
    setKind: (kind: ReferenceKind) => void;
  },
) {
  const {
    project,
    locale,
    t,
    search,
    setSearch,
    selectedId,
    setSelectedId,
    updateProject,
    kind,
    setKind,
  } = props;
  const filtered = project.references.filter(
    (item) =>
      item.kind === kind &&
      `${localized(item.name, locale)} ${item.id}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const selected = project.references.find(
    (item) => item.id === selectedId || item.previousIds.includes(selectedId),
  );
  const create = () => {
    const index =
      project.references.filter((item) => item.kind === kind && !item.locked)
        .length + 1;
    const id = `${project.namespace}.ref.${kind}.${kind}_${index}`;
    updateProject((draft) => {
      const item: ReferenceRecord = {
        id,
        key: `${kind}_${index}`,
        kind,
        name: { en: `${kind[0].toUpperCase()}${kind.slice(1)} ${index}` },
        description: { en: "" },
        categoryId: "wsg.category.custom",
        packId: draft.namespace,
        locked: false,
        previousIds: [],
        propertyType: kind === "parameter" ? "string" : undefined,
      };
      draft.references.push(item);
    });
    setSelectedId(id);
  };
  const remove = () => {
    if (!selected || selected.locked) return;
    const used = project.templates.some((item) =>
      item.fields.some((field) => field.referenceId === selected.id),
    );
    if (used && !window.confirm(t("removeBlocked"))) return;
    updateProject((draft) => {
      draft.references = draft.references.filter(
        (item) => item.id !== selected.id,
      );
    });
    setSelectedId("");
  };
  return (
      <CollectionLayout
        toolbar={
          <>
            <div className="segmented">
              {(["parameter", "value"] as ReferenceKind[]).map(
                (id) => (
                  <button
                    key={id}
                    className={kind === id ? "active" : ""}
                    onClick={() => {
                      setKind(id);
                      setSelectedId("");
                    }}
                  >
                    {t(id === "parameter" ? "parameters" : "values")}
                  </button>
                ),
              )}
            </div>
            <input
              className="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("search")}
            />
            <button className="button primary" onClick={create}>
              + {t("add")}
            </button>
          </>
        }
        list={
          <GroupedList
            items={filtered}
            categories={project.categories}
            locale={locale}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            empty={t("noItems")}
          />
        }
        editor={
          selected ? (
            <ReferenceEditor
              item={selected}
              project={project}
              locale={locale}
              t={t}
              updateProject={updateProject}
              remove={remove}
            />
          ) : (
            <div className="empty editor-empty">{t("noSelection")}</div>
          )
        }
      />
  );
}

function ReferenceEditor({
  item,
  project,
  locale,
  t,
  updateProject,
  remove,
}: {
  item: ReferenceRecord;
  project: ForgeProject;
  locale: Locale;
  t: (key: LabelKey) => string;
  updateProject: (recipe: (draft: ForgeProject) => void) => void;
  remove: () => void;
}) {
  const change = (patch: Partial<ReferenceRecord>) =>
    updateProject((draft) =>
      Object.assign(
        draft.references.find((entry) => entry.id === item.id)!,
        patch,
      ),
    );
  const locked = item.locked;
  return (
    <Panel
      title={localized(item.name, locale)}
      kicker={`${item.kind} · ${locked ? t("locked") : t("custom")}`}
      actions={
        !locked && (
          <button className="icon-button danger" onClick={remove}>
            ×
          </button>
        )
      }
    >
      <div className="editor-stack">
        <LocalizedFields
          value={item.name}
          t={t}
          disabled={locked}
          onChange={(name) => change({ name })}
        />
        <LocalizedFields
          value={item.description}
          t={t}
          multiline
          disabled={locked}
          onChange={(description) => change({ description })}
        />
        <div className="form-grid three">
          <SelectField
            label={t("category")}
            value={item.categoryId}
            disabled={locked}
            onChange={(categoryId) => change({ categoryId })}
          >
            {project.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {localized(category.name, locale)}
              </option>
            ))}
          </SelectField>
          {item.kind === "parameter" && (
            <SelectField
              label={t("dataType")}
              value={item.propertyType ?? "string"}
              disabled={locked}
              onChange={(propertyType) =>
                change({
                  propertyType: propertyType as PropertyType,
                  table:
                    propertyType === "table"
                      ? (item.table ?? { columns: [], rows: [] })
                      : undefined,
                })
              }
            >
              {propertyTypes.map((value) => (
                <option key={value} value={value}>
                  {optionLabel(value, locale)}
                </option>
              ))}
            </SelectField>
          )}
          {item.kind === "parameter" && (
            <div className="checks">
              <CheckField
                label={t("required")}
                checked={Boolean(item.required)}
                disabled={locked}
                onChange={(required) => change({ required })}
              />
              <CheckField
                label={t("multiple")}
                checked={Boolean(item.multiple)}
                disabled={locked}
                onChange={(multiple) => change({ multiple })}
              />
            </div>
          )}
        </div>
        {item.kind === "parameter" && item.propertyType === "table" && (
          <TableBuilder
            definition={item.table ?? { columns: [], rows: [] }}
            disabled={locked}
            t={t}
            locale={locale}
            onChange={(table) => change({ table })}
          />
        )}
        {item.kind === "effect" && (
          <div className={locked ? "read-only-surface" : ""}>
            <RuleSetEditor
              label={
                locale === "ru"
                  ? "Что делает этот эффект"
                  : locale === "sv"
                    ? "Vad effekten g\u00f6r"
                    : "What this effect does"
              }
              value={item.ruleSet}
              project={project}
              locale={locale}
              onChange={(ruleSet) => change({ ruleSet, operations: undefined })}
            />
          </div>
        )}
        {item.kind === "value" && (
          <TextField
            label={t("valueLabel")}
            value={String(item.value ?? "")}
            disabled={locked}
            onChange={(value) => change({ value })}
          />
        )}
      </div>
    </Panel>
  );
}

function TableBuilder({
  definition,
  disabled,
  t,
  locale,
  onChange,
}: {
  definition: TableDefinition;
  disabled: boolean;
  t: (key: LabelKey) => string;
  locale: Locale;
  onChange: (definition: TableDefinition) => void;
}) {
  const updateColumn = (
    index: number,
    patch: Partial<TableDefinition["columns"][number]>,
  ) =>
    onChange({
      ...definition,
      columns: definition.columns.map((column, current) =>
        current === index ? { ...column, ...patch } : column,
      ),
    });
  const addColumn = () => {
    const index = definition.columns.length + 1;
    onChange({
      ...definition,
      columns: [
        ...definition.columns,
        {
          id: `column_${index}`,
          key: `column_${index}`,
          name: { en: `Column ${index}` },
          type: "string",
          required: index === 1,
        },
      ],
    });
  };
  const addRow = () => {
    if (
      definition.maximumRows &&
      definition.rows.length >= definition.maximumRows
    )
      return;
    const values = Object.fromEntries(
      definition.columns.map((column, index) => [
        column.id,
        definition.keyMode === "sequential" && index === 0
          ? definition.rows.length + 1
          : "",
      ]),
    );
    onChange({
      ...definition,
      rows: [...definition.rows, { rowId: crypto.randomUUID(), values }],
    });
  };
  const setCell = (row: number, columnId: string, value: string) => {
    if (
      definition.keyMode === "sequential" &&
      definition.columns[0]?.id === columnId
    )
      return;
    onChange({
      ...definition,
      rows: definition.rows.map((entry, index) =>
        index === row
          ? { ...entry, values: { ...entry.values, [columnId]: value } }
          : entry,
      ),
    });
  };
  const paste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number,
  ) => {
    const matrix = event.clipboardData
      .getData("text")
      .trimEnd()
      .split(/\r?\n/)
      .map((row) => row.split("\t"));
    if (matrix.length === 1 && matrix[0].length === 1) return;
    event.preventDefault();
    const rows = structuredClone(definition.rows);
    while (rows.length < rowIndex + matrix.length)
      rows.push({ rowId: crypto.randomUUID(), values: {} });
    matrix.forEach((values, rowOffset) =>
      values.forEach((value, columnOffset) => {
        const column = definition.columns[columnIndex + columnOffset];
        if (
          column &&
          !(
            definition.keyMode === "sequential" &&
            columnIndex + columnOffset === 0
          )
        )
          rows[rowIndex + rowOffset].values[column.id] = value;
      }),
    );
    if (definition.keyMode === "sequential")
      rows.forEach((row, index) => {
        if (definition.columns[0])
          row.values[definition.columns[0].id] = index + 1;
      });
    onChange({ ...definition, rows });
  };
  return (
    <div className="subsection table-builder">
      <div className="subsection-head">
        <div>
          <span className="kicker">{t("table")}</span>
          <h3>{t("columns")}</h3>
        </div>
        {!disabled && (
          <button className="button ghost compact" onClick={addColumn}>
            + {t("addColumn")}
          </button>
        )}
      </div>
      <p className="hint">{t("pasteTable")}</p>
      <div className="column-cards">
        {definition.columns.map((column, index) => (
          <div className="column-card" key={column.id}>
            <span className="step">{index + 1}</span>
            <div className="column-locales">
              <TextField
                label={`${index === 0 ? `${t("name")} · KEY` : t("name")} · EN`}
                value={column.name.en}
                disabled={disabled}
                onChange={(en) =>
                  updateColumn(index, {
                    name: { ...column.name, en },
                    key: slugify(en),
                    id: slugify(en) || column.id,
                  })
                }
              />
              <TextField
                label={`${t("name")} · RU`}
                value={column.name.ru ?? ""}
                disabled={disabled}
                onChange={(ru) =>
                  updateColumn(index, { name: { ...column.name, ru } })
                }
              />
              <TextField
                label={`${t("name")} · SV`}
                value={column.name.sv ?? ""}
                disabled={disabled}
                onChange={(sv) =>
                  updateColumn(index, { name: { ...column.name, sv } })
                }
              />
            </div>
            <SelectField
              label={t("dataType")}
              value={column.type}
              disabled={disabled}
              onChange={(type) =>
                updateColumn(index, { type: type as PropertyType })
              }
            >
              {propertyTypes
                .filter((value) => value !== "table")
                .map((value) => (
                  <option key={value} value={value}>
                    {optionLabel(value, locale)}
                  </option>
                ))}
            </SelectField>
            {!disabled && (
              <button
                className="icon-button danger"
                onClick={() =>
                  onChange({
                    ...definition,
                    columns: definition.columns.filter(
                      (_, current) => current !== index,
                    ),
                    rows: definition.rows.map((row) => ({
                      ...row,
                      values: Object.fromEntries(
                        Object.entries(row.values).filter(
                          ([key]) => key !== column.id,
                        ),
                      ),
                    })),
                  })
                }
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
      {definition.columns.length > 0 && (
        <>
          <div className="spreadsheet">
            <table>
              <thead>
                <tr>
                  {definition.columns.map((column, index) => (
                    <th key={column.id}>
                      {index === 0 && <small>KEY</small>}
                      {column.name.en}
                    </th>
                  ))}
                  {!disabled && <th className="row-action" />}
                </tr>
              </thead>
              <tbody>
                {definition.rows.map((row, rowIndex) => (
                  <tr key={row.rowId}>
                    {definition.columns.map((column, columnIndex) => (
                      <td key={column.id}>
                        <input
                          value={String(row.values[column.id] ?? "")}
                          disabled={disabled}
                          readOnly={
                            definition.keyMode === "sequential" &&
                            columnIndex === 0
                          }
                          onChange={(event) =>
                            setCell(rowIndex, column.id, event.target.value)
                          }
                          onPaste={(event) =>
                            paste(event, rowIndex, columnIndex)
                          }
                        />
                      </td>
                    ))}
                    {!disabled && (
                      <td className="row-action">
                        <button
                          onClick={() =>
                            onChange({
                              ...definition,
                              rows: definition.rows
                                .filter((_, index) => index !== rowIndex)
                                .map((entry, index) =>
                                  definition.keyMode === "sequential" &&
                                  definition.columns[0]
                                    ? {
                                        ...entry,
                                        values: {
                                          ...entry.values,
                                          [definition.columns[0].id]: index + 1,
                                        },
                                      }
                                    : entry,
                                ),
                            })
                          }
                        >
                          ×
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!disabled && (
            <button
              className="button ghost compact"
              disabled={Boolean(
                definition.maximumRows &&
                  definition.rows.length >= definition.maximumRows,
              )}
              onClick={addRow}
            >
              + {t("addRow")}
            </button>
          )}
        </>
      )}
    </div>
  );
}

function TemplatesPage({
  project,
  locale,
  t,
  selectedId,
  setSelectedId,
  updateProject,
}: Omit<CollectionProps, "search" | "setSearch">) {
  const [type, setType] = useState<EntityType>("class");
  const visible = project.templates.filter((item) => item.type === type);
  const selected = project.templates.find(
    (item) => item.id === selectedId || item.previousIds.includes(selectedId),
  );
  const create = () => {
    const index = visible.length + 1;
    const english = `${entityNames[type].en} Template ${index}`;
    const id = `${project.namespace}.temp.${slugify(english)}`;
    updateProject((draft) => {
      draft.templates.push({
        id,
        type,
        categoryId: "wsg.category.custom",
        name: { en: english },
        fields: [],
        previousIds: [],
      });
    });
    setSelectedId(id);
  };
  const remove = () => {
    if (!selected) return;
    const linked = project.entities.filter(
      (entity) => entity.templateId === selected.id,
    );
    const message = linked.length
      ? `${t("confirmTemplateDelete")}\n\n${linked.map((entity) => `• ${localized(entity.name, locale)}`).join("\n")}`
      : `${t("delete")}: ${localized(selected.name, locale)}?`;
    if (!window.confirm(message)) return;
    updateProject((draft) => {
      draft.templates = draft.templates.filter(
        (item) => item.id !== selected.id,
      );
      draft.entities = draft.entities.filter(
        (entity) => entity.templateId !== selected.id,
      );
    });
    setSelectedId("");
  };
  const groups = project.categories.filter((category) =>
    visible.some((template) => template.categoryId === category.id),
  );
  return (
    <>
      <div className="entity-tabs">
        {ENTITY_TYPES.map((id) => (
          <button
            key={id}
            className={type === id ? "active" : ""}
            onClick={() => {
              setType(id);
              setSelectedId("");
            }}
          >
            {localized(entityNames[id], locale)}
            <em>
              {project.templates.filter((item) => item.type === id).length}
            </em>
          </button>
        ))}
      </div>
      <div className="info-strip">{t("templateHelp")}</div>
      <CollectionLayout
        toolbar={
          <>
            <div className="toolbar-title">
              {localized(entityNames[type], locale)}
            </div>
            <button className="button primary" onClick={create}>
              + {t("add")}
            </button>
          </>
        }
        list={
          visible.length ? (
            groups.map((category) => (
              <details key={category.id} open>
                <summary>
                  <span>{localized(category.name, locale)}</span>
                  <em>
                    {
                      visible.filter(
                        (template) => template.categoryId === category.id,
                      ).length
                    }
                  </em>
                </summary>
                <div>
                  {visible
                    .filter((template) => template.categoryId === category.id)
                    .map((template) => (
                      <button
                        key={template.id}
                        className={
                          selected?.id === template.id ? "selected" : ""
                        }
                        onClick={() => setSelectedId(template.id)}
                      >
                        <span>{localized(template.name, locale)}</span>
                        <small>{template.id}</small>
                      </button>
                    ))}
                </div>
              </details>
            ))
          ) : (
            <div className="empty">{t("noItems")}</div>
          )
        }
        editor={
          selected && selected.type === type ? (
            <Panel
              title={localized(selected.name, locale)}
              kicker={selected.id}
              actions={
                <button className="icon-button danger" onClick={remove}>
                  ×
                </button>
              }
            >
              <TemplateEditor
                template={selected}
                project={project}
                locale={locale}
                t={t}
                updateProject={updateProject}
              />
            </Panel>
          ) : (
            <div className="empty editor-empty">{t("noSelection")}</div>
          )
        }
      />
    </>
  );
}

function TemplateEditor({
  template,
  project,
  locale,
  t,
  updateProject,
}: {
  template: EntityTemplate;
  project: ForgeProject;
  locale: Locale;
  t: (key: LabelKey) => string;
  updateProject: (recipe: (draft: ForgeProject) => void) => void;
}) {
  const parameters = project.references.filter(
    (item) => item.kind === "parameter" && item.key !== "name",
  );
  const add = () => {
    const first = parameters.find(
      (parameter) =>
        !template.fields.some((field) => field.referenceId === parameter.id),
    );
    if (!first) return;
    updateProject((draft) => {
      const target = draft.templates.find((item) => item.id === template.id)!;
      target.fields.push({
        id: `${target.id}.field_${target.fields.length + 1}`,
        referenceId: first.id,
        required: Boolean(first.required),
        multiple: Boolean(first.multiple),
        order: target.fields.length,
      });
    });
  };
  return (
    <div className="editor-stack">
      <div className="form-grid three">
        <SelectField
          label={t("type")}
          value={template.type}
          onChange={(type) =>
            updateProject((draft) => {
              const target = draft.templates.find(
                (item) => item.id === template.id,
              )!;
              target.type = type as EntityType;
              draft.entities
                .filter((entity) => entity.templateId === target.id)
                .forEach((entity) => {
                  entity.type = target.type;
                });
            })
          }
        >
          {ENTITY_TYPES.map((type) => (
            <option key={type} value={type}>
              {localized(entityNames[type], locale)}
            </option>
          ))}
        </SelectField>
        <SelectField
          label={t("category")}
          value={template.categoryId}
          onChange={(categoryId) =>
            updateProject((draft) => {
              draft.templates.find(
                (item) => item.id === template.id,
              )!.categoryId = categoryId;
            })
          }
        >
          {project.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {localized(category.name, locale)}
            </option>
          ))}
        </SelectField>
      </div>
      <LocalizedFields
        value={template.name}
        t={t}
        onChange={(name) =>
          updateProject((draft) => {
            draft.templates.find((item) => item.id === template.id)!.name =
              name;
          })
        }
      />
      <div className="subsection">
        <div className="subsection-head">
          <div>
            <span className="kicker">SCHEMA</span>
            <h3>{t("fields")}</h3>
          </div>
          <button className="button ghost compact" onClick={add}>
            + {t("add")}
          </button>
        </div>
        {template.fields.length === 0 && (
          <div className="empty">{t("noItems")}</div>
        )}
        <div className="template-fields">
          {[...template.fields]
            .sort((a, b) => a.order - b.order)
            .map((field, index) => (
              <div className="template-field" key={field.id}>
                <span className="step">{index + 1}</span>
                <SelectField
                  label={t("parameters")}
                  value={field.referenceId}
                  onChange={(referenceId) =>
                    updateProject((draft) => {
                      draft.templates.find(
                        (item) => item.id === template.id,
                      )!.fields[index].referenceId = referenceId;
                    })
                  }
                >
                  {parameters.map((parameter) => (
                    <option key={parameter.id} value={parameter.id}>
                      {localized(parameter.name, locale)} ·{" "}
                      {parameter.propertyType}
                    </option>
                  ))}
                </SelectField>
                <CheckField
                  label={t("required")}
                  checked={field.required}
                  onChange={(required) =>
                    updateProject((draft) => {
                      draft.templates.find(
                        (item) => item.id === template.id,
                      )!.fields[index].required = required;
                    })
                  }
                />
                <CheckField
                  label={t("multiple")}
                  checked={field.multiple}
                  onChange={(multiple) =>
                    updateProject((draft) => {
                      draft.templates.find(
                        (item) => item.id === template.id,
                      )!.fields[index].multiple = multiple;
                    })
                  }
                />
                <div className="order-buttons">
                  <button
                    disabled={index === 0}
                    onClick={() =>
                      updateProject((draft) => {
                        const list = draft.templates.find(
                          (item) => item.id === template.id,
                        )!.fields;
                        [list[index - 1], list[index]] = [
                          list[index],
                          list[index - 1],
                        ];
                        list.forEach((entry, order) => (entry.order = order));
                      })
                    }
                  >
                    ↑
                  </button>
                  <button
                    disabled={index === template.fields.length - 1}
                    onClick={() =>
                      updateProject((draft) => {
                        const list = draft.templates.find(
                          (item) => item.id === template.id,
                        )!.fields;
                        [list[index + 1], list[index]] = [
                          list[index],
                          list[index + 1],
                        ];
                        list.forEach((entry, order) => (entry.order = order));
                      })
                    }
                  >
                    ↓
                  </button>
                </div>
                <button
                  className="icon-button danger"
                  onClick={() =>
                    updateProject((draft) => {
                      const target = draft.templates.find(
                        (item) => item.id === template.id,
                      )!;
                      target.fields = target.fields
                        .filter((item) => item.id !== field.id)
                        .map((item, order) => ({ ...item, order }));
                    })
                  }
                >
                  ×
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function EntitiesPage({
  project,
  locale,
  t,
  type,
  setType,
  search,
  setSearch,
  selectedId,
  setSelectedId,
  updateProject,
}: CollectionProps & {
  type: EntityType;
  setType: (type: EntityType) => void;
}) {
  const [templateId, setTemplateId] = useState("");
  const templates = project.templates.filter((item) => item.type === type);
  const chosenTemplate =
    templates.find((item) => item.id === templateId) ?? templates[0];
  const filtered = project.entities.filter(
    (item) =>
      item.type === type &&
      `${localized(item.name, locale)} ${item.id}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const selected = project.entities.find(
    (item) => item.id === selectedId || item.previousIds.includes(selectedId),
  );
  const create = () => {
    const index =
      project.entities.filter((item) => item.type === type).length + 1;
    const id = `${project.namespace}.${type}.${type}_${index}`;
    updateProject((draft) => {
      if (!chosenTemplate) return;
      const entity: ForgeEntity = {
        id,
        key: `${type}_${index}`,
        type,
        templateId: chosenTemplate.id,
        name: { en: `${type[0].toUpperCase()}${type.slice(1)} ${index}` },
        values: Object.fromEntries(
          chosenTemplate.fields
            .filter((field) => field.defaultValue !== undefined)
            .map((field) => [
              field.referenceId,
              structuredClone(field.defaultValue),
            ]),
        ),
        previousIds: [],
      };
      draft.entities.push(entity);
    });
    setSelectedId(id);
  };
  const remove = () => {
    if (
      !selected ||
      !window.confirm(`${t("delete")}: ${localized(selected.name, locale)}?`)
    )
      return;
    updateProject((draft) => {
      draft.entities = draft.entities.filter((item) => item.id !== selected.id);
    });
    setSelectedId("");
  };
  const selectedTemplate = selected
    ? project.templates.find((item) => item.id === selected.templateId)
    : undefined;
  return (
    <>
      <div className="entity-tabs">
        {ENTITY_TYPES.map((id) => (
          <button
            key={id}
            className={type === id ? "active" : ""}
            onClick={() => {
              setType(id);
              setTemplateId("");
              setSelectedId("");
            }}
          >
            {localized(entityNames[id], locale)}
            <em>
              {project.entities.filter((item) => item.type === id).length}
            </em>
          </button>
        ))}
      </div>
      <div className="info-strip">
        {templates.length ? t("entityHelp") : t("createTemplateFirst")}
      </div>
      <CollectionLayout
        toolbar={
          <>
            <input
              className="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("search")}
            />
            {templates.length > 0 && (
              <label className="toolbar-select">
                <span>{t("template")}</span>
                <select
                  value={chosenTemplate?.id ?? ""}
                  onChange={(event) => setTemplateId(event.target.value)}
                >
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {localized(template.name, locale)}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <button
              className="button primary"
              disabled={!chosenTemplate}
              onClick={create}
            >
              + {t("add")}
            </button>
          </>
        }
        list={
          filtered.length ? (
            filtered.map((item) => (
              <button
                key={item.id}
                className={`flat-record ${item.id === selectedId ? "selected" : ""}`}
                onClick={() => setSelectedId(item.id)}
              >
                <span>{localized(item.name, locale)}</span>
                <small>{item.id}</small>
              </button>
            ))
          ) : (
            <div className="empty">{t("noItems")}</div>
          )
        }
        editor={
          selected && selectedTemplate ? (
            <Panel
              title={localized(selected.name, locale)}
              kicker={selected.id}
              actions={
                <button className="icon-button danger" onClick={remove}>
                  ×
                </button>
              }
            >
              <EntityEditor
                entity={selected}
                template={selectedTemplate}
                templates={templates}
                project={project}
                locale={locale}
                t={t}
                updateProject={updateProject}
              />
            </Panel>
          ) : (
            <div className="empty editor-empty">{t("noSelection")}</div>
          )
        }
      />
    </>
  );
}

function EntityEditor({
  entity,
  template,
  templates,
  project,
  locale,
  t,
  updateProject,
}: {
  entity: ForgeEntity;
  template: EntityTemplate;
  templates: EntityTemplate[];
  project: ForgeProject;
  locale: Locale;
  t: (key: LabelKey) => string;
  updateProject: (recipe: (draft: ForgeProject) => void) => void;
}) {
  const setValue = (referenceId: string, value: unknown) =>
    updateProject((draft) => {
      draft.entities.find((item) => item.id === entity.id)!.values[
        referenceId
      ] = value;
    });
  const changeTemplate = (templateId: string) =>
    updateProject((draft) => {
      const target = draft.entities.find((item) => item.id === entity.id)!;
      const nextTemplate = draft.templates.find(
        (item) => item.id === templateId,
      )!;
      const retained = new Set(
        nextTemplate.fields.map((field) => field.referenceId),
      );
      target.templateId = templateId;
      const preserved = Object.fromEntries(
        Object.entries(target.values).filter(([referenceId]) =>
          retained.has(referenceId),
        ),
      );
      target.values = {
        ...Object.fromEntries(
          nextTemplate.fields
            .filter((field) => field.defaultValue !== undefined)
            .map((field) => [
              field.referenceId,
              structuredClone(field.defaultValue),
            ]),
        ),
        ...preserved,
      };
    });
  return (
    <div className="editor-stack">
      <div className="form-grid two">
        <SelectField
          label={t("template")}
          value={entity.templateId}
          onChange={changeTemplate}
        >
          {templates.map((item) => (
            <option key={item.id} value={item.id}>
              {localized(item.name, locale)}
            </option>
          ))}
        </SelectField>
      </div>
      <LocalizedFields
        value={entity.name}
        t={t}
        onChange={(name) =>
          updateProject((draft) => {
            draft.entities.find((item) => item.id === entity.id)!.name = name;
          })
        }
      />
      {template.fields.length === 0 ? (
        <div className="empty">{t("templateHelp")}</div>
      ) : (
        <div className="dynamic-form">
          {template.fields.map((field) => {
            const parameter = project.references.find(
              (item) => item.id === field.referenceId,
            );
            if (!parameter)
              return (
                <div className="missing" key={field.id}>
                  Missing: {field.referenceId}
                </div>
              );
            const value = entity.values[field.referenceId];
            return (
              <DynamicField
                key={field.id}
                parameter={parameter}
                value={value}
                locale={locale}
                project={project}
                required={field.required}
                multiple={field.multiple}
                onChange={(next) => setValue(field.referenceId, next)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function DynamicField({
  parameter,
  value,
  locale,
  project,
  required,
  multiple,
  onChange,
}: {
  parameter: ReferenceRecord;
  value: unknown;
  locale: Locale;
  project: ForgeProject;
  required: boolean;
  multiple: boolean;
  onChange: (value: unknown) => void;
}) {
  const label = `${localized(parameter.name, locale)}${required ? " *" : ""}`;
  if (
    parameter.propertyType === "rule_set" ||
    parameter.propertyType === "effect"
  )
    return (
      <RuleSetEditor
        label={label}
        value={value as RuleSet | undefined}
        project={project}
        locale={locale}
        onChange={onChange}
      />
    );
  if (
    parameter.propertyType === "condition_set" ||
    parameter.propertyType === "condition"
  )
    return (
      <ConditionSetEditor
        label={label}
        value={value as ConditionGroup | undefined}
        project={project}
        locale={locale}
        onChange={onChange}
      />
    );
  if (
    parameter.propertyType === "calculation" ||
    parameter.propertyType === "formula"
  )
    return (
      <div className="dynamic-card">
        <span className="dynamic-label">{label}</span>
        <ValueExpressionEditor
          value={value as ValueExpression | undefined}
          project={project}
          locale={locale}
          onChange={onChange}
        />
      </div>
    );
  if (parameter.propertyType === "hp_progression")
    return (
      <HitPointProgressionEditor
        label={label}
        value={value as HitPointProgression | undefined}
        project={project}
        locale={locale}
        onChange={onChange}
      />
    );
  if (parameter.propertyType === "resource")
    return (
      <ResourceEditor
        label={label}
        value={value as ResourceDefinition | undefined}
        project={project}
        locale={locale}
        onChange={onChange}
      />
    );
  if (parameter.propertyType === "duration_rounds")
    return (
      <RoundDurationEditor
        label={label}
        value={value as RoundDuration | undefined}
        project={project}
        locale={locale}
        onChange={onChange}
      />
    );
  if (parameter.propertyType === "area")
    return (
      <AreaEditor
        label={label}
        value={value as AreaDefinition | undefined}
        project={project}
        locale={locale}
        onChange={onChange}
      />
    );
  if (parameter.propertyType === "damage")
    return (
      <DamageEditor
        label={label}
        value={value as DamageComponent[] | undefined}
        project={project}
        locale={locale}
        onChange={onChange}
      />
    );
  if (parameter.propertyType === "choice_set")
    return (
      <ChoiceSetEditor
        label={label}
        value={value as VisualChoiceDefinition[] | undefined}
        project={project}
        locale={locale}
        onChange={onChange}
      />
    );
  if (parameter.propertyType === "target_selector")
    return (
      <TargetSelectorEditor
        label={label}
        value={value as RuleTarget | undefined}
        project={project}
        locale={locale}
        onChange={onChange}
      />
    );
  if (
    parameter.propertyType === "guided" ||
    parameter.propertyType === "guided_list"
  )
    return (
      <GuidedEditor
        label={label}
        value={value}
        fields={parameter.uiFields ?? []}
        list={parameter.propertyType === "guided_list"}
        project={project}
        locale={locale}
        onChange={onChange}
      />
    );
  if (parameter.propertyType === "boolean")
    return (
      <CheckField label={label} checked={Boolean(value)} onChange={onChange} />
    );
  if (
    parameter.propertyType === "localized_short" ||
    parameter.propertyType === "localized_long"
  )
    return (
      <LocalizedFields
        value={(value as LocalText) ?? { en: "" }}
        t={(key) => labels[locale][key]}
        multiline={parameter.propertyType === "localized_long"}
        onChange={onChange}
      />
    );
  if (parameter.propertyType === "select")
    return (
      <SelectField
        label={label}
        value={String(value ?? "")}
        onChange={onChange}
      >
        <option value="">—</option>
        {project.references
          .filter(
            (item) =>
              item.kind === "value" &&
              (parameter.optionGroup
                ? item.optionGroup === parameter.optionGroup
                : item.categoryId === parameter.categoryId),
          )
          .map((item) => (
            <option key={item.id} value={item.id}>
              {localized(item.name, locale)}
            </option>
          ))}
      </SelectField>
    );
  if (
    ["reference", "references", "effect"].includes(parameter.propertyType ?? "")
  ) {
    const options = project.references.filter((item) =>
      parameter.propertyType === "effect"
        ? item.kind === "effect"
        : item.kind === "value" &&
          (parameter.optionGroup
            ? item.optionGroup === parameter.optionGroup
            : item.categoryId === parameter.categoryId),
    );
    if (multiple || parameter.propertyType === "references")
      return (
        <MultiPicker
          label={label}
          value={Array.isArray(value) ? (value as string[]) : []}
          options={options.map((item) => ({
            id: item.id,
            name: localized(item.name, locale),
          }))}
          onChange={onChange}
        />
      );
    return (
      <SelectField
        label={label}
        value={String(value ?? "")}
        onChange={onChange}
      >
        <option value="">—</option>
        {options.map((item) => (
          <option key={item.id} value={item.id}>
            {localized(item.name, locale)}
          </option>
        ))}
      </SelectField>
    );
  }
  if (["entity", "entities"].includes(parameter.propertyType ?? "")) {
    const options = project.entities
      .filter(
        (item) =>
          !parameter.allowedEntityTypes?.length ||
          parameter.allowedEntityTypes.includes(item.type),
      )
      .map((item) => ({
        id: item.id,
        name: `${localized(item.name, locale)} · ${item.type}`,
      }));
    if (multiple || parameter.propertyType === "entities")
      return (
        <MultiPicker
          label={label}
          value={Array.isArray(value) ? (value as string[]) : []}
          options={options}
          onChange={onChange}
        />
      );
    return (
      <SelectField
        label={label}
        value={String(value ?? "")}
        onChange={onChange}
      >
        <option value="">—</option>
        {options.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </SelectField>
    );
  }
  if (parameter.propertyType === "dice")
    return (
      <DiceField
        label={label}
        value={
          (value as DiceValue | undefined) ?? {
            count: 1,
            dieId: "wsg.atomic.d20",
            modifier: 0,
          }
        }
        project={project}
        locale={locale}
        onChange={onChange}
      />
    );
  if (parameter.propertyType === "list" || parameter.propertyType === "group")
    return (
      <StructuredValueField
        label={label}
        value={value ?? (parameter.propertyType === "list" ? [] : {})}
        list={parameter.propertyType === "list"}
        onChange={onChange}
      />
    );
  if (parameter.propertyType === "table" && parameter.table)
    return (
      <EntityTableField
        label={label}
        definition={parameter.table}
        value={
          Array.isArray(value)
            ? (value as TableDefinition["rows"])
            : structuredClone(parameter.table.rows)
        }
        onChange={onChange}
      />
    );
  return (
    <TextField
      label={`${label}${multiple ? " · []" : ""}`}
      value={String(value ?? "")}
      multiline={
        parameter.propertyType === "string" && String(value ?? "").length > 80
      }
      onChange={(next) =>
        onChange(
          ["integer", "decimal"].includes(parameter.propertyType ?? "")
            ? Number(next)
            : next,
        )
      }
    />
  );
}

function MultiPicker({
  label,
  value,
  options,
  disabled,
  onChange,
}: {
  label: string;
  value: string[];
  options: Array<{ id: string; name: string }>;
  disabled?: boolean;
  onChange: (value: string[]) => void;
}) {
  const available = options.find((option) => !value.includes(option.id));
  return (
    <div className="dynamic-card">
      <span className="dynamic-label">{label}</span>
      <div className="token-list">
        {value.map((id) => {
          const option = options.find((item) => item.id === id);
          return (
            <span className="token" key={id}>
              {option?.name ?? `Missing: ${id}`}
              <button
                disabled={disabled}
                onClick={() => onChange(value.filter((item) => item !== id))}
              >
                ×
              </button>
            </span>
          );
        })}
      </div>
      <select
        value=""
        disabled={disabled}
        onChange={(event) =>
          event.target.value && onChange([...value, event.target.value])
        }
      >
        <option value="">+ Select</option>
        {options
          .filter((option) => !value.includes(option.id))
          .map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
      </select>
      {!available && value.length === 0 && <small>No available records</small>}
    </div>
  );
}

interface DiceValue {
  count: number;
  dieId: string;
  modifier: number;
}
function DiceField({
  label,
  value,
  project,
  locale,
  onChange,
}: {
  label: string;
  value: DiceValue;
  project: ForgeProject;
  locale: Locale;
  onChange: (value: DiceValue) => void;
}) {
  return (
    <div className="dynamic-card">
      <span className="dynamic-label">{label}</span>
      <div className="rule-line">
        <TextField
          label="Count"
          value={value.count}
          onChange={(count) => onChange({ ...value, count: Number(count) })}
        />
        <SelectField
          label="Die"
          value={value.dieId}
          onChange={(dieId) => onChange({ ...value, dieId })}
        >
          {project.atomics
            .filter((item) => item.dataType === "die")
            .map((item) => (
              <option key={item.id} value={item.id}>
                {localized(item.name, locale)}
              </option>
            ))}
        </SelectField>
        <TextField
          label="Modifier"
          value={value.modifier}
          onChange={(modifier) =>
            onChange({ ...value, modifier: Number(modifier) })
          }
        />
      </div>
    </div>
  );
}

interface RuleValue {
  left: string;
  operator: string;
  rightSource: "number" | "atomic";
  right: number | string;
}
function RuleValueField({
  label,
  condition,
  value,
  project,
  locale,
  onChange,
}: {
  label: string;
  condition: boolean;
  value: RuleValue;
  project: ForgeProject;
  locale: Locale;
  onChange: (value: RuleValue) => void;
}) {
  const operators = condition
    ? [
        "equals",
        "not_equals",
        "greater_than",
        "at_least",
        "less_than",
        "at_most",
      ]
    : ["add", "subtract", "multiply", "divide", "minimum", "maximum"];
  return (
    <div className="dynamic-card">
      <span className="dynamic-label">{label}</span>
      <div className="rule-line">
        <SelectField
          label="Left value"
          value={value.left}
          onChange={(left) => onChange({ ...value, left })}
        >
          {project.atomics.map((item) => (
            <option key={item.id} value={item.id}>
              {localized(item.name, locale)}
            </option>
          ))}
        </SelectField>
        <SelectField
          label="Operator"
          value={value.operator}
          onChange={(operator) => onChange({ ...value, operator })}
        >
          {operators.map((operator) => (
            <option key={operator} value={operator}>
              {operator.replaceAll("_", " ")}
            </option>
          ))}
        </SelectField>
        <SelectField
          label="Right source"
          value={value.rightSource}
          onChange={(rightSource) =>
            onChange({
              ...value,
              rightSource: rightSource as RuleValue["rightSource"],
              right: rightSource === "number" ? 0 : "wsg.atomic.level",
            })
          }
        >
          <option value="number">Number</option>
          <option value="atomic">Atomic value</option>
        </SelectField>
        {value.rightSource === "atomic" ? (
          <SelectField
            label="Right value"
            value={String(value.right)}
            onChange={(right) => onChange({ ...value, right })}
          >
            {project.atomics.map((item) => (
              <option key={item.id} value={item.id}>
                {localized(item.name, locale)}
              </option>
            ))}
          </SelectField>
        ) : (
          <TextField
            label="Right value"
            value={Number(value.right)}
            onChange={(right) => onChange({ ...value, right: Number(right) })}
          />
        )}
      </div>
    </div>
  );
}

function RepeatField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <div className="dynamic-card">
      <span className="dynamic-label">{label}</span>
      <div className="repeat-list">
        {value.map((entry, index) => (
          <div key={index}>
            <input
              value={entry}
              onChange={(event) =>
                onChange(
                  value.map((item, current) =>
                    current === index ? event.target.value : item,
                  ),
                )
              }
            />
            <button
              className="icon-button danger"
              onClick={() =>
                onChange(value.filter((_, current) => current !== index))
              }
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        className="button ghost compact"
        onClick={() => onChange([...value, ""])}
      >
        + Add row
      </button>
    </div>
  );
}

function fieldCaption(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replaceAll("_", " ")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function StructuredValueField({
  label,
  value,
  list,
  onChange,
}: {
  label: string;
  value: unknown;
  list: boolean;
  onChange: (value: unknown) => void;
}) {
  const entries = list
    ? Array.isArray(value)
      ? value
      : []
    : [
        value && typeof value === "object" && !Array.isArray(value)
          ? value
          : {},
      ];
  const setEntry = (index: number, next: unknown) =>
    onChange(
      list
        ? entries.map((entry, current) => (current === index ? next : entry))
        : next,
    );
  const removeEntry = (index: number) =>
    onChange(entries.filter((_, current) => current !== index));
  return (
    <div className="dynamic-card structured-field">
      <span className="dynamic-label">{label}</span>
      <div className="structured-list">
        {entries.map((entry, index) => (
          <article className="structured-entry" key={index}>
            {list && (
              <header>
                <strong>{index + 1}</strong>
                <button
                  className="icon-button danger"
                  onClick={() => removeEntry(index)}
                >
                  ×
                </button>
              </header>
            )}
            <StructuredNode
              value={entry}
              onChange={(next) => setEntry(index, next)}
            />
          </article>
        ))}
      </div>
      {list && (
        <button
          className="button ghost compact"
          onClick={() => onChange([...entries, {}])}
        >
          + Add row
        </button>
      )}
    </div>
  );
}

function StructuredNode({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  if (Array.isArray(value))
    return (
      <div className="structured-array">
        {value.map((entry, index) => (
          <div className="structured-array-row" key={index}>
            <StructuredNode
              value={entry}
              onChange={(next) =>
                onChange(
                  value.map((item, current) =>
                    current === index ? next : item,
                  ),
                )
              }
            />
            <button
              className="icon-button danger"
              onClick={() =>
                onChange(value.filter((_, current) => current !== index))
              }
            >
              ×
            </button>
          </div>
        ))}
        <button
          className="button ghost compact"
          onClick={() => onChange([...value, ""])}
        >
          + Add
        </button>
      </div>
    );
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return (
      <div className="structured-grid">
        {Object.entries(record).map(([key, entry]) => (
          <label
            className={
              entry && typeof entry === "object" ? "structured-wide" : ""
            }
            key={key}
          >
            <span>{fieldCaption(key)}</span>
            <StructuredNode
              value={entry}
              onChange={(next) => onChange({ ...record, [key]: next })}
            />
          </label>
        ))}
      </div>
    );
  }
  if (typeof value === "boolean")
    return (
      <button
        type="button"
        className={`compact-toggle ${value ? "active" : ""}`}
        onClick={() => onChange(!value)}
      >
        {value ? "Yes" : "No"}
      </button>
    );
  if (typeof value === "number")
    return (
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    );
  return (
    <input
      value={String(value ?? "")}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function EntityTableField({
  label,
  definition,
  value,
  onChange,
}: {
  label: string;
  definition: TableDefinition;
  value: TableDefinition["rows"];
  onChange: (value: TableDefinition["rows"]) => void;
}) {
  const rows = value;
  const setCell = (rowIndex: number, columnId: string, cell: string) => {
    if (
      definition.keyMode === "sequential" &&
      definition.columns[0]?.id === columnId
    )
      return;
    onChange(
      rows.map((row, index) =>
        index === rowIndex
          ? { ...row, values: { ...row.values, [columnId]: cell } }
          : row,
      ),
    );
  };
  const paste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number,
  ) => {
    const matrix = event.clipboardData
      .getData("text")
      .trimEnd()
      .split(/\r?\n/)
      .map((row) => row.split("\t"));
    if (matrix.length === 1 && matrix[0].length === 1) return;
    event.preventDefault();
    const next = structuredClone(rows);
    while (next.length < rowIndex + matrix.length)
      next.push({ rowId: crypto.randomUUID(), values: {} });
    matrix.forEach((line, rowOffset) =>
      line.forEach((cell, columnOffset) => {
        const column = definition.columns[columnIndex + columnOffset];
        if (
          column &&
          !(
            definition.keyMode === "sequential" &&
            columnIndex + columnOffset === 0
          )
        )
          next[rowIndex + rowOffset].values[column.id] = cell;
      }),
    );
    if (definition.keyMode === "sequential")
      next.forEach((row, index) => {
        if (definition.columns[0])
          row.values[definition.columns[0].id] = index + 1;
      });
    onChange(next);
  };
  const addRow = () => {
    if (definition.maximumRows && rows.length >= definition.maximumRows) return;
    const values =
      definition.keyMode === "sequential" && definition.columns[0]
        ? { [definition.columns[0].id]: rows.length + 1 }
        : {};
    onChange([...rows, { rowId: crypto.randomUUID(), values }]);
  };
  const removeRow = (rowIndex: number) =>
    onChange(
      rows
        .filter((_, index) => index !== rowIndex)
        .map((row, index) =>
          definition.keyMode === "sequential" && definition.columns[0]
            ? {
                ...row,
                values: {
                  ...row.values,
                  [definition.columns[0].id]: index + 1,
                },
              }
            : row,
        ),
    );
  return (
    <div className="dynamic-card table-value">
      <span className="dynamic-label">{label}</span>
      <div className="spreadsheet">
        <table>
          <thead>
            <tr>
              {definition.columns.map((column, index) => (
                <th key={column.id}>
                  {index === 0 && <small>KEY</small>}
                  {column.name.en}
                </th>
              ))}
              <th className="row-action" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row.rowId}>
                {definition.columns.map((column, columnIndex) => (
                  <td key={column.id}>
                    <input
                      value={String(row.values[column.id] ?? "")}
                      readOnly={
                        definition.keyMode === "sequential" && columnIndex === 0
                      }
                      onChange={(event) =>
                        setCell(rowIndex, column.id, event.target.value)
                      }
                      onPaste={(event) => paste(event, rowIndex, columnIndex)}
                    />
                  </td>
                ))}
                <td className="row-action">
                  <button onClick={() => removeRow(rowIndex)}>×</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="button ghost compact"
        disabled={Boolean(
          definition.maximumRows && rows.length >= definition.maximumRows,
        )}
        onClick={addRow}
      >
        + Add row
      </button>
    </div>
  );
}

function DependenciesPage({
  project,
  locale,
  t,
  importRef,
  updateProject,
}: {
  project: ForgeProject;
  locale: Locale;
  t: (key: LabelKey) => string;
  importRef: React.RefObject<HTMLInputElement | null>;
  updateProject: (recipe: (draft: ForgeProject) => void) => void;
}) {
  return (
    <>
      <div className="info-strip">{t("dependencyHelp")}</div>
      <Panel
        title={t("dependencies")}
        kicker="LOCAL INSTALLS"
        actions={
          <button
            className="button primary"
            onClick={() => importRef.current?.click()}
          >
            + {t("attach")}
          </button>
        }
      >
        {project.dependencies.length === 0 ? (
          <div className="empty">{t("noItems")}</div>
        ) : (
          <div className="dependency-list">
            {project.dependencies.map((item) => (
              <article key={item.refId}>
                <span
                  className={`status-dot ${item.verified ? "" : "error"}`}
                />
                <div>
                  <strong>
                    {item.embedded
                      ? localized(item.embedded.reference.name, locale)
                      : item.refId}
                  </strong>
                  <code>{item.refId}</code>
                </div>
                <span className="badge">≥ {item.minimumVersion}</span>
                <span className="badge">
                  {item.access === "editable" ? t("editable") : t("readOnly")}
                </span>
                <button
                  className="icon-button danger"
                  onClick={() =>
                    updateProject((draft) => {
                      draft.dependencies = draft.dependencies.filter(
                        (dependency) => dependency.refId !== item.refId,
                      );
                    })
                  }
                >
                  ×
                </button>
              </article>
            ))}
          </div>
        )}
      </Panel>
    </>
  );
}

function Settings({
  project,
  locale,
  t,
  updateProject,
  close,
}: {
  project: ForgeProject;
  locale: Locale;
  t: (key: LabelKey) => string;
  updateProject: (recipe: (draft: ForgeProject) => void) => void;
  close: () => void;
}) {
  return (
    <>
      <header className="modal-head">
        <div>
          <span className="kicker">MANIFEST</span>
          <h2>{t("settings")}</h2>
        </div>
        <button className="icon-button" onClick={close}>
          ×
        </button>
      </header>
      <div className="modal-body editor-stack">
        <div className="form-grid two">
          <TextField
            label={`${t("version")} · ${t("references")}`}
            value={project.reference.version}
            onChange={(version) =>
              updateProject((draft) => {
                draft.reference.version = version;
              })
            }
          />
          <TextField
            label={`${t("version")} · ${t("packContent")}`}
            value={project.pack.version}
            onChange={(version) =>
              updateProject((draft) => {
                draft.pack.version = version;
                draft.version = version;
              })
            }
          />
        </div>
        <div className="subsection">
          <h3>{t("refName")}</h3>
          <LocalizedFields
            value={project.reference.name}
            t={t}
            onChange={(name) =>
              updateProject((draft) => {
                draft.reference.name = name;
              })
            }
          />
        </div>
        <div className="subsection">
          <h3>{t("packName")}</h3>
          <LocalizedFields
            value={project.pack.name}
            t={t}
            onChange={(name) =>
              updateProject((draft) => {
                draft.pack.name = name;
              })
            }
          />
        </div>
        <div className="subsection">
          <h3>{t("packSubtitle")}</h3>
          <LocalizedFields
            value={project.pack.subtitle}
            t={t}
            onChange={(subtitle) =>
              updateProject((draft) => {
                draft.pack.subtitle = subtitle;
              })
            }
          />
        </div>
        <div className="subsection">
          <h3>{t("packDescription")}</h3>
          <LocalizedFields
            value={project.pack.description}
            t={t}
            multiline
            onChange={(description) =>
              updateProject((draft) => {
                draft.pack.description = description;
              })
            }
          />
        </div>
        <details className="advanced-settings">
          <summary>
            {locale === "ru"
              ? "Служебные идентификаторы (обычно менять не нужно)"
              : locale === "sv"
                ? "Tekniska identifierare (behöver vanligtvis inte ändras)"
                : "Technical identifiers (normally leave unchanged)"}
          </summary>
          <div className="form-grid three">
            <TextField
              label={t("namespace")}
              value={project.namespace}
              onChange={(namespace) =>
                updateProject((draft) => {
                  draft.namespace = slugify(namespace);
                })
              }
            />
            <TextField
              label={`${t("key")} · REF`}
              value={project.reference.key}
              onChange={(key) =>
                updateProject((draft) => {
                  draft.reference.key = slugify(key);
                })
              }
            />
            <TextField
              label={`${t("key")} · PACK`}
              value={project.pack.key}
              onChange={(key) =>
                updateProject((draft) => {
                  draft.pack.key = slugify(key);
                })
              }
            />
          </div>
        </details>
        <p className="hint">{t("englishRequired")}</p>
      </div>
      <footer className="modal-foot">
        <button className="button primary" onClick={close}>
          {t("done")}
        </button>
      </footer>
    </>
  );
}

function DebugDialog({
  project,
  issues,
  tab,
  setTab,
  t,
  close,
}: {
  project: ForgeProject;
  issues: ReturnType<typeof validateProject>;
  tab: "issues" | "json";
  setTab: (tab: "issues" | "json") => void;
  t: (key: LabelKey) => string;
  close: () => void;
}) {
  return (
    <>
      <header className="modal-head">
        <div>
          <span className="kicker">READ-ONLY INSPECTOR</span>
          <h2>{t("debug")}</h2>
        </div>
        <button className="icon-button" onClick={close}>
          ×
        </button>
      </header>
      <div className="debug-tabs">
        <button
          className={tab === "issues" ? "active" : ""}
          onClick={() => setTab("issues")}
        >
          {t("errors")} · {issues.length}
        </button>
        <button
          className={tab === "json" ? "active" : ""}
          onClick={() => setTab("json")}
        >
          {t("json")}
        </button>
      </div>
      <div className="modal-body debug-body">
        {tab === "issues" ? (
          issues.length === 0 ? (
            <div className="success-card">
              <span>✓</span>
              <strong>{t("valid")}</strong>
            </div>
          ) : (
            <div className="issue-list">
              {issues.map((issue, index) => (
                <article
                  key={`${issue.code}-${index}`}
                  className={issue.severity}
                >
                  <span>{issue.severity === "error" ? "!" : "i"}</span>
                  <div>
                    <strong>{issue.code}</strong>
                    <p>{issue.message}</p>
                    {issue.targetId && <code>{issue.targetId}</code>}
                  </div>
                </article>
              ))}
            </div>
          )
        ) : (
          <>
            <p className="hint">{t("readonlyJson")}</p>
            <pre className="json-view">{JSON.stringify(project, null, 2)}</pre>
          </>
        )}
      </div>
    </>
  );
}

function ExportDialog({
  access,
  setAccess,
  t,
  close,
  exportFile,
}: {
  access: "editable" | "read_only";
  setAccess: (value: "editable" | "read_only") => void;
  t: (key: LabelKey) => string;
  close: () => void;
  exportFile: (kind: "json" | "wsgref" | "wsgpack") => void;
}) {
  return (
    <>
      <header className="modal-head">
        <div>
          <span className="kicker">LOCAL FILES</span>
          <h2>{t("export")}</h2>
        </div>
        <button className="icon-button" onClick={close}>
          ×
        </button>
      </header>
      <div className="modal-body editor-stack">
        <div className="segmented full">
          <button
            className={access === "editable" ? "active" : ""}
            onClick={() => setAccess("editable")}
          >
            {t("editable")}
          </button>
          <button
            className={access === "read_only" ? "active" : ""}
            onClick={() => setAccess("read_only")}
          >
            {t("readOnly")}
          </button>
        </div>
        <button className="export-choice" onClick={() => exportFile("wsgref")}>
          <span>.wsgref</span>
          <strong>{t("exportRefs")}</strong>
          <em>→</em>
        </button>
        <button className="export-choice" onClick={() => exportFile("wsgpack")}>
          <span>.wsgpack</span>
          <strong>{t("exportPack")}</strong>
          <em>→</em>
        </button>
        <button className="export-choice" onClick={() => exportFile("json")}>
          <span>.json</span>
          <strong>{t("exportProject")}</strong>
          <em>→</em>
        </button>
      </div>
    </>
  );
}

export default App;
