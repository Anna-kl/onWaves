export interface IAlbumWithFoto {
  id: string;
  name: string;
  dateCreated: Date;
  profileUserId: string;
  image: any;
  countImages: number;
  isChoosed?: boolean;
}
