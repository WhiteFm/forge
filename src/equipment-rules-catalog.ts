import type {
  AtomicDataType,
  AtomicField,
  AtomicRecord,
  Category,
  EntityTemplate,
  GuidedField,
  LocalText,
  PropertyType,
  ReferenceRecord,
  StorageMode,
} from "./model";

const tr = (en: string, ru: string, sv: string): LocalText => ({ en, ru, sv });
const categoryId = (key: string) => `wsg.category.${key}`;
const atomicId = (key: string) => `wsg.atomic.${key}`;
const parameterId = (key: string) => `wsg.ref.parameter.${key}`;
const valueId = (group: string, key: string) =>
  `wsg.ref.value.${group}.${key}`;

const category = (
  key: string,
  en: string,
  ru: string,
  sv: string,
): Category => ({ id: categoryId(key), name: tr(en, ru, sv), locked: true });

const CATEGORIES: Category[] = [
  category("fundamentals", "Fundamental values", "Фундаментальные значения", "Grundvärden"),
  category("health_defense", "Health and defense", "Здоровье и защита", "Hälsa och försvar"),
  category("abilities_skills", "Abilities and skills", "Характеристики и навыки", "Egenskaper och färdigheter"),
  category("combat_rolls", "Combat and rolls", "Бой и броски", "Strid och slag"),
  category("movement_senses", "Movement and senses", "Передвижение и чувства", "Förflyttning och sinnen"),
  category("conditions_damage", "Conditions and damage", "Состояния и урон", "Tillstånd och skada"),
  category("time_actions", "Time and actions", "Время и действия", "Tid och handlingar"),
  category("dice_randomness", "Dice and randomness", "Кубики и случайность", "Tärningar och slump"),
  category("inventory_economy", "Inventory and economy", "Инвентарь и экономика", "Inventarie och ekonomi"),
  category("item_common", "Equipment: common fields", "Снаряжение: общие поля", "Utrustning: gemensamma fält"),
  category("item_objects", "Equipment: items", "Снаряжение: предметы", "Utrustning: föremål"),
  category("item_tools", "Equipment: tools", "Снаряжение: инструменты", "Utrustning: verktyg"),
  category("item_weapons", "Equipment: weapons", "Снаряжение: оружие", "Utrustning: vapen"),
  category("item_ammunition", "Equipment: ammunition", "Снаряжение: боеприпасы", "Utrustning: ammunition"),
  category("item_wearables", "Equipment: wearable gear", "Снаряжение: экипировка", "Utrustning: buren utrustning"),
  category("item_substances", "Equipment: substances", "Снаряжение: вещества", "Utrustning: substanser"),
  category("item_kits", "Equipment: kits", "Снаряжение: наборы", "Utrustning: paket"),
  category("automation", "Effects and automation", "Эффекты и автоматизация", "Effekter och automatisering"),
  category("reference_values", "Prepared values", "Подготовленные значения", "Förberedda värden"),
  category("template_objects", "Templates: items", "Шаблоны: предметы", "Mallar: föremål"),
  category("template_tools", "Templates: tools", "Шаблоны: инструменты", "Mallar: verktyg"),
  category("template_weapons", "Templates: weapons", "Шаблоны: оружие", "Mallar: vapen"),
  category("template_ammunition", "Templates: ammunition", "Шаблоны: боеприпасы", "Mallar: ammunition"),
  category("template_wearables", "Templates: wearable gear", "Шаблоны: экипировка", "Mallar: buren utrustning"),
  category("template_substances", "Templates: substances", "Шаблоны: вещества", "Mallar: substanser"),
  category("template_kits", "Templates: kits", "Шаблоны: наборы", "Mallar: paket"),
];

type AtomicOptions = Partial<
  Pick<
    AtomicRecord,
    | "unit"
    | "minimum"
    | "maximum"
    | "dieSides"
    | "optionGroup"
    | "fields"
    | "dependencyIds"
    | "calculation"
    | "rule"
    | "warningOnly"
  >
>;

const atomic = (
  key: string,
  name: LocalText,
  description: LocalText,
  categoryKey: string,
  dataType: AtomicDataType,
  storageMode: StorageMode,
  options: AtomicOptions = {},
): AtomicRecord => ({
  id: atomicId(key),
  key,
  name,
  description,
  categoryId: categoryId(categoryKey),
  dataType,
  storageMode,
  packId: "wsg",
  locked: true,
  previousIds: [],
  ...options,
});

const atomField = (
  key: string,
  name: LocalText,
  dataType: AtomicDataType,
  options: Partial<AtomicField> = {},
): AtomicField => ({
  id: key,
  key,
  name,
  dataType,
  required: options.required ?? true,
  ...options,
});

const desc = (en: string, ru: string, sv: string) => tr(en, ru, sv);

const CORE_ATOMICS: AtomicRecord[] = [
  atomic(
    "level",
    tr("Level (LVL)", "Уровень (УР.)", "Nivå (NV.)"),
    desc(
      "Total character level derived only from Experience Points through the level advancement table. Class and multiclass levels are tracked separately and their sum is the total level.",
      "Общий уровень персонажа определяется только Очками Опыта по таблице развития. Уровни базового класса и мультиклассов считаются отдельно, а их сумма образует общий уровень.",
      "Karaktärens totalnivå bestäms endast av erfarenhetspoäng via nivåtabellen. Klass- och multiklassnivåer lagras separat och summan är totalnivån.",
    ),
    "fundamentals",
    "integer",
    "derived",
    { minimum: 1, maximum: 20, dependencyIds: [atomicId("experience_points")] },
  ),
  atomic(
    "experience_points",
    tr("Experience Points (XP)", "Очки Опыта (ОО)", "Erfarenhetspoäng (XP)"),
    desc(
      "Accumulated experience used to determine total character level. The value is changed by CCL or VTT and is evaluated against the advancement table.",
      "Накопленный опыт, по которому определяется общий уровень персонажа. Значение изменяется в CCL или VTT и сверяется с таблицей развития.",
      "Samlad erfarenhet som avgör total karaktärsnivå. Värdet ändras i CCL eller VTT och jämförs med nivåtabellen.",
    ),
    "fundamentals",
    "integer",
    "runtime",
    { minimum: 0 },
  ),
  atomic(
    "proficiency_bonus",
    tr("Proficiency Bonus (PB)", "Бонус Мастерства (БМ)", "Färdighetsbonus (FB)"),
    desc(
      "Level-based bonus added once to a D20 Test when the character has the relevant proficiency. It also participates in spell attacks and saving throw DC calculations and does not stack with itself.",
      "Зависящий от уровня бонус, который один раз добавляется к проверке d20 при наличии подходящего владения. Также участвует в атаках заклинаниями и расчёте Сл спасбросков и не складывается сам с собой.",
      "Nivåbaserad bonus som läggs till en gång på ett d20-test när relevant färdighet finns. Den används även för besvärjelseattacker och räddnings-SG och staplas inte med sig själv.",
    ),
    "fundamentals",
    "integer",
    "derived",
    { minimum: 2, maximum: 6, dependencyIds: [atomicId("level")] },
  ),
  atomic(
    "hit_points",
    tr("Hit Points (HP)", "Очки Здоровья (ОЗ)", "Träffpoäng (TP)"),
    desc(
      "Health record containing maximum, current, and temporary Hit Points. Maximum HP comes from Hit Dice, Constitution, class levels, and effects; current HP changes in play; temporary HP is a separate non-stacking buffer where the holder keeps the old or new value.",
      "Запись здоровья с максимальными, текущими и временными ОЗ. Максимум зависит от костей хитов, Телосложения, уровней классов и эффектов; текущие ОЗ меняются в игре; временные ОЗ являются отдельным нескладывающимся запасом, где сохраняется старое или новое значение.",
      "Hälsopost med maximala, aktuella och tillfälliga träffpoäng. Maximum beror på träfftärningar, Fysik, klassnivåer och effekter; aktuella TP ändras i spel; tillfälliga TP staplas inte och det gamla eller nya värdet behålls.",
    ),
    "health_defense",
    "record",
    "runtime",
    {
      fields: [
        atomField("maximum", tr("Maximum", "Максимум", "Maximum"), "integer", { minimum: 1, storageMode: "derived" }),
        atomField("current", tr("Current", "Текущие", "Aktuella"), "integer", { minimum: 0, storageMode: "runtime" }),
        atomField("temporary", tr("Temporary", "Временные", "Tillfälliga"), "integer", { minimum: 0, storageMode: "runtime" }),
      ],
      dependencyIds: [atomicId("level"), atomicId("ability_score")],
    },
  ),
  atomic(
    "armor_class",
    tr("Armor Class (AC)", "Класс Защиты (КЗ)", "Rustningsklass (RK)"),
    desc(
      "Target number an attack roll must equal or exceed to hit. Its calculation is supplied by worn armor, shields, abilities, and other active effects; only one base AC calculation is used before compatible bonuses.",
      "Целевое число, которого должен достичь или превысить бросок атаки для попадания. Расчёт задаётся надетым доспехом, щитом, характеристиками и активными эффектами; используется одна базовая формула КЗ, после чего применяются совместимые бонусы.",
      "Måltal som en attack måste nå eller överstiga för att träffa. Beräkningen kommer från buren rustning, sköld, egenskaper och aktiva effekter; en grundformel används innan kompatibla bonusar.",
    ),
    "health_defense",
    "integer",
    "derived",
    { minimum: 0 },
  ),
  atomic(
    "ability_score",
    tr("Ability", "Характеристика", "Egenskap"),
    desc(
      "One of the six abilities. The score is entered during character creation and modified by entities within limits; the modifier is derived from the score; saving throw proficiency determines whether PB is added to that ability's save.",
      "Одна из шести характеристик. Значение вводится при создании персонажа и изменяется сущностями в пределах лимитов; модификатор рассчитывается из значения; владение спасброском определяет добавление БМ к спасброску этой характеристики.",
      "En av sex egenskaper. Poängen anges vid skapandet och ändras av entiteter inom gränser; modifieraren beräknas från poängen; räddningsfärdighet avgör om FB läggs till räddningsslaget.",
    ),
    "abilities_skills",
    "record",
    "input",
    {
      fields: [
        atomField("score", tr("Score", "Значение", "Poäng"), "integer", { minimum: 1, maximum: 30 }),
        atomField("modifier", tr("Modifier", "Модификатор", "Modifierare"), "integer", { storageMode: "derived" }),
        atomField("save_proficiency", tr("Saving throw proficiency", "Владение спасброском", "Räddningsfärdighet"), "boolean", { storageMode: "derived" }),
      ],
    },
  ),
  atomic(
    "ability_improvement_points",
    tr("Ability Improvement Points", "Очки Прокачки Характеристик", "Egenskapsförbättringspoäng"),
    desc(
      "Budget used by the character builder to buy or assign ability score increases. Limits and costs are supplied by the selected creation method and active rules.",
      "Бюджет конструктора персонажа для покупки или распределения повышений характеристик. Лимиты и стоимость задаются выбранным способом создания и активными правилами.",
      "Budget som används för att köpa eller fördela egenskapsökningar. Gränser och kostnader bestäms av vald skapelsemetod och aktiva regler.",
    ),
    "abilities_skills",
    "integer",
    "input",
    { minimum: 0 },
  ),
  atomic(
    "skill",
    tr("Skill", "Навык", "Färdighet"),
    desc(
      "An ability check specialization. Its total uses the linked ability modifier, PB when proficient, and an additional PB when Expertise applies; other effects can alter the result.",
      "Специализация проверки характеристики. Итог использует модификатор связанной характеристики, БМ при владении и ещё один БМ при экспертности; прочие эффекты могут изменить результат.",
      "En specialisering av ett egenskapstest. Resultatet använder kopplad egenskapsmodifierare, FB vid färdighet och ytterligare FB vid expertis; andra effekter kan ändra resultatet.",
    ),
    "abilities_skills",
    "record",
    "derived",
    {
      fields: [
        atomField("value", tr("Value", "Значение", "Värde"), "integer", { storageMode: "derived" }),
        atomField("proficient", tr("Proficient", "Владение", "Färdig"), "boolean", { storageMode: "derived" }),
        atomField("expertise", tr("Expertise", "Экспертность", "Expertis"), "boolean", { storageMode: "derived" }),
      ],
      dependencyIds: [atomicId("ability_score"), atomicId("proficiency_bonus")],
    },
  ),
  atomic(
    "initiative",
    tr("Initiative", "Инициатива", "Initiativ"),
    desc(
      "Dexterity check made when combat starts to determine turn order. The total can be changed by proficiencies, advantage or disadvantage, bonuses, and other effects.",
      "Проверка Ловкости в начале боя, определяющая порядок ходов. Итог может изменяться владениями, преимуществом или помехой, бонусами и другими эффектами.",
      "Ett Smidighetstest när strid börjar som avgör turordningen. Resultatet kan ändras av färdigheter, fördel eller nackdel, bonusar och andra effekter.",
    ),
    "combat_rolls",
    "integer",
    "derived",
    { dependencyIds: [atomicId("ability_score")] },
  ),
  atomic(
    "speed",
    tr("Speed", "Скорость", "Hastighet"),
    desc(
      "Movement allowance in feet. Walking, flying, swimming, and climbing speeds are tracked separately and can be replaced, increased, reduced, or set to zero by effects.",
      "Запас перемещения в футах. Скорости ходьбы, полёта, плавания и лазания учитываются отдельно и могут заменяться, увеличиваться, уменьшаться или становиться равными нулю из-за эффектов.",
      "Förflyttning i fot. Gång-, flyg-, sim- och klättringshastighet lagras separat och kan ersättas, ökas, minskas eller sättas till noll av effekter.",
    ),
    "movement_senses",
    "record",
    "derived",
    {
      unit: "ft",
      fields: [
        atomField("walk", tr("Walking", "Ходьба", "Gång"), "integer", { unit: "ft", minimum: 0 }),
        atomField("fly", tr("Flying", "Полёт", "Flyg"), "integer", { unit: "ft", minimum: 0 }),
        atomField("swim", tr("Swimming", "Плавание", "Simning"), "integer", { unit: "ft", minimum: 0 }),
        atomField("climb", tr("Climbing", "Лазание", "Klättring"), "integer", { unit: "ft", minimum: 0 }),
      ],
    },
  ),
  atomic(
    "condition_state",
    tr("Condition State", "Состояние", "Tillstånd"),
    desc(
      "Tracks whether a named game condition is absent or active. Conditions such as Blinded or Stunned define their own consequences and may be applied, removed, or blocked by immunity.",
      "Хранит отсутствие или наличие конкретного игрового состояния. Такие состояния, как Ослеплён или Оглушён, имеют собственные последствия и могут накладываться, сниматься или блокироваться иммунитетом.",
      "Lagrar om ett namngivet speltillstånd saknas eller är aktivt. Tillstånd som Blind eller Bedövad har egna följder och kan läggas på, tas bort eller blockeras av immunitet.",
    ),
    "conditions_damage",
    "boolean",
    "runtime",
  ),
  atomic(
    "damage_trait",
    tr("Damage Trait", "Отношение к типу урона", "Skadeegenskap"),
    desc(
      "Four-state relation to a damage type: normal, vulnerability, resistance, or immunity. Resistance and vulnerability modify applicable damage once, while immunity reduces applicable damage to zero.",
      "Четырёхрежимное отношение к типу урона: обычное, уязвимость, сопротивление или иммунитет. Сопротивление и уязвимость изменяют подходящий урон один раз, а иммунитет сводит его к нулю.",
      "Fyrlägesrelation till en skadetyp: normal, sårbarhet, motstånd eller immunitet. Motstånd och sårbarhet ändrar tillämplig skada en gång, medan immunitet sätter den till noll.",
    ),
    "conditions_damage",
    "enum",
    "derived",
    { optionGroup: "damage_trait" },
  ),
  atomic(
    "roll_state",
    tr("Roll State", "Состояние броска", "Slagläge"),
    desc(
      "Normal, Advantage, or Disadvantage for a D20 Test. Advantage and Disadvantage cancel each other regardless of how many sources grant them.",
      "Обычный бросок, преимущество или помеха для проверки d20. Преимущество и помеха взаимно отменяются независимо от количества источников.",
      "Normalt slag, fördel eller nackdel för ett d20-test. Fördel och nackdel tar ut varandra oavsett antal källor.",
    ),
    "combat_rolls",
    "enum",
    "derived",
    { optionGroup: "roll_state" },
  ),
  atomic(
    "weapon_damage",
    tr("Weapon Damage", "Урон Оружия", "Vapenskada"),
    desc(
      "Damage produced by a weapon mode. It combines the configured dice, damage type, applicable ability modifier, flat bonuses, ammunition, critical rules, and active effects.",
      "Урон выбранного режима оружия. Он объединяет настроенные кости, тип урона, подходящий модификатор характеристики, постоянные бонусы, боеприпас, правила критического попадания и активные эффекты.",
      "Skada från ett vapenläge. Den kombinerar valda tärningar, skadetyp, relevant egenskapsmodifierare, fasta bonusar, ammunition, kritiska regler och aktiva effekter.",
    ),
    "combat_rolls",
    "dice_expression",
    "derived",
  ),
  atomic(
    "attack",
    tr("Attack", "Атака", "Attack"),
    desc(
      "Attack record containing the attack-roll total and whether the attack hit. A typical weapon attack uses d20 plus the selected ability modifier and PB when the attacker has the required proficiency.",
      "Запись атаки с итогом броска атаки и признаком попадания. Обычная атака оружием использует d20, выбранный модификатор характеристики и БМ при наличии требуемого владения.",
      "Attackpost med attackresultat och om attacken träffade. En vanlig vapenattack använder d20, vald egenskapsmodifierare och FB när rätt färdighet finns.",
    ),
    "combat_rolls",
    "record",
    "runtime",
    {
      fields: [
        atomField("value", tr("Attack total", "Итог атаки", "Attackresultat"), "integer"),
        atomField("hit", tr("Hit", "Попадание", "Träff"), "boolean"),
      ],
      dependencyIds: [atomicId("proficiency_bonus"), atomicId("ability_score")],
    },
  ),
  atomic(
    "exhaustion",
    tr("Exhaustion", "Истощение", "Utmattning"),
    desc(
      "Six-level cumulative condition. Its standard penalties are resolved by the game rules. Equipment can additionally change exhaustion by +1 or -1 on every second receipt; the receipt counter is tracked separately from the current level.",
      "Накопительное состояние из шести уровней. Стандартные штрафы применяются правилами игры. Снаряжение дополнительно может изменять истощение на +1 или -1 при каждом втором получении; счётчик получений хранится отдельно от текущего уровня.",
      "Kumulativt tillstånd med sex nivåer. Standardstraffen hanteras av spelreglerna. Utrustning kan dessutom ändra utmattning med +1 eller -1 vid vartannat mottagande; räknaren lagras separat från aktuell nivå.",
    ),
    "conditions_damage",
    "record",
    "runtime",
    {
      fields: [
        atomField("level", tr("Level", "Уровень", "Nivå"), "integer", { minimum: 0, maximum: 6 }),
        atomField("receipts", tr("Times received", "Количество получений", "Antal mottaganden"), "integer", { minimum: 0 }),
        atomField("every_second_delta", tr("Every second receipt", "Каждое второе получение", "Vartannat mottagande"), "integer", { minimum: -1, maximum: 1, storageMode: "derived" }),
      ],
    },
  ),
  atomic(
    "heroic_inspiration",
    tr("Heroic Inspiration", "Героическое Вдохновение", "Heroisk inspiration"),
    desc(
      "A character either has Heroic Inspiration or does not. It can be spent immediately after rolling any die to reroll that die, and the new result must be used; a character cannot hold more than one instance.",
      "Персонаж либо имеет Героическое Вдохновение, либо нет. Его можно потратить сразу после броска любой кости, чтобы перебросить её с обязательным использованием нового результата; хранить больше одного нельзя.",
      "En karaktär har eller saknar Heroisk inspiration. Den kan användas direkt efter valfritt tärningsslag för att slå om tärningen och det nya resultatet måste användas; högst en kan innehas.",
    ),
    "combat_rolls",
    "boolean",
    "runtime",
  ),
  atomic(
    "proficiencies",
    tr("Proficiencies", "Владения", "Färdigheter"),
    desc(
      "Set of weapon, armor, shield, tool, and language proficiencies granted by character content and equipment. Relevant proficiency permits PB to be applied where the associated rule calls for it.",
      "Набор владений оружием, доспехами, щитами, инструментами и языками, полученных от контента персонажа и снаряжения. Подходящее владение позволяет применять БМ там, где этого требует правило.",
      "Mängd vapen-, rustnings-, sköld-, verktygs- och språkfärdigheter från karaktärsinnehåll och utrustning. Relevant färdighet låter FB användas när regeln kräver det.",
    ),
    "abilities_skills",
    "collection",
    "derived",
  ),
  atomic(
    "size",
    tr("Size", "Размер", "Storlek"),
    desc(
      "Creature size category: Tiny, Small, Medium, Large, Huge, or Gargantuan. Size affects occupied space and is used by carrying, movement, reach, and targeting rules.",
      "Категория размера существа: Крошечный, Маленький, Средний, Большой, Огромный или Громадный. Размер влияет на занимаемое пространство и используется в правилах переноски, перемещения, досягаемости и выбора целей.",
      "Varelsens storlekskategori: Pytteliten, Liten, Medelstor, Stor, Enorm eller Gigantisk. Storlek påverkar utrymme samt regler för bärande, rörelse, räckvidd och mål.",
    ),
    "movement_senses",
    "enum",
    "derived",
    { optionGroup: "size" },
  ),
  atomic(
    "carrying_capacity",
    tr("Carrying Capacity", "Грузоподъёмность", "Bärförmåga"),
    desc(
      "Maximum weight a creature can normally carry. The game derives it from Strength and size, then applies equipment and feature modifiers.",
      "Максимальный вес, который существо обычно может нести. Игра рассчитывает его из Силы и размера, после чего применяет изменения от снаряжения и умений.",
      "Maximal vikt en varelse normalt kan bära. Spelet beräknar den från Styrka och storlek och tillämpar sedan ändringar från utrustning och förmågor.",
    ),
    "movement_senses",
    "integer",
    "derived",
    { unit: "lb", minimum: 0, dependencyIds: [atomicId("ability_score"), atomicId("size")] },
  ),
  atomic(
    "jump_distance",
    tr("Jump Distance", "Прыжок", "Hoppdistans"),
    desc(
      "Distance covered by a long or high jump under the applicable movement rules. Strength, movement spent, approach, size, and active effects can change the result.",
      "Дистанция прыжка в длину или высоту по применимым правилам перемещения. Результат могут менять Сила, потраченное перемещение, разбег, размер и активные эффекты.",
      "Sträcka för längd- eller höjdhopp enligt rörelsereglerna. Styrka, förbrukad rörelse, ansats, storlek och aktiva effekter kan ändra resultatet.",
    ),
    "movement_senses",
    "integer",
    "derived",
    { unit: "ft", minimum: 0, dependencyIds: [atomicId("ability_score")] },
  ),
  atomic(
    "saving_throw_dc",
    tr("Saving Throw DC", "Сложность Спасброска", "Räddnings-SG"),
    desc(
      "Difficulty Class a target must meet or exceed on a saving throw against an effect. The source supplies the calculation, commonly a base value plus PB and a selected ability modifier.",
      "Сложность, которой цель должна достичь или превысить спасброском против эффекта. Источник задаёт формулу, обычно базовое значение плюс БМ и выбранный модификатор характеристики.",
      "Svårighetsgrad som målet måste nå eller överstiga på ett räddningsslag mot en effekt. Källan anger beräkningen, ofta basvärde plus FB och vald egenskapsmodifierare.",
    ),
    "combat_rolls",
    "integer",
    "derived",
    { minimum: 0, dependencyIds: [atomicId("proficiency_bonus"), atomicId("ability_score")] },
  ),
  atomic(
    "item_type",
    tr("Equipment Type", "Тип Снаряжения", "Utrustningstyp"),
    desc(
      "Classification used by Forge, CCL, and VTT to select the correct equipment rules and interface. It is represented by system tags rather than free technical code.",
      "Классификация, по которой Forge, CCL и VTT выбирают правильные правила и интерфейс снаряжения. Представляется системными тегами, а не свободным техническим кодом.",
      "Klassificering som Forge, CCL och VTT använder för rätt utrustningsregler och gränssnitt. Den representeras av systemtaggar, inte fri teknisk kod.",
    ),
    "inventory_economy",
    "collection",
    "constant",
  ),
  atomic(
    "round",
    tr("Round", "Раунд", "Runda"),
    desc(
      "Combat time unit equal to 6 seconds. All durations, delays, activation times, and periodic intervals in Forge are stored as whole rounds.",
      "Единица боевого времени, равная 6 секундам. Все длительности, задержки, времена активации и интервалы периодических эффектов в Forge хранятся целыми раундами.",
      "Tidsenhet i strid som motsvarar 6 sekunder. Alla varaktigheter, fördröjningar, aktiveringstider och periodiska intervall lagras som hela rundor.",
    ),
    "time_actions",
    "duration",
    "constant",
    { unit: "round", minimum: 0, rule: tr("1 round = 6 seconds", "1 раунд = 6 секунд", "1 runda = 6 sekunder") },
  ),
  atomic(
    "damage_type",
    tr("Damage Type", "Тип Урона", "Skadetyp"),
    desc(
      "Reference selected by damage, resistance, vulnerability, and immunity rules. Concrete damage types are intentionally created in the project reference list.",
      "Ссылка, выбираемая правилами урона, сопротивления, уязвимости и иммунитета. Конкретные типы урона намеренно создаются в справочнике проекта.",
      "Referens som väljs av regler för skada, motstånd, sårbarhet och immunitet. Konkreta skadetyper skapas avsiktligt i projektets referenslista.",
    ),
    "conditions_damage",
    "reference",
    "input",
    { optionGroup: "damage_type" },
  ),
  atomic(
    "periodic_damage",
    tr("Periodic Damage", "Периодический Урон", "Periodisk skada"),
    desc(
      "Damage repeated at a configured round event. It stores a dice or numeric amount, damage type, first application, interval, duration, save result, and whether a successful repeated save ends the effect.",
      "Урон, повторяющийся при настроенном событии раунда. Хранит числовое значение или кости, тип урона, первое срабатывание, интервал, длительность, результат спасброска и завершение эффекта при успешном повторном спасброске.",
      "Skada som upprepas vid en vald rundhändelse. Den lagrar tärnings- eller talvärde, skadetyp, första utlösning, intervall, varaktighet, räddningsresultat och om ett lyckat upprepat räddningsslag avslutar effekten.",
    ),
    "conditions_damage",
    "record",
    "runtime",
  ),
  atomic(
    "target",
    tr("Target", "Цель", "Mål"),
    desc(
      "ID of the creature, object, item, or other entity selected when an effect is used. CCL or VTT asks the player to choose it when the rule requires a selected target.",
      "ID существа, объекта, предмета или другой сущности, выбранной при использовании эффекта. CCL или VTT просит игрока выбрать цель, когда этого требует правило.",
      "ID för varelsen, objektet, föremålet eller annan entitet som väljs när en effekt används. CCL eller VTT ber spelaren välja när regeln kräver ett mål.",
    ),
    "automation",
    "reference",
    "runtime",
  ),
  atomic(
    "area",
    tr("Area", "Область", "Område"),
    desc(
      "Spatial selection defined by shape, anchor or center, dimensions, movement, and target filter. Creatures or objects inside become effect targets according to VTT positioning; the smallest grid cell is 2.5 feet.",
      "Пространственный выбор, заданный формой, центром или привязкой, размерами, перемещением и фильтром целей. Существа или объекты внутри становятся целями эффекта по позициям VTT; минимальная клетка равна 2,5 фута.",
      "Rumsligt val med form, ankare eller centrum, mått, rörelse och målfilter. Varelser eller objekt inuti blir mål enligt VTT-positioner; minsta rutcell är 2,5 fot.",
    ),
    "automation",
    "position",
    "runtime",
  ),
  atomic(
    "die_roll",
    tr("Die Roll", "Бросок Кубика", "Tärningsslag"),
    desc(
      "Action executed by CCL or VTT that produces a random integer from 1 through the selected die's maximum. Modifiers and reroll rules are applied by the surrounding calculation.",
      "Действие CCL или VTT, создающее случайное целое число от 1 до максимума выбранной кости. Модификаторы и правила переброса применяются окружающим расчётом.",
      "Handling i CCL eller VTT som ger ett slumpmässigt heltal från 1 till vald tärnings maximum. Modifierare och omslagsregler tillämpas av den omgivande beräkningen.",
    ),
    "dice_randomness",
    "action",
    "runtime",
  ),
  atomic(
    "rest",
    tr("Rest", "Отдых", "Vila"),
    desc(
      "Short- or Long-Rest event processed by the game. It restores only resources and temporary values whose definitions subscribe to that rest and applies the rest rules before play continues.",
      "Событие короткого или долгого отдыха, обрабатываемое игрой. Оно восстанавливает только те ресурсы и временные значения, чьи определения подписаны на этот отдых, и применяет правила отдыха перед продолжением игры.",
      "Kort- eller långvilohändelse som behandlas av spelet. Den återställer bara resurser och tillfälliga värden vars definitioner använder vilan och tillämpar viloregler innan spelet fortsätter.",
    ),
    "time_actions",
    "event",
    "runtime",
  ),
  atomic(
    "charges",
    tr("Charges", "Заряды", "Laddningar"),
    desc(
      "Limited-use resource defined by an item's maximum and recovery rules. The item definition stores the maximum and recovery; each character-owned instance stores only its current charges.",
      "Ограниченный ресурс предмета с максимумом и правилами восстановления. Определение предмета хранит максимум и восстановление, а принадлежащий персонажу экземпляр — только текущие заряды.",
      "Begränsad föremålsresurs med maximum och återhämtningsregler. Föremålsdefinitionen lagrar maximum och återhämtning; varje ägt exemplar lagrar aktuella laddningar.",
    ),
    "inventory_economy",
    "integer",
    "runtime",
    { minimum: 0 },
  ),
  atomic(
    "inventory_stack",
    tr("Stack Units", "Количество в Стаке", "Enheter i stapel"),
    desc(
      "Number of identical units represented by one inventory stack definition. There is no separate item quantity field in Forge; a character inventory stores the changing number of owned stacks or units.",
      "Количество одинаковых единиц, представленных одной записью стака. Отдельного поля количества предмета в Forge нет; изменяемое число принадлежащих единиц или стаков хранится в инвентаре персонажа.",
      "Antal identiska enheter som representeras av en stapeldefinition. Forge har inget separat antal-fält; karaktärens inventarie lagrar det föränderliga antalet ägda enheter eller staplar.",
    ),
    "inventory_economy",
    "integer",
    "constant",
    { minimum: 1 },
  ),
  atomic(
    "unit_cost",
    tr("Unit Cost", "Стоимость Одного Предмета", "Styckkostnad"),
    desc(
      "Recommended visible price for one unit, stored as an amount and coin denomination. It does not enforce material-component requirements or market availability.",
      "Рекомендуемая отображаемая цена одной единицы, хранящая сумму и номинал монеты. Она не определяет требования материальных компонентов или доступность на рынке.",
      "Rekommenderat synligt pris för en enhet, lagrat som belopp och myntvalör. Det styr inte materialkomponentkrav eller marknadstillgång.",
    ),
    "inventory_economy",
    "record",
    "constant",
  ),
  atomic(
    "unit_weight",
    tr("Unit Weight", "Вес Одного Предмета", "Styckvikt"),
    desc(
      "Weight of one item unit in pounds. Stack, kit, and container totals are calculated automatically from component quantities and unit weights.",
      "Вес одной единицы предмета в фунтах. Общий вес стака, набора или контейнера автоматически рассчитывается из количества компонентов и их единичного веса.",
      "Vikt för en föremålsenhet i pund. Total vikt för stapel, paket och behållare beräknas automatiskt från komponentantal och styckvikter.",
    ),
    "inventory_economy",
    "decimal",
    "constant",
    { unit: "lb", minimum: 0 },
  ),
  atomic(
    "food_recovery_points",
    tr("Food Recovery Points", "Очки Восстановления Еды", "Matåterhämtningspoäng"),
    desc(
      "Food contribution consumed by the game when attempting a Long Rest. A complete ration provides 30 points; other food can provide less, and the game requires 30 total points for the rest's food requirement.",
      "Вклад еды, расходуемый игрой при попытке долгого отдыха. Полный рацион даёт 30 очков, другая еда может давать меньше; для пищевого требования отдыха игре нужно всего 30 очков.",
      "Matbidrag som spelet förbrukar vid försök till lång vila. En hel ranson ger 30 poäng, annan mat kan ge mindre; totalt 30 poäng krävs för vilans matkrav.",
    ),
    "inventory_economy",
    "integer",
    "constant",
    { minimum: 0, maximum: 30 },
  ),
  atomic(
    "bright_light_radius",
    tr("Bright Light Radius", "Радиус Яркого Света", "Radie för starkt ljus"),
    desc(
      "Radius in which a light source creates Bright Light. Forge derives the additional Dim Light radius as 150 percent of this bright radius, according to the project rule.",
      "Радиус, в котором источник создаёт яркий свет. Кузница рассчитывает дополнительный радиус тусклого света как 150 процентов от яркого радиуса по правилу проекта.",
      "Radie där en ljuskälla skapar starkt ljus. Forge beräknar den extra radien för svagt ljus som 150 procent av denna radie enligt projektregeln.",
    ),
    "movement_senses",
    "integer",
    "constant",
    { unit: "ft", minimum: 0 },
  ),
  atomic(
    "activation_time",
    tr("Activation Time", "Время Активации", "Aktiveringstid"),
    desc(
      "Cost to use an item: Action, Bonus Action, Reaction, part of an attack, or a specified whole number of rounds. A timed activation uses rounds only, with one round equal to 6 seconds.",
      "Стоимость использования предмета: действие, бонусное действие, реакция, часть атаки или указанное целое количество раундов. Длительная активация использует только раунды, где один раунд равен 6 секундам.",
      "Kostnad för att använda ett föremål: handling, bonushandling, reaktion, del av attack eller angivet helt antal rundor. Tidsatt aktivering använder bara rundor, där en runda är 6 sekunder.",
    ),
    "time_actions",
    "record",
    "constant",
  ),
];

const DICE_ATOMICS: AtomicRecord[] = [2, 3, 4, 6, 8, 10, 12, 20, 100].map(
  (sides) =>
    atomic(
      `d${sides}`,
      tr(`d${sides}`, `к${sides}`, `t${sides}`),
      desc(
        `A die that returns a random integer from 1 to ${sides}. It can be selected by visual damage, healing, charge-recovery, and other roll builders.`,
        `Кость, возвращающая случайное целое число от 1 до ${sides}. Выбирается визуальными конструкторами урона, лечения, восстановления зарядов и других бросков.`,
        `En tärning som ger ett slumpmässigt heltal från 1 till ${sides}. Den kan väljas i visuella byggare för skada, läkning, laddningsåterhämtning och andra slag.`,
      ),
      "dice_randomness",
      "die",
      "input",
      { dieSides: sides, minimum: 1, maximum: sides },
    ),
);

const parameter = (
  key: string,
  name: LocalText,
  description: LocalText,
  categoryKey: string,
  propertyType: PropertyType,
  options: Partial<ReferenceRecord> = {},
): ReferenceRecord => ({
  id: parameterId(key),
  key,
  kind: "parameter",
  name,
  description,
  categoryId: categoryId(categoryKey),
  packId: "wsg",
  locked: true,
  previousIds: [],
  propertyType,
  required: options.required ?? false,
  multiple: options.multiple ?? ["references", "entities", "guided_list"].includes(propertyType),
  ...options,
});

const option = (
  group: string,
  key: string,
  name: LocalText,
  categoryKey = "reference_values",
  value: unknown = key,
): ReferenceRecord => ({
  id: valueId(group, key),
  key,
  kind: "value",
  name,
  description: { en: "", ru: "", sv: "" },
  categoryId: categoryId(categoryKey),
  packId: "wsg",
  locked: true,
  previousIds: [],
  optionGroup: group,
  value,
});

const guided = (
  key: string,
  en: string,
  ru: string,
  sv: string,
  type: GuidedField["type"],
  options: Partial<GuidedField> = {},
): GuidedField => ({ key, name: tr(en, ru, sv), type, ...options });

const COMMON_PARAMETERS: ReferenceRecord[] = [
  parameter("description", tr("Description", "Описание", "Beskrivning"), tr("Full localized item description.", "Полное локализованное описание предмета.", "Fullständig lokaliserad föremålsbeskrivning."), "item_common", "localized_long", { required: true }),
  parameter("item_tags", tr("Tags", "Теги", "Taggar"), tr("System tags define equipment category and applicable rules.", "Системные теги определяют категорию снаряжения и применимые правила.", "Systemtaggar bestämmer utrustningskategori och tillämpliga regler."), "item_common", "references", { optionGroup: "item_tag", multiple: true, required: true }),
  parameter("stack_units", tr("Units in Stack", "Количество в Стаке", "Enheter i stapel"), tr("Units represented by one stack definition; there is no separate quantity field.", "Единицы одной записи стака; отдельного поля количества нет.", "Enheter i en stapeldefinition; inget separat antal-fält finns."), "item_common", "integer", { required: true, minimum: 1, defaultValue: 1 }),
  parameter("unit_cost", tr("Unit Cost", "Стоимость Одного Предмета", "Styckkostnad"), tr("Recommended visible price for one unit.", "Рекомендуемая отображаемая цена одной единицы.", "Rekommenderat synligt pris för en enhet."), "item_common", "guided", {
    required: true,
    uiFields: [
      guided("amount", "Amount", "Количество", "Belopp", "number", { minimum: 0, defaultValue: 0 }),
      guided("currency", "Coin", "Номинал", "Mynt", "select", { optionGroup: "currency" }),
    ],
  }),
  parameter("unit_weight", tr("Unit Weight, lb", "Вес Одного Предмета, фнт", "Styckvikt, lb"), tr("Weight of one unit in pounds.", "Вес одной единицы в фунтах.", "Vikt för en enhet i pund."), "item_common", "decimal", { required: true, minimum: 0, defaultValue: 0 }),
  parameter("activation", tr("Activation", "Активация", "Aktivering"), tr("Action cost or whole-round activation time.", "Стоимость действием или время активации в целых раундах.", "Handlingskostnad eller aktiveringstid i hela rundor."), "item_common", "guided", {
    uiFields: [
      guided("type", "Type", "Тип", "Typ", "select", { optionGroup: "activation_type" }),
      guided("rounds", "Rounds", "Раунды", "Rundor", "number", { minimum: 0, defaultValue: 0 }),
      guided("charges_spent", "Charges spent", "Расход зарядов", "Förbrukade laddningar", "number", { minimum: 0, defaultValue: 0 }),
    ],
  }),
  parameter("charges", tr("Charges", "Заряды", "Laddningar"), tr("Maximum charges and recovery events; current charges belong to the character-owned instance.", "Максимум зарядов и события восстановления; текущие заряды принадлежат экземпляру у персонажа.", "Maximala laddningar och återhämtning; aktuella laddningar tillhör det ägda exemplaret."), "item_common", "resource"),
  parameter("requires_wearing", tr("Must Be Worn", "Нужно Надеть", "Måste bäras"), tr("The item's effects require it to be worn in its tagged slot.", "Эффекты предмета требуют надеть его в указанный тегом слот.", "Föremålets effekter kräver att det bärs i sin taggade plats."), "item_common", "boolean"),
  parameter("requires_attunement", tr("Requires Attunement", "Требуется Настройка", "Kräver samhörighet"), tr("The item must be attuned before its attunement-dependent effects operate.", "Предмет должен быть настроен до работы зависящих от настройки эффектов.", "Föremålet måste vara samstämt innan dess beroende effekter fungerar."), "item_common", "boolean"),
  parameter("requires_identification", tr("Requires Identification", "Требуется Опознание", "Kräver identifiering"), tr("The item's hidden properties require identification in the consuming application.", "Скрытые свойства предмета требуют опознания в использующей программе.", "Föremålets dolda egenskaper kräver identifiering i användande program."), "item_common", "boolean"),
  parameter("attunement_requirements", tr("Attunement Requirement Tags", "Теги Требований Настройки", "Taggar för samhörighetskrav"), tr("Class, species, alignment, or other tags required for attunement.", "Теги класса, вида, мировоззрения или других требований настройки.", "Klass-, art-, livsåskådnings- eller andra taggar som krävs."), "item_common", "references", { optionGroup: "requirement_tag", multiple: true }),
  parameter("effects", tr("Effects", "Эффекты", "Effekter"), tr("Visual rules describing exactly when, on whom, by how much, for how long, and under which conditions the item acts. Equal effects do not stack; the highest value applies.", "Визуальные правила, точно задающие когда, на кого, на сколько, как долго и при каких условиях действует предмет. Одинаковые эффекты не складываются; применяется наибольшее значение.", "Visuella regler som anger när, på vem, med hur mycket, hur länge och under vilka villkor föremålet verkar. Lika effekter staplas inte; högsta värdet gäller."), "automation", "rule_set"),
];

const OBJECT_PARAMETERS: ReferenceRecord[] = [
  parameter("object_tags", tr("Item Type Tags", "Теги Типа Предмета", "Föremålstyptaggar"), tr("One or more item functions such as resource, container, food, light source, scroll, or clothing.", "Одна или несколько функций предмета: ресурс, контейнер, еда, источник света, свиток, одежда и другие.", "En eller flera funktioner som resurs, behållare, mat, ljuskälla, skriftrulle eller kläder."), "item_objects", "references", { optionGroup: "object_tag", multiple: true }),
  parameter("container_allowed_items", tr("Allowed Item IDs", "Разрешённые ID Предметов", "Tillåtna föremåls-ID"), tr("Optional explicit item restrictions for a container.", "Необязательные ограничения контейнера по конкретным предметам.", "Valfria begränsningar för specifika föremål."), "item_objects", "entities", { allowedEntityTypes: ["item"], multiple: true }),
  parameter("container_allowed_tags", tr("Allowed Content Tags", "Разрешённые Теги Содержимого", "Tillåtna innehållstaggar"), tr("Optional tag restrictions for container contents.", "Необязательные ограничения содержимого контейнера по тегам.", "Valfria taggbegränsningar för innehållet."), "item_objects", "references", { optionGroup: "item_tag", multiple: true }),
  parameter("container_capacity", tr("Container Capacity", "Вместимость Контейнера", "Behållarkapacitet"), tr("Maximum number of units the container can hold.", "Максимальное количество единиц, помещающихся в контейнер.", "Maximalt antal enheter som behållaren rymmer."), "item_objects", "integer", { minimum: 0 }),
  parameter("contents_weight_counts", tr("Contents Add Weight", "Вес Содержимого Учитывается", "Innehåll räknas i vikt"), tr("When enabled, contained items contribute their normal weight.", "Если включено, содержимое добавляет свой обычный вес.", "När aktiverat bidrar innehållet med sin normala vikt."), "item_objects", "boolean", { defaultValue: true }),
  parameter("food_points", tr("Food Recovery Points", "Очки Восстановления Еды", "Matåterhämtningspoäng"), tr("Points contributed toward the 30 points required by the game for a Long Rest.", "Очки в счёт 30 очков еды, необходимых игре для долгого отдыха.", "Poäng mot de 30 matpoäng som spelet kräver för lång vila."), "item_objects", "integer", { minimum: 0, maximum: 30 }),
  parameter("bright_light_radius", tr("Bright Light Radius, ft", "Радиус Яркого Света, фт", "Radie för starkt ljus, ft"), tr("Bright radius; Dim Light extends automatically to 150 percent of this value.", "Яркий радиус; тусклый свет автоматически продолжается до 150 процентов этого значения.", "Stark radie; svagt ljus sträcker sig automatiskt till 150 procent."), "item_objects", "integer", { minimum: 0 }),
];

const TOOL_PARAMETERS: ReferenceRecord[] = [
  parameter("tool_tags", tr("Tool Type Tags", "Теги Типа Инструмента", "Verktygstyptaggar"), tr("Artisan, musical, magical, or other tool classifications.", "Классификации ремесленного, музыкального, магического или другого инструмента.", "Klassificering som hantverks-, musik-, magiskt eller annat verktyg."), "item_tools", "references", { optionGroup: "tool_tag", multiple: true }),
  parameter("tool_ability", tr("Fixed Ability", "Закреплённая Характеристика", "Fast egenskap"), tr("The single ability fixed by the item creator for using this tool.", "Единственная характеристика, жёстко закреплённая создателем для этого инструмента.", "Den enda egenskap som skaparen har låst för verktyget."), "item_tools", "select", { optionGroup: "ability", required: true }),
  parameter("tool_use_mode", tr("Use Mode", "Режим Использования", "Användningsläge"), tr("Localized explanation of how the tool is used.", "Локализованное описание использования инструмента.", "Lokaliserad beskrivning av hur verktyget används."), "item_tools", "localized_long"),
  parameter("tool_crafting_mode", tr("Crafting Mode", "Режим Изготовления", "Tillverkningsläge"), tr("Localized explanation of how the tool participates in crafting.", "Локализованное описание участия инструмента в изготовлении.", "Lokaliserad beskrivning av verktygets roll i tillverkning."), "item_tools", "localized_long"),
];

const WEAPON_PARAMETERS: ReferenceRecord[] = [
  parameter("weapon_tags", tr("Weapon Tags", "Теги Оружия", "Vapentaggar"), tr("Simple, martial, melee, ranged, thrown, light, finesse, versatile, ammunition, heavy, reach, reload, magical, and other classifications.", "Классификации простого, воинского, рукопашного, дальнобойного, метательного, лёгкого, фехтовального, универсального, боеприпасного, тяжёлого, досягаемого, перезаряжаемого и магического оружия.", "Klassificeringar för enkla, krigiska, närstrids-, distans-, kast-, lätta, finess-, mångsidiga, ammunition-, tunga, räckvidds-, omladdnings- och magiska vapen."), "item_weapons", "references", { optionGroup: "weapon_tag", multiple: true, required: true }),
  parameter("weapon_mastery", tr("Mastery", "Искусность", "Vapenmästerskap"), tr("Mastery selected from project references; concrete masteries are added separately.", "Искусность из справочника проекта; конкретные искусности добавляются отдельно.", "Mästerskap från projektets referenser; konkreta mästerskap läggs till separat."), "item_weapons", "reference", { optionGroup: "weapon_mastery" }),
  parameter("attack_ability", tr("Attack Ability", "Характеристика Атаки", "Attackegenskap"), tr("Ability modifier used for attack and normal weapon damage.", "Модификатор характеристики для атаки и обычного урона оружия.", "Egenskapsmodifierare för attack och normal vapenskada."), "item_weapons", "select", { optionGroup: "ability", required: true }),
  parameter("attack_bonus", tr("Attack Bonus", "Бонус Атаки", "Attackbonus"), tr("Constant bonus applied to the weapon attack roll.", "Постоянный бонус к броску атаки оружием.", "Fast bonus på vapnets attackslag."), "item_weapons", "integer", { defaultValue: 0 }),
  parameter("damage_bonus", tr("Damage Bonus", "Бонус Урона", "Skadebonus"), tr("Constant bonus applied to damage separately from attack bonus.", "Постоянный бонус к урону отдельно от бонуса атаки.", "Fast skadebonus separat från attackbonus."), "item_weapons", "integer", { defaultValue: 0 }),
  parameter("primary_damage", tr("Primary Damage", "Основной Урон", "Primär skada"), tr("Weapon dice and selected project damage type for the normal hit.", "Кости оружия и выбранный тип урона проекта для обычного попадания.", "Vapentärningar och vald skadetyp för en normal träff."), "item_weapons", "damage", { required: true }),
  parameter("additional_damage", tr("Additional Damage", "Добавочный Урон", "Ytterligare skada"), tr("Any additional damage components applied by the weapon.", "Дополнительные компоненты урона оружия.", "Ytterligare skadekomponenter från vapnet."), "item_weapons", "damage"),
  parameter("versatile_damage", tr("Versatile Damage", "Универсальный Урон", "Mångsidig skada"), tr("Damage used in the versatile two-handed mode when that tag is present.", "Урон двуручного универсального режима при наличии соответствующего тега.", "Skada i mångsidigt tvåhandsläge när taggen finns."), "item_weapons", "damage"),
  parameter("conditional_damage", tr("Conditional Damage", "Урон с Условием", "Villkorlig skada"), tr("Damage whose trigger, target, save, frequency, duration, and ending are defined visually in Effects.", "Урон, чьи триггер, цель, спасбросок, частота, длительность и завершение задаются визуально в эффектах.", "Skada vars utlösare, mål, räddning, frekvens, varaktighet och slut anges visuellt i Effekter."), "item_weapons", "damage"),
  parameter("periodic_damage", tr("Periodic Damage", "Периодический Урон", "Periodisk skada"), tr("Repeated damage with first application, start- or end-of-turn timing, interval, duration, and successful-save result.", "Повторяющийся урон с первым применением, моментом начала или конца хода, интервалом, длительностью и результатом успешного спасброска.", "Upprepad skada med första tillämpning, turstart eller turslut, intervall, varaktighet och räddningsresultat."), "item_weapons", "damage"),
  parameter("weapon_hands", tr("Allowed Hand Modes", "Допустимые Режимы Рук", "Tillåtna handlägen"), tr("Check whether the weapon can be used one-handed, two-handed, or both.", "Отметьте использование одной рукой, двумя руками или обоими способами.", "Markera om vapnet kan användas med en hand, två händer eller båda."), "item_weapons", "guided", {
    uiFields: [
      guided("one_handed", "One-handed", "Одноручное", "Enhands", "boolean", { defaultValue: true }),
      guided("two_handed", "Two-handed", "Двуручное", "Tvåhands", "boolean", { defaultValue: false }),
    ],
  }),
  parameter("weapon_range", tr("Range", "Дистанция", "Räckvidd"), tr("Normal and maximum ranged distance in feet.", "Обычная и максимальная дистанция в футах.", "Normal och maximal distans i fot."), "item_weapons", "guided", {
    uiFields: [
      guided("normal", "Normal, ft", "Обычная, фт", "Normal, ft", "number", { minimum: 0 }),
      guided("maximum", "Maximum, ft", "Максимальная, фт", "Maximal, ft", "number", { minimum: 0 }),
    ],
  }),
  parameter("extended_reach", tr("Extended Reach, ft", "Увеличенная Досягаемость, фт", "Utökad räckvidd, ft"), tr("Reach used when the Reach tag is selected.", "Досягаемость при выбранном теге «Досягаемость».", "Räckvidd när taggen Räckvidd är vald."), "item_weapons", "integer", { minimum: 0 }),
  parameter("ammunition_rules", tr("Ammunition and Magazine", "Боеприпасы и Магазин", "Ammunition och magasin"), tr("Required ammunition, units per attack, magazine capacity, and reload cost.", "Требуемый боеприпас, расход за атаку, вместимость магазина и стоимость перезарядки.", "Krävd ammunition, förbrukning per attack, magasinkapacitet och omladdningskostnad."), "item_weapons", "guided", {
    uiFields: [
      guided("ammunition", "Ammunition", "Боеприпас", "Ammunition", "entity", { allowedEntityTypes: ["item"] }),
      guided("per_attack", "Units per attack", "Расход за атаку", "Enheter per attack", "number", { minimum: 0, defaultValue: 1 }),
      guided("magazine", "Magazine capacity", "Вместимость магазина", "Magasinkapacitet", "number", { minimum: 0 }),
      guided("reload_cost", "Reload cost", "Стоимость перезарядки", "Omladdningskostnad", "select", { optionGroup: "activation_type" }),
      guided("reload_rounds", "Reload rounds", "Раунды перезарядки", "Omladdningsrundor", "number", { minimum: 0 }),
    ],
  }),
  parameter("attack_targets", tr("Attack Targets", "Цели Атаки", "Attackmål"), tr("One target, several targets, or an area with its distance and dimensions.", "Одна цель, несколько целей или область с дистанцией и размерами.", "Ett mål, flera mål eller ett område med distans och mått."), "item_weapons", "target_selector"),
  parameter("attack_area", tr("Attack Area", "Область Атаки", "Attackområde"), tr("Area geometry used by an area weapon mode.", "Геометрия области для режима оружия по площади.", "Områdesgeometri för ett områdesvapenläge."), "item_weapons", "area"),
  parameter("critical_rules", tr("Critical Rules", "Правила Критического Попадания", "Kritiska regler"), tr("Minimum natural roll for a critical hit and additional critical damage.", "Минимальный натуральный результат критического попадания и дополнительный критический урон.", "Minsta naturliga resultat för kritisk träff och extra kritisk skada."), "item_weapons", "guided", {
    uiFields: [
      guided("minimum_roll", "Critical from", "Крит от", "Kritisk från", "number", { minimum: 1, maximum: 20, defaultValue: 20 }),
      guided("extra_dice", "Extra critical damage", "Доп. критический урон", "Extra kritisk skada", "dice"),
    ],
  }),
  parameter("returning_thrown", tr("Thrown Weapon Returns", "Метательное Оружие Возвращается", "Kastvapen återvänder"), tr("Returns to the user after the configured thrown attack resolves.", "Возвращается к владельцу после завершения настроенной метательной атаки.", "Återvänder till användaren efter att kastattacken avgjorts."), "item_weapons", "boolean"),
  parameter("extra_damage_limit", tr("Additional Damage Limit", "Ограничение Добавочного Урона", "Gräns för extra skada"), tr("Limits the additional damage to once per attack, turn, round, or target.", "Ограничивает добавочный урон одним срабатыванием за атаку, ход, раунд или цель.", "Begränsar extra skada till en gång per attack, tur, runda eller mål."), "item_weapons", "select", { optionGroup: "frequency" }),
];

const AMMUNITION_PARAMETERS: ReferenceRecord[] = [
  parameter("required_container", tr("Required Container", "Требуемый Контейнер", "Krävd behållare"), tr("Container required to store this ammunition.", "Контейнер, необходимый для хранения этого боеприпаса.", "Behållare som krävs för att förvara ammunitionen."), "item_ammunition", "entity", { allowedEntityTypes: ["item"] }),
  parameter("ammunition_attack_bonus", tr("Attack Bonus", "Бонус Атаки", "Attackbonus"), tr("Attack bonus added when this ammunition is used.", "Бонус атаки при использовании этого боеприпаса.", "Attackbonus när ammunitionen används."), "item_ammunition", "integer", { defaultValue: 0 }),
  parameter("ammunition_damage", tr("Additional Damage", "Дополнительный Урон", "Ytterligare skada"), tr("Additional damage and project damage type supplied by the ammunition.", "Дополнительный урон и тип урона проекта от боеприпаса.", "Ytterligare skada och projektskadetyp från ammunitionen."), "item_ammunition", "damage"),
  parameter("ammunition_hit_effects", tr("Hit Effects", "Эффекты Попадания", "Träffeffekter"), tr("Visual rules triggered when the ammunition hits.", "Визуальные правила при попадании боеприпасом.", "Visuella regler som utlöses när ammunitionen träffar."), "item_ammunition", "rule_set"),
];

const WEARABLE_PARAMETERS: ReferenceRecord[] = [
  parameter("wearable_tags", tr("Armor Weight Tags", "Теги Весовой Категории", "Vikttaggar för rustning"), tr("Light, medium, or heavy classification when the wearable uses an armor weight category.", "Лёгкая, средняя или тяжёлая категория, если экипировка использует весовую категорию доспеха.", "Lätt, medeltung eller tung klassificering när utrustningen använder rustningsvikt."), "item_wearables", "references", { optionGroup: "wearable_tag", multiple: true }),
  parameter("armor_class_rules", tr("Armor Class", "Класс Защиты", "Rustningsklass"), tr("Base AC, ability modifier, and maximum allowed modifier.", "Базовый КЗ, модификатор характеристики и его ограничение.", "Bas-RK, egenskapsmodifierare och dess gräns."), "item_wearables", "guided", {
    uiFields: [
      guided("base", "Base AC", "Базовый КЗ", "Bas-RK", "number", { minimum: 0 }),
      guided("ability", "Ability modifier", "Модификатор характеристики", "Egenskapsmodifierare", "select", { optionGroup: "ability" }),
      guided("modifier_limit", "Modifier limit", "Ограничение модификатора", "Modifierargräns", "number"),
    ],
  }),
  parameter("wearable_requirements", tr("Requirements", "Требования", "Krav"), tr("Ability or initiative requirements and required values.", "Требования характеристики или инициативы и необходимые значения.", "Krav på egenskap eller initiativ och nödvändiga värden."), "item_wearables", "guided_list", {
    uiFields: [
      guided("subject", "Subject", "Параметр", "Parameter", "select", { optionGroup: "requirement_subject" }),
      guided("ability", "Ability", "Характеристика", "Egenskap", "select", { optionGroup: "ability" }),
      guided("value", "Required value", "Требуемое значение", "Krävt värde", "number"),
    ],
  }),
  parameter("stealth_disadvantage", tr("Stealth Disadvantage", "Помеха Скрытности", "Nackdel på Smyga"), tr("Imposes Disadvantage on applicable Stealth checks while worn.", "Даёт помеху подходящим проверкам Скрытности при ношении.", "Ger nackdel på tillämpliga Smyga-test när föremålet bärs."), "item_wearables", "boolean"),
  parameter("curse", tr("Curse", "Проклятие", "Förbannelse"), tr("Curse effect, removal lock, temporary permission to remove, and final destruction condition are expressed visually.", "Эффект проклятия, запрет снятия, временное разрешение снять и условие окончательного уничтожения задаются визуально.", "Förbannelseeffekt, avtagandeförbud, tillfälligt tillstånd att ta av och slutligt förstöringsvillkor anges visuellt."), "item_wearables", "guided", {
    uiFields: [
      guided("cursed", "Cursed", "Проклято", "Förbannat", "boolean"),
      guided("cannot_remove", "Cannot remove", "Нельзя снять", "Kan inte tas av", "boolean"),
      guided("temporary_removal_condition", "Temporary removal condition", "Условие временного снятия", "Villkor för tillfällig avtagning", "reference", { optionGroup: "condition" }),
      guided("destruction_condition", "Curse destruction condition", "Условие уничтожения проклятия", "Villkor för att förstöra förbannelsen", "select", { optionGroup: "curse_destruction" }),
    ],
  }),
  parameter("other_creature_roll_range", tr("Other Creature Roll Range, ft", "Дистанция Воздействия на Бросок Другого, фт", "Räckvidd för annans slag, ft"), tr("Maximum distance for an effect that changes another creature's roll; the GM resolves the reroll decision after the result is visible.", "Максимальная дистанция эффекта, меняющего бросок другого существа; решение о перебросе принимает ГМ после просмотра результата.", "Maximalt avstånd för en effekt som ändrar en annan varelses slag; SL avgör omslaget efter att resultatet visats."), "item_wearables", "integer", { minimum: 0 }),
  parameter("exhaustion_every_second", tr("Every Second Exhaustion Receipt", "Каждое Второе Получение Истощения", "Vartannat mottagande av utmattning"), tr("Additional change of -1, 0, or +1 applied on every second receipt of Exhaustion.", "Дополнительное изменение -1, 0 или +1 при каждом втором получении истощения.", "Ytterligare ändring -1, 0 eller +1 vid vartannat mottagande av utmattning."), "item_wearables", "integer", { minimum: -1, maximum: 1, defaultValue: 0 }),
  parameter("curse_effects", tr("Curse Effects", "Эффекты Проклятия", "Förbannelseeffekter"), tr("Visual rules applied by the curse while its conditions are met.", "Визуальные правила проклятия при выполнении его условий.", "Visuella regler som förbannelsen tillämpar när villkoren uppfylls."), "item_wearables", "rule_set"),
];

const SUBSTANCE_PARAMETERS: ReferenceRecord[] = [
  parameter("substance_tags", tr("Additional Substance Tags", "Дополнительные Теги Вещества", "Ytterligare substanstaggar"), tr("Optional Drug or Oil classification; Potion, Poison, Substance, Magical, and Consumable are common item tags.", "Необязательная классификация «Наркотик» или «Масло»; зелье, яд, вещество, магический и расходуемый задаются общими тегами.", "Valfri klassificering som Drog eller Olja; Dryck, Gift, Substans, Magisk och Förbrukningsbar är gemensamma taggar."), "item_substances", "references", { optionGroup: "substance_tag", multiple: true }),
  parameter("application_method", tr("Application Method", "Способ Применения", "Appliceringssätt"), tr("Drink, inhale, touch, or apply to a weapon.", "Выпить, вдохнуть, коснуться или нанести на оружие.", "Dricka, andas in, beröra eller applicera på vapen."), "item_substances", "select", { optionGroup: "application_method", required: true }),
  parameter("doses_spent", tr("Charges per Use", "Заряды за Использование", "Laddningar per användning"), tr("Number of charge-based doses spent by one use.", "Количество доз-зарядов за одно использование.", "Antal laddningsbaserade doser som används."), "item_substances", "integer", { minimum: 1, defaultValue: 1 }),
  parameter("application_rounds", tr("Application Time, rounds", "Время Нанесения, раунды", "Appliceringstid, rundor"), tr("Whole rounds required to apply the substance.", "Целые раунды, необходимые для применения вещества.", "Hela rundor som krävs för applicering."), "item_substances", "duration_rounds", { minimum: 0 }),
  parameter("delay_rounds", tr("Effect Delay, rounds", "Задержка Эффекта, раунды", "Effektfördröjning, rundor"), tr("Whole rounds between application and the first effect.", "Целые раунды между применением и первым эффектом.", "Hela rundor mellan applicering och första effekt."), "item_substances", "duration_rounds", { minimum: 0 }),
  parameter("substance_target", tr("Target", "Цель", "Mål"), tr("Self, another creature, or a weapon selected by the user in CCL or VTT.", "Сам персонаж, другое существо или оружие, выбранное пользователем в CCL или VTT.", "Användaren själv, annan varelse eller vapen valt i CCL eller VTT."), "item_substances", "target_selector"),
  parameter("inhaled_area", tr("Inhaled Area", "Область Вдыхания", "Inandningsområde"), tr("Area used when the substance is inhaled.", "Область для вдыхаемого вещества.", "Område som används när substansen andas in."), "item_substances", "area"),
  parameter("coating_hits", tr("Coating Hit Uses", "Попадания Покрытия", "Träffar med beläggning"), tr("Number of successful hits before a weapon coating is exhausted.", "Количество успешных попаданий до расходования покрытия оружия.", "Antal lyckade träffar innan vapenbeläggningen tar slut."), "item_substances", "integer", { minimum: 0 }),
  parameter("coating_affects_ammunition", tr("Works Through Ammunition", "Действует Через Боеприпасы", "Fungerar via ammunition"), tr("A weapon coating also applies when the coated weapon attacks with ammunition.", "Покрытие оружия также действует при атаке этим оружием через боеприпасы.", "Vapenbeläggningen gäller även när vapnet attackerar med ammunition."), "item_substances", "boolean"),
  parameter("substance_effects", tr("Use Effects", "Эффекты Использования", "Användningseffekter"), tr("Typed visual effects: numeric changes, roll modifiers, conditions, damage traits, saves, periodic results, healing, and early ending conditions.", "Типизированные визуальные эффекты: числовые изменения, модификаторы бросков, состояния, отношения к урону, спасброски, периодические результаты, лечение и условия досрочного окончания.", "Typade visuella effekter: taländringar, slagmodifierare, tillstånd, skadeegenskaper, räddningar, periodiska resultat, läkning och villkor för tidigt slut."), "item_substances", "rule_set"),
];

const KIT_PARAMETERS: ReferenceRecord[] = [
  parameter("kit_contents", tr("Kit Contents", "Содержимое Набора", "Paketinnehåll"), tr("Items and their quantities. Cycles are rejected and component changes update calculated totals.", "Предметы и их количество. Циклы запрещены, а изменения компонентов обновляют рассчитанные итоги.", "Föremål och antal. Cykler avvisas och komponentändringar uppdaterar beräknade totaler."), "item_kits", "guided_list", {
    required: true,
    uiFields: [
      guided("item", "Item", "Предмет", "Föremål", "entity", { allowedEntityTypes: ["item"] }),
      guided("quantity", "Quantity", "Количество", "Antal", "number", { minimum: 1, defaultValue: 1 }),
    ],
  }),
  parameter("kit_container", tr("Container", "Контейнер", "Behållare"), tr("Container into which the kit is unpacked.", "Контейнер, в который распаковывается набор.", "Behållare som paketet packas upp i."), "item_kits", "entity", { allowedEntityTypes: ["item"] }),
  parameter("kit_calculated_cost", tr("Calculated Total Cost", "Рассчитанная Общая Стоимость", "Beräknad totalkostnad"), tr("Read-only sum of component unit costs multiplied by quantities.", "Нередактируемая сумма стоимостей компонентов с учётом количества.", "Skrivskyddad summa av komponentkostnader gånger antal."), "item_kits", "calculation"),
  parameter("kit_calculated_weight", tr("Calculated Total Weight", "Рассчитанный Общий Вес", "Beräknad totalvikt"), tr("Read-only sum of component unit weights multiplied by quantities.", "Нередактируемая сумма веса компонентов с учётом количества.", "Skrivskyddad summa av komponentvikter gånger antal."), "item_kits", "calculation"),
];

const VALUES: ReferenceRecord[] = [
  ...[
    ["strength", "Strength", "Сила", "Styrka"],
    ["dexterity", "Dexterity", "Ловкость", "Smidighet"],
    ["constitution", "Constitution", "Телосложение", "Fysik"],
    ["intelligence", "Intelligence", "Интеллект", "Intelligens"],
    ["wisdom", "Wisdom", "Мудрость", "Visdom"],
    ["charisma", "Charisma", "Харизма", "Karisma"],
  ].map(([key, en, ru, sv]) => option("ability", key, tr(en, ru, sv))),
  ...[
    ["cp", "Copper Piece (cp)", "Медная монета (мм)", "Kopparmynt (km)", 1],
    ["sp", "Silver Piece (sp)", "Серебряная монета (см)", "Silvermynt (sm)", 10],
    ["ep", "Electrum Piece (ep)", "Электрумовая монета (эм)", "Elektrummynt (em)", 50],
    ["gp", "Gold Piece (gp)", "Золотая монета (зм)", "Guldmynt (gm)", 100],
    ["pp", "Platinum Piece (pp)", "Платиновая монета (пм)", "Platinamynt (pm)", 1000],
  ].map(([key, en, ru, sv, cp]) => option("currency", String(key), tr(String(en), String(ru), String(sv)), "reference_values", { cp })),
  ...[
    ["action", "Action", "Действие", "Handling"],
    ["bonus_action", "Bonus Action", "Бонусное действие", "Bonushandling"],
    ["reaction", "Reaction", "Реакция", "Reaktion"],
    ["attack_part", "Part of an Attack", "Часть атаки", "Del av attack"],
    ["rounds", "Rounds", "Раунды", "Rundor"],
  ].map(([key, en, ru, sv]) => option("activation_type", key, tr(en, ru, sv))),
  ...[
    ["once_per_attack", "Once per attack", "Раз за атаку", "En gång per attack"],
    ["once_per_turn", "Once per turn", "Раз за ход", "En gång per tur"],
    ["once_per_round", "Once per round", "Раз за раунд", "En gång per runda"],
    ["once_per_target", "Once per target", "Раз на цель", "En gång per mål"],
    ["every_time", "Every time", "Каждый раз", "Varje gång"],
  ].map(([key, en, ru, sv]) => option("frequency", key, tr(en, ru, sv))),
  ...[
    ["normal", "Normal", "Обычный", "Normal"],
    ["resistance", "Resistance", "Сопротивление", "Motstånd"],
    ["vulnerability", "Vulnerability", "Уязвимость", "Sårbarhet"],
    ["immunity", "Immunity", "Иммунитет", "Immunitet"],
  ].map(([key, en, ru, sv]) => option("damage_trait", key, tr(en, ru, sv))),
  ...[
    ["normal", "Normal", "Обычный", "Normal"],
    ["advantage", "Advantage", "Преимущество", "Fördel"],
    ["disadvantage", "Disadvantage", "Помеха", "Nackdel"],
  ].map(([key, en, ru, sv]) => option("roll_state", key, tr(en, ru, sv))),
  ...[
    ["tiny", "Tiny (¼ square)", "Крошечный (¼ клетки)", "Pytteliten (¼ ruta)"],
    ["small", "Small (1 square)", "Маленький (1 клетка)", "Liten (1 ruta)"],
    ["medium", "Medium (1 square)", "Средний (1 клетка)", "Medelstor (1 ruta)"],
    ["large", "Large (4 squares)", "Большой (4 клетки)", "Stor (4 rutor)"],
    ["huge", "Huge (9 squares)", "Огромный (9 клеток)", "Enorm (9 rutor)"],
    ["gargantuan", "Gargantuan (16 squares)", "Громадный (16 клеток)", "Gigantisk (16 rutor)"],
  ].map(([key, en, ru, sv]) => option("size", key, tr(en, ru, sv))),
  ...[
    ["object", "Item", "Предмет", "Föremål"], ["weapon", "Weapon", "Оружие", "Vapen"], ["ammunition", "Ammunition", "Боеприпасы", "Ammunition"],
    ["armor", "Armor", "Доспех", "Rustning"], ["shield", "Shield", "Щит", "Sköld"], ["bracers", "Bracers", "Наручи", "Armskenor"],
    ["leggings", "Leggings", "Поножи", "Benskydd"], ["belt", "Belt", "Пояс", "Bälte"], ["helmet", "Helmet or Hat", "Шлем или шляпа", "Hjälm eller hatt"],
    ["cloak", "Cloak", "Плащ", "Mantel"], ["amulet", "Amulet", "Амулет", "Amulett"], ["ring", "Ring", "Кольцо", "Ring"],
    ["potion", "Potion", "Зелье", "Dryck"], ["poison", "Poison", "Яд", "Gift"], ["substance", "Substance", "Вещество", "Substans"],
    ["tool", "Tool", "Инструмент", "Verktyg"], ["kit", "Kit", "Набор", "Paket"], ["magical", "Magical", "Магический", "Magisk"],
    ["consumable", "Consumable", "Расходуемый", "Förbrukningsbar"], ["requires_proficiency", "Requires proficiency", "Требует владения", "Kräver färdighet"],
  ].map(([key, en, ru, sv]) => option("item_tag", key, tr(en, ru, sv))),
  ...[
    ["crafting_resource", "Crafting Resource", "Ресурс для изготовления", "Tillverkningsresurs"],
    ["spell_resource", "Spell Component", "Ресурс для заклинания", "Besvärjelsekomponent"],
    ["container", "Container", "Ёмкость или контейнер", "Behållare"], ["trap", "Trap Gear", "Ловушка", "Fällutrustning"],
    ["clothing", "Clothing", "Одежда", "Kläder"], ["food", "Food", "Еда", "Mat"], ["light_source", "Light Source", "Источник света", "Ljuskälla"],
    ["scroll", "Scroll", "Свиток", "Skriftrulle"], ["other", "Other", "Иное", "Annat"],
  ].map(([key, en, ru, sv]) => option("object_tag", key, tr(en, ru, sv))),
  ...[
    ["artisan", "Artisan Tool", "Ремесленный инструмент", "Hantverksverktyg"],
    ["musical", "Musical Instrument", "Музыкальный инструмент", "Musikinstrument"],
    ["magical", "Magical Tool", "Магический инструмент", "Magiskt verktyg"],
  ].map(([key, en, ru, sv]) => option("tool_tag", key, tr(en, ru, sv))),
  ...[
    ["simple", "Simple", "Простое", "Enkelt"], ["martial", "Martial", "Воинское", "Krigiskt"], ["melee", "Melee", "Рукопашное", "Närstrid"],
    ["ranged", "Ranged", "Дальнобойное", "Distans"], ["thrown", "Thrown", "Метательное", "Kast"], ["light", "Light", "Лёгкое", "Lätt"],
    ["finesse", "Finesse", "Фехтовальное", "Finess"], ["versatile", "Versatile", "Универсальное", "Mångsidigt"], ["ammunition", "Ammunition", "Боеприпас", "Ammunition"],
    ["heavy", "Heavy", "Тяжёлое", "Tungt"], ["reach", "Reach", "Досягаемость", "Räckvidd"], ["reload", "Reload", "Перезарядка", "Omladdning"],
  ].map(([key, en, ru, sv]) => option("weapon_tag", key, tr(en, ru, sv))),
  ...[
    ["light", "Light", "Лёгкий", "Lätt"], ["medium", "Medium", "Средний", "Medeltung"], ["heavy", "Heavy", "Тяжёлый", "Tung"],
  ].map(([key, en, ru, sv]) => option("wearable_tag", key, tr(en, ru, sv))),
  ...[
    ["drug", "Drug", "Наркотик", "Drog"], ["oil", "Oil", "Масло", "Olja"],
  ].map(([key, en, ru, sv]) => option("substance_tag", key, tr(en, ru, sv))),
  ...[
    ["drink", "Drink", "Выпить", "Dricka"], ["inhale", "Inhale", "Вдохнуть", "Andas in"], ["touch", "Touch", "Коснуться", "Beröra"], ["weapon", "Apply to Weapon", "Нанести на оружие", "Applicera på vapen"],
  ].map(([key, en, ru, sv]) => option("application_method", key, tr(en, ru, sv))),
  ...[["ability", "Ability", "Характеристика", "Egenskap"], ["initiative", "Initiative", "Инициатива", "Initiativ"]].map(([key, en, ru, sv]) => option("requirement_subject", key, tr(en, ru, sv))),
  ...[["special_effect", "Specified Effect", "Указанный эффект", "Angiven effekt"], ["destroy_item", "Destroy the Item", "Уничтожить предмет", "Förstör föremålet"], ["manual", "GM Decision", "Решение ГМ", "SL-beslut"]].map(([key, en, ru, sv]) => option("curse_destruction", key, tr(en, ru, sv))),
  ...[
    ["blinded", "Blinded", "Ослеплён", "Blind"], ["charmed", "Charmed", "Очарован", "Charmed"], ["deafened", "Deafened", "Оглох", "Döv"],
    ["frightened", "Frightened", "Испуган", "Skrämd"], ["grappled", "Grappled", "Схвачен", "Grapplad"], ["incapacitated", "Incapacitated", "Недееспособен", "Oförmögen"],
    ["invisible", "Invisible", "Невидим", "Osynlig"], ["paralyzed", "Paralyzed", "Парализован", "Paralyserad"], ["petrified", "Petrified", "Окаменел", "Förstenad"],
    ["poisoned", "Poisoned", "Отравлен", "Förgiftad"], ["prone", "Prone", "Сбит с ног", "Liggande"], ["restrained", "Restrained", "Опутан", "Fasthållen"],
    ["stunned", "Stunned", "Оглушён", "Bedövad"], ["unconscious", "Unconscious", "Без сознания", "Medvetslös"],
  ].map(([key, en, ru, sv]) => option("condition", key, tr(en, ru, sv))),
  ...[
    ["darkvision", "Darkvision", "Тёмное зрение", "Mörkersyn"], ["blindsight", "Blindsight", "Слепое зрение", "Blindsyn"], ["truesight", "Truesight", "Истинное зрение", "Sannsikt"], ["normal", "Normal Vision", "Обычное зрение", "Normal syn"],
  ].map(([key, en, ru, sv]) => option("sense_type", key, tr(en, ru, sv))),
];

const BASE_FIELD_KEYS = [
  "description",
  "item_tags",
  "stack_units",
  "unit_cost",
  "unit_weight",
  "activation",
  "charges",
  "requires_wearing",
  "requires_attunement",
  "requires_identification",
  "attunement_requirements",
  "effects",
];

type TemplateSpec = {
  key: string;
  name: LocalText;
  category: string;
  fields: string[];
  defaultTags: string[];
};

const templateSpecs: TemplateSpec[] = [
  { key: "item", name: tr("Item", "Предмет", "Föremål"), category: "template_objects", fields: ["object_tags", "container_allowed_items", "container_allowed_tags", "container_capacity", "contents_weight_counts", "food_points", "bright_light_radius"], defaultTags: ["object"] },
  { key: "tool", name: tr("Tool", "Инструмент", "Verktyg"), category: "template_tools", fields: ["tool_tags", "tool_ability", "tool_use_mode", "tool_crafting_mode"], defaultTags: ["tool"] },
  { key: "weapon", name: tr("Weapon", "Оружие", "Vapen"), category: "template_weapons", fields: ["weapon_tags", "weapon_mastery", "attack_ability", "attack_bonus", "damage_bonus", "primary_damage", "additional_damage", "versatile_damage", "conditional_damage", "periodic_damage", "weapon_hands", "weapon_range", "extended_reach", "ammunition_rules", "attack_targets", "attack_area", "critical_rules", "returning_thrown", "extra_damage_limit"], defaultTags: ["weapon"] },
  { key: "ammunition", name: tr("Ammunition", "Боеприпасы", "Ammunition"), category: "template_ammunition", fields: ["required_container", "ammunition_attack_bonus", "ammunition_damage", "ammunition_hit_effects"], defaultTags: ["ammunition"] },
  { key: "armor", name: tr("Armor", "Доспех", "Rustning"), category: "template_wearables", fields: ["wearable_tags", "armor_class_rules", "wearable_requirements", "stealth_disadvantage", "curse", "other_creature_roll_range", "exhaustion_every_second", "curse_effects"], defaultTags: ["armor"] },
  { key: "shield", name: tr("Shield", "Щит", "Sköld"), category: "template_wearables", fields: ["wearable_tags", "armor_class_rules", "wearable_requirements", "stealth_disadvantage", "curse", "other_creature_roll_range", "exhaustion_every_second", "curse_effects"], defaultTags: ["shield"] },
  { key: "bracers", name: tr("Bracers", "Наручи", "Armskenor"), category: "template_wearables", fields: ["wearable_tags", "armor_class_rules", "wearable_requirements", "curse", "other_creature_roll_range", "exhaustion_every_second", "curse_effects"], defaultTags: ["bracers"] },
  { key: "leggings", name: tr("Leggings", "Поножи", "Benskydd"), category: "template_wearables", fields: ["wearable_tags", "armor_class_rules", "wearable_requirements", "curse", "other_creature_roll_range", "exhaustion_every_second", "curse_effects"], defaultTags: ["leggings"] },
  { key: "belt", name: tr("Belt", "Пояс", "Bälte"), category: "template_wearables", fields: ["wearable_tags", "wearable_requirements", "curse", "other_creature_roll_range", "exhaustion_every_second", "curse_effects"], defaultTags: ["belt"] },
  { key: "helmet", name: tr("Helmet or Hat", "Шлем или Шляпа", "Hjälm eller hatt"), category: "template_wearables", fields: ["wearable_tags", "wearable_requirements", "curse", "other_creature_roll_range", "exhaustion_every_second", "curse_effects"], defaultTags: ["helmet"] },
  { key: "cloak", name: tr("Cloak", "Плащ", "Mantel"), category: "template_wearables", fields: ["wearable_tags", "wearable_requirements", "curse", "other_creature_roll_range", "exhaustion_every_second", "curse_effects"], defaultTags: ["cloak"] },
  { key: "amulet", name: tr("Amulet", "Амулет", "Amulett"), category: "template_wearables", fields: ["wearable_tags", "wearable_requirements", "curse", "other_creature_roll_range", "exhaustion_every_second", "curse_effects"], defaultTags: ["amulet"] },
  { key: "ring", name: tr("Ring", "Кольцо", "Ring"), category: "template_wearables", fields: ["wearable_tags", "wearable_requirements", "curse", "other_creature_roll_range", "exhaustion_every_second", "curse_effects"], defaultTags: ["ring"] },
  { key: "potion", name: tr("Potion", "Зелье", "Dryck"), category: "template_substances", fields: ["substance_tags", "application_method", "doses_spent", "application_rounds", "delay_rounds", "substance_target", "inhaled_area", "coating_hits", "coating_affects_ammunition", "substance_effects"], defaultTags: ["potion", "consumable"] },
  { key: "poison", name: tr("Poison", "Яд", "Gift"), category: "template_substances", fields: ["substance_tags", "application_method", "doses_spent", "application_rounds", "delay_rounds", "substance_target", "inhaled_area", "coating_hits", "coating_affects_ammunition", "substance_effects"], defaultTags: ["poison", "consumable"] },
  { key: "substance", name: tr("Substance", "Вещество", "Substans"), category: "template_substances", fields: ["substance_tags", "application_method", "doses_spent", "application_rounds", "delay_rounds", "substance_target", "inhaled_area", "coating_hits", "coating_affects_ammunition", "substance_effects"], defaultTags: ["substance"] },
  { key: "kit", name: tr("Equipment Kit", "Набор Снаряжения", "Utrustningspaket"), category: "template_kits", fields: ["kit_contents", "kit_container", "kit_calculated_cost", "kit_calculated_weight"], defaultTags: ["kit"] },
];

function buildTemplates(references: ReferenceRecord[]): EntityTemplate[] {
  const byKey = new Map(references.filter((entry) => entry.kind === "parameter").map((entry) => [entry.key, entry]));
  return templateSpecs.map((spec) => {
    const keys = [...BASE_FIELD_KEYS, ...spec.fields];
    return {
      id: `mygame.temp.${spec.key}`,
      type: "item",
      categoryId: categoryId(spec.category),
      name: spec.name,
      previousIds: [],
      fields: keys.map((key, order) => {
        const reference = byKey.get(key);
        if (!reference) throw new Error(`Missing equipment parameter: ${key}`);
        return {
          id: `mygame.temp.${spec.key}.field_${order + 1}`,
          referenceId: reference.id,
          required: Boolean(reference.required),
          multiple: Boolean(reference.multiple),
          order,
          defaultValue:
            key === "item_tags"
              ? spec.defaultTags.map((tag) => valueId("item_tag", tag))
              : reference.defaultValue,
        };
      }),
    };
  });
}

export function buildEquipmentRulesCatalog() {
  const references = [
    ...COMMON_PARAMETERS,
    ...OBJECT_PARAMETERS,
    ...TOOL_PARAMETERS,
    ...WEAPON_PARAMETERS,
    ...AMMUNITION_PARAMETERS,
    ...WEARABLE_PARAMETERS,
    ...SUBSTANCE_PARAMETERS,
    ...KIT_PARAMETERS,
    ...VALUES,
  ];
  return {
    categories: structuredClone(CATEGORIES),
    atomics: structuredClone([...CORE_ATOMICS, ...DICE_ATOMICS]),
    references: structuredClone(references),
    templates: structuredClone(buildTemplates(references)),
  };
}
