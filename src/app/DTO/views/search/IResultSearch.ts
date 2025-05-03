import {IViewFullInfo} from "../IViewFullInfo";
import {IViewAddress} from "../IViewAddress";
import {IViewBusinessProfile} from "../business/IViewBussinessProfile";

export interface IResultSearch extends IViewBusinessProfile {
    mainCategoryIds: number[];
    categoryIds: number[];
}
