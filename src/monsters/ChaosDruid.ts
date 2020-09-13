import { dropTable } from "../drop-simulator/drop-tables/ChaosDruid"
import { Monster } from "../model/Monster";

export const chaosDruid = new Monster({
  name: "Chaos Druid",
  dropTable,
});
