import { dropTable } from "../drop-simulator/drop-tables/CorporealBeast"
import { Monster } from "../model/Monster";

export const corporealBeast = new Monster({
  name: "Corporeal Beast",
  dropTable,
});
