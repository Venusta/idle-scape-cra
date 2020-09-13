import { itemSearchData } from "./Items";
import { DropTable } from "../drop-simulator/DropTable";
import { DropSimulator } from "../drop-simulator/DropSimulator";
import { AttackType, ExpReward, ItemData, MonsterData, StyleExperience } from "../types/types";

interface MonsterOptions {
  // id: number;
  name: string;
  dropTable: DropTable;
}

export class Monster {
  // id: number
  name: string;
  dropTable: DropTable;
  data: MonsterData;
  
  constructor({ name, dropTable }: MonsterOptions) {
    this.dropTable = dropTable;
    this.name = name
    // this.id = id;
    this.data = {
      combatLevel: 111,
      hitpoints: 105,
      attackType: [AttackType.Slash],
      attackSpeed: 4,
      attributes: [],
      category: ["gargoyle"],
      attackLevel: 75,
      strengthLevel: 105,
      defenceLevel: 107,
      magicLevel: 1,
      rangedLevel: 1,
      attackStab: 0,
      attackSlash: 0,
      attackCrush: 0,
      attackMagic: 0,
      attackRanged: 0,
      defenceStab: 20,
      defenceSlash: 20,
      defenceCrush: 0,
      defenceMagic: 20,
      defenceRanged: 20,
      attackAccuracy: 0,
      meleeStrength: 0,
      rangedStrength: 0,
      magicDamage: 0,
      slayerLevelRequired: 75,
      slayerXP: 105,
    };
  }

  kill = (amount = 1): ItemData[] => {
    const sim = new DropSimulator(this.dropTable);
    const loot = sim.getDrops(amount);
    return loot;
  };

  getExperience = (amount = 1, styleExp: StyleExperience): ExpReward[] => {
    const { hitpoints } = this.data;

    switch (styleExp) {
      case "shared":
        return [
          { skill: "hitpoints", amount: hitpoints * 1.33 * amount },
          { skill: "attack", amount: hitpoints * 1.33 * amount },
          { skill: "strength", amount: hitpoints * 1.33 * amount },
          { skill: "defence", amount: hitpoints * 1.33 * amount },
        ];
      case "ranged and defence":
        return [
          { skill: "hitpoints", amount: hitpoints * 1.33 * amount },
          { skill: "ranged", amount: hitpoints * 2 * amount },
          { skill: "defence", amount: hitpoints * 2 * amount },
        ];
      case "magic and defence":
        return [
          { skill: "hitpoints", amount: hitpoints * 1.33 * amount },
          { skill: "magic", amount: hitpoints * 2 * amount },
          { skill: "defence", amount: hitpoints * 2 * amount },
        ];
      default:
        return [
          { skill: "hitpoints", amount: hitpoints * 1.33 * amount },
          { skill: styleExp, amount: hitpoints * 4 * amount },
        ];
    }
  };

  // todo remove later, only for debug
  resultToNames = (amount = 1) => this.kill(amount).map((drop) => {
    const { item, amount } = drop;
    const name = itemSearchData.getName(item);
    return { name, amount };
  }, {});
}
