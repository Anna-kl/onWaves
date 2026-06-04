import {TypeImage} from "../../enums/typeImage";

export interface IViewImage {
  id: string;
  name: string;
  dateCreated: Date;
  albumId?: string;
  typeImage: TypeImage;
  isCover: boolean;
  url: string;
  thumbUrl?: string;
  description?: string;
  serviceIds?: string[];
}

export interface IChooseImage extends IViewImage{
  isChoose: boolean;
}

