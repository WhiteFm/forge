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
