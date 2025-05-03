
import {Injectable} from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/enviroments/environment";
import { IResponse } from "src/app/DTO/classes/IResponse";
import { IPost } from "src/app/DTO/classes/posts/IPost";
import { IViewPost } from "src/app/DTO/views/posts/IViewPost";
import { IViewAnswerPost } from "src/app/DTO/views/posts/IViewAnswerPost";



@Injectable()
export class PostService {

  constructor(private http: HttpClient) {
  }
  private url = environment.Uri + 'posts/';

  uploadVideo(formData: any, id: string){
    let  headers: HttpHeaders = new HttpHeaders();
    return this.http.post<IResponse>(`${this.url}load-video/${id}`,
     formData, {headers});

  }

  uploadImage(formData: any, id: string){
    let  headers: HttpHeaders = new HttpHeaders();
    return this.http.post<IResponse>(`${this.url}load-image/${id}`,
     formData, {headers});

  }

  getPosts(id: string, start: number, slice: number){
    return this.http.get<IViewPost[]>(`${this.url}posts-profile/${id}?start=${start}&slice=${slice}`);
  }

  
  getComments(id: string){
    return this.http.get<IViewAnswerPost[]>(`${this.url}get-comments/${id}`);
  }

  getRecommends(id: string, start: number, slice: number){
    return this.http.get<IViewPost[]>
    (`${this.url}posts-profile-recommendation/${id}?start=${start}&slice=${slice}`);
  }

  savePost(id: string, post: IPost){
    let  headers: HttpHeaders = new HttpHeaders();
    return this.http.post<IResponse>(`${this.url}${id}`, post, {headers});
  }
}