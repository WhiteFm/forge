import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

async function withModel(run) {
  const { createServer } = await import("vite");
  const server = await createServer({
    root: fileURLToPath(new URL("..", import.meta.url)),
    server: { middlewareMode: true },
    appType: "custom",
  });
  try {
    await run(await server.ssrLoadModule("/src/model.ts"));
  } finally {
    await server.close();
  }
}

test("starts with schema 16, the new equipment rules catalog, and no entities", async () => {
  await withModel(async (model) => {
    const project = model.createCleanProject();
    assert.equal(project.catalogVersion, 16);
    assert.equal(project.ruleEngine.roundSeconds, 6);
    assert.equal(project.ruleEngine.gridUnitFeet, 2.5);
    assert.ok(project.categories.length > 20);
    assert.ok(project.atomics.length > 30);
    assert.ok(project.references.length > 100);
    assert.equal(project.templates.length, 17);
    assert.deepEqual(project.entities, []);
    assert.deepEqual(project.dependencies, []);
    assert.ok(
      project.atomics.every(
        (item) =>
          item.description.en && item.description.ru && item.description.sv,
      ),
    );
    assert.equal(
      project.references.some((item) => item.key === "base_item"),
      false,
    );
    assert.equal(
      project.references.some((item) => item.key === "quantity"),
      false,
    );
    const tagFieldKeys = new Set([
      "item_tags",
      "object_tags",
      "tool_tags",
      "weapon_tags",
      "wearable_tags",
      "substance_tags",
      "container_allowed_tags",
    ]);
    const tagFields = project.references.filter(
      (item) => item.kind === "parameter" && tagFieldKeys.has(item.key),
    );
    assert.equal(tagFields.length, tagFieldKeys.size);
    assert.ok(tagFields.every((item) => item.optionGroup === "item_tag"));
    assert.equal(
      project.references.some((item) =>
        [
          "object_tag",
          "tool_tag",
          "weapon_tag",
          "wearable_tag",
          "substance_tag",
          "ammunition_tag",
        ].includes(item.optionGroup),
      ),
      false,
    );
    const tagValues = project.references.filter(
      (item) => item.kind === "value" && item.optionGroup === "item_tag",
    );
    assert.ok(tagValues.length > 40);
    assert.equal(new Set(tagValues.map((item) => item.id)).size, tagValues.length);
    assert.ok(
      tagValues.every((item) => item.categoryId.startsWith("wsg.category.tag_")),
    );
    assert.deepEqual(
      model
        .validateProject(project)
        .filter((issue) => issue.severity === "error"),
      [],
    );
  });
});

test("HP, areas, checks and resources are represented as typed visual rules", async () => {
  const rules = await readFile(
    new URL("../src/rule-system.ts", import.meta.url),
    "utf8",
  );
  const editors = await readFile(
    new URL("../src/RuleEditors.tsx", import.meta.url),
    "utf8",
  );
  assert.match(rules, /roundSeconds:\s*6/);
  assert.match(rules, /gridUnitFeet:\s*2\.5/);
  assert.match(rules, /maximum_hit_die/);
  assert.match(rules, /recalculatesRetroactively:\s*true/);
  assert.match(rules, /area_entered/);
  assert.match(rules, /area_turn_started/);
  assert.match(rules, /make_saving_throw/);
  assert.match(editors, /Ready-made scenario/);
  assert.match(editors, /Saving throw and damage/);
  assert.match(editors, /Healing that spends a charge/);
  assert.match(editors, /Number of targets/);
  assert.match(editors, /Maximum distance, ft/);
  assert.match(editors, /unfinished rule cannot be exported/);
  assert.doesNotMatch(editors, /textarea[^>]+formula/i);
});

test("an incomplete healing rule is rejected until amount and target are configured", async () => {
  await withModel(async (model) => {
    const project = model.createCleanProject();
    const rulesReferenceId = "wsg.ref.parameter.effects";
    project.references.push({
      id: rulesReferenceId,
      key: "effects",
      kind: "parameter",
      name: { en: "Rules" },
      description: { en: "" },
      categoryId: "wsg.category.custom",
      locked: true,
      previousIds: [],
      propertyType: "rule_set",
    });
    project.templates.push({
      id: "mygame.temp.test_item",
      type: "item",
      categoryId: "wsg.category.custom",
      name: { en: "Test Item" },
      fields: [
        {
          id: "mygame.temp.test_item.field_1",
          referenceId: rulesReferenceId,
          required: false,
          multiple: false,
          order: 1,
        },
      ],
      previousIds: [],
    });
    project.entities.push({
      id: "mygame.item.test_healer",
      key: "test_healer",
      type: "item",
      templateId: "mygame.temp.test_item",
      name: { en: "Test Healer" },
      previousIds: [],
      values: {
        [rulesReferenceId]: {
          version: 1,
          rules: [
            {
              id: "rule_1",
              name: { en: "Heal" },
              enabled: true,
              event: "activated",
              frequency: "once_per_target",
              conditions: { mode: "all", predicates: [] },
              actions: [
                {
                  id: "action_1",
                  type: "heal",
                  target: "selected_target",
                  value: { kind: "number", number: 0 },
                },
              ],
              duration: {
                type: "instant",
                rounds: 0,
                concentration: false,
                expiration: "automatic",
              },
              priority: 100,
              stacking: "unique_source",
            },
          ],
        },
      },
    });
    const codes = model.validateProject(project).map((issue) => issue.code);
    assert.ok(codes.includes("missing_action_amount"));
    assert.ok(codes.includes("incomplete_target"));
  });
});

test("upgrading an old executable-string project starts a clean safe project", async () => {
  await withModel(async (model) => {
    const oldProject = model.createCleanProject();
    oldProject.catalogVersion = 8;
    oldProject.entities = [
      {
        id: "old.spell",
        key: "old",
        type: "spell",
        templateId: "old.template",
        name: { en: "Old spell" },
        values: {},
        previousIds: [],
      },
    ];
    const upgraded = model.upgradeProjectCatalog(oldProject);
    assert.equal(upgraded.catalogVersion, 16);
    assert.equal(upgraded.entities.length, 0);
    assert.equal(upgraded.ruleEngine.roundSeconds, 6);
  });
});

test("supports multiple templates per type and generated IDs", async () => {
  await withModel(async (model) => {
    const project = model.createCleanProject();
    project.templates = [
      {
        id: "draft.weapon",
        type: "item",
        categoryId: "wsg.category.custom",
        name: { en: "Weapon" },
        fields: [],
        previousIds: [],
      },
      {
        id: "draft.armor",
        type: "item",
        categoryId: "wsg.category.custom",
        name: { en: "Armor" },
        fields: [],
        previousIds: [],
      },
    ];
    const recalculated = model.recalculateProjectIds(project);
    assert.deepEqual(
      recalculated.templates.map((template) => template.id),
      ["mygame.temp.weapon", "mygame.temp.armor"],
    );
  });
});

test("keeps editors mounted while an English name changes its generated ID", async () => {
  const app = await readFile(
    new URL("../src/App.tsx", import.meta.url),
    "utf8",
  );
  assert.match(
    app,
    /item\.id === selectedId \|\| item\.previousIds\.includes\(selectedId\)/,
  );
});

test("supports English, Russian and Swedish with English as default", async () => {
  const app = await readFile(
    new URL("../src/App.tsx", import.meta.url),
    "utf8",
  );
  const html = await readFile(
    new URL("../index.html", import.meta.url),
    "utf8",
  );
  assert.match(html, /<html lang="en">/);
  assert.match(app, /en:\s*\{/);
  assert.match(app, /ru:\s*\{/);
  assert.match(app, /sv:\s*\{/);
  assert.match(app, /\["en", "ru", "sv"\]/);
});

test("exports rule engine separately from the content pack", async () => {
  const codec = await readFile(
    new URL("../src/codec.ts", import.meta.url),
    "utf8",
  );
  assert.match(codec, /wsg-obfuscation-v1/);
  assert.match(codec, /ruleEngine/);
  assert.match(codec, /referencePayload/);
  assert.match(codec, /packPayload/);
  assert.match(codec, /SHA-256/);
  assert.match(codec, /toString\(8\)/);
});

test("keeps Forge branding and GitHub Pages deployment", async () => {
  const css = await readFile(
    new URL("../src/styles.css", import.meta.url),
    "utf8",
  );
  const app = await readFile(
    new URL("../src/App.tsx", import.meta.url),
    "utf8",
  );
  const html = await readFile(
    new URL("../index.html", import.meta.url),
    "utf8",
  );
  const workflow = await readFile(
    new URL("../.github/workflows/pages.yml", import.meta.url),
    "utf8",
  );
  assert.match(css, /--red-bright:\s*#d1292f/);
  assert.match(css, /--gold:\s*#d9c65f/);
  assert.match(app, /<span>WSGuild<\/span>\s*<span>Forge<\/span>/);
  assert.match(html, /forge-logo-elipse\.svg/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
});

test("uses a beginner-first creation wizard and keeps system tools optional", async () => {
  const app = await readFile(
    new URL("../src/App.tsx", import.meta.url),
    "utf8",
  );
  const editors = await readFile(
    new URL("../src/RuleEditors.tsx", import.meta.url),
    "utf8",
  );
  assert.match(app, /useState<Page>\("create"\)/);
  assert.match(app, /"create", t\("create"\)/);
  assert.match(app, /"works", t\("works"\)/);
  assert.match(app, /"projectSettings", t\("projectSettings"\)/);
  assert.match(app, /developerMode &&/);
  assert.match(app, /function SimpleEntityWizard/);
  assert.match(app, /"Basics", "Основное"/);
  assert.match(app, /"Review", "Проверка"/);
  assert.match(editors, /simple-rule-set/);
  assert.match(editors, /!simple && \(/);
});
