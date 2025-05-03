import {CommentType} from "../../enums/commentType";

export interface Comment {
  id: string;
  dateCreated: Date;
  text: string;
  profileUserId: string;
  toObjectId: string;
  type: CommentType;
}
