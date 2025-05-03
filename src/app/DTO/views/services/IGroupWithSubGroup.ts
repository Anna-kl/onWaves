import {Group} from "./IViewGroups";
import {subGroup} from "./IViewSubGroups";

export interface IGroupWithSubGroups {
  isOpen: boolean;
  group: Group;
  subGroups: subGroup[];
}
