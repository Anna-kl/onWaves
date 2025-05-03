import {Injectable} from "@angular/core";
import {environment} from "../enviroments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BusService} from "./busService";
import {Album} from "../app/DTO/classes/images/album";
import {IResponse} from "../app/DTO/classes/IResponse";
import {IAlbumWithFoto} from "../app/DTO/views/images/IAlbumWithFoto";
import {IViewImage} from "../app/DTO/views/images/IViewImage";

@Injectable()

export class AlbumsService {
  private url = environment.Uri + 'albums/';

  constructor(private http: HttpClient) {
  }

  getImagesService(id: string){
    return this.http
        .get<IViewImage[]>(`${this.url}get-service/${id}`);
  }
  saveAlbums(id: string, album: Album){
    let  headers: HttpHeaders = new HttpHeaders();
    return this.http.post<IResponse>(`${this.url}${id}`, album, {headers})
  }

  getImagesFromService(serviceId: string){
    return this.http.get<IViewImage[]>(`${this.url}get-service/${serviceId}`);
  }
  getAlbums(id: string){
    return this.http.get<IAlbumWithFoto[]>(`${this.url}${id}`);
  }

  saveImage(formData: any, idAlbum: string){
    let  headers: HttpHeaders = new HttpHeaders();
    return this.http.post<IResponse>(`${this.url}image/${idAlbum}`, formData, {headers});
  }

  saveImageService(imageIds: string[], serviceId: string){
    let  headers: HttpHeaders = new HttpHeaders();
    return this.http.post<IResponse>(`${this.url}save-image-service/${serviceId}`, {imageIds}, {headers});
  }

  getImages(albumId: string){
    return this.http.get<IViewImage[]>(`${this.url}image/${albumId}`);
  }

  getImage(imageId: string){
    return this.http.get<IViewImage>(`${this.url}get-image/${imageId}`);
  }

  setMainImage(albumId: string, imageId: string){
    let image = {'imageId': imageId};
    return this.http.put<IResponse>(`${this.url}main-foto/${albumId}`, image);
  }

  deleteImage(imageId: string){
    return this.http.delete<IResponse>(`${this.url}image/${imageId}`)
  }

  deleteAlbum(id: string){
    return this.http.delete<IResponse>(`${this.url}album/${id}`)
  }
}
