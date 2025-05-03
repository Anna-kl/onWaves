import {TypeViewList} from "../../enums/typeViewList";

export interface IViewCategoryTree {
  id: number;
  name: string;
  isChecked: boolean;
  childrens?: IViewCategoryTree[];
  isShow?: TypeViewList;
}
