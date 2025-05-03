import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Schedule} from "../../../DTO/classes/schedules/schedule";
import {IFreeSlotSchedule} from "../../../DTO/views/schedule/IFreeSlotSchedule";
import {ScheduleService} from "../../../../services/schedule.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileDataEditService} from "../../services/ba-edit-service";
import {IViewAddress} from "../../../DTO/views/IViewAddress";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {ProfileService} from "../../../../services/profile.service";
import {stringToTime} from "../../../../helpers/dateUtils/dateUtils";
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient} from "../../../ngrx-store/mainClient/store.select";
import {LoginService} from "../../../auth/login.service";
import {combineLatest, map, Observable, Subscription} from "rxjs";
import {UserType} from "../../../DTO/classes/profiles/profile-user.model";
import { Location } from '@angular/common';
@Component({
  selector: 'app-column-ba-edit-profile',
  templateUrl: './column-baprofile.component.html',
  styleUrls: ['./column-baprofile.component.scss'],
  providers: [ScheduleService, ProfileService ]
})
export class ColumnBAProfileEditComponent implements OnInit, OnDestroy {
  @Input() id: string | null = null;
  @Input() isEdit = false;
  @Output() onAddress = new EventEmitter<IViewAddress>();
  businessProfile: IViewBusinessProfile | undefined;
  scheduleToday: string | undefined;
  isHasSchedule: boolean = false;
  schedulesListFree: IFreeSlotSchedule[] = [];
  avatar: any;
  
  address: string = '';
  private unsubscribe$: Subscription|null = null;
  auth: Observable<boolean> = new Observable<boolean>();
  constructor(private _route: ActivatedRoute,
              private _apiSchedule: ScheduleService,
              private _router: Router,
              private _dataService: ProfileDataEditService,
              private sanitizer: DomSanitizer,
              private store: Store,
              private _login: LoginService) {
    this.auth = combineLatest([_login.isLoad$,_login.isAutentificate$]).pipe(map(([isLoad, isAuth]) => {
      return !(isLoad && !isAuth);
    })
    );
  }

  async getSchedule(id: string) {
    (await this._apiSchedule.getProfileScheduleToday(id))
      .subscribe(async _ => {
        this.scheduleToday = this._apiSchedule.getToday$.value?.message;
        if (this._apiSchedule.getToday$.value?.code === 404) {

        } else {
          this.isHasSchedule = true;
          let schedule = this._apiSchedule.getToday$.value?.data as Schedule;
          (await this._apiSchedule.getScheduleForDay(id, schedule.id))
            .subscribe(_ => {
              this.schedulesListFree = this._apiSchedule.allSchedules$.value as IFreeSlotSchedule[];
              this.schedulesListFree.forEach(item => {
                item.start = stringToTime(item.start)
                if (item.end) {
                  item.end = stringToTime(item.end);
                }
              });
            });
        }
      });
  }
  getAvatar(avatar: any) {
    if (avatar) {
      return  this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${avatar}`);
    } else {
      return  '/assets/img/AvatarBig.png';
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
  }
  onEdit(){
    this._dataService.transferBusinessProfile(this.businessProfile!);
    this._router.navigate(['ba-edit', this.id]);
  }
  // async ngOnInit(): Promise<void> {
  //   this.store.pipe(select(selectProfileMainClient)).subscribe(
  //   mainProfile => {
  //     if (mainProfile) {
  //       this.businessProfileService.getBusinessProfileForEditById(mainProfile.id!).subscribe(async (businessProfile) => {
  //         if (businessProfile.code === 200) {
  //           this.businessProfile = businessProfile.data as IViewBusinessProfile;
  //           if (this.businessProfile.isGetOrder) {
  //             await this.getSchedule(this.id!);
  //           } else {
  //             this.scheduleToday = 'Заказы не принимаются';
  //             this.isHasSchedule = false;
  //           }
  //           this.address = getAddressProfile(this.businessProfile?.address!);
  //           this.onAddress.emit(this.businessProfile.address);
  //           if (this.businessProfile.avatar) {
  //             this.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${this.businessProfile.avatar}`);
  //           } else {
  //             this.avatar = '/assets/img/AvatarBig.png';
  //           }

  //         }
  //       });
  //     }
  //   });
  //   this.backendService.checkServiceAvailability(this.id!).subscribe((result) => {
  //     this.hasServices = result;
  //   });
  // }
  async ngOnInit(): Promise<void> {
    this.auth.subscribe(
      result => {
        if (!result){
          this._router.navigate(['/']);
        }
      }
    );
    this.store.pipe(select(selectProfileMainClient)).subscribe(async (mainProfile) => {
      if (mainProfile) {
        if (mainProfile.userType !== UserType.Business){
          let id = this._route.snapshot.paramMap.get('id');
          this.unsubscribe$ = this._login.allProfiles$.subscribe(profiles => {
            this.businessProfile = profiles.find(_ => _.userType === UserType.Business);
            if (id !== this.businessProfile?.id){
              this._router.navigate(['/']);
            }
          });
        } else {
          this.businessProfile = mainProfile;
        }
        this._dataService.transferBusinessProfile(this.businessProfile!);
        // this.businessProfileService.getBusinessProfileForEditById(mainProfile.id!).subscribe(async (businessProfile) => {
        //   if (businessProfile.code === 200) {
        //     this.businessProfile = businessProfile.data as IViewBusinessProfile;
        //     this.address = getAddressProfile(this.businessProfile?.address!);
        //     this.onAddress.emit(this.businessProfile.address);
        //     if (this.businessProfile.avatar) {
        //       this.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${this.businessProfile.avatar}`);
        //     } else {
        //       this.avatar = '/assets/img/AvatarBig.png';
        //     }
        //
        //     if (this.businessProfile.isGetOrder) {
        //       await this.getSchedule(this.id!);
        //     } else {
        //       this.scheduleToday = 'Заказы не принимаются';
        //       this.isHasSchedule = false;
        //     }
        //
        //   }
        // });
      }
    });
  }

  onlineRecord() {
    this._router.navigate([`profile-ba/${this.id}/choose-service/`]);
  }

  // goToReview(businessProfile: IViewBusinessProfile) {
  //   this._router.navigate([`ba-edit/${businessProfile.id}/reviews`])
  // }
    goToReviews(businessProfile: IViewBusinessProfile) {
      this._router.navigate([`profilebisacc/${businessProfile.id}/reviews`])
    }
    displayWebsite(website: string | undefined): string {
      if (website && website.startsWith('https:/') && website.length > 'https:/'.length) {      
        return website;
      } else {      
        return '';
      }
    }
}
//
//
