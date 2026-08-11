import catalog from "./srd-items.generated.json";
import type { ForgeEntity, ReferenceRecord } from "./model";

type DiceSeed = { count: number; sides: number; modifier: number };
type ContentSeed = { item: string; quantity: number };
type VariantSeed = { name: string; rarity?: string; costCp?: number; charges?: number; details?: string };
type SrdItemSeed = {
  key: string;
  name: string;
  category: string;
  description?: string;
  metadata?: string;
  quantity?: number;
  unit?: string;
  sourcePackQuantity?: number;
  sourcePackCostCp?: number;
  costCp?: number;
  weightLb?: number;
  stackLimit?: number;
  rarity?: string;
  magicType?: string;
  attunement?: boolean;
  attunementPrerequisite?: string;
  equipmentSlot?: string;
  weaponCategory?: string;
  weaponRangeType?: string;
  damage?: DiceSeed | null;
  damageFlat?: number;
  damageType?: string;
  weaponProperties?: string[];
  weaponMastery?: string;
  normalRange?: number;
  longRange?: number;
  armorCategory?: string;
  baseAc?: number;
  dexterityToAc?: string;
  strengthRequirement?: number;
  stealthDisadvantage?: boolean;
  charges?: number;
  recharge?: string[];
  rechargeTiming?: string;
  rechargeDice?: DiceSeed | null;
  rechargeFlat?: number;
  destroyedOnZero?: boolean;
  consumable?: boolean;
  materialComponent?: boolean;
  materialSpells?: string[];
  contents?: ContentSeed[];
  variants?: VariantSeed[];
  toolAbility?: string;
  toolUtilize?: string[];
  toolCraft?: string[];
  carryingCapacityLb?: number;
  vehicleSpeedMph?: number;
  vehicleCrew?: number;
  vehiclePassengers?: number;
  vehicleCargoTons?: number;
  vehicleAc?: number;
  vehicleHp?: number;
  vehicleDamageThreshold?: number;
};

const normalize = (value: string) => value.toLowerCase().replace(/^[^:]+:\s*/, "").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
const local = (value: string) => ({ en: value, ru: value, sv: value });

export function buildSrdItemEntities(namespace: string, references: ReferenceRecord[]): ForgeEntity[] {
  const parameters = new Map(references.filter((entry) => entry.kind === "parameter").map((entry) => [entry.key, entry.id]));
  const values = references.filter((entry) => entry.kind === "value");
  const parameter = (key: string) => parameters.get(key);
  const option = (group: string, label?: string) => {
    if (!label) return undefined;
    const expected = normalize(label);
    return values.find((entry) => entry.optionGroup === group && (normalize(entry.name.en) === expected || normalize(String(entry.value ?? "")) === expected))?.id;
  };
  const set = (target: Record<string, unknown>, key: string, value: unknown) => {
    const id = parameter(key);
    if (!id || value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) return;
    target[id] = value;
  };
  const dice = (seed?: DiceSeed | null) => seed ? ({ count: seed.count, dieId: `wsg.atomic.d${seed.sides}`, modifier: seed.modifier }) : undefined;

  return (catalog.items as SrdItemSeed[]).map((seed): ForgeEntity => {
    const valuesByReference: Record<string, unknown> = {};
    set(valuesByReference, "description", local(seed.description ?? ""));
    set(valuesByReference, "item_category", option("item_category", seed.category));
    set(valuesByReference, "item_magic_type", option("magic_item_type", seed.magicType));
    set(valuesByReference, "item_rarity", option("rarity", seed.rarity));
    set(valuesByReference, "item_quantity", seed.quantity ?? 1);
    set(valuesByReference, "item_unit", option("item_unit", seed.unit ?? "piece"));
    set(valuesByReference, "item_source_pack_quantity", seed.sourcePackQuantity ?? 1);
    set(valuesByReference, "item_source_pack_cost_cp", seed.sourcePackCostCp ?? seed.costCp ?? 0);
    set(valuesByReference, "item_cost_cp", seed.costCp ?? 0);
    set(valuesByReference, "item_weight_lb", seed.weightLb ?? 0);
    set(valuesByReference, "item_stack_limit", seed.stackLimit ?? 1);
    set(valuesByReference, "item_equipment_slot", option("equipment_slot", seed.equipmentSlot));
    set(valuesByReference, "item_requires_attunement", seed.attunement ?? false);
    set(valuesByReference, "item_attunement_details", local(seed.attunementPrerequisite ?? ""));
    set(valuesByReference, "item_srd_metadata", local(seed.metadata ?? ""));
    set(valuesByReference, "item_weapon_category", option("weapon_category", seed.weaponCategory));
    set(valuesByReference, "item_weapon_range_type", option("weapon_range_type", seed.weaponRangeType));
    set(valuesByReference, "item_damage", dice(seed.damage));
    set(valuesByReference, "item_damage_flat", seed.damageFlat ?? 0);
    set(valuesByReference, "item_damage_type", option("damage_type", seed.damageType));
    set(valuesByReference, "item_weapon_properties", seed.weaponProperties?.map((entry) => option("weapon_property", entry)).filter(Boolean));
    set(valuesByReference, "item_weapon_mastery", option("weapon_mastery", seed.weaponMastery));
    set(valuesByReference, "item_normal_range", seed.normalRange ?? 0);
    set(valuesByReference, "item_long_range", seed.longRange ?? 0);
    set(valuesByReference, "item_armor_category", option("armor_category", seed.armorCategory));
    set(valuesByReference, "item_base_ac", seed.baseAc ?? 0);
    set(valuesByReference, "item_dexterity_to_ac", option("dexterity_to_ac", seed.dexterityToAc));
    set(valuesByReference, "item_strength_requirement", seed.strengthRequirement ?? 0);
    set(valuesByReference, "item_stealth_disadvantage", seed.stealthDisadvantage ?? false);
    set(valuesByReference, "item_charges", seed.charges ?? 0);
    set(valuesByReference, "item_recharge", seed.recharge ?? []);
    set(valuesByReference, "item_recharge_timing", option("item_recharge_timing", seed.rechargeTiming));
    set(valuesByReference, "item_recharge_dice", dice(seed.rechargeDice));
    set(valuesByReference, "item_recharge_flat", seed.rechargeFlat ?? 0);
    set(valuesByReference, "item_destroyed_on_zero", seed.destroyedOnZero ?? false);
    set(valuesByReference, "item_consumable", seed.consumable ?? false);
    set(valuesByReference, "item_material_component", seed.materialComponent ?? false);
    set(valuesByReference, "item_material_spell_names", seed.materialSpells ?? []);
    set(valuesByReference, "item_contents", seed.contents?.map((entry, index) => ({ rowId: `${seed.key}.content.${index + 1}`, values: { item: entry.item, quantity: entry.quantity } })));
    set(valuesByReference, "item_variants", seed.variants?.map((entry, index) => ({ rowId: `${seed.key}.variant.${index + 1}`, values: { name: entry.name, rarity: entry.rarity ?? "", cost_cp: entry.costCp ?? 0, charges: entry.charges ?? 0, details: entry.details ?? "" } })));
    set(valuesByReference, "item_tool_ability", option("ability", seed.toolAbility));
    set(valuesByReference, "item_tool_utilize", seed.toolUtilize ?? []);
    set(valuesByReference, "item_tool_craft", seed.toolCraft ?? []);
    set(valuesByReference, "item_carrying_capacity_lb", seed.carryingCapacityLb ?? 0);
    set(valuesByReference, "item_vehicle_speed_mph", seed.vehicleSpeedMph ?? 0);
    set(valuesByReference, "item_vehicle_crew", seed.vehicleCrew ?? 0);
    set(valuesByReference, "item_vehicle_passengers", seed.vehiclePassengers ?? 0);
    set(valuesByReference, "item_vehicle_cargo_tons", seed.vehicleCargoTons ?? 0);
    set(valuesByReference, "item_vehicle_ac", seed.vehicleAc ?? 0);
    set(valuesByReference, "item_vehicle_hp", seed.vehicleHp ?? 0);
    set(valuesByReference, "item_vehicle_damage_threshold", seed.vehicleDamageThreshold ?? 0);
    return {
      id: `${namespace}.item.${seed.key}`,
      key: seed.key,
      type: "item",
      templateId: `${namespace}.temp.item`,
      name: local(seed.name),
      values: valuesByReference,
      previousIds: [],
    };
  });
}

export const SRD_ITEM_COUNT = catalog.items.length;
