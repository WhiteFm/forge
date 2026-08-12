import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

test("ships schema-v3 Forge architecture with catalog v6", async () => {
  const model = await readFile(new URL("../src/model.ts", import.meta.url), "utf8");
  assert.match(model, /schemaVersion:\s*3/);
  assert.match(model, /catalogVersion:\s*6/);
  assert.match(model, /buildCoreRulesCatalog/);
  assert.doesNotMatch(model, /buildDndTemplateCatalog/);
  assert.doesNotMatch(model, /buildSrdItemEntities/);
  assert.match(model, /"multiclass"/);
  assert.doesNotMatch(model, /srd52\.class\.wizard|srd52\.spell\./);
});

test("starts with the complete core rules catalog and no templates or entities", async () => {
  const { createServer } = await import("vite");
  const server = await createServer({ root: fileURLToPath(new URL("..", import.meta.url)), server: { middlewareMode: true }, appType: "custom" });
  try {
    const model = await server.ssrLoadModule("/src/model.ts");
    const project = model.recalculateProjectIds(model.createCleanProject());
    assert.equal(project.templates.length, 0);
    assert.equal(project.entities.length, 0);
    assert.equal(project.atomics.length, 54);
    assert.equal(project.references.length, 324);
    assert.equal(project.references.filter((entry) => entry.kind === "parameter").length, 91);
    assert.equal(project.references.filter((entry) => entry.kind === "value").length, 196);
    assert.equal(project.references.filter((entry) => entry.kind === "effect").length, 37);
    assert.equal(project.influences.length, 0);
    assert.equal(project.atomics.find((entry) => entry.key === "level")?.storageMode, "derived");
    assert.equal(project.atomics.find((entry) => entry.key === "level_up_pending")?.warningOnly, true);
    assert.equal(project.atomics.find((entry) => entry.key === "currency")?.fields?.length, 6);
    assert.equal(project.atomics.find((entry) => entry.key === "position")?.fields?.length, 3);
    assert.equal(project.atomics.filter((entry) => entry.dataType === "die").length, 9);
    const advancement = project.references.find((entry) => entry.name.en === "Character Advancement");
    assert.equal(advancement?.table?.rows.length, 20);
    assert.deepEqual(advancement?.table?.rows[19].values, { level: 20, xp: 355000, pb: 6 });
    assert.deepEqual(model.validateProject(project).filter((issue) => issue.severity === "error"), []);
  } finally {
    await server.close();
  }
});

test("supports multiple templates of one entity type with distinct generated IDs", async () => {
  const { createServer } = await import("vite");
  const server = await createServer({ root: fileURLToPath(new URL("..", import.meta.url)), server: { middlewareMode: true }, appType: "custom" });
  try {
    const model = await server.ssrLoadModule("/src/model.ts");
    const project = model.createCleanProject();
    project.templates = [
      { id: "draft.weapon", type: "item", name: { en: "Weapon" }, fields: [], previousIds: [] },
      { id: "draft.armor", type: "item", name: { en: "Armor" }, fields: [], previousIds: [] },
    ];
    const recalculated = model.recalculateProjectIds(project);
    assert.deepEqual(recalculated.templates.map((template) => template.id), ["mygame.temp.weapon", "mygame.temp.armor"]);
    assert.deepEqual(model.validateProject(recalculated).filter((issue) => issue.severity === "error"), []);
  } finally {
    await server.close();
  }
});

test("replaces an older empty catalog while keeping templates and entities empty", async () => {
  const { createServer } = await import("vite");
  const server = await createServer({ root: fileURLToPath(new URL("..", import.meta.url)), server: { middlewareMode: true }, appType: "custom" });
  try {
    const model = await server.ssrLoadModule("/src/model.ts");
    const oldProject = model.createCleanProject();
    oldProject.catalogVersion = 4;
    oldProject.atomics = [{ id: "legacy.atomic.level", key: "level", name: { en: "Level" }, categoryId: "wsg.category.custom", dataType: "integer", storageMode: "input", locked: false, previousIds: [] }];
    oldProject.references = [{ id: "legacy.ref.parameter.name", key: "name", kind: "parameter", name: { en: "Name" }, description: { en: "" }, categoryId: "wsg.category.custom", locked: false, previousIds: [], propertyType: "localized_short" }];
    oldProject.templates = [{ id: "legacy.temp.item", type: "item", name: { en: "Legacy item" }, fields: [], previousIds: [] }];
    oldProject.entities = [{ id: "legacy.item.arrow", key: "arrow", type: "item", templateId: "legacy.temp.item", name: { en: "Arrow" }, values: {}, previousIds: [] }];
    const upgraded = model.upgradeProjectCatalog(oldProject);
    assert.equal(upgraded.catalogVersion, 6);
    assert.equal(upgraded.atomics.length, 54);
    assert.equal(upgraded.references.length, 324);
    assert.equal(upgraded.templates.length, 0);
    assert.equal(upgraded.entities.length, 0);
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
  const app = await readFile(new URL("../src/App.tsx", import.meta.url), "utf8");
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const workflow = await readFile(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8");
  assert.match(css, /--red-bright:\s*#d1292f/);
  assert.match(css, /--gold:\s*#d9c65f/);
  assert.match(app, /<span>WSGuild<\/span><span>Forge<\/span>/);
  assert.doesNotMatch(app, /FORGE SCHEMA 3|SRD 5\.2\.1 item catalog|Чистый редактируемый проект Кузницы с каталогом/);
  assert.match(html, /forge-logo-elipse\.svg/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
});

test("does not load a bundled SRD content project", async () => {
  const app = await readFile(new URL("../src/App.tsx", import.meta.url), "utf8");
  const main = await readFile(new URL("../src/main.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(`${app}\n${main}`, /srd52-wizard-evoker|build-srd-wizard/);
});
