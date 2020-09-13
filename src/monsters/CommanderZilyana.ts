import { dropTable } from "../drop-simulator/drop-tables/CommanderZilyana"
import { Monster } from "../model/Monster";

export const commanderZilyana = new Monster({
  name: "Commander Zilyana",
  dropTable,
});