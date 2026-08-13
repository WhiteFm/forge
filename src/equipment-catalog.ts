// Generated from the user-provided PH24 equipment workbook.
// Edit the source workbook or generator when rebuilding this catalog.
import type { ForgeEntity } from "./model";

export const PH24_EQUIPMENT = [
  {
    "id": "mygame.item.quarterstaff",
    "key": "quarterstaff",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Quarterstaff",
      "ru": "Боевой посох"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Простое рукопашное оружие; Свойства: Универсальное (1к8); Искусность: Опрокидывающее",
        "ru": "Простое рукопашное оружие; Свойства: Универсальное (1к8); Искусность: Опрокидывающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.sp"
      },
      "wsg.ref.parameter.item_weight": 4.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.simple",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d6",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.bludgeoning",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.versatile"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.topple",
      "wsg.ref.parameter.item_versatile_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d8",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.bludgeoning",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.mace",
    "key": "mace",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Mace",
      "ru": "Булава"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Простое рукопашное оружие; Искусность: Ослабляющее",
        "ru": "Простое рукопашное оружие; Искусность: Ослабляющее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 4.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.simple",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d6",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.bludgeoning",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.sap",
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.club",
    "key": "club",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Club",
      "ru": "Дубинка"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Простое рукопашное оружие; Свойства: Лёгкое; Искусность: Замедляющее",
        "ru": "Простое рукопашное оружие; Свойства: Лёгкое; Искусность: Замедляющее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.sp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.simple",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d4",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.bludgeoning",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.light"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.slow",
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.dagger",
    "key": "dagger",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Dagger",
      "ru": "Кинжал"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Простое рукопашное оружие; Свойства: Фехтовальное, Лёгкое, Метательное (дис. 20/60); Искусность: Быстрое",
        "ru": "Простое рукопашное оружие; Свойства: Фехтовальное, Лёгкое, Метательное (дис. 20/60); Искусность: Быстрое"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.simple",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d4",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.finesse",
        "wsg.ref.value.weapon_property.light",
        "wsg.ref.value.weapon_property.thrown"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.nick",
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 20,
        "long": 60
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.spear",
    "key": "spear",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Spear",
      "ru": "Копьё"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Простое рукопашное оружие; Свойства: Метательное (дис. 20/60), Универсальное (1к8); Искусность: Ослабляющее",
        "ru": "Простое рукопашное оружие; Свойства: Метательное (дис. 20/60), Универсальное (1к8); Искусность: Ослабляющее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 3.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.simple",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d6",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.thrown",
        "wsg.ref.value.weapon_property.versatile"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.sap",
      "wsg.ref.parameter.item_versatile_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d8",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 20,
        "long": 60
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.light_hammer",
    "key": "light_hammer",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Light Hammer",
      "ru": "Лёгкий молот"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Простое рукопашное оружие; Свойства: Лёгкое, Метательное (дис. 20/60); Искусность: Быстрое",
        "ru": "Простое рукопашное оружие; Свойства: Лёгкое, Метательное (дис. 20/60); Искусность: Быстрое"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.simple",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d4",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.bludgeoning",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.light",
        "wsg.ref.value.weapon_property.thrown"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.nick",
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 20,
        "long": 60
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.javelin",
    "key": "javelin",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Javelin",
      "ru": "Метательное копьё"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Простое рукопашное оружие; Свойства: Метательное (дис. 30/120); Искусность: Замедляющее",
        "ru": "Простое рукопашное оружие; Свойства: Метательное (дис. 30/120); Искусность: Замедляющее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.sp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.simple",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d6",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.thrown"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.slow",
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 30,
        "long": 120
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.handaxe",
    "key": "handaxe",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Handaxe",
      "ru": "Одноручный топор"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Простое рукопашное оружие; Свойства: Лёгкое, Метательное (дис. 20/60); Искусность: Отвлекающее",
        "ru": "Простое рукопашное оружие; Свойства: Лёгкое, Метательное (дис. 20/60); Искусность: Отвлекающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.simple",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d6",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.slashing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.light",
        "wsg.ref.value.weapon_property.thrown"
      ],
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 20,
        "long": 60
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.greatclub",
    "key": "greatclub",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Greatclub",
      "ru": "Палица"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Простое рукопашное оружие; Свойства: Двуручное; Искусность: Отталкивающее",
        "ru": "Простое рукопашное оружие; Свойства: Двуручное; Искусность: Отталкивающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.sp"
      },
      "wsg.ref.parameter.item_weight": 10.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.simple",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d8",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.bludgeoning",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.two_handed"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.push",
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.sickle",
    "key": "sickle",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Sickle",
      "ru": "Серп"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Простое рукопашное оружие; Свойства: Лёгкое; Искусность: Быстрое",
        "ru": "Простое рукопашное оружие; Свойства: Лёгкое; Искусность: Быстрое"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.simple",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d4",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.slashing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.light"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.nick",
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.dart",
    "key": "dart",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Dart",
      "ru": "Дротик"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Простое дальнобойное оружие; Свойства: Фехтовальное, Метательное (дис. 20/60); Искусность: Отвлекающее",
        "ru": "Простое дальнобойное оружие; Свойства: Фехтовальное, Метательное (дис. 20/60); Искусность: Отвлекающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.cp"
      },
      "wsg.ref.parameter.item_weight": 0.25,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.simple",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d4",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.finesse",
        "wsg.ref.value.weapon_property.thrown"
      ],
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 20,
        "long": 60
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.shortbow",
    "key": "shortbow",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Shortbow",
      "ru": "Короткий лук"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Простое дальнобойное оружие; Свойства: Боеприпас (дис. 80/320; Стрела), Двуручное; Искусность: Отвлекающее",
        "ru": "Простое дальнобойное оружие; Свойства: Боеприпас (дис. 80/320; Стрела), Двуручное; Искусность: Отвлекающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 25,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.simple",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d6",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.ammunition",
        "wsg.ref.value.weapon_property.two_handed"
      ],
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 80,
        "long": 320
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.light_crossbow",
    "key": "light_crossbow",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Light Crossbow",
      "ru": "Лёгкий арбалет"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Простое дальнобойное оружие; Свойства: Боеприпас (дис. 80/320; Болт), Перезарядка, Двуручное; Искусность: Замедляющее",
        "ru": "Простое дальнобойное оружие; Свойства: Боеприпас (дис. 80/320; Болт), Перезарядка, Двуручное; Искусность: Замедляющее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 25,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 5.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.simple",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d8",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.ammunition",
        "wsg.ref.value.weapon_property.loading",
        "wsg.ref.value.weapon_property.two_handed"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.slow",
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 80,
        "long": 320
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.sling",
    "key": "sling",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Sling",
      "ru": "Праща"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Простое дальнобойное оружие; Свойства: Боеприпас (дис. 30/120; Пуля); Искусность: Замедляющее",
        "ru": "Простое дальнобойное оружие; Свойства: Боеприпас (дис. 30/120; Пуля); Искусность: Замедляющее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.sp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.simple",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d4",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.bludgeoning",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.ammunition"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.slow",
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 30,
        "long": 120
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.halberd",
    "key": "halberd",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Halberd",
      "ru": "Алебарда"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское рукопашное оружие; Свойства: Тяжёлое, Досягаемость, Двуручное; Искусность: Рассекающее",
        "ru": "Воинское рукопашное оружие; Свойства: Тяжёлое, Досягаемость, Двуручное; Искусность: Рассекающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 20,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 6.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d10",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.slashing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.heavy",
        "wsg.ref.value.weapon_property.reach",
        "wsg.ref.value.weapon_property.two_handed"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.cleave",
      "wsg.ref.parameter.item_range": {
        "reach": 10,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.warhammer",
    "key": "warhammer",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Warhammer",
      "ru": "Боевой молот"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское рукопашное оружие; Свойства: Универсальное (1к10); Искусность: Отталкивающее",
        "ru": "Воинское рукопашное оружие; Свойства: Универсальное (1к10); Искусность: Отталкивающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 15,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 5.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d8",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.bludgeoning",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.versatile"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.push",
      "wsg.ref.parameter.item_versatile_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d10",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.bludgeoning",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.battleaxe",
    "key": "battleaxe",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Battleaxe",
      "ru": "Боевой топор"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское рукопашное оружие; Свойства: Универсальное (1к10); Искусность: Опрокидывающее",
        "ru": "Воинское рукопашное оружие; Свойства: Универсальное (1к10); Искусность: Опрокидывающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 4.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d8",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.slashing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.versatile"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.topple",
      "wsg.ref.parameter.item_versatile_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d10",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.slashing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.glaive",
    "key": "glaive",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Glaive",
      "ru": "Глефа"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское рукопашное оружие; Свойства: Тяжёлое, Досягаемость, Двуручное; Искусность: Задевающее",
        "ru": "Воинское рукопашное оружие; Свойства: Тяжёлое, Досягаемость, Двуручное; Искусность: Задевающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 20,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 6.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d10",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.slashing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.heavy",
        "wsg.ref.value.weapon_property.reach",
        "wsg.ref.value.weapon_property.two_handed"
      ],
      "wsg.ref.parameter.item_range": {
        "reach": 10,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.greatsword",
    "key": "greatsword",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Greatsword",
      "ru": "Двуручный меч"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское рукопашное оружие; Свойства: Тяжёлое, Двуручное; Искусность: Задевающее",
        "ru": "Воинское рукопашное оружие; Свойства: Тяжёлое, Двуручное; Искусность: Задевающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 50,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 6.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d6",
            "diceCount": 2
          },
          "damageTypeId": "wsg.ref.value.damage_type.slashing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.heavy",
        "wsg.ref.value.weapon_property.two_handed"
      ],
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.longsword",
    "key": "longsword",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Longsword",
      "ru": "Длинный меч"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское рукопашное оружие; Свойства: Универсальное (1к10); Искусность: Ослабляющее",
        "ru": "Воинское рукопашное оружие; Свойства: Универсальное (1к10); Искусность: Ослабляющее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 15,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 3.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d8",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.slashing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.versatile"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.sap",
      "wsg.ref.parameter.item_versatile_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d10",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.slashing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.lance",
    "key": "lance",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Lance",
      "ru": "Кавалерийское копье"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское рукопашное оружие; Свойства: Тяжёлое, Досягаемость, Двуручное (если персонаж не верхом); Искусность: Опрокидывающее",
        "ru": "Воинское рукопашное оружие; Свойства: Тяжёлое, Досягаемость, Двуручное (если персонаж не верхом); Искусность: Опрокидывающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 6.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d10",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.heavy",
        "wsg.ref.value.weapon_property.reach",
        "wsg.ref.value.weapon_property.two_handed"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.topple",
      "wsg.ref.parameter.item_range": {
        "reach": 10,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.war_pick",
    "key": "war_pick",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "War Pick",
      "ru": "Клевец"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское рукопашное оружие; Свойства: Универсальное (1к10); Искусность: Ослабляющее",
        "ru": "Воинское рукопашное оружие; Свойства: Универсальное (1к10); Искусность: Ослабляющее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d8",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.versatile"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.sap",
      "wsg.ref.parameter.item_versatile_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d10",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.whip",
    "key": "whip",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Whip",
      "ru": "Кнут"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское рукопашное оружие; Свойства: Фехтовальное, Досягаемость; Искусность: Замедляющее",
        "ru": "Воинское рукопашное оружие; Свойства: Фехтовальное, Досягаемость; Искусность: Замедляющее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 3.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d4",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.slashing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.finesse",
        "wsg.ref.value.weapon_property.reach"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.slow",
      "wsg.ref.parameter.item_range": {
        "reach": 10,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.shortsword",
    "key": "shortsword",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Shortsword",
      "ru": "Короткий меч"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское рукопашное оружие; Свойства: Фехтовальное, Лёгкое; Искусность: Отвлекающее",
        "ru": "Воинское рукопашное оружие; Свойства: Фехтовальное, Лёгкое; Искусность: Отвлекающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d6",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.finesse",
        "wsg.ref.value.weapon_property.light"
      ],
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.maul",
    "key": "maul",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Maul",
      "ru": "Молот"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское рукопашное оружие; Свойства: Тяжёлое, Двуручное; Искусность: Опрокидывающее",
        "ru": "Воинское рукопашное оружие; Свойства: Тяжёлое, Двуручное; Искусность: Опрокидывающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 10.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d6",
            "diceCount": 2
          },
          "damageTypeId": "wsg.ref.value.damage_type.bludgeoning",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.heavy",
        "wsg.ref.value.weapon_property.two_handed"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.topple",
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.morningstar",
    "key": "morningstar",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Morningstar",
      "ru": "Моргенштерн"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское рукопашное оружие; Искусность: Ослабляющее",
        "ru": "Воинское рукопашное оружие; Искусность: Ослабляющее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 15,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 4.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d8",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.sap",
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.pike",
    "key": "pike",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Pike",
      "ru": "Пика"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское рукопашное оружие; Свойства: Тяжёлое, Досягаемость, Двуручное; Искусность: Отталкивающее",
        "ru": "Воинское рукопашное оружие; Свойства: Тяжёлое, Досягаемость, Двуручное; Искусность: Отталкивающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 18.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d10",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.heavy",
        "wsg.ref.value.weapon_property.reach",
        "wsg.ref.value.weapon_property.two_handed"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.push",
      "wsg.ref.parameter.item_range": {
        "reach": 10,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.rapier",
    "key": "rapier",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Rapier",
      "ru": "Рапира"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское рукопашное оружие; Свойства: Фехтовальное; Искусность: Отвлекающее",
        "ru": "Воинское рукопашное оружие; Свойства: Фехтовальное; Искусность: Отвлекающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 25,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d8",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.finesse"
      ],
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.greataxe",
    "key": "greataxe",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Greataxe",
      "ru": "Секира"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское рукопашное оружие; Свойства: Тяжёлое, Двуручное; Искусность: Рассекающее",
        "ru": "Воинское рукопашное оружие; Свойства: Тяжёлое, Двуручное; Искусность: Рассекающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 30,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 7.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d12",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.slashing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.heavy",
        "wsg.ref.value.weapon_property.two_handed"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.cleave",
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.scimitar",
    "key": "scimitar",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Scimitar",
      "ru": "Скимитар"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское рукопашное оружие; Свойства: Фехтовальное, Лёгкое; Искусность: Быстрое",
        "ru": "Воинское рукопашное оружие; Свойства: Фехтовальное, Лёгкое; Искусность: Быстрое"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 25,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 3.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d6",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.slashing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.finesse",
        "wsg.ref.value.weapon_property.light"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.nick",
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.trident",
    "key": "trident",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Trident",
      "ru": "Трезубец"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское рукопашное оружие; Свойства: Метательное (дис. 20/60), Универсальное (1к10); Искусность: Опрокидывающее",
        "ru": "Воинское рукопашное оружие; Свойства: Метательное (дис. 20/60), Универсальное (1к10); Искусность: Опрокидывающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 4.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d9",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.thrown",
        "wsg.ref.value.weapon_property.versatile"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.topple",
      "wsg.ref.parameter.item_versatile_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d10",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 20,
        "long": 60
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.flail",
    "key": "flail",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Flail",
      "ru": "Цеп"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское рукопашное оружие; Искусность: Ослабляющее",
        "ru": "Воинское рукопашное оружие; Искусность: Ослабляющее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d8",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.bludgeoning",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.sap",
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 0,
        "long": 0
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.longbow",
    "key": "longbow",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Longbow",
      "ru": "Длинный лук"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское дальнобойное оружие; Свойства: Боеприпас (дис. 150/600; Стрела), Тяжёлое, Двуручное; Искусность: Замедляющее",
        "ru": "Воинское дальнобойное оружие; Свойства: Боеприпас (дис. 150/600; Стрела), Тяжёлое, Двуручное; Искусность: Замедляющее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 50,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d8",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.ammunition",
        "wsg.ref.value.weapon_property.heavy",
        "wsg.ref.value.weapon_property.two_handed"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.slow",
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 150,
        "long": 600
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.blowgun",
    "key": "blowgun",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Blowgun",
      "ru": "Духовая трубка"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское дальнобойное оружие; Свойства: Боеприпас (дис. 25/100; Игла), Перезарядка; Искусность: Отвлекающее",
        "ru": "Воинское дальнобойное оружие; Свойства: Боеприпас (дис. 25/100; Игла), Перезарядка; Искусность: Отвлекающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.ammunition",
        "wsg.ref.value.weapon_property.loading"
      ],
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 25,
        "long": 100
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.musket",
    "key": "musket",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Musket",
      "ru": "Мушкет"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское дальнобойное оружие; Свойства: Боеприпас (дис. 40/120; Пуля), Перезарядка, Двуручное; Искусность: Замедляющее",
        "ru": "Воинское дальнобойное оружие; Свойства: Боеприпас (дис. 40/120; Пуля), Перезарядка, Двуручное; Искусность: Замедляющее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 500,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 10.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d12",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.ammunition",
        "wsg.ref.value.weapon_property.loading",
        "wsg.ref.value.weapon_property.two_handed"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.slow",
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 40,
        "long": 120
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.hand_crossbow",
    "key": "hand_crossbow",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Hand Crossbow",
      "ru": "Одноручный арбалет"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское дальнобойное оружие; Свойства: Боеприпас (дис. 30/120; Болт), Лёгкое, Перезарядка; Искусность: Отвлекающее",
        "ru": "Воинское дальнобойное оружие; Свойства: Боеприпас (дис. 30/120; Болт), Лёгкое, Перезарядка; Искусность: Отвлекающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 75,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 3.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d6",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.ammunition",
        "wsg.ref.value.weapon_property.light",
        "wsg.ref.value.weapon_property.loading"
      ],
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 30,
        "long": 120
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.pistol",
    "key": "pistol",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Pistol",
      "ru": "Пистоль"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское дальнобойное оружие; Свойства: Боеприпас (дис. 30/90; Пуля), Перезарядка; Искусность: Отвлекающее",
        "ru": "Воинское дальнобойное оружие; Свойства: Боеприпас (дис. 30/90; Пуля), Перезарядка; Искусность: Отвлекающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 250,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 3.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d10",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.ammunition",
        "wsg.ref.value.weapon_property.loading"
      ],
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 30,
        "long": 90
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.heavy_crossbow",
    "key": "heavy_crossbow",
    "type": "item",
    "templateId": "mygame.temp.weapon",
    "name": {
      "en": "Heavy Crossbow",
      "ru": "Тяжёлый арбалет"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Воинское дальнобойное оружие; Свойства: Боеприпас (дис. 100/400; Болт), Тяжёлое, Перезарядка, Двуручное; Искусность: Отталкивающее",
        "ru": "Воинское дальнобойное оружие; Свойства: Боеприпас (дис. 100/400; Болт), Тяжёлое, Перезарядка, Двуручное; Искусность: Отталкивающее"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 50,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 18.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.weapon",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.held",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_weapon_category": "wsg.ref.value.weapon_category.martial",
      "wsg.ref.parameter.item_damage": [
        {
          "id": "damage_1",
          "dice": {
            "kind": "die_roll",
            "dieId": "wsg.atomic.d10",
            "diceCount": 1
          },
          "damageTypeId": "wsg.ref.value.damage_type.piercing",
          "saveOutcome": "full",
          "periodic": false,
          "trigger": "attack_hit",
          "intervalRounds": 1,
          "durationRounds": 0,
          "frequency": "once_per_turn"
        }
      ],
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.ammunition",
        "wsg.ref.value.weapon_property.heavy",
        "wsg.ref.value.weapon_property.loading",
        "wsg.ref.value.weapon_property.two_handed"
      ],
      "wsg.ref.parameter.item_mastery": "wsg.ref.value.weapon_mastery.push",
      "wsg.ref.parameter.item_range": {
        "reach": 5,
        "normal": 100,
        "long": 400
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.arrows",
    "key": "arrows",
    "type": "item",
    "templateId": "mygame.temp.ammunition",
    "name": {
      "en": "Arrows",
      "ru": "Стрелы"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Контейнер: Колчан. В исходной упаковке: 20.",
        "ru": "Контейнер: Колчан. В исходной упаковке: 20."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.cp"
      },
      "wsg.ref.parameter.item_weight": 0.05,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ammunition",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_original_pack_quantity": 20,
      "wsg.ref.parameter.item_ammunition_container": {
        "en": "Колчан",
        "ru": "Колчан"
      },
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.ammunition"
      ]
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.bolts",
    "key": "bolts",
    "type": "item",
    "templateId": "mygame.temp.ammunition",
    "name": {
      "en": "Bolts",
      "ru": "Болты"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Контейнер: Футляр. В исходной упаковке: 20.",
        "ru": "Контейнер: Футляр. В исходной упаковке: 20."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.cp"
      },
      "wsg.ref.parameter.item_weight": 0.075,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ammunition",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_original_pack_quantity": 20,
      "wsg.ref.parameter.item_ammunition_container": {
        "en": "Футляр",
        "ru": "Футляр"
      },
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.ammunition"
      ]
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.bullets",
    "key": "bullets",
    "type": "item",
    "templateId": "mygame.temp.ammunition",
    "name": {
      "en": "Bullets",
      "ru": "Пули"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Контейнер: Кошель. В исходной упаковке: 10.",
        "ru": "Контейнер: Кошель. В исходной упаковке: 10."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 30,
        "currency": "wsg.ref.value.currency.cp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ammunition",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_original_pack_quantity": 10,
      "wsg.ref.parameter.item_ammunition_container": {
        "en": "Кошель",
        "ru": "Кошель"
      },
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.ammunition"
      ]
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.sling_bullets",
    "key": "sling_bullets",
    "type": "item",
    "templateId": "mygame.temp.ammunition",
    "name": {
      "en": "Sling Bullets",
      "ru": "Снаряды для пращи"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Контейнер: Кошель. В исходной упаковке: 20.",
        "ru": "Контейнер: Кошель. В исходной упаковке: 20."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 0.2,
        "currency": "wsg.ref.value.currency.cp"
      },
      "wsg.ref.parameter.item_weight": 0.075,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ammunition",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_original_pack_quantity": 20,
      "wsg.ref.parameter.item_ammunition_container": {
        "en": "Кошель",
        "ru": "Кошель"
      },
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.ammunition"
      ]
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.blowgun_needles",
    "key": "blowgun_needles",
    "type": "item",
    "templateId": "mygame.temp.ammunition",
    "name": {
      "en": "Blowgun Needles",
      "ru": "Иглы для трубки"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Контейнер: Кошель. В исходной упаковке: 50.",
        "ru": "Контейнер: Кошель. В исходной упаковке: 50."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.cp"
      },
      "wsg.ref.parameter.item_weight": 0.02,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ammunition",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_original_pack_quantity": 50,
      "wsg.ref.parameter.item_ammunition_container": {
        "en": "Кошель",
        "ru": "Кошель"
      },
      "wsg.ref.parameter.item_weapon_properties": [
        "wsg.ref.value.weapon_property.ammunition"
      ]
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.padded_armor",
    "key": "padded_armor",
    "type": "item",
    "templateId": "mygame.temp.armor",
    "name": {
      "en": "Padded Armor",
      "ru": "Стёганный"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Лёгкий доспех. КЗ: 11 + модификатор Лов.",
        "ru": "Лёгкий доспех. КЗ: 11 + модификатор Лов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 8.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.armor",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.armor",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_base_ac": 11,
      "wsg.ref.parameter.item_armor_category": "wsg.ref.value.armor_category.light",
      "wsg.ref.parameter.item_dexterity_ac": "wsg.ref.value.dexterity_ac.full",
      "wsg.ref.parameter.item_strength_requirement": 0,
      "wsg.ref.parameter.item_stealth_disadvantage": true
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.leather_armor",
    "key": "leather_armor",
    "type": "item",
    "templateId": "mygame.temp.armor",
    "name": {
      "en": "Leather Armor",
      "ru": "Кожаный"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Лёгкий доспех. КЗ: 11 + модификатор Лов.",
        "ru": "Лёгкий доспех. КЗ: 11 + модификатор Лов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 10.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.armor",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.armor",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_base_ac": 11,
      "wsg.ref.parameter.item_armor_category": "wsg.ref.value.armor_category.light",
      "wsg.ref.parameter.item_dexterity_ac": "wsg.ref.value.dexterity_ac.full",
      "wsg.ref.parameter.item_strength_requirement": 0,
      "wsg.ref.parameter.item_stealth_disadvantage": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.studded_leather_armor",
    "key": "studded_leather_armor",
    "type": "item",
    "templateId": "mygame.temp.armor",
    "name": {
      "en": "Studded Leather Armor",
      "ru": "Проклёпанный кожаный"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Лёгкий доспех. КЗ: 12 + модификатор Лов.",
        "ru": "Лёгкий доспех. КЗ: 12 + модификатор Лов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 45,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 13.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.armor",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.armor",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_base_ac": 12,
      "wsg.ref.parameter.item_armor_category": "wsg.ref.value.armor_category.light",
      "wsg.ref.parameter.item_dexterity_ac": "wsg.ref.value.dexterity_ac.full",
      "wsg.ref.parameter.item_strength_requirement": 0,
      "wsg.ref.parameter.item_stealth_disadvantage": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.hide_armor",
    "key": "hide_armor",
    "type": "item",
    "templateId": "mygame.temp.armor",
    "name": {
      "en": "Hide Armor",
      "ru": "Шкурный"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Средний доспех. КЗ: 12 + модификатор Лов (макс. 2).",
        "ru": "Средний доспех. КЗ: 12 + модификатор Лов (макс. 2)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 12.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.armor",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.armor",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_base_ac": 12,
      "wsg.ref.parameter.item_armor_category": "wsg.ref.value.armor_category.medium",
      "wsg.ref.parameter.item_dexterity_ac": "wsg.ref.value.dexterity_ac.full",
      "wsg.ref.parameter.item_strength_requirement": 0,
      "wsg.ref.parameter.item_stealth_disadvantage": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.chain_shirt",
    "key": "chain_shirt",
    "type": "item",
    "templateId": "mygame.temp.armor",
    "name": {
      "en": "Chain Shirt",
      "ru": "Кольчужная рубаха"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Средний доспех. КЗ: 13 + модификатор Лов (макс. 2).",
        "ru": "Средний доспех. КЗ: 13 + модификатор Лов (макс. 2)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 50,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 20.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.armor",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.armor",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_base_ac": 13,
      "wsg.ref.parameter.item_armor_category": "wsg.ref.value.armor_category.medium",
      "wsg.ref.parameter.item_dexterity_ac": "wsg.ref.value.dexterity_ac.full",
      "wsg.ref.parameter.item_strength_requirement": 0,
      "wsg.ref.parameter.item_stealth_disadvantage": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.scale_mail",
    "key": "scale_mail",
    "type": "item",
    "templateId": "mygame.temp.armor",
    "name": {
      "en": "Scale Mail",
      "ru": "Чешуйчатый"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Средний доспех. КЗ: 14 + модификатор Лов (макс. 2).",
        "ru": "Средний доспех. КЗ: 14 + модификатор Лов (макс. 2)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 50,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 45.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.armor",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.armor",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_base_ac": 14,
      "wsg.ref.parameter.item_armor_category": "wsg.ref.value.armor_category.medium",
      "wsg.ref.parameter.item_dexterity_ac": "wsg.ref.value.dexterity_ac.full",
      "wsg.ref.parameter.item_strength_requirement": 0,
      "wsg.ref.parameter.item_stealth_disadvantage": true
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.breastplate",
    "key": "breastplate",
    "type": "item",
    "templateId": "mygame.temp.armor",
    "name": {
      "en": "Breastplate",
      "ru": "Кираса"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Средний доспех. КЗ: 14 + модификатор Лов (макс. 2).",
        "ru": "Средний доспех. КЗ: 14 + модификатор Лов (макс. 2)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 20.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.armor",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.armor",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_base_ac": 14,
      "wsg.ref.parameter.item_armor_category": "wsg.ref.value.armor_category.medium",
      "wsg.ref.parameter.item_dexterity_ac": "wsg.ref.value.dexterity_ac.full",
      "wsg.ref.parameter.item_strength_requirement": 0,
      "wsg.ref.parameter.item_stealth_disadvantage": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.half_plate_armor",
    "key": "half_plate_armor",
    "type": "item",
    "templateId": "mygame.temp.armor",
    "name": {
      "en": "Half Plate Armor",
      "ru": "Полулаты"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Средний доспех. КЗ: 15 + модификатор Лов (макс. 2).",
        "ru": "Средний доспех. КЗ: 15 + модификатор Лов (макс. 2)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 750,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 40.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.armor",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.armor",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_base_ac": 15,
      "wsg.ref.parameter.item_armor_category": "wsg.ref.value.armor_category.medium",
      "wsg.ref.parameter.item_dexterity_ac": "wsg.ref.value.dexterity_ac.full",
      "wsg.ref.parameter.item_strength_requirement": 0,
      "wsg.ref.parameter.item_stealth_disadvantage": true
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.ring_mail",
    "key": "ring_mail",
    "type": "item",
    "templateId": "mygame.temp.armor",
    "name": {
      "en": "Ring Mail",
      "ru": "Колечный"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Тяжёлый доспех. КЗ: 14.",
        "ru": "Тяжёлый доспех. КЗ: 14."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 30,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 40.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.armor",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.armor",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_base_ac": 14,
      "wsg.ref.parameter.item_armor_category": "wsg.ref.value.armor_category.heavy",
      "wsg.ref.parameter.item_dexterity_ac": "wsg.ref.value.dexterity_ac.none",
      "wsg.ref.parameter.item_strength_requirement": 0,
      "wsg.ref.parameter.item_stealth_disadvantage": true
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.chain_mail",
    "key": "chain_mail",
    "type": "item",
    "templateId": "mygame.temp.armor",
    "name": {
      "en": "Chain Mail",
      "ru": "Кольчуга"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Тяжёлый доспех. КЗ: 16.",
        "ru": "Тяжёлый доспех. КЗ: 16."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 75,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 55.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.armor",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.armor",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_base_ac": 16,
      "wsg.ref.parameter.item_armor_category": "wsg.ref.value.armor_category.heavy",
      "wsg.ref.parameter.item_dexterity_ac": "wsg.ref.value.dexterity_ac.none",
      "wsg.ref.parameter.item_strength_requirement": 13,
      "wsg.ref.parameter.item_stealth_disadvantage": true
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.splint_armor",
    "key": "splint_armor",
    "type": "item",
    "templateId": "mygame.temp.armor",
    "name": {
      "en": "Splint Armor",
      "ru": "Наборный"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Тяжёлый доспех. КЗ: 17.",
        "ru": "Тяжёлый доспех. КЗ: 17."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 60.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.armor",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.armor",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_base_ac": 17,
      "wsg.ref.parameter.item_armor_category": "wsg.ref.value.armor_category.heavy",
      "wsg.ref.parameter.item_dexterity_ac": "wsg.ref.value.dexterity_ac.none",
      "wsg.ref.parameter.item_strength_requirement": 15,
      "wsg.ref.parameter.item_stealth_disadvantage": true
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.plate_armor",
    "key": "plate_armor",
    "type": "item",
    "templateId": "mygame.temp.armor",
    "name": {
      "en": "Plate Armor",
      "ru": "Латы"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Тяжёлый доспех. КЗ: 18.",
        "ru": "Тяжёлый доспех. КЗ: 18."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1500,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 65.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.armor",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.armor",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_base_ac": 18,
      "wsg.ref.parameter.item_armor_category": "wsg.ref.value.armor_category.heavy",
      "wsg.ref.parameter.item_dexterity_ac": "wsg.ref.value.dexterity_ac.none",
      "wsg.ref.parameter.item_strength_requirement": 15,
      "wsg.ref.parameter.item_stealth_disadvantage": true
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.shield",
    "key": "shield",
    "type": "item",
    "templateId": "mygame.temp.shield",
    "name": {
      "en": "Shield",
      "ru": "Щит"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Щит. КЗ: 2.",
        "ru": "Щит. КЗ: 2."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 6.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.shield",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.shield",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_base_ac": 2
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.naruchi_zaschity",
    "key": "naruchi_zaschity",
    "type": "item",
    "templateId": "mygame.temp.bracers",
    "name": {
      "en": "Наручи защиты",
      "ru": "Наручи защиты"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите эти наручи и не носите ни доспехов, ни Щита, вы обладаете бонусом +2 к Классу Защиты.",
        "ru": "Пока вы носите эти наручи и не носите ни доспехов, ни Щита, вы обладаете бонусом +2 к Классу Защиты."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.bracers",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.bracers",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.naruchi_strelby_iz_luka",
    "key": "naruchi_strelby_iz_luka",
    "type": "item",
    "templateId": "mygame.temp.bracers",
    "name": {
      "en": "Наручи стрельбы из лука",
      "ru": "Наручи стрельбы из лука"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите эти наручи, вы обладаете владением Длинным и Коротким луками, и вы получаете бонус +2 к броскам урона при использовании таких луков.",
        "ru": "Пока вы носите эти наручи, вы обладаете владением Длинным и Коротким луками, и вы получаете бонус +2 к броскам урона при использовании таких луков."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.bracers",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.bracers",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.obmotki_bezoruzhnoy_moschi_1",
    "key": "obmotki_bezoruzhnoy_moschi_1",
    "type": "item",
    "templateId": "mygame.temp.bracers",
    "name": {
      "en": "Обмотки безоружной мощи +1",
      "ru": "Обмотки безоружной мощи +1"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите эти обмотки, вы обладаете бонусом +1 к броскам атаки и урона ваших Безоружных ударов. Эти удары наносят по вашему выбору Силовой урон или их обычный тип урона.",
        "ru": "Пока вы носите эти обмотки, вы обладаете бонусом +1 к броскам атаки и урона ваших Безоружных ударов. Эти удары наносят по вашему выбору Силовой урон или их обычный тип урона."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.bracers",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.bracers",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_magic_bonus": 1
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.obmotki_bezoruzhnoy_moschi_2",
    "key": "obmotki_bezoruzhnoy_moschi_2",
    "type": "item",
    "templateId": "mygame.temp.bracers",
    "name": {
      "en": "Обмотки безоружной мощи +2",
      "ru": "Обмотки безоружной мощи +2"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите эти обмотки, вы обладаете бонусом +2 к броскам атаки и урона ваших Безоружных ударов. Эти удары наносят по вашему выбору Силовой урон или их обычный тип урона.",
        "ru": "Пока вы носите эти обмотки, вы обладаете бонусом +2 к броскам атаки и урона ваших Безоружных ударов. Эти удары наносят по вашему выбору Силовой урон или их обычный тип урона."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.bracers",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.bracers",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_magic_bonus": 2
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.obmotki_bezoruzhnoy_moschi_3",
    "key": "obmotki_bezoruzhnoy_moschi_3",
    "type": "item",
    "templateId": "mygame.temp.bracers",
    "name": {
      "en": "Обмотки безоружной мощи +3",
      "ru": "Обмотки безоружной мощи +3"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите эти обмотки, вы обладаете бонусом +3 к броскам атаки и урона ваших Безоружных ударов. Эти удары наносят по вашему выбору Силовой урон или их обычный тип урона.",
        "ru": "Пока вы носите эти обмотки, вы обладаете бонусом +3 к броскам атаки и урона ваших Безоружных ударов. Эти удары наносят по вашему выбору Силовой урон или их обычный тип урона."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.bracers",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.bracers",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_magic_bonus": 3
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.perchatki_vorovstva",
    "key": "perchatki_vorovstva",
    "type": "item",
    "templateId": "mygame.temp.bracers",
    "name": {
      "en": "Перчатки воровства",
      "ru": "Перчатки воровства"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Эти перчатки неощутимы при ношении. Пока вы носите эти перчатки, вы обладаете бонусом +5 к проверкам Ловкости (Ловкость рук).",
        "ru": "Эти перчатки неощутимы при ношении. Пока вы носите эти перчатки, вы обладаете бонусом +5 к проверкам Ловкости (Ловкость рук)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.bracers",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.bracers",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.perchatki_lovli_snaryadov",
    "key": "perchatki_lovli_snaryadov",
    "type": "item",
    "templateId": "mygame.temp.bracers",
    "name": {
      "en": "Перчатки ловли снарядов",
      "ru": "Перчатки ловли снарядов"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите эти перчатки, если по вам попадает бросок атаки Дальнобойным или Метательным оружием, и у вас есть свободная рука, вы можете Реакцией уменьшить получаемый урон на число, равное 1к10 плюс ваш модификатор Ловкости. Если таким образом вы уменьшите урон до 0, вы можете поймать попавшие по вам боеприпас или оружие в руку, если этот объект достаточно мал, чтобы вы могли держать его в этой руке.",
        "ru": "Пока вы носите эти перчатки, если по вам попадает бросок атаки Дальнобойным или Метательным оружием, и у вас есть свободная рука, вы можете Реакцией уменьшить получаемый урон на число, равное 1к10 плюс ваш модификатор Ловкости. Если таким образом вы уменьшите урон до 0, вы можете поймать попавшие по вам боеприпас или оружие в руку, если этот объект достаточно мал, чтобы вы могли держать его в этой руке."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.bracers",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.bracers",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.perchatki_plavaniya_i_lazaniya",
    "key": "perchatki_plavaniya_i_lazaniya",
    "type": "item",
    "templateId": "mygame.temp.bracers",
    "name": {
      "en": "Перчатки плавания и лазания",
      "ru": "Перчатки плавания и лазания"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите эти перчатки, у вас есть Скорость лазания и Скорость плавания, равные вашей Скорости, и вы получаете бонус +5 к проверкам Силы (Атлетика), совершаемым для лазания или плавания.",
        "ru": "Пока вы носите эти перчатки, у вас есть Скорость лазания и Скорость плавания, равные вашей Скорости, и вы получаете бонус +5 к проверкам Силы (Атлетика), совершаемым для лазания или плавания."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.bracers",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.bracers",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.braslet_iz_mifallara",
    "key": "braslet_iz_mifallara",
    "type": "item",
    "templateId": "mygame.temp.bracers",
    "name": {
      "en": "Браслет из мифаллара",
      "ru": "Браслет из мифаллара"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "На этом кожаном браслете нанизано три маленьких кристаллических бусины, изготовленных из демонтированного мифаллара. Действием Магия вы можете снять одну бусину с браслета, чтобы получить Преимущество в проверках Силы (Атлетика) на 1 минуту. Бусина исчезает немедленно после снятия. Как только все три бусины будут сняты, браслет теряет свою магию.",
        "ru": "На этом кожаном браслете нанизано три маленьких кристаллических бусины, изготовленных из демонтированного мифаллара. Действием Магия вы можете снять одну бусину с браслета, чтобы получить Преимущество в проверках Силы (Атлетика) на 1 минуту. Бусина исчезает немедленно после снятия. Как только все три бусины будут сняты, браслет теряет свою магию."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 100,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.bracers",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.bracers",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.common",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zapolyarnye_sapogi",
    "key": "zapolyarnye_sapogi",
    "type": "item",
    "templateId": "mygame.temp.boots",
    "name": {
      "en": "Заполярные сапоги",
      "ru": "Заполярные сапоги"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Эти тёплые наощупь меховые сапоги плотно облегают ноги. Пока вы их носите, вы получаете следующие преимущества: Сопротивление холоду. Вы обладаете Сопротивлением урону Холодом и можете выдерживать температуру 0 градусов по Фаренгейту (-18 °C) или ниже без дополнительной защиты. Зимний странник. Вы игнорируете Труднопроходимую местность, созданную льдом или снегом.",
        "ru": "Эти тёплые наощупь меховые сапоги плотно облегают ноги. Пока вы их носите, вы получаете следующие преимущества: Сопротивление холоду. Вы обладаете Сопротивлением урону Холодом и можете выдерживать температуру 0 градусов по Фаренгейту (-18 °C) или ниже без дополнительной защиты. Зимний странник. Вы игнорируете Труднопроходимую местность, созданную льдом или снегом."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.boots",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.boots",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.krylatye_sapogi",
    "key": "krylatye_sapogi",
    "type": "item",
    "templateId": "mygame.temp.boots",
    "name": {
      "en": "Крылатые сапоги",
      "ru": "Крылатые сапоги"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Эти сапоги имеют 4 заряда и восстанавливают 1к4 потраченных зарядов на каждом рассвете. Пока вы носите эти сапоги, вы можете действием Магия потратить 1 заряд, чтобы получить Скорость полёта 30 футов на 1 час. Если вы летите, когда действие этого эффекта истекает, вы опускаетесь со скоростью 30 футов за раунд, пока не приземлитесь.",
        "ru": "Эти сапоги имеют 4 заряда и восстанавливают 1к4 потраченных зарядов на каждом рассвете. Пока вы носите эти сапоги, вы можете действием Магия потратить 1 заряд, чтобы получить Скорость полёта 30 футов на 1 час. Если вы летите, когда действие этого эффекта истекает, вы опускаетесь со скоростью 30 футов за раунд, пока не приземлитесь."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.boots",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.boots",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_charges": 4,
      "wsg.ref.parameter.resources": {
        "key": "krylatye_sapogi_charges",
        "name": {
          "en": "Charges",
          "ru": "Заряды"
        },
        "maximum": {
          "kind": "number",
          "number": 4
        },
        "initial": "maximum",
        "minimum": 0,
        "recovery": [
          {
            "event": "dawn",
            "amount": {
              "kind": "die_roll",
              "dieId": "wsg.atomic.d4",
              "diceCount": 1
            }
          }
        ]
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.sapogi_levitatsii",
    "key": "sapogi_levitatsii",
    "type": "item",
    "templateId": "mygame.temp.boots",
    "name": {
      "en": "Сапоги левитации",
      "ru": "Сапоги левитации"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите эти ботинки, вы можете сотворять на себя Левитацию.",
        "ru": "Пока вы носите эти ботинки, вы можете сотворять на себя Левитацию."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.boots",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.boots",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.sapogi_lozhnyh_sledov",
    "key": "sapogi_lozhnyh_sledov",
    "type": "item",
    "templateId": "mygame.temp.boots",
    "name": {
      "en": "Сапоги ложных следов",
      "ru": "Сапоги ложных следов"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите эти сапоги, оставляемые ими следы могут быть следами любого Гуманоида вашего размера.",
        "ru": "Пока вы носите эти сапоги, оставляемые ими следы могут быть следами любого Гуманоида вашего размера."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 100,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.boots",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.boots",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.common",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.sapogi_skorosti",
    "key": "sapogi_skorosti",
    "type": "item",
    "templateId": "mygame.temp.boots",
    "name": {
      "en": "Сапоги скорости",
      "ru": "Сапоги скорости"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите эти сапоги, Бонусным действием вы можете щёлкнуть каблуками сапог; в этом случае сапоги удваивают вашу Скорость, а любое существо, совершающее по вам Провоцированную атаку, совершает её с Помехой. Щёлкнув каблуками ещё раз, вы оканчиваете этот эффект. Как только вы используете эту особенность сапог суммарно в течение 10 минут, их магия перестаёт действовать, пока вы не завершите Долгий отдых.",
        "ru": "Пока вы носите эти сапоги, Бонусным действием вы можете щёлкнуть каблуками сапог; в этом случае сапоги удваивают вашу Скорость, а любое существо, совершающее по вам Провоцированную атаку, совершает её с Помехой. Щёлкнув каблуками ещё раз, вы оканчиваете этот эффект. Как только вы используете эту особенность сапог суммарно в течение 10 минут, их магия перестаёт действовать, пока вы не завершите Долгий отдых."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.boots",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.boots",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.sapogi_hodby_i_pryzhkov",
    "key": "sapogi_hodby_i_pryzhkov",
    "type": "item",
    "templateId": "mygame.temp.boots",
    "name": {
      "en": "Сапоги ходьбы и прыжков",
      "ru": "Сапоги ходьбы и прыжков"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите эти сапоги, ваша Скорость становится равна 30 футов, если только она не больше, и ваша Скорость не уменьшается из-за превышения вами грузоподъемности или ношения Тяжёлых доспехов. Один раз в каждый ваш ход вы можете прыгнуть на расстояние до 30 футов, потратив всего 10 футов передвижения.",
        "ru": "Пока вы носите эти сапоги, ваша Скорость становится равна 30 футов, если только она не больше, и ваша Скорость не уменьшается из-за превышения вами грузоподъемности или ношения Тяжёлых доспехов. Один раз в каждый ваш ход вы можете прыгнуть на расстояние до 30 футов, потратив всего 10 футов передвижения."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.boots",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.boots",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.elfiyskie_sapogi",
    "key": "elfiyskie_sapogi",
    "type": "item",
    "templateId": "mygame.temp.boots",
    "name": {
      "en": "Эльфийские сапоги",
      "ru": "Эльфийские сапоги"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите эти сапоги, ваши шаги не издают звуков, по какой поверхности вы бы ни двигались; кроме того, вы также совершаете с Преимуществом проверки Ловкости (Скрытность).",
        "ru": "Пока вы носите эти сапоги, ваши шаги не издают звуков, по какой поверхности вы бы ни двигались; кроме того, вы также совершаете с Преимуществом проверки Ловкости (Скрытность)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.boots",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.boots",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.poyas_sily_kamennogo_velikana",
    "key": "poyas_sily_kamennogo_velikana",
    "type": "item",
    "templateId": "mygame.temp.belt",
    "name": {
      "en": "Пояс силы каменного великана",
      "ru": "Пояс силы каменного великана"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот пояс, ваше значение Силы становится равно 23. Пояс не оказывает на вас эффекта, если ваша Сила уже равна этому значению или выше его.",
        "ru": "Пока вы носите этот пояс, ваше значение Силы становится равно 23. Пояс не оказывает на вас эффекта, если ваша Сила уже равна этому значению или выше его."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.belt",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.belt",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.poyas_sily_ledyanogo_velikana",
    "key": "poyas_sily_ledyanogo_velikana",
    "type": "item",
    "templateId": "mygame.temp.belt",
    "name": {
      "en": "Пояс силы ледяного великана",
      "ru": "Пояс силы ледяного великана"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот пояс, ваше значение Силы становится равно 23. Пояс не оказывает на вас эффекта, если ваша Сила уже равна этому значению или выше его.",
        "ru": "Пока вы носите этот пояс, ваше значение Силы становится равно 23. Пояс не оказывает на вас эффекта, если ваша Сила уже равна этому значению или выше его."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.belt",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.belt",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.poyas_sily_oblachnogo_velikana",
    "key": "poyas_sily_oblachnogo_velikana",
    "type": "item",
    "templateId": "mygame.temp.belt",
    "name": {
      "en": "Пояс силы облачного великана",
      "ru": "Пояс силы облачного великана"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот пояс, ваше значение Силы становится равно 27. Пояс не оказывает на вас эффекта, если ваша Сила уже равна этому значению или выше его.",
        "ru": "Пока вы носите этот пояс, ваше значение Силы становится равно 27. Пояс не оказывает на вас эффекта, если ваша Сила уже равна этому значению или выше его."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.belt",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.belt",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.legendary",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.poyas_sily_ognennogo_velikana",
    "key": "poyas_sily_ognennogo_velikana",
    "type": "item",
    "templateId": "mygame.temp.belt",
    "name": {
      "en": "Пояс силы огненного великана",
      "ru": "Пояс силы огненного великана"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот пояс, ваше значение Силы становится равно 25. Пояс не оказывает на вас эффекта, если ваша Сила уже равна этому значению или выше его.",
        "ru": "Пока вы носите этот пояс, ваше значение Силы становится равно 25. Пояс не оказывает на вас эффекта, если ваша Сила уже равна этому значению или выше его."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.belt",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.belt",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.poyas_sily_holmovogo_velikana",
    "key": "poyas_sily_holmovogo_velikana",
    "type": "item",
    "templateId": "mygame.temp.belt",
    "name": {
      "en": "Пояс силы холмового великана",
      "ru": "Пояс силы холмового великана"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот пояс, ваше значение Силы становится равно 21. Пояс не оказывает на вас эффекта, если ваша Сила уже равна этому значению или выше его.",
        "ru": "Пока вы носите этот пояс, ваше значение Силы становится равно 21. Пояс не оказывает на вас эффекта, если ваша Сила уже равна этому значению или выше его."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.belt",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.belt",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.poyas_sily_shtormovogo_velikana",
    "key": "poyas_sily_shtormovogo_velikana",
    "type": "item",
    "templateId": "mygame.temp.belt",
    "name": {
      "en": "Пояс силы штормового великана",
      "ru": "Пояс силы штормового великана"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот пояс, ваше значение Силы становится равно 29. Пояс не оказывает на вас эффекта, если ваша Сила уже равна этому значению или выше его.",
        "ru": "Пока вы носите этот пояс, ваше значение Силы становится равно 29. Пояс не оказывает на вас эффекта, если ваша Сила уже равна этому значению или выше его."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.belt",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.belt",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.legendary",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.nochnye_ochki",
    "key": "nochnye_ochki",
    "type": "item",
    "templateId": "mygame.temp.helmet_or_hat",
    "name": {
      "en": "Ночные очки",
      "ru": "Ночные очки"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите эти тёмные линзы, вы обладаете Тёмным зрением дальностью 60 футов. Если у вас уже есть Тёмное зрение, то ношение очков увеличивает его дальность на 60 футов.",
        "ru": "Пока вы носите эти тёмные линзы, вы обладаете Тёмным зрением дальностью 60 футов. Если у вас уже есть Тёмное зрение, то ношение очков увеличивает его дальность на 60 футов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.headwear",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.head",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.obruch_szhiganiya",
    "key": "obruch_szhiganiya",
    "type": "item",
    "templateId": "mygame.temp.helmet_or_hat",
    "name": {
      "en": "Обруч сжигания",
      "ru": "Обруч сжигания"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот обруч, вы можете сотворить с его помощью заклинание Палящий луч (модификатор броска атаки +5). Обруч не может быть использован для сотворения этого заклинания снова до следующего рассвета.",
        "ru": "Пока вы носите этот обруч, вы можете сотворить с его помощью заклинание Палящий луч (модификатор броска атаки +5). Обруч не может быть использован для сотворения этого заклинания снова до следующего рассвета."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.headwear",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.head",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.ochki_detalnogo_zreniya",
    "key": "ochki_detalnogo_zreniya",
    "type": "item",
    "templateId": "mygame.temp.helmet_or_hat",
    "name": {
      "en": "Очки детального зрения",
      "ru": "Очки детального зрения"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Эти хрустальные линзы носятся на глазах. Пока вы их носите, ваше зрение значительно улучшается в пределах 1 фута, даруя вам Тёмное зрение в этих пределах и Преимущество при проверках Интеллекта (Расследование), совершаемых для осмотра чего-либо в этих пределах.",
        "ru": "Эти хрустальные линзы носятся на глазах. Пока вы их носите, ваше зрение значительно улучшается в пределах 1 фута, даруя вам Тёмное зрение в этих пределах и Преимущество при проверках Интеллекта (Расследование), совершаемых для осмотра чего-либо в этих пределах."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.headwear",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.head",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.ochki_orlinogo_zreniya",
    "key": "ochki_orlinogo_zreniya",
    "type": "item",
    "templateId": "mygame.temp.helmet_or_hat",
    "name": {
      "en": "Очки орлиного зрения",
      "ru": "Очки орлиного зрения"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Эти хрустальные линзы носятся на глазах. Пока вы их носите, вы совершаете с Преимуществом проверки Мудрости (Восприятие), полагающиеся на зрение. В условиях хорошей видимости вы можете различать детали даже чрезвычайно далёких существ и объектов размером всего 2 фута.",
        "ru": "Эти хрустальные линзы носятся на глазах. Пока вы их носите, вы совершаете с Преимуществом проверки Мудрости (Восприятие), полагающиеся на зрение. В условиях хорошей видимости вы можете различать детали даже чрезвычайно далёких существ и объектов размером всего 2 фута."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.headwear",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.head",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.ochki_ocharovaniya",
    "key": "ochki_ocharovaniya",
    "type": "item",
    "templateId": "mygame.temp.helmet_or_hat",
    "name": {
      "en": "Очки очарования",
      "ru": "Очки очарования"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Эти хрустальные линзы носятся на глазах и имеют 3 заряда. Пока вы их носите, вы можете потратить 1 или несколько зарядов для сотворения заклинания Очарование личности (Сл спасброска 13). Если вы тратите 1 заряд, вы сотворяете это заклинание на 1-м уровне, и вы увеличиваете уровень заклинания на один за каждый дополнительный потраченный заряд. Очки восстанавливают все потраченные заряды на каждом рассвете.",
        "ru": "Эти хрустальные линзы носятся на глазах и имеют 3 заряда. Пока вы их носите, вы можете потратить 1 или несколько зарядов для сотворения заклинания Очарование личности (Сл спасброска 13). Если вы тратите 1 заряд, вы сотворяете это заклинание на 1-м уровне, и вы увеличиваете уровень заклинания на один за каждый дополнительный потраченный заряд. Очки восстанавливают все потраченные заряды на каждом рассвете."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.headwear",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.head",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_charges": 3,
      "wsg.ref.parameter.resources": {
        "key": "ochki_ocharovaniya_charges",
        "name": {
          "en": "Charges",
          "ru": "Заряды"
        },
        "maximum": {
          "kind": "number",
          "number": 3
        },
        "initial": "maximum",
        "minimum": 0,
        "recovery": [
          {
            "event": "dawn",
            "amount": "all"
          }
        ]
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.povyazka_intellekta",
    "key": "povyazka_intellekta",
    "type": "item",
    "templateId": "mygame.temp.helmet_or_hat",
    "name": {
      "en": "Повязка интеллекта",
      "ru": "Повязка интеллекта"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Ваш Интеллект равен 19, пока вы носите эту повязку. Она не оказывает на вас эффекта, если ваш Интеллект равен 19 или выше без этой повязки.",
        "ru": "Ваш Интеллект равен 19, пока вы носите эту повязку. Она не оказывает на вас эффекта, если ваш Интеллект равен 19 или выше без этой повязки."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.headwear",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.head",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.shapka_maskirovki",
    "key": "shapka_maskirovki",
    "type": "item",
    "templateId": "mygame.temp.helmet_or_hat",
    "name": {
      "en": "Шапка маскировки",
      "ru": "Шапка маскировки"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите эту шапку, вы можете сотворять Маскировку. Это заклинание немедленно оканчивается, если шапку снять.",
        "ru": "Пока вы носите эту шапку, вы можете сотворять Маскировку. Это заклинание немедленно оканчивается, если шапку снять."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.headwear",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.head",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.shapka_podvodnogo_dyhaniya",
    "key": "shapka_podvodnogo_dyhaniya",
    "type": "item",
    "templateId": "mygame.temp.helmet_or_hat",
    "name": {
      "en": "Шапка подводного дыхания",
      "ru": "Шапка подводного дыхания"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите эту шапку и находитесь под водой, вы можете действием Магия создать пузырь воздуха вокруг своей головы. Этот пузырь позволяет вам нормально дышать под водой. Пузырь исчезает, когда шапка снята, или когда вы перестаёте быть под водой.",
        "ru": "Пока вы носите эту шапку и находитесь под водой, вы можете действием Магия создать пузырь воздуха вокруг своей головы. Этот пузырь позволяет вам нормально дышать под водой. Пузырь исчезает, когда шапка снята, или когда вы перестаёте быть под водой."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.headwear",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.head",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.shlem_bleska",
    "key": "shlem_bleska",
    "type": "item",
    "templateId": "mygame.temp.helmet_or_hat",
    "name": {
      "en": "Шлем блеска",
      "ru": "Шлем блеска"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Этот шлем украшен драгоценными камнями: на нём находится 1к10 алмазов, 2к10 рубинов, 3к10 огненных опалов и 4к10 опалов. Любой самоцвет, будучи снят с шлема, превращается в пыль. Когда все самоцветы сняты или уничтожены, шлем теряет свою магию. Пока вы носите шлем, вы получаете следующие преимущества. Свет алмазов. Пока на шлеме находится хотя бы один алмаз, он излучает Эманацию радиусом 30 футов. Когда в этой Эманации находится хотя бы одна Нежить, она наполнена Тусклым светом. Любая Нежить, начинающее свой ход в этой Эманации, получает 1к6 урона Излучением. Пламя огненных опалов. Пока на шлеме находится хотя бы один огненный опал, вы можете действие Магия заставить одно оружие, которое вы держите, вспыхнуть пламенем. Это пламя излучает Яркий свет в радиусе 10 футов и Тусклый свет ещё на 10 футов. Пламя безопасно для вас и для оружия. Когда вы попадаете по цели атакой таким пылающим оружием, цель получает 1к6 дополнительного урона Огнём. Пламя горит до тех пор, пока вы не погасите его Бонусным действием или пока не бросите оружие или не уберёте его. Сопротивление рубина. Пока на шлеме находится хотя бы один рубин, вы обладаете Сопротивлением урону Огнём. Заклинания. Вы можете сотворить одно из следующих заклинаний (Сл спасброска 18), используя снятый с шлема драгоценный камней указанного типа в качестве компонента: Дневной свет (опал), Огненный шар (огненный опал), Радужные брызги (алмаз) или Огненная стена(рубин). При сотворении заклинания такой камень разрушается и исчезает с шлема. Получение урона Огнём. Если вы носите шлем и получаете урон Огнём из-за провала спасброска против заклинания, бросьте 1к20. Если выпадет «1», шлем излучает лучи света из оставшихся на нём самоцветов и уничтожается. Каждое существо висходящей от вас Эманации радиусом 60 футов должно преуспеть в спасброске Ловкости Сл 17, иначе будет поражено лучом и получит урон Излучением, равный количеству камней в шлеме.",
        "ru": "Этот шлем украшен драгоценными камнями: на нём находится 1к10 алмазов, 2к10 рубинов, 3к10 огненных опалов и 4к10 опалов. Любой самоцвет, будучи снят с шлема, превращается в пыль. Когда все самоцветы сняты или уничтожены, шлем теряет свою магию. Пока вы носите шлем, вы получаете следующие преимущества. Свет алмазов. Пока на шлеме находится хотя бы один алмаз, он излучает Эманацию радиусом 30 футов. Когда в этой Эманации находится хотя бы одна Нежить, она наполнена Тусклым светом. Любая Нежить, начинающее свой ход в этой Эманации, получает 1к6 урона Излучением. Пламя огненных опалов. Пока на шлеме находится хотя бы один огненный опал, вы можете действие Магия заставить одно оружие, которое вы держите, вспыхнуть пламенем. Это пламя излучает Яркий свет в радиусе 10 футов и Тусклый свет ещё на 10 футов. Пламя безопасно для вас и для оружия. Когда вы попадаете по цели атакой таким пылающим оружием, цель получает 1к6 дополнительного урона Огнём. Пламя горит до тех пор, пока вы не погасите его Бонусным действием или пока не бросите оружие или не уберёте его. Сопротивление рубина. Пока на шлеме находится хотя бы один рубин, вы обладаете Сопротивлением урону Огнём. Заклинания. Вы можете сотворить одно из следующих заклинаний (Сл спасброска 18), используя снятый с шлема драгоценный камней указанного типа в качестве компонента: Дневной свет (опал), Огненный шар (огненный опал), Радужные брызги (алмаз) или Огненная стена(рубин). При сотворении заклинания такой камень разрушается и исчезает с шлема. Получение урона Огнём. Если вы носите шлем и получаете урон Огнём из-за провала спасброска против заклинания, бросьте 1к20. Если выпадет «1», шлем излучает лучи света из оставшихся на нём самоцветов и уничтожается. Каждое существо висходящей от вас Эманации радиусом 60 футов должно преуспеть в спасброске Ловкости Сл 17, иначе будет поражено лучом и получит урон Излучением, равный количеству камней в шлеме."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 3.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.headwear",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.head",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.shlem_ponimaniya_yazykov",
    "key": "shlem_ponimaniya_yazykov",
    "type": "item",
    "templateId": "mygame.temp.helmet_or_hat",
    "name": {
      "en": "Шлем понимания языков",
      "ru": "Шлем понимания языков"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот шлем, вы можете сотворять с его помощью Понимание языков.",
        "ru": "Пока вы носите этот шлем, вы можете сотворять с его помощью Понимание языков."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.headwear",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.head",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.shlem_telepatii",
    "key": "shlem_telepatii",
    "type": "item",
    "templateId": "mygame.temp.helmet_or_hat",
    "name": {
      "en": "Шлем телепатии",
      "ru": "Шлем телепатии"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот шлем, вы обладаете телепатией дальностью 30 футов, и вы можете сотворить с помощью шлема заклинание Обнаружение мыслей или Внушение (Сл 13) из шлема. Как только любое из этих заклинаний сотворено с помощью шлема, это заклинание не может быть сотворено с его помощью снова до следующего рассвета.",
        "ru": "Пока вы носите этот шлем, вы обладаете телепатией дальностью 30 футов, и вы можете сотворить с помощью шлема заклинание Обнаружение мыслей или Внушение (Сл 13) из шлема. Как только любое из этих заклинаний сотворено с помощью шлема, это заклинание не может быть сотворено с его помощью снова до следующего рассвета."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.headwear",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.head",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.shlem_teleportatsii",
    "key": "shlem_teleportatsii",
    "type": "item",
    "templateId": "mygame.temp.helmet_or_hat",
    "name": {
      "en": "Шлем телепортации",
      "ru": "Шлем телепортации"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Этот шлем имеет 3 заряда и восстанавливает 1к3 потраченных зарядов на каждом рассвете. Пока вы носите этот шлем, вы можете потратить 1 заряд, чтобы сотворить с его помощью Телепортацию.",
        "ru": "Этот шлем имеет 3 заряда и восстанавливает 1к3 потраченных зарядов на каждом рассвете. Пока вы носите этот шлем, вы можете потратить 1 заряд, чтобы сотворить с его помощью Телепортацию."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.headwear",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.head",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_charges": 3,
      "wsg.ref.parameter.resources": {
        "key": "shlem_teleportatsii_charges",
        "name": {
          "en": "Charges",
          "ru": "Заряды"
        },
        "maximum": {
          "kind": "number",
          "number": 3
        },
        "initial": "maximum",
        "minimum": 0,
        "recovery": [
          {
            "event": "dawn",
            "amount": {
              "kind": "die_roll",
              "dieId": "wsg.atomic.d3",
              "diceCount": 1
            }
          }
        ]
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.shlem_uzhasa",
    "key": "shlem_uzhasa",
    "type": "item",
    "templateId": "mygame.temp.helmet_or_hat",
    "name": {
      "en": "Шлем ужаса",
      "ru": "Шлем ужаса"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот ужасающий стальной шлем, ваши глаза светятся красным цветом, а остальное ваше лицо скрывается в тени.",
        "ru": "Пока вы носите этот ужасающий стальной шлем, ваши глаза светятся красным цветом, а остальное ваше лицо скрывается в тени."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 100,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 4.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.headwear",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.head",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.common",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.shlyapa_volshebstva",
    "key": "shlyapa_volshebstva",
    "type": "item",
    "templateId": "mygame.temp.helmet_or_hat",
    "name": {
      "en": "Шляпа волшебства",
      "ru": "Шляпа волшебства"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Эта шляпа конической формы украшена лунами и звёздами. Пока вы её носите, вы получаете следующие преимущества: Заклинательная фокусировка. Вы можете использовать шляпу как Заклинательную фокусировку для ваших заклинаний Волшебника. Неизвестный заговор. Действием Магия вы можете попытаться сотворить заговор, который вы не знаете. Это должен быть заговор из списка заклинаний Волшебника со временем сотворения в действие. При этом вы совершаете проверку Интеллекта (Тайная магия) Сл 10. При успехе вы сотворяете этот заговор; при провале заклинание проваливается, а действие, использованное для его сотворения, тратится впустую. В любом случае вы не можете использовать это свойство снова, пока не завершите Долгий отдых.",
        "ru": "Эта шляпа конической формы украшена лунами и звёздами. Пока вы её носите, вы получаете следующие преимущества: Заклинательная фокусировка. Вы можете использовать шляпу как Заклинательную фокусировку для ваших заклинаний Волшебника. Неизвестный заговор. Действием Магия вы можете попытаться сотворить заговор, который вы не знаете. Это должен быть заговор из списка заклинаний Волшебника со временем сотворения в действие. При этом вы совершаете проверку Интеллекта (Тайная магия) Сл 10. При успехе вы сотворяете этот заговор; при провале заклинание проваливается, а действие, использованное для его сотворения, тратится впустую. В любом случае вы не можете использовать это свойство снова, пока не завершите Долгий отдых."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 100,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.headwear",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.head",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.common",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.shlyapa_vrediteley",
    "key": "shlyapa_vrediteley",
    "type": "item",
    "templateId": "mygame.temp.helmet_or_hat",
    "name": {
      "en": "Шляпа вредителей",
      "ru": "Шляпа вредителей"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Эта шляпа имеет 3 заряда. Пока вы держите шляпу, вы можете действием Магия потратить 1 заряд и призвать Летучую мышь, Лягушку или Крысу (на ваш выбор). Призванное существо магическим образом появляется в шляпе и пытается как можно быстрее убежать от вас. Существо Безразлично к вам и другим существам, и оно не находится под вашим контролем. Оно ведёт себя как обычное существо своего вида и исчезает через 1 час или когда его Хиты падают до 0. Шляпа восстанавливает все потраченные заряды на каждом рассвете.",
        "ru": "Эта шляпа имеет 3 заряда. Пока вы держите шляпу, вы можете действием Магия потратить 1 заряд и призвать Летучую мышь, Лягушку или Крысу (на ваш выбор). Призванное существо магическим образом появляется в шляпе и пытается как можно быстрее убежать от вас. Существо Безразлично к вам и другим существам, и оно не находится под вашим контролем. Оно ведёт себя как обычное существо своего вида и исчезает через 1 час или когда его Хиты падают до 0. Шляпа восстанавливает все потраченные заряды на каждом рассвете."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 100,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.headwear",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.head",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.common",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_charges": 3,
      "wsg.ref.parameter.resources": {
        "key": "shlyapa_vrediteley_charges",
        "name": {
          "en": "Charges",
          "ru": "Заряды"
        },
        "maximum": {
          "kind": "number",
          "number": 3
        },
        "initial": "maximum",
        "minimum": 0,
        "recovery": [
          {
            "event": "dawn",
            "amount": "all"
          }
        ]
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.shlyapa_mnozhestva_zaklinaniy",
    "key": "shlyapa_mnozhestva_zaklinaniy",
    "type": "item",
    "templateId": "mygame.temp.helmet_or_hat",
    "name": {
      "en": "Шляпа множества заклинаний",
      "ru": "Шляпа множества заклинаний"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "У этой остроконечной шляпы есть следующие свойства. Заклинательная фокусировка. Пока вы держите шляпу, вы можете использовать её в качестве Заклинательной фокусировки для ваших заклинаний волшебника. Любое заклинание, которое вы сотворяете с помощью шляпы, требует особого Соматического компонента: вы должны просунуть руку в шляпу и «вытащить» заклинание из неё. Неизвестное заклинание. Пока вы держите шляпу, вы можете попытаться сотворить неизвестное вам заклинание 1-го уровня или выше. Заклинание должно быть в списке заклинаний Волшебника, такого уровня, который вы можете сотворять, и не может требовать Материальных компонентов суммарной стоимостью стоимость более 1 000 ЗМ. Выбрав такое заклинание, вы должны потратить ячейку заклинания соответствующего уровня; затем, чтобы определить, удалось ли вам сотворить заклинание, совершите проверку Интеллекта (Тайная магия) со Сл, равной 10 плюс уровень заклинания. При успехе вы сотворяете заклинание его обычным временем сотворения, и вы не можете использовать это свойство снова до завершения Короткого или Долгого отдыха. При провале вы не сотворяете заклинание, а вместо этого происходит случайный эффект, определяемый броском по таблице. Любое заклинание, сотворённое вами из шляпы, использует ваши Сл спасброска заклинаний и модификатор атаки заклинанием.",
        "ru": "У этой остроконечной шляпы есть следующие свойства. Заклинательная фокусировка. Пока вы держите шляпу, вы можете использовать её в качестве Заклинательной фокусировки для ваших заклинаний волшебника. Любое заклинание, которое вы сотворяете с помощью шляпы, требует особого Соматического компонента: вы должны просунуть руку в шляпу и «вытащить» заклинание из неё. Неизвестное заклинание. Пока вы держите шляпу, вы можете попытаться сотворить неизвестное вам заклинание 1-го уровня или выше. Заклинание должно быть в списке заклинаний Волшебника, такого уровня, который вы можете сотворять, и не может требовать Материальных компонентов суммарной стоимостью стоимость более 1 000 ЗМ. Выбрав такое заклинание, вы должны потратить ячейку заклинания соответствующего уровня; затем, чтобы определить, удалось ли вам сотворить заклинание, совершите проверку Интеллекта (Тайная магия) со Сл, равной 10 плюс уровень заклинания. При успехе вы сотворяете заклинание его обычным временем сотворения, и вы не можете использовать это свойство снова до завершения Короткого или Долгого отдыха. При провале вы не сотворяете заклинание, а вместо этого происходит случайный эффект, определяемый броском по таблице. Любое заклинание, сотворённое вами из шляпы, использует ваши Сл спасброска заклинаний и модификатор атаки заклинанием."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.headwear",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.head",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.krylya_polyota",
    "key": "krylya_polyota",
    "type": "item",
    "templateId": "mygame.temp.cloak",
    "name": {
      "en": "Крылья полёта",
      "ru": "Крылья полёта"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот плащ, вы можете действием Магия превратить его в пару крыльев на вашей спине. Крылья существуют в течение 1 часа или пока вы действием Магия не окончите эффект преждевременно. Крылья дают вам Скорость полёта 60 футов. Если вы летите, когда крылья исчезают, вы падаете. Когда крылья исчезают, вы не можете использовать их вновь в течение 1к12 часов.",
        "ru": "Пока вы носите этот плащ, вы можете действием Магия превратить его в пару крыльев на вашей спине. Крылья существуют в течение 1 часа или пока вы действием Магия не окончите эффект преждевременно. Крылья дают вам Скорость полёта 60 футов. Если вы летите, когда крылья исчезают, вы падаете. Когда крылья исчезают, вы не можете использовать их вновь в течение 1к12 часов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.cloak",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.cloak",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.mantiya_arhimaga",
    "key": "mantiya_arhimaga",
    "type": "item",
    "templateId": "mygame.temp.cloak",
    "name": {
      "en": "Мантия архимага",
      "ru": "Мантия архимага"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Этот изысканный наряд изготовлен из превосходной ткани и украшен рунами. Вы получаете следующие преимущества, пока носите эту мантию. Доспех. Если вы не носите доспех, ваш базовый Класс Защиты равен 15 плюс ваш модификатор Ловкости. Сопротивление магии. Вы совершаете с Преимуществом спасброски против заклинаний и других магических эффектов. Боевой маг. Ваша Сл спасброска заклинаний и бонус атаки заклинанием увеличиваются на 2.",
        "ru": "Этот изысканный наряд изготовлен из превосходной ткани и украшен рунами. Вы получаете следующие преимущества, пока носите эту мантию. Доспех. Если вы не носите доспех, ваш базовый Класс Защиты равен 15 плюс ваш модификатор Ловкости. Сопротивление магии. Вы совершаете с Преимуществом спасброски против заклинаний и других магических эффектов. Боевой маг. Ваша Сл спасброска заклинаний и бонус атаки заклинанием увеличиваются на 2."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 3.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.cloak",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.cloak",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.legendary",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.mantiya_glaz",
    "key": "mantiya_glaz",
    "type": "item",
    "templateId": "mygame.temp.cloak",
    "name": {
      "en": "Мантия глаз",
      "ru": "Мантия глаз"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Эта мантия украшена изображениями глаз. Пока вы носите эту мантию, обладаете следующими преимуществами: Глаза на затылке. Мантия дарует вам Преимущество на проверки Мудрости (Восприятие), полагающиеся на зрение. Особые чувства. Вы обладаете Тёмным зрением дальностью 120 футов и Истинным зрением дальностью 120 футов. Недостатки. Если заклинание Свет сотворяется на мантию или заклинание Дневной свет сотворяется в пределах 5 футов от неё, вы получаете состояние Ослеплённый на 1 минуту. В конце каждого своего хода вы совершаете спасбросок Телосложения (Сл 11 для Света, Сл 15 для Дневного света), при успехе оканчивая на себе это состояние.",
        "ru": "Эта мантия украшена изображениями глаз. Пока вы носите эту мантию, обладаете следующими преимуществами: Глаза на затылке. Мантия дарует вам Преимущество на проверки Мудрости (Восприятие), полагающиеся на зрение. Особые чувства. Вы обладаете Тёмным зрением дальностью 120 футов и Истинным зрением дальностью 120 футов. Недостатки. Если заклинание Свет сотворяется на мантию или заклинание Дневной свет сотворяется в пределах 5 футов от неё, вы получаете состояние Ослеплённый на 1 минуту. В конце каждого своего хода вы совершаете спасбросок Телосложения (Сл 11 для Света, Сл 15 для Дневного света), при успехе оканчивая на себе это состояние."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.cloak",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.cloak",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.mantiya_zvyozd",
    "key": "mantiya_zvyozd",
    "type": "item",
    "templateId": "mygame.temp.cloak",
    "name": {
      "en": "Мантия звёзд",
      "ru": "Мантия звёзд"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Эта чёрная или тёмно-синяя мантия украшена мелкими белыми или серебряными звёздами. Пока вы носите её, вы обладаете бонусом +1 к спасброскам. Шесть особенно крупных звёзд расположены на передней части мантии. Пока вы носите эту мантию, вы можете действием Магия снять одну из звёзд и потратить её, чтобы сотворить заклинание Волшебная стрела 5-го уровня. Каждый день при наступлении сумерек на мантию возвращается 1к6 снятых звёзд. Пока вы носите мантию, вы можете совершить действие Магия перейти на Астральный план вместе со всем, что носите и несёте. Вы остаётесь на Астральном плане до тех пор, пока действием Магия не вернётесь на прежний план. Вы появляетесь в последнем пространстве, которое занимали, или, если это пространство занято, в ближайшем незанятом пространстве.",
        "ru": "Эта чёрная или тёмно-синяя мантия украшена мелкими белыми или серебряными звёздами. Пока вы носите её, вы обладаете бонусом +1 к спасброскам. Шесть особенно крупных звёзд расположены на передней части мантии. Пока вы носите эту мантию, вы можете действием Магия снять одну из звёзд и потратить её, чтобы сотворить заклинание Волшебная стрела 5-го уровня. Каждый день при наступлении сумерек на мантию возвращается 1к6 снятых звёзд. Пока вы носите мантию, вы можете совершить действие Магия перейти на Астральный план вместе со всем, что носите и несёте. Вы остаётесь на Астральном плане до тех пор, пока действием Магия не вернётесь на прежний план. Вы появляетесь в последнем пространстве, которое занимали, или, если это пространство занято, в ближайшем незанятом пространстве."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.cloak",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.cloak",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.mantiya_poleznyh_predmetov",
    "key": "mantiya_poleznyh_predmetov",
    "type": "item",
    "templateId": "mygame.temp.cloak",
    "name": {
      "en": "Мантия полезных предметов",
      "ru": "Мантия полезных предметов"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Эта мантия покрыта заплатами ткани различных форм и цветов. Пока вы носите эту мантию, вы можете действием Магия оторвать одну из заплат, превращая её в объект или существо, которые на ней изображены. Мантия становится обычной одеждой, как только будет оторвана последняя заплата. На мантии есть по две заплаты со следующими изображениями: Верёвка (свёрнутая кольцом), Зеркало, Кинжал, Мешок, Направленный фонарь (заполненный и зажжённый), Шест. Кроме того, на мантии есть ещё 4к4 других заплат. Мастер выбирает эти заплаты или определяет их случайным образом бросками по следующей таблице.",
        "ru": "Эта мантия покрыта заплатами ткани различных форм и цветов. Пока вы носите эту мантию, вы можете действием Магия оторвать одну из заплат, превращая её в объект или существо, которые на ней изображены. Мантия становится обычной одеждой, как только будет оторвана последняя заплата. На мантии есть по две заплаты со следующими изображениями: Верёвка (свёрнутая кольцом), Зеркало, Кинжал, Мешок, Направленный фонарь (заполненный и зажжённый), Шест. Кроме того, на мантии есть ещё 4к4 других заплат. Мастер выбирает эти заплаты или определяет их случайным образом бросками по следующей таблице."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.cloak",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.cloak",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.mantiya_siyayuschih_tsvetov",
    "key": "mantiya_siyayuschih_tsvetov",
    "type": "item",
    "templateId": "mygame.temp.cloak",
    "name": {
      "en": "Мантия сияющих цветов",
      "ru": "Мантия сияющих цветов"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Эта мантия имеет 3 заряда и восстанавливает 1к3 потраченных зарядов на каждом рассвете. Пока вы её носите, вы можете действием Магия потратить 1 заряд, и мантия станет излучать мерцающий узор ярких красок до конца вашего следующего хода. В течение этого времени мантия излучает Яркий свет в радиусе 30 футов и Тусклый свет ещё на 30 футов, а существа, которые могут вас видеть, совершают с Помехой броски атаки против вас. Каждое существо, которое может вас видеть и находящееся в радиусе Яркого света в момент активации способности мантии, должно преуспеть в спасброске мудрости Сл 15, иначе получит состояние Ошеломлённый до окончания эффекта света.",
        "ru": "Эта мантия имеет 3 заряда и восстанавливает 1к3 потраченных зарядов на каждом рассвете. Пока вы её носите, вы можете действием Магия потратить 1 заряд, и мантия станет излучать мерцающий узор ярких красок до конца вашего следующего хода. В течение этого времени мантия излучает Яркий свет в радиусе 30 футов и Тусклый свет ещё на 30 футов, а существа, которые могут вас видеть, совершают с Помехой броски атаки против вас. Каждое существо, которое может вас видеть и находящееся в радиусе Яркого света в момент активации способности мантии, должно преуспеть в спасброске мудрости Сл 15, иначе получит состояние Ошеломлённый до окончания эффекта света."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.cloak",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.cloak",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_charges": 3,
      "wsg.ref.parameter.resources": {
        "key": "mantiya_siyayuschih_tsvetov_charges",
        "name": {
          "en": "Charges",
          "ru": "Заряды"
        },
        "maximum": {
          "kind": "number",
          "number": 3
        },
        "initial": "maximum",
        "minimum": 0,
        "recovery": [
          {
            "event": "dawn",
            "amount": {
              "kind": "die_roll",
              "dieId": "wsg.atomic.d3",
              "diceCount": 1
            }
          }
        ]
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.mantiya_soprotivleniya_zaklinaniyam",
    "key": "mantiya_soprotivleniya_zaklinaniyam",
    "type": "item",
    "templateId": "mygame.temp.cloak",
    "name": {
      "en": "Мантия сопротивления заклинаниям",
      "ru": "Мантия сопротивления заклинаниям"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите эту мантию, вы совершаете с Преимуществом спасброски против заклинаний.",
        "ru": "Пока вы носите эту мантию, вы совершаете с Преимуществом спасброски против заклинаний."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.cloak",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.cloak",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.odeyanie_prirody",
    "key": "odeyanie_prirody",
    "type": "item",
    "templateId": "mygame.temp.cloak",
    "name": {
      "en": "Одеяние природы",
      "ru": "Одеяние природы"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Цвет и текстура этого плаща меняются, чтобы сливаться с окружающей вас местностью. Пока вы его носите, вы можете использовать его как Заклинательную фокусировку для ваших заклинаний Друида и Следопыта. Если вы находитесь в Слабо заслонённой области, то можете Бонусным действием совершить Затаивание — даже если за вами прямо наблюдают.",
        "ru": "Цвет и текстура этого плаща меняются, чтобы сливаться с окружающей вас местностью. Пока вы его носите, вы можете использовать его как Заклинательную фокусировку для ваших заклинаний Друида и Следопыта. Если вы находитесь в Слабо заслонённой области, то можете Бонусным действием совершить Затаивание — даже если за вами прямо наблюдают."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.cloak",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.cloak",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.plasch_zaschity",
    "key": "plasch_zaschity",
    "type": "item",
    "templateId": "mygame.temp.cloak",
    "name": {
      "en": "Плащ защиты",
      "ru": "Плащ защиты"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот плащ, вы получаете бонус +1 к Классу Защиты и спасброскам.",
        "ru": "Пока вы носите этот плащ, вы получаете бонус +1 к Классу Защиты и спасброскам."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.cloak",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.cloak",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.plasch_letuchey_myshi",
    "key": "plasch_letuchey_myshi",
    "type": "item",
    "templateId": "mygame.temp.cloak",
    "name": {
      "en": "Плащ летучей мыши",
      "ru": "Плащ летучей мыши"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот плащ, вы совершаете с Преимуществом проверки Ловкости (Скрытность). Находясь в зоне Тусклого света или Темноты, вы можете взяться руками за края плаща и использовать его для получения Скорости полёта 40 футов. Если, пока вы летите с помощью плаща, вы оказываетесь вне зоны Тусклого света или Темноты, или отпускаете край плаща, вы теряете эту Скорость полёта. Пока этот плащ на вас, и вы находитесь в зоне Тусклого света или Темноты, вы можете сотворить Превращение на себя, перевоплощаясь в Летучую мышь. В этом облике вы сохраняете ваши показатели Интеллекта, Мудрости и Харизмы. Плащ не может быть использован для сотворения этого заклинания снова до следующего рассвета.",
        "ru": "Пока вы носите этот плащ, вы совершаете с Преимуществом проверки Ловкости (Скрытность). Находясь в зоне Тусклого света или Темноты, вы можете взяться руками за края плаща и использовать его для получения Скорости полёта 40 футов. Если, пока вы летите с помощью плаща, вы оказываетесь вне зоны Тусклого света или Темноты, или отпускаете край плаща, вы теряете эту Скорость полёта. Пока этот плащ на вас, и вы находитесь в зоне Тусклого света или Темноты, вы можете сотворить Превращение на себя, перевоплощаясь в Летучую мышь. В этом облике вы сохраняете ваши показатели Интеллекта, Мудрости и Харизмы. Плащ не может быть использован для сотворения этого заклинания снова до следующего рассвета."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.cloak",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.cloak",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.plasch_mnozhestva_stiley",
    "key": "plasch_mnozhestva_stiley",
    "type": "item",
    "templateId": "mygame.temp.cloak",
    "name": {
      "en": "Плащ множества стилей",
      "ru": "Плащ множества стилей"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот плащ, вы можете Бонусным действием изменить стиль, color и видимые качества этой одежды. Вес плаща при этом не меняется. Независимо от внешнего вида, плащ не может быть ничем, кроме плаща. Хотя он может копировать внешний вид других магических плащей, он не получает их магических свойств.",
        "ru": "Пока вы носите этот плащ, вы можете Бонусным действием изменить стиль, color и видимые качества этой одежды. Вес плаща при этом не меняется. Независимо от внешнего вида, плащ не может быть ничем, кроме плаща. Хотя он может копировать внешний вид других магических плащей, он не получает их магических свойств."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 100,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.cloak",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.cloak",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.common",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.plasch_nevidimosti",
    "key": "plasch_nevidimosti",
    "type": "item",
    "templateId": "mygame.temp.cloak",
    "name": {
      "en": "Плащ невидимости",
      "ru": "Плащ невидимости"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Этот плащ имеет 3 заряда и восстанавливает 1к3 потраченных зарядов на каждом рассвете. Пока вы носите плащ, вы можете действием Магия натянуть капюшон на голову и потратить 1 заряд, получая состояние Невидимый на 1 час. Эффект заканчивается раньше, если вы снимете капюшон (действий не требуется) или перестанете носить плащ.",
        "ru": "Этот плащ имеет 3 заряда и восстанавливает 1к3 потраченных зарядов на каждом рассвете. Пока вы носите плащ, вы можете действием Магия натянуть капюшон на голову и потратить 1 заряд, получая состояние Невидимый на 1 час. Эффект заканчивается раньше, если вы снимете капюшон (действий не требуется) или перестанете носить плащ."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.cloak",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.cloak",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.legendary",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_charges": 3,
      "wsg.ref.parameter.resources": {
        "key": "plasch_nevidimosti_charges",
        "name": {
          "en": "Charges",
          "ru": "Заряды"
        },
        "maximum": {
          "kind": "number",
          "number": 3
        },
        "initial": "maximum",
        "minimum": 0,
        "recovery": [
          {
            "event": "dawn",
            "amount": {
              "kind": "die_roll",
              "dieId": "wsg.atomic.d3",
              "diceCount": 1
            }
          }
        ]
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.plasch_pauka",
    "key": "plasch_pauka",
    "type": "item",
    "templateId": "mygame.temp.cloak",
    "name": {
      "en": "Плащ паука",
      "ru": "Плащ паука"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Эта изысканная одежда изготовлена из чёрной шелка и украшена тонкими серебристыми нитями. Пока вы её носите, вы получаете следующие преимущества. Сопротивление яду. Вы обладаете Сопротивлением урону Ядом. Паучье лазанье. Вы обладаете Скоростью лазания, равной вашей Скорости, и вы можете перемещаться по вертикальным поверхностям и по потолкам, не используя руки. Ходьба по паутине. Вас нельзя поймать в паутину любого вида, и вы можете двигаться по паутине, как по Труднопроходимой местности. Паутина. Вы можете сотворить заклинание Паутина (Сл спасброска 13). Паутина, созданная этим заклинанием, занимает вдвое большую площадь, чем обычно. После использования это свойство нельзя применить снова до следующего рассвета.",
        "ru": "Эта изысканная одежда изготовлена из чёрной шелка и украшена тонкими серебристыми нитями. Пока вы её носите, вы получаете следующие преимущества. Сопротивление яду. Вы обладаете Сопротивлением урону Ядом. Паучье лазанье. Вы обладаете Скоростью лазания, равной вашей Скорости, и вы можете перемещаться по вертикальным поверхностям и по потолкам, не используя руки. Ходьба по паутине. Вас нельзя поймать в паутину любого вида, и вы можете двигаться по паутине, как по Труднопроходимой местности. Паутина. Вы можете сотворить заклинание Паутина (Сл спасброска 13). Паутина, созданная этим заклинанием, занимает вдвое большую площадь, чем обычно. После использования это свойство нельзя применить снова до следующего рассвета."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.cloak",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.cloak",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.plasch_skata",
    "key": "plasch_skata",
    "type": "item",
    "templateId": "mygame.temp.cloak",
    "name": {
      "en": "Плащ ската",
      "ru": "Плащ ската"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот плащ, вы можете дышать под водой и обладаете Скоростью плавания 60 футов.",
        "ru": "Пока вы носите этот плащ, вы можете дышать под водой и обладаете Скоростью плавания 60 футов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.cloak",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.cloak",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.plasch_uskolzaniya",
    "key": "plasch_uskolzaniya",
    "type": "item",
    "templateId": "mygame.temp.cloak",
    "name": {
      "en": "Плащ ускользания",
      "ru": "Плащ ускользания"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот плащ, он магическим образом создаёт иллюзию, что вы стоите чуть поодаль вашего настоящего местоположения: существа совершают с Помехой броски атаки по вам. Если вы получаете урон, эта особенность не имеет эффекта до начала вашего следующего хода. Эта особенность подавляется, пока ваша Скорость равна 0.",
        "ru": "Пока вы носите этот плащ, он магическим образом создаёт иллюзию, что вы стоите чуть поодаль вашего настоящего местоположения: существа совершают с Помехой броски атаки по вам. Если вы получаете урон, эта особенность не имеет эффекта до начала вашего следующего хода. Эта особенность подавляется, пока ваша Скорость равна 0."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.cloak",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.cloak",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.plasch_sharlatana",
    "key": "plasch_sharlatana",
    "type": "item",
    "templateId": "mygame.temp.cloak",
    "name": {
      "en": "Плащ шарлатана",
      "ru": "Плащ шарлатана"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Этот плащ слабо пахнет серой. Пока вы носите его, вы можете действием Магия сотворить Переносящую дверь; эта особенность не может быть использована снова до следующего рассвета. Когда вы телепортируетесь с помощью этого заклинания, вы оставляете за собой облако дыма; оставленное вами пространство Слабо заслонено этим дымом до конца вашего следующего хода.",
        "ru": "Этот плащ слабо пахнет серой. Пока вы носите его, вы можете действием Магия сотворить Переносящую дверь; эта особенность не может быть использована снова до следующего рассвета. Когда вы телепортируетесь с помощью этого заклинания, вы оставляете за собой облако дыма; оставленное вами пространство Слабо заслонено этим дымом до конца вашего следующего хода."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.cloak",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.cloak",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.razvevayuschiysya_plasch",
    "key": "razvevayuschiysya_plasch",
    "type": "item",
    "templateId": "mygame.temp.cloak",
    "name": {
      "en": "Развевающийся плащ",
      "ru": "Развевающийся плащ"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот плащ, вы можете Бонусным действием заставить его драматически развеваться в течение 1 минуты.",
        "ru": "Пока вы носите этот плащ, вы можете Бонусным действием заставить его драматически развеваться в течение 1 минуты."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 100,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.cloak",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.cloak",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.common",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.elfiyskiy_plasch",
    "key": "elfiyskiy_plasch",
    "type": "item",
    "templateId": "mygame.temp.cloak",
    "name": {
      "en": "Эльфийский плащ",
      "ru": "Эльфийский плащ"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот плащ, проверки Мудрости (Восприятие), направленные на восприятие вас, совершаются с Помехой, и вы совершаете с Преимуществом проверки Ловкости (Скрытность).",
        "ru": "Пока вы носите этот плащ, проверки Мудрости (Восприятие), направленные на восприятие вас, совершаются с Помехой, и вы совершаете с Преимуществом проверки Ловкости (Скрытность)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.cloak",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.cloak",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.amulet_zaschity_ot_obnaruzheniya_i_poiska",
    "key": "amulet_zaschity_ot_obnaruzheniya_i_poiska",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Амулет защиты от обнаружения и поиска",
      "ru": "Амулет защиты от обнаружения и поиска"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот амулет, вас нельзя выбрать целью заклинаний Прорицания или воспринять через магические сенсоры ясновидения, если вы сами этого не позволите.",
        "ru": "Пока вы носите этот амулет, вас нельзя выбрать целью заклинаний Прорицания или воспринять через магические сенсоры ясновидения, если вы сами этого не позволите."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.amulet_zdorovya",
    "key": "amulet_zdorovya",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Амулет здоровья",
      "ru": "Амулет здоровья"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот амулет, ваше значение Телосложения равно 19. Амулет не оказывает эффекта, если ваше значение Телосложения без него уже равно 19 или выше.",
        "ru": "Пока вы носите этот амулет, ваше значение Телосложения равно 19. Амулет не оказывает эффекта, если ваше значение Телосложения без него уже равно 19 или выше."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.amulet_planov",
    "key": "amulet_planov",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Амулет планов",
      "ru": "Амулет планов"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот амулет, вы можете действием Магия назвать хорошо вам известное местоположение на другом плане бытия; совершите проверку Интеллекта (Тайная магия) Сл 15. В случае успеха вы сотворяете заклинание Планарный переход. При провале вы и каждое существо и объект в пределах 15 футов от вас перемещаетесь в случайное местоположение, определяемое броском 1к100 по таблице планов (Внутренние, Внешние или Астральный планы).",
        "ru": "Пока вы носите этот амулет, вы можете действием Магия назвать хорошо вам известное местоположение на другом плане бытия; совершите проверку Интеллекта (Тайная магия) Сл 15. В случае успеха вы сотворяете заклинание Планарный переход. При провале вы и каждое существо и объект в пределах 15 футов от вас перемещаетесь в случайное местоположение, определяемое броском 1к100 по таблице планов (Внутренние, Внешние или Астральный планы)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.3,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.amulet_tyomnogo_oskolka",
    "key": "amulet_tyomnogo_oskolka",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Амулет тёмного осколка",
      "ru": "Амулет тёмного осколка"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Этот амулет изготовлен из осколка прочного материала, происходящего из иного мира. Пока вы носите амулет, вы получаете следующие преимущества: Заклинательная фокусировка. Вы можете использовать амулет как Заклинательную фокусировку для ваших заклинаний Колдуна. Неизвестный заговор. Действием Магия вы можете попытаться сотворить заговор, который вы не знаете. Это должен быть заговор из списка заклинаний Колдуна со временем сотворения в действие. При этом вы совершаете проверку Интеллекта (Магия) Сл 10. При успехе вы сотворяете этот заговор; при провале заклинание проваливается, а действие, использованное для его сотворения, тратится впустую. В любом случае вы не можете использовать это свойство снова, пока не завершите Долгий отдых.",
        "ru": "Этот амулет изготовлен из осколка прочного материала, происходящего из иного мира. Пока вы носите амулет, вы получаете следующие преимущества: Заклинательная фокусировка. Вы можете использовать амулет как Заклинательную фокусировку для ваших заклинаний Колдуна. Неизвестный заговор. Действием Магия вы можете попытаться сотворить заговор, который вы не знаете. Это должен быть заговор из списка заклинаний Колдуна со временем сотворения в действие. При этом вы совершаете проверку Интеллекта (Магия) Сл 10. При успехе вы сотворяете этот заговор; при провале заклинание проваливается, а действие, использованное для его сотворения, тратится впустую. В любом случае вы не можете использовать это свойство снова, пока не завершите Долгий отдых."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 100,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.common",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.apparat_kvalisha",
    "key": "apparat_kvalisha",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Аппарат Квалиша",
      "ru": "Аппарат Квалиша"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Этот предмет поначалу выглядит как запечатанный железный бочонок весом 500 фунтов. Скрытая защёлка обнаруживается проверкой Интеллекта (Расследование) Сл 20. Люк позволяет двум существам Среднего размера или меньше залезть внутрь. На дальнем конце установлено десять рычагов управления. Аппарат Квалиша — это Большой объект со следующими характеристиками: Класс Защиты 20; Хиты 200; Скорость 30 футов, Скорость плавания 30 футов; Иммунитет к урону Ядом и Психическому урону. Отсек герметичен, воздуха на 10 часов. Аппарат плавает и может погружаться до 900 футов.",
        "ru": "Этот предмет поначалу выглядит как запечатанный железный бочонок весом 500 фунтов. Скрытая защёлка обнаруживается проверкой Интеллекта (Расследование) Сл 20. Люк позволяет двум существам Среднего размера или меньше залезть внутрь. На дальнем конце установлено десять рычагов управления. Аппарат Квалиша — это Большой объект со следующими характеристиками: Класс Защиты 20; Хиты 200; Скорость 30 футов, Скорость плавания 30 футов; Иммунитет к урону Ядом и Психическому урону. Отсек герметичен, воздуха на 10 часов. Аппарат плавает и может погружаться до 900 футов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 500.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.legendary",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.brosh_zaschity",
    "key": "brosh_zaschity",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Брошь защиты",
      "ru": "Брошь защиты"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите эту брошь, вы обладаете Сопротивлением Силовому урону и Иммунитетом к урону заклинания Волшебные стрелы.",
        "ru": "Пока вы носите эту брошь, вы обладаете Сопротивлением Силовому урону и Иммунитетом к урону заклинания Волшебные стрелы."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kamen_ayun_bolshoe_pogloschenie",
    "key": "kamen_ayun_bolshoe_pogloschenie",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Камень Айун (большое поглощение)",
      "ru": "Камень Айун (большое поглощение)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Камни Айун названы по имени богини знаний и пророчеств Айун. Вы можете действием Магия подбросить Камень Айун в воздух, и он начнёт летать вокруг вашей головы. Пока этот эллипсоид с зелёными и лавандовыми прожилками вращается вокруг вашей головы, вы можете Реакцией отменить заклинание 8-го уровня или ниже, сотворённое видимым вами существом. Отменённое заклинание не имеет эффекта, а все ресурсы, использованные для его сотворения, утрачиваются. Как только камень отменит суммарно 20 уровней заклинаний, он выгорает.",
        "ru": "Камни Айун названы по имени богини знаний и пророчеств Айун. Вы можете действием Магия подбросить Камень Айун в воздух, и он начнёт летать вокруг вашей головы. Пока этот эллипсоид с зелёными и лавандовыми прожилками вращается вокруг вашей головы, вы можете Реакцией отменить заклинание 8-го уровня или ниже, сотворённое видимым вами существом. Отменённое заклинание не имеет эффекта, а все ресурсы, использованные для его сотворения, утрачиваются. Как только камень отменит суммарно 20 уровней заклинаний, он выгорает."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.legendary",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kamen_ayun_zaschita",
    "key": "kamen_ayun_zaschita",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Камень Айун (защита)",
      "ru": "Камень Айун (защита)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока эта серо-розовая призма вращается вокруг вашей головы, вы обладаете бонусом +1 к КЗ.",
        "ru": "Пока эта серо-розовая призма вращается вокруг вашей головы, вы обладаете бонусом +1 к КЗ."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kamen_ayun_iskusnost",
    "key": "kamen_ayun_iskusnost",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Камень Айун (искусность)",
      "ru": "Камень Айун (искусность)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока эта бледно-зелёная призма вращается вокруг вашей головы, ваш Бонус владения увеличивается на 1.",
        "ru": "Пока эта бледно-зелёная призма вращается вокруг вашей головы, ваш Бонус владения увеличивается на 1."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.legendary",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kamen_ayun_liderstvo",
    "key": "kamen_ayun_liderstvo",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Камень Айун (лидерство)",
      "ru": "Камень Айун (лидерство)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока эта сфера с розовыми и зелёными прожилками вращается вокруг вашей головы, ваше значение Харизмы увеличивается на 2, но не выше 20.",
        "ru": "Пока эта сфера с розовыми и зелёными прожилками вращается вокруг вашей головы, ваше значение Харизмы увеличивается на 2, но не выше 20."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kamen_ayun_osvedomlyonnost",
    "key": "kamen_ayun_osvedomlyonnost",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Камень Айун (осведомлённость)",
      "ru": "Камень Айун (осведомлённость)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока этот тёмно-синий ромбоид вращается вокруг вашей головы, вы совершаете с Преимуществом броски Инициативы и проверки Мудрости (Восприятие).",
        "ru": "Пока этот тёмно-синий ромбоид вращается вокруг вашей головы, вы совершаете с Преимуществом броски Инициативы и проверки Мудрости (Восприятие)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kamen_ayun_pitanie",
    "key": "kamen_ayun_pitanie",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Камень Айун (питание)",
      "ru": "Камень Айун (питание)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока этот прозрачный веретенообразный камень вращается вокруг вашей головы, вам не нужно ни есть, ни пить.",
        "ru": "Пока этот прозрачный веретенообразный камень вращается вокруг вашей головы, вам не нужно ни есть, ни пить."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kamen_ayun_pogloschenie",
    "key": "kamen_ayun_pogloschenie",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Камень Айун (поглощение)",
      "ru": "Камень Айун (поглощение)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока этот бледно-лавандовый эллипсоид вращается вокруг вашей головы, вы можете Реакцией отменить заклинание 4-го уровня или ниже, сотворённое видимым вами существом. Отменённое заклинание не имеет эффекта, а все ресурсы, использованные для его сотворения, утрачиваются. Как только камень отменит суммарно 20 уровней заклинаний, он выгорает и становится тускло-серым, потеряв всю магию.",
        "ru": "Пока этот бледно-лавандовый эллипсоид вращается вокруг вашей головы, вы можете Реакцией отменить заклинание 4-го уровня или ниже, сотворённое видимым вами существом. Отменённое заклинание не имеет эффекта, а все ресурсы, использованные для его сотворения, утрачиваются. Как только камень отменит суммарно 20 уровней заклинаний, он выгорает и становится тускло-серым, потеряв всю магию."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kamen_ayun_provorstvo",
    "key": "kamen_ayun_provorstvo",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Камень Айун (проворство)",
      "ru": "Камень Айун (проворство)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока эта тёмно-красная сфера вращается вокруг вашей головы, ваше значение Ловкости увеличивается на 2, но не выше 20.",
        "ru": "Пока эта тёмно-красная сфера вращается вокруг вашей головы, ваше значение Ловкости увеличивается на 2, но не выше 20."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kamen_ayun_pronitsatelnost",
    "key": "kamen_ayun_pronitsatelnost",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Камень Айун (проницательность)",
      "ru": "Камень Айун (проницательность)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока эта ярко-синяя сфера вращается вокруг вашей головы, ваше значение Мудрости увеличивается на 2, но не выше 20.",
        "ru": "Пока эта ярко-синяя сфера вращается вокруг вашей головы, ваше значение Мудрости увеличивается на 2, но не выше 20."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kamen_ayun_rassudok",
    "key": "kamen_ayun_rassudok",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Камень Айун (рассудок)",
      "ru": "Камень Айун (рассудок)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока эта сфера с алыми и синими прожилками вращается вокруг вашей головы, ваше значение Интеллекта увеличивается на 2, но не выше 20.",
        "ru": "Пока эта сфера с алыми и синими прожилками вращается вокруг вашей головы, ваше значение Интеллекта увеличивается на 2, но не выше 20."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kamen_ayun_regeneratsiya",
    "key": "kamen_ayun_regeneratsiya",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Камень Айун (регенерация)",
      "ru": "Камень Айун (регенерация)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Вы восстанавливаете 15 Хитов в конце каждого часа, в течение которого этот жемчужно-белый веретенообразный камень вращается вокруг вашей головы, при условии, что у вас есть как минимум 1 Хит.",
        "ru": "Вы восстанавливаете 15 Хитов в конце каждого часа, в течение которого этот жемчужно-белый веретенообразный камень вращается вокруг вашей головы, при условии, что у вас есть как минимум 1 Хит."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.legendary",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kamen_ayun_rezerv",
    "key": "kamen_ayun_rezerv",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Камень Айун (резерв)",
      "ru": "Камень Айун (резерв)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Эта ярко-фиолетовая призма хранит сотворенные в неё заклинания, пока вы не используете их. Этот камень может хранить до 4-х уровней заклинаний одновременно. Когда его находят, он содержит 1к4 - 1 уровней заклинаний на выбор Мастера. Любое существо может сотворить в камень заклинание с уровнем от 1-го до 4-го, если касается его при сотворении. Сотворённое из камня заклинание больше не хранится в нём, освобождая занимаемые уровни.",
        "ru": "Эта ярко-фиолетовая призма хранит сотворенные в неё заклинания, пока вы не используете их. Этот камень может хранить до 4-х уровней заклинаний одновременно. Когда его находят, он содержит 1к4 - 1 уровней заклинаний на выбор Мастера. Любое существо может сотворить в камень заклинание с уровнем от 1-го до 4-го, если касается его при сотворении. Сотворённое из камня заклинание больше не хранится в нём, освобождая занимаемые уровни."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kamen_ayun_sila",
    "key": "kamen_ayun_sila",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Камень Айун (сила)",
      "ru": "Камень Айун (сила)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока этот бледно-синий ромбоид вращается вокруг вашей головы, ваше значение Силы увеличивается на 2, но не выше 20.",
        "ru": "Пока этот бледно-синий ромбоид вращается вокруг вашей головы, ваше значение Силы увеличивается на 2, но не выше 20."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kamen_ayun_stoykost",
    "key": "kamen_ayun_stoykost",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Камень Айун (стойкость)",
      "ru": "Камень Айун (стойкость)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока этот розовый ромбоид вращается вокруг вашей головы, ваше значение Телосложения увеличивается на 2, но не выше 20.",
        "ru": "Пока этот розовый ромбоид вращается вокруг вашей головы, ваше значение Телосложения увеличивается на 2, но не выше 20."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kamen_udachi",
    "key": "kamen_udachi",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Камень удачи",
      "ru": "Камень удачи"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока этот полированный агат при вас, вы обладаете бонусом +1 к проверкам характеристик и спасброскам.",
        "ru": "Пока этот полированный агат при вас, вы обладаете бонусом +1 к проверкам характеристик и спасброскам."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.medalon_zatyagivayuschihsya_ran",
    "key": "medalon_zatyagivayuschihsya_ran",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Медальон затягивающихся ран",
      "ru": "Медальон затягивающихся ран"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот медальон, вы получаете следующие преимущества: Сохранение жизни. Каждый раз, когда вы совершаете спасбросок от Смерти, вы можете при результате броска «9» или ниже заменить результат на «10», обращая провал в успех. Усиление естественного лечения. Каждый раз, когда вы бросаете Кость хитов, чтобы восстановить Хиты, удвойте количество Хитов, которое она восстанавливает.",
        "ru": "Пока вы носите этот медальон, вы получаете следующие преимущества: Сохранение жизни. Каждый раз, когда вы совершаете спасбросок от Смерти, вы можете при результате броска «9» или ниже заменить результат на «10», обращая провал в успех. Усиление естественного лечения. Каждый раз, когда вы бросаете Кость хитов, чтобы восстановить Хиты, удвойте количество Хитов, которое она восстанавливает."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.medalon_zaschity_ot_yada",
    "key": "medalon_zaschity_ot_yada",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Медальон защиты от яда",
      "ru": "Медальон защиты от яда"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "На изящной серебряной цепочке находится подвеска с огранённым чёрным самоцветом. Пока вы носите этот медальон, вы обладаете Иммунитетом к состоянию Отравленный и урону Ядом.",
        "ru": "На изящной серебряной цепочке находится подвеска с огранённым чёрным самоцветом. Пока вы носите этот медальон, вы обладаете Иммунитетом к состоянию Отравленный и урону Ядом."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.medalon_zdorovya",
    "key": "medalon_zdorovya",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Медальон здоровья",
      "ru": "Медальон здоровья"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите этот амулет, вы можете действием Магия восстановить 2к4 + 2 Хитов. Как только это свойство использовано, его нельзя использовать снова до следующего рассвета. Кроме того, пока вы носите этот амулет, вы совершаете с Преимуществом спасброски на избежание или завершение состояния Отравленный.",
        "ru": "Пока вы носите этот амулет, вы можете действием Магия восстановить 2к4 + 2 Хитов. Как только это свойство использовано, его нельзя использовать снова до следующего рассвета. Кроме того, пока вы носите этот амулет, вы совершаете с Преимуществом спасброски на избежание или завершение состояния Отравленный."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.medalon_mysley",
    "key": "medalon_mysley",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Медальон мыслей",
      "ru": "Медальон мыслей"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Этот медальон имеет 5 зарядов. Пока вы носите его, вы можете потратить 1 заряд, чтобы сотворить с его помощью заклинание Обнаружение мыслей (Сл спасброска 13). Медальон восстанавливает 1к4 потраченных зарядов на каждом рассвете.",
        "ru": "Этот медальон имеет 5 зарядов. Пока вы носите его, вы можете потратить 1 заряд, чтобы сотворить с его помощью заклинание Обнаружение мыслей (Сл спасброска 13). Медальон восстанавливает 1к4 потраченных зарядов на каждом рассвете."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_charges": 5,
      "wsg.ref.parameter.resources": {
        "key": "medalon_mysley_charges",
        "name": {
          "en": "Charges",
          "ru": "Заряды"
        },
        "maximum": {
          "kind": "number",
          "number": 5
        },
        "initial": "maximum",
        "minimum": 0,
        "recovery": [
          {
            "event": "dawn",
            "amount": {
              "kind": "die_roll",
              "dieId": "wsg.atomic.d4",
              "diceCount": 1
            }
          }
        ]
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.mehanisticheskiy_amulet",
    "key": "mehanisticheskiy_amulet",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Механистический амулет",
      "ru": "Механистический амулет"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "В этом медном амулете находятся крошечные сцеплённые шестерёнки, приводимые в движение магией Механуса, плана механической предсказуемости. Из него доносятся слабое тиканье и жужжание. Когда вы совершаете бросок атаки, пока носите этот амулет, вы можете не бросать к20, а считать, что на кости выпало «10». Как только это свойство использовано, его нельзя использовать снова до следующего рассвета.",
        "ru": "В этом медном амулете находятся крошечные сцеплённые шестерёнки, приводимые в движение магией Механуса, плана механической предсказуемости. Из него доносятся слабое тиканье и жужжание. Когда вы совершаете бросок атаки, пока носите этот амулет, вы можете не бросать к20, а считать, что на кости выпало «10». Как только это свойство использовано, его нельзя использовать снова до следующего рассвета."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 100,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.common",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.ozherele_adaptatsii",
    "key": "ozherele_adaptatsii",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Ожерелье адаптации",
      "ru": "Ожерелье адаптации"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите это ожерелье, вы можете нормально дышать в любой среде, а также совершаете с Преимуществом спасброски на избежание и окончание состояния Отравленный.",
        "ru": "Пока вы носите это ожерелье, вы можете нормально дышать в любой среде, а также совершаете с Преимуществом спасброски на избежание и окончание состояния Отравленный."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.ozherele_molitvennyh_chyotok",
    "key": "ozherele_molitvennyh_chyotok",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Ожерелье молитвенных чёток",
      "ru": "Ожерелье молитвенных чёток"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "На этом ожерелье находится 1к4+2 магических бусин (топаз, аквамарин или чёрный жемчуг). В каждой бусине хранится заклинание, и вы можете сотворить его Бонусным действием: Бусина благословения (Благословение), Бусина кары (Сияющая кара), Бусина лечения (Лечение ран 2-го уровня), Бусина оберега (Высшее восстановление), Бусина призыва (Страж веры), Бусина хождения по ветру (Хождение по ветру). Каждую бусину нельзя использовать снова до следующего рассвета.",
        "ru": "На этом ожерелье находится 1к4+2 магических бусин (топаз, аквамарин или чёрный жемчуг). В каждой бусине хранится заклинание, и вы можете сотворить его Бонусным действием: Бусина благословения (Благословение), Бусина кары (Сияющая кара), Бусина лечения (Лечение ран 2-го уровня), Бусина оберега (Высшее восстановление), Бусина призыва (Страж веры), Бусина хождения по ветру (Хождение по ветру). Каждую бусину нельзя использовать снова до следующего рассвета."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.ozherele_ognennyh_sharov",
    "key": "ozherele_ognennyh_sharov",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Ожерелье огненных шаров",
      "ru": "Ожерелье огненных шаров"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "На этом ожерелье висит 1к6 + 3 бусин. Действием Магия вы можете отсоединить бусину и бросить её на расстояние вплоть до 60 футов; когда бусина достигает конца траектории, она взрывается, как Огненный шар 3-го уровня (Сл спасброска 15). Вы можете бросить сразу несколько бусин или даже всё ожерелье целиком. В таком случае урон Огненного шара увеличивается на 1к6 за каждую бусину после первой (вплоть до максимального урона 12к6).",
        "ru": "На этом ожерелье висит 1к6 + 3 бусин. Действием Магия вы можете отсоединить бусину и бросить её на расстояние вплоть до 60 футов; когда бусина достигает конца траектории, она взрывается, как Огненный шар 3-го уровня (Сл спасброска 15). Вы можете бросить сразу несколько бусин или даже всё ожерелье целиком. В таком случае урон Огненного шара увеличивается на 1к6 за каждую бусину после первой (вплоть до максимального урона 12к6)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.4,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.talisman_sfery",
    "key": "talisman_sfery",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Талисман сферы",
      "ru": "Талисман сферы"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы держите этот талисман или носите его, вы совершаете с Преимуществом проверки Интеллект (Магия) для управления Сферой аннигиляции. Кроме того, когда вы начинаете ваш ход, управляя Сферой аннигиляции, вы можете действием Магия переместить её на расстояние не большее, чем число футов, равное 10 плюс ваш модификатор Интеллекта, умноженный на 10. Это перемещение не обязательно должно быть прямолинейным.",
        "ru": "Пока вы держите этот талисман или носите его, вы совершаете с Преимуществом проверки Интеллект (Магия) для управления Сферой аннигиляции. Кроме того, когда вы начинаете ваш ход, управляя Сферой аннигиляции, вы можете действием Магия переместить её на расстояние не большее, чем число футов, равное 10 плюс ваш модификатор Интеллекта, умноженный на 10. Это перемещение не обязательно должно быть прямолинейным."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.legendary",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.talisman_chistogo_dobra",
    "key": "talisman_chistogo_dobra",
    "type": "item",
    "templateId": "mygame.temp.amulet",
    "name": {
      "en": "Талисман чистого добра",
      "ru": "Талисман чистого добра"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Этот талисман — могущественный символ добра. Исчадие или Нежить получает 8к6 урона Излучением, коснувшись талисмана, и получает этот урон снова каждый раз, когда заканчивает свой ход держа или неся его. Священный символ: +2 к броскам атаки заклинаниями. Священный укор: имеет 7 зарядов. Действием Магия можно потратить 1 заряд, чтобы существо на земле в пределах 120 футов прошло спасбросок Ловкости Сл 20 (Исчадия/Нежить с Помехой), при провале оно падает в трещину и уничтожается.",
        "ru": "Этот талисман — могущественный символ добра. Исчадие или Нежить получает 8к6 урона Излучением, коснувшись талисмана, и получает этот урон снова каждый раз, когда заканчивает свой ход держа или неся его. Священный символ: +2 к броскам атаки заклинаниями. Священный укор: имеет 7 зарядов. Действием Магия можно потратить 1 заряд, чтобы существо на земле в пределах 120 футов прошло спасбросок Ловкости Сл 20 (Исчадия/Нежить с Помехой), при провале оно падает в трещину и уничтожается."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.3,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.amulet",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.neck",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.legendary",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_charges": 7,
      "wsg.ref.parameter.resources": {
        "key": "talisman_chistogo_dobra_charges",
        "name": {
          "en": "Charges",
          "ru": "Заряды"
        },
        "maximum": {
          "kind": "number",
          "number": 7
        },
        "initial": "maximum",
        "minimum": 0,
        "recovery": []
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_barana",
    "key": "koltso_barana",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо барана",
      "ru": "Кольцо барана"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Это кольцо имеет 3 заряда и восстанавливает 1к3 потраченных зарядов на каждом рассвете. Пока вы носите это кольцо, можете действием Магия потратить от 1 до 3 зарядов и совершить дальнобойную атаку заклинанием по одному видимому вами в пределах 60 футов от вас существу. Кольцо создаёт призрачную голову барана и совершает бросок атаки с бонусом +7; при попадании цель за каждый потраченный заряд получает 2к10 Силового урона и отталкивается от вас на 5 футов. Вы можете также действием Магия потратить от 1 до 3 зарядов и попытаться разрушить видимый вами в пределах 60 футов от вас немагический объект, который никто не несёт и не носит. Кольцо совершает проверку Силы с бонусом +5 за каждый потраченный заряд.",
        "ru": "Это кольцо имеет 3 заряда и восстанавливает 1к3 потраченных зарядов на каждом рассвете. Пока вы носите это кольцо, можете действием Магия потратить от 1 до 3 зарядов и совершить дальнобойную атаку заклинанием по одному видимому вами в пределах 60 футов от вас существу. Кольцо создаёт призрачную голову барана и совершает бросок атаки с бонусом +7; при попадании цель за каждый потраченный заряд получает 2к10 Силового урона и отталкивается от вас на 5 футов. Вы можете также действием Магия потратить от 1 до 3 зарядов и попытаться разрушить видимый вами в пределах 60 футов от вас немагический объект, который никто не несёт и не носит. Кольцо совершает проверку Силы с бонусом +5 за каждый потраченный заряд."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_charges": 3,
      "wsg.ref.parameter.resources": {
        "key": "koltso_barana_charges",
        "name": {
          "en": "Charges",
          "ru": "Заряды"
        },
        "maximum": {
          "kind": "number",
          "number": 3
        },
        "initial": "maximum",
        "minimum": 0,
        "recovery": [
          {
            "event": "dawn",
            "amount": {
              "kind": "die_roll",
              "dieId": "wsg.atomic.d3",
              "diceCount": 1
            }
          }
        ]
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_vliyaniya_na_zhivotnyh",
    "key": "koltso_vliyaniya_na_zhivotnyh",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо влияния на животных",
      "ru": "Кольцо влияния на животных"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Это кольцо имеет 3 заряда и восстанавливает 1к3 потраченных зарядов на каждом рассвете. Пока вы носите это кольцо, вы можете потратить 1 заряд, чтобы сотворить с его помощью одно из следующих заклинаний (Сл спасброска 13): Дружба с животными, Разговор с животными, Ужас (воздействует только на Зверей).",
        "ru": "Это кольцо имеет 3 заряда и восстанавливает 1к3 потраченных зарядов на каждом рассвете. Пока вы носите это кольцо, вы можете потратить 1 заряд, чтобы сотворить с его помощью одно из следующих заклинаний (Сл спасброска 13): Дружба с животными, Разговор с животными, Ужас (воздействует только на Зверей)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_charges": 3,
      "wsg.ref.parameter.resources": {
        "key": "koltso_vliyaniya_na_zhivotnyh_charges",
        "name": {
          "en": "Charges",
          "ru": "Заряды"
        },
        "maximum": {
          "kind": "number",
          "number": 3
        },
        "initial": "maximum",
        "minimum": 0,
        "recovery": [
          {
            "event": "dawn",
            "amount": {
              "kind": "die_roll",
              "dieId": "wsg.atomic.d3",
              "diceCount": 1
            }
          }
        ]
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_zaschity",
    "key": "koltso_zaschity",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо защиты",
      "ru": "Кольцо защиты"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите это кольцо, вы получаете бонус +1 к Классу Защиты и спасброскам.",
        "ru": "Пока вы носите это кольцо, вы получаете бонус +1 к Классу Защиты и спасброскам."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_zaschity_razuma",
    "key": "koltso_zaschity_razuma",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо защиты разума",
      "ru": "Кольцо защиты разума"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите это кольцо, вы невосприимчивы к магии, позволяющей другим существам читать ваши мысли, определять ваше мировоззрение, тип существа или лжёте ли вы. Существа могут телепатически общаться с вами, только если вы дозволяете это. Вы можете действием Магия сделать так, что это кольцо нельзя будет заметить (зрением, наощупь и т.д.) до тех пор, пока вы действием Магия не отмените этот эффект, пока не снимете кольцо или не умрёте. Если вы умираете, пока носите это кольцо, и в этом кольце нет души, ваша душа входит в него. Вы можете как остаться в кольце, так и покинуть его, отправляясь в посмертие. Пока ваша душа находится в кольце, вы можете телепатически общаться с носящим его существом; при этом оно не может блокировать это общение.",
        "ru": "Пока вы носите это кольцо, вы невосприимчивы к магии, позволяющей другим существам читать ваши мысли, определять ваше мировоззрение, тип существа или лжёте ли вы. Существа могут телепатически общаться с вами, только если вы дозволяете это. Вы можете действием Магия сделать так, что это кольцо нельзя будет заметить (зрением, наощупь и т.д.) до тех пор, пока вы действием Магия не отмените этот эффект, пока не снимете кольцо или не умрёте. Если вы умираете, пока носите это кольцо, и в этом кольце нет души, ваша душа входит в него. Вы можете как остаться в кольце, так и покинуть его, отправляясь в посмертие. Пока ваша душа находится в кольце, вы можете телепатически общаться с носящим его существом; при этом оно не может блокировать это общение."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_komandovaniya_elementalyami_voda",
    "key": "koltso_komandovaniya_elementalyami_voda",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо командования элементалями (вода)",
      "ru": "Кольцо командования элементалями (вода)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Это Кольцо командования элементалями связано со Стихийным планом Воды. Гроза Элементалей. Пока вы носите это кольцо, вы совершаете с Преимуществом броски атаки по Элементалям, а они совершают с Помехой броски атаки по вам. Принуждение Элементаля. Пока вы носите кольцо, можете действием Магия попытаться взять под контроль видимого вами в пределах 60 футов от вас Элементаля. Этот Элементаль совершает спасбросок Мудрости Сл 18; при провале он получает состояние Очарованный до начала вашего следующего хода, и вы решаете, как он распорядится своим перемещением и действием в свой следующий ход. Стихийная настройка. Пока вы носите это кольцо, вызнаете Акван, обладаете Скоростью плавания 60 футов и можете дышать под водой. Сотворение заклинаний. Кольцо имеет 5 зарядов и восстанавливает 1к4 + 1 потраченных зарядов на каждом рассвете. Пока вы носите это кольцо, можете сотворить с его помощью заклинание; выберите заклинание из следующего списка: Град (2 заряда), Ледяная стена (3 заряда), Сотворение или уничтожение воды (1 заряд), Хождение по воде (2 заряда), Цунами (5 зарядов). Вы должны потратить соответствующее количество зарядов, чтобы сотворить это; Сл спасброска заклинаний равна 18.",
        "ru": "Это Кольцо командования элементалями связано со Стихийным планом Воды. Гроза Элементалей. Пока вы носите это кольцо, вы совершаете с Преимуществом броски атаки по Элементалям, а они совершают с Помехой броски атаки по вам. Принуждение Элементаля. Пока вы носите кольцо, можете действием Магия попытаться взять под контроль видимого вами в пределах 60 футов от вас Элементаля. Этот Элементаль совершает спасбросок Мудрости Сл 18; при провале он получает состояние Очарованный до начала вашего следующего хода, и вы решаете, как он распорядится своим перемещением и действием в свой следующий ход. Стихийная настройка. Пока вы носите это кольцо, вызнаете Акван, обладаете Скоростью плавания 60 футов и можете дышать под водой. Сотворение заклинаний. Кольцо имеет 5 зарядов и восстанавливает 1к4 + 1 потраченных зарядов на каждом рассвете. Пока вы носите это кольцо, можете сотворить с его помощью заклинание; выберите заклинание из следующего списка: Град (2 заряда), Ледяная стена (3 заряда), Сотворение или уничтожение воды (1 заряд), Хождение по воде (2 заряда), Цунами (5 зарядов). Вы должны потратить соответствующее количество зарядов, чтобы сотворить это; Сл спасброска заклинаний равна 18."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.legendary",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_charges": 5,
      "wsg.ref.parameter.resources": {
        "key": "koltso_komandovaniya_elementalyami_voda_charges",
        "name": {
          "en": "Charges",
          "ru": "Заряды"
        },
        "maximum": {
          "kind": "number",
          "number": 5
        },
        "initial": "maximum",
        "minimum": 0,
        "recovery": [
          {
            "event": "dawn",
            "amount": {
              "kind": "operation",
              "operation": "sum",
              "operands": [
                {
                  "kind": "die_roll",
                  "dieId": "wsg.atomic.d4",
                  "diceCount": 1
                },
                {
                  "kind": "number",
                  "number": 1
                }
              ],
              "rounding": "none"
            }
          }
        ]
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_komandovaniya_elementalyami_vozduh",
    "key": "koltso_komandovaniya_elementalyami_vozduh",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо командования элементалями (воздух)",
      "ru": "Кольцо командования элементалями (воздух)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Это Кольцо командования элементалями связано со Стихийным планом Воздуха. Гроза Элементалей. Пока вы носите это кольцо, вы совершаете с Преимуществом броски атаки по Элементалям, а они совершают с Помехой броски атаки по вам. Принуждение Элементаля. Пока вы носите кольцо, можете действием Магия попытаться взять под контроль видимого вами в пределах 60 футов от вас Элементаля. Этот Элементаль совершает спасбросок Мудрости Сл 18; при провале он получает состояние Очарованный до начала вашего следующего хода, и вы решаете, как он распорядится своим перемещением и действием в свой следующий ход. Стихийная настройка. Пока вы носите это кольцо, вы знаете Ауран и обладаете Сопротивлением урону Электричеством и Скоростью полёта, равной вашей Скорости (вы можете парить). Сотворение заклинаний. Кольцо имеет 5 зарядов и восстанавливает 1к4 + 1 потраченных зарядов на каждом рассвете. Пока вы носите это кольцо, можете сотворить с его помощью заклинание; выберите заклинание из следующего списка: Падение пёрышком (0 зарядов), Порыв ветра (2 заряда), Стена ветров (1 заряд), Цепная молния (3 заряда). Вы должны потратить соответствующее количество зарядов, чтобы сотворить это заклинание; Сл спасброска заклинаний равна 18.",
        "ru": "Это Кольцо командования элементалями связано со Стихийным планом Воздуха. Гроза Элементалей. Пока вы носите это кольцо, вы совершаете с Преимуществом броски атаки по Элементалям, а они совершают с Помехой броски атаки по вам. Принуждение Элементаля. Пока вы носите кольцо, можете действием Магия попытаться взять под контроль видимого вами в пределах 60 футов от вас Элементаля. Этот Элементаль совершает спасбросок Мудрости Сл 18; при провале он получает состояние Очарованный до начала вашего следующего хода, и вы решаете, как он распорядится своим перемещением и действием в свой следующий ход. Стихийная настройка. Пока вы носите это кольцо, вы знаете Ауран и обладаете Сопротивлением урону Электричеством и Скоростью полёта, равной вашей Скорости (вы можете парить). Сотворение заклинаний. Кольцо имеет 5 зарядов и восстанавливает 1к4 + 1 потраченных зарядов на каждом рассвете. Пока вы носите это кольцо, можете сотворить с его помощью заклинание; выберите заклинание из следующего списка: Падение пёрышком (0 зарядов), Порыв ветра (2 заряда), Стена ветров (1 заряд), Цепная молния (3 заряда). Вы должны потратить соответствующее количество зарядов, чтобы сотворить это заклинание; Сл спасброска заклинаний равна 18."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.legendary",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_charges": 5,
      "wsg.ref.parameter.resources": {
        "key": "koltso_komandovaniya_elementalyami_vozduh_charges",
        "name": {
          "en": "Charges",
          "ru": "Заряды"
        },
        "maximum": {
          "kind": "number",
          "number": 5
        },
        "initial": "maximum",
        "minimum": 0,
        "recovery": [
          {
            "event": "dawn",
            "amount": {
              "kind": "operation",
              "operation": "sum",
              "operands": [
                {
                  "kind": "die_roll",
                  "dieId": "wsg.atomic.d4",
                  "diceCount": 1
                },
                {
                  "kind": "number",
                  "number": 1
                }
              ],
              "rounding": "none"
            }
          }
        ]
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_komandovaniya_elementalyami_zemlya",
    "key": "koltso_komandovaniya_elementalyami_zemlya",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо командования элементалями (земля)",
      "ru": "Кольцо командования элементалями (земля)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Это Кольцо командования элементалями связано со Стихийным planом Земли. Гроза Элементалей. Пока вы носите это кольцо, вы совершаете с Преимуществом броски атаки по Элементалям, а они совершают с Помехой броски атаки по вам. Принуждение Элементаля. Пока вы носите кольцо, можете действием Магия попытаться взять под контроль видимого вами в пределах 60 футов от вас Элементаля. Этот Элементаль совершает спасбросок Мудрости Сл 18; при провале он получает состояние Очарованный до начала вашего следующего хода, и вы решаете, как он распорядится своим перемещением и действием в свой следующий ход. Стихийная настройка. Пока вы носите это кольцо, вы знаете Терран и обладаете Сопротивлением урону Кислотой. Когда вы перемещаетесь по грязи или камням, это не считается для вас Труднопроходимой местностью. Кроме того, вы можете перемещаться через твёрдую землю или камни, как если бы это была Труднопроходимая местность, не тревожа материю, через которую перемещаетесь. Если вы оканчиваете ход в твёрдой земле или камне, вас выталкивает в ближайшее незанятое пространство, через которое вы проходили. Сотворение заклинаний. Кольцо имеет 5 зарядов и восстанавливает 1к4 + 1 потраченных зарядов на каждом рассвете. Пока вы носите это кольцо, можете сотворить с его помощью заклинание; выберите заклинание из следующего списка: Землетрясение (5 зарядов), Изменение формы камня (2 заряда), Каменная кожа (3 заряда), Каменная стена (3 заряда). Вы должны потратить соответствующее количество зарядов, чтобы сотворить это заклинание; Сл спасброска заклинаний равна 18.",
        "ru": "Это Кольцо командования элементалями связано со Стихийным planом Земли. Гроза Элементалей. Пока вы носите это кольцо, вы совершаете с Преимуществом броски атаки по Элементалям, а они совершают с Помехой броски атаки по вам. Принуждение Элементаля. Пока вы носите кольцо, можете действием Магия попытаться взять под контроль видимого вами в пределах 60 футов от вас Элементаля. Этот Элементаль совершает спасбросок Мудрости Сл 18; при провале он получает состояние Очарованный до начала вашего следующего хода, и вы решаете, как он распорядится своим перемещением и действием в свой следующий ход. Стихийная настройка. Пока вы носите это кольцо, вы знаете Терран и обладаете Сопротивлением урону Кислотой. Когда вы перемещаетесь по грязи или камням, это не считается для вас Труднопроходимой местностью. Кроме того, вы можете перемещаться через твёрдую землю или камни, как если бы это была Труднопроходимая местность, не тревожа материю, через которую перемещаетесь. Если вы оканчиваете ход в твёрдой земле или камне, вас выталкивает в ближайшее незанятое пространство, через которое вы проходили. Сотворение заклинаний. Кольцо имеет 5 зарядов и восстанавливает 1к4 + 1 потраченных зарядов на каждом рассвете. Пока вы носите это кольцо, можете сотворить с его помощью заклинание; выберите заклинание из следующего списка: Землетрясение (5 зарядов), Изменение формы камня (2 заряда), Каменная кожа (3 заряда), Каменная стена (3 заряда). Вы должны потратить соответствующее количество зарядов, чтобы сотворить это заклинание; Сл спасброска заклинаний равна 18."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.legendary",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_charges": 5,
      "wsg.ref.parameter.resources": {
        "key": "koltso_komandovaniya_elementalyami_zemlya_charges",
        "name": {
          "en": "Charges",
          "ru": "Заряды"
        },
        "maximum": {
          "kind": "number",
          "number": 5
        },
        "initial": "maximum",
        "minimum": 0,
        "recovery": [
          {
            "event": "dawn",
            "amount": {
              "kind": "operation",
              "operation": "sum",
              "operands": [
                {
                  "kind": "die_roll",
                  "dieId": "wsg.atomic.d4",
                  "diceCount": 1
                },
                {
                  "kind": "number",
                  "number": 1
                }
              ],
              "rounding": "none"
            }
          }
        ]
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_komandovaniya_elementalyami_ogon",
    "key": "koltso_komandovaniya_elementalyami_ogon",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо командования элементалями (огонь)",
      "ru": "Кольцо командования элементалями (огонь)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Это Кольцо командования элементалями связано со Стихийным планом Огня. Гроза Элементалей. Пока вы носите это кольцо, вы совершаете с Преимуществом броски атаки по Элементалям, а они совершают с Помехой броски атаки по вам. Принуждение Элементаля. Пока вы носите кольцо, можете действием Магия попытаться взять под контроль видимого вами в пределах 60 футов от вас Элементаля. Этот Элементаль совершает спасбросок Мудрости Сл 18; при провале он получает состояние Очарованный до начала вашего следующего хода, и вы решаете, как он распорядится своим перемещением и действием в свой следующий ход. Стихийная настройка. Пока вы носите это кольцо, вы знаете Игнан и обладаете Иммунитетом к урону Огнём. Сотворение заклинаний. Кольцо имеет 5 зарядов и восстанавливает 1к4 + 1 потраченных зарядов на каждом рассвете. Пока вы носите это кольцо, можете сотворить с его помощью заклинание; выберите заклинание из следующего списка: Огненная буря (4 заряда), Огненная стена (3 заряда), Огненные ладони (1 заряд), Огненный шар (2 заряда). Вы должны потратить соответствующее количество зарядов, чтобы сотворить это заклинание; Сл спасброска заклинаний равна 18.",
        "ru": "Это Кольцо командования элементалями связано со Стихийным планом Огня. Гроза Элементалей. Пока вы носите это кольцо, вы совершаете с Преимуществом броски атаки по Элементалям, а они совершают с Помехой броски атаки по вам. Принуждение Элементаля. Пока вы носите кольцо, можете действием Магия попытаться взять под контроль видимого вами в пределах 60 футов от вас Элементаля. Этот Элементаль совершает спасбросок Мудрости Сл 18; при провале он получает состояние Очарованный до начала вашего следующего хода, и вы решаете, как он распорядится своим перемещением и действием в свой следующий ход. Стихийная настройка. Пока вы носите это кольцо, вы знаете Игнан и обладаете Иммунитетом к урону Огнём. Сотворение заклинаний. Кольцо имеет 5 зарядов и восстанавливает 1к4 + 1 потраченных зарядов на каждом рассвете. Пока вы носите это кольцо, можете сотворить с его помощью заклинание; выберите заклинание из следующего списка: Огненная буря (4 заряда), Огненная стена (3 заряда), Огненные ладони (1 заряд), Огненный шар (2 заряда). Вы должны потратить соответствующее количество зарядов, чтобы сотворить это заклинание; Сл спасброска заклинаний равна 18."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.legendary",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_charges": 5,
      "wsg.ref.parameter.resources": {
        "key": "koltso_komandovaniya_elementalyami_ogon_charges",
        "name": {
          "en": "Charges",
          "ru": "Заряды"
        },
        "maximum": {
          "kind": "number",
          "number": 5
        },
        "initial": "maximum",
        "minimum": 0,
        "recovery": [
          {
            "event": "dawn",
            "amount": {
              "kind": "operation",
              "operation": "sum",
              "operands": [
                {
                  "kind": "die_roll",
                  "dieId": "wsg.atomic.d4",
                  "diceCount": 1
                },
                {
                  "kind": "number",
                  "number": 1
                }
              ],
              "rounding": "none"
            }
          }
        ]
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_nevidimosti",
    "key": "koltso_nevidimosti",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо невидимости",
      "ru": "Кольцо невидимости"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите это кольцо, можете действием Магия получить состояние Невидимый. Вы остаётесь в этом состоянии до тех пор, пока кольцо не будет снято или пока Бонусным действием вы не станете вновь видимы.",
        "ru": "Пока вы носите это кольцо, можете действием Магия получить состояние Невидимый. Вы остаётесь в этом состоянии до тех пор, пока кольцо не будет снято или пока Бонусным действием вы не станете вновь видимы."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.legendary",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_otrazheniya_zaklinaniy",
    "key": "koltso_otrazheniya_zaklinaniy",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо отражения заклинаний",
      "ru": "Кольцо отражения заклинаний"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите это кольцо, вы совершаете с Преимуществом спасброски против заклинаний. Если вы преуспеваете в спасброске против заклинания 7-го уровня или ниже, это заклинание не оказывает на вас никакого эффекта; если это заклинание нацеливалось только на вас и не воздействовало на область, вы можете Реакцией отразить это заклинание обратно в заклинателя, и заклинатель должен совершить спасбросок против своей же Сл спасброска заклинаний.",
        "ru": "Пока вы носите это кольцо, вы совершаете с Преимуществом спасброски против заклинаний. Если вы преуспеваете в спасброске против заклинания 7-го уровня или ниже, это заклинание не оказывает на вас никакого эффекта; если это заклинание нацеливалось только на вас и не воздействовало на область, вы можете Реакцией отразить это заклинание обратно в заклинателя, и заклинатель должен совершить спасбросок против своей же Сл спасброска заклинаний."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.legendary",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_padayuschih_zvyozd",
    "key": "koltso_padayuschih_zvyozd",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо падающих звёзд",
      "ru": "Кольцо падающих звёзд"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Вы можете сотворять с помощью этого кольца Пляшущие огоньки и Свет. Кольцо имеет 6 зарядов и восстанавливает 1к6 потраченных зарядов на каждом рассвете. Вы можете тратить эти заряды, чтобы использовать следующие особенности. Огонь фей. Вы можете потратить 1 заряд, чтобы сотворить с помощью кольца Огонь фей. Падающие звёзды. Действием Магия вы можете потратить от 1 до 3 зарядов. За каждый потраченный заряд вы метаете сияющий сгусток света из кольца в видимую вами в пределах 60 футов от вас точку. Каждое существо в 15-футовом Кубе, исходящем из этой точки, осыпается искрами и совершает спасбросок Ловкости Сл 15, получая 5к4 урона Излучением при провале или половину этого урона при успехе. Сферы молний. Действием Магия вы можете потратить 2 заряда и создать вплоть до 4-х электрических сфер диаметром 3 фута. Каждая сфера появляется в видимом вами в пределах 120 футов от вас незанятом пространстве и существует, пока вы поддерживаете Концентрацию, вплоть до 1 минуту. Каждая сфера испускает Тусклый свет в радиусе 30 футов. Бонусным действием вы можете переместить каждую сферу на расстояние вплоть до 30 футов, но не дальше, чем 120 футов от вас. Как только сфера оказывается в пределах 5 футов от существа (кроме вас), не находящегося за Полным укрытием, сфера ударяет его электрическим разрядом и исчезает. Это существо совершает спасбросок Ловкости Сл 15, при провале получая урон Электричеством, зависящий от числа созданных сфер (1 сфера: 4к12; 2 сферы: 5к4; 3 сферы: 2к6; 4 сферы: 2к4), а при успехе только половину этого урона.",
        "ru": "Вы можете сотворять с помощью этого кольца Пляшущие огоньки и Свет. Кольцо имеет 6 зарядов и восстанавливает 1к6 потраченных зарядов на каждом рассвете. Вы можете тратить эти заряды, чтобы использовать следующие особенности. Огонь фей. Вы можете потратить 1 заряд, чтобы сотворить с помощью кольца Огонь фей. Падающие звёзды. Действием Магия вы можете потратить от 1 до 3 зарядов. За каждый потраченный заряд вы метаете сияющий сгусток света из кольца в видимую вами в пределах 60 футов от вас точку. Каждое существо в 15-футовом Кубе, исходящем из этой точки, осыпается искрами и совершает спасбросок Ловкости Сл 15, получая 5к4 урона Излучением при провале или половину этого урона при успехе. Сферы молний. Действием Магия вы можете потратить 2 заряда и создать вплоть до 4-х электрических сфер диаметром 3 фута. Каждая сфера появляется в видимом вами в пределах 120 футов от вас незанятом пространстве и существует, пока вы поддерживаете Концентрацию, вплоть до 1 минуту. Каждая сфера испускает Тусклый свет в радиусе 30 футов. Бонусным действием вы можете переместить каждую сферу на расстояние вплоть до 30 футов, но не дальше, чем 120 футов от вас. Как только сфера оказывается в пределах 5 футов от существа (кроме вас), не находящегося за Полным укрытием, сфера ударяет его электрическим разрядом и исчезает. Это существо совершает спасбросок Ловкости Сл 15, при провале получая урон Электричеством, зависящий от числа созданных сфер (1 сфера: 4к12; 2 сферы: 5к4; 3 сферы: 2к6; 4 сферы: 2к4), а при успехе только половину этого урона."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_charges": 6,
      "wsg.ref.parameter.resources": {
        "key": "koltso_padayuschih_zvyozd_charges",
        "name": {
          "en": "Charges",
          "ru": "Заряды"
        },
        "maximum": {
          "kind": "number",
          "number": 6
        },
        "initial": "maximum",
        "minimum": 0,
        "recovery": [
          {
            "event": "dawn",
            "amount": {
              "kind": "die_roll",
              "dieId": "wsg.atomic.d6",
              "diceCount": 1
            }
          }
        ]
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_padeniya_pyoryshkom",
    "key": "koltso_padeniya_pyoryshkom",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо падения пёрышком",
      "ru": "Кольцо падения пёрышком"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы падаете, пока носите это кольцо, вы опускаетесь со скоростью 60 футов в раунд и не получаете урона от падения.",
        "ru": "Когда вы падаете, пока носите это кольцо, вы опускаетесь со скоростью 60 футов в раунд и не получаете урона от падения."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_plavaniya",
    "key": "koltso_plavaniya",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо плавания",
      "ru": "Кольцо плавания"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите это кольцо, Вы обладаете Скоростью плавания 40 футов.",
        "ru": "Пока вы носите это кольцо, Вы обладаете Скоростью плавания 40 футов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_prizyva_dzhinna",
    "key": "koltso_prizyva_dzhinna",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо призыва джинна",
      "ru": "Кольцо призыва джинна"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите это кольцо, можете действием Магия вызвать конкретного Джинна со Стихийного плана Воздуха. Этот джинн появляется в незанятом пространстве, видимом вами в пределах 120 футов от вас, на ваш выбор. Он присутствует, пока вы поддерживаете Концентрацию, вплоть до 1 часа, или пока его Хиты не опустятся до 0. Пока джинн призван вами, он подчиняется вашим приказам и Дружелюбен вам и вашим союзникам. Если не вы отдаёте приказов, джинн защищает себя, но не предпринимает иных действий. Когда джинн возвращается, его нельзя вызвать снова в течение следующих 24 часов. Если джинн умирает, кольцо становится немагическим. Джинн зачастую сам создаёт Кольца призыва джинна, вызывающие его, и даёт их смертным, как дар другу или в знак уважения.",
        "ru": "Пока вы носите это кольцо, можете действием Магия вызвать конкретного Джинна со Стихийного плана Воздуха. Этот джинн появляется в незанятом пространстве, видимом вами в пределах 120 футов от вас, на ваш выбор. Он присутствует, пока вы поддерживаете Концентрацию, вплоть до 1 часа, или пока его Хиты не опустятся до 0. Пока джинн призван вами, он подчиняется вашим приказам и Дружелюбен вам и вашим союзникам. Если не вы отдаёте приказов, джинн защищает себя, но не предпринимает иных действий. Когда джинн возвращается, его нельзя вызвать снова в течение следующих 24 часов. Если джинн умирает, кольцо становится немагическим. Джинн зачастую сам создаёт Кольца призыва джинна, вызывающие его, и даёт их смертным, как дар другу или в знак уважения."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.legendary",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_pronikayuschego_zreniya",
    "key": "koltso_pronikayuschego_zreniya",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо проникающего зрения",
      "ru": "Кольцо проникающего зрения"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите это кольцо, вы можете действием Магия обрести проникающее зрение дальностью 30 футов на 1 минуту. Непрозрачные объекты в пределах дальности выглядят для вас прозрачными и не блокируют лучи света. Это зрение проникает сквозь 1 фут камня, 1 дюйм обычного металла или 3 фута дерева или земли; зрение не может проникнуть через бо́льшую толщину или тонкий слой свинца. Каждый раз, когда вы используете это кольцо до завершения Долгого отдыха после первого раза, вы должны преуспеть в спасброске Телосложения Сл 15, иначе получите 1 уровень Истощения.",
        "ru": "Пока вы носите это кольцо, вы можете действием Магия обрести проникающее зрение дальностью 30 футов на 1 минуту. Непрозрачные объекты в пределах дальности выглядят для вас прозрачными и не блокируют лучи света. Это зрение проникает сквозь 1 фут камня, 1 дюйм обычного металла или 3 фута дерева или земли; зрение не может проникнуть через бо́льшую толщину или тонкий слой свинца. Каждый раз, когда вы используете это кольцо до завершения Долгого отдыха после первого раза, вы должны преуспеть в спасброске Телосложения Сл 15, иначе получите 1 уровень Истощения."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_pryzhkov",
    "key": "koltso_pryzhkov",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо прыжков",
      "ru": "Кольцо прыжков"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите это кольцо, вы можете сотворять с его помощью Прыжок, нацеливаясь только на себя.",
        "ru": "Пока вы носите это кольцо, вы можете сотворять с его помощью Прыжок, нацеливаясь только на себя."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_regeneratsii",
    "key": "koltso_regeneratsii",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо регенерации",
      "ru": "Кольцо регенерации"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите это кольцо, вы каждые 10 минут восстанавливаете 1к6 Хитов, если у вас есть хотя бы 1 Хит. Если вы утрачиваете часть тела, кольцо отращивает её, полностью работоспособной, через 1к6 + 1 дней, если в течение всего этого времени у вас есть хотя бы 1 Хит.",
        "ru": "Пока вы носите это кольцо, вы каждые 10 минут восстанавливаете 1к6 Хитов, если у вас есть хотя бы 1 Хит. Если вы утрачиваете часть тела, кольцо отращивает её, полностью работоспособной, через 1к6 + 1 дней, если в течение всего этого времени у вас есть хотя бы 1 Хит."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_svobodnyh_deystviy",
    "key": "koltso_svobodnyh_deystviy",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо свободных действий",
      "ru": "Кольцо свободных действий"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите это кольцо, ваше перемещение по Труднопроходимой местности не затрачивает дополнительного перемещения. Кроме того, никакая магия не может уменьшить любую из ваших Скоростей или причинить вам состояния Опутанный или Парализованный.",
        "ru": "Пока вы носите это кольцо, ваше перемещение по Труднопроходимой местности не затрачивает дополнительного перемещения. Кроме того, никакая магия не может уменьшить любую из ваших Скоростей или причинить вам состояния Опутанный или Парализованный."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_soprotivleniya",
    "key": "koltso_soprotivleniya",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо сопротивления",
      "ru": "Кольцо сопротивления"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите кольцо, вы обладаете Сопротивлением одному из типов урона. Самоцвет в кольце соответствует этому типу урона; Мастер выбирает тип урона или определяет броском по следующей таблице: 1 — Звук (Шпинель), 2 — Излучение (Топаз), 3 — Кислота (Жемчужина), 4 — Некротический (Гагат), 5 — Огонь (Гранат), 6 — Психический (Нефрит), 7 — Силовой (Сапфир), 8 — Холод (Турмалин), 9 — Электричество (Цитрин), 10 — Яд (Аметист).",
        "ru": "Пока вы носите кольцо, вы обладаете Сопротивлением одному из типов урона. Самоцвет в кольце соответствует этому типу урона; Мастер выбирает тип урона или определяет броском по следующей таблице: 1 — Звук (Шпинель), 2 — Излучение (Топаз), 3 — Кислота (Жемчужина), 4 — Некротический (Гагат), 5 — Огонь (Гранат), 6 — Психический (Нефрит), 7 — Силовой (Сапфир), 8 — Холод (Турмалин), 9 — Электричество (Цитрин), 10 — Яд (Аметист)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_telekineza",
    "key": "koltso_telekineza",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо телекинеза",
      "ru": "Кольцо телекинеза"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите это кольцо, вы можете сотворять с его помощью Телекинез.",
        "ru": "Пока вы носите это кольцо, вы можете сотворять с его помощью Телекинез."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_tepla",
    "key": "koltso_tepla",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо тепла",
      "ru": "Кольцо тепла"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Если вы получаете урон Холодом, пока носите это кольцо, оно снижает получаемый вами урон на 2к8. Кроме того, пока вы носите это кольцо, вы, как и всё, что вы несёте и носите, не подвергаетесь вредоносным эффектам низких температур (0° Фаренгейта, или ~17.8° Цельсия, и ниже).",
        "ru": "Если вы получаете урон Холодом, пока носите это кольцо, оно снижает получаемый вами урон на 2к8. Кроме того, пока вы носите это кольцо, вы, как и всё, что вы несёте и носите, не подвергаетесь вредоносным эффектам низких температур (0° Фаренгейта, или ~17.8° Цельсия, и ниже)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_tryoh_zhelaniy",
    "key": "koltso_tryoh_zhelaniy",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо трёх желаний",
      "ru": "Кольцо трёх желаний"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите это кольцо, можете потратить 1 из 3 его зарядов, чтобы сотворить с его помощью Желание. Как только вы потратите последний заряд, кольцо становится немагическим.",
        "ru": "Пока вы носите это кольцо, можете потратить 1 из 3 его зарядов, чтобы сотворить с его помощью Желание. Как только вы потратите последний заряд, кольцо становится немагическим."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.legendary",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_charges": 3,
      "wsg.ref.parameter.resources": {
        "key": "koltso_tryoh_zhelaniy_charges",
        "name": {
          "en": "Charges",
          "ru": "Заряды"
        },
        "maximum": {
          "kind": "number",
          "number": 3
        },
        "initial": "maximum",
        "minimum": 0,
        "recovery": []
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_ukloneniya",
    "key": "koltso_ukloneniya",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо уклонения",
      "ru": "Кольцо уклонения"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Это кольцо имеет 3 заряда и восстанавливает 1к3 потраченных зарядов на каждом рассвете. Когда вы проваливаете спасбросок Ловкости, пока носите это кольцо, вы можете Реакцией потратить 1 заряд и преуспеть в этом спасброске.",
        "ru": "Это кольцо имеет 3 заряда и восстанавливает 1к3 потраченных зарядов на каждом рассвете. Когда вы проваливаете спасбросок Ловкости, пока носите это кольцо, вы можете Реакцией потратить 1 заряд и преуспеть в этом спасброске."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_charges": 3,
      "wsg.ref.parameter.resources": {
        "key": "koltso_ukloneniya_charges",
        "name": {
          "en": "Charges",
          "ru": "Заряды"
        },
        "maximum": {
          "kind": "number",
          "number": 3
        },
        "initial": "maximum",
        "minimum": 0,
        "recovery": [
          {
            "event": "dawn",
            "amount": {
              "kind": "die_roll",
              "dieId": "wsg.atomic.d3",
              "diceCount": 1
            }
          }
        ]
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_hozhdeniya_po_vode",
    "key": "koltso_hozhdeniya_po_vode",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо хождения по воде",
      "ru": "Кольцо хождения по воде"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Пока вы носите это кольцо, вы можете сотворять Хождение по воде, нацеливаясь только на себя.",
        "ru": "Пока вы носите это кольцо, вы можете сотворять Хождение по воде, нацеливаясь только на себя."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koltso_hraneniya_zaklinaniy",
    "key": "koltso_hraneniya_zaklinaniy",
    "type": "item",
    "templateId": "mygame.temp.ring",
    "name": {
      "en": "Кольцо хранения заклинаний",
      "ru": "Кольцо хранения заклинаний"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Это кольцо сохраняет сотворённые в него заклинания и удерживает их, пока существо, носящее кольцо и настроенное на него, не использует их. Кольцо может хранить суммарно вплоть до 5 уровней заклинаний единомоментно. Когда кольцо находят, оно содержит 1к6 - 1 уровней заклинаний на выбор Мастера. Любое существо может сотворить заклинание от 1-го уровня до 5-го уровня в кольцо, если касается его при сотворении заклинания. В таком случае заклинание не оказывает эффекта, а сохраняется в кольце. Если кольцо не может вместить заклинание, оно тратится без эффекта. Уровень использованной при сотворении заклинания ячейки определяет, сколько уровней заклинание занимает в кольце. Пока вы носите это кольцо, вы можете сотворить любое сохранённое в нём заклинание; при этом сотворяемое заклинание будет сохранённого уровня и использовать Сл спасброска, модификатор атаки и заклинательную характеристику того, кто сотворил заклинание в кольцо, но в остальном будет считаться сотворяемым вами заклинанием. Сотворённое из кольца заклинание больше не хранится в нём, освобождая занимаемые уровни.",
        "ru": "Это кольцо сохраняет сотворённые в него заклинания и удерживает их, пока существо, носящее кольцо и настроенное на него, не использует их. Кольцо может хранить суммарно вплоть до 5 уровней заклинаний единомоментно. Когда кольцо находят, оно содержит 1к6 - 1 уровней заклинаний на выбор Мастера. Любое существо может сотворить заклинание от 1-го уровня до 5-го уровня в кольцо, если касается его при сотворении заклинания. В таком случае заклинание не оказывает эффекта, а сохраняется в кольце. Если кольцо не может вместить заклинание, оно тратится без эффекта. Уровень использованной при сотворении заклинания ячейки определяет, сколько уровней заклинание занимает в кольце. Пока вы носите это кольцо, вы можете сотворить любое сохранённое в нём заклинание; при этом сотворяемое заклинание будет сохранённого уровня и использовать Сл спасброска, модификатор атаки и заклинательную характеристику того, кто сотворил заклинание в кольцо, но в остальном будет считаться сотворяемым вами заклинанием. Сотворённое из кольца заклинание больше не хранится в нём, освобождая занимаемые уровни."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.ring",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_equipment_slot": "wsg.ref.value.equipment_slot.ring",
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": true,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_lecheniya",
    "key": "zele_lecheniya",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье лечения",
      "ru": "Зелье лечения"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Бонусным действием вы можете выпить его или влить другому существу в пределах 5 футов от вас. Выпивающее волшебную красную жидкость из этого флакона существо восстанавливает 2к4 + 2 Хитов.",
        "ru": "Бонусным действием вы можете выпить его или влить другому существу в пределах 5 футов от вас. Выпивающее волшебную красную жидкость из этого флакона существо восстанавливает 2к4 + 2 Хитов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 50,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.common",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.effects": {
        "version": 1,
        "rules": [
          {
            "id": "rule_healing",
            "name": {
              "en": "Restore Hit Points",
              "ru": "Восстановление Хитов"
            },
            "enabled": true,
            "event": "activated",
            "frequency": "once_per_target",
            "conditions": {
              "mode": "all",
              "predicates": []
            },
            "actions": [
              {
                "id": "action_heal",
                "type": "heal",
                "target": "selected_target",
                "value": {
                  "kind": "operation",
                  "operation": "sum",
                  "operands": [
                    {
                      "kind": "die_roll",
                      "dieId": "wsg.atomic.d4",
                      "diceCount": 2
                    },
                    {
                      "kind": "number",
                      "number": 2
                    }
                  ],
                  "rounding": "none"
                },
                "targetCount": 1,
                "rangeFeet": 5,
                "requiresLineOfSight": false
              }
            ],
            "duration": {
              "type": "instant",
              "rounds": 0,
              "concentration": false,
              "expiration": "automatic"
            },
            "priority": 100,
            "stacking": "unique_source"
          }
        ]
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_otlichnogo_lecheniya",
    "key": "zele_otlichnogo_lecheniya",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье отличного лечения",
      "ru": "Зелье отличного лечения"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Бонусным действием вы можете выпить его или влить другому существу в пределах 5 футов от вас. Выпивающее волшебную красную жидкость из этого флакона существо восстанавливает 8к4 + 8 Хитов.",
        "ru": "Бонусным действием вы можете выпить его или влить другому существу в пределах 5 футов от вас. Выпивающее волшебную красную жидкость из этого флакона существо восстанавливает 8к4 + 8 Хитов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.effects": {
        "version": 1,
        "rules": [
          {
            "id": "rule_healing",
            "name": {
              "en": "Restore Hit Points",
              "ru": "Восстановление Хитов"
            },
            "enabled": true,
            "event": "activated",
            "frequency": "once_per_target",
            "conditions": {
              "mode": "all",
              "predicates": []
            },
            "actions": [
              {
                "id": "action_heal",
                "type": "heal",
                "target": "selected_target",
                "value": {
                  "kind": "operation",
                  "operation": "sum",
                  "operands": [
                    {
                      "kind": "die_roll",
                      "dieId": "wsg.atomic.d4",
                      "diceCount": 8
                    },
                    {
                      "kind": "number",
                      "number": 8
                    }
                  ],
                  "rounding": "none"
                },
                "targetCount": 1,
                "rangeFeet": 5,
                "requiresLineOfSight": false
              }
            ],
            "duration": {
              "type": "instant",
              "rounds": 0,
              "concentration": false,
              "expiration": "automatic"
            },
            "priority": 100,
            "stacking": "unique_source"
          }
        ]
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_bolshogo_lecheniya",
    "key": "zele_bolshogo_lecheniya",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье большого лечения",
      "ru": "Зелье большого лечения"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Бонусным действием вы можете выпить его или влить другому существу в пределах 5 футов от вас. Выпивающее волшебную красную жидкость из этого флакона существо восстанавливает 4к4 + 4 Хитов.",
        "ru": "Бонусным действием вы можете выпить его или влить другому существу в пределах 5 футов от вас. Выпивающее волшебную красную жидкость из этого флакона существо восстанавливает 4к4 + 4 Хитов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.effects": {
        "version": 1,
        "rules": [
          {
            "id": "rule_healing",
            "name": {
              "en": "Restore Hit Points",
              "ru": "Восстановление Хитов"
            },
            "enabled": true,
            "event": "activated",
            "frequency": "once_per_target",
            "conditions": {
              "mode": "all",
              "predicates": []
            },
            "actions": [
              {
                "id": "action_heal",
                "type": "heal",
                "target": "selected_target",
                "value": {
                  "kind": "operation",
                  "operation": "sum",
                  "operands": [
                    {
                      "kind": "die_roll",
                      "dieId": "wsg.atomic.d4",
                      "diceCount": 4
                    },
                    {
                      "kind": "number",
                      "number": 4
                    }
                  ],
                  "rounding": "none"
                },
                "targetCount": 1,
                "rangeFeet": 5,
                "requiresLineOfSight": false
              }
            ],
            "duration": {
              "type": "instant",
              "rounds": 0,
              "concentration": false,
              "expiration": "automatic"
            },
            "priority": 100,
            "stacking": "unique_source"
          }
        ]
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_prevoshodnogo_lecheniya",
    "key": "zele_prevoshodnogo_lecheniya",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье превосходного лечения",
      "ru": "Зелье превосходного лечения"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Бонусным действием вы можете выпить его или влить другому существу в пределах 5 футов от вас. Выпивающее волшебную красную жидкость из этого флакона существо восстанавливает 10к4 + 20 Хитов.",
        "ru": "Бонусным действием вы можете выпить его или влить другому существу в пределах 5 футов от вас. Выпивающее волшебную красную жидкость из этого флакона существо восстанавливает 10к4 + 20 Хитов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 20000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.effects": {
        "version": 1,
        "rules": [
          {
            "id": "rule_healing",
            "name": {
              "en": "Restore Hit Points",
              "ru": "Восстановление Хитов"
            },
            "enabled": true,
            "event": "activated",
            "frequency": "once_per_target",
            "conditions": {
              "mode": "all",
              "predicates": []
            },
            "actions": [
              {
                "id": "action_heal",
                "type": "heal",
                "target": "selected_target",
                "value": {
                  "kind": "operation",
                  "operation": "sum",
                  "operands": [
                    {
                      "kind": "die_roll",
                      "dieId": "wsg.atomic.d4",
                      "diceCount": 10
                    },
                    {
                      "kind": "number",
                      "number": 20
                    }
                  ],
                  "rounding": "none"
                },
                "targetCount": 1,
                "rangeFeet": 5,
                "requiresLineOfSight": false
              }
            ],
            "duration": {
              "type": "instant",
              "rounds": 0,
              "concentration": false,
              "expiration": "automatic"
            },
            "priority": 100,
            "stacking": "unique_source"
          }
        ]
      }
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_vysshey_nevidimosti",
    "key": "zele_vysshey_nevidimosti",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье высшей невидимости",
      "ru": "Зелье высшей невидимости"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Фиал с этим зельем выглядит пустым, но ощущается как содержащий жидкость. Когда вы выпиваете это зелье, вы получаете состояние Невидимый на 1 час.",
        "ru": "Фиал с этим зельем выглядит пустым, но ощущается как содержащий жидкость. Когда вы выпиваете это зелье, вы получаете состояние Невидимый на 1 час."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 20000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_gazoobraznoy_formy",
    "key": "zele_gazoobraznoy_formy",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье газообразной формы",
      "ru": "Зелье газообразной формы"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, вы получаете эффект заклинания Газообразная форма на 1 час (Концентрация не требуется) или пока вы не окончите его Бонусным действием. В фиале этого зелья как будто находится туман, двигающийся и льющийся, как вода.",
        "ru": "Когда вы выпиваете это зелье, вы получаете эффект заклинания Газообразная форма на 1 час (Концентрация не требуется) или пока вы не окончите его Бонусным действием. В фиале этого зелья как будто находится туман, двигающийся и льющийся, как вода."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_geroizma",
    "key": "zele_geroizma",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье героизма",
      "ru": "Зелье героизма"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, вы получаете 10 Временных хитов, длящихся в течение 1 часа. В течение этого же времени на вас действует эффект заклинания Благословение (Концентрация не требуется). Голубая жидкость этого зелья парит и бурлит, как будто кипит.",
        "ru": "Когда вы выпиваете это зелье, вы получаете 10 Временных хитов, длящихся в течение 1 часа. В течение этого же времени на вас действует эффект заклинания Благословение (Концентрация не требуется). Голубая жидкость этого зелья парит и бурлит, как будто кипит."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_dolgoletiya",
    "key": "zele_dolgoletiya",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье долголетия",
      "ru": "Зелье долголетия"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, ваш физический возраст уменьшается на 1к6 + 6 лет, но не меньше, чем до 13 лет. Каждый следующий раз, когда вы выпиваете Зелье долголетия, накапливается 10% шанс, что вместо уменьшения ваш возраст увеличится на 1к6 + 6 лет. В янтарной жидкости этого зелья плавает крошечное сердце, которое, вопреки всему, всё ещё бьётся. Когда зелье открывают, оно исчезает.",
        "ru": "Когда вы выпиваете это зелье, ваш физический возраст уменьшается на 1к6 + 6 лет, но не меньше, чем до 13 лет. Каждый следующий раз, когда вы выпиваете Зелье долголетия, накапливается 10% шанс, что вместо уменьшения ваш возраст увеличится на 1к6 + 6 лет. В янтарной жидкости этого зелья плавает крошечное сердце, которое, вопреки всему, всё ещё бьётся. Когда зелье открывают, оно исчезает."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 20000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_druzhby_s_zhivotnymi",
    "key": "zele_druzhby_s_zhivotnymi",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье дружбы с животными",
      "ru": "Зелье дружбы с животными"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, вы можете сотворить Дружбу с животными как заклинание 3-го уровня (Сл спасброска заклинаний 13). При встряхивании грязной жидкости этого зелья в ней можно заметить кусочки тел: рыбью чешуйку, перо колибри, коготь кошки или мех белки.",
        "ru": "Когда вы выпиваете это зелье, вы можете сотворить Дружбу с животными как заклинание 3-го уровня (Сл спасброска заклинаний 13). При встряхивании грязной жидкости этого зелья в ней можно заметить кусочки тел: рыбью чешуйку, перо колибри, коготь кошки или мех белки."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_zhivuchesti",
    "key": "zele_zhivuchesti",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье живучести",
      "ru": "Зелье живучести"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, оно оканчивает на вас все уровни Истощения и состояние Отравленный. В течение следующих 24 часов вы восстанавливаете максимум Хитов за каждую потраченную вами Кость хитов. Кроваво-красная жидкость этого зелья постоянно пульсирует тусклым светом, что напоминает биение сердца.",
        "ru": "Когда вы выпиваете это зелье, оно оканчивает на вас все уровни Истощения и состояние Отравленный. В течение следующих 24 часов вы восстанавливаете максимум Хитов за каждую потраченную вами Кость хитов. Кроваво-красная жидкость этого зелья постоянно пульсирует тусклым светом, что напоминает биение сердца."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 20000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_kulachnogo_boya",
    "key": "zele_kulachnogo_boya",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье кулачного боя",
      "ru": "Зелье кулачного боя"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "В течение 10 минут после выпивания этого зелья каждый совершаемый вами Безоружный удар наносит при попадании 1к6 дополнительного Силового урона. Густая зелёная жидкость этого зелья на вкус — как шпинат.",
        "ru": "В течение 10 минут после выпивания этого зелья каждый совершаемый вами Безоружный удар наносит при попадании 1к6 дополнительного Силового урона. Густая зелёная жидкость этого зелья на вкус — как шпинат."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_lazaniya",
    "key": "zele_lazaniya",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье лазания",
      "ru": "Зелье лазания"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, вы получаете Скорость лазания, равную вашей Скорости, на 1 час. В течение этого времени вы совершаете с Преимуществом проверки Силы (Атлетика), совершаемые для лазанья. Жидкость этого зелья состоит из слоёв бурого, серебристого и серого цветов, как слоистый камень. Встряхивание зелья не нарушает границ этих слоёв.",
        "ru": "Когда вы выпиваете это зелье, вы получаете Скорость лазания, равную вашей Скорости, на 1 час. В течение этого времени вы совершаете с Преимуществом проверки Силы (Атлетика), совершаемые для лазанья. Жидкость этого зелья состоит из слоёв бурого, серебристого и серого цветов, как слоистый камень. Встряхивание зелья не нарушает границ этих слоёв."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 50,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.common",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_nevidimosti",
    "key": "zele_nevidimosti",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье невидимости",
      "ru": "Зелье невидимости"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Фиал с этим зельем выглядит пустым, но ощущается как содержащий жидкость. Когда вы выпиваете это зелье, вы получаете состояние Невидимый на 1 час. Этот эффект оканчивается преждевременно, если вы совершаете бросок атаки, наносите урон или сотворяете заклинание.",
        "ru": "Фиал с этим зельем выглядит пустым, но ощущается как содержащий жидкость. Когда вы выпиваете это зелье, вы получаете состояние Невидимый на 1 час. Этот эффект оканчивается преждевременно, если вы совершаете бросок атаки, наносите урон или сотворяете заклинание."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_neuyazvimosti",
    "key": "zele_neuyazvimosti",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье неуязвимости",
      "ru": "Зелье неуязвимости"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "В течение следующей минуты после того, как вы выпьете это зелье, вы обладаете Сопротивлением всему урону. Сиропообразная жидкость зелья выглядит как жидкое железо.",
        "ru": "В течение следующей минуты после того, как вы выпьете это зелье, вы обладаете Сопротивлением всему урону. Сиропообразная жидкость зелья выглядит как жидкое железо."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_ognennogo_dyhaniya",
    "key": "zele_ognennogo_dyhaniya",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье огненного дыхания",
      "ru": "Зелье огненного дыхания"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, вы можете Бонусным действием выдыхать огонь в цель в пределах 30 футов от вас. При этом цель совершает спасбросок Ловкости Сл 13, получая 4к6 урона Огнём при провале или половину этого урона при успехе. Эффект зелья оканчивается через 1 час или когда вы выдохнете огонь три раза. Оранжевая жидкость этого зелья мерцает, а в незанятом жидкостью пространстве фиала клубится дым, вылетающий при открывании.",
        "ru": "Когда вы выпиваете это зелье, вы можете Бонусным действием выдыхать огонь в цель в пределах 30 футов от вас. При этом цель совершает спасбросок Ловкости Сл 13, получая 4к6 урона Огнём при провале или половину этого урона при успехе. Эффект зелья оканчивается через 1 час или когда вы выдохнете огонь три раза. Оранжевая жидкость этого зелья мерцает, а в незанятом жидкостью пространстве фиала клубится дым, вылетающий при открывании."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_podvodnogo_dyhaniya",
    "key": "zele_podvodnogo_dyhaniya",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье подводного дыхания",
      "ru": "Зелье подводного дыхания"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "В течение 24 часов после выпивания этого зелья вы можете дышать под водой. Мутно-зелёная жидкость этого зелья пахнет морем, и в ней плавает похожий на медузу пузырёк.",
        "ru": "В течение 24 часов после выпивания этого зелья вы можете дышать под водой. Мутно-зелёная жидкость этого зелья пахнет морем, и в ней плавает похожий на медузу пузырёк."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_polyota",
    "key": "zele_polyota",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье полёта",
      "ru": "Зелье полёта"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, вы получаете Скорость полёта, равную вашей Скорости, на 1 час (вы можете парить). Если вы находитесь в полёте, когда действие зелья заканчивается, вы падаете, если у вас нет иных средств держаться в воздухе. Прозрачная жидкость этого зелья не стекает вниз фиала, а находится наверху. В ней плавают белые облачка.",
        "ru": "Когда вы выпиваете это зелье, вы получаете Скорость полёта, равную вашей Скорости, на 1 час (вы можете парить). Если вы находитесь в полёте, когда действие зелья заканчивается, вы падаете, если у вас нет иных средств держаться в воздухе. Прозрачная жидкость этого зелья не стекает вниз фиала, а находится наверху. В ней плавают белые облачка."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 20000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_ponimaniya",
    "key": "zele_ponimaniya",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье понимания",
      "ru": "Зелье понимания"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете зелье, вы получаете эффект заклинания Понимание языков на 1 час. В прозрачной жидкости этого зелья кружатся крупинки соли и сажи.",
        "ru": "Когда вы выпиваете зелье, вы получаете эффект заклинания Понимание языков на 1 час. В прозрачной жидкости этого зелья кружатся крупинки соли и сажи."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 50,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.common",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_sily_kamennogo_velikana",
    "key": "zele_sily_kamennogo_velikana",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье силы каменного великана",
      "ru": "Зелье силы каменного великана"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, ваше значение Силы становится равным 23 на 1 час. Зелье не оказывает на вас эффекта, если ваша Сила уже равна 23 или выше. В прозрачной жидкости этого зелья плавает проблеск света, по форме похожий на ноготь гиганта.",
        "ru": "Когда вы выпиваете это зелье, ваше значение Силы становится равным 23 на 1 час. Зелье не оказывает на вас эффекта, если ваша Сила уже равна 23 или выше. В прозрачной жидкости этого зелья плавает проблеск света, по форме похожий на ноготь гиганта."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_sily_ledyanogo_velikana",
    "key": "zele_sily_ledyanogo_velikana",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье силы ледяного великана",
      "ru": "Зелье силы ледяного великана"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, ваше значение Силы становится равным 23 на 1 час. Зелье не оказывает на вас эффекта, если ваша Сила уже равна 23 или выше. В прозрачной жидкости этого зелья плавает проблеск света, по форме похожий на ноготь гиганта.",
        "ru": "Когда вы выпиваете это зелье, ваше значение Силы становится равным 23 на 1 час. Зелье не оказывает на вас эффекта, если ваша Сила уже равна 23 или выше. В прозрачной жидкости этого зелья плавает проблеск света, по форме похожий на ноготь гиганта."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_sily_oblachnogo_velikana",
    "key": "zele_sily_oblachnogo_velikana",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье силы облачного великана",
      "ru": "Зелье силы облачного великана"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, ваше значение Силы становится равным 27 на 1 час. Зелье не оказывает на вас эффекта, если ваша Сила уже равна 27 или выше. В прозрачной жидкости этого зелья плавает проблеск света, по форме похожий на ноготь гиганта.",
        "ru": "Когда вы выпиваете это зелье, ваше значение Силы становится равным 27 на 1 час. Зелье не оказывает на вас эффекта, если ваша Сила уже равна 27 или выше. В прозрачной жидкости этого зелья плавает проблеск света, по форме похожий на ноготь гиганта."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 20000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_sily_ognennogo_velikana",
    "key": "zele_sily_ognennogo_velikana",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье силы огненного великана",
      "ru": "Зелье силы огненного великана"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, ваше значение Силы становится равным 25 на 1 час. Зелье не оказывает на вас эффекта, если ваша Сила уже равна 25 или выше. В прозрачной жидкости этого зелья плавает проблеск света, по форме похожий на ноготь гиганта.",
        "ru": "Когда вы выпиваете это зелье, ваше значение Силы становится равным 25 на 1 час. Зелье не оказывает на вас эффекта, если ваша Сила уже равна 25 или выше. В прозрачной жидкости этого зелья плавает проблеск света, по форме похожий на ноготь гиганта."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_sily_holmovogo_velikana",
    "key": "zele_sily_holmovogo_velikana",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье силы холмового великана",
      "ru": "Зелье силы холмового великана"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, ваше значение Силы становится равным 21 на 1 час. Зелье не оказывает на вас эффекта, если ваша Сила уже равна 21 или выше. В прозрачной жидкости этого зелья плавает проблеск света, по форме похожий на ноготь гиганта.",
        "ru": "Когда вы выпиваете это зелье, ваше значение Силы становится равным 21 на 1 час. Зелье не оказывает на вас эффекта, если ваша Сила уже равна 21 или выше. В прозрачной жидкости этого зелья плавает проблеск света, по форме похожий на ноготь гиганта."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_sily_shtormovogo_velikana",
    "key": "zele_sily_shtormovogo_velikana",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье силы штормового великана",
      "ru": "Зелье силы штормового великана"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, ваше значение Силы становится равным 29 на 1 час. Зелье не оказывает на вас эффекта, если ваша Сила уже равна 29 или выше. В прозрачной жидкости этого зелья плавает проблеск света, по форме похожий на ноготь гиганта.",
        "ru": "Когда вы выпиваете это зелье, ваше значение Силы становится равным 29 на 1 час. Зелье не оказывает на вас эффекта, если ваша Сила уже равна 29 или выше. В прозрачной жидкости этого зелья плавает проблеск света, по форме похожий на ноготь гиганта."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 100000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.legendary",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_skorosti",
    "key": "zele_skorosti",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье скорости",
      "ru": "Зелье скорости"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, вы получаете эффект заклинания Ускорение на 1 минуту (Концентрация не требуется). Когда этот эффект заканчивается, обычная для этого заклинания вялость не воздействует на вас. Жёлтая жидкость этого зелья перемежается чёрными росчерками и крутится сама по себе.",
        "ru": "Когда вы выпиваете это зелье, вы получаете эффект заклинания Ускорение на 1 минуту (Концентрация не требуется). Когда этот эффект заканчивается, обычная для этого заклинания вялость не воздействует на вас. Жёлтая жидкость этого зелья перемежается чёрными росчерками и крутится сама по себе."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 20000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_soprotivleniya",
    "key": "zele_soprotivleniya",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье сопротивления",
      "ru": "Зелье сопротивления"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, вы получаете Сопротивление одному из типов урона на 1 час. Мастер выбирает тип урона или определяет его броском по следующей таблице: 1к10: 1-Звук, 2-Излучение, 3-Кислота, 4-Некротический, 5-Огонь, 6-Психический, 7-Силовой, 8-Холод, 9-Электричество, 10-Яд.",
        "ru": "Когда вы выпиваете это зелье, вы получаете Сопротивление одному из типов урона на 1 час. Мастер выбирает тип урона или определяет его броском по следующей таблице: 1к10: 1-Звук, 2-Излучение, 3-Кислота, 4-Некротический, 5-Огонь, 6-Психический, 7-Силовой, 8-Холод, 9-Электричество, 10-Яд."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_uvelicheniya",
    "key": "zele_uvelicheniya",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье увеличения",
      "ru": "Зелье увеличения"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, вы получаете эффект «Увеличение» заклинания Увеличение/уменьшение на 10 минут (Концентрация не требуется). Красный цвет постоянно то расходится по прозрачной жидкости этого зелья, то снова сжимается в крохотную горошину. Встряхивание фиала никак не влияет на этот процесс.",
        "ru": "Когда вы выпиваете это зелье, вы получаете эффект «Увеличение» заклинания Увеличение/уменьшение на 10 минут (Концентрация не требуется). Красный цвет постоянно то расходится по прозрачной жидкости этого зелья, то снова сжимается в крохотную горошину. Встряхивание фиала никак не влияет на этот процесс."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_umensheniya",
    "key": "zele_umensheniya",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье уменьшения",
      "ru": "Зелье уменьшения"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, вы получаете эффект «Уменьшение» заклинания Увеличение/уменьшение на 1к4 часов (Концентрация не требуется). Красный цвет постоянно то сжимается в крохотную горошину, то снова расходится по прозрачной жидкости этого зелья. Встряхивание фиала никак не влияет на этот процесс.",
        "ru": "Когда вы выпиваете это зелье, вы получаете эффект «Уменьшение» заклинания Увеличение/уменьшение на 1к4 часов (Концентрация не требуется). Красный цвет постоянно то сжимается в крохотную горошину, то снова расходится по прозрачной жидкости этого зелья. Встряхивание фиала никак не влияет на этот процесс."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_chteniya_mysley",
    "key": "zele_chteniya_mysley",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье чтения мыслей",
      "ru": "Зелье чтения мыслей"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, вы получаете эффект заклинания Обнаружение мыслей (Сл спасброска 13) на 10 минут (Концентрация не требуется). В тягучей фиолетовой жидкости этого зелья плавает яйцеобразное розовое облачко.",
        "ru": "Когда вы выпиваете это зелье, вы получаете эффект заклинания Обнаружение мыслей (Сл спасброска 13) на 10 минут (Концентрация не требуется). В тягучей фиолетовой жидкости этого зелья плавает яйцеобразное розовое облачко."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_yada",
    "key": "zele_yada",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье яда",
      "ru": "Зелье яда"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Это зелье на вид, запах и вкус — в точности как Зелье лечения или другое полезное зелье. Однако на деле это яд, замаскированный магией иллюзий. Опознание раскрывает истинную природу зелья. Если вы выпиваете это зелье, вы получаете 4к6 урона Ядом и должны преуспеть в спасброске Телосложения Сл 13, иначе получите также состояние Отравленный на 1 час.",
        "ru": "Это зелье на вид, запах и вкус — в точности как Зелье лечения или другое полезное зелье. Однако на деле это яд, замаскированный магией иллюзий. Опознание раскрывает истинную природу зелья. Если вы выпиваете это зелье, вы получаете 4к6 урона Ядом и должны преуспеть в спасброске Телосложения Сл 13, иначе получите также состояние Отравленный на 1 час."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zele_yasnovideniya",
    "key": "zele_yasnovideniya",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Зелье ясновидения",
      "ru": "Зелье ясновидения"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, вы получаете эффект заклинания Подсматривание (Концентрация не требуется). В желтоватой жидкости этого зелья плавает глазное яблоко. Оно исчезает, когда зелье открывается.",
        "ru": "Когда вы выпиваете это зелье, вы получаете эффект заклинания Подсматривание (Концентрация не требуется). В желтоватой жидкости этого зелья плавает глазное яблоко. Оно исчезает, когда зелье открывается."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.lyubovnoe_zele",
    "key": "lyubovnoe_zele",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Любовное зелье",
      "ru": "Любовное зелье"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, первое же существо, которое вы увидите в течение следующих 10 минут, очаровывает вас; вы получаете состояние Очарованный на 1 час. В шипучей розоватой жидкости этого зелья плавает труднозаметный пузырёк в форме сердечка.",
        "ru": "Когда вы выпиваете это зелье, первое же существо, которое вы увидите в течение следующих 10 минут, очаровывает вас; вы получаете состояние Очарованный на 1 час. В шипучей розоватой жидкости этого зелья плавает труднозаметный пузырёк в форме сердечка."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.maslo_ostroty",
    "key": "maslo_ostroty",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Масло остроты",
      "ru": "Масло остроты"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Одним фиалом этого масла можно покрыть одно Рукопашное оружие или 20 единиц боеприпасов, но его эффект воздействует только на немагические боеприпасы и Рукопашное оружие, наносящие Колющий или Рубящий урон. Нанесение масла занимает 1 минуту, после чего оно магическим образом впитывается в то, на что нанесено; если это оружие, оно становится Оружием +3, а если боеприпасы — Боеприпасами +3. Это прозрачное, желеобразное масло блестит крошечными, крайне тонкими осколками серебра.",
        "ru": "Одним фиалом этого масла можно покрыть одно Рукопашное оружие или 20 единиц боеприпасов, но его эффект воздействует только на немагические боеприпасы и Рукопашное оружие, наносящие Колющий или Рубящий урон. Нанесение масла занимает 1 минуту, после чего оно магическим образом впитывается в то, на что нанесено; если это оружие, оно становится Оружием +3, а если боеприпасы — Боеприпасами +3. Это прозрачное, желеобразное масло блестит крошечными, крайне тонкими осколками серебра."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 20000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.very_rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.maslo_uskolzaniya",
    "key": "maslo_uskolzaniya",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Масло ускользания",
      "ru": "Масло ускользания"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Одним фиалом этого масла можно намазать одно существо Среднего размера или меньше со всем, что оно несёт или носит (на каждую категорию размера больше Среднего потребуется ещё по одному фиалу масла). Нанесение масла на существо занимает 10 минут, после чего это существо получает эффект заклинания Свобода передвижения на 8 часов. Вместо нанесения масла на существо вы можете действием Магия вылить его на землю, где оно растекается квадратом 10 х 10 футов, в течение следующих 8 часов повторяя в этой области эффект заклинания Намасливание. Эта липкая чёрная мазь на руках густая и тяжёлая, но если её выливать, течёт легко и быстро.",
        "ru": "Одним фиалом этого масла можно намазать одно существо Среднего размера или меньше со всем, что оно несёт или носит (на каждую категорию размера больше Среднего потребуется ещё по одному фиалу масла). Нанесение масла на существо занимает 10 минут, после чего это существо получает эффект заклинания Свобода передвижения на 8 часов. Вместо нанесения масла на существо вы можете действием Магия вылить его на землю, где оно растекается квадратом 10 х 10 футов, в течение следующих 8 часов повторяя в этой области эффект заклинания Намасливание. Эта липкая чёрная мазь на руках густая и тяжёлая, но если её выливать, течёт легко и быстро."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.uncommon",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.maslo_efirnosti",
    "key": "maslo_efirnosti",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Масло эфирности",
      "ru": "Масло эфирности"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Одним фиалом этого масла можно намазать одно существо Среднего размера или меньше со всем, что оно несёт или носит (на каждую категорию размера больше Среднего потребуется ещё по одному фиалу масла). Нанесение масла на существо занимает 10 минут, после чего это существо получает эффект заклинания Эфирность на 1 час. Капли этого мутного серого масла образуются на внешних стенках фиала и быстро испаряются.",
        "ru": "Одним фиалом этого масла можно намазать одно существо Среднего размера или меньше со всем, что оно несёт или носит (на каждую категорию размера больше Среднего потребуется ещё по одному фиалу масла). Нанесение масла на существо занимает 10 минут, после чего это существо получает эффект заклинания Эфирность на 1 час. Капли этого мутного серого масла образуются на внешних стенках фиала и быстро испаряются."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.eliksir_zdorovya",
    "key": "eliksir_zdorovya",
    "type": "item",
    "templateId": "mygame.temp.potion",
    "name": {
      "en": "Эликсир здоровья",
      "ru": "Эликсир здоровья"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы выпиваете это зелье, вы излечиваетесь от всех магических заражений. Кроме того, следующие состояния оканчиваются на вас: Оглохший, Ослеплённый, Отравленный, Парализованный. В чистой красной жидкости этого зелья видны светящиеся пузырьки.",
        "ru": "Когда вы выпиваете это зелье, вы излечиваетесь от всех магических заражений. Кроме того, следующие состояния оканчиваются на вас: Оглохший, Ослеплённый, Отравленный, Парализованный. В чистой красной жидкости этого зелья видны светящиеся пузырьки."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.potion",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.rare",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.blednaya_nastoyka",
    "key": "blednaya_nastoyka",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Бледная настойка",
      "ru": "Бледная настойка"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Существо, подвергшееся действию этого яда, должно преуспеть в спасброске Телосложения Сл 16, иначе получит 3 (1к6) урона ядом и станет отравленным. Отравленное существо должно повторять спасбросок каждые 24 часа, получая 3 (1к6) урона ядом при провале. Пока яд действует, урон, причинённый им, ничем не может быть вылечен. После семи успешных спасбросков эффект оканчивается, и существо может лечиться как обычно.",
        "ru": "Существо, подвергшееся действию этого яда, должно преуспеть в спасброске Телосложения Сл 16, иначе получит 3 (1к6) урона ядом и станет отравленным. Отравленное существо должно повторять спасбросок каждые 24 часа, получая 3 (1к6) урона ядом при провале. Пока яд действует, урон, причинённый им, ничем не может быть вылечен. После семи успешных спасбросков эффект оканчивается, и существо может лечиться как обычно."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 250,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.ingested"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.dym_zhzhyonnogo_otura",
    "key": "dym_zhzhyonnogo_otura",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Дым жжённого отура",
      "ru": "Дым жжённого отура"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Существо, подвергшееся действию этого яда, должно преуспеть в спасброске Телосложения Сл 13, иначе оно получит 10 (3к6) урона ядом и будет должно повторять этот спасбросок в начале каждого своего хода. При каждом провале персонаж получит 3 (1к6) урона ядом. После трёх успехов яд прекратит своё действие.",
        "ru": "Существо, подвергшееся действию этого яда, должно преуспеть в спасброске Телосложения Сл 13, иначе оно получит 10 (3к6) урона ядом и будет должно повторять этот спасбросок в начале каждого своего хода. При каждом провале персонаж получит 3 (1к6) урона ядом. После трёх успехов яд прекратит своё действие."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 500,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.inhaled"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.dyhanie_bizy_jrc",
    "key": "dyhanie_bizy_jrc",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Дыхание Бизы (JRC)",
      "ru": "Дыхание Бизы (JRC)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Существо, подвергнутое воздействию этого яда, должно преуспеть в спасброске Телосложения Сл 16, иначе станет отравленным на 1 минуту. Отравленное существо должно использовать своё действие, чтобы совершить рукопашную атаку против случайно определенного существа в пределах его досягаемости. Если в пределах его досягаемости нет другого существа, отравленное существо ничего не совершает в свой ход. Существо может повторять спасбросок в конце каждого своего хода, оканчивая эффект на себе при успехе.",
        "ru": "Существо, подвергнутое воздействию этого яда, должно преуспеть в спасброске Телосложения Сл 16, иначе станет отравленным на 1 минуту. Отравленное существо должно использовать своё действие, чтобы совершить рукопашную атаку против случайно определенного существа в пределах его досягаемости. Если в пределах его досягаемости нет другого существа, отравленное существо ничего не совершает в свой ход. Существо может повторять спасбросок в конце каждого своего хода, оканчивая эффект на себе при успехе."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 0,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.inhaled"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zloba",
    "key": "zloba",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Злоба",
      "ru": "Злоба"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Существо, подвергшееся действию этого яда, должно преуспеть в спасброске Телосложения Сл 15, иначе оно станет отравленным на 1 час. Существо ослеплено, пока отравлено.",
        "ru": "Существо, подвергшееся действию этого яда, должно преуспеть в спасброске Телосложения Сл 15, иначе оно станет отравленным на 1 час. Существо ослеплено, пока отравлено."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 250,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.inhaled"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zmeinyy_yad",
    "key": "zmeinyy_yad",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Змеиный яд",
      "ru": "Змеиный яд"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Этот яд собирают с мёртвой или недееспособной гигантской ядовитой змеи. Существо, подвергшееся действию этого яда, должно совершить спасбросок Телосложения Сл 11, получая 10 (3к6) урона ядом при провале, или половину этого урона при успехе.",
        "ru": "Этот яд собирают с мёртвой или недееспособной гигантской ядовитой змеи. Существо, подвергшееся действию этого яда, должно совершить спасбросок Телосложения Сл 11, получая 10 (3к6) урона ядом при провале, или половину этого урона при успехе."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.injury"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.krov_assasina",
    "key": "krov_assasina",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Кровь ассасина",
      "ru": "Кровь ассасина"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Существо, подвергшееся действию этого яда, должно совершить спасбросок Телосложения Сл 10. При провале оно получает 6 (1к12) урона ядом и становится отравленным на 24 часа. При успехе существо получает половину урона и не становится отравленным.",
        "ru": "Существо, подвергшееся действию этого яда, должно совершить спасбросок Телосложения Сл 10. При провале оно получает 6 (1к12) урона ядом и становится отравленным на 24 часа. При успехе существо получает половину урона и не становится отравленным."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 150,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.ingested"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.krov_likantropa_imr",
    "key": "krov_likantropa_imr",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Кровь ликантропа (IMR)",
      "ru": "Кровь ликантропа (IMR)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Этот яд создается из крови, взятой у мёртвого или недееспособного ликантропа в его животном или гибридном облике. Существо, подвергшееся воздействию этого яда, должно преуспеть в спасброске Телосложения Сл 12, иначе оно будет проклято ликантропией. Проклятие действует до тех пор, пока не будет снято заклинанием снятие проклятья или подобной магией. Вид ликантропии зависит от ликантропа, использованного для создания яда. Чтобы определить вид ликантропа случайным образом, совершите бросок по таблице: 1-3 — Веркрыса; 4-6 — Вервольф; 7-8 — Вервепрь; 9 — Вертигр; 10 — Вермедведь.",
        "ru": "Этот яд создается из крови, взятой у мёртвого или недееспособного ликантропа в его животном или гибридном облике. Существо, подвергшееся воздействию этого яда, должно преуспеть в спасброске Телосложения Сл 12, иначе оно будет проклято ликантропией. Проклятие действует до тех пор, пока не будет снято заклинанием снятие проклятья или подобной магией. Вид ликантропии зависит от ликантропа, использованного для создания яда. Чтобы определить вид ликантропа случайным образом, совершите бросок по таблице: 1-3 — Веркрыса; 4-6 — Вервольф; 7-8 — Вервепрь; 9 — Вертигр; 10 — Вермедведь."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 0,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": true,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.injury"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.maslo_taggita",
    "key": "maslo_taggita",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Масло таггита",
      "ru": "Масло таггита"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Существо, подвергшееся действию этого яда, должно преуспеть в спасброске Телосложения Сл 13, иначе оно станет отравленным на 24 часа. Существо также лишено сознания, пока отравлено. Существо приходит в сознание, если получает урон.",
        "ru": "Существо, подвергшееся действию этого яда, должно преуспеть в спасброске Телосложения Сл 13, иначе оно станет отравленным на 24 часа. Существо также лишено сознания, пока отравлено. Существо приходит в сознание, если получает урон."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.contact"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.polunochnye_slyozy",
    "key": "polunochnye_slyozy",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Полуночные слёзы",
      "ru": "Полуночные слёзы"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Существо, проглотившее этот яд, до полуночи ни от чего не страдает. Если до этого момента яд не был нейтрализован, существо должно преуспеть в спасброске Телосложения Сл 17, получая 31 (9к6) урона ядом при провале или половину этого урона при успехе.",
        "ru": "Существо, проглотившее этот яд, до полуночи ни от чего не страдает. Если до этого момента яд не был нейтрализован, существо должно преуспеть в спасброске Телосложения Сл 17, получая 31 (9к6) урона ядом при провале или половину этого урона при успехе."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1500,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.ingested"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.pyl_mumii_imr",
    "key": "pyl_mumii_imr",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Пыль мумии (IMR)",
      "ru": "Пыль мумии (IMR)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Этот яд создается в процессе бальзамирования мумии, дистиллированной из удаленных органов мёртвого существа. Существо, подвергшееся воздействию этого яда, должно преуспеть в спасброске Телосложения Сл 12, иначе оно будет проклято гнилью мумии. Проклятое существо не может восстанавливать хиты и его максимум хитов уменьшается на 10 (3к6) за каждые прошедшие 24 часа. Если проклятие уменьшает максимум хитов существа до 0, существо умирает, а его тело превращается в пыль. Проклятие действует до тех пор, пока не будет снято заклинанием снятие проклятья или подобной магией.",
        "ru": "Этот яд создается в процессе бальзамирования мумии, дистиллированной из удаленных органов мёртвого существа. Существо, подвергшееся воздействию этого яда, должно преуспеть в спасброске Телосложения Сл 12, иначе оно будет проклято гнилью мумии. Проклятое существо не может восстанавливать хиты и его максимум хитов уменьшается на 10 (3к6) за каждые прошедшие 24 часа. Если проклятие уменьшает максимум хитов существа до 0, существо умирает, а его тело превращается в пыль. Проклятие действует до тех пор, пока не будет снято заклинанием снятие проклятья или подобной магией."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 0,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": true,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.inhaled"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.sliz_polzayuschego_padalschika",
    "key": "sliz_polzayuschego_padalschika",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Слизь ползающего падальщика",
      "ru": "Слизь ползающего падальщика"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Этот яд собирают с мёртвого или недееспособного ползающего падальщика. Существо, подвергшееся действию этого яда, должно преуспеть в спасброске Телосложения Сл 13, иначе оно станет отравленным на 1 минуту. Будучи отравленным, существо также парализовано. Существо может повторять спасбросок в конце каждого своего хода, оканчивая эффект на себе при успехе.",
        "ru": "Этот яд собирают с мёртвого или недееспособного ползающего падальщика. Существо, подвергшееся действию этого яда, должно преуспеть в спасброске Телосложения Сл 13, иначе оно станет отравленным на 1 минуту. Будучи отравленным, существо также парализовано. Существо может повторять спасбросок в конце каждого своего хода, оканчивая эффект на себе при успехе."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.contact"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.stupor",
    "key": "stupor",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Ступор",
      "ru": "Ступор"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Существо, подвергшееся действию этого яда, должно преуспеть в спасброске Телосложения Сл 15, иначе оно станет отравленным на 4к6 часов. Существо также недееспособно, пока отравлено.",
        "ru": "Существо, подвергшееся действию этого яда, должно преуспеть в спасброске Телосложения Сл 15, иначе оно станет отравленным на 4к6 часов. Существо также недееспособно, пока отравлено."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 600,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.ingested"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.syvorotka_pravdy",
    "key": "syvorotka_pravdy",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Сыворотка правды",
      "ru": "Сыворотка правды"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Существо, подвергшееся действию этого яда, должно преуспеть в спасброске Телосложения Сл 11, иначе станет отравленным на 1 час. Пока существо отравлено, оно не может сознательно говорить ложь, как если бы оно находилось под действием заклинания область истины.",
        "ru": "Существо, подвергшееся действию этого яда, должно преуспеть в спасброске Телосложения Сл 11, иначе станет отравленным на 1 час. Пока существо отравлено, оно не может сознательно говорить ложь, как если бы оно находилось под действием заклинания область истины."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 150,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.ingested"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.fessaltoksin_imr",
    "key": "fessaltoksin_imr",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Фессалтоксин (IMR)",
      "ru": "Фессалтоксин (IMR)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Этот яд был впервые создан из крови изобретателя Фессалара. Существо, подвергшееся яду, должно преуспеть в спасброске Телосложения Сл 15 или примет новую форму, как если бы оно было подвергнуто заклинанию превращение. Новая форма существа — случайный зверь или существо, которое оно видело в течение последних 24 часов (по выбору Мастера). Эта трансформация длится до конца следующего продолжительного отдыха цели. Этот эффект не подвергается рассеивание магии или снятию проклятья, но заклинание высшее восстановление возвращает существо в его первоначальную форму.",
        "ru": "Этот яд был впервые создан из крови изобретателя Фессалара. Существо, подвергшееся яду, должно преуспеть в спасброске Телосложения Сл 15 или примет новую форму, как если бы оно было подвергнуто заклинанию превращение. Новая форма существа — случайный зверь или существо, которое оно видело в течение последних 24 часов (по выбору Мастера). Эта трансформация длится до конца следующего продолжительного отдыха цели. Этот эффект не подвергается рассеивание магии или снятию проклятья, но заклинание высшее восстановление возвращает существо в его первоначальную форму."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 0,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": true,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.ingested_or_injury"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.shyopot_ivany_vrgr",
    "key": "shyopot_ivany_vrgr",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Шёпот Иваны (VRGR)",
      "ru": "Шёпот Иваны (VRGR)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Этот яд имеет явственный запах и химическое послание от Иваны Борици. Подвергшееся действию этого яда существо должно преуспеть в спасброске Телосложения Сл 18, иначе испытает эффект заклинания вещий сон, наложенного Иваной, в следующий раз, когда оно заснёт. Этот яд является немагическим, и Ивана не общается напрямую с тем, кто подвергся воздействию вещий сон. Скорее она создает иллюзию разговора со своей предполагаемой целью, алхимически формируя своё сообщение, предсказывая реакции своей цели и химически кодируя свои ответы. Она использует этот яд в качестве духов или прячет его в подарочных букетах, позволяя ему передать её послание позже.",
        "ru": "Этот яд имеет явственный запах и химическое послание от Иваны Борици. Подвергшееся действию этого яда существо должно преуспеть в спасброске Телосложения Сл 18, иначе испытает эффект заклинания вещий сон, наложенного Иваной, в следующий раз, когда оно заснёт. Этот яд является немагическим, и Ивана не общается напрямую с тем, кто подвергся воздействию вещий сон. Скорее она создает иллюзию разговора со своей предполагаемой целью, алхимически формируя своё сообщение, предсказывая реакции своей цели и химически кодируя свои ответы. Она использует этот яд в качестве духов или прячет его в подарочных букетах, позволяя ему передать её послание позже."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 0,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.3,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.inhaled"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.essentsiya_efira",
    "key": "essentsiya_efira",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Эссенция эфира",
      "ru": "Эссенция эфира"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Существо, подвергшееся действию этого яда, должно преуспеть в спасброске Телосложения Сл 15, иначе оно станет отравленным на 8 часов. Существо также लिहाно сознания, пока отравлено. Существо приходит в сознание, если получает урон или другое существо действием его потрясёт, чтобы разбудить.",
        "ru": "Существо, подвергшееся действию этого яда, должно преуспеть в спасброске Телосложения Сл 15, иначе оно станет отравленным на 8 часов. Существо также लिहाно сознания, пока отравлено. Существо приходит в сознание, если получает урон или другое существо действием его потрясёт, чтобы разбудить."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 300,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.inhaled"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.yad_viverny",
    "key": "yad_viverny",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Яд виверны",
      "ru": "Яд виверны"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Этот яд собирают с мёртвой или недееспособной виверны. Существо, подвергшееся действию этого яда, должно совершить спасбросок Телосложения Сл 15, получая при провале 24 (7к6) урона ядом или половину этого урона при успехе.",
        "ru": "Этот яд собирают с мёртвой или недееспособной виверны. Существо, подвергшееся действию этого яда, должно совершить спасбросок Телосложения Сл 15, получая при провале 24 (7к6) урона ядом или половину этого урона при успехе."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1200,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.injury"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.yad_drou",
    "key": "yad_drou",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Яд дроу",
      "ru": "Яд дроу"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Обычно этот яд изготавливают только дроу, к тому же в местах, где нет солнечного света. Существо, подвергшееся действию этого яда, должно преуспеть в спасброске Телосложения Сл 13, иначе оно станет отравленным на 1 час. Если спасбросок провален на 5 или больше единиц, существо также лишено сознания, пока отравлено. Существо приходит в сознание, если получает урон или другое существо действием его потрясёт, чтобы разбудить.",
        "ru": "Обычно этот яд изготавливают только дроу, к тому же в местах, где нет солнечного света. Существо, подвергшееся действию этого яда, должно преуспеть в спасброске Телосложения Сл 13, иначе оно станет отравленным на 1 час. Если спасбросок провален на 5 или больше единиц, существо также лишено сознания, пока отравлено. Существо приходит в сознание, если получает урон или другое существо действием его потрясёт, чтобы разбудить."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.injury"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.yad_lilovogo_chervya",
    "key": "yad_lilovogo_chervya",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Яд лилового червя",
      "ru": "Яд лилового червя"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Этот яд собирают с мёртвого или недееспособного лилового червя. Существо, подвергшееся действию этого яда, должно совершить спасбросок Телосложения Сл 19, получая при провале 42 (12к6) урона ядом, или половину этого урона при успехе.",
        "ru": "Этот яд собирают с мёртвого или недееспособного лилового червя. Существо, подвергшееся действию этого яда, должно совершить спасбросок Телосложения Сл 19, получая при провале 42 (12к6) урона ядом, или половину этого урона при успехе."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.3,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.injury"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.yad_prostoy",
    "key": "yad_prostoy",
    "type": "item",
    "templateId": "mygame.temp.poison",
    "name": {
      "en": "Яд, простой",
      "ru": "Яд, простой"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Вы можете Бонусным действием покрыть ядом из этого флакона одно оружие или не более трёх боеприпасов. Существо, которому наносится Колющий или Рубящий урон от отравленного оружия или боеприпаса, получает 1к4 дополнительного урона Ядом. Нанесённый яд эффективен 1 минуту, или пока им не будет нанесён урон, в зависимости от того, что произойдёт раньше.",
        "ru": "Вы можете Бонусным действием покрыть ядом из этого флакона одно оружие или не более трёх боеприпасов. Существо, которому наносится Колющий или Рубящий урон от отравленного оружия или боеприпаса, получает 1к4 дополнительного урона Ядом. Нанесённый яд эффективен 1 минуту, или пока им не будет нанесён урон, в зависимости от того, что произойдёт раньше."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 100,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.poison",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_poison_type": "wsg.ref.value.poison_type.injury"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.balzam_murusy",
    "key": "balzam_murusy",
    "type": "item",
    "templateId": "mygame.temp.substance",
    "name": {
      "en": "Бальзам мурусы",
      "ru": "Бальзам мурусы"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Эта паста, приготовленная из куста мурусы, как известно, помогает предотвращать солнечные ожоги, но также она известна как огнеупорное средство. Потратив 1 минуту на нанесение четверти пинты (150 мл) бальзама мурусы на кожу, вы на 1 час приобретаете сопротивление урону огнём. Доза бальзама муруса, необходимая для лечения солнечных ожогов, стоит 1 зм.",
        "ru": "Эта паста, приготовленная из куста мурусы, как известно, помогает предотвращать солнечные ожоги, но также она известна как огнеупорное средство. Потратив 1 минуту на нанесение четверти пинты (150 мл) бальзама мурусы на кожу, вы на 1 час приобретаете сопротивление урону огнём. Доза бальзама муруса, необходимая для лечения солнечных ожогов, стоит 1 зм."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 100,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.3,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.substance",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_substance_type": "wsg.ref.value.substance_type.substance"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.beloe_semya_prizrachnoy_orhidei",
    "key": "beloe_semya_prizrachnoy_orhidei",
    "type": "item",
    "templateId": "mygame.temp.substance",
    "name": {
      "en": "Белое семя призрачной орхидеи",
      "ru": "Белое семя призрачной орхидеи"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Реже орхидеи производят более мелкий стручок, содержащий одно белое семя. Среди его различных магических свойств, если белое семя смолоть и рассыпать над трупом, на тело действует эффект заклинания воскрешение. Белое семя призрачной орхидеи не имеет эффекта, если его съесть.",
        "ru": "Реже орхидеи производят более мелкий стручок, содержащий одно белое семя. Среди его различных магических свойств, если белое семя смолоть и рассыпать над трупом, на тело действует эффект заклинания воскрешение. Белое семя призрачной орхидеи не имеет эффекта, если его съесть."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 0,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.substance",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_substance_type": "wsg.ref.value.substance_type.substance"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.drakonya_krov",
    "key": "drakonya_krov",
    "type": "item",
    "templateId": "mygame.temp.substance",
    "name": {
      "en": "Драконья кровь",
      "ru": "Драконья кровь"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Ввезенная в Шарн кланом Дааск, драконья кровь является мощным стимулятором, вызывающим сильное привыкание. В дополнение к вызову эйфории, он может усиливать способности к заклинательству или даже временно наделить потребителя способностью накладывать заклинания чародея. Действие препарата потенциально опасно и всегда непредсказуемо. Это не то, что должен хотеть использовать персонаж игрока; авантюристы, скорее всего, будут мешать контрабандистам клана Дааск или иметь дело с наркоманом, который случайно метает огненный шар на переполненной улице. Конкретные эффекты драконьей крови зависят от вас, но вы можете черпать вдохновение из таблицы «Волна дикой магии» из «Книги Игрока».",
        "ru": "Ввезенная в Шарн кланом Дааск, драконья кровь является мощным стимулятором, вызывающим сильное привыкание. В дополнение к вызову эйфории, он может усиливать способности к заклинательству или даже временно наделить потребителя способностью накладывать заклинания чародея. Действие препарата потенциально опасно и всегда непредсказуемо. Это не то, что должен хотеть использовать персонаж игрока; авантюристы, скорее всего, будут мешать контрабандистам клана Дааск или иметь дело с наркоманом, который случайно метает огненный шар на переполненной улице. Конкретные эффекты драконьей крови зависят от вас, но вы можете черпать вдохновение из таблицы «Волна дикой магии» из «Книги Игрока»."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 0,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.substance",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_substance_type": "wsg.ref.value.substance_type.drug"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koren_teki",
    "key": "koren_teki",
    "type": "item",
    "templateId": "mygame.temp.substance",
    "name": {
      "en": "Корень тэки",
      "ru": "Корень тэки"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Этот толстый болотный корень довольно горький на вкус, но считается, что он полезен для пищеварения. Действием вы можете употребить порцию, получая на 8 часов преимущество на спасброски, совершаемые против воздействия ядовитых или токсичных веществ.",
        "ru": "Этот толстый болотный корень довольно горький на вкус, но считается, что он полезен для пищеварения. Действием вы можете употребить порцию, получая на 8 часов преимущество на спасброски, совершаемые против воздействия ядовитых или токсичных веществ."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 3,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.substance",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_substance_type": "wsg.ref.value.substance_type.substance"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.list_olisuba",
    "key": "list_olisuba",
    "type": "item",
    "templateId": "mygame.temp.substance",
    "name": {
      "en": "Лист олисуба",
      "ru": "Лист олисуба"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Эти высушенные листья дерева олисуб при замачивании для приготовления чая помогают организму восстановиться после напряжённой деятельности. Если вы выпьете дозу чая из листьев олисуба во время продолжительного отдыха, по его окончании количество ваших степеней истощения снизится на 2 вместо 1.",
        "ru": "Эти высушенные листья дерева олисуб при замачивании для приготовления чая помогают организму восстановиться после напряжённой деятельности. Если вы выпьете дозу чая из листьев олисуба во время продолжительного отдыха, по его окончании количество ваших степеней истощения снизится на 2 вместо 1."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 50,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.substance",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_substance_type": "wsg.ref.value.substance_type.substance"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.maslo_tenistoy_ivy",
    "key": "maslo_tenistoy_ivy",
    "type": "item",
    "templateId": "mygame.temp.substance",
    "name": {
      "en": "Масло тенистой ивы",
      "ru": "Масло тенистой ивы"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Тёмно-синее масло можно извлечь из редких плодов тенистой ивы. Существо может действием нанести масло на другое существо, которое окаменело менее 1 минуты назад, в результате чего окаменение оканчивается в начале его следующего хода.",
        "ru": "Тёмно-синее масло можно извлечь из редких плодов тенистой ивы. Существо может действием нанести масло на другое существо, которое окаменело менее 1 минуты назад, в результате чего окаменение оканчивается в начале его следующего хода."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 30,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.substance",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_substance_type": "wsg.ref.value.substance_type.substance"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.protivoyadie",
    "key": "protivoyadie",
    "type": "item",
    "templateId": "mygame.temp.substance",
    "name": {
      "en": "Противоядие",
      "ru": "Противоядие"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Бонусным действием вы можете выпить флакон с Противоядием и получить Преимущество на спасброски, чтобы избежать или окончить состояние Отравленное.",
        "ru": "Бонусным действием вы можете выпить флакон с Противоядием и получить Преимущество на спасброски, чтобы избежать или окончить состояние Отравленное."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 50,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.substance",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_substance_type": "wsg.ref.value.substance_type.substance"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.soli_proritsaniya",
    "key": "soli_proritsaniya",
    "type": "item",
    "templateId": "mygame.temp.substance",
    "name": {
      "en": "Соли прорицания",
      "ru": "Соли прорицания"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Соли прорицания получают из природного кристаллического вещества, обнаруженного в дебрях Мискатской гряды. Алые кристаллы были добыты из пещерных жил, подобных тем, что находятся в устье шахты Мискат, и были найдены в более мелких формациях жеод вблизи мест, разрушенных Катастрофой. Соли прорицания употребляются перорально дозами размером с леденец, и частые потребители могут быть идентифицированы по характерному малиновому пятну около рта. Существо, употребившее дозу соли прорицания, в течение 1к4 часов совершает с преимуществом проверки Интеллекта. За каждую потреблённую дозу соли прорицания существо должно преуспеть в спасброске Телосложения Сл 15, иначе получит одну степень истощения. Данный эффект накапливается при многократном употреблении.",
        "ru": "Соли прорицания получают из природного кристаллического вещества, обнаруженного в дебрях Мискатской гряды. Алые кристаллы были добыты из пещерных жил, подобных тем, что находятся в устье шахты Мискат, и были найдены в более мелких формациях жеод вблизи мест, разрушенных Катастрофой. Соли прорицания употребляются перорально дозами размером с леденец, и частые потребители могут быть идентифицированы по характерному малиновому пятну около рта. Существо, употребившее дозу соли прорицания, в течение 1к4 часов совершает с преимуществом проверки Интеллекта. За каждую потреблённую дозу соли прорицания существо должно преуспеть в спасброске Телосложения Сл 15, иначе получит одну степень истощения. Данный эффект накапливается при многократном употреблении."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 150,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.substance",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_substance_type": "wsg.ref.value.substance_type.drug"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.sonnaya_liliya",
    "key": "sonnaya_liliya",
    "type": "item",
    "templateId": "mygame.temp.substance",
    "name": {
      "en": "Сонная лилия",
      "ru": "Сонная лилия"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Эссенция сонной лилии — это сарлонский опиат, психоактивная жидкость, которая имеет вкус и запах вашего любимого напитка. Впервые был завезён в качестве обезболивающего во времена Последней Войны, но ныне он является веществом, которым наиболее часто злоупотребляют в Шарне. Хотя сонная лилия законна, если используется в медицинских целях, но она сильно облагается налогом, и поэтому большинство сонной лилии ввозится контрабандой и продаётся на чёрном рынке. Притон сонной лилии можно найти в нижних районах. Употребление сонной лилии вызывает дезориентирующую эйфорию и удивительную устойчивость к боли. Существо под воздействием сонной лилии становится отравленным на 1 час. Будучи отравленным подобным образом, существо имеет иммунитет к состоянию «испуганный», и в первый раз, когда его хиты опускаются до 0, но при этом оно не убито, его хиты вместо этого опускаются до 1. Доза сонной лилии стоит около 1 зм или в десять раз больше, если покупать её по легальным каналам. Однако существует множество разновидностей препарата, и продолжительность — как и цена — могут варьироваться.",
        "ru": "Эссенция сонной лилии — это сарлонский опиат, психоактивная жидкость, которая имеет вкус и запах вашего любимого напитка. Впервые был завезён в качестве обезболивающего во времена Последней Войны, но ныне он является веществом, которым наиболее часто злоупотребляют в Шарне. Хотя сонная лилия законна, если используется в медицинских целях, но она сильно облагается налогом, и поэтому большинство сонной лилии ввозится контрабандой и продаётся на чёрном рынке. Притон сонной лилии можно найти в нижних районах. Употребление сонной лилии вызывает дезориентирующую эйфорию и удивительную устойчивость к боли. Существо под воздействием сонной лилии становится отравленным на 1 час. Будучи отравленным подобным образом, существо имеет иммунитет к состоянию «испуганный», и в первый раз, когда его хиты опускаются до 0, но при этом оно не убито, его хиты вместо этого опускаются до 1. Доза сонной лилии стоит около 1 зм или в десять раз больше, если покупать её по легальным каналам. Однако существует множество разновидностей препарата, и продолжительность — как и цена — могут варьироваться."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.substance",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_substance_type": "wsg.ref.value.substance_type.drug"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.trupnyy_ihor",
    "key": "trupnyy_ihor",
    "type": "item",
    "templateId": "mygame.temp.substance",
    "name": {
      "en": "Трупный ихор",
      "ru": "Трупный ихор"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Эта горькая шартрезная смесь дистиллирована из гриба, произрастающего в бесплодных землях Губительных берегов. Тошнотворный зелёный ликёр обладает мощными психоделическими свойствами. Существо, потребившее дозу данного вещества, при условии что оно не является Конструктом или Нежитью, в течение 1 часа совершает с преимуществом проверки Интеллекта и Мудрости, а также имеет уязвимость к урону психической энергией. За каждую потреблённую дозу трупного ихора существо должно преуспеть в спасброске Телосложения Сл 15, иначе станет отравленным на 1к6 часов и в течение 1 минуты будет подвержено эффекту заклинания смятение. Нежить, употребляющая дозу трупного ихора, в течение 1 часа совершает с преимуществом все проверки Ловкости и получает иммунитет к состоянию «испуганный».",
        "ru": "Эта горькая шартрезная смесь дистиллирована из гриба, произрастающего в бесплодных землях Губительных берегов. Тошнотворный зелёный ликёр обладает мощными психоделическими свойствами. Существо, потребившее дозу данного вещества, при условии что оно не является Конструктом или Нежитью, в течение 1 часа совершает с преимуществом проверки Интеллекта и Мудрости, а также имеет уязвимость к урону психической энергией. За каждую потреблённую дозу трупного ихора существо должно преуспеть в спасброске Телосложения Сл 15, иначе станет отравленным на 1к6 часов и в течение 1 минуты будет подвержено эффекту заклинания смятение. Нежить, употребляющая дозу трупного ихора, в течение 1 часа совершает с преимуществом все проверки Ловкости и получает иммунитет к состоянию «испуганный»."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.substance",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_substance_type": "wsg.ref.value.substance_type.drug"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.chyornoe_semya_prizrachnoy_orhidei",
    "key": "chyornoe_semya_prizrachnoy_orhidei",
    "type": "item",
    "templateId": "mygame.temp.substance",
    "name": {
      "en": "Чёрное семя призрачной орхидеи",
      "ru": "Чёрное семя призрачной орхидеи"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Каждые несколько лет в колонии призрачных орхидей вырастает черный стручок толщиной с человеческий кулак, содержащий три мягких чёрных семени. На существо, съевшее одно из этих чёрных семян, действует эффект заклинания притворная смерть. Если существо не знает об эффектах семени или не желает, чтобы на него воздействовал эффект, оно может противостоять ему, преуспев в спасброске Телосложения Сл 16. В противном случае оно считается согласным для получения эффекта заклинания.",
        "ru": "Каждые несколько лет в колонии призрачных орхидей вырастает черный стручок толщиной с человеческий кулак, содержащий три мягких чёрных семени. На существо, съевшее одно из этих чёрных семян, действует эффект заклинания притворная смерть. Если существо не знает об эффектах семени или не желает, чтобы на него воздействовал эффект, оно может противостоять ему, преуспев в спасброске Телосложения Сл 16. В противном случае оно считается согласным для получения эффекта заклинания."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 0,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.substance",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_substance_type": "wsg.ref.value.substance_type.substance"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.chyornyy_sok",
    "key": "chyornyy_sok",
    "type": "item",
    "templateId": "mygame.temp.substance",
    "name": {
      "en": "Чёрный сок",
      "ru": "Чёрный сок"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Эта смолистая субстанция, собранная с тёмных ветвей смертоносной ивы, является мощным опьяняющим средством. Её можно курить в виде концентрата или вводить непосредственно в кровь. Существо, употребляющее дозу чёрного сока, не может быть очаровано или испугано в течение 1к6 часов. За каждую потреблённую дозу чёрного сока существо должно преуспеть в спасброске Телосложения Сл 15, иначе станет отравленным на 2к4 часов. Этот эффект суммируется при многократных употреблениях.",
        "ru": "Эта смолистая субстанция, собранная с тёмных ветвей смертоносной ивы, является мощным опьяняющим средством. Её можно курить в виде концентрата или вводить непосредственно в кровь. Существо, употребляющее дозу чёрного сока, не может быть очаровано или испугано в течение 1к6 часов. За каждую потреблённую дозу чёрного сока существо должно преуспеть в спасброске Телосложения Сл 15, иначе станет отравленным на 2к4 часов. Этот эффект суммируется при многократных употреблениях."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 300,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.substance",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_substance_type": "wsg.ref.value.substance_type.drug"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kislota",
    "key": "kislota",
    "type": "item",
    "templateId": "mygame.temp.substance",
    "name": {
      "en": "Кислота",
      "ru": "Кислота"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы совершаете действие Атака, вы можете заменить одну из своих атак метанием флакона с Кислотой. Выберите один видимый вами объект или существо в пределах 20 футов от вас. Цель должна преуспеть в спасброске Ловкости (Сл 8 + ваш модификатор Ловкости + ваш Бонус владения), иначе получит 2к6 урона Кислотой.",
        "ru": "Когда вы совершаете действие Атака, вы можете заменить одну из своих атак метанием флакона с Кислотой. Выберите один видимый вами объект или существо в пределах 20 футов от вас. Цель должна преуспеть в спасброске Ловкости (Сл 8 + ваш модификатор Ловкости + ваш Бонус владения), иначе получит 2к6 урона Кислотой."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 25,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.substance",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_substance_type": "wsg.ref.value.substance_type.substance"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.maslo",
    "key": "maslo",
    "type": "item",
    "templateId": "mygame.temp.substance",
    "name": {
      "en": "Масло",
      "ru": "Масло"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Вы можете облить Маслом существо, объект или область, либо же использовать его как топливо, как описано ниже. Обливание существа или объекта. Совершая действие Атака, вы можете заменить одну из своих атак метанием фляги с Маслом... Обливание области. Действием Использование вы можете вылить фляжку Масла на ровную землю... Топливо. Масло используется в качестве топлива для Ламп и Фонарей.",
        "ru": "Вы можете облить Маслом существо, объект или область, либо же использовать его как топливо, как описано ниже. Обливание существа или объекта. Совершая действие Атака, вы можете заменить одну из своих атак метанием фляги с Маслом... Обливание области. Действием Использование вы можете вылить фляжку Масла на ровную землю... Топливо. Масло используется в качестве топлива для Ламп и Фонарей."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.sp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 999999,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.substance",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": true,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_substance_type": "wsg.ref.value.substance_type.substance"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.alhimicheskiy_ogon",
    "key": "alhimicheskiy_ogon",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Алхимический огонь",
      "ru": "Алхимический огонь"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы совершаете действие Атака, вы можете заменить одну из своих атак метанием фляжки с Алхимическим огнём. Выберите один видимый вами объект или существо в пределах 20 футов от вас. Цель должна преуспеть в спасброске Ловкости (Сл 8 + ваш модификатор Ловкости + ваш Бонус владения), иначе получит 1к4 урона Огнём и начнёт гореть (см. глоссарий правил).",
        "ru": "Когда вы совершаете действие Атака, вы можете заменить одну из своих атак метанием фляжки с Алхимическим огнём. Выберите один видимый вами объект или существо в пределах 20 футов от вас. Цель должна преуспеть в спасброске Ловкости (Сл 8 + ваш модификатор Ловкости + ваш Бонус владения), иначе получит 1к4 урона Огнём и начнёт гореть (см. глоссарий правил)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 50,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.blok_i_lebyodka",
    "key": "blok_i_lebyodka",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Блок и лебёдка",
      "ru": "Блок и лебёдка"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Блок и лебёдка позволяют вам поднять вес в четыре раза больший, чем обычно.",
        "ru": "Блок и лебёдка позволяют вам поднять вес в четыре раза больший, чем обычно."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 5.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.bochka",
    "key": "bochka",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Бочка",
      "ru": "Бочка"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Бочка вмещает не более 40 галлонов жидкости или 4 кубических футов других товаров.",
        "ru": "Бочка вмещает не более 40 галлонов жидкости или 4 кубических футов других товаров."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 40.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.bumaga_list",
    "key": "bumaga_list",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Бумага (лист)",
      "ru": "Бумага (лист)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "На один лист Бумаги помещается около 250 рукописных слов.",
        "ru": "На один лист Бумаги помещается около 250 рукописных слов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.sp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.burdyuk",
    "key": "burdyuk",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Бурдюк",
      "ru": "Бурдюк"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Бурдюк вмещает не более 4 пинт. Если вы не пьёте достаточно воды, вы рискуете получить Обезвоживание (см. глоссарий правил).",
        "ru": "Бурдюк вмещает не более 4 пинт. Если вы не пьёте достаточно воды, вы рискуете получить Обезвоживание (см. глоссарий правил)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.sp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.butylka_steklyannaya",
    "key": "butylka_steklyannaya",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Бутылка, стеклянная",
      "ru": "Бутылка, стеклянная"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Стеклянная бутылка вмещает не более 1 1/2 пинты (0,75 л).",
        "ru": "Стеклянная бутылка вмещает не более 1 1/2 пинты (0,75 л)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.vedro",
    "key": "vedro",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Ведро",
      "ru": "Ведро"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Ведро вмещает не более половины кубического фута содержимого.",
        "ru": "Ведро вмещает не более половины кубического фута содержимого."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.cp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.veryovka",
    "key": "veryovka",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Верёвка",
      "ru": "Верёвка"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Действием Использование вы можете завязать на Верёвке узел, если преуспеете в проверке Ловкости (Ловкость рук) Сл 10. Верёвка может быть разорвана успешной проверкой Силы (Атлетика) Сл 20. Вы можете связать Верёвкой несогласное существо, только если оно является Схваченным, Недееспособным или Опутанным. Если ноги существа связаны, оно становится Опутанным, пока не освободится. Чтобы освободиться от Верёвки, существо должно действием преуспеть в проверке Ловкости (Акробатика) Сл 15.",
        "ru": "Действием Использование вы можете завязать на Верёвке узел, если преуспеете в проверке Ловкости (Ловкость рук) Сл 10. Верёвка может быть разорвана успешной проверкой Силы (Атлетика) Сл 20. Вы можете связать Верёвкой несогласное существо, только если оно является Схваченным, Недееспособным или Опутанным. Если ноги существа связаны, оно становится Опутанным, пока не освободится. Чтобы освободиться от Верёвки, существо должно действием преуспеть в проверке Ловкости (Акробатика) Сл 15."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 10.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.gorshok_zheleznyy",
    "key": "gorshok_zheleznyy",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Горшок, железный",
      "ru": "Горшок, железный"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Железный горшок вмещает не более 1 галлона (3,75 литра).",
        "ru": "Железный горшок вмещает не более 1 галлона (3,75 литра)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 10.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.duhi",
    "key": "duhi",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Духи",
      "ru": "Духи"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Духи содержатся в 4унцевом (100 грамм) флаконе. В течение 1 часа после того, как вы нанесли на себя Духи, вы совершаете с Преимуществом проверки Харизмы (Убеждение), совершаемые для того, чтобы повлиять на Равнодушных Гуманоидов в пределах 5 футов от вас.",
        "ru": "Духи содержатся в 4унцевом (100 грамм) флаконе. В течение 1 часа после того, как вы нанесли на себя Духи, вы совершаете с Преимуществом проверки Харизмы (Убеждение), совершаемые для того, чтобы повлиять на Равнодушных Гуманоидов в пределах 5 футов от вас."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.2,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zamok",
    "key": "zamok",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Замок",
      "ru": "Замок"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Вместе с Замком идёт и ключ. Без ключа существо может вскрыть Замок, преуспев в проверке Ловкости (Ловкость рук) Сл 15 с использованием Воровских инструментов.",
        "ru": "Вместе с Замком идёт и ключ. Без ключа существо может вскрыть Замок, преуспев в проверке Ловкости (Ловкость рук) Сл 15 с использованием Воровских инструментов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.zerkalo",
    "key": "zerkalo",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Зеркало",
      "ru": "Зеркало"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Ручное Зеркало из стали полезно не только для нанесения косметики, но и чтобы заглядывать за углы и подавать сигнал отражённым светом.",
        "ru": "Ручное Зеркало из стали полезно не только для нанесения косметики, но и чтобы заглядывать за углы и подавать сигнал отражённым светом."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kaltropy",
    "key": "kaltropy",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Калтропы",
      "ru": "Калтропы"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Действием Использование вы можете разложить Калтропы из сумки, покрывая область 5 × 5 футов в пределах 5 футов от вас. Существо, впервые за ход входящее в эту область, должно преуспеть в спасброске Ловкости Сл 15, иначе получит 1 Колющего урона, и его Скорость снизится до 0 до начала его следующего хода. На сбор Калтропов уходит 10 минут.",
        "ru": "Действием Использование вы можете разложить Калтропы из сумки, покрывая область 5 × 5 футов в пределах 5 футов от вас. Существо, впервые за ход входящее в эту область, должно преуспеть в спасброске Ловкости Сл 15, иначе получит 1 Колющего урона, и его Скорость снизится до 0 до начала его следующего хода. На сбор Калтропов уходит 10 минут."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kandaly",
    "key": "kandaly",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Кандалы",
      "ru": "Кандалы"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Действием Использование вы можете оковать Кандалами несогласное существо Маленького или Среднего размера в пределах 5 футов от вас, если оно Схвачено, Недееспособно или Опутано, и если вы преуспеете в проверке Ловкости (Ловкость рук) Сл 13. Окованное существо совершает с Помехой броски атаки и становится Опутанным, если Кандалы закреплены на одном месте крюком или цепью. Существо может действием освободиться от Кандалов, если преуспеет в проверке Ловкости (Ловкость рук) Сл 20. Кандалы можно разорвать действием, преуспев в проверке Силы (Атлетика) Сл 25. К каждому набору Кандалов прилагается ключ. Без ключа существо может взломать кандалы с использованием Воровских инструментов, преуспев в проверке Ловкости (Ловкость рук) Сл 15.",
        "ru": "Действием Использование вы можете оковать Кандалами несогласное существо Маленького или Среднего размера в пределах 5 футов от вас, если оно Схвачено, Недееспособно или Опутано, и если вы преуспеете в проверке Ловкости (Ловкость рук) Сл 13. Окованное существо совершает с Помехой броски атаки и становится Опутанным, если Кандалы закреплены на одном месте крюком или цепью. Существо может действием освободиться от Кандалов, если преуспеет в проверке Ловкости (Ловкость рук) Сл 20. Кандалы можно разорвать действием, преуспев в проверке Силы (Атлетика) Сл 25. К каждому набору Кандалов прилагается ключ. Без ключа существо может взломать кандалы с использованием Воровских инструментов, преуспев в проверке Ловкости (Ловкость рук) Сл 15."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 6.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.karta",
    "key": "karta",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Карта",
      "ru": "Карта"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Если вы сверяетесь с точной картой, вы получаете бонус +5 к проверкам Мудрости (Выживание), совершаемым для поиска пути в изображенном на ней месте.",
        "ru": "Если вы сверяетесь с точной картой, вы получаете бонус +5 к проверкам Мудрости (Выживание), совершаемым для поиска пути в изображенном на ней месте."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kniga",
    "key": "kniga",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Книга",
      "ru": "Книга"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Книга может быть художественной или нехудожественной. Если вы обращаетесь к нехудожественной книге в хорошем состоянии, посвящённой какому-либо вопросу, то получаете бонус +5 к проверкам Интеллекта (История, Природа, Религия или Тайная магия) по этой теме.",
        "ru": "Книга может быть художественной или нехудожественной. Если вы обращаетесь к нехудожественной книге в хорошем состоянии, посвящённой какому-либо вопросу, то получаете бонус +5 к проверкам Интеллекта (История, Природа, Религия или Тайная магия) по этой теме."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 25,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 5.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kolokolchik",
    "key": "kolokolchik",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Колокольчик",
      "ru": "Колокольчик"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Действием Использование можно позвонить в Колокольчик и издать звук, слышимый на расстоянии не более 60 футов.",
        "ru": "Действием Использование можно позвонить в Колокольчик и издать звук, слышимый на расстоянии не более 60 футов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kolchan",
    "key": "kolchan",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Колчан",
      "ru": "Колчан"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Колчан вмещает не более 20 Стрел.",
        "ru": "Колчан вмещает не более 20 Стрел."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.komplekt_dlya_lazaniya",
    "key": "komplekt_dlya_lazaniya",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Комплект для лазания",
      "ru": "Комплект для лазания"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Комплект для лазания включает в себя накладные подошвы, перчатки, страховочную привязь и шлямбуры. Действием Использование вы можете применить Комплект для лазания, чтобы закрепиться; сделав это, вы не сможете упасть более чем на 25 футов от точки страховки и не сможете переместиться от неё более чем на 25 футов, не открепившись Бонусным действием.",
        "ru": "Комплект для лазания включает в себя накладные подошвы, перчатки, страховочную привязь и шлямбуры. Действием Использование вы можете применить Комплект для лазания, чтобы закрепиться; сделав это, вы не сможете упасть более чем на 25 футов от точки страховки и не сможете переместиться от неё более чем на 25 футов, не открепившись Бонусным действием."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 25,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 12.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.komplekt_tselitelya",
    "key": "komplekt_tselitelya",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Комплект целителя",
      "ru": "Комплект целителя"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Комплект целителя рассчитан на десять применений. Действием Использование вы можете потратить одно из них и стабилизировать Бессознательное существо с 0 Хитов, не совершая проверку Мудрости (Медицина).",
        "ru": "Комплект целителя рассчитан на десять применений. Действием Использование вы можете потратить одно из них и стабилизировать Бессознательное существо с 0 Хитов, не совершая проверку Мудрости (Медицина)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 3.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.korzina",
    "key": "korzina",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Корзина",
      "ru": "Корзина"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Корзина вмещает груз объёмом не более 2 кубических футов и весом не более 40 фунтов.",
        "ru": "Корзина вмещает груз объёмом не более 2 кубических футов и весом не более 40 фунтов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4,
        "currency": "wsg.ref.value.currency.sp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kostyum",
    "key": "kostyum",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Костюм",
      "ru": "Костюм"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Надев Костюм, вы совершаете с Преимуществом проверки характеристик, направленные на то, чтобы выдать себя за кого-то, кому присущ подобный наряд.",
        "ru": "Надев Костюм, вы совершаете с Преимуществом проверки характеристик, направленные на то, чтобы выдать себя за кого-то, кому присущ подобный наряд."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 4.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.koshel",
    "key": "koshel",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Кошель",
      "ru": "Кошель"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Кошель вмещает не более 6 фунтов веса в объёме не более 1/5 кубического фута.",
        "ru": "Кошель вмещает не более 6 фунтов веса в объёме не более 1/5 кубического фута."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.sp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kryuk_koshka",
    "key": "kryuk_koshka",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Крюк-кошка",
      "ru": "Крюк-кошка"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Действием Использование вы можете забросить крюк-кошку на перила, выступ или другое подходящее место в пределах 50 футов от вас; крюк зацепится, если вы преуспеете в проверке Ловкости (Акробатика) Сл 13. Если вы привязали к крюку Верёвку, то вы сможете по ней залезть.",
        "ru": "Действием Использование вы можете забросить крюк-кошку на перила, выступ или другое подходящее место в пределах 50 футов от вас; крюк зацепится, если вы преуспеете в проверке Ловкости (Акробатика) Сл 13. Если вы привязали к крюку Верёвку, то вы сможете по ней залезть."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 4.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.kuvshin",
    "key": "kuvshin",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Кувшин",
      "ru": "Кувшин"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Кувшин вмещает не более 1 галлона (3,75 литра).",
        "ru": "Кувшин вмещает не более 1 галлона (3,75 литра)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.cp"
      },
      "wsg.ref.parameter.item_weight": 4.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.lampa",
    "key": "lampa",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Лампа",
      "ru": "Лампа"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Лампа заправляется Маслом и при горении испускает Яркий свет в пределах 15 футов и Тусклый свет в пределах ещё 30 футов.",
        "ru": "Лампа заправляется Маслом и при горении испускает Яркий свет в пределах 15 футов и Тусклый свет в пределах ещё 30 футов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.sp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.leska",
    "key": "leska",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Леска",
      "ru": "Леска"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Длина лески — 10 футов. Вы можете завязать на ней узел действием Использование.",
        "ru": "Длина лески — 10 футов. Вы можете завязать на ней узел действием Использование."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.sp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.lestnitsa",
    "key": "lestnitsa",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Лестница",
      "ru": "Лестница"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Высота лестницы составляет 10 футов. Передвижение по ней вверх или вниз считается лазанием.",
        "ru": "Высота лестницы составляет 10 футов. Передвижение по ней вверх или вниз считается лазанием."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.sp"
      },
      "wsg.ref.parameter.item_weight": 25.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.lomik",
    "key": "lomik",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Ломик",
      "ru": "Ломик"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Вы совершаете с Преимуществом проверки Силы, если используете Ломик там, где он может быть применён как рычаг.",
        "ru": "Вы совершаете с Преимуществом проверки Силы, если используете Ломик там, где он может быть применён как рычаг."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 5.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.lopata",
    "key": "lopata",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Лопата",
      "ru": "Лопата"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Вы можете использовать Лопату, чтобы за 1 час работы выкопать в почве или подобном материале яму в виде куба со стороной 5 футов.",
        "ru": "Вы можете использовать Лопату, чтобы за 1 час работы выкопать в почве или подобном материале яму в виде куба со стороной 5 футов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 5.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.magicheskaya_fokusirovka_kristall",
    "key": "magicheskaya_fokusirovka_kristall",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Магическая фокусировка (Кристалл)",
      "ru": "Магическая фокусировка (Кристалл)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Такие предметы украшаются самоцветами или резьбой для проведения тайной магии. Волшебники, Колдуны и Чародеи могут использовать Магическую фокусировку в качестве Заклинательной фокусировки.",
        "ru": "Такие предметы украшаются самоцветами или резьбой для проведения тайной магии. Волшебники, Колдуны и Чародеи могут использовать Магическую фокусировку в качестве Заклинательной фокусировки."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.magicheskaya_fokusirovka_sfera",
    "key": "magicheskaya_fokusirovka_sfera",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Магическая фокусировка (Сфера)",
      "ru": "Магическая фокусировка (Сфера)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Такие предметы украшаются самоцветами или резьбой для проведения тайной магии. Волшебники, Колдуны и Чародеи могут использовать Магическую фокусировку в качестве Заклинательной фокусировки.",
        "ru": "Такие предметы украшаются самоцветами или резьбой для проведения тайной магии. Волшебники, Колдуны и Чародеи могут использовать Магическую фокусировку в качестве Заклинательной фокусировки."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 20,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 3.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.magicheskaya_fokusirovka_zhezl",
    "key": "magicheskaya_fokusirovka_zhezl",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Магическая фокусировка (Жезл)",
      "ru": "Магическая фокусировка (Жезл)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Такие предметы украшаются самоцветами или резьбой для проведения тайной магии. Волшебники, Колдуны и Чародеи могут использовать Магическую фокусировку в качестве Заклинательной фокусировки.",
        "ru": "Такие предметы украшаются самоцветами или резьбой для проведения тайной магии. Волшебники, Колдуны и Чародеи могут использовать Магическую фокусировку в качестве Заклинательной фокусировки."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.magicheskaya_fokusirovka_posoh",
    "key": "magicheskaya_fokusirovka_posoh",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Магическая фокусировка (Посох)",
      "ru": "Магическая фокусировка (Посох)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Такие предметы украшаются самоцветами или резьбой для проведения тайной магии. Волшебники, Колдуны и Чародеи могут использовать Магическую фокусировку в качестве Заклинательной фокусировки.",
        "ru": "Такие предметы украшаются самоцветами или резьбой для проведения тайной магии. Волшебники, Колдуны и Чародеи могут использовать Магическую фокусировку в качестве Заклинательной фокусировки."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 4.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.magicheskaya_fokusirovka_volshebnaya_palochka",
    "key": "magicheskaya_fokusirovka_volshebnaya_palochka",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Магическая фокусировка (Волшебная палочка)",
      "ru": "Магическая фокусировка (Волшебная палочка)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Такие предметы украшаются самоцветами или резьбой для проведения тайной магии. Волшебники, Колдуны и Чародеи могут использовать Магическую фокусировку в качестве Заклинательной фокусировки.",
        "ru": "Такие предметы украшаются самоцветами или резьбой для проведения тайной магии. Волшебники, Колдуны и Чародеи могут использовать Магическую фокусировку в качестве Заклинательной фокусировки."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.mantiya",
    "key": "mantiya",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Мантия",
      "ru": "Мантия"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Мантия имеет профессиональное или церемониальное значение. На некоторые мероприятия и в некоторые места допускаются только существа одетые в Мантии определённых цветов или с определёнными знаками.",
        "ru": "Мантия имеет профессиональное или церемониальное значение. На некоторые мероприятия и в некоторые места допускаются только существа одетые в Мантии определённых цветов или с определёнными знаками."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 4.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.metallicheskie_shariki",
    "key": "metallicheskie_shariki",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Металлические шарики",
      "ru": "Металлические шарики"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Действием Использование вы можете высыпать Металлические шарики из мешочка. Они покрывают область 10 × 10 футов в пределах 10 футов от вас. Существо, впервые за ход входящее в эту область, должно преуспеть в спасброске Ловкости Сл 10, иначе станет Сбитым с ног. На сбор Металлических шариков уходит 10 минут.",
        "ru": "Действием Использование вы можете высыпать Металлические шарики из мешочка. Они покрывают область 10 × 10 футов в пределах 10 футов от вас. Существо, впервые за ход входящее в эту область, должно преуспеть в спасброске Ловкости Сл 10, иначе станет Сбитым с ног. На сбор Металлических шариков уходит 10 минут."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.meshok",
    "key": "meshok",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Мешок",
      "ru": "Мешок"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Мешок вмещает груз объёмом не более 1 кубического фута и весом не более 30 фунтов.",
        "ru": "Мешок вмещает груз объёмом не более 1 кубического фута и весом не более 30 фунтов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.cp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.meshochek_s_komponentami",
    "key": "meshochek_s_komponentami",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Мешочек с компонентами",
      "ru": "Мешочек с компонентами"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Водонепроницаемый Мешочек с компонентами полон отделений, в которых хранятся все не имеющие стоимости Материальные компоненты для заклинаний.",
        "ru": "Водонепроницаемый Мешочек с компонентами полон отделений, в которых хранятся все не имеющие стоимости Материальные компоненты для заклинаний."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 25,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.odezhda_dorozhnaya",
    "key": "odezhda_dorozhnaya",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Одежда, дорожная",
      "ru": "Одежда, дорожная"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Дорожная одежда изготавливается из крепкой ткани и предназначена для путешествий в различных условиях.",
        "ru": "Дорожная одежда изготавливается из крепкой ткани и предназначена для путешествий в различных условиях."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 4.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.odezhda_otlichnaya",
    "key": "odezhda_otlichnaya",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Одежда, отличная",
      "ru": "Одежда, отличная"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Отличная одежда изготавливается из дорогих тканей и искусно украшается. В некоторые места и мероприятия допускаются только одетые в такую одежду существа.",
        "ru": "Отличная одежда изготавливается из дорогих тканей и искусно украшается. В некоторые места и мероприятия допускаются только одетые в такую одежду существа."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 15,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 6.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.odeyalo",
    "key": "odeyalo",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Одеяло",
      "ru": "Одеяло"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Завернувшись в Одеяло, вы совершаете с Преимуществом спасброски против чрезвычайного холода (см. «Руководство Мастера»).",
        "ru": "Завернувшись в Одеяло, вы совершаете с Преимуществом спасброски против чрезвычайного холода (см. «Руководство Мастера»)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.sp"
      },
      "wsg.ref.parameter.item_weight": 3.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.ohotnichiy_kapkan",
    "key": "ohotnichiy_kapkan",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Охотничий капкан",
      "ru": "Охотничий капкан"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Действием Использование вы можете установить Охотничий капкан — стальное кольцо со стальными зубьями, которое захлопывается, когда на пластину в его центре наступает существо. Капкан прикрепляется тяжёлой цепью к неподвижному объекту, такому как дерево или вбитому в землю колу. Наступившее на пластину существо должно преуспеть в спасброске Ловкости Сл 13, иначе получит 1к4 Колющего урона, а его Скорость снизится до 0 до начала его следующего хода. При провале пока существо не освободится, его перемещения будут ограничены длиной цепи (обычно 3 фута). Существо может действием совершить проверку Силы (Атлетика) Сл 13, при успехе освобождая себя или другое существо в пределах досягаемости. Каждая неудачная проверка наносит существу, попавшему в Капкан, 1 Колющего урона.",
        "ru": "Действием Использование вы можете установить Охотничий капкан — стальное кольцо со стальными зубьями, которое захлопывается, когда на пластину в его центре наступает существо. Капкан прикрепляется тяжёлой цепью к неподвижному объекту, такому как дерево или вбитому в землю колу. Наступившее на пластину существо должно преуспеть в спасброске Ловкости Сл 13, иначе получит 1к4 Колющего урона, а его Скорость снизится до 0 до начала его следующего хода. При провале пока существо не освободится, его перемещения будут ограничены длиной цепи (обычно 3 фута). Существо может действием совершить проверку Силы (Атлетика) Сл 13, при успехе освобождая себя или другое существо в пределах досягаемости. Каждая неудачная проверка наносит существу, попавшему в Капкан, 1 Колющего урона."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 25.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.palatka",
    "key": "palatka",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Палатка",
      "ru": "Палатка"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "В Палатке могут спать не более двух существ Маленького или Среднего размера.",
        "ru": "В Палатке могут спать не более двух существ Маленького или Среднего размера."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 20.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.pergament",
    "key": "pergament",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Пергамент",
      "ru": "Пергамент"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "На один лист Пергамента помещается около 250 рукописных слов.",
        "ru": "На один лист Пергамента помещается около 250 рукописных слов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.sp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.pischee_pero",
    "key": "pischee_pero",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Писчее перо",
      "ru": "Писчее перо"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Писчее перо используется с Чернилами для письма или рисования.",
        "ru": "Писчее перо используется с Чернилами для письма или рисования."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.cp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.podzornaya_truba",
    "key": "podzornaya_truba",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Подзорная труба",
      "ru": "Подзорная труба"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Рассматриваемые в подзорную трубу объекты увеличиваются в два раза.",
        "ru": "Рассматриваемые в подзорную трубу объекты увеличиваются в два раза."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.ratsiony_1_den",
    "key": "ratsiony_1_den",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Рационы (1 день)",
      "ru": "Рационы (1 день)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Рационы состоят из готовой к употреблению в путешествии пищи, среди которой вяленое мясо, сухофрукты, галеты и орехи. Раздел «Недоедание» в глоссарии правил содержит информацию о последствиях недостаточного питания.",
        "ru": "Рационы состоят из готовой к употреблению в путешествии пищи, среди которой вяленое мясо, сухофрукты, галеты и орехи. Раздел «Недоедание» в глоссарии правил содержит информацию о последствиях недостаточного питания."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.sp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.ryukzak",
    "key": "ryukzak",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Рюкзак",
      "ru": "Рюкзак"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Рюкзак вмещает груз объёмом не более 1 кубического фута и весом не более 30 фунтов. Он также может служить седельной сумкой.",
        "ru": "Рюкзак вмещает груз объёмом не более 1 кубического фута и весом не более 30 фунтов. Он также может служить седельной сумкой."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 5.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.svecha",
    "key": "svecha",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Свеча",
      "ru": "Свеча"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Зажжённая Свеча в течение 1 часа испускает Яркий свет в пределах 5 футов и Тусклый свет в пределах ещё 5 футов.",
        "ru": "Зажжённая Свеча в течение 1 часа испускает Яркий свет в пределах 5 футов и Тусклый свет в пределах ещё 5 футов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.cp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.svyataya_voda",
    "key": "svyataya_voda",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Святая вода",
      "ru": "Святая вода"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы совершаете действие Атака, вы можете заменить одну из своих атак метанием фляги со Святой водой. Выберите одно видимое вами существо в пределах 20 футов от вас. Цель должна преуспеть в спасброске Ловкости (Сл 8 + ваш модификатор Ловкости + ваш Бонус владения), иначе получит 2к8 урона Излучением, если она Исчадие или Нежить.",
        "ru": "Когда вы совершаете действие Атака, вы можете заменить одну из своих атак метанием фляги со Святой водой. Выберите одно видимое вами существо в пределах 20 футов от вас. Цель должна преуспеть в спасброске Ловкости (Сл 8 + ваш модификатор Ловкости + ваш Бонус владения), иначе получит 2к8 урона Излучением, если она Исчадие или Нежить."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 25,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.svyaschennyy_simvol_amulet",
    "key": "svyaschennyy_simvol_amulet",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Священный символ (Амулет)",
      "ru": "Священный символ (Амулет)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Такие предметы украшаются самоцветами или раскрашиваются для проведения божественной магии. Жрецы и Паладины могут использовать Священные символы в качестве Заклинательной фокусировки. (на себе или в руках)",
        "ru": "Такие предметы украшаются самоцветами или раскрашиваются для проведения божественной магии. Жрецы и Паладины могут использовать Священные символы в качестве Заклинательной фокусировки. (на себе или в руках)"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.cp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.svyaschennyy_simvol_emblema",
    "key": "svyaschennyy_simvol_emblema",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Священный символ (Эмблема)",
      "ru": "Священный символ (Эмблема)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Такие предметы украшаются самоцветами или раскрашиваются для проведения божественной магии. Жрецы и Паладины могут использовать Священные символы в качестве Заклинательной фокусировки. (на ткани или Щите)",
        "ru": "Такие предметы украшаются самоцветами или раскрашиваются для проведения божественной магии. Жрецы и Паладины могут использовать Священные символы в качестве Заклинательной фокусировки. (на ткани или Щите)"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.svyaschennyy_simvol_relikvariy",
    "key": "svyaschennyy_simvol_relikvariy",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Священный символ (Реликварий)",
      "ru": "Священный символ (Реликварий)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Такие предметы украшаются самоцветами или раскрашиваются для проведения божественной магии. Жрецы и Паладины могут использовать Священные символы в качестве Заклинательной фокусировки. (в руках)",
        "ru": "Такие предметы украшаются самоцветами или раскрашиваются для проведения божественной магии. Жрецы и Паладины могут использовать Священные символы в качестве Заклинательной фокусировки. (в руках)"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.cp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.set",
    "key": "set",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Сеть",
      "ru": "Сеть"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Когда вы совершаете действие Атака, вы можете заменить одну из своих атак бросанием Сети. Выберите один видимый вами объект или существо в пределах 15 футов от вас. Цель должна преуспеть в спасброске Ловкости (Сл 8 + ваши модификатор Ловкости и Бонус владения), иначе станет Опутанной. Цели автоматически преуспевает в этом спасброске, если она Огромная или больше. Чтобы освободиться, цель или существо в пределах 5 футов от неё должны действием совершить проверку Силы (Атлетика) Сл 10, при успехе освобождая Опутанное Сетью существо. Разрушение Сети (КЗ 10; 5 Хитов; Иммунитет к Дробящему урону, урону Ядом и Психической энергией) также освобождает цель, прекращая действие эффекта.",
        "ru": "Когда вы совершаете действие Атака, вы можете заменить одну из своих атак бросанием Сети. Выберите один видимый вами объект или существо в пределах 15 футов от вас. Цель должна преуспеть в спасброске Ловкости (Сл 8 + ваши модификатор Ловкости и Бонус владения), иначе станет Опутанной. Цели автоматически преуспевает в этом спасброске, если она Огромная или больше. Чтобы освободиться, цель или существо в пределах 5 футов от неё должны действием совершить проверку Силы (Атлетика) Сл 10, при успехе освобождая Опутанное Сетью существо. Разрушение Сети (КЗ 10; 5 Хитов; Иммунитет к Дробящему урону, урону Ядом и Психической энергией) также освобождает цель, прекращая действие эффекта."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 3.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.signalnyy_svistok",
    "key": "signalnyy_svistok",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Сигнальный свисток",
      "ru": "Сигнальный свисток"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Действием Использование можно подуть в Сигнальный свисток, издав звук, слышный на расстоянии до 600 футов.",
        "ru": "Действием Использование можно подуть в Сигнальный свисток, издав звук, слышный на расстоянии до 600 футов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.cp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.spalnik",
    "key": "spalnik",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Спальник",
      "ru": "Спальник"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "В Спальнике может спать одно Маленькое или Среднее существо. Находясь в Спальнике, вы автоматически преуспеваете в спасбросках против чрезвычайного холода (см. «Руководство Мастера»).",
        "ru": "В Спальнике может спать одно Маленькое или Среднее существо. Находясь в Спальнике, вы автоматически преуспеваете в спасбросках против чрезвычайного холода (см. «Руководство Мастера»)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 7.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.sunduk",
    "key": "sunduk",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Сундук",
      "ru": "Сундук"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Сундук вмещает не более 12 кубических футов содержимого.",
        "ru": "Сундук вмещает не более 12 кубических футов содержимого."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 25.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.taran_portativnyy",
    "key": "taran_portativnyy",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Таран, портативный",
      "ru": "Таран, портативный"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Вы можете использовать Портативный таран, чтобы вышибать двери. В таком случае вы получаете +4 к проверке Силы. Ещё один персонаж может помочь вам с использованием Тарана — тогда совершите эту проверку с Преимуществом.",
        "ru": "Вы можете использовать Портативный таран, чтобы вышибать двери. В таком случае вы получаете +4 к проверке Силы. Ещё один персонаж может помочь вам с использованием Тарана — тогда совершите эту проверку с Преимуществом."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 35.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.trutnitsa",
    "key": "trutnitsa",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Трутница",
      "ru": "Трутница"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "В этом небольшом контейнере находятся кремень, огниво и трут (обычно в виде сухой тряпки, пропитанной маслом), используемые для разжигания огня. Бонусным действием можно использовать Трутницу для зажигания Лампы, Свечи, Факела, Фонаря или другого предмета с открытым доступом к топливу. Разжигание огня в иных условиях занимает 1 минуту.",
        "ru": "В этом небольшом контейнере находятся кремень, огниво и трут (обычно в виде сухой тряпки, пропитанной маслом), используемые для разжигания огня. Бонусным действием можно использовать Трутницу для зажигания Лампы, Свечи, Факела, Фонаря или другого предмета с открытым доступом к топливу. Разжигание огня в иных условиях занимает 1 минуту."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.sp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.tubus_dlya_kart_i_svitkov",
    "key": "tubus_dlya_kart_i_svitkov",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Тубус для карт и свитков",
      "ru": "Тубус для карт и свитков"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Тубус для карт и свитков вмещает не более 10 листов Бумаги или 5 листов Пергамента.",
        "ru": "Тубус для карт и свитков вмещает не более 10 листов Бумаги или 5 листов Пергамента."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.uvelichitelnoe_steklo",
    "key": "uvelichitelnoe_steklo",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Увеличительное стекло",
      "ru": "Увеличительное стекло"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Используя Увеличительное стекло, вы совершаете с Преимуществом проверки характеристик, проводимые для оценки или исследования предмета со множеством мелких деталей. Разжигание огня с помощью Увеличительного стекла требует света, такого же яркого как солнечный, трута для розжига и примерно 5 минут времени.",
        "ru": "Используя Увеличительное стекло, вы совершаете с Преимуществом проверки характеристик, проводимые для оценки или исследования предмета со множеством мелких деталей. Разжигание огня с помощью Увеличительного стекла требует света, такого же яркого как солнечный, трута для розжига и примерно 5 минут времени."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 100,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.5,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.fakel",
    "key": "fakel",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Факел",
      "ru": "Факел"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Факел горит в течение 1 часа, испуская Яркий свет в пределах 20 футов и Тусклый свет в пределах ещё 20 футов. Совершая действие Атака, вы можете атаковать Факелом как Простым Рукопашным оружием. При попадании цель получает 1 урона Огнём.",
        "ru": "Факел горит в течение 1 часа, испуская Яркий свет в пределах 20 футов и Тусклый свет в пределах ещё 20 футов. Совершая действие Атака, вы можете атаковать Факелом как Простым Рукопашным оружием. При попадании цель получает 1 урона Огнём."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.cp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.flakon",
    "key": "flakon",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Флакон",
      "ru": "Флакон"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Флакон вмещает не более 4 унций (100 грамм).",
        "ru": "Флакон вмещает не более 4 унций (100 грамм)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.flyaga",
    "key": "flyaga",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Фляга",
      "ru": "Фляга"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Фляга вмещает не более 1 пинты (0,5 л).",
        "ru": "Фляга вмещает не более 1 пинты (0,5 л)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.fokusirovka_druidov_vetochka_omely",
    "key": "fokusirovka_druidov_vetochka_omely",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Фокусировка друидов (Веточка омелы)",
      "ru": "Фокусировка друидов (Веточка омелы)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Такие предметы украшаются резьбой, перевязываются лентой или раскрашиваются для проведения магии природы. Друиды и Следопыты могут использовать Фокусировки друидов в качестве Заклинательной фокусировки.",
        "ru": "Такие предметы украшаются резьбой, перевязываются лентой или раскрашиваются для проведения магии природы. Друиды и Следопыты могут использовать Фокусировки друидов в качестве Заклинательной фокусировки."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.fokusirovka_druidov_derevyannyy_posoh",
    "key": "fokusirovka_druidov_derevyannyy_posoh",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Фокусировка друидов (Деревянный посох)",
      "ru": "Фокусировка друидов (Деревянный посох)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Такие предметы украшаются резьбой, перевязываются лентой или раскрашиваются для проведения магии природы. Друиды и Следопыты могут использовать Фокусировки друидов в качестве Заклинательной фокусировки.",
        "ru": "Такие предметы украшаются резьбой, перевязываются лентой или раскрашиваются для проведения магии природы. Друиды и Следопыты могут использовать Фокусировки друидов в качестве Заклинательной фокусировки."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 4.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.fokusirovka_druidov_tisovaya_palochka",
    "key": "fokusirovka_druidov_tisovaya_palochka",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Фокусировка друидов (Тисовая палочка)",
      "ru": "Фокусировка друидов (Тисовая палочка)"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Такие предметы украшаются резьбой, перевязываются лентой или раскрашиваются для проведения магии природы. Друиды и Следопыты могут использовать Фокусировки друидов в качестве Заклинательной фокусировки.",
        "ru": "Такие предметы украшаются резьбой, перевязываются лентой или раскрашиваются для проведения магии природы. Друиды и Следопыты могут использовать Фокусировки друидов в качестве Заклинательной фокусировки."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.fonar_zakrytyy",
    "key": "fonar_zakrytyy",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Фонарь, закрытый",
      "ru": "Фонарь, закрытый"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Закрытый фонарь заправляется Маслом и при горении испускает Яркий свет в пределах 30 футов и Тусклый свет в пределах ещё 30 футов. Бонусным действием вы можете опустить заслонку, уменьшая свет до Тусклого в пределах 5 футов, или снова поднять её.",
        "ru": "Закрытый фонарь заправляется Маслом и при горении испускает Яркий свет в пределах 30 футов и Тусклый свет в пределах ещё 30 футов. Бонусным действием вы можете опустить заслонку, уменьшая свет до Тусклого в пределах 5 футов, или снова поднять её."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.fonar_napravlennyy",
    "key": "fonar_napravlennyy",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Фонарь, направленный",
      "ru": "Фонарь, направленный"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Направленный фонарь заправляется Маслом и при горении испускает Яркий свет в 60футовом Конусе и Тусклый свет ещё на 60 футов.",
        "ru": "Направленный фонарь заправляется Маслом и при горении испускает Яркий свет в 60футовом Конусе и Тусклый свет ещё на 60 футов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.futlyar",
    "key": "futlyar",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Футляр",
      "ru": "Футляр"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Футляр для арбалетных болтов вмещает не более 20 Болтов.",
        "ru": "Футляр для арбалетных болтов вмещает не более 20 Болтов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.tsep",
    "key": "tsep",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Цепь",
      "ru": "Цепь"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Действием Использование вы можете обернуть Цепью несогласное существо в пределах 5 футов от вас, если оно является Схваченным, Недееспособным или Опутанным, и если вы преуспеете в проверке Силы (Атлетика) Сл 13. Если ноги существа скованы, оно становится Опутанным, пока не освободится. Чтобы освободиться от Цепи, существо должно действием преуспеть в проверке Ловкости (Акробатика) Сл 18. Чтобы разорвать Цепь, существо должно действием преуспеть в проверке Силы (Атлетика) Сл 20.",
        "ru": "Действием Использование вы можете обернуть Цепью несогласное существо в пределах 5 футов от вас, если оно является Схваченным, Недееспособным или Опутанным, и если вы преуспеете в проверке Силы (Атлетика) Сл 13. Если ноги существа скованы, оно становится Опутанным, пока не освободится. Чтобы освободиться от Цепи, существо должно действием преуспеть в проверке Ловкости (Акробатика) Сл 18. Чтобы разорвать Цепь, существо должно действием преуспеть в проверке Силы (Атлетика) Сл 20."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 10.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.chernila",
    "key": "chernila",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Чернила",
      "ru": "Чернила"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Чернила находятся в 1унцевой бутылочке (25 грамм). Этого количества достаточно для написания около 500 листов.",
        "ru": "Чернила находятся в 1унцевой бутылочке (25 грамм). Этого количества достаточно для написания около 500 листов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.shest",
    "key": "shest",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Шест",
      "ru": "Шест"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Шест имеет длину 10 футов. Вы можете использовать его, чтобы прикоснуться к чему-либо на расстоянии не более 10 футов. Если при Прыжке вам необходимо совершить проверку Силы (Атлетика), вы можете совершить её с Преимуществом, если прыгаете с Шестом.",
        "ru": "Шест имеет длину 10 футов. Вы можете использовать его, чтобы прикоснуться к чему-либо на расстоянии не более 10 футов. Если при Прыжке вам необходимо совершить проверку Силы (Атлетика), вы можете совершить её с Преимуществом, если прыгаете с Шестом."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.cp"
      },
      "wsg.ref.parameter.item_weight": 7.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.shipy_zheleznye",
    "key": "shipy_zheleznye",
    "type": "item",
    "templateId": "mygame.temp.adventuring_gear",
    "name": {
      "en": "Шипы, железные",
      "ru": "Шипы, железные"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Железные шипы продаются связками по десять штук. Действием Использование вы можете вбить Шип в дерево, землю или аналогичный материал тупым объектом, например, Лёгким молотом. Вы можете заклинить таким образом дверь или привязать ко вбитому Шипу Верёвку или Цепь.",
        "ru": "Железные шипы продаются связками по десять штук. Действием Использование вы можете вбить Шип в дерево, землю или аналогичный материал тупым объектом, например, Лёгким молотом. Вы можете заклинить таким образом дверь или привязать ко вбитому Шипу Верёвку или Цепь."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 5.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.adventuring_gear",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.instrumenty_alhimika",
    "key": "instrumenty_alhimika",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Инструменты алхимика",
      "ru": "Инструменты алхимика"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: опознать вещество (Сл 15) или разжечь огонь (Сл 15). Изготовление: Алхимический огонь, Бумага, Духи, Кислота, Мешочек с компонентами, Масло",
        "ru": "Использование: опознать вещество (Сл 15) или разжечь огонь (Сл 15). Изготовление: Алхимический огонь, Бумага, Духи, Кислота, Мешочек с компонентами, Масло"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 50,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 8.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.intelligence"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.instrumenty_gonchara",
    "key": "instrumenty_gonchara",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Инструменты гончара",
      "ru": "Инструменты гончара"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: определить, что содержалось в керамическом объекте за последние 24 часа (Сл 15). Изготовление: Кувшин, Лампа",
        "ru": "Использование: определить, что содержалось в керамическом объекте за последние 24 часа (Сл 15). Изготовление: Кувшин, Лампа"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 3.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.intelligence"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.instrumenty_kalligrafa",
    "key": "instrumenty_kalligrafa",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Инструменты каллиграфа",
      "ru": "Инструменты каллиграфа"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: написать текст впечатляющим почерком для защиты документа от подделки (Сл 15). Изготовление: Чернила, Свиток заклинаний",
        "ru": "Использование: написать текст впечатляющим почерком для защиты документа от подделки (Сл 15). Изготовление: Чернила, Свиток заклинаний"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 5.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.dexterity"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.instrumenty_kamenschika",
    "key": "instrumenty_kamenschika",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Инструменты каменщика",
      "ru": "Инструменты каменщика"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: высечь знак или отверстие в камне (Сл 10). Изготовление: Блок и лебёдка",
        "ru": "Использование: высечь знак или отверстие в камне (Сл 10). Изготовление: Блок и лебёдка"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 8.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.strength"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.instrumenty_kartografa",
    "key": "instrumenty_kartografa",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Инструменты картографа",
      "ru": "Инструменты картографа"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: нарисовать карту небольшой области (Сл 15). Изготовление: Карта",
        "ru": "Использование: нарисовать карту небольшой области (Сл 15). Изготовление: Карта"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 15,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 6.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.wisdom"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.instrumenty_kozhevnika",
    "key": "instrumenty_kozhevnika",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Инструменты кожевника",
      "ru": "Инструменты кожевника"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: нанести рисунок на предмет из кожи (Сл 10). Изготовление: Праща, Кнут, Шкурный доспех, Кожаный доспех, Проклёпанный кожаный доспех, Рюкзак, Футляр для арбалетных болтов, Тубус для карт и свитков, Пергамент, Кошель, Колчан, Бурдюк.",
        "ru": "Использование: нанести рисунок на предмет из кожи (Сл 10). Изготовление: Праща, Кнут, Шкурный доспех, Кожаный доспех, Проклёпанный кожаный доспех, Рюкзак, Футляр для арбалетных болтов, Тубус для карт и свитков, Пергамент, Кошель, Колчан, Бурдюк."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 5.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.dexterity"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.instrumenty_kuznetsa",
    "key": "instrumenty_kuznetsa",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Инструменты кузнеца",
      "ru": "Инструменты кузнеца"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: взломать дверь или контейнер (Сл 20). Изготовление: Любое Рукопашное оружие (кроме Дубинки, Палицы, Боевого посоха и Кнута), Средние доспехи (кроме Шкурного), Тяжёлые доспехи, Металлические шарики, Ведро, Калтропы, Цепь, Ломик, Пули для огнестрельного оружия, Крюк-кошка, Железный горшок, Железные шипы, Снаряды для пращи",
        "ru": "Использование: взломать дверь или контейнер (Сл 20). Изготовление: Любое Рукопашное оружие (кроме Дубинки, Палицы, Боевого посоха и Кнута), Средние доспехи (кроме Шкурного), Тяжёлые доспехи, Металлические шарики, Ведро, Калтропы, Цепь, Ломик, Пули для огнестрельного оружия, Крюк-кошка, Железный горшок, Железные шипы, Снаряды для пращи"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 20,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 8.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.strength"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.instrumenty_pivovara",
    "key": "instrumenty_pivovara",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Инструменты пивовара",
      "ru": "Инструменты пивовара"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: обнаружить в напитке отраву (Сл 15) или опознать алкоголь (Сл 10). Изготовление: Противоядие",
        "ru": "Использование: обнаружить в напитке отраву (Сл 15) или опознать алкоголь (Сл 10). Изготовление: Противоядие"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 20,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 9.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.intelligence"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.instrumenty_plotnika",
    "key": "instrumenty_plotnika",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Инструменты плотника",
      "ru": "Инструменты плотника"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: заколотить или вскрыть дверь или контейнер (Сл 20). Изготовление: Дубинка, Палица, Боевой посох, Бочка, Сундук, Лестница, Шест, Портативный таран, Факел",
        "ru": "Использование: заколотить или вскрыть дверь или контейнер (Сл 20). Изготовление: Дубинка, Палица, Боевой посох, Бочка, Сундук, Лестница, Шест, Портативный таран, Факел"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 8,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 6.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.strength"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.instrumenty_povara",
    "key": "instrumenty_povara",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Инструменты повара",
      "ru": "Инструменты повара"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: улучшить вкус пищи (Сл 10) или обнаружить испорченные или отравленные продукты (Сл 15). Изготовление: Рационы",
        "ru": "Использование: улучшить вкус пищи (Сл 10) или обнаружить испорченные или отравленные продукты (Сл 15). Изготовление: Рационы"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 8.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.wisdom"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.instrumenty_rezchika_po_derevu",
    "key": "instrumenty_rezchika_po_derevu",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Инструменты резчика по дереву",
      "ru": "Инструменты резчика по дереву"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: вырезать узор на дереве (Сл 10). Изготовление: Боевой посох, Дубинка, Палица, Дальнобойное оружие (за исключением Пистоля, Мушкета и Пращи), Магическая фокусировка, Стрелы, Болты, Фокусировка друидов, Писчее перо, Иглы для духового ружья.",
        "ru": "Использование: вырезать узор на дереве (Сл 10). Изготовление: Боевой посох, Дубинка, Палица, Дальнобойное оружие (за исключением Пистоля, Мушкета и Пращи), Магическая фокусировка, Стрелы, Болты, Фокусировка друидов, Писчее перо, Иглы для духового ружья."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 5.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.dexterity"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.instrumenty_remontnika",
    "key": "instrumenty_remontnika",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Инструменты ремонтника",
      "ru": "Инструменты ремонтника"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: собрать из утиля Крошечный предмет, разваливающийся на части через 1 минуту (Сл 20). Изготовление: Мушкет, Пистоль, Колокольчик, Направленный фонарь, Фляга, Закрытый фонарь, Охотничий капкан, Замок, Кандалы, Зеркало, Лопата, Сигнальный свисток, Трутница",
        "ru": "Использование: собрать из утиля Крошечный предмет, разваливающийся на части через 1 минуту (Сл 20). Изготовление: Мушкет, Пистоль, Колокольчик, Направленный фонарь, Фляга, Закрытый фонарь, Охотничий капкан, Замок, Кандалы, Зеркало, Лопата, Сигнальный свисток, Трутница"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 50,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 10.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.dexterity"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.instrumenty_sapozhnika",
    "key": "instrumenty_sapozhnika",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Инструменты сапожника",
      "ru": "Инструменты сапожника"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: подбить обувь так, чтобы надевший её получил Преимущество на следующую проверку Ловкости (Акробатика) (Сл 10). Изготовление: Комплект для лазания",
        "ru": "Использование: подбить обувь так, чтобы надевший её получил Преимущество на следующую проверку Ловкости (Акробатика) (Сл 10). Изготовление: Комплект для лазания"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 5.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.dexterity"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.instrumenty_stekloduva",
    "key": "instrumenty_stekloduva",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Инструменты стеклодува",
      "ru": "Инструменты стеклодува"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: определить, что содержалось в стеклянном объекте за последние 24 часа (Сл 15). Изготовление: Стеклянная бутылка, Увеличительное стекло, Подзорная труба, Флакон",
        "ru": "Использование: определить, что содержалось в стеклянном объекте за последние 24 часа (Сл 15). Изготовление: Стеклянная бутылка, Увеличительное стекло, Подзорная труба, Флакон"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 30,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 5.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.intelligence"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.instrumenty_tkacha",
    "key": "instrumenty_tkacha",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Инструменты ткача",
      "ru": "Инструменты ткача"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: починить прореху в одежде (Сл 10) или вышить Крошечный рисунок (Сл 10). Изготовление: Стёганый доспех, Корзина, Спальник, Одеяло, Отличная одежда, Сеть, Мантия, Верёвка, Мешок, Леска, Палатка, Дорожная одежда",
        "ru": "Использование: починить прореху в одежде (Сл 10) или вышить Крошечный рисунок (Сл 10). Изготовление: Стёганый доспех, Корзина, Спальник, Одеяло, Отличная одежда, Сеть, Мантия, Верёвка, Мешок, Леска, Палатка, Дорожная одежда"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 5.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.dexterity"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.instrumenty_hudozhnika",
    "key": "instrumenty_hudozhnika",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Инструменты художника",
      "ru": "Инструменты художника"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: нарисовать узнаваемый образ чего-то виденного вами (Сл 10). Изготовление: Фокусировка друидов, Священный символ",
        "ru": "Использование: нарисовать узнаваемый образ чего-то виденного вами (Сл 10). Изготовление: Фокусировка друидов, Священный символ"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 5.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.wisdom"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.instrumenty_yuvelira",
    "key": "instrumenty_yuvelira",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Инструменты ювелира",
      "ru": "Инструменты ювелира"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: определить ценность драгоценного камня (Сл 15). Изготовление: Магическая фокусировка, Священный символ",
        "ru": "Использование: определить ценность драгоценного камня (Сл 15). Изготовление: Магическая фокусировка, Священный символ"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 25,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.intelligence"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.nabor_dlya_grima",
    "key": "nabor_dlya_grima",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Набор для грима",
      "ru": "Набор для грима"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: нанести макияж (Сл 10). Изготовление: Костюм",
        "ru": "Использование: нанести макияж (Сл 10). Изготовление: Костюм"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 25,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 3.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.charisma"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.nabor_dlya_falsifikatsii",
    "key": "nabor_dlya_falsifikatsii",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Набор для фальсификации",
      "ru": "Набор для фальсификации"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: подделать не больше 10 слов чужим почерком (Сл 15) или создать дубликат восковой печати (Сл 20).",
        "ru": "Использование: подделать не больше 10 слов чужим почерком (Сл 15) или создать дубликат восковой печати (Сл 20)."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 15,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 5.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.dexterity"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.igrovoy_nabor",
    "key": "igrovoy_nabor",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Игровой набор",
      "ru": "Игровой набор"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: распознать шулера (Сл 10) или выиграть игру (Сл 20). Варианты: Кости (1 СМ), драконьи шахматы (1 ЗМ), игральные карты (5 СМ), ставка трёх драконов (1 ЗМ)",
        "ru": "Использование: распознать шулера (Сл 10) или выиграть игру (Сл 20). Варианты: Кости (1 СМ), драконьи шахматы (1 ЗМ), игральные карты (5 СМ), ставка трёх драконов (1 ЗМ)"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 1,
        "currency": "wsg.ref.value.currency.sp"
      },
      "wsg.ref.parameter.item_weight": 0.1,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.gaming",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.wisdom"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.nabor_travnika",
    "key": "nabor_travnika",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Набор травника",
      "ru": "Набор травника"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: опознать растение (Сл 10). Изготовление: Противоядие, Свеча, Комплект целителя, Зелье лечения",
        "ru": "Использование: опознать растение (Сл 10). Изготовление: Противоядие, Свеча, Комплект целителя, Зелье лечения"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 5,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 3.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.intelligence"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.muzykalnyy_instrument",
    "key": "muzykalnyy_instrument",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Музыкальный инструмент",
      "ru": "Музыкальный инструмент"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: сыграть известную мелодию (Сл 10) или импровизировать (Сл 15). Варианты: барабан (6 ЗМ, 3 фунта), виола (30 ЗМ, 1 фунт), волынка (30 ЗМ, 6 фунтов), лира (30 ЗМ, 2 фунта), лютня (35 ЗМ, 2 фунта), рожок (3 ЗМ, 2 фунта), свирель (12 ЗМ, 2 фунта), флейта (2 ЗМ, 1 фунт), цимбалы (25 ЗМ, 10 фунтов), шалмей (2 ЗМ, 1 фунт)",
        "ru": "Использование: сыграть известную мелодию (Сл 10) или импровизировать (Сл 15). Варианты: барабан (6 ЗМ, 3 фунта), виола (30 ЗМ, 1 фунт), волынка (30 ЗМ, 6 фунтов), лира (30 ЗМ, 2 фунта), лютня (35 ЗМ, 2 фунта), рожок (3 ЗМ, 2 фунта), свирель (12 ЗМ, 2 фунта), флейта (2 ЗМ, 1 фунт), цимбалы (25 ЗМ, 10 фунтов), шалмей (2 ЗМ, 1 фунт)"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 2,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.musical",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.charisma"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.instrumenty_navigatora",
    "key": "instrumenty_navigatora",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Инструменты навигатора",
      "ru": "Инструменты навигатора"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: проложить курс (Сл 10) или определить местоположение по звёздам (Сл 15)",
        "ru": "Использование: проложить курс (Сл 10) или определить местоположение по звёздам (Сл 15)"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 25,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.wisdom"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.instrumenty_otravitelya",
    "key": "instrumenty_otravitelya",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Инструменты отравителя",
      "ru": "Инструменты отравителя"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: определить отравленный объект (Сл 10). Изготовление: Простой яд",
        "ru": "Использование: определить отравленный объект (Сл 10). Изготовление: Простой яд"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 50,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.intelligence"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.vorovskie_instrumenty",
    "key": "vorovskie_instrumenty",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Воровские инструменты",
      "ru": "Воровские инструменты"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Использование: взломать замок (Сл 15) или обезвредить ловушку (Сл 15)",
        "ru": "Использование: взломать замок (Сл 15) или обезвредить ловушку (Сл 15)"
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 25,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 1.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan",
      "wsg.ref.parameter.item_tool_ability": "wsg.ref.value.ability.dexterity"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.arfa_anstrut",
    "key": "arfa_anstrut",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Арфа Анструт",
      "ru": "Арфа Анструт"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Чудесный предмет, очень редкий (требуется настройка Бардом). Этот Инструмент бардов во всех отношениях превосходит обычные арфы. Существо, пытающееся играть на таком инструменте, не настроившись на него, должно преуспеть в спасброске Мудрости Сл 15, иначе получит 2к4 Психического урона. Вы можете игрой на инструменте сотворить одно из присущих ему заклинаний: Град, Защита от добра и зла, Левитация, Лечение ран (5-й уровень), Невидимость, Полёт, Терновая стена. Как только вы сотворили заклинание с инструментом, этот инструмент не может быть использован для сотворения этого заклинания снова до следующего рассвета. Заклинания используют вашу заклинательную характеристику и вашу Сл спасброска заклинаний.",
        "ru": "Чудесный предмет, очень редкий (требуется настройка Бардом). Этот Инструмент бардов во всех отношениях превосходит обычные арфы. Существо, пытающееся играть на таком инструменте, не настроившись на него, должно преуспеть в спасброске Мудрости Сл 15, иначе получит 2к4 Психического урона. Вы можете игрой на инструменте сотворить одно из присущих ему заклинаний: Град, Защита от добра и зла, Левитация, Лечение ран (5-й уровень), Невидимость, Полёт, Терновая стена. Как только вы сотворили заклинание с инструментом, этот инструмент не может быть использован для сотворения этого заклинания снова до следующего рассвета. Заклинания используют вашу заклинательную характеристику и вашу Сл спасброска заклинаний."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.arfa_ollav",
    "key": "arfa_ollav",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Арфа Оллав",
      "ru": "Арфа Оллав"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Чудесный предмет, легендарный (требуется настройка Бардом). Этот Инструмент бардов во всех отношениях превосходит обычные арфы. Существо, пытающееся играть на таком инструменте, не настроившись на него, должно преуспеть в спасброске Мудрости Сл 15, иначе получит 2к4 Психического урона. Вы можете игрой на инструменте сотворить одно из присущих ему заклинаний: Власть над погодой, Защита от добра и зла, Левитация, Невидимость, Огненная буря, Полёт, Смятение. Как только вы сотворили заклинание с инструментом, этот инструмент не может быть использован для сотворения этого заклинания снова до следующего рассвета.",
        "ru": "Чудесный предмет, легендарный (требуется настройка Бардом). Этот Инструмент бардов во всех отношениях превосходит обычные арфы. Существо, пытающееся играть на таком инструменте, не настроившись на него, должно преуспеть в спасброске Мудрости Сл 15, иначе получит 2к4 Психического урона. Вы можете игрой на инструменте сотворить одно из присущих ему заклинаний: Власть над погодой, Защита от добра и зла, Левитация, Невидимость, Огненная буря, Полёт, Смятение. Как только вы сотворили заклинание с инструментом, этот инструмент не может быть использован для сотворения этого заклинания снова до следующего рассвета."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 200000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.bandura_fokluchan",
    "key": "bandura_fokluchan",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Бандура Фоклучан",
      "ru": "Бандура Фоклучан"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Чудесный предмет, необычный (требуется настройка Бардом). Этот Инструмент бардов во всех отношениях превосходит обычные бандуры. Существо, пытающееся играть на таком инструменте, не настроившись на него, должно преуспеть в спасброске Мудрости Сл 15, иначе получит 2к4 Психического урона. Вы можете игрой на инструменте сотворить одно из присущих ему заклинаний: Дубинка, Защита от добра и зла, Левитация, Невидимость, Огонь фей, Опутывание, Полёт, Разговор с животными.",
        "ru": "Чудесный предмет, необычный (требуется настройка Бардом). Этот Инструмент бардов во всех отношениях превосходит обычные бандуры. Существо, пытающееся играть на таком инструменте, не настроившись на него, должно преуспеть в спасброске Мудрости Сл 15, иначе получит 2к4 Психического урона. Вы можете игрой на инструменте сотворить одно из присущих ему заклинаний: Дубинка, Защита от добра и зла, Левитация, Невидимость, Огонь фей, Опутывание, Полёт, Разговор с животными."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.lira_kli",
    "key": "lira_kli",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Лира Кли",
      "ru": "Лира Кли"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Чудесный предмет, редкий (требуется настройка Бардом). Этот Инструмент бардов во всех отношениях превосходит обычные лиры. Существо, пытающееся играть на таком инструменте, не настроившись на него, должно преуспеть в спасброске Мудрости Сл 15, иначе получит 2к4 Психического урона. Вы можете игрой на инструменте сотворить одно из присущих ему заклинаний: Защита от добра и зла, Изменение форма камня, Левитация, Невидимость, Огненная стена, Полёт, Стена ветров.",
        "ru": "Чудесный предмет, редкий (требуется настройка Бардом). Этот Инструмент бардов во всех отношениях превосходит обычные лиры. Существо, пытающееся играть на таком инструменте, не настроившись на него, должно преуспеть в спасброске Мудрости Сл 15, иначе получит 2к4 Психического урона. Вы можете игрой на инструменте сотворить одно из присущих ему заклинаний: Защита от добра и зла, Изменение форма камня, Левитация, Невидимость, Огненная стена, Полёт, Стена ветров."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.lyutnya_doss",
    "key": "lyutnya_doss",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Лютня Досс",
      "ru": "Лютня Досс"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Чудесный предмет, необычный (требуется настройка Бардом). Этот Инструмент бардов во всех отношениях превосходит обычные лютни. Существо, пытающееся играть на таком инструменте, не настроившись на него, должно преуспеть в спасброске Мудрости Сл 15, иначе получит 2к4 Психического урона. Вы можете игрой на инструменте сотворить одно из присущих ему заклинаний: Дружба с животными, Защита от добра и зла, Защита от энергии (только Огонь), Защита от яда, Левитация, Невидимость, Полёт.",
        "ru": "Чудесный предмет, необычный (требуется настройка Бардом). Этот Инструмент бардов во всех отношениях превосходит обычные лютни. Существо, пытающееся играть на таком инструменте, не настроившись на него, должно преуспеть в спасброске Мудрости Сл 15, иначе получит 2к4 Психического урона. Вы можете игрой на инструменте сотворить одно из присущих ему заклинаний: Дружба с животными, Защита от добра и зла, Защита от энергии (только Огонь), Защита от яда, Левитация, Невидимость, Полёт."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.mandolina_kanait",
    "key": "mandolina_kanait",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Мандолина Канаит",
      "ru": "Мандолина Канаит"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Чудесный предмет, редкий (требуется настройка Бардом). Этот Инструмент бардов во всех отношениях превосходит обычные мандолины. Существо, пытающееся играть на таком инструменте, не настроившись на него, должно преуспеть в спасброске Мудрости Сл 15, иначе получит 2к4 Психического урона. Вы можете игрой на инструменте сотворить одно из присущих ему заклинаний: Защита от добра и зла, Защита от энергии (только Электричество), Левитация, Лечение ран (3-й уровень), Невидимость, Полёт, Рассеивание магии.",
        "ru": "Чудесный предмет, редкий (требуется настройка Бардом). Этот Инструмент бардов во всех отношениях превосходит обычные мандолины. Существо, пытающееся играть на таком инструменте, не настроившись на него, должно преуспеть в спасброске Мудрости Сл 15, иначе получит 2к4 Психического урона. Вы можете игрой на инструменте сотворить одно из присущих ему заклинаний: Защита от добра и зла, Защита от энергии (только Электричество), Левитация, Лечение ран (3-й уровень), Невидимость, Полёт, Рассеивание магии."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 4000,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.tsitra_mak_furmid",
    "key": "tsitra_mak_furmid",
    "type": "item",
    "templateId": "mygame.temp.tool",
    "name": {
      "en": "Цитра Мак-Фурмид",
      "ru": "Цитра Мак-Фурмид"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Чудесный предмет, необычный (требуется настройка Бардом). Этот Инструмент бардов во всех отношениях превосходит обычные лютни. Существо, пытающееся играть на таком инструменте, не настроившись на него, должно преуспеть в спасброске Мудрости Сл 15, иначе получит 2к4 Психического урона. Вы можете игрой на инструменте сотворить одно из присущих ему заклинаний: Дубовая кожа, Защита от добра и зла, Левитация, Лечение ран, Невидимость, Полёт, Туманное облако.",
        "ru": "Чудесный предмет, необычный (требуется настройка Бардом). Этот Инструмент бардов во всех отношениях превосходит обычные лютни. Существо, пытающееся играть на таком инструменте, не настроившись на него, должно преуспеть в спасброске Мудрости Сл 15, иначе получит 2к4 Психического урона. Вы можете игрой на инструменте сотворить одно из присущих ему заклинаний: Дубовая кожа, Защита от добра и зла, Левитация, Лечение ран, Невидимость, Полёт, Туманное облако."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 400,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 2.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.tool",
      "wsg.ref.parameter.item_magical": true,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false,
      "wsg.ref.parameter.item_tool_type": "wsg.ref.value.tool_type.artisan"
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.nabor_artista",
    "key": "nabor_artista",
    "type": "item",
    "templateId": "mygame.temp.equipment_kit",
    "name": {
      "en": "Набор артиста",
      "ru": "Набор артиста"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Набор артиста включает Бурдюк, Зеркало, Колокольчик, 3 Костюма, 8 фляг Масла, Направленный фонарь, Рационы на 9 дней, Рюкзак, Спальник и Трутницу.",
        "ru": "Набор артиста включает Бурдюк, Зеркало, Колокольчик, 3 Костюма, 8 фляг Масла, Направленный фонарь, Рационы на 9 дней, Рюкзак, Спальник и Трутницу."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 38.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.equipment_kit",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.nabor_vzlomschika",
    "key": "nabor_vzlomschika",
    "type": "item",
    "templateId": "mygame.temp.equipment_kit",
    "name": {
      "en": "Набор взломщика",
      "ru": "Набор взломщика"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Набор взломщика включает Бурдюк, Верёвку, Закрытый фонарь, Рюкзак, Колокольчик, Ломик, Металлические шарики, 7 фляг Масла, Рационы на 5 дней, 10 Свечей, Трутницу.",
        "ru": "Набор взломщика включает Бурдюк, Верёвку, Закрытый фонарь, Рюкзак, Колокольчик, Ломик, Металлические шарики, 7 фляг Масла, Рационы на 5 дней, 10 Свечей, Трутницу."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 16,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 45.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.equipment_kit",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.nabor_diplomata",
    "key": "nabor_diplomata",
    "type": "item",
    "templateId": "mygame.temp.equipment_kit",
    "name": {
      "en": "Набор дипломата",
      "ru": "Набор дипломата"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Набор дипломата включает в себя 5 листов Бумаги, Духи, Лампу, 4 фляги Масла, Отличную одежду, 5 Писчих перьев, 5 листов Пергамента, Сундук, 2 Тубуса для карт и свитков, Трутницу и Чернила.",
        "ru": "Набор дипломата включает в себя 5 листов Бумаги, Духи, Лампу, 4 фляги Масла, Отличную одежду, 5 Писчих перьев, 5 листов Пергамента, Сундук, 2 Тубуса для карт и свитков, Трутницу и Чернила."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 39,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 36.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.equipment_kit",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.nabor_issledovatelya_podzemeliy",
    "key": "nabor_issledovatelya_podzemeliy",
    "type": "item",
    "templateId": "mygame.temp.equipment_kit",
    "name": {
      "en": "Набор исследователя подземелий",
      "ru": "Набор исследователя подземелий"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Набор исследователя подземелий включает Бурдюк, Верёвку, Калтропы, Ломик, 2 фляги Масла, Рационы на 10 дней, Рюкзак, Трутницу и 10 Факелов.",
        "ru": "Набор исследователя подземелий включает Бурдюк, Верёвку, Калтропы, Ломик, 2 фляги Масла, Рационы на 10 дней, Рюкзак, Трутницу и 10 Факелов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 12,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 59.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.equipment_kit",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.nabor_puteshestvennika",
    "key": "nabor_puteshestvennika",
    "type": "item",
    "templateId": "mygame.temp.equipment_kit",
    "name": {
      "en": "Набор путешественника",
      "ru": "Набор путешественника"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Набор путешественника включает Бурдюк, Верёвку, 2 фляги Масла, Рационы на 10 дней, Рюкзак, Спальник, Трутницу и 10 Факелов.",
        "ru": "Набор путешественника включает Бурдюк, Верёвку, 2 фляги Масла, Рационы на 10 дней, Рюкзак, Спальник, Трутницу и 10 Факелов."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 10,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 59.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.equipment_kit",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.nabor_svyaschennika",
    "key": "nabor_svyaschennika",
    "type": "item",
    "templateId": "mygame.temp.equipment_kit",
    "name": {
      "en": "Набор священника",
      "ru": "Набор священника"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Набор священника включает Лампу, Мантию, Одеяло, Рационы на 7 дней, Рюкзак, Святую воду и Трутницу.",
        "ru": "Набор священника включает Лампу, Мантию, Одеяло, Рационы на 7 дней, Рюкзак, Святую воду и Трутницу."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 33,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 25.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.equipment_kit",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  },
  {
    "id": "mygame.item.nabor_uchyonogo",
    "key": "nabor_uchyonogo",
    "type": "item",
    "templateId": "mygame.temp.equipment_kit",
    "name": {
      "en": "Набор учёного",
      "ru": "Набор учёного"
    },
    "values": {
      "wsg.ref.parameter.description": {
        "en": "Набор учёного включает Книгу, Лампу, 10 фляг Масла, 10 листов Пергамента, Писчее перо, Рюкзак, Трутницу и Чернила.",
        "ru": "Набор учёного включает Книгу, Лампу, 10 фляг Масла, 10 листов Пергамента, Писчее перо, Рюкзак, Трутницу и Чернила."
      },
      "wsg.ref.parameter.item_cost": {
        "amount": 40,
        "currency": "wsg.ref.value.currency.gp"
      },
      "wsg.ref.parameter.item_weight": 18.0,
      "wsg.ref.parameter.item_quantity": 1,
      "wsg.ref.parameter.item_stack_size": 1,
      "wsg.ref.parameter.item_type": "wsg.ref.value.item_type.equipment_kit",
      "wsg.ref.parameter.item_magical": false,
      "wsg.ref.parameter.item_consumable": false,
      "wsg.ref.parameter.item_rarity": "wsg.ref.value.item_rarity.mundane",
      "wsg.ref.parameter.item_requires_attunement": false,
      "wsg.ref.parameter.item_cursed": false
    },
    "previousIds": []
  }
] satisfies ForgeEntity[];
