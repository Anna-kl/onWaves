
import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageNotificationService} from '../../../../services/notification.service';
import {TypeNotification} from '../../../DTO/enums/typeNotification';
import {StatusNotification} from '../../../DTO/enums/statusNotification';
import {Router} from '@angular/router';
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient} from "../../../ngrx-store/mainClient/store.select";
import {notificationMessages} from "../../../ngrx-store/notification/notification.selectors";
import {IViewNotification} from "../../../DTO/views/notifications/IViewNotification";
import {DomSanitizer} from "@angular/platform-browser";
import {subGroup} from "../../../DTO/views/services/IViewSubGroups";
import {RecordStatus} from "../../../DTO/enums/recordStatus";
import {IChangeNotification} from "../../../DTO/views/notifications/IChangeNotification";
import { Subscription } from 'rxjs';

interface Notification {
message: any;
  id: string;
  title: string;
  body: string;
  
}
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [MessageNotificationService]
})
export class NotificationsComponent implements OnInit, OnDestroy {
  profile: any; 
  private unsubscribe$: Subscription|null = null;
  enumStatus: typeof StatusNotification = StatusNotification;
  enumType: typeof TypeNotification = TypeNotification;
  // notificationsList!: any[];
  idMessage: string | undefined;
  openMessage: boolean = false;
  id: any = '43865dc1-58d0-4f9a-aa67-774b7fab1c09';
  notificationsList: Notification[] = [];
  messages: IViewNotification[] = [];
  // notificationsList: Notification[] = [];
  // openMessage: boolean = false;
  selectedNotification: Notification | undefined;
  constructor(
    private sanitizer: DomSanitizer,
    private _router: Router,
    private store$: Store
  ) {}
  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
  }

  ngOnInit(): void {
    this.unsubscribe$ = this.store$.pipe(select(notificationMessages)).subscribe((notificationState) => {
      this.messages = notificationState;
    });

    this.unsubscribe$ = this.store$.pipe(select(selectProfileMainClient)).subscribe((result) => {
      this.profile = result;

      if (this.profile) {
        this.filterNotifications();
      }
    });
    
    
  }
  filterNotifications() {
    if (this.profile) {
      this.notificationsList = this.notificationsList.filter((notification) =>

        notification.id === this.profile.id
      );
    }
  }
  // loadNotifications() {
  //   const url = 'https://83.222.9.120/v1/api/notifications/${id}';
  //   this.http.get<Notification[]>(url).subscribe(
  //     (notifications: Notification[]) => {
  //       this.notificationsList = notifications;
  //       this.filterNotifications();
  //     },
  //     (error) => {
  //       console.error('Ошибка при загрузке уведомлений:', error);
  //     }
  //   );
  // }
  
    goToMain() {
      this._router.navigate(['/']);
    }
    openNotification(id: string) {
    this.openMessage = true;
    this.selectedNotification = this.notificationsList.find(notification => notification.id === id);
  }

  closeNotification() {
    this.openMessage = false;
    this.selectedNotification = undefined;
  }

  getAvatar(avatar?: string){
    if (avatar) {
       return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,
        ${avatar}`);
      } else {
       return  '/assets/img/AvatarBig.png';
      }
    }

  getNameServices(services: subGroup[]) {
    return services.map(_ => _.name).join('\n');
  }

  getIconStatus(recordStatus: RecordStatus) {
    if (recordStatus === RecordStatus.Created){
      return "/assets/img/ico/icons_all_size/ico_notification_v3_pc_24.svg";
    } else {
      return "/assets/img/ico/icons_all_size/ico_check_pc_24.svg";
    }
  }

  // goToRecords(message: IViewNotification) {
  //   this._apiNotification.changeStatus(this.id, {notificationId: message.id,
  //     state: StatusNotification.READ} as unknown as IChangeNotification).subscribe(result => {
  //     if (result.code === 200){
  //      this._router.navigate([`profile-ba/${this.id}/confirm-record`],
  //      // this._router.navigate([`profile-ba/${this.id}/ba-notes`],
  //     //  this._router.navigate([`profile-ba/${this.id}/confirm-record2`],
  //           {state: {recordId: message.recordId}});
  //     }
  //   });

  // }
  goToRecords(message: IViewNotification) {
    this._router.navigate([`id/${this.id}/confirm-record`],
        {state: {recordId: message.recordId, date: message.recordDateTime}});
  }


  getStatus(message: IViewNotification) {
    return message.recordStatus === RecordStatus.Created;
  }
}


 // openMess(idMessage: any) {
  //   this.idMessage = idMessage;
  //   this.openMessage = !this.openMessage;
  //
  //
  //   if (!this.messageRead) {
  //     this.messageRead = true;
  //     this.messageNotificationService
  //       .getNotifications(this.id)
  //       .subscribe(
  //         (result) => {
  //           console.log('Пометить как прочитанное:', result);
  //         },
  //         (error) => {
  //           console.error('Ошибка пометить как прочитанное', error);
  //         }
  //       );
  //   }
  // }