import { PostStatus } from "../../enums/postStatus";
import { IViewBusinessProfile } from "../business/IViewBussinessProfile";
import { IViewImage } from "../images/IViewImage";
import { IViewAnswerPost } from "./IViewAnswerPost";

export interface IViewPost extends IViewAnswerPost {
    title: string|null;
    dateCreated: Date;
    isFixed: boolean;
    geo: string|null;
    isLeaveComment: boolean;
    tag: string|null;
    isСompetitive: boolean;

    images: IViewImage|null;
}