import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {StoreService} from "../../ngrx-store/mainClient/store.service";
import {IViewAddress} from "../../DTO/views/IViewAddress";
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient} from "../../ngrx-store/mainClient/store.select";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../../baedit/components/uslugi/modal/modal.component";
import {ChangeAvatarUAComponent} from "../../common/modals/change-avatar-ua/change-avatar-ua.component";
import {LoginService} from "../../auth/login.service";
import { IViewPost } from 'src/app/DTO/views/posts/IViewPost';
import { IViewBusinessProfile } from 'src/app/DTO/views/business/IViewBussinessProfile';
import { PostService } from 'src/services/posts.service';
import { filter, forkJoin, mergeMap, of, skipWhile, Subscription, switchMap, tap } from 'rxjs';
import { ProfileService } from 'src/services/profile.service';

@Component({
  selector: 'app-personal-page-user',
  templateUrl: './personal-page-user.component.html',
  styleUrls: ['./personal-page-user.component.scss'],
  providers: [PostService]
})
export class PersonalPageUserComponent implements OnInit, OnDestroy {
  // user: IViewBusinessProfile | null = null;
  mainProfileCleint: IViewBusinessProfile|null = null;
  posts: IViewPost[] = [];
  private unsubscribe$: Subscription|null = null;
  slice: number = 1;
    // Флаг наличия купона
  hasCoupon = true;

  // Значение купона в рублях
  couponValue = 500;
  hasCoupon$: any;
  
  constructor(private _storeService: Store,
              private sanitizer: DomSanitizer,
              private _loginService: LoginService,
              private _post: PostService,
              private _profile: ProfileService,
              private modalService: NgbModal) {
    //получаем данные профиля из store
    

    // this._events.choosedProfile.subscribe(result => {this.user = result;});
  }

  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event: any) {
    let scrollOffset = $event.srcElement.children[0].scrollTop;

    if (scrollOffset > this.slice*1000 && this.slice !== -1){
      this.unsubscribe$ = this._post
      .getRecommends(this.mainProfileCleint?.id!, this.slice + 1, 1)
      .subscribe(result => {
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

  ngOnInit(): void {

    this._storeService.pipe(
  // 1) Сначала берём только непустого пользователя
  select(selectProfileMainClient),
  filter(user => user != null),

  // 2) Как только появится объект user, переключаемся на getRecommends
  switchMap(user => 
    this._post.getRecommends(user!.id!, 0, 2).pipe(
      // 3) В tap сохраняем посты и инициируем загрузку комментариев
      tap(posts => this.posts = posts),
      // 4) Затем с помощью mergeMap + forkJoin ждём ответы для каждого поста без comments
      mergeMap(posts => {
        const requests = posts
          .filter(item => !item.answers)
          .map(item =>
            this._post.getComments(item.id!).pipe(
              tap(comments => item.answers = comments)
            )
          );
          this.mainProfileCleint = user;
          if(user)
            this.hasCoupon$ = this._profile.hasCoupon(user.id!);
        // Если нет ни одного запроса — возвращаем пустой поток
        return requests.length ? forkJoin(requests) : of([]);
      })
    )
  )
)
// 5) Подписываемся, чтобы всё запустилось
.subscribe({
  next: () => {
    // тут можно отрисовать обновлённый this.posts, но чаще
    // достаточно, что в tap мы уже мутировали this.posts
    console.log('Рекомендации и комментарии загружены', this.posts);
  },
  error: err => console.error(err)
});

    // this._storeService.pipe(select(selectProfileMainClient)).pipe(
    //   tap(user => {
    //     console.log(user);
    //     this.mainProfileCleint = user;
    //     this._post.getRecommends(this.mainProfileCleint?.id!, 0, 2).subscribe(result => {
    //     this.posts = [];
    //     this.posts = result;
    //     this.posts.forEach(item => {
    //       if (!item.answers){
    //         this._post.getComments(item.id!).subscribe(res => {
    //           item.answers = res;
    //         });
    //       }
    //     });
    //   })})
    // )
    // .subscribe(
    //     mainProfile => {
    //       this.mainProfileCleint = mainProfile;
    //     }
    // );


    // if (this.mainProfileCleint){
    //   this.unsubscribe$ = this._post.getRecommends
    //   (this.mainProfileCleint.id!, 0, 2).subscribe(result => {
    //     this.posts = [];
    //     this.posts = result;
    //     this.posts.forEach(item => {
    //       if (!item.answers){
    //         this._post.getComments(item.id!).subscribe(res => {
    //           item.answers = res;
    //         });
    //       }
    //     });
    //   });
    // }
  }

  getAvatar(avatar: any) {
    if (avatar) {
      avatar = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${avatar}`);
    } else {
      avatar = '/assets/img/AvatarBig.png';
    }
    return avatar;
  }


  // getAddress(){
  //   if (this.profileStoreMainProfileClient$) {
  //     return this.profileStoreMainProfileClient$?.address?.city;
  //   } else {
  //     return 'Не указан';
  //   }
  // }
  getCity(address: IViewAddress) {
    if (address) {
      return address.city;
    } else {
      return '';
    }
  }

  getStreet(address: IViewAddress) {
    if (address) {
    return `${address.street}, ${address.home}, ${address.apartment}`;
    } else {
      return '';
    }
  }

  changeAvatar() {
    if (this.mainProfileCleint){
    const modalRef = this.modalService.open(ChangeAvatarUAComponent);
    modalRef.componentInstance.id = this.mainProfileCleint.id;
    modalRef.componentInstance.avatar = this.mainProfileCleint.avatar;
    modalRef.result.then(result => {
      if (result){
        this._loginService.updateProfile(this.mainProfileCleint?.id!);
      }
    });
  }
  }
}
