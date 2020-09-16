import { ItemData } from "../types/types";


export class Bank {
  private drops: ItemData[];
  constructor() {
    this.drops = [];
  }

  add = (newDrops: ItemData[]) => {
    this.drops = [...this.drops, ...newDrops];
    return this;
  };
}
