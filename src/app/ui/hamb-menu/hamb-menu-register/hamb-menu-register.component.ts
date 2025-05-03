// Ошибки влияющие на функционал прогрузки после регистрации БА?
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {BusService} from "../../../../services/busService";
import {ProfileService} from "../../../../services/profile.service";
import {CookieService} from "ngx-cookie-service";
import {DomSanitizer} from "@angular/platform-browser";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  RegisterBusinessProfileComponent
} from "../../../components/modals/register-business-profile/register-business-profile.component";
import {Router} from "@angular/router";
import {UserType} from "../../../DTO/classes/profiles/profile-user.model";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import { FormatsComponent } from 'src/app/components/modals/formats/formats.component';

import {getActionStateMainProfileClient, logoutAction} from "../../../ngrx-store/mainClient/store.action";
import {select, Store} from "@ngrx/store";
import {getActionChecedIdClient} from "../../../ngrx-store/checkedClientID/idClient.state";
import {selectTokenMainClient} from "../../../ngrx-store/mainClient/store.select";
import {LoginService} from "../../../auth/login.service";
import {filter, map, Observable, of, Subscription} from "rxjs";
import {requestAction} from "../../../ngrx-store/notification/notification.action";

import {getProfileMainClient, selectProfileMainClient} from "../../../ngrx-store/mainClient/store.select";

import {ILinkState} from "../../../ngrx-store/links/interface/ILinkState";

import {clearLinkAction} from "../../../ngrx-store/links/link.action";
import { getIconAvatar } from 'src/helpers/common/avatar1';



@Component({
  selector: 'app-hamb-menu-register',
  templateUrl: './hamb-menu-register.component.html',
  styleUrls: ['./hamb-menu-register.component.css'],
  providers: [ProfileService]
})
export class HambMenuRegisterComponent implements OnInit, OnDestroy{

  myChats(_t12: IViewBusinessProfile) {
    this._router.navigate([`chat-page/`]);
  }

  myClients(_t12: IViewBusinessProfile) {
      this._router.navigate([`clients/`]);
  }
  user!: Observable<IViewBusinessProfile>;
  // mainProfile: IViewBusinessProfile | undefined = undefined;
  token: string = "";
  private unsubscribe$: Subscription|null = null;
  typeUserForEquels: UserType | undefined = UserType.User;
  @Output() setProfile = new EventEmitter<IViewBusinessProfile>();

  auth: IViewBusinessProfile | null = null;
  @Output() closeWindow = new EventEmitter();
  @ViewChild('toggleButton') toggleButton: ElementRef | undefined;
  @ViewChild('menu') menu: ElementRef | undefined;
  isMenuOpen: boolean = false;
  baProfilesView: IViewBusinessProfile[]  = [];
  baProfiles: IViewBusinessProfile[] = [];
  link: ILinkState|null = null;
  mainProfile$: Observable<IViewBusinessProfile | null> = new Observable();
  permissionCreateBA: boolean = true;
  constructor(private _events: BusService,
              public _login: LoginService,
              private sanitizer: DomSanitizer,
              private modalService: NgbModal,
              private _router: Router,
              private store$: Store,
              private renderer: Renderer2,
              private _cookie: CookieService,
              private _apiProfiles: ProfileService) {
    this.store$.pipe(select(selectTokenMainClient)).subscribe(result =>
      this.token = result
    );
    //
    this.renderer.listen('window', 'click',(e:Event)=>{
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      let element = e.target as HTMLElement;
      if(element.className.toString().includes('menu btn1')
        || element.className.toString().includes('hamburger-icon2')
        || element.className.toString().includes('icon-left')
        || element.className.toString().includes('icon-right')){
        this.isMenuOpen = !this.isMenuOpen;
      }else {
        this.isMenuOpen = false;
      }
    });
///////////////////////////////////////////////////////////////////////////////////////
this.unsubscribe$ = this._login.mainCategoriesProfile$.subscribe(
  result => {
    if (result) {
      if (result.profile) {
        this.auth = result.profile;
        this.store$.dispatch(getActionStateMainProfileClient({profileMainClient: result.profile, tokenMainClient: result.token}));
          // this._login.allProfiles$.next([result.profile]);
      }
      // this._apiProfiles.getAllBusinessProfile(result?.profile?.id!, result?.token!,
      //     result.profile?.userType!).subscribe(
      //     view => {
      //       if (view.code === 404) {
      //           view.data = [];
      //       }
      //           view.data.push(result.profile);
      //           this._login.allProfiles$.next(view.data as IViewBusinessProfile[]);
      //           this.store$.dispatch(getActionStateBAProfileClient({profileBaClient: view.data.find((_:IViewBusinessProfile) => _.userType === UserType.Business)}))

      //         this.store$.pipe(select(selectLink)).subscribe(
      //             linkResult => {
      //                 if (linkResult.isHasLink){
      //                     this.store$.dispatch(clearLinkAction());
      //                     this._router.navigate([linkResult.link]);
      //                 }
      //             }
      //         );
      //     }
      // );
    }
  });
  /////////////////////////////////////////////////////////////////////////
  }
  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
  }

  routerCabinet(){
    this._router.navigate(['cabinet-ba']);
  }
  ngOnInit(): void {
    this.mainProfile$ = this.store$.pipe(select(selectProfileMainClient));
    // this._login.allProfiles$.subscribe(_ => {
    //   this.baProfiles = _;
    //   this.mainProfile = _.find(item => item.userType === UserType.User);
    //   if (this.mainProfile) {
    //     this.changeUser(this.mainProfile);
    //   }
    // });
    this.unsubscribe$ = this._login.allProfiles$.pipe(map(_ => _.filter(item => item.userType !== UserType.User))).subscribe(i => {
      if (i.length > 0){
        this.permissionCreateBA = false;
      }else {
        this.permissionCreateBA = true;
      }
    })
  }

  chooseUser(user: IViewBusinessProfile){
    let expiry = new Date();

    expiry.setDate(expiry.getDate()+365);
    this._cookie.set('profileId-ocpio', user.id!, expiry);
    this.changeUser(user);
    this.store$.dispatch(getActionStateMainProfileClient(
      { tokenMainClient: this.token, profileMainClient: user }));
    if (user.userType === UserType.Business) {
      this.closeWindow.emit({user: user, status:false});
      this._router.navigate([`/profilebisacc/${user.id}`]);
    } else {
      this._router.navigate([`/page-user/${user.id}`]);
    }
    // STORE
    // Передаем в Store Id выбранного клиента
  // this.store$.dispatch(getActionChecedIdClient({ checedIdClient:user.id! }))
  }

  changeUser(user: IViewBusinessProfile){
    this.baProfilesView = this.baProfiles.filter(_ => _.id !== user.id);
    // this.mainProfile = user;
    // this._events.chooseMainProfile(this.mainProfile);
    this.store$.dispatch(requestAction({request: user.id!}));
  }
  createBAProfile(){
    this.closeWindow.emit();
    // this.active = !this.active;
    const modalRef = this.modalService.open(RegisterBusinessProfileComponent);
  }

  createBAProfileFormats(){
    this.closeWindow.emit();
    // this.active = !this.active;
    const modalRef = this.modalService.open(FormatsComponent);
  }


  hasBusinessAccount(): boolean {
     //return true;
     return this.baProfiles.some(profile => profile.userType === UserType.Business);
  }

  checkBA(mainProfile: IViewBusinessProfile): boolean {
    return mainProfile.userType === UserType.Business;

  }

  exit() {

    this._cookie.delete('auth-token-ocpio');
    this._login.allProfiles$.next([]);
    this._login.mainCategoriesProfile$.next(null);
    this._login.isAutentificate$.next(false);
    this.store$.dispatch(logoutAction());
    this._router.navigate(['/']);
  }
  goToHelpPage() {
    this._router.navigate(['static/help']);
  }
  goToSettingsPage() {
    this._router.navigate(['static/settings']);
  }
  goToOServicePage() {
    this._router.navigate(['static/oservice']);
  }
  protected readonly getIconAvatar = getIconAvatar;
  protected readonly UserType = UserType;

  getAvatar(avatar: any) {
    if (avatar) {
      avatar = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${avatar}`);
    } else {
      avatar = '/assets/img/ui/ava.svg';
    }
    return avatar;
  }
    // Главное Меню юзера и бизнеса
    @Input() isAuth: boolean = false;
    notification: Observable<number> = new Observable<number>();
    myNotes(mainProfile: IViewBusinessProfile){
        // Главное Меню юзера
        if (mainProfile.userType === UserType.Business){
          this._router.navigate(['/notes', mainProfile.id]);

      } else { // Главное Меню бизнеса
        this._router.navigate(['/profile-user', mainProfile.id]);
      }
    }

  }

