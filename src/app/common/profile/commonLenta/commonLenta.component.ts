import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/DTO/classes/posts/IPost';
import { PostStatus } from 'src/app/DTO/enums/postStatus';
import { TypeImage } from 'src/app/DTO/enums/typeImage';
import { IViewPost } from 'src/app/DTO/views/posts/IViewPost';
import { getAddressProfile } from 'src/helpers/common/address';
import { PostService } from 'src/services/posts.service';

@Component({
  selector: 'app-commonLenta',
  templateUrl: './commonLenta.component.html',
  styleUrls: ['./commonLenta.component.css'],
  providers: [PostService]
})
export class CommonLentaComponent implements OnInit {

  @Input() posts: IViewPost[] = [];
  private unsubscribe$: Subscription|null = null;
  @Input() id: string|null = null;
  
  getSafeUrl(arg0: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(arg0);
  }

  getAvatar(avatar: string | null) {
    if (avatar) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${avatar}`);
    } else {
      return '/assets/img/AvatarBig.png';
    }
  }

  addAnswer(id: string, posts: IViewPost) {
    if (this.id){
    let post: IPost = {
      title: null,
      id: null,
      geo: null,
      tag: null,
      parentId: id,
      text: this.postText!,
      profileUserId: this.id!,
      dateCreated: new Date(),
      postStatus: PostStatus.Active,
      isСompetitive: false,
      isLeaveComment: true,
      isFixed: false,
    };
    this.unsubscribe$ = this._post.savePost(this.id!, post)
    .subscribe(result => {
      if (result.code === 201){
        this.unsubscribe$ = this._post.getComments(id).subscribe(res => {
          posts.answers = res;
        })
        this.postText = null;
    }});
  }
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
  }

  postText: string|null = null;

  constructor(
    public sanitizer: DomSanitizer,
    private _post: PostService
  ) { }

  ngOnInit() {
  }

  protected readonly TypeImage = TypeImage;
  protected readonly getAddress = getAddressProfile;
}
