import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subject, Subscription,  filter, take, } from 'rxjs';
import { IViewAnswerPost } from 'src/app/DTO/views/posts/IViewAnswerPost';
import { IViewPost } from 'src/app/DTO/views/posts/IViewPost';
import { PostService } from 'src/services/posts.service';

@Component({
  selector: 'app-Lenta',
  templateUrl: './Lenta.component.html',
  styleUrls: ['./Lenta.component.scss'],
  providers: [PostService]
})
export class LentaComponent implements OnInit, OnDestroy {


  // getAnswers(post: IViewPost): any {
  //   if (post.id){
  //     if (post.answers.length === 0 ){
  //     this._post.getComments(post.id!).pipe(take(1)).subscribe(result => {
  //       post.answers.push(...result);
  //     }).closed;
  //   }
  //   }else {
  //     return null;
  //  }
  // }

  private unsubscribe$: Subscription|null = null;
  answers: IViewAnswerPost[] = [];
  all$: Observable<IViewPost[]> = new Observable();
  slice: number = 1;
  posts: IViewPost[]|null = null;
  isEdit: boolean = false;
  previousUrl: string|null = null;
  isRecommend: boolean = false;

  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
  }

  posts$: Observable<IViewPost[]>|undefined = undefined;


  id: string|null = null;
  end$ = new Subject();

  constructor(private _router: Router,
     private _activate: ActivatedRoute,
    public _post: PostService){
      this._router.events.pipe(filter(e => e instanceof NavigationEnd)
    , take(1)). subscribe(
        (event: any) =>  {
            this.previousUrl = event.url;
            if (this.previousUrl?.includes('profilebisacc')){
              this.isEdit = true;
            }
            if (this.previousUrl?.includes('')){
              this.isRecommend = true;
            }
            let route =  this._router.url.split('/');
            if (route.length > 2){
              this.id = route[2];

             
            }
          }
        
      );

     }

  createPost() {
    this._router.navigate([`/profilebisacc/${this.id}/add-post`]);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event: any) {
    let scrollOffset = $event.srcElement.children[0].scrollTop;

    if (scrollOffset > this.slice*1000 && this.slice !== -1){
      this.unsubscribe$ = this._post
      .getPosts(this.id!, this.slice + 1, 1).subscribe(result => {
        if (result.length > 0){
          this.posts?.push(...result);
          this.posts?.forEach(item => {
          if (!item.answers){
            this._post.getComments(item.id!).subscribe(res => {
              item.answers = res;
            });
          }});
        }else {
          this.slice = -1;
        }
      });
      if (this.slice !== -1)
        this.slice += 1;
    }
  //  this.unsubscribe$?.unsubscribe();
    // var iframes = document.querySelectorAll('iframe');
    // Array.prototype.forEach.call(iframes, iframe => { 
    //   iframe.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
    // });
      // let scrollOffset = $event.srcElement.children[0].scrollTop;
      // this.slice += 1;
      // this.posts.push(...this.all.slice(this.slice, this.slice + 1));
      // this.all$.subscribe(result => {
      //   this.posts.push(...result.slice(this.slice, this.slice + 1));
      // }).unsubscribe();
  }
  
  ngOnInit() {
    if (this.id){
      this.unsubscribe$ = this._post.getPosts(this.id, 0, 2).subscribe(result => {
        this.posts = [];
        this.posts = result;
        this.posts.forEach(item => {
          if (!item.answers){
            this._post.getComments(item.id!).subscribe(res => {
              item.answers = res;
            });
          }
        });
      });
      // this.posts$ = this._post.getPosts(this.id, 0, 2).pipe(switchMap(
      //   x =>  of(x.map(item => 
      //     {
      //       return {
      //         ...item,
      //         answers$: this._post.getComments(item.id!)
      //       };
      //     }
      //   ))
         
      // ));
      // this.all$.subscribe(result => {
      //   this.posts.push(...result.slice(this.slice, this.slice + 1));
      // });
    }
      
//       (of(x => 
//        x.map(_ => 
// this._post.getComments(_.id!).pipe(take(1))
//           .forEach(result => {
//         _.answers.push(...result);
//           }
//         )
//       )
//       ))
    }
  

}
