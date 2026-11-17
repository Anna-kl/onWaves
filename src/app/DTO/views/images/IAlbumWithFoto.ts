export interface IAlbumWithFoto {
  id: string;
  name: string;
  isPublished?: boolean;
  sortOrder?: number;
  dateCreated: Date;
  profileUserId: string;
  image: any;
  countImages: number;
  isChoosed?: boolean;
}
