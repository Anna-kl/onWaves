import {Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {BusService} from "../../../../services/busService";
import {Router} from "@angular/router";
import {UserType} from "../../../DTO/classes/profiles/profile-user.model";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {MessageNotificationService} from "../../../../services/notification.service";
import {MessageNotification} from "../../../DTO/classes/notifications/MessageNotification";
import {RecordService} from "../../../../services/record.service";
import {DomSanitizer} from "@angular/platform-browser";
import {select, Store} from "@ngrx/store";
import {notificationCountMessages} from "../../../ngrx-store/notification/notification.selectors";
import {Observable, Subscription} from "rxjs";
import {LoginService} from "../../../auth/login.service";
import {ProfileService} from "../../../../services/profile.service";

import { selectProfileMainClient, selectTokenMainClient} from "../../../ngrx-store/mainClient/store.select";

import {ILinkState} from "../../../ngrx-store/links/interface/ILinkState";
import { getIconAvatar } from 'src/helpers/common/avatar1';


@Component({
  selector: 'app-header-ba',
  templateUrl: './header-ba.component.html',
  styleUrls: ['./header-ba.component.scss'],
  providers: [MessageNotificationService, RecordService]
})
export class HeaderBAComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subscription|null = null;

  auth$: Observable<IViewBusinessProfile|null> = new Observable();
  @Input() baProfiles: IViewBusinessProfile[] = [];
  notifications: MessageNotification[] = [];
  countRecord: number = 0;
  typeUserForEquels: UserType | undefined = UserType.User;
  link: ILinkState|null = null;
  constructor(private _events: BusService,
              private _router: Router,
              private sanitizer: DomSanitizer,
              private _apiRecord: RecordService,
              private store$: Store,
              private _login: LoginService,)
  {

   //  this.auth$ = this.store$.select(selectProfileMainClient);
    
    // this._events.choosedProfile.subscribe(res => {
    //   this.auth = res;
    //   if (this.auth) {

    //     // this._notification.getNotifications(this.auth?.id!).subscribe(
    //     //   result => {
    //     //     this.notifications = result;
    //     //     this.notification = this.notifications.filter(_ => _.readed === null).length;
    //     //   });
   this.notification$ = this.store$.pipe(select(notificationCountMessages));
   this.auth$ = this.store$.pipe(select(selectProfileMainClient));
    //  .subscribe(
    //    result => {console.log(result)});
    //     this.auth = result;

    //   });
    //     let t = toLocale(new Date());

    //   }
    // });

  }

  redirectMainPage() {
    this._router.navigate(['/']);
  }
  ngOnInit(): void {
    this.unsubscribe$ = this.auth$.subscribe(result => {
        if (result) {
          this._apiRecord.getCountRecordsForToday(result.id!, new Date().toLocaleString()).subscribe(
            result => {
              this.countRecord = result;
            });
        }
    });

  }

  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
  }
// Главное Меню юзера и бизнеса
  @Input() isAuth: boolean = false;
  notification$: Observable<number> = new Observable<number>();
  myNotes(auth: IViewBusinessProfile){
    if (auth) {
      // Главное Меню юзера
      if (auth.userType === UserType.User){
        this._router.navigate(['/profile-user', auth?.id]);
    } else { // Главное Меню бизнеса
      this._router.navigate(['/notes', auth!.id]);
    }
  }

}
  setProfile($event: IViewBusinessProfile){
    this._events.chooseMainProfile($event);
 //   this.auth = $event;
  }
 GoToProfile(auth: IViewBusinessProfile) {
     // Главное Меню юзера
     if (auth.userType === UserType.User) {
       this._router.navigate(['/page-user/', auth?.id]);
     } else { // Главное Меню бизнеса
       this._router.navigate(['/profilebisacc/', auth!.id]);
     }
 }
 GoToMainPage() {
 // this._router.navigate(['/',this.auth?.id])
 }

 GoToNotifications() {
  this._router.navigate(['static/notifications'])
 }

  getAvatar(avatar: any) {
    if (avatar) {
      avatar = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${avatar}`);
    } else {
      avatar = '/assets/img/ui/ava.svg';
    }
    return avatar;
  }

  protected readonly getIconAvatar = getIconAvatar;
}
