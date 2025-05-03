import { Observable } from "rxjs";
import { PostStatus } from "../../enums/postStatus";
import { IViewBusinessProfile } from "../business/IViewBussinessProfile";

export interface IViewAnswerPost {
    id: string|null;
    text: string;
    dateCreated: Date;
    profile: IViewBusinessProfile;
    parentId: string;
    postStatus: PostStatus;
    profileUserId: string;
    answers: IViewAnswerPost[];
}