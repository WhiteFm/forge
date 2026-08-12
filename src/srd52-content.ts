import sourceJson from "../scripts/data/dnd55-spells.json";
import russianJson from "../scripts/data/dnd55-spells-ru.json";
import type { EntityTemplate, ForgeEntity, ReferenceRecord } from "./model";

interface SourceRoll {
  count: number;
  sides: number;
  modifier: string;
  damageType?: string;
}

interface SourceMaterialGroup {
  id: string;
  name: string;
  sourceText: string;
  minimumTotalCostCp: number;
  sourceCurrency: string;
  consumed: boolean;
  selectionMode: "all" | "any";
  perTarget: boolean;
  entries: Array<{ itemId: string; quantity: number; minimumCostCp: number; consumed: boolean }>;
}

interface SourceSpell {
  id: string;
  name: string;
  description: string;
  level: number;
  schoolId: string;
  classIds: string[];
  ritual: boolean;
  casting: Record<string, unknown> & { raw: string };
  range: Record<string, unknown> & { raw: string };
  duration: Record<string, unknown> & { raw: string; concentration: boolean };
  areas: Array<Record<string, unknown> & { shape: string; sizeFeet: number }>;
  components: {
    verbal: boolean;
    somatic: boolean;
    material: boolean;
    materialText: string;
    materialCostCp: number;
    materialConsumed: boolean;
    raw: string;
  };
  materialGroups: SourceMaterialGroup[];
  categories: string[];
  profiles: Array<Record<string, unknown>>;
  damageRolls: SourceRoll[];
  healingRolls: SourceRoll[];
  higherLevel: { enabled: boolean };
  sourceRows: Array<{ sheet: string; row: number }>;
  srdPage: number;
}

interface SourceMaterial {
  id: string;
  name: string;
  usedBy: string[];
  consumed: boolean;
  costCp: number;
  knownCostsCp: number[];
}

interface SourceData {
  sources: { srdVersion: string };
  spells: SourceSpell[];
  materials: SourceMaterial[];
}

interface RussianData {
  spells: Record<string, { name: string; description: string; castingRaw: string; rangeRaw: string; durationRaw: string; materialText: string }>;
  materials: Record<string, { name: string }>;
}

const source = sourceJson as unknown as SourceData;
const russian = russianJson as unknown as RussianData;

const parameterId = (key: string) => `wsg.ref.parameter.${key}`;
const valueId = (group: string, key: string) => `wsg.ref.value.${group}.${key}`;

const templateNames = {
  attack: "Attack Spell",
  save: "Saving Throw Spell",
  healing: "Healing Spell",
  area: "Area Spell",
  periodic: "Periodic Area Spell",
  utility: "Utility Spell",
  material: "Material Component",
} as const;

function findTemplate(templates: EntityTemplate[], name: string) {
  const template = templates.find((entry) => entry.name.en === name);
  if (!template) throw new Error(`Missing SRD content template: ${name}`);
  return template;
}

function localizedRaw<T extends Record<string, unknown>>(value: T, ru: string): T & { raw: { en: string; ru: string; sv: string } } {
  const { raw, ...rest } = value;
  return { ...rest, raw: { en: String(raw ?? ""), ru: ru || String(raw ?? ""), sv: String(raw ?? "") } } as T & { raw: { en: string; ru: string; sv: string } };
}

function spellTemplateName(spell: SourceSpell) {
  const text = spell.description.toLowerCase();
  const hasArea = spell.areas.some((area) => area.shape !== "none" && area.sizeFeet > 0);
  const hasPeriodic = spell.profiles.some((profile) => Number((profile.workbookDice as { periodicCount?: number } | undefined)?.periodicCount ?? 0) > 0)
    || /(?:start|end) of (?:its|the target's|each of its) next turn/.test(text);
  if (spell.healingRolls.length || spell.categories.includes("healing")) return templateNames.healing;
  if (hasArea && hasPeriodic) return templateNames.periodic;
  if (hasArea && spell.damageRolls.length) return templateNames.area;
  if (/spell attack/.test(text)) return templateNames.attack;
  if (/saving throw/.test(text)) return templateNames.save;
  return templateNames.utility;
}

function savingThrow(description: string) {
  const ability = description.match(/(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) saving throw/i)?.[1]?.toLowerCase() ?? "";
  const success = /half as much damage|half damage/i.test(description) ? "half" : /on a successful save[^.]*no damage/i.test(description) ? "none" : "special";
  return { abilityId: ability ? valueId("ability", ability) : "", onSuccess: success };
}

function attack(description: string) {
  return { type: /melee spell attack/i.test(description) ? "melee" : /ranged spell attack/i.test(description) ? "ranged" : "special" };
}

function appliedConditions(description: string) {
  const conditions = ["blinded", "charmed", "deafened", "frightened", "grappled", "incapacitated", "invisible", "paralyzed", "petrified", "poisoned", "prone", "restrained", "stunned", "unconscious"];
  return conditions.filter((condition) => new RegExp(`\\b${condition} condition\\b`, "i").test(description)).map((condition) => valueId("condition", condition));
}

function componentIds(spell: SourceSpell) {
  return [
    spell.components.verbal && valueId("spell_component", "verbal"),
    spell.components.somatic && valueId("spell_component", "somatic"),
    spell.components.material && valueId("spell_component", "material"),
  ].filter((entry): entry is string => Boolean(entry));
}

function buildSpell(spell: SourceSpell, templates: EntityTemplate[]): ForgeEntity {
  const translation = russian.spells[spell.id];
  const template = findTemplate(templates, spellTemplateName(spell));
  const materialItemIds = [...new Set(spell.materialGroups.flatMap((group) => group.entries.map((entry) => entry.itemId)))];
  const values: Record<string, unknown> = {
    [parameterId("description")]: { en: spell.description, ru: translation.description, sv: spell.description },
    [parameterId("image")]: "",
    [parameterId("spell_level")]: spell.level,
    [parameterId("spell_school")]: spell.schoolId,
    [parameterId("spell_categories")]: spell.categories.map((category) => valueId("spell_category", category)),
    [parameterId("spell_casting_time")]: localizedRaw(spell.casting, translation.castingRaw),
    [parameterId("spell_range")]: localizedRaw(spell.range, translation.rangeRaw),
    [parameterId("spell_components")]: componentIds(spell),
    [parameterId("spell_material_items")]: materialItemIds,
    [parameterId("spell_material_requirements")]: spell.materialGroups.map((group) => ({
      ...group,
      name: { en: group.name, ru: "Материальные компоненты", sv: group.name },
      sourceText: { en: group.sourceText, ru: translation.materialText || group.sourceText, sv: group.sourceText },
    })),
    [parameterId("spell_duration")]: localizedRaw(spell.duration, translation.durationRaw),
    [parameterId("spell_concentration")]: spell.duration.concentration,
    [parameterId("spell_ritual")]: spell.ritual,
    [parameterId("spell_classes")]: spell.classIds,
    [parameterId("spell_areas")]: spell.areas,
    [parameterId("spell_source_profiles")]: spell.profiles,
    [parameterId("spell_higher_level")]: spell.higherLevel.enabled,
    [parameterId("prerequisites")]: { left: "wsg.atomic.level", operator: "at_least", rightSource: "number", right: 1 },
    [parameterId("choices")]: [],
    [parameterId("effects")]: [],
  };
  if (spell.damageRolls.length) values[parameterId("spell_damage")] = spell.damageRolls.map((roll) => ({ ...roll, dieId: `wsg.atomic.d${roll.sides}`, damageTypeId: valueId("damage_type", roll.damageType ?? "") }));
  if (spell.healingRolls.length) values[parameterId("spell_healing")] = spell.healingRolls.map((roll) => ({ ...roll, dieId: `wsg.atomic.d${roll.sides}` }));
  if (/spell attack/i.test(spell.description)) values[parameterId("spell_attack")] = attack(spell.description);
  if (/saving throw/i.test(spell.description)) values[parameterId("spell_save")] = savingThrow(spell.description);
  const conditions = appliedConditions(spell.description);
  if (conditions.length) values[parameterId("spell_conditions")] = conditions;
  if (template.name.en === templateNames.periodic) values[parameterId("spell_periodic_damage")] = values[parameterId("spell_damage")] ?? [];
  return {
    id: spell.id,
    key: spell.id.split(".").at(-1) ?? spell.id,
    type: "spell",
    templateId: template.id,
    name: { en: spell.name, ru: translation.name, sv: spell.name },
    values,
    previousIds: [],
    packId: "srd52",
  };
}

function buildMaterial(material: SourceMaterial, templates: EntityTemplate[]): ForgeEntity {
  const translation = russian.materials[material.id];
  const template = findTemplate(templates, templateNames.material);
  const englishDescription = `One inventory unit of a material component used by ${material.usedBy.length} SRD spell${material.usedBy.length === 1 ? "" : "s"}.`;
  const russianDescription = `Одна единица материального компонента, используемая заклинаниями SRD: ${material.usedBy.length}.`;
  return {
    id: material.id,
    key: material.id.split(".").at(-1) ?? material.id,
    type: "item",
    templateId: template.id,
    name: { en: material.name, ru: translation.name, sv: material.name },
    values: {
      [parameterId("description")]: { en: englishDescription, ru: russianDescription, sv: englishDescription },
      [parameterId("image")]: "",
      [parameterId("item_type")]: valueId("item_type", "material_component"),
      [parameterId("item_cost")]: { cp: material.costCp },
      [parameterId("item_weight")]: 0,
      [parameterId("item_quantity")]: 1,
      [parameterId("item_requires_attunement")]: false,
      [parameterId("item_charges")]: 0,
      [parameterId("item_magical")]: false,
      [parameterId("item_rarity")]: valueId("item_rarity", "mundane"),
      [parameterId("item_stack_size")]: 999999,
      [parameterId("item_material_component")]: true,
      [parameterId("item_consumable")]: material.consumed,
      [parameterId("item_material_consumed")]: material.consumed,
      [parameterId("item_material_minimum_cost")]: { cp: material.costCp, knownCostsCp: material.knownCostsCp },
      [parameterId("item_used_by_spells")]: material.usedBy,
      [parameterId("prerequisites")]: { left: "wsg.atomic.level", operator: "at_least", rightSource: "number", right: 1 },
      [parameterId("effects")]: [],
    },
    previousIds: [],
    packId: "srd52",
  };
}

export function buildSrd52Content(_references: ReferenceRecord[], templates: EntityTemplate[]): ForgeEntity[] {
  const spells = source.spells.map((spell) => buildSpell(spell, templates));
  const materials = source.materials.map((material) => buildMaterial(material, templates));
  return [...spells, ...materials];
}

export const SRD52_CONTENT_STATS = Object.freeze({ spells: source.spells.length, materials: source.materials.length, entities: source.spells.length + source.materials.length });
