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

test("starts with schema 12, a locked D&D rules engine, templates, and the PH24 item catalog", async () => {
  await withModel(async (model) => {
    const project = model.createCleanProject();
    assert.equal(project.catalogVersion, 12);
    assert.equal(project.ruleEngine.roundSeconds, 6);
    assert.equal(project.ruleEngine.gridUnitFeet, 2.5);
    assert.equal(project.entities.length, 352);
    assert.equal(project.templates.length, 41);
    assert.equal(project.atomics.length, 54);
    assert.ok(project.references.length >= 370);
    assert.ok(project.atomics.every((entry) => entry.locked));
    assert.ok(project.references.every((entry) => entry.locked));
    assert.equal(
      project.atomics.find((entry) => entry.key === "level")?.storageMode,
      "derived",
    );
    assert.equal(
      project.atomics.find((entry) => entry.key === "level_up_pending")
        ?.warningOnly,
      true,
    );
    assert.equal(
      project.atomics.filter((entry) => entry.dataType === "die").length,
      9,
    );
    assert.deepEqual(
      Object.fromEntries(
        [
          "class",
          "multiclass",
          "subclass",
          "species",
          "background",
          "feat",
          "feature",
          "item",
          "spell",
        ].map((type) => [
          type,
          project.templates.filter((template) => template.type === type).length,
        ]),
      ),
      {
        class: 1,
        multiclass: 1,
        subclass: 1,
        species: 1,
        background: 1,
        feat: 4,
        feature: 3,
        item: 23,
        spell: 6,
      },
    );
    assert.deepEqual(
      model
        .validateProject(project)
        .filter((issue) => issue.severity === "error"),
      [],
    );
  });
});

test("all templates use guided no-code fields and include automation", async () => {
  await withModel(async (model) => {
    const project = model.createCleanProject();
    const legacy = new Set(["formula", "condition", "effect", "group", "list"]);
    for (const template of project.templates) {
      const references = template.fields.map((field) =>
        project.references.find((entry) => entry.id === field.referenceId),
      );
      assert.ok(
        references.every(Boolean),
        `${template.id} has a missing field`,
      );
      assert.ok(
        !references.some((entry) => legacy.has(entry.propertyType)),
        `${template.id} has a legacy field`,
      );
      assert.ok(
        references.some((entry) => entry.propertyType === "rule_set"),
        `${template.id} has no automation field`,
      );
    }
    const classTemplate = project.templates.find(
      (template) => template.type === "class",
    );
    const classFields = classTemplate.fields.map((field) =>
      project.references.find((entry) => entry.id === field.referenceId),
    );
    assert.ok(
      classFields.some((entry) => entry.propertyType === "hp_progression"),
    );
    assert.equal(
      project.references.filter((entry) => entry.kind === "effect").length,
      0,
    );
    assert.ok(
      !project.references.some((entry) => entry.key === "influences"),
    );
  });
});

test("imports every unique PH24 item with structured equipment data", async () => {
  await withModel(async (model) => {
    const project = model.createCleanProject();
    assert.equal(new Set(project.entities.map((item) => item.id)).size, 352);
    assert.ok(project.entities.every((item) => item.type === "item"));
    assert.ok(
      project.entities.every((item) =>
        project.templates.some((template) => template.id === item.templateId),
      ),
    );

    const dagger = project.entities.find((item) => item.id === "mygame.item.dagger");
    assert.equal(dagger.templateId, "mygame.temp.weapon");
    assert.equal(
      dagger.values["wsg.ref.parameter.item_damage"][0].damageTypeId,
      "wsg.ref.value.damage_type.piercing",
    );
    assert.equal(
      dagger.values["wsg.ref.parameter.item_damage"][0].dice.dieId,
      "wsg.atomic.d4",
    );

    const arrows = project.entities.find((item) => item.id === "mygame.item.arrows");
    assert.deepEqual(arrows.values["wsg.ref.parameter.item_cost"], {
      amount: 5,
      currency: "wsg.ref.value.currency.cp",
    });
    assert.equal(arrows.values["wsg.ref.parameter.item_weight"], 0.05);
    assert.equal(arrows.values["wsg.ref.parameter.item_quantity"], 1);
    assert.equal(arrows.values["wsg.ref.parameter.item_original_pack_quantity"], 20);

    const plate = project.entities.find(
      (item) => item.id === "mygame.item.plate_armor",
    );
    assert.equal(plate.values["wsg.ref.parameter.item_base_ac"], 18);
    assert.equal(plate.values["wsg.ref.parameter.item_strength_requirement"], 15);
    assert.equal(plate.values["wsg.ref.parameter.item_stealth_disadvantage"], true);
    assert.deepEqual(
      model.validateProject(project).filter((issue) => issue.severity === "error"),
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
    const template = project.templates.find((entry) => entry.type === "item");
    const rulesField = template.fields
      .map((field) => ({
        field,
        reference: project.references.find(
          (entry) => entry.id === field.referenceId,
        ),
      }))
      .find(({ reference }) => reference?.propertyType === "rule_set");
    project.entities.push({
      id: "mygame.item.test_healer",
      key: "test_healer",
      type: "item",
      templateId: template.id,
      name: { en: "Test Healer" },
      previousIds: [],
      values: {
        [rulesField.reference.id]: {
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
    assert.equal(upgraded.catalogVersion, 12);
    assert.equal(upgraded.entities.length, 352);
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
