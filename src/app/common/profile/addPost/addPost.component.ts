import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription, filter, take, takeLast } from 'rxjs';
import { IResponse } from 'src/app/DTO/classes/IResponse';
import { IPost } from 'src/app/DTO/classes/posts/IPost';
import { PostStatus } from 'src/app/DTO/enums/postStatus';
import { CropImageModalComponent } from 'src/app/baedit/components/modals/crop-image-modal/crop-image-modal.component';
import { PostService } from 'src/services/posts.service';


@Component({
  selector: 'app-addPost',
  templateUrl: './addPost.component.html',
  styleUrls: ['./addPost.component.css'],
  providers: [PostService]
})
export class AddPostComponent implements OnInit, OnDestroy {
  url: string | ArrayBuffer | null = null;

  getStateSave() {
    if (!this.outputBoxVisible || !this.postText){
      return true;
    } else {
      return false;
    }
  }

  uploadStatus: number | undefined = undefined;
  uploadResult = '';
  fileName = '';
  fileSize = '';
  size = 0;

  outputBoxVisible = false;
  textError: string|null = 'Загрузите фото или видео';
  postText: string|null = null;
  formData: FormData|null = null;
  format: string|null = 'image';
  loadResult$: Observable<IResponse> = new Observable();
  private unsubscribe$: Subscription|null = null;

  handleDragOver($event: DragEvent) {

  }
  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
  }
  handleDrop($event: DragEvent) {

  }
onFileSelected($event: any) {
  this.formData = null;
  const file: File = $event.dataTransfer?.files[0]
   ||  			  $event.target?.files[0];

  if (file) {
    this.fileName = file.name;
    var extent = this.fileName.split('.')[1];
    
   // this.size += file.size;
    this.fileSize = `${(file.size / 1024).toFixed(2)} KB из 10 МБ` ;
    this.outputBoxVisible = true;
    this.textError = this.fileSize;
    if (extent === 'mp4'){
      this.format = 'video';
    }
    if (!this.format){
      this.textError = 'Для загрузки видео используйте файлы в формате mp4';
      
    }
    if (file.size/1024 > 10000){
      this.textError = 'Размер видео должен быть не более 10 мб';
      this.outputBoxVisible = false;
    }
    if (this.outputBoxVisible && this.format){
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
      } else if(file.type.indexOf('video')> -1){
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    this.formData = new FormData();
    this.formData.append('file', file);
  }
  }
}
  createPost() {
    let post: IPost = {
      title: null,
      id: null,
      geo: null,
      tag: null,
      parentId: null,
      text: this.postText!,
      profileUserId: this.id!,
      dateCreated: new Date(),
      postStatus: PostStatus.Active,
      isСompetitive: false,
      isLeaveComment: true,
      isFixed: false,
      
    };
    this.unsubscribe$ = this._social.savePost(this.id!, post).subscribe(result => {
      if (result.code === 201){
      if (this.formData){
        if (this.format === 'video')
          this._social.uploadVideo(this.formData, (result.data as IPost).id!).subscribe(res => {
            this._router.navigate([`profilebisacc/${this.id}/lenta`]);
          });
        else {
          this._social.uploadImage(this.formData, (result.data as IPost).id!).subscribe(res => {
            this._router.navigate([`profilebisacc/${this.id}/lenta`]);
          });
        }
      }else {
        this._router.navigate([`profilebisacc/${this.id}/lenta`]);
      }

    }
    });
  }


  id: string|null = null;
remainingText: number = 0;

  constructor(private _router: Router,
    private modalService: NgbModal,
    private _social: PostService
  ) {
    this._router.events.pipe(filter(e => e instanceof NavigationEnd)
    , take(1)). subscribe(
        (event: any) =>  {
            let route =  this._router.url.split('/');
            if (route.length > 2){
              this.id = route[2];
            }
          }
        
      );
   }

  ngOnInit() {
    this.loadResult$.subscribe(resilt => {
      this._router.navigate([`profilebisacc/${this.id}/lenta`]);
      
    });
  }

}
