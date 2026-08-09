import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("starts without placeholder content records", async () => {
  const source = await readFile(new URL("../src/data.ts", import.meta.url), "utf8");
  assert.match(source, /entities:\s*\[\]/);
  assert.doesNotMatch(source, /srd52\.class\.fighter|srd52\.item\.longsword/);
});

test("ships a GitHub Pages workflow and Forge branding", async () => {
  const workflow = await readFile(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8");
  const css = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(css, /--red-bright:\s*#d1292f/);
  assert.match(css, /--gold:\s*#d9c65f/);
});

test("ships a bilingual English-first interface", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const app = await readFile(new URL("../src/App.tsx", import.meta.url), "utf8");
  const en = JSON.parse(await readFile(new URL("../src/i18n/en.json", import.meta.url), "utf8"));
  const ru = JSON.parse(await readFile(new URL("../src/i18n/ru.json", import.meta.url), "utf8"));
  assert.match(html, /<html lang="en">/);
  assert.match(app, /setLocale\("en"\)/);
  assert.deepEqual(Object.keys(en).sort(), Object.keys(ru).sort());
});

test("includes the complete SRD Wizard and Evoker Forge project", async () => {
  const project = JSON.parse(await readFile(new URL("../projects/srd52-wizard-evoker.forge.json", import.meta.url), "utf8"));
  const wizard = project.entities.find((entity) => entity.id === "srd52.class.wizard");
  const evoker = project.entities.find((entity) => entity.id === "srd52.subclass.evoker");
  const spells = project.entities.filter((entity) => entity.entityType === "spell");
  assert.equal(project.pack.defaultLocale, "en");
  assert.equal(wizard.levels.length, 20);
  assert.equal(wizard.classProgression.length, 20);
  assert.ok(wizard.classProgression.every((row) => row.spellSlots.length === 9));
  assert.deepEqual(evoker.subclassLevels.map((row) => row.level), [3, 6, 10, 14]);
  assert.equal(spells.length, 7);
  assert.ok(spells.some((spell) => spell.id === "srd52.spell.cure-wounds"));
  assert.ok(spells.some((spell) => spell.id === "srd52.spell.wall-of-fire"));
});
