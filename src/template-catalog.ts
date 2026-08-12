import type { EntityType, LocalText, PropertyType, ReferenceRecord, TableColumn, TableDefinition } from "./model";

type FieldSeed = {
  key: string;
  name: LocalText;
  description?: LocalText;
  category: string;
  type: PropertyType;
  required?: boolean;
  multiple?: boolean;
  table?: TableDefinition;
  minimum?: number;
  maximum?: number;
};

const text = (en: string, ru: string, sv: string): LocalText => ({ en, ru, sv });
const column = (key: string, en: string, ru: string, sv: string, type: PropertyType = "string", required = false): TableColumn => ({
  id: key, key, name: text(en, ru, sv), type, required,
});
const table = (...columns: TableColumn[]): TableDefinition => ({ columns, rows: [] });

const common: Record<string, FieldSeed> = {
  description: { key: "description", name: text("Description", "Описание", "Beskrivning"), category: "narrative_social", type: "localized_long" },
  prerequisites: { key: "prerequisites", name: text("Prerequisites", "Требования", "Förkrav"), category: "prerequisites", type: "condition" },
  features: { key: "features", name: text("Granted Features", "Получаемые умения", "Erhållna förmågor"), category: "effects", type: "entities", multiple: true },
  influences: { key: "influences", name: text("Influences", "Влияния", "Påverkningar"), category: "effects", type: "references", multiple: true },
  choices: { key: "choices", name: text("Choices", "Выборы", "Val"), category: "choices", type: "list", multiple: true },
};

const classProgression: TableDefinition = {
  ...table(
  column("level", "LVL", "УР.", "NV.", "integer", true),
  column("proficiency_bonus", "PB", "БМ", "KB", "integer"),
  column("features", "Features", "Умения", "Förmågor", "entities"),
  column("resource", "Class resource", "Ресурс класса", "Klassresurs", "integer"),
  column("cantrips", "Cantrips", "Заговоры", "Cantrips", "integer"),
  column("prepared_spells", "Prepared", "Подготовлено", "Förberedda", "integer"),
    ...Array.from({ length: 9 }, (_, index) => column(`spell_slot_${index + 1}`, `Slot ${index + 1}`, `Ячейка ${index + 1}`, `Plats ${index + 1}`, "integer")),
  ),
  keyMode: "sequential",
  maximumRows: 20,
  rows: Array.from({ length: 20 }, (_, index) => ({ rowId: `level_${index + 1}`, values: { level: index + 1 } })),
};

const subclassProgression = table(
  column("class_level", "Class LVL", "УР. класса", "Klass-NV.", "integer", true),
  column("features", "Features", "Умения", "Förmågor", "entities"),
  column("always_prepared_spells", "Always-prepared spells", "Всегда подготовленные заклинания", "Alltid förberedda besvärjelser", "entities"),
);

const equipmentPackages = table(
  column("option", "Option", "Вариант", "Alternativ", "string", true),
  column("items", "Items", "Предметы", "Föremål", "entities"),
  column("currency_cp", "Currency, cp", "Монеты, мм", "Valuta, cp", "integer"),
);

const spellScaling = table(
  column("trigger_level", "Spell slot or character LVL", "УР. ячейки или персонажа", "Besvärjelseplats eller karaktärs-NV.", "integer", true),
  column("dice", "Dice", "Кости", "Tärningar", "dice"),
  column("flat_bonus", "Flat bonus", "Плоский бонус", "Fast bonus", "integer"),
  column("targets", "Targets", "Цели", "Mål", "integer"),
  column("duration", "Duration", "Длительность", "Varaktighet", "integer"),
);

const seeds: Record<EntityType, FieldSeed[]> = {
  class: [
    common.description,
    { key: "class_hit_die", name: text("Hit Die", "Кость хитов", "Träfftärning"), category: "hit_points_healing", type: "dice", required: true },
    { key: "class_primary_abilities", name: text("Primary Abilities", "Основные характеристики", "Primära grundegenskaper"), category: "abilities", type: "references", multiple: true, required: true },
    { key: "class_saving_throw_proficiencies", name: text("Saving Throw Proficiencies", "Владение спасбросками", "Kompetens i räddningsslag"), category: "saving_throws", type: "references", multiple: true, required: true },
    { key: "class_skill_proficiency_choices", name: text("Skill Proficiency Choices", "Выбор владения навыками", "Val av färdighetskompetens"), category: "skills_checks", type: "group", multiple: true },
    { key: "class_weapon_proficiencies", name: text("Weapon Proficiencies", "Владение оружием", "Vapenkompetenser"), category: "weapons_mastery", type: "references", multiple: true },
    { key: "class_armor_training", name: text("Armor Training", "Владение доспехами", "Rustningsträning"), category: "armor", type: "references", multiple: true },
    { key: "class_tool_proficiencies", name: text("Tool Proficiencies", "Владение инструментами", "Verktygskompetenser"), category: "proficiencies", type: "references", multiple: true },
    { key: "class_starting_equipment", name: text("Starting Equipment Options", "Варианты стартового снаряжения", "Alternativ för startutrustning"), category: "items_inventory", type: "table", table: equipmentPackages },
    { key: "class_starting_wealth_cp", name: text("Starting Wealth, cp", "Стартовое богатство, мм", "Startförmögenhet, cp"), category: "economy_currency", type: "integer", minimum: 0 },
    { key: "class_hp_level_1", name: text("Hit Points at Level 1", "Хиты на 1 уровне", "Träffpoäng på nivå 1"), category: "hit_points_healing", type: "formula", required: true },
    { key: "class_hp_later_levels", name: text("Hit Points per Later Level", "Хиты за последующие уровни", "Träffpoäng per senare nivå"), category: "hit_points_healing", type: "formula", required: true },
    { key: "class_progression", name: text("Class Progression", "Прогрессия класса", "Klassprogression"), category: "tables", type: "table", required: true, table: classProgression },
    { key: "class_subclass_levels", name: text("Subclass Selection Levels", "Уровни выбора подкласса", "Nivåer för val av underklass"), category: "classes_multiclassing", type: "list", multiple: true },
    { key: "class_spellcasting_ability", name: text("Spellcasting Ability", "Заклинательная характеристика", "Besvärjelseegenskap"), category: "magic_spells", type: "reference" },
    { key: "class_spell_list", name: text("Class Spell List", "Список заклинаний класса", "Klassens besvärjelselista"), category: "magic_spells", type: "entities", multiple: true },
    { key: "class_spell_preparation", name: text("Spell Preparation Rule", "Правило подготовки заклинаний", "Regel för besvärjelseförberedelse"), category: "magic_spells", type: "group" },
    { key: "class_spellcasting_progression", name: text("Spellcasting Progression", "Прогрессия заклинателя", "Besvärjelseprogression"), category: "classes_multiclassing", type: "select" },
    { key: "class_multiclass_requirements", name: text("Multiclass Requirements", "Требования мультикласса", "Krav för multiklassning"), category: "classes_multiclassing", type: "condition" },
    common.features, common.choices, common.influences,
  ],
  multiclass: [
    common.description,
    { key: "multiclass_base_class", name: text("Base Class", "Базовый класс", "Basklass"), category: "classes_multiclassing", type: "entity", required: true },
    { key: "multiclass_prerequisites", name: text("Ability Prerequisites", "Требования характеристик", "Egenskapskrav"), category: "prerequisites", type: "condition", required: true },
    { key: "multiclass_hit_die", name: text("Hit Die", "Кость хитов", "Träfftärning"), category: "hit_points_healing", type: "dice", required: true },
    { key: "multiclass_hp_formula", name: text("Hit Points Formula", "Формула хитов", "Formel för träffpoäng"), category: "hit_points_healing", type: "formula", required: true },
    { key: "multiclass_armor_training", name: text("Gained Armor Training", "Получаемое владение доспехами", "Erhållen rustningsträning"), category: "armor", type: "references", multiple: true },
    { key: "multiclass_weapon_proficiencies", name: text("Gained Weapon Proficiencies", "Получаемое владение оружием", "Erhållna vapenkompetenser"), category: "weapons_mastery", type: "references", multiple: true },
    { key: "multiclass_tool_proficiencies", name: text("Gained Tool Proficiencies", "Получаемое владение инструментами", "Erhållna verktygskompetenser"), category: "proficiencies", type: "references", multiple: true },
    { key: "multiclass_skill_choices", name: text("Gained Skill Choices", "Получаемый выбор навыков", "Erhållna färdighetsval"), category: "skills_checks", type: "group", multiple: true },
    { key: "multiclass_spellcaster_contribution", name: text("Spellcaster Level Contribution", "Вклад в уровень заклинателя", "Bidrag till besvärjelsenivå"), category: "classes_multiclassing", type: "select", required: true },
    { key: "multiclass_excluded_features", name: text("Excluded Base Features", "Исключённые базовые умения", "Uteslutna grundförmågor"), category: "classes_multiclassing", type: "entities", multiple: true },
    { key: "multiclass_replaced_features", name: text("Replaced Features", "Заменяемые умения", "Ersatta förmågor"), category: "classes_multiclassing", type: "entities", multiple: true },
    { key: "multiclass_extra_features", name: text("Additional Features", "Дополнительные умения", "Ytterligare förmågor"), category: "classes_multiclassing", type: "entities", multiple: true },
    common.choices, common.influences,
  ],
  subclass: [
    common.description,
    { key: "subclass_parent_class", name: text("Parent Class", "Родительский класс", "Överordnad klass"), category: "classes_multiclassing", type: "entity", required: true },
    { key: "subclass_selection_level", name: text("Selection Level", "Уровень выбора", "Valnivå"), category: "level_progression", type: "integer", minimum: 1, maximum: 20, required: true },
    { key: "subclass_progression", name: text("Subclass Progression", "Прогрессия подкласса", "Underklassprogression"), category: "tables", type: "table", table: subclassProgression, required: true },
    { key: "subclass_expanded_spell_list", name: text("Expanded Spell List", "Расширенный список заклинаний", "Utökad besvärjelselista"), category: "magic_spells", type: "entities", multiple: true },
    { key: "subclass_always_prepared_spells", name: text("Always-Prepared Spells", "Всегда подготовленные заклинания", "Alltid förberedda besvärjelser"), category: "magic_spells", type: "entities", multiple: true },
    common.features, common.choices, common.influences,
  ],
  species: [
    common.description,
    { key: "species_creature_type", name: text("Creature Type", "Тип существа", "Varelsetyp"), category: "creature_body", type: "select", required: true },
    { key: "species_size_options", name: text("Size Options", "Варианты размера", "Storleksalternativ"), category: "creature_body", type: "references", multiple: true, required: true },
    { key: "species_average_lifespan", name: text("Average Lifespan, years", "Средняя продолжительность жизни, лет", "Genomsnittlig livslängd, år"), category: "creature_body", type: "integer", minimum: 0 },
    { key: "species_walk_speed", name: text("Walking Speed, ft", "Скорость ходьбы, фт", "Gånghastighet, ft"), category: "movement_position", type: "integer", minimum: 0, required: true },
    { key: "species_fly_speed", name: text("Flying Speed, ft", "Скорость полёта, фт", "Flyghastighet, ft"), category: "movement_position", type: "integer", minimum: 0 },
    { key: "species_swim_speed", name: text("Swimming Speed, ft", "Скорость плавания, фт", "Simhastighet, ft"), category: "movement_position", type: "integer", minimum: 0 },
    { key: "species_climb_speed", name: text("Climbing Speed, ft", "Скорость лазания, фт", "Klättringshastighet, ft"), category: "movement_position", type: "integer", minimum: 0 },
    { key: "species_vision_range", name: text("Vision Range, ft", "Дальность зрения, фт", "Synräckvidd, ft"), category: "senses_perception", type: "integer", minimum: 0 },
    { key: "species_darkvision_range", name: text("Darkvision Range, ft", "Дальность темнозрения, фт", "Mörkersyn, ft"), category: "senses_perception", type: "integer", minimum: 0 },
    { key: "species_blindsight_range", name: text("Blindsight Range, ft", "Дальность слепого зрения, фт", "Blindseende, ft"), category: "senses_perception", type: "integer", minimum: 0 },
    { key: "species_languages", name: text("Languages", "Языки", "Språk"), category: "languages", type: "references", multiple: true },
    { key: "species_resistances", name: text("Damage Resistances", "Сопротивления урону", "Skaderesistenser"), category: "damage_defense", type: "references", multiple: true },
    { key: "species_immunities", name: text("Immunities", "Иммунитеты", "Immuniteter"), category: "immunities_exceptions", type: "references", multiple: true },
    { key: "species_vulnerabilities", name: text("Vulnerabilities", "Уязвимости", "Sårbarheter"), category: "damage_defense", type: "references", multiple: true },
    { key: "species_lineages", name: text("Lineages or Ancestries", "Наследия или происхождения", "Härstamningar"), category: "choices", type: "list", multiple: true },
    common.features, common.choices, common.influences,
  ],
  background: [
    common.description,
    { key: "background_ability_scores", name: text("Ability Score Options", "Варианты характеристик", "Alternativ för grundegenskaper"), category: "abilities", type: "references", multiple: true, required: true },
    { key: "background_ability_increase_scheme", name: text("Ability Increase Scheme", "Схема повышения характеристик", "Schema för egenskapsökning"), category: "abilities", type: "select", required: true },
    { key: "background_origin_feats", name: text("Origin Feats", "Стартовые черты", "Ursprungstalanger"), category: "choices", type: "entities", multiple: true, required: true },
    { key: "background_skill_proficiencies", name: text("Skill Proficiencies", "Владение навыками", "Färdighetskompetenser"), category: "skills_checks", type: "references", multiple: true, required: true },
    { key: "background_tool_proficiencies", name: text("Tool Proficiencies", "Владение инструментами", "Verktygskompetenser"), category: "proficiencies", type: "references", multiple: true },
    { key: "background_languages", name: text("Languages", "Языки", "Språk"), category: "languages", type: "references", multiple: true },
    { key: "background_equipment", name: text("Equipment Options", "Варианты снаряжения", "Utrustningsalternativ"), category: "items_inventory", type: "table", table: equipmentPackages, required: true },
    { key: "background_cash_option_cp", name: text("Cash Option, cp", "Денежный вариант, мм", "Kontantalternativ, cp"), category: "economy_currency", type: "integer", minimum: 0 },
    common.features, common.choices, common.influences,
  ],
  feat: [
    common.description,
    { key: "feat_category", name: text("Feat Category", "Категория черты", "Talangkategori"), category: "choices", type: "select", required: true },
    common.prerequisites,
    { key: "feat_repeatable", name: text("Repeatable", "Можно брать повторно", "Kan upprepas"), category: "stacking_priority", type: "boolean" },
    { key: "feat_repeat_limit", name: text("Repeat Limit (0 = unlimited)", "Лимит повторов (0 = без лимита)", "Upprepningsgräns (0 = obegränsad)"), category: "stacking_priority", type: "integer", minimum: 0 },
    { key: "feat_ability_increases", name: text("Ability Score Increases", "Повышения характеристик", "Ökningar av grundegenskaper"), category: "abilities", type: "group", multiple: true },
    { key: "feat_skill_proficiencies", name: text("Granted Skill Proficiencies", "Получаемые владения навыками", "Erhållna färdighetskompetenser"), category: "skills_checks", type: "references", multiple: true },
    { key: "feat_tool_proficiencies", name: text("Granted Tool Proficiencies", "Получаемые владения инструментами", "Erhållna verktygskompetenser"), category: "proficiencies", type: "references", multiple: true },
    { key: "feat_granted_spells", name: text("Granted Spells", "Получаемые заклинания", "Erhållna besvärjelser"), category: "magic_spells", type: "entities", multiple: true },
    common.features, common.choices, common.influences,
  ],
  feature: [
    common.description,
    { key: "feature_behavior", name: text("Feature Behavior", "Тип работы умения", "Förmågebeteende"), category: "effects", type: "select", required: true },
    { key: "feature_level", name: text("Granted at Level", "Выдаётся на уровне", "Erhålls på nivå"), category: "level_progression", type: "integer", minimum: 1, maximum: 20 },
    common.prerequisites,
    { key: "feature_activation", name: text("Activation", "Активация", "Aktivering"), category: "actions_timing", type: "select" },
    { key: "feature_trigger", name: text("Trigger", "Триггер", "Utlösare"), category: "triggers_automation", type: "localized_short" },
    { key: "feature_uses", name: text("Uses", "Использования", "Användningar"), category: "resources_charges", type: "formula" },
    { key: "feature_recharge", name: text("Recharge", "Восстановление", "Återladdning"), category: "rest_recovery", type: "select" },
    { key: "feature_duration", name: text("Duration", "Длительность", "Varaktighet"), category: "duration", type: "group" },
    { key: "feature_resource_atomic", name: text("Tracked Resource", "Отслеживаемый ресурс", "Spårad resurs"), category: "resources_charges", type: "reference" },
    { key: "feature_granted_spells", name: text("Granted Spells", "Получаемые заклинания", "Erhållna besvärjelser"), category: "magic_spells", type: "entities", multiple: true },
    { key: "feature_granted_entities", name: text("Granted Content", "Получаемый контент", "Erhållet innehåll"), category: "choices", type: "entities", multiple: true },
    common.choices, common.influences,
  ],
  item: [
    common.description,
    { key: "item_category", name: text("Item Category", "Категория предмета", "Föremålskategori"), category: "items_inventory", type: "select", required: true },
    { key: "item_magic_type", name: text("Magic Item Type", "Тип магического предмета", "Typ av magiskt föremål"), category: "items_inventory", type: "select" },
    { key: "item_rarity", name: text("Rarity", "Редкость", "Sällsynthet"), category: "items_inventory", type: "select" },
    { key: "item_quantity", name: text("Catalog Quantity", "Количество в каталоге", "Katalogantal"), category: "items_inventory", type: "decimal", minimum: 0 },
    { key: "item_unit", name: text("Accounting Unit", "Единица учёта", "Redovisningsenhet"), category: "units_measurements", type: "select" },
    { key: "item_source_pack_quantity", name: text("Source Package Quantity", "Количество в исходной упаковке", "Antal i källförpackning"), category: "items_inventory", type: "decimal", minimum: 0 },
    { key: "item_source_pack_cost_cp", name: text("Source Package Cost, cp", "Цена исходной упаковки, мм", "Källförpackningens kostnad, cp"), category: "economy_currency", type: "decimal", minimum: 0 },
    { key: "item_cost_cp", name: text("Cost per Unit, cp", "Стоимость одной единицы, мм", "Kostnad per enhet, cp"), category: "economy_currency", type: "decimal", minimum: 0 },
    { key: "item_weight_lb", name: text("Weight, lb", "Вес, фнт", "Vikt, lb"), category: "units_measurements", type: "decimal", minimum: 0 },
    { key: "item_stack_limit", name: text("Stack Limit", "Размер стака", "Staplingsgräns"), category: "items_inventory", type: "integer", minimum: 1 },
    { key: "item_equipment_slot", name: text("Equipment Slot", "Слот снаряжения", "Utrustningsplats"), category: "items_inventory", type: "select" },
    { key: "item_requires_attunement", name: text("Requires Attunement", "Требует настройки", "Kräver samstämmighet"), category: "prerequisites", type: "boolean" },
    { key: "item_attunement_prerequisite", name: text("Attunement Prerequisite", "Требование настройки", "Krav för samstämmighet"), category: "prerequisites", type: "condition" },
    { key: "item_attunement_details", name: text("Attunement Details", "Подробности настройки", "Detaljer för samstämmighet"), category: "prerequisites", type: "localized_short" },
    { key: "item_srd_metadata", name: text("SRD Item Line", "Строка предмета из SRD", "SRD-föremålsrad"), category: "items_inventory", type: "localized_short" },
    { key: "item_weapon_category", name: text("Weapon Category", "Категория оружия", "Vapenkategori"), category: "weapons_mastery", type: "select" },
    { key: "item_weapon_range_type", name: text("Melee or Ranged", "Рукопашное или дальнобойное", "Närstrid eller avstånd"), category: "weapons_mastery", type: "select" },
    { key: "item_damage", name: text("Weapon Damage", "Урон оружия", "Vapenskada"), category: "damage_defense", type: "dice" },
    { key: "item_damage_flat", name: text("Flat Weapon Damage", "Фиксированный урон оружия", "Fast vapenskada"), category: "damage_defense", type: "integer", minimum: 0 },
    { key: "item_damage_type", name: text("Damage Type", "Тип урона", "Skadetyp"), category: "damage_defense", type: "reference" },
    { key: "item_weapon_properties", name: text("Weapon Properties", "Свойства оружия", "Vapenegenskaper"), category: "weapons_mastery", type: "references", multiple: true },
    { key: "item_weapon_mastery", name: text("Mastery Property", "Свойство мастерства", "Mästerskapsegenskap"), category: "weapons_mastery", type: "reference" },
    { key: "item_normal_range", name: text("Normal Range, ft", "Нормальная дальность, фт", "Normal räckvidd, ft"), category: "targets_areas", type: "integer", minimum: 0 },
    { key: "item_long_range", name: text("Long Range, ft", "Максимальная дальность, фт", "Lång räckvidd, ft"), category: "targets_areas", type: "integer", minimum: 0 },
    { key: "item_armor_category", name: text("Armor Category", "Категория доспеха", "Rustningskategori"), category: "armor", type: "select" },
    { key: "item_base_ac", name: text("Base AC", "Базовый КД", "Grund-RK"), category: "armor_class", type: "integer", minimum: 0 },
    { key: "item_dexterity_to_ac", name: text("Dexterity Applied to AC", "Ловкость добавляется к КД", "Smidighet läggs till RK"), category: "armor_class", type: "select" },
    { key: "item_strength_requirement", name: text("Strength Requirement", "Требование Силы", "Styrkekrav"), category: "prerequisites", type: "integer", minimum: 0 },
    { key: "item_stealth_disadvantage", name: text("Stealth Disadvantage", "Помеха Скрытности", "Nackdel på Smyga"), category: "skills_checks", type: "boolean" },
    { key: "item_charges", name: text("Charges", "Заряды", "Laddningar"), category: "resources_charges", type: "integer", minimum: 0 },
    { key: "item_recharge", name: text("Charge Recovery", "Восстановление зарядов", "Återställning av laddningar"), category: "rest_recovery", type: "group" },
    { key: "item_recharge_timing", name: text("Recharge Timing", "Момент восстановления", "Tidpunkt för återställning"), category: "rest_recovery", type: "select" },
    { key: "item_recharge_dice", name: text("Recharge Dice", "Кости восстановления", "Återställningstärningar"), category: "rest_recovery", type: "dice" },
    { key: "item_recharge_flat", name: text("Flat Recharge", "Фиксированное восстановление", "Fast återställning"), category: "rest_recovery", type: "integer", minimum: 0 },
    { key: "item_destroyed_on_zero", name: text("Can Be Destroyed at Zero Charges", "Может уничтожиться при нуле зарядов", "Kan förstöras vid noll laddningar"), category: "resources_charges", type: "boolean" },
    { key: "item_consumable", name: text("Consumable", "Расходуемый", "Förbrukningsbar"), category: "items_inventory", type: "boolean" },
    { key: "item_container_capacity", name: text("Container Capacity", "Вместимость контейнера", "Behållarkapacitet"), category: "items_inventory", type: "group" },
    { key: "item_contents", name: text("Package Contents", "Содержимое набора", "Förpackningens innehåll"), category: "items_inventory", type: "table", table: table(column("item", "Item", "Предмет", "Föremål", "string", true), column("quantity", "Quantity", "Количество", "Antal", "decimal", true)) },
    { key: "item_variants", name: text("SRD Variants", "Варианты SRD", "SRD-varianter"), category: "items_inventory", type: "table", table: table(column("name", "Variant", "Вариант", "Variant", "string", true), column("rarity", "Rarity", "Редкость", "Sällsynthet"), column("cost_cp", "Cost, cp", "Стоимость, мм", "Kostnad, cp", "decimal"), column("charges", "Charges", "Заряды", "Laddningar", "integer"), column("details", "Details", "Подробности", "Detaljer", "string")) },
    { key: "item_tool_ability", name: text("Tool Ability", "Характеристика инструмента", "Verktygets grundegenskap"), category: "proficiencies", type: "reference" },
    { key: "item_tool_utilize", name: text("Tool Utilize Options", "Применения инструмента", "Användningar av verktyget"), category: "downtime_services", type: "list", multiple: true },
    { key: "item_tool_craft", name: text("Craftable Items", "Создаваемые предметы", "Tillverkningsbara föremål"), category: "downtime_services", type: "list", multiple: true },
    { key: "item_carrying_capacity_lb", name: text("Carrying Capacity, lb", "Грузоподъёмность, фнт", "Bärkapacitet, lb"), category: "mounts_vehicles", type: "decimal", minimum: 0 },
    { key: "item_vehicle_speed_mph", name: text("Vehicle Speed, mph", "Скорость транспорта, миль/ч", "Fordonshastighet, mph"), category: "mounts_vehicles", type: "decimal", minimum: 0 },
    { key: "item_vehicle_crew", name: text("Required Crew", "Требуемый экипаж", "Nödvändig besättning"), category: "mounts_vehicles", type: "integer", minimum: 0 },
    { key: "item_vehicle_passengers", name: text("Passengers", "Пассажиры", "Passagerare"), category: "mounts_vehicles", type: "integer", minimum: 0 },
    { key: "item_vehicle_cargo_tons", name: text("Cargo, tons", "Груз, тонн", "Last, ton"), category: "mounts_vehicles", type: "decimal", minimum: 0 },
    { key: "item_vehicle_ac", name: text("Vehicle AC", "КД транспорта", "Fordonets RK"), category: "armor_class", type: "integer", minimum: 0 },
    { key: "item_vehicle_hp", name: text("Vehicle HP", "Хиты транспорта", "Fordonets TP"), category: "hit_points_healing", type: "integer", minimum: 0 },
    { key: "item_vehicle_damage_threshold", name: text("Damage Threshold", "Порог урона", "Skadetröskel"), category: "damage_defense", type: "integer", minimum: 0 },
    { key: "item_spells", name: text("Contained Spells", "Содержащиеся заклинания", "Innehållna besvärjelser"), category: "magic_spells", type: "entities", multiple: true },
    { key: "item_material_component", name: text("Spell Material Component", "Материальный компонент заклинания", "Materiell besvärjelsekomponent"), category: "components_casting", type: "boolean" },
    { key: "item_material_spell_names", name: text("Spells Using This Material", "Заклинания с этим материалом", "Besvärjelser som använder materialet"), category: "components_casting", type: "list", multiple: true },
    common.features, common.choices, common.influences,
  ],
  spell: [
    common.description,
    { key: "spell_level", name: text("Spell Level", "Уровень заклинания", "Besvärjelsenivå"), category: "magic_spells", type: "integer", minimum: 0, maximum: 9, required: true },
    { key: "spell_school", name: text("School of Magic", "Школа магии", "Magiskola"), category: "magic_spells", type: "select", required: true },
    { key: "spell_class_lists", name: text("Class Spell Lists", "Списки классов", "Klassernas besvärjelselistor"), category: "classes_multiclassing", type: "entities", multiple: true },
    { key: "spell_casting_time_type", name: text("Casting Time", "Время сотворения", "Kasttid"), category: "actions_timing", type: "select", required: true },
    { key: "spell_casting_time_amount", name: text("Casting Time Amount", "Количество времени", "Tidsmängd"), category: "actions_timing", type: "integer", minimum: 1 },
    { key: "spell_casting_trigger", name: text("Reaction or Bonus Action Trigger", "Триггер реакции или бонусного действия", "Utlösare för reaktion eller bonushandling"), category: "triggers_automation", type: "localized_short" },
    { key: "spell_ritual", name: text("Ritual", "Ритуал", "Ritual"), category: "components_casting", type: "boolean" },
    { key: "spell_range_type", name: text("Range Type", "Тип дальности", "Räckviddstyp"), category: "targets_areas", type: "select", required: true },
    { key: "spell_range_distance", name: text("Range Distance, ft", "Дальность, фт", "Räckvidd, ft"), category: "targets_areas", type: "integer", minimum: 0 },
    { key: "spell_area_shape", name: text("Area Shape", "Форма области", "Områdesform"), category: "targets_areas", type: "select" },
    { key: "spell_area_size", name: text("Area Size, ft", "Размер области, фт", "Områdesstorlek, ft"), category: "targets_areas", type: "integer", minimum: 0 },
    { key: "spell_target_rule", name: text("Target Rule", "Правило выбора целей", "Målregel"), category: "targets_areas", type: "group" },
    { key: "spell_component_verbal", name: text("Verbal Component", "Вербальный компонент", "Verbal komponent"), category: "components_casting", type: "boolean" },
    { key: "spell_component_somatic", name: text("Somatic Component", "Соматический компонент", "Somatisk komponent"), category: "components_casting", type: "boolean" },
    { key: "spell_component_material", name: text("Material Component", "Материальный компонент", "Materiell komponent"), category: "components_casting", type: "boolean" },
    { key: "spell_material_items", name: text("Material Items", "Материальные предметы", "Materiella föremål"), category: "components_casting", type: "entities", multiple: true },
    { key: "spell_material_cost_cp", name: text("Minimum Material Cost, cp", "Минимальная стоимость материала, мм", "Minsta materialkostnad, cp"), category: "components_casting", type: "integer", minimum: 0 },
    { key: "spell_material_consumed", name: text("Material Is Consumed", "Материал расходуется", "Materialet förbrukas"), category: "components_casting", type: "boolean" },
    { key: "spell_duration_type", name: text("Duration Type", "Тип длительности", "Varaktighetstyp"), category: "duration", type: "select", required: true },
    { key: "spell_duration_amount", name: text("Duration Amount", "Количество длительности", "Varaktighetsmängd"), category: "duration", type: "integer", minimum: 0 },
    { key: "spell_duration_unit", name: text("Duration Unit", "Единица длительности", "Varaktighetsenhet"), category: "duration", type: "select" },
    { key: "spell_concentration", name: text("Concentration", "Концентрация", "Koncentration"), category: "duration", type: "boolean" },
    { key: "spell_attack_type", name: text("Spell Attack Type", "Тип атаки заклинанием", "Typ av besvärjelseattack"), category: "attacks_hits", type: "select" },
    { key: "spell_saving_throw", name: text("Saving Throw", "Спасбросок", "Räddningsslag"), category: "saving_throws", type: "reference" },
    { key: "spell_save_success", name: text("Effect on Successful Save", "Эффект при успешном спасброске", "Effekt vid lyckat räddningsslag"), category: "saving_throws", type: "select" },
    { key: "spell_damage", name: text("Damage Dice", "Кости урона", "Skadetärningar"), category: "damage_defense", type: "dice" },
    { key: "spell_damage_type", name: text("Damage Type", "Тип урона", "Skadetyp"), category: "damage_defense", type: "reference" },
    { key: "spell_healing", name: text("Healing Dice", "Кости лечения", "Läkningstärningar"), category: "hit_points_healing", type: "dice" },
    { key: "spell_periodic_timing", name: text("Periodic Effect Timing", "Периодичность эффекта", "Timing för periodisk effekt"), category: "triggers_automation", type: "select" },
    { key: "spell_conditions", name: text("Applied Conditions", "Накладываемые состояния", "Tillämpade tillstånd"), category: "conditions", type: "references", multiple: true },
    { key: "spell_scaling", name: text("Cantrip or Higher-Slot Scaling", "Масштабирование заговора или ячейки", "Skalning för cantrip eller högre plats"), category: "tables", type: "table", table: spellScaling },
    { key: "spell_tags", name: text("Spell Tags", "Метки заклинания", "Besvärjelsetaggar"), category: "values_options", type: "references", multiple: true },
    common.choices, common.influences,
  ],
};

const valueGroups: Array<[string, string, LocalText[]]> = [
  ["ability", "abilities", [text("Strength", "Сила", "Styrka"), text("Dexterity", "Ловкость", "Smidighet"), text("Constitution", "Телосложение", "Fysik"), text("Intelligence", "Интеллект", "Intelligens"), text("Wisdom", "Мудрость", "Visdom"), text("Charisma", "Харизма", "Karisma")]],
  ["size", "creature_body", [text("Tiny (¼ square)", "Крошечный (¼ клетки)", "Pytteliten (¼ ruta)"), text("Small (1 square)", "Маленький (1 клетка)", "Liten (1 ruta)"), text("Medium (1 square)", "Средний (1 клетка)", "Medelstor (1 ruta)"), text("Large (4 squares)", "Большой (4 клетки)", "Stor (4 rutor)"), text("Huge (9 squares)", "Огромный (9 клеток)", "Enorm (9 rutor)"), text("Gargantuan (16 squares)", "Колоссальный (16 клеток)", "Gigantisk (16 rutor)")]],
  ["skill", "skills_checks", [text("Acrobatics", "Акробатика", "Akrobatik"), text("Animal Handling", "Уход за животными", "Djurhantering"), text("Arcana", "Магия", "Arkana"), text("Athletics", "Атлетика", "Atletik"), text("Deception", "Обман", "Bedrägeri"), text("History", "История", "Historia"), text("Insight", "Проницательность", "Insikt"), text("Intimidation", "Запугивание", "Skrämsel"), text("Investigation", "Анализ", "Undersökning"), text("Medicine", "Медицина", "Medicin"), text("Nature", "Природа", "Natur"), text("Perception", "Восприятие", "Varseblivning"), text("Performance", "Выступление", "Uppträdande"), text("Persuasion", "Убеждение", "Övertalning"), text("Religion", "Религия", "Religion"), text("Sleight of Hand", "Ловкость рук", "Fingerfärdighet"), text("Stealth", "Скрытность", "Smyga"), text("Survival", "Выживание", "Överlevnad")]],
  ["language", "languages", [text("Common", "Общий", "Allmänspråk"), text("Common Sign Language", "Общий язык жестов", "Allmänt teckenspråk"), text("Draconic", "Драконий", "Drakoniska"), text("Dwarvish", "Дварфский", "Dvärgiska"), text("Elvish", "Эльфийский", "Alviska"), text("Giant", "Великаний", "Jättespråk"), text("Gnomish", "Гномий", "Gnomiska"), text("Goblin", "Гоблинский", "Goblin"), text("Halfling", "Полуросликов", "Halvlingsspråk"), text("Orc", "Орочий", "Orkiska"), text("Abyssal", "Бездны", "Abyssal"), text("Celestial", "Небесный", "Celestial"), text("Deep Speech", "Глубинная речь", "Djupspråk"), text("Druidic", "Друидический", "Druidiska"), text("Infernal", "Инфернальный", "Infernaliska"), text("Primordial", "Первичный", "Primordial"), text("Sylvan", "Сильван", "Sylvan"), text("Thieves’ Cant", "Воровской жаргон", "Tjuvspråk"), text("Undercommon", "Подземный общий", "Underjordiska")]],
  ["armor_training", "armor", [text("Light Armor", "Лёгкие доспехи", "Lätt rustning"), text("Medium Armor", "Средние доспехи", "Medeltung rustning"), text("Heavy Armor", "Тяжёлые доспехи", "Tung rustning"), text("Shields", "Щиты", "Sköldar")]],
  ["weapon_proficiency", "weapons_mastery", [text("Simple Weapons", "Простое оружие", "Enkla vapen"), text("Martial Weapons", "Воинское оружие", "Krigiska vapen"), text("Specific Weapon", "Определённое оружие", "Specifikt vapen")]],
  ["tool_proficiency", "proficiencies", [text("Artisan’s Tools", "Ремесленные инструменты", "Hantverksverktyg"), text("Gaming Set", "Игровой набор", "Speluppsättning"), text("Musical Instrument", "Музыкальный инструмент", "Musikinstrument"), text("Thieves’ Tools", "Воровские инструменты", "Tjuvverktyg"), text("Navigator’s Tools", "Инструменты навигатора", "Navigatörsverktyg"), text("Herbalism Kit", "Набор травника", "Örtläkarkit"), text("Disguise Kit", "Набор для грима", "Förklädnadskit"), text("Forgery Kit", "Набор для подделки", "Förfalskningskit"), text("Poisoner’s Kit", "Набор отравителя", "Giftblandarkit")]],
  ["damage_type", "damage_defense", [text("Acid", "Кислота", "Syra"), text("Bludgeoning", "Дробящий", "Kross"), text("Cold", "Холод", "Kyla"), text("Fire", "Огонь", "Eld"), text("Force", "Силовой", "Kraft"), text("Lightning", "Электричество", "Blixt"), text("Necrotic", "Некротический", "Nekrotisk"), text("Piercing", "Колющий", "Genomborrande"), text("Poison", "Яд", "Gift"), text("Psychic", "Психический", "Psykisk"), text("Radiant", "Лучистый", "Strålande"), text("Slashing", "Рубящий", "Hugg"), text("Thunder", "Звук", "Åska")]],
  ["condition", "conditions", [text("Blinded", "Ослеплённый", "Förblindad"), text("Charmed", "Очарованный", "Förtrollad"), text("Deafened", "Оглохший", "Döv"), text("Exhaustion", "Истощение", "Utmattning"), text("Frightened", "Испуганный", "Skrämd"), text("Grappled", "Схваченный", "Fasthållen"), text("Incapacitated", "Недееспособный", "Oförmögen"), text("Invisible", "Невидимый", "Osynlig"), text("Paralyzed", "Парализованный", "Förlamad"), text("Petrified", "Окаменевший", "Förstenad"), text("Poisoned", "Отравленный", "Förgiftad"), text("Prone", "Лежащий", "Liggande"), text("Restrained", "Опутанный", "Fjättrad"), text("Stunned", "Ошеломлённый", "Bedövad"), text("Unconscious", "Бессознательный", "Medvetslös")]],
  ["spell_school", "magic_spells", [text("Abjuration", "Ограждение", "Avvärjning"), text("Conjuration", "Вызов", "Frammaning"), text("Divination", "Прорицание", "Spådom"), text("Enchantment", "Очарование", "Förtrollning"), text("Evocation", "Воплощение", "Framkallning"), text("Illusion", "Иллюзия", "Illusion"), text("Necromancy", "Некромантия", "Nekromanti"), text("Transmutation", "Преобразование", "Transmutation")]],
  ["feat_category", "choices", [text("Origin", "Стартовая", "Ursprung"), text("General", "Общая", "Allmän"), text("Fighting Style", "Боевой стиль", "Stridsstil"), text("Epic Boon", "Эпический дар", "Episk gåva")]],
  ["feature_behavior", "effects", [text("One-time", "Единоразовое", "Engångs"), text("Passive", "Пассивное", "Passiv"), text("Active", "Активное", "Aktiv")]],
  ["activation", "actions_timing", [text("Always", "Всегда", "Alltid"), text("Action", "Действие", "Handling"), text("Bonus Action", "Бонусное действие", "Bonushandling"), text("Reaction", "Реакция", "Reaktion"), text("Free / no action", "Без действия", "Ingen handling"), text("Special", "Особое", "Särskild")]],
  ["recharge", "rest_recovery", [text("Never", "Не восстанавливается", "Aldrig"), text("Short Rest", "Короткий отдых", "Kort vila"), text("Long Rest", "Долгий отдых", "Lång vila"), text("Short or Long Rest", "Короткий или долгий отдых", "Kort eller lång vila"), text("Start of Turn", "Начало хода", "Turens början"), text("Daily", "Ежедневно", "Dagligen"), text("Special", "Особое", "Särskild")]],
  ["spellcasting_progression", "classes_multiclassing", [text("None", "Нет", "Ingen"), text("Full", "Полная", "Full"), text("Half, round down", "Половина вниз", "Halv, avrunda nedåt"), text("Half, round up", "Половина вверх", "Halv, avrunda uppåt"), text("Third", "Треть", "Tredjedel"), text("Pact Magic", "Магия договора", "Paktmagi"), text("Custom", "Особая", "Anpassad")]],
  ["creature_type", "creature_body", [text("Aberration", "Аберрация", "Aberration"), text("Beast", "Зверь", "Best"), text("Celestial", "Небожитель", "Celestial"), text("Construct", "Конструкт", "Konstruktion"), text("Dragon", "Дракон", "Drake"), text("Elemental", "Элементаль", "Elementar"), text("Fey", "Фея", "Fe"), text("Fiend", "Исчадие", "Demon"), text("Giant", "Великан", "Jätte"), text("Humanoid", "Гуманоид", "Humanoid"), text("Monstrosity", "Монстр", "Monstrositet"), text("Ooze", "Слизь", "Slem"), text("Plant", "Растение", "Växt"), text("Undead", "Нежить", "Odöd")]],
  ["ability_increase_scheme", "abilities", [text("+2 / +1", "+2 / +1", "+2 / +1"), text("+1 / +1 / +1", "+1 / +1 / +1", "+1 / +1 / +1")]],
  ["item_category", "items_inventory", [text("Weapon", "Оружие", "Vapen"), text("Armor", "Доспех", "Rustning"), text("Shield", "Щит", "Sköld"), text("Adventuring Gear", "Снаряжение", "Äventyrsutrustning"), text("Tool", "Инструмент", "Verktyg"), text("Ammunition", "Боеприпасы", "Ammunition"), text("Container", "Контейнер", "Behållare"), text("Mount", "Ездовое животное", "Riddjur"), text("Vehicle", "Транспорт", "Fordon"), text("Food or Drink", "Еда или напиток", "Mat eller dryck"), text("Service", "Услуга", "Tjänst"), text("Consumable", "Расходник", "Förbrukningsvara"), text("Magic Item", "Магический предмет", "Magiskt föremål"), text("Spell Material", "Материал заклинания", "Besvärjelsematerial"), text("Currency", "Валюта", "Valuta"), text("Other", "Другое", "Annat")]],
  ["magic_item_type", "items_inventory", [text("Armor", "Доспех", "Rustning"), text("Potion", "Зелье", "Brygd"), text("Ring", "Кольцо", "Ring"), text("Rod", "Жезл", "Stav"), text("Scroll", "Свиток", "Skrift"), text("Staff", "Посох", "Stav"), text("Wand", "Волшебная палочка", "Trollstav"), text("Weapon", "Оружие", "Vapen"), text("Wondrous Item", "Чудесный предмет", "Underbart föremål"), text("Other", "Другое", "Annat")]],
  ["item_unit", "units_measurements", [text("Piece", "Штука", "Styck"), text("Dose", "Доза", "Dos"), text("Day", "День", "Dag"), text("Meal", "Приём пищи", "Måltid"), text("Mile", "Миля", "Mile"), text("Pint", "Пинта", "Pint"), text("Gallon", "Галлон", "Gallon"), text("Pound", "Фунт", "Pund"), text("Foot", "Фут", "Fot"), text("Sheet", "Лист", "Ark"), text("Use", "Использование", "Användning")]],
  ["item_recharge_timing", "rest_recovery", [text("None", "Нет", "Ingen"), text("Daily at Dawn", "Ежедневно на рассвете", "Dagligen i gryningen"), text("Daily at Dusk", "Ежедневно на закате", "Dagligen i skymningen"), text("After a Long Rest", "После долгого отдыха", "Efter en lång vila"), text("After a Short Rest", "После короткого отдыха", "Efter en kort vila"), text("At Midnight", "В полночь", "Vid midnatt"), text("Special", "Особое", "Särskild")]],
  ["equipment_slot", "items_inventory", [text("None", "Нет", "Ingen"), text("Armor", "Доспех", "Rustning"), text("Main Hand", "Основная рука", "Huvudhand"), text("Off Hand", "Вторая рука", "Andra hand"), text("Two Hands", "Две руки", "Två händer"), text("Head", "Голова", "Huvud"), text("Neck", "Шея", "Hals"), text("Shoulders", "Плечи", "Axlar"), text("Hands", "Кисти", "Händer"), text("Waist", "Пояс", "Midja"), text("Feet", "Ступни", "Fötter"), text("Worn", "Носимое", "Buret")]],
  ["rarity", "items_inventory", [text("Common", "Обычный", "Vanlig"), text("Uncommon", "Необычный", "Ovanlig"), text("Rare", "Редкий", "Sällsynt"), text("Very Rare", "Очень редкий", "Mycket sällsynt"), text("Legendary", "Легендарный", "Legendarisk"), text("Artifact", "Артефакт", "Artefakt"), text("Varies", "Разная", "Varierar")]],
  ["weapon_category", "weapons_mastery", [text("Simple", "Простое", "Enkelt"), text("Martial", "Воинское", "Krigiskt")]],
  ["weapon_range_type", "weapons_mastery", [text("Melee", "Рукопашное", "Närstrid"), text("Ranged", "Дальнобойное", "Avstånd")]],
  ["armor_category", "armor", [text("Light Armor", "Лёгкий доспех", "Lätt rustning"), text("Medium Armor", "Средний доспех", "Medeltung rustning"), text("Heavy Armor", "Тяжёлый доспех", "Tung rustning"), text("Shield", "Щит", "Sköld")]],
  ["weapon_property", "weapons_mastery", [text("Ammunition", "Боеприпас", "Ammunition"), text("Finesse", "Фехтовальное", "Finess"), text("Heavy", "Тяжёлое", "Tungt"), text("Light", "Лёгкое", "Lätt"), text("Loading", "Перезарядка", "Laddning"), text("Reach", "Досягаемость", "Räckvidd"), text("Thrown", "Метательное", "Kastat"), text("Two-Handed", "Двуручное", "Tvåhands"), text("Versatile", "Универсальное", "Mångsidigt")]],
  ["weapon_mastery", "weapons_mastery", [text("Cleave", "Рассечение", "Klyva"), text("Graze", "Скользящий удар", "Snudda"), text("Nick", "Надрез", "Skåra"), text("Push", "Толчок", "Knuffa"), text("Sap", "Ослабление", "Försvaga"), text("Slow", "Замедление", "Sakta"), text("Topple", "Опрокидывание", "Välta"), text("Vex", "Досаждение", "Plåga")]],
  ["dexterity_to_ac", "armor_class", [text("None", "Не добавляется", "Ingen"), text("Full modifier", "Полный модификатор", "Full modifierare"), text("Maximum +2", "Максимум +2", "Högst +2")]],
  ["range_type", "targets_areas", [text("Self", "На себя", "Själv"), text("Touch", "Касание", "Beröring"), text("Distance", "Дистанция", "Avstånd"), text("Sight", "Видимость", "Sikt"), text("Unlimited", "Неограниченная", "Obegränsad"), text("Special", "Особая", "Särskild")]],
  ["area_shape", "targets_areas", [text("None", "Нет", "Ingen"), text("Cone", "Конус", "Kon"), text("Cube", "Куб", "Kub"), text("Cylinder", "Цилиндр", "Cylinder"), text("Emanation", "Эманация", "Emanation"), text("Line", "Линия", "Linje"), text("Sphere", "Сфера", "Sfär"), text("Wall", "Стена", "Vägg"), text("Special", "Особая", "Särskild")]],
  ["duration_type", "duration", [text("Instantaneous", "Мгновенная", "Omedelbar"), text("Timed", "Ограниченная", "Tidsbegränsad"), text("Until Dispelled", "Пока не рассеяно", "Tills skingrad"), text("Until Triggered", "До срабатывания", "Tills utlöst"), text("Permanent", "Постоянная", "Permanent"), text("Special", "Особая", "Särskild")]],
  ["time_unit", "duration", [text("Round", "Раунд", "Runda"), text("Minute", "Минута", "Minut"), text("Hour", "Час", "Timme"), text("Day", "День", "Dag"), text("Until rest", "До отдыха", "Till vila"), text("Special", "Особое", "Särskild")]],
  ["casting_time", "actions_timing", [text("Action", "Действие", "Handling"), text("Bonus Action", "Бонусное действие", "Bonushandling"), text("Reaction", "Реакция", "Reaktion"), text("Minute", "Минута", "Minut"), text("Hour", "Час", "Timme"), text("Special", "Особое", "Särskild")]],
  ["spell_attack", "attacks_hits", [text("None", "Нет", "Ingen"), text("Melee Spell Attack", "Рукопашная атака заклинанием", "Närstridsattack med besvärjelse"), text("Ranged Spell Attack", "Дальнобойная атака заклинанием", "Avståndsattack med besvärjelse")]],
  ["save_success", "saving_throws", [text("No effect", "Без эффекта", "Ingen effekt"), text("Half damage", "Половина урона", "Halv skada"), text("Reduced effect", "Ослабленный эффект", "Minskad effekt"), text("Ends effect", "Завершает эффект", "Avslutar effekten")]],
  ["periodic_timing", "triggers_automation", [text("None", "Нет", "Ingen"), text("Start of target turn", "Начало хода цели", "Målets tur börjar"), text("End of target turn", "Конец хода цели", "Målets tur slutar"), text("Start of caster turn", "Начало хода заклинателя", "Kastarens tur börjar"), text("End of caster turn", "Конец хода заклинателя", "Kastarens tur slutar"), text("On entering area", "При входе в область", "Vid inträde i område"), text("On leaving area", "При выходе из области", "Vid utträde ur område")]],
  ["spell_tag", "values_options", [text("Damage", "Урон", "Skada"), text("Healing", "Лечение", "Läkning"), text("Control", "Контроль", "Kontroll"), text("Buff", "Усиление", "Förstärkning"), text("Debuff", "Ослабление", "Försvagning"), text("Area", "Область", "Område"), text("Periodic", "Периодический", "Periodisk"), text("Summoning", "Призыв", "Åkallelse"), text("Utility", "Утилитарное", "Nyttobesvärjelse")]],
];

const optionGroupByKey: Record<string, string> = {
  class_primary_abilities: "ability", class_saving_throw_proficiencies: "ability", class_skill_proficiency_choices: "skill", class_weapon_proficiencies: "weapon_proficiency", class_armor_training: "armor_training", class_tool_proficiencies: "tool_proficiency", class_spellcasting_ability: "ability", class_spellcasting_progression: "spellcasting_progression",
  multiclass_armor_training: "armor_training", multiclass_weapon_proficiencies: "weapon_proficiency", multiclass_tool_proficiencies: "tool_proficiency", multiclass_skill_choices: "skill", multiclass_spellcaster_contribution: "spellcasting_progression",
  species_creature_type: "creature_type", species_size_options: "size", species_languages: "language", species_resistances: "damage_type", species_immunities: "damage_type", species_vulnerabilities: "damage_type",
  background_ability_scores: "ability", background_ability_increase_scheme: "ability_increase_scheme", background_skill_proficiencies: "skill", background_tool_proficiencies: "tool_proficiency", background_languages: "language",
  feat_category: "feat_category", feat_skill_proficiencies: "skill", feat_tool_proficiencies: "tool_proficiency",
  feature_behavior: "feature_behavior", feature_activation: "activation", feature_recharge: "recharge",
  item_category: "item_category", item_magic_type: "magic_item_type", item_unit: "item_unit", item_recharge_timing: "item_recharge_timing", item_rarity: "rarity", item_equipment_slot: "equipment_slot", item_weapon_category: "weapon_category", item_weapon_range_type: "weapon_range_type", item_damage_type: "damage_type", item_weapon_properties: "weapon_property", item_weapon_mastery: "weapon_mastery", item_armor_category: "armor_category", item_dexterity_to_ac: "dexterity_to_ac", item_tool_ability: "ability",
  spell_school: "spell_school", spell_casting_time_type: "casting_time", spell_range_type: "range_type", spell_area_shape: "area_shape", spell_duration_type: "duration_type", spell_duration_unit: "time_unit", spell_attack_type: "spell_attack", spell_saving_throw: "ability", spell_save_success: "save_success", spell_damage_type: "damage_type", spell_periodic_timing: "periodic_timing", spell_conditions: "condition", spell_tags: "spell_tag",
};

const entityTypesByKey: Partial<Record<string, EntityType[]>> = {
  features: ["feature"], class_spell_list: ["spell"], multiclass_base_class: ["class"], multiclass_excluded_features: ["feature"], multiclass_replaced_features: ["feature"], multiclass_extra_features: ["feature"],
  subclass_parent_class: ["class"], subclass_expanded_spell_list: ["spell"], subclass_always_prepared_spells: ["spell"], background_origin_feats: ["feat"], feat_granted_spells: ["spell"], feature_granted_spells: ["spell"],
  item_spells: ["spell"], spell_class_lists: ["class"], spell_material_items: ["item"],
};

function buildValues(namespace: string): ReferenceRecord[] {
  const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
  const counts = new Map<string, number>();
  valueGroups.flatMap(([, , values]) => values).forEach((name) => counts.set(slug(name.en), (counts.get(slug(name.en)) ?? 0) + 1));
  return valueGroups.flatMap(([group, category, values]) => values.map((originalName) => {
    const duplicate = (counts.get(slug(originalName.en)) ?? 0) > 1;
    const groupName = group.split("_").map((part) => `${part[0].toUpperCase()}${part.slice(1)}`).join(" ");
    const name = duplicate ? { en: `${groupName}: ${originalName.en}`, ru: `${groupName}: ${originalName.ru}`, sv: `${groupName}: ${originalName.sv}` } : originalName;
    const key = slug(name.en);
    return { id: `${namespace}.ref.value.${key}`, key, kind: "value" as const, name, description: text("", "", ""), categoryId: `wsg.category.${category}`, packId: namespace, locked: false, previousIds: [], value: key, optionGroup: group };
  }));
}

function buildParameters(namespace: string) {
  const unique = new Map<string, FieldSeed>();
  Object.values(seeds).flat().forEach((seed) => unique.set(seed.key, seed));
  const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
  return [...unique.values()].map((seed): ReferenceRecord => {
    const prefix = (Object.keys(seeds) as EntityType[]).find((type) => seed.key.startsWith(`${type}_`));
    const candidate = prefix ? text(`${prefix[0].toUpperCase()}${prefix.slice(1)} ${seed.name.en}`, `${prefix[0].toUpperCase()}${prefix.slice(1)}: ${seed.name.ru}`, `${prefix[0].toUpperCase()}${prefix.slice(1)}: ${seed.name.sv}`) : seed.name;
    const name = slug(seed.name.en) === seed.key ? seed.name : candidate && slug(candidate.en) === seed.key ? candidate : seed.name;
    return ({
    id: `${namespace}.ref.parameter.${seed.key}`,
    key: seed.key,
    kind: "parameter",
    name,
    description: seed.description ?? text("", "", ""),
    categoryId: `wsg.category.${seed.category}`,
    packId: namespace,
    locked: false,
    previousIds: [],
    propertyType: seed.type,
    required: seed.required ?? false,
    multiple: seed.multiple ?? false,
    minimum: seed.minimum,
    maximum: seed.maximum,
    optionGroup: optionGroupByKey[seed.key],
    allowedEntityTypes: entityTypesByKey[seed.key],
    table: seed.table ? structuredClone(seed.table) : undefined,
  }); });
}

function buildEffects(namespace: string): ReferenceRecord[] {
  const rows: Array<[string, LocalText, "add" | "subtract" | "multiply" | "divide" | "set" | "minimum" | "maximum" | "roll" | "grant" | "remove"]> = [
    ["modify_atomic", text("Modify Atomic", "Изменить атомарное значение", "Ändra atomärt värde"), "add"],
    ["deal_damage", text("Deal Damage", "Нанести урон", "Tillfoga skada"), "subtract"],
    ["heal", text("Heal Hit Points", "Восстановить хиты", "Läk träffpoäng"), "add"],
    ["grant_temporary_hp", text("Grant Temporary Hit Points", "Выдать временные хиты", "Ge tillfälliga träffpoäng"), "maximum"],
    ["modify_armor_class", text("Modify Armor Class", "Изменить класс доспеха", "Ändra rustningsklass"), "add"],
    ["modify_speed", text("Modify Speed", "Изменить скорость", "Ändra hastighet"), "add"],
    ["modify_sense", text("Modify Sense Range", "Изменить дальность чувства", "Ändra sinnesräckvidd"), "maximum"],
    ["grant_proficiency", text("Grant Proficiency", "Выдать владение", "Ge kompetens"), "grant"],
    ["apply_condition", text("Apply Condition", "Наложить состояние", "Tillämpa tillstånd"), "grant"],
    ["remove_condition", text("Remove Condition", "Снять состояние", "Ta bort tillstånd"), "remove"],
    ["grant_resistance", text("Grant Damage Resistance", "Выдать сопротивление урону", "Ge skaderesistens"), "grant"],
    ["grant_immunity", text("Grant Immunity", "Выдать иммунитет", "Ge immunitet"), "grant"],
    ["grant_vulnerability", text("Grant Vulnerability", "Выдать уязвимость", "Ge sårbarhet"), "grant"],
    ["grant_spell", text("Grant Spell", "Выдать заклинание", "Ge besvärjelse"), "grant"],
    ["spend_resource", text("Spend Resource", "Потратить ресурс", "Förbruka resurs"), "subtract"],
    ["restore_resource", text("Restore Resource", "Восстановить ресурс", "Återställ resurs"), "add"],
    ["roll_dice", text("Roll Dice", "Бросить кости", "Slå tärningar"), "roll"],
    ["set_calculated_value", text("Set Calculated Value", "Задать вычисляемое значение", "Sätt beräknat värde"), "set"],
  ];
  return rows.map(([key, name, operator]) => ({
    id: `${namespace}.ref.effect.${key}`, key, kind: "effect", name, description: text("", "", ""), categoryId: "wsg.category.effects", packId: namespace, locked: false, previousIds: [],
    operations: [{ id: `${key}.operation_1`, operator, targetAtomicId: "", valueSource: operator === "roll" ? "die" : "input", value: operator === "roll" ? "wsg.atomic.d20" : "" }],
  }));
}

export function buildDndTemplateCatalog(namespace: string) {
  const parameters = buildParameters(namespace);
  const values = buildValues(namespace);
  const effects = buildEffects(namespace);
  return { references: [...parameters, ...values, ...effects] };
}
