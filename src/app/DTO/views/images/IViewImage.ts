import {TypeImage} from "../../enums/typeImage";

export interface IViewImage {
  id: string;
  name: string;
  dateCreated: Date;
  isComporess: string;
  albumId: string;
  image: any;
  typeImage: TypeImage;
  isCover: boolean;
  url: string|null;
}

export interface IChooseImage extends IViewImage{
  isChoose: boolean;
}
