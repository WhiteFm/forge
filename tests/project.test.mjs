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

test("includes the SRD Wizard, Evoker, and complete Character Origins project", async () => {
  const project = JSON.parse(await readFile(new URL("../projects/srd52-wizard-evoker.forge.json", import.meta.url), "utf8"));
  const wizard = project.entities.find((entity) => entity.id === "srd52.class.wizard");
  const evoker = project.entities.find((entity) => entity.id === "srd52.subclass.evoker");
  const spells = project.entities.filter((entity) => entity.entityType === "spell");
  assert.equal(project.pack.defaultLocale, "en");
  assert.equal(wizard.levels.length, 20);
  assert.equal(wizard.classProgression.length, 20);
  assert.ok(wizard.classProgression.every((row) => row.spellSlots.length === 9));
  assert.deepEqual(evoker.subclassLevels.map((row) => row.level), [3, 6, 10, 14]);
  assert.deepEqual(project.entities.filter((entity) => entity.entityType === "species").map((entity) => entity.id).sort(), ["dragonborn", "dwarf", "elf", "gnome", "goliath", "halfling", "human", "orc", "tiefling"].map((id) => `srd52.species.${id}`).sort());
  assert.equal(project.entities.filter((entity) => entity.entityType === "background").length, 4);
  assert.deepEqual(project.entities.filter((entity) => entity.entityType === "background").map((entity) => entity.id).sort(), ["acolyte", "criminal", "sage", "soldier"].map((id) => `srd52.background.${id}`).sort());
  assert.equal(project.entities.filter((entity) => entity.entityType === "feat").length, 17);
  assert.ok(["alert", "magic-initiate", "savage-attacker", "skilled", "ability-score-improvement", "grappler", "archery", "defense", "great-weapon-fighting", "two-weapon-fighting", "boon-of-combat-prowess", "boon-of-dimensional-travel", "boon-of-fate", "boon-of-irresistible-offense", "boon-of-spell-recall", "boon-of-the-night-spirit", "boon-of-truesight"].every((id) => project.entities.some((entity) => entity.id === `srd52.feat.${id}`)));
  assert.equal(spells.length, 27);
  assert.ok(spells.some((spell) => spell.id === "srd52.spell.cure-wounds"));
  assert.ok(spells.some((spell) => spell.id === "srd52.spell.wall-of-fire"));
  assert.ok(spells.some((spell) => spell.id === "srd52.spell.hellish-rebuke"));
  const soldier = project.entities.find((entity) => entity.id === "srd52.background.soldier");
  assert.deepEqual(soldier.abilityScoreIncrease.distributions, [[2, 1], [1, 1, 1]]);
  assert.equal(soldier.equipmentOptions[0].choiceItems[0].choiceId, "choice.soldier.gaming-set");
  const elf = project.entities.find((entity) => entity.id === "srd52.species.elf");
  assert.equal(elf.creatureTypeId, "creature-type.humanoid");
  assert.ok(project.entities.find((entity) => entity.id === "srd52.feature.elf-lineage-drow").spellGrants.length === 3);
});

test("renders a grouped, sticky class progression table", async () => {
  const component = await readFile(new URL("../src/components.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
  assert.match(component, /Spell slots by level/);
  assert.match(component, /class-progression/);
  assert.match(css, /\.class-progression \.sticky-1/);
});
