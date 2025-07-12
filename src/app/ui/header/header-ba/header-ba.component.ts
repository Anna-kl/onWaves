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
// import {notificationCountMessages} from "../../../ngrx-store/notification/notification.selectors";
import {filter, first, firstValueFrom, Observable, skipWhile, Subscription, take} from "rxjs";
// import {LoginService} from "../../../auth/login.service";
// import {ProfileService} from "../../../../services/profile.service";

import { selectProfileMainClient, selectTokenMainClient} from "../../../ngrx-store/mainClient/store.select";

import {ILinkState} from "../../../ngrx-store/links/interface/ILinkState";
import { getIconAvatar } from 'src/helpers/common/avatar1';
import { OrderSignalrService } from 'src/services/notification.signal';


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
  notificationCount$: Observable<number> = new Observable();
  auth: IViewBusinessProfile | null = null;

  constructor(private _events: BusService,
              private _router: Router,
              private orderSvc: OrderSignalrService,
              private sanitizer: DomSanitizer,
              private _apiRecord: RecordService,
              private store$: Store,
              private _apiNotification: MessageNotificationService,)
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
  //  this.notification$ = this.store$.pipe(select(notificationCountMessages));
   
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
  async ngOnInit() {   
    this.auth$ = this.store$.pipe(select(selectProfileMainClient)); 
    // this.auth = await firstValueFrom(this.auth$);
    // console.log(this.auth);
    this.auth$.pipe(skipWhile(data => data === null)).subscribe(result => {
      
      this.auth = result;
      this.notificationCount$ = this._apiNotification.getCountNotifications(result?.id!);
        this._apiRecord.getCountRecordsForToday(result?.id!, new Date().toLocaleString()).subscribe(
          resultCount => {
            this.countRecord = resultCount;
          });  
        
    });
    this.orderSvc.startConnection();
    this.orderSvc.newOrder$.subscribe(({ userId, recordId }) => {
      if (userId)
          this.notificationCount$ = this._apiNotification.getCountNotifications(this.auth?.id!);
        
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
  this.unsubscribe$ = this._apiNotification.readNotifications(this.auth?.id!).subscribe(result => {
      this.notificationCount$ = this._apiNotification.getCountNotifications(this.auth?.id!);
  });
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
