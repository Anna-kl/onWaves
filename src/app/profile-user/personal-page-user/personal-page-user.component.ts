import {Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {IViewAddress} from "../../DTO/views/IViewAddress";
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient} from "../../ngrx-store/mainClient/store.select";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ChangeAvatarUAComponent} from "../../common/modals/change-avatar-ua/change-avatar-ua.component";
import {LoginService} from "../../auth/login.service";
import { IViewPost } from 'src/app/DTO/views/posts/IViewPost';
import { IViewBusinessProfile } from 'src/app/DTO/views/business/IViewBussinessProfile';
import { resolveAvatarUrl } from 'src/helpers/common/avatar1';
import { PostService } from 'src/services/posts.service';
import { filter, forkJoin, mergeMap, Observable, of, skipWhile, Subscription, switchMap, tap } from 'rxjs';
import { ProfileService } from 'src/services/profile.service';
import { WelcomeCouponMe } from 'src/app/DTO/views/promo/welcome-coupon';
import { WelcomeCouponService } from 'src/services/welcome-coupon.service';
import { formatRub, welcomeTierList } from 'src/helpers/common/welcome-coupon';
import { Md5 } from 'ts-md5';
import { AuthService } from 'src/services/auth.service';
import { DictionaryService } from 'src/services/dictionary.service';
import { ServiceRegisterBusinessProfile } from 'src/services/service-register-business';

@Component({
  selector: 'app-personal-page-user',
  templateUrl: './personal-page-user.component.html',
  styleUrls: ['./personal-page-user.component.scss'],
  providers: [PostService,AuthService]
})
export class PersonalPageUserComponent implements OnInit, OnDestroy {
  addCities() {
    if (this.mainProfileCleint && this.address)
      this._profile.changeCity(this.mainProfileCleint.id!, this.address).subscribe(result => {
        if (result.code === 200){
          this.savedCity = this.address;
          this.addCity = false;
        }
    });
  }
  /** Показывать кнопку «Подтвердить» — выбран город, отличный от сохранённого. */
  addCity = false;


  toStringFromInputs(): string {
  return this.inputs
    .toArray()
    .map(ref => ref.nativeElement.value ?? '')
    .join('');
  }

  sendCode() {
  throw new Error('Method not implemented.');
  }

  isEmailValid(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((this.emailInput ?? '').trim());
  }

    @ViewChildren('codeInput')
    inputs!: QueryList<ElementRef>;

  changeEmail() {
    if (this.mainProfileCleint)
      if (this.mainProfileCleint.email !== this.emailInput && this.isEmailValid())
       
          this.emailVerified = true;
        

  }
  changePhone(event:Event) {
    if (this.phoneInput)
        if (this.phoneInput.length > 10)
          if (this.phoneInput !== this.mainProfileCleint?.phone)
            this.phoneVerified = true;
        
  }
   moveNext(event: any, index: number) {

    const value = event.target.value;

    if (value && index < 3) {

      const next = this.inputs.toArray()[index + 1];
      next.nativeElement.focus();

    }

  }

  movePrev(event: any, index: number) {

    if (event.key === 'Backspace' && !event.target.value && index > 0) {

      const prev = this.inputs.toArray()[index - 1];
      prev.nativeElement.focus();

    }
  }

  errorCode = false;
  errorMessage: string|null = null;
  confirmEmail() {

  }
  showEmailCode: any;
  emailCode: any;
  uuid: any=null;
  sendEmailCode() {

  }
  md5 = new Md5();
  emailVerified = false;
  phoneVerified = false;
  confirmPhone() {
    if (this.inputs.length === 4 && this.uuid){
        this._auth.confirmCode(this.uuid.uuid, this.uuid.id, this.toStringFromInputs()).subscribe(result => {
            if (result.code === 500){
              this.errorMessage = result.message;
            } else{
              this.showPhoneCode = false;
              this.phoneVerified = false;
            }
        });

    }

  }
  showPhoneCode = false;
  phoneCode = false;
    sendPhoneCode() {
      let id = this.md5.appendStr(`${new Date().toLocaleDateString()}${this.phoneInput}`).end()!.toString().substring(20);
      this.showPhoneCode = true;
      if (this.mainProfileCleint?.id && this.phoneInput)
      this._auth.confirmContacts(this.mainProfileCleint?.id, this.phoneInput, id, 0).subscribe(
          result => {
            if (result.code === 200)
            this.uuid = {id: result.data, uuid: id}
          }
      );
    }
  // user: IViewBusinessProfile | null = null;
  mainProfileCleint: IViewBusinessProfile|null = null;
  posts: IViewPost[] = [];
  private unsubscribe$: Subscription|null = null;
  slice: number = 1;
  /** Раздел «Мой купон»: состояние права приходит с сервера (coupons/welcome/me). */
  welcomeMe: WelcomeCouponMe | null = null;
  protected readonly formatRub = formatRub;
  protected readonly welcomeTierList = welcomeTierList;
  phoneInput: string|undefined = undefined;
  emailInput: string|undefined = undefined;
  
  constructor(private _storeService: Store,
              private sanitizer: DomSanitizer,
              private _loginService: LoginService,
              private _post: PostService,
              private _auth: AuthService,
              private _serviceRegisterBusinessProfile: ServiceRegisterBusinessProfile,
              private _profile: ProfileService,
              private _welcomeCoupon: WelcomeCouponService,
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
  address: string|null = null;
  /** Город, уже сохранённый в профиле — с ним сравниваем выбор, чтобы не предлагать сохранять то же самое. */
  private savedCity: string|null = null;

  /** Справочник городов целиком; фильтрацию и рендер подсказок делает app-city-autocomplete. */
  cities: string[] = [];

  /** Город выбран (или очищен) в комбобоксе. */
  onCityChange(city: string|null) {
    this.address = city;
    this.addCity = !!city && city !== this.savedCity;
  }

  public async getListCities(){
    (await this._serviceRegisterBusinessProfile.getCities())
      .subscribe(list => {
        this.cities = list ?? [];
      });
  }

  async ngOnInit() {

    await this.getListCities();
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
          if (this.mainProfileCleint){
            this.phoneInput = this.mainProfileCleint.phone;
            this.emailInput = this.mainProfileCleint.email;
            if (this.mainProfileCleint.address){
              this.address = this.mainProfileCleint.address.city ?? null;
              this.savedCity = this.address;
              this.addCity = false;
            }
          }
          if (user?.id) {
            this._welcomeCoupon.getMine(user.id).subscribe(me => this.welcomeMe = me);
          }
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
    return resolveAvatarUrl(avatar);
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
    modalRef.componentInstance.avatar = this.mainProfileCleint.avatarUrl;
    modalRef.result.then(result => {
      if (result){
        this._loginService.updateProfile(this.mainProfileCleint?.id!);
      }
    });
  }
  }
}
