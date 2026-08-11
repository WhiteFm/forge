import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

test("ships the clean schema-v3 Forge architecture", async () => {
  const model = await readFile(new URL("../src/model.ts", import.meta.url), "utf8");
  assert.match(model, /schemaVersion:\s*3/);
  assert.match(model, /catalogVersion:\s*2/);
  assert.match(model, /atomics:\s*structuredClone\(STANDARD_ATOMICS\)/);
  assert.match(model, /buildDndTemplateCatalog/);
  assert.match(model, /entities:\s*\[\]/);
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
    assert.equal(project.entities.length, 0);
    assert.ok(project.references.length >= 400);
    assert.ok(project.atomics.every((item) => item.locked === false));
    for (const template of project.templates) assert.ok(template.fields.length >= expectedMinimums[template.type], `${template.type} is incomplete`);
    assert.deepEqual(model.validateProject(project).filter((issue) => issue.severity === "error"), []);
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
