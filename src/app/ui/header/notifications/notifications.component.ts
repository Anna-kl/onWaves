
import {HttpClient} from '@angular/common/http';
import {Component, Directive, EventEmitter, Input, OnDestroy, OnInit, Output, TrackByFunction} from '@angular/core';
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
import { SeenDirective } from './seen.directive'; // где лежит директива
import { filter, Subscription, switchMap, take, tap } from 'rxjs';
import { loadSuccessNotification } from 'src/app/ngrx-store/notification/notification.action';
import { deleteSeconds, toHHMM } from 'src/helpers/dateUtils/dateUtils';
import { getProfileMainClient, selectProfileMainAndBaClient } from 'src/app/ngrx-store/profileBAClient/ba-store.select';
import { UserType } from 'src/app/DTO/classes/profiles/profile-user.model';

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
  trackById: TrackByFunction<IViewNotification> = (_index, item) => item.id;
  private unsubscribe$: Subscription|null = null;
  enumStatus: typeof StatusNotification = StatusNotification;
  enumType: typeof TypeNotification = TypeNotification;
  // notificationsList!: any[];
  idMessage: string | undefined;
  openMessage: boolean = false;
  id: any = '43865dc1-58d0-4f9a-aa67-774b7fab1c09';
  notificationsList: Notification[]|null = null;
  messages: IViewNotification[]|null = null;
  // notificationsList: Notification[] = [];
  // openMessage: boolean = false;
  selectedNotification: Notification | undefined;
  @Input() seenId!: string;            // id уведомления
  @Input() seenThreshold = 0.5;        // доля площади
  @Input() seenDelayMs = 800;          // задержка
  @Output() seenOnce = new EventEmitter<string>();
  protected toHHMM = toHHMM;

  constructor(
    private sanitizer: DomSanitizer,
    private _router: Router,
    private store$: Store,
    private _api: MessageNotificationService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
  }

  getStatusClass(status: RecordStatus) {
    return {
      'notif__status--cancel': status === RecordStatus.Canceled,
      'notif__status--new': status === RecordStatus.Created,
      'notif__status--done': status === RecordStatus.Success
    };
  }
  
  getStatusText(status: RecordStatus) {
    switch (status) {
      case RecordStatus.Canceled: return 'отменено';
      case RecordStatus.Created: return 'новая заявка';
      case RecordStatus.Success: return 'выполнено';
      default: return '';
    }
  }

  onSeen(id: string) {
    if (!this.messages) {
      return;
    }
    const message = this.messages.find((n) => n.id === id);
    if (!message || !this.isUnread(message)) {
      return;
    }
    this._api.readNotifications(id).pipe(take(1)).subscribe();
    message.statusNotification = StatusNotification.READ;
  }

  /** Непрочитано — всё, что не READ (CREATE, DELIVERY, неверный тип с бэка). */
  isUnread(message: IViewNotification | null | undefined): boolean {
    if (!message) {
      return false;
    }
    const raw = message.statusNotification as unknown;
    if (raw === undefined || raw === null) {
      return true;
    }
    const n = typeof raw === 'string' ? Number(raw) : Number(raw);
    if (Number.isNaN(n)) {
      return true;
    }
    return n !== StatusNotification.READ;
  }

  ngOnInit(): void {
    // this.unsubscribe$ = this.store$.pipe(select(notificationMessages)).subscribe((notificationState) => {
    //   this.messages = notificationState;
    // });
    this.unsubscribe$ = this.store$.pipe(select(notificationMessages)).subscribe(
      result => {
        this.messages = result;
      }
    );

    this.unsubscribe$ = this.store$.pipe(select(selectProfileMainClient)).subscribe(
      result => {
        this.profile = result;
      }
    );

    
   
    // this.store$.pipe(select(selectProfileMainClient)).
    //   pipe(
    //     filter(user => !!user),
    //     tap(user=>console.log(user)),
    //     switchMap(_ =>  this._api.getNotifications(_?.id!)
    // )
    //   ).subscribe(
    //     result => {
    //       this.messages = result;
    //     }
    //   )
    // subscribe((result) => {
    //   this.profile = result;

    //   if (this.profile) {
    //     this.filterNotifications();
    //   }
    // });
    
    
  }
  filterNotifications() {
    if (this.profile && this.notificationsList) {
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
      if (this.notificationsList)
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
       return  '/assets/img/onwaves/user.png';
      }
    }

  getNameServices(services: subGroup[]) {
    return services.map(_ => _.name).join('\n');
  }

  getIconStatus(statusNotification: StatusNotification) {
    if (statusNotification === StatusNotification.CREATE){
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
     if (this.profile) {
          // Главное Меню юзера
          if (this.profile.userType === UserType.User){
            this._router.navigate(['/profile-user', this.profile?.id]);
        } else { // Главное Меню бизнеса
          this._router.navigate(['/notes/',this.profile.id], {  queryParams:{date: message.recordDateTime, dayId: message.dayId, recordId: message.recordId},  });

        }
      }}


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