import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readJson = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));

test("contains every unique workbook spell and its Russian localization", async () => {
  const source = await readJson("../scripts/data/dnd55-spells.json");
  const russian = await readJson("../scripts/data/dnd55-spells-ru.json");
  assert.deepEqual(source.stats, { spells: 334, materialItems: 188, sourceRows: 335 });
  assert.deepEqual(russian.stats, { spells: 334, materialItems: 188 });
  assert.equal(new Set(source.spells.map((spell) => spell.id)).size, 334);
  assert.equal(new Set(source.materials.map((item) => item.id)).size, 188);
  assert.equal(source.spells.flatMap((spell) => spell.sourceRows).length, 335);
  for (const spell of source.spells) {
    assert.ok(russian.spells[spell.id]?.name.trim(), `${spell.id} has no Russian name`);
    assert.ok(russian.spells[spell.id]?.description.trim(), `${spell.id} has no Russian description`);
    assert.ok(spell.srdPage >= 107 && spell.srdPage <= 175, `${spell.id} has an invalid SRD page`);
    assert.ok(spell.level >= 0 && spell.level <= 9, `${spell.id} has an invalid level`);
  }
  for (const item of source.materials) assert.ok(russian.materials[item.id]?.name.trim(), `${item.id} has no Russian name`);
});

test("uses canonical SRD corrections and structured material requirements", async () => {
  const source = await readJson("../scripts/data/dnd55-spells.json");
  assert.ok(source.spells.some((spell) => spell.name === "Zone of Truth"));
  assert.ok(!source.spells.some((spell) => /Zona of truth|Acid SplASh/.test(spell.name)));
  assert.equal(source.spells.find((spell) => spell.name === "Conjure Celestial").sourceRows.length, 2);
  assert.deepEqual(source.spells.find((spell) => spell.name === "Acid Arrow").damageRolls.slice(0, 2).map(({ count, sides }) => [count, sides]), [[4, 4], [2, 4]]);

  const materialIds = new Set(source.materials.map((item) => item.id));
  for (const spell of source.spells) for (const group of spell.materialGroups) for (const entry of group.entries) {
    assert.ok(materialIds.has(entry.itemId), `${spell.id} references missing ${entry.itemId}`);
    assert.ok(entry.quantity >= 1);
    assert.ok(entry.minimumCostCp >= 0);
  }
  const wardingBond = source.spells.find((spell) => spell.name === "Warding Bond").materialGroups[0];
  assert.deepEqual(wardingBond.entries.map(({ quantity, minimumCostCp }) => ({ quantity, minimumCostCp })), [{ quantity: 2, minimumCostCp: 5000 }]);
  assert.equal(wardingBond.minimumTotalCostCp, 10000);
  const secretChest = source.spells.find((spell) => spell.name === "Secret Chest").materialGroups[0];
  assert.equal(secretChest.consumed, false);
});
