import {Component, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {ProfileDataEditService} from "../../services/ba-edit-service";
import {ScheduleService} from "../../../../services/schedule.service";
import {IDaysOfSchedule, IPeriod, IViewSchedule} from "../../../DTO/views/schedule/IViewSchedule";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalCalendarComponent} from "../modals/modal-calendar/modal-calendar.component";
import {ProfileService} from "../../../../services/profile.service";
import {GroupService} from "../../../../services/groupservice";
import {MessageService} from "primeng/api";
import {ShowTimeModalComponent} from "../modals/show-time-modal/show-time-modal.component";
import {selectProfileMainClient} from "../../../ngrx-store/mainClient/store.select";
import {select, Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs";
import {LoginService} from "../../../auth/login.service";

@Component({
  selector: 'app-grafik',
  templateUrl: './grafik.component.html',
  styleUrls: ['./grafik.component.scss'],
  providers: [ScheduleService, ProfileService, GroupService, MessageService]
})
export class GrafikComponent implements OnDestroy{


  profile: IViewBusinessProfile | null = null;
 // schedules: IViewSchedule[] = [];
  timeZone: number = 0;
  newSchedule: any;
  isEdit = false;
  profileSubscribe: Subscription|null = null;
  schedules$: Observable<IViewSchedule[]> = new Observable<IViewSchedule[]>();
  constructor(
    private router: Router,
    private store$: Store,
    public _apiSchedule: ScheduleService,
    private modalService: NgbModal,
    private messageService: MessageService,
    private _apiService: GroupService,
    private _loginService: LoginService,
    private _apiProfile: ProfileService
  ) {
    this.profileSubscribe = this.store$.pipe(select(selectProfileMainClient)).subscribe(
        (result: IViewBusinessProfile | null) => {
          if (result) {
            this.profile = new IViewBusinessProfile();
            this.profile.copyProfile(result);
            this.getSchedule();
          }
      }
    );
    this.period = this.startHours[0];
  }

  setStartPeriod(_t20: IViewSchedule) {
    if (this.profile)
      this.profileSubscribe = this._apiSchedule.updateSchedule(this.profile?.id!, _t20).subscribe(result => {
        if (result.code === 201){
          this.showSuccess();
          this.getSchedule();
        }
      });
  }

  getStrText(_t20: number) {
    let temp = this.startStrHours.find(_ => _.id === _t20);
    if (temp)
      return temp.text;
  }

  ngOnDestroy() {
    this.profileSubscribe?.unsubscribe();
  }

  // changePeriod(arg0: string) {
  //   this.period = a
  // }

  public readonly statusServices$ = this._apiService.checkStatusServices$;
  period: any;

  public async getStatusService(){
    (await this._apiService.checkStatus(this.profile?.id!))
      .subscribe(_=>{
        if (this.statusServices$.value?.code === 404){
          this.profile!.isGetOrder = false;
        }
      });
  }
  async ngOnInit(): Promise<void> {
    this.timeZone = new Date().getTimezoneOffset() / 60;
    if (this.profile?.id) {
      await this.getStatusService();
    }
  }

  async getSchedule() {
    this.schedules$ = this._apiSchedule.getScheduleProfile(this.profile?.id!);

  }

  showWorkPeriod(sch: IViewSchedule){
    // if(sch.isShowWork === undefined) {
    //   sch.isShowWork = false;
    // }
    // sch.isShowWork = !sch.isShowWork;
  }

  showBreakPeriod(sch: IViewSchedule){
    sch.isShowBreak = !sch.isShowBreak;
  }

  saveChanges(sch: IViewSchedule): void {
    this._apiSchedule.updateSchedule(this.profile?.id!, sch).subscribe(
        result => {
          if (result.code === 201){
            this.showSuccess();
            this.getSchedule();
          }
        }
    );


  }

  createNewSchedule(schedules: IViewSchedule[]){
    let newSchedule: IViewSchedule = {
      daysOfWork: [],
      isActive: false,
      work: {
        start: {hour:'00', minutes: '00'},
        end: {hour:'00', minutes:'00'},
      },
      break: {
        start: {hour:'00', minutes: '00'},
        end: {hour:'00', minutes:'00'},
      },
     name: '',
     period: 15
    };

    schedules.push(newSchedule);
  }

  backToProfile() {
    this.router.navigate(['profilebisacc', this.profile?.id]);
  }

  onEditName(sch: IViewSchedule){
    sch.isName = !sch.isName;
  }

  chooseDays(sch: IViewSchedule){
   let modalRef = this.modalService.open(ModalCalendarComponent);
   modalRef.componentInstance.workDays = sch.daysOfWork;
   modalRef.componentInstance.profileId = this.profile?.id;
   modalRef.componentInstance.scheduleId = sch.id;
   modalRef.componentInstance.work = sch.work;
   modalRef.componentInstance.break = sch.break;
   modalRef.result.then((result: IDaysOfSchedule[]) => {
    if (result){
      sch.daysOfWork = result;
      this.saveChanges(sch);
    }
   });
  }

  showBreak(sch: IViewSchedule){
    sch.isShowBreak = !sch.isShowBreak;
  }

  showWork(sch: IViewSchedule){
    sch.isShowWork = !sch.isShowWork;
  }


  checkTimer(sch: IViewSchedule) {
    return !(sch.work.start && sch.work.end);

  }

  groupsHours: string[] = ['00','01', '02', '03', '04', '05', '06', '07' ,'08', '09', '10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
  startStrHours: any[] = [{id: 15, text: '15 минут'}, {id: 30, text: '30 минут'},{id: 45, text:'45 минут'},
     {id: 60, text:'1 час'},{id: 120, text:'2 часа'}];
  startHours: any[] = [15,  30 ,45,
        60, 120];
  groupsMinutes: string[] = ['00', '15', '30', '45'];
  setIsActive(){

    return true;
  }



  /***    Функция удаляет карточку график работы.   */
  public async deleteCalandrierCart(id?:string) {
    if (id) {
      (await this._apiSchedule.deleteScheduleProfileCart(id))
          .subscribe(async (response: any) => {
            this.getSchedule();
          });
    }
  };


  /*** выплываюзее уведомление p-toast    */
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Создано', detail: 'Изменения сохранены', life:5000});
  }

  change() {
    this.isEdit = true;
  }

  changeGetOrder() {
      this.profileSubscribe = this._apiProfile.changeIsGetOrder(this.profile?.id!, {isGetOrder: this.profile?.isGetOrder}).subscribe(
        result => {
          if (result.code === 200){
           // this._loginService.updateProfile(this.profile?.id!);
            this.showSuccess();
          }
        }
      );
  }

  addScheduler(sch: IViewSchedule) {

    if (sch.break?.start === null || sch.break?.end === null){
      // _.break = undefined;
      sch.break = {start: {hour: '00', minutes: '00'}, end:{hour: '00', minutes: '00'}} as IPeriod;
    }

    this.profileSubscribe = this._apiSchedule.saveSchedule(this.profile?.id!, sch).subscribe(
        result => {
          if (result.code === 201){
            this.showSuccess();
            this.getSchedule();
          }
        }
    );
  }

  changeStatus(sch: IViewSchedule) {
    if (sch.id) {
      this.profileSubscribe = this._apiSchedule.updateSchedule(this.profile?.id!, sch).subscribe(
          result => {
            if (result.code === 201) {
                this.showSuccess();
            }
          }
      );
    }
  }
}
