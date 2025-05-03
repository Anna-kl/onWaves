import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Schedule} from "../../../DTO/classes/schedules/schedule";
import {ScheduleService} from "../../../../services/schedule.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileDataService} from "../../services/profile-data.service";
import {ProfileService} from "../../../../services/profile.service";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient} from "../../../ngrx-store/mainClient/store.select";
import {
  ModalRegisterComponent
} from "../../../components/modals/register-profile/modal-register/modal-register.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {loadLinkAction, setLinkAction} from "../../../ngrx-store/links/link.action";
import { DeviceDetectorService } from 'ngx-device-detector';



@Component({
  selector: 'app-column-baprofile',
  templateUrl: './column-baprofile.component.html',
  styleUrls: ['./column-baprofile.component.scss'],
  providers: [ScheduleService, ProfileService ]
})
export class ColumnBAProfileComponent implements  OnChanges {

  sendMessages(receiverId: string|null|undefined) {
    if (receiverId){
      this._router.navigate(['chat-page'],
        { queryParams: {receiverId: receiverId}});
    }
  }

  deviceInfo: any;

  @Input() id: string | null = null;
  openOrNot: any; //для вспылвающего меню при нажатии- записаться Онлайн
  businessProfile: IViewBusinessProfile | null = null;
  scheduleToday: string | undefined;
  isHasSchedule: boolean = false;
  schedulesListFree: string[]|undefined = [];
  isHasRecord = true;
  profileUA: IViewBusinessProfile | null = null;
  constructor(private businessProfileService: ProfileService,
              private _apiSchedule: ScheduleService,
              private _router: Router,
              private modalService: NgbModal,
              private store$: Store,
              private route: ActivatedRoute,
              private _dataService: ProfileDataService,
              private sanitizer: DomSanitizer,
              private deviceService: DeviceDetectorService) {
  }
  async getSchedule(id: string) {
    (await this._apiSchedule.getProfileScheduleToday(id))
      .subscribe(async _ => {
        this.schedulesListFree = this._apiSchedule.getToday$.value?.message.split('\n');
        if (this._apiSchedule.getToday$.value?.code === 404) {
          this.isHasSchedule = false;
        } else {
          this.isHasSchedule = true;
          let schedule = this._apiSchedule.getToday$.value?.data as Schedule;
          (await this._apiSchedule.getScheduleForDay(id, schedule.id))
            .subscribe(_ => {
              // this.schedulesListFree = this._apiSchedule.allSchedules$.value as IFreeSlotSchedule[];
              // this.schedulesListFree.forEach(item => {
              //   item.start = stringToTime(item.start)
              //   if (item.end) {
              //     item.end = stringToTime(item.end);
              //   }
              // });
            });

        }
      });
  }
  async ngOnChanges(): Promise<void> {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.store$.pipe(select(selectProfileMainClient)).subscribe(
        result => {
          this.profileUA = result;
        }
    );
    if (this.id) {
      this._apiSchedule.checkServiceAvailability(this.id, new Date()).subscribe(
        result => {
          if (result.code === 200){
              this.isHasRecord = true;
          } else {
            this.isHasRecord = false;
            this.scheduleToday = result.message;
          }
        });
      this.businessProfileService.getBusinessProfileById(this.id).subscribe(async (businessProfile) => {
        if (businessProfile.code === 200) {
          this.businessProfile = businessProfile.data as IViewBusinessProfile;
          if (this.businessProfile.isGetOrder){
            await this.getSchedule(this.id!);
          } else {
            this.scheduleToday = 'Заказы не принимаются';
          }
          this._dataService.transferProfileBA(this.businessProfile);
        }
      });
    }
  }
  onlineRecord() {
    this._dataService.transferDate(null);

    if (this.profileUA) {
      this._router.navigate(['choose-service'], {relativeTo: this.route});
    } else {
      this.store$.dispatch(loadLinkAction(
          {request: `profile-ba/${this.businessProfile?.link ? this.businessProfile.link : this.businessProfile?.id}/choose-service`,
                }));
      const modalRef = this.modalService.open(ModalRegisterComponent);
    }

  }

  getAvatar(businessProfile: IViewBusinessProfile | null) {
    if (businessProfile) {
      if (businessProfile.avatar) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${businessProfile.avatar}`);
      }
    }
    return '/assets/img/AvatarBig.png';
  }

}
