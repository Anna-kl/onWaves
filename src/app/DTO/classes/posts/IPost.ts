import { PostStatus } from "../../enums/postStatus";

export interface IPost {
    id: string|null;
    title: string|null;
    text: string;
    profileUserId: string;
    parentId: string|null;
    dateCreated: Date;
    isFixed: boolean;
    geo: string|null;
    tag: string|null;
    isСompetitive: boolean|null;
    postStatus: PostStatus;
    isLeaveComment: boolean;
}