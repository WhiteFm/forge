import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("starts without placeholder content records", async () => {
  const source = await readFile(
    new URL("../src/data.ts", import.meta.url),
    "utf8",
  );
  assert.match(source, /entities:\s*\[\]/);
  assert.doesNotMatch(source, /srd52\.class\.fighter|srd52\.item\.longsword/);
});

test("ships a GitHub Pages workflow and Forge branding", async () => {
  const workflow = await readFile(
    new URL("../.github/workflows/pages.yml", import.meta.url),
    "utf8",
  );
  const css = await readFile(
    new URL("../src/styles.css", import.meta.url),
    "utf8",
  );
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(css, /--red-bright:\s*#d1292f/);
  assert.match(css, /--gold:\s*#d9c65f/);
});

test("ships a bilingual English-first interface", async () => {
  const html = await readFile(
    new URL("../index.html", import.meta.url),
    "utf8",
  );
  const app = await readFile(
    new URL("../src/App.tsx", import.meta.url),
    "utf8",
  );
  const en = JSON.parse(
    await readFile(new URL("../src/i18n/en.json", import.meta.url), "utf8"),
  );
  const ru = JSON.parse(
    await readFile(new URL("../src/i18n/ru.json", import.meta.url), "utf8"),
  );
  assert.match(html, /<html lang="en">/);
  assert.match(app, /setLocale\("en"\)/);
  assert.deepEqual(Object.keys(en).sort(), Object.keys(ru).sort());
});

test("includes the SRD Wizard, Evoker, and complete Character Origins project", async () => {
  const project = JSON.parse(
    await readFile(
      new URL("../projects/srd52-wizard-evoker.forge.json", import.meta.url),
      "utf8",
    ),
  );
  const wizard = project.entities.find(
    (entity) => entity.id === "srd52.class.wizard",
  );
  const evoker = project.entities.find(
    (entity) => entity.id === "srd52.subclass.evoker",
  );
  const spells = project.entities.filter(
    (entity) => entity.entityType === "spell",
  );
  assert.equal(project.pack.defaultLocale, "en");
  assert.equal(wizard.levels.length, 20);
  assert.equal(wizard.classProgression.length, 20);
  assert.ok(
    wizard.classProgression.every((row) => row.spellSlots.length === 9),
  );
  assert.deepEqual(
    evoker.subclassLevels.map((row) => row.level),
    [3, 6, 10, 14],
  );
  assert.deepEqual(
    project.entities
      .filter((entity) => entity.entityType === "species")
      .map((entity) => entity.id)
      .sort(),
    [
      "dragonborn",
      "dwarf",
      "elf",
      "gnome",
      "goliath",
      "halfling",
      "human",
      "orc",
      "tiefling",
    ]
      .map((id) => `srd52.species.${id}`)
      .sort(),
  );
  assert.equal(
    project.entities.filter((entity) => entity.entityType === "background")
      .length,
    4,
  );
  assert.deepEqual(
    project.entities
      .filter((entity) => entity.entityType === "background")
      .map((entity) => entity.id)
      .sort(),
    ["acolyte", "criminal", "sage", "soldier"]
      .map((id) => `srd52.background.${id}`)
      .sort(),
  );
  assert.equal(
    project.entities.filter((entity) => entity.entityType === "feat").length,
    17,
  );
  assert.ok(
    [
      "Alert",
      "Magic Initiate",
      "Savage Attacker",
      "Skilled",
      "Ability Score Improvement",
      "Grappler",
      "Archery",
      "Defense",
      "Great Weapon Fighting",
      "Two-Weapon Fighting",
      "Boon of Combat Prowess",
      "Boon of Dimensional Travel",
      "Boon of Fate",
      "Boon of Irresistible Offense",
      "Boon of Spell Recall",
      "Boon of the Night Spirit",
      "Boon of Truesight",
    ].every((name) =>
      project.entities.some(
        (entity) =>
          entity.entityType === "feat" && entity.localization.en.name === name,
      ),
    ),
  );
  assert.equal(spells.length, 334);
  assert.ok(spells.some((spell) => spell.id === "srd52.spell.cure_wounds"));
  assert.ok(spells.some((spell) => spell.id === "srd52.spell.wall_of_fire"));
  assert.ok(spells.some((spell) => spell.id === "srd52.spell.hellish_rebuke"));
  const conjureCelestial = spells.find(
    (spell) => spell.id === "srd52.spell.conjure_celestial",
  );
  assert.deepEqual(conjureCelestial.spellCategories.sort(), [
    "damage",
    "healing",
  ]);
  const spellMaterials = project.entities.filter(
    (entity) =>
      entity.entityType === "item" && entity.itemType === "spell_material",
  );
  assert.equal(spellMaterials.length, 179);
  assert.ok(
    spells
      .filter((spell) => spell.components.material)
      .every((spell) => spell.materialGroups.length > 0),
  );
  assert.ok(
    spells
      .flatMap((spell) => spell.materialGroups ?? [])
      .flatMap((group) => group.entries)
      .every((entry) =>
        spellMaterials.some((item) => item.id === entry.itemId),
      ),
  );
  const messageWire = spells.find((spell) => spell.id === "srd52.spell.message")
    .materialGroups[0].entries[0].itemId;
  assert.equal(messageWire, "srd52.item.copper_wire");
  assert.equal(
    spells.find((spell) => spell.id === "srd52.spell.sending").materialGroups[0]
      .entries[0].itemId,
    messageWire,
  );
  const gentleRepose = spells.find(
    (spell) => spell.id === "srd52.spell.gentle_repose",
  );
  assert.equal(gentleRepose.materialGroups[0].minimumTotalCostCp, 2);
  assert.equal(
    gentleRepose.materialGroups[0].entries[0].itemId,
    "srd52.item.copper_piece",
  );
  const soldier = project.entities.find(
    (entity) => entity.id === "srd52.background.soldier",
  );
  assert.deepEqual(soldier.abilityScoreIncrease.distributions, [
    [2, 1],
    [1, 1, 1],
  ]);
  assert.equal(
    soldier.equipmentOptions[0].choiceItems[0].choiceId,
    "srd52.background.soldier.gaming_set",
  );
  const elf = project.entities.find(
    (entity) => entity.id === "srd52.species.elf",
  );
  assert.equal(elf.creatureTypeId, undefined);
  assert.deepEqual(Object.keys(elf.senses).sort(), [
    "blindsight",
    "darkvision",
    "vision",
  ]);
  assert.ok(
    project.entities.find(
      (entity) => entity.id === "srd52.feature.drow_lineage",
    ).spellGrants.length === 3,
  );
  assert.equal(project.projectId, undefined);
  assert.equal(project.pack.sourceId, undefined);
  assert.ok(
    project.entities.every(
      (entity) =>
        entity.rulesetId === undefined &&
        entity.sourceId === undefined &&
        entity.licenseId === undefined,
    ),
  );
  assert.ok(project.entities.every((entity) => entity.tags === undefined));
});

test("renders a full-width grouped class progression table", async () => {
  const component = await readFile(
    new URL("../src/components.tsx", import.meta.url),
    "utf8",
  );
  const css = await readFile(
    new URL("../src/styles.css", import.meta.url),
    "utf8",
  );
  assert.match(component, /Spell slots by LVL/);
  assert.match(component, /class-progression/);
  assert.match(component, /col-level/);
  assert.match(component, /onPaste=\{pasteTable\}/);
  assert.match(component, /onPointerDown=\{startSelection\}/);
  assert.match(component, /grid-cell-selected/);
  assert.match(component, /data-column=\{-1\}/);
  assert.match(
    component,
    /readOnly[\s\S]{0,80}data-row=\{index\}[\s\S]{0,80}data-column=\{-1\}/,
  );
  assert.match(component, /clipboardData\.getData\("text\/plain"\)/);
  assert.match(component, /\["LVL", "PB", "Cantrips", "Prepared"\]/);
  assert.match(component, /compactLevelText/);
  assert.match(css, /\.progression-table \{[^}]*overflow:\s*visible/);
  assert.match(css, /white-space:\s*nowrap\s*!important/);
  assert.doesNotMatch(css, /\.progression-table \{[^}]*max-height:\s*min/);
});

test("exposes pack-wide validation and a no-code rule builder", async () => {
  const app = await readFile(
    new URL("../src/App.tsx", import.meta.url),
    "utf8",
  );
  const editor = await readFile(
    new URL("../src/VisualRuleBuilder.tsx", import.meta.url),
    "utf8",
  );
  const entityEditor = await readFile(
    new URL("../src/EntityEditor.tsx", import.meta.url),
    "utf8",
  );
  const components = await readFile(
    new URL("../src/components.tsx", import.meta.url),
    "utf8",
  );
  assert.match(app, /Whole pack/);
  assert.match(app, /openIssue\(issue\.entityId\)/);
  assert.match(app, /BUNDLED_PROJECT_URL/);
  assert.match(editor, /Entity from pack/);
  assert.match(editor, /conditionOperators/);
  assert.doesNotMatch(
    entityEditor,
    /grantedSpellsJson|referenceJson|choiceApplicationsJson/,
  );
  assert.match(entityEditor, /GrantedSpellsEditor/);
  assert.match(entityEditor, /ReferenceValueEditor/);
  assert.match(components, /VisualEffectsEditor/);
  assert.match(components, /NumberControl/);
  assert.match(components, /EntityQuantityList/);
});

test("groups subclasses by class and removes choices atomically", async () => {
  const app = await readFile(
    new URL("../src/App.tsx", import.meta.url),
    "utf8",
  );
  const editor = await readFile(
    new URL("../src/EntityEditor.tsx", import.meta.url),
    "utf8",
  );
  const components = await readFile(
    new URL("../src/components.tsx", import.meta.url),
    "utf8",
  );
  assert.match(app, /subclass-group-toggle/);
  assert.match(app, /entity\.classId === classEntity\.id/);
  assert.match(app, /collapsedSubclassGroups/);
  assert.match(editor, /onRemoveChoice=[\s\S]{0,500}choiceApplications:/);
  assert.match(
    components,
    /onClick=\{\(\) => onRemoveChoice\(choice\.id\)\}/,
  );
});

test("ships complete Forge documentation", async () => {
  const index = await readFile(
    new URL("../docs/README.md", import.meta.url),
    "utf8",
  );
  const guide = await readFile(
    new URL("../docs/user-guide.md", import.meta.url),
    "utf8",
  );
  const entities = await readFile(
    new URL("../docs/entity-reference.md", import.meta.url),
    "utf8",
  );
  const rules = await readFile(
    new URL("../docs/rules-and-effects.md", import.meta.url),
    "utf8",
  );
  const pack = await readFile(
    new URL("../docs/pack-format.md", import.meta.url),
    "utf8",
  );
  const validation = await readFile(
    new URL("../docs/validation.md", import.meta.url),
    "utf8",
  );
  const glossary = await readFile(
    new URL("../docs/glossary.md", import.meta.url),
    "utf8",
  );
  assert.match(index, /Руководство пользователя/);
  assert.match(guide, /\.forge\.json/);
  assert.match(guide, /Ctrl\/Cmd \+ V/);
  assert.match(entities, /Class \/ Класс/);
  assert.match(entities, /Spell \/ Заклинание/);
  assert.match(rules, /ChoiceApplication/);
  assert.match(rules, /Атомарный эффект/);
  assert.match(pack, /Канонический `\.wsgpack`/);
  assert.match(validation, /Что валидация пока не проверяет/);
  assert.match(glossary, /`PB` \/ `БМ`/);
});

test("uses manual numeric entry and compact responsive editor grids", async () => {
  const components = await readFile(
    new URL("../src/components.tsx", import.meta.url),
    "utf8",
  );
  const entityEditor = await readFile(
    new URL("../src/EntityEditor.tsx", import.meta.url),
    "utf8",
  );
  const css = await readFile(
    new URL("../src/styles.css", import.meta.url),
    "utf8",
  );
  assert.match(components, /className="numeric-input"/);
  assert.match(components, /inputMode="decimal"[\s\S]{0,50}type="number"/);
  assert.doesNotMatch(components, /type="range"/);
  assert.doesNotMatch(
    components,
    /aria-label="Decrease"|aria-label="Increase"/,
  );
  assert.match(css, /input\[type="number"\]::\-webkit-inner-spin-button/);
  assert.match(css, /container-type:\s*inline-size/);
  assert.match(css, /grid-template-columns:\s*repeat\(4, minmax\(0, 1fr\)\)/);
  assert.doesNotMatch(css, /number-control|number-stepper|step-button/);
  assert.match(
    entityEditor,
    /species-body-group[\s\S]*Movement[\s\S]*species-stat-grid[\s\S]*Senses[\s\S]*species-stat-grid/,
  );
  assert.match(css, /\.species-parameter-groups[\s\S]*\.species-stat-grid/);
  assert.match(
    css,
    /\.field:has\(\.entity-quantity-list\)[\s\S]*grid-column:\s*1 \/ -1/,
  );
  assert.match(css, /\.field:has\(\.repeat-list\)/);
  assert.match(css, /\.field:has\(\.chip-picker\)/);
  assert.match(css, /\.field:has\(\.tag-editor\)/);
  assert.match(css, /display:\s*flex;[\s\S]*flex-wrap:\s*wrap/);
  assert.match(css, /flex:\s*1 0 100%/);
  assert.match(
    css,
    /\.toggle input\s*\{[\s\S]*width:\s*1px;[\s\S]*clip-path:\s*inset\(50%\)/,
  );
});

test("shows localized option labels and a read-only entity debug view", async () => {
  const app = await readFile(new URL("../src/App.tsx", import.meta.url), "utf8");
  const editor = await readFile(new URL("../src/EntityEditor.tsx", import.meta.url), "utf8");
  const rules = await readFile(new URL("../src/VisualRuleBuilder.tsx", import.meta.url), "utf8");
  const labels = await readFile(new URL("../src/option-labels.ts", import.meta.url), "utf8");
  const css = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
  assert.match(labels, /always_on:[\s\S]*Работает постоянно/);
  assert.match(labels, /grant_proficiency:[\s\S]*Выдать владение/);
  assert.match(labels, /">=":[\s\S]*Больше или равно/);
  assert.match(labels, /"\*":[\s\S]*Умножить/);
  assert.match(editor, /optionLabel\(value, locale\)/);
  assert.match(rules, /optionLabel\(operator, locale\)/);
  assert.match(rules, /Рассчитывается автоматически/);
  assert.match(app, /Read only/);
  assert.match(app, /aria-readonly="true"/);
  assert.match(app, /JSON\.stringify\(debugJson/);
  assert.doesNotMatch(css, /\.inspector-tabs button:nth-child\(2\)[\s\S]*display:\s*none/);
});
