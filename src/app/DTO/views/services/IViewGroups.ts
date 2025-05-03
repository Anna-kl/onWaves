import {subGroup} from "./IViewSubGroups";
import {Service} from "../../classes/services/Service";

export interface Group {
    id: string|null;
    name: string;
    profileUserId: string;

  }

export interface GroupShow  {
    isOpen: boolean;
    group: Group;
    subGroups: Service[];
}

export interface GroupWithDate {
  id: string|null;
  name: string;
  profileUserId: string;
  dateCreated: string;
}

export interface GroupShowWithDate  {
  isOpen: boolean;
  group: Group;
  subGroups: Service[];
  dateCreated: string;
}