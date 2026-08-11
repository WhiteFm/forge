import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

test("ships the clean schema-v3 Forge architecture", async () => {
  const model = await readFile(new URL("../src/model.ts", import.meta.url), "utf8");
  assert.match(model, /schemaVersion:\s*3/);
  assert.match(model, /catalogVersion:\s*3/);
  assert.match(model, /atomics:\s*structuredClone\(STANDARD_ATOMICS\)/);
  assert.match(model, /buildDndTemplateCatalog/);
  assert.match(model, /buildSrdItemEntities/);
  assert.match(model, /"multiclass"/);
  assert.doesNotMatch(model, /srd52\.class\.wizard|srd52\.spell\./);
});

test("builds complete editable templates without broken references", async () => {
  const { createServer } = await import("vite");
  const server = await createServer({ root: fileURLToPath(new URL("..", import.meta.url)), server: { middlewareMode: true }, appType: "custom" });
  try {
    const model = await server.ssrLoadModule("/src/model.ts");
    const project = model.recalculateProjectIds(model.createCleanProject());
    const expectedMinimums = { class: 20, multiclass: 14, subclass: 8, species: 18, background: 10, feat: 10, feature: 12, item: 28, spell: 32 };
    assert.equal(project.entities.filter((entity) => entity.type === "item").length, 670);
    assert.ok(project.references.length >= 400);
    assert.ok(project.atomics.every((item) => item.locked === false));
    for (const template of project.templates) assert.ok(template.fields.length >= expectedMinimums[template.type], `${template.type} is incomplete`);
    assert.deepEqual(model.validateProject(project).filter((issue) => issue.severity === "error"), []);
  } finally {
    await server.close();
  }
});

test("ships every SRD equipment entry, unit-priced ammunition and spell materials", async () => {
  const { createServer } = await import("vite");
  const server = await createServer({ root: fileURLToPath(new URL("..", import.meta.url)), server: { middlewareMode: true }, appType: "custom" });
  try {
    const model = await server.ssrLoadModule("/src/model.ts");
    const project = model.createCleanProject();
    const parameterId = (name) => project.references.find((entry) => entry.kind === "parameter" && entry.name.en === name)?.id;
    const byKey = new Map(project.entities.map((entry) => [entry.key, entry]));
    assert.equal(byKey.get("arrow").values[parameterId("Catalog Quantity")], 1);
    assert.equal(byKey.get("arrow").values[parameterId("Source Package Quantity")], 20);
    assert.equal(byKey.get("arrow").values[parameterId("Cost per Unit, cp")], 5);
    assert.equal(byKey.get("ball_bearings").values[parameterId("Cost per Unit, cp")], 0.1);
    assert.equal(project.entities.find((entry) => entry.name.en === "Healer’s Kit").values[parameterId("Item Charges")], 10);
    assert.equal(byKey.get("wand_of_fireballs").values[parameterId("Item Charges")], 7);
    assert.equal(project.entities.filter((entry) => entry.values[parameterId("Spell Material Component")] === true).length, 175);
  } finally {
    await server.close();
  }
});

test("adds the SRD catalog to an older local project without replacing edited items", async () => {
  const { createServer } = await import("vite");
  const server = await createServer({ root: fileURLToPath(new URL("..", import.meta.url)), server: { middlewareMode: true }, appType: "custom" });
  try {
    const model = await server.ssrLoadModule("/src/model.ts");
    const oldProject = model.createCleanProject();
    oldProject.catalogVersion = 2;
    const arrow = oldProject.entities.find((entry) => entry.key === "arrow");
    arrow.values.user_marker = "keep";
    oldProject.entities = [arrow];
    const upgraded = model.upgradeProjectCatalog(oldProject);
    assert.equal(upgraded.catalogVersion, 3);
    assert.equal(upgraded.entities.filter((entry) => entry.type === "item").length, 670);
    assert.equal(upgraded.entities.find((entry) => entry.key === "arrow").values.user_marker, "keep");
    assert.deepEqual(model.validateProject(upgraded).filter((issue) => issue.severity === "error"), []);
  } finally {
    await server.close();
  }
});

test("keeps editors mounted while an English name changes its generated ID", async () => {
  const app = await readFile(new URL("../src/App.tsx", import.meta.url), "utf8");
  assert.match(app, /item\.id === selectedId \|\| item\.previousIds\.includes\(selectedId\)/);
});

test("supports English, Russian and Swedish with English as default", async () => {
  const app = await readFile(new URL("../src/App.tsx", import.meta.url), "utf8");
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /<html lang="en">/);
  assert.match(app, /en:\s*\{/);
  assert.match(app, /ru:\s*\{/);
  assert.match(app, /sv:\s*\{/);
  assert.match(app, /\["en", "ru", "sv"\]/);
});

test("exports separated obfuscated reference and pack bundles", async () => {
  const codec = await readFile(new URL("../src/codec.ts", import.meta.url), "utf8");
  assert.match(codec, /wsg-obfuscation-v1/);
  assert.match(codec, /referencePayload/);
  assert.match(codec, /packPayload/);
  assert.match(codec, /SHA-256/);
  assert.match(codec, /toString\(8\)/);
});

test("keeps Forge branding and GitHub Pages deployment", async () => {
  const css = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
  const workflow = await readFile(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8");
  assert.match(css, /--red-bright:\s*#d1292f/);
  assert.match(css, /--gold:\s*#d9c65f/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
});

test("does not load a bundled SRD content project", async () => {
  const app = await readFile(new URL("../src/App.tsx", import.meta.url), "utf8");
  const main = await readFile(new URL("../src/main.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(`${app}\n${main}`, /srd52-wizard-evoker|build-srd-wizard/);
});
