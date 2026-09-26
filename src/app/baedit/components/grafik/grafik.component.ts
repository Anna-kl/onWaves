import {Component, OnDestroy} from '@angular/core';
import { ToastService } from 'src/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {ProfileDataEditService} from "../../services/ba-edit-service";
import {ScheduleService} from "../../../../services/schedule.service";
import {IDaysOfSchedule, IPeriod, IViewSchedule} from "../../../DTO/views/schedule/IViewSchedule";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalCalendarComponent} from "../modals/modal-calendar/modal-calendar.component";
import {ProfileService} from "../../../../services/profile.service";
import {GroupService} from "../../../../services/groupservice";
import {ShowTimeModalComponent} from "../modals/show-time-modal/show-time-modal.component";
import {selectProfileMainClient} from "../../../ngrx-store/mainClient/store.select";
import {select, Store} from "@ngrx/store";
import {BehaviorSubject, Observable, Subscription, map, switchMap} from 'rxjs';
import {LoginService} from "../../../auth/login.service";
import {toBusinessCalendarDate} from "../../../../helpers/dateUtils/dateUtils";

@Component({
  selector: 'app-grafik',
  templateUrl: './grafik.component.html',
  styleUrls: ['./grafik.component.scss'],
  providers: [ScheduleService, ProfileService, GroupService]
})
export class GrafikComponent implements OnDestroy{


  profile: IViewBusinessProfile | null = null;
  isEdit = false;
  profileSubscribe: Subscription|null = null;
  private readonly schedulesList$ = new BehaviorSubject<IViewSchedule[]>([]);
  /** Тот же поток на весь экран: иначе после DELETE async остаётся на старом GET. */
  schedules$: Observable<IViewSchedule[]> = this.schedulesList$.asObservable();
  /** Черновики с «+» ещё не в API — иначе getSchedule() после PUT соседней карточки их стирает. */
  private drafts: IViewSchedule[] = [];
  private lastLoadedIds = new Set<string>();
  private reloadSub: Subscription|null = null;
  savingDraft = false;
  deleting = false;
  constructor(
    private router: Router,
    private store$: Store,
    public _apiSchedule: ScheduleService,
    private modalService: NgbModal,
    private messageService: ToastService,
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

  setStartPeriod(sch: IViewSchedule) {
    // Карточка, созданная через «+», ещё не имеет id — PUT update-schedule для неё
    // отдаёт 500. Такая карточка сохраняется целиком кнопкой «Сохранить» (POST),
    // выбранный период уедет вместе с ней.
    const profileId = this.profile?.id;
    if (!sch.id || !profileId) return;
    // Не дергаем GET после PUT: карточка уже с новым period/gap, а GET того же
    // URL часто отдаёт предыдущий список — «15 минут» визуально откатывается,
    // пока не сделаешь полную перезагрузку. Как у тумблера активности.
    this._apiSchedule.updateSchedule(profileId, sch).subscribe({
      next: result => {
        if (this.isScheduleSaved(result)) {
          this.showSuccess();
        } else {
          this.showScheduleError(result);
          this.getSchedule();
        }
      },
      error: err => {
        this.showScheduleError(err);
        this.getSchedule();
      }
    });
  }

  getStrText(_t20: number) {
    let temp = this.startStrHours.find(_ => _.id === _t20);
    if (temp)
      return temp.text;
  }

  gapAfterLabel(minutes: number | undefined) {
    const value = minutes ?? 0;
    return this.gapAfterLabels.find(_ => _.id === value)?.text ?? 'Нет';
  }

  ngOnDestroy() {
    this.reloadSub?.unsubscribe();
    this.profileSubscribe?.unsubscribe();
    this.schedulesList$.complete();
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
    if (this.profile?.id) {
      await this.getStatusService();
    }
  }

  async getSchedule() {
    this.reloadSub?.unsubscribe();
    if (!this.profile?.id) {
      return;
    }
    this.reloadSub = this._apiSchedule.getScheduleProfile(this.profile.id).subscribe({
      next: list => this.setSchedules(Array.isArray(list) ? list : []),
      error: err => this.showScheduleError(err)
    });
  }

  private setSchedules(list: IViewSchedule[]): void {
    const normalized = list.map(s => this.normalizeSchedule(s));
    this.lastLoadedIds = new Set(normalized.map(s => s.id).filter((id): id is string => !!id));
    this.schedulesList$.next([...normalized, ...this.drafts]);
  }

  private emptyPeriod(): IPeriod {
    return { start: { hour: '00', minutes: '00' }, end: { hour: '00', minutes: '00' } };
  }

  private normalizeSchedule(s: IViewSchedule): IViewSchedule {
    const raw = s as IViewSchedule & { GapAfterMinutes?: number; Id?: string; DaysOfWork?: IDaysOfSchedule[] };
    const daysRaw = s.daysOfWork ?? raw.DaysOfWork ?? [];
    return {
      ...s,
      id: s.id ?? raw.Id,
      gapAfterMinutes: Number(raw.gapAfterMinutes ?? raw.GapAfterMinutes ?? 0) || 0,
      daysOfWork: daysRaw.map(d => {
        const row = d as IDaysOfSchedule & { Id?: string; DaysOfWork?: Date };
        return {
          ...d,
          id: d.id ?? row.Id,
          daysOfWork: d.daysOfWork ?? row.DaysOfWork
        };
      }),
      work: s.work?.start && s.work?.end ? s.work : this.emptyPeriod(),
      break: s.break?.start && s.break?.end ? s.break : this.emptyPeriod()
    };
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
    // Как и в setStartPeriod: несохранённую карточку обновлять нечем — у неё нет id.
    // Дни останутся в sch.daysOfWork и уйдут на бэк при «Сохранить».
    if (!sch.id || !this.profile?.id) return;
    const intendedDays = this.dayKeys(sch.daysOfWork);
    const scheduleId = sch.id;
    this._apiSchedule.updateSchedule(this.profile.id, sch).pipe(
      switchMap(result =>
        this._apiSchedule.getScheduleProfile(this.profile!.id!).pipe(
          map(list => ({ result, list }))
        )
      )
    ).subscribe({
      next: ({ result, list }) => {
        this.setSchedules(Array.isArray(list) ? list : []);
        const saved = this.schedulesList$.value.find(s => s.id === scheduleId);
        const kept = [...this.dayKeys(saved?.daysOfWork)].filter(key => !intendedDays.has(key));
        // PUT 201 не значит, что день снят: отмена всё ещё держит FK, а журнал
        // её не показывает — раньше тост «сохранено» врал, день возвращался с GET.
        if (kept.length || !this.isScheduleSaved(result)) {
          this.messageService.add({
            severity: kept.length ? 'warn' : 'error',
            summary: kept.length ? 'День не снят' : 'Ошибка',
            detail: kept.length
              ? 'День не снялся: на эту дату ещё висит запись. Если в журнале пусто — откройте отменённые.'
              : this.scheduleFailText(result),
            life: 7000
          });
          return;
        }
        this.showSuccess();
      },
      error: err => this.showScheduleError(err)
    });
  }

  createNewSchedule(schedules: IViewSchedule[]){
    // Карточка сразу рабочая: иначе isActive=false прячет «Применить к дням»,
    // а 00:00–00:00 ещё и дизейблит её через checkTimer. Справка ждёт: время → дни.
    const newSchedule: IViewSchedule = {
      daysOfWork: [],
      isActive: true,
      isName: true,
      isShowWork: true,
      work: {
        start: {hour: '09', minutes: '00'},
        end: {hour: '18', minutes: '00'},
      },
      break: this.emptyPeriod(),
      name: '',
      period: 15,
      gapAfterMinutes: 0
    };
    this.drafts.push(newSchedule);
    this.schedulesList$.next([...this.schedulesList$.value, newSchedule]);
  }

  backToProfile() {
    this.router.navigate(['profilebisacc', this.profile?.id]);
  }

  onEditName(sch: IViewSchedule){
    sch.isName = !sch.isName;
  }

  chooseDays(sch: IViewSchedule){
    if (this.checkTimer(sch) || this.savingDraft) {
      return;
    }
    if (sch.id) {
      this.openDaysModal(sch);
      return;
    }
    // add-schedule не возвращает id — сначала POST, затем открываем календарь.
    this.savingDraft = true;
    this.ensureScheduleSaved(sch).subscribe({
      next: saved => {
        this.savingDraft = false;
        this.openDaysModal(saved);
      },
      error: err => {
        this.savingDraft = false;
        this.showScheduleError(err);
      }
    });
  }

  private openDaysModal(sch: IViewSchedule) {
    const modalRef = this.modalService.open(ModalCalendarComponent);
    modalRef.componentInstance.workDays = sch.daysOfWork ?? [];
    modalRef.componentInstance.profileId = this.profile?.id;
    modalRef.componentInstance.scheduleId = sch.id;
    modalRef.componentInstance.work = sch.work;
    modalRef.componentInstance.break = sch.break;
    modalRef.result.then((result: IDaysOfSchedule[]) => {
      if (result) {
        sch.daysOfWork = result;
        this.saveChanges(sch);
      }
    });
  }

  private ensureScheduleSaved(sch: IViewSchedule): Observable<IViewSchedule> {
    if (sch.break?.start == null || sch.break?.end == null) {
      sch.break = this.emptyPeriod();
    }
    const knownIds = new Set(this.lastLoadedIds);
    return this._apiSchedule.saveSchedule(this.profile?.id!, sch).pipe(
      switchMap(result => {
        if (!this.isScheduleSaved(result)) {
          throw new Error(result.message || 'Не удалось создать график');
        }
        return this._apiSchedule.getScheduleProfile(this.profile?.id!);
      }),
      map(list => {
        const unknown = list
          .map(s => this.normalizeSchedule(s))
          .filter(s => !!s.id && !knownIds.has(s.id!));
        const created = unknown.find(s =>
          (s.name || '') === (sch.name || '') &&
          s.work.start.hour === sch.work.start.hour &&
          s.work.start.minutes === sch.work.start.minutes &&
          s.work.end.hour === sch.work.end.hour &&
          s.work.end.minutes === sch.work.end.minutes
        ) ?? unknown[0];
        if (!created?.id) {
          throw new Error('График создан, но сервер не вернул идентификатор');
        }
        sch.id = created.id;
        sch.daysOfWork = created.daysOfWork ?? [];
        this.drafts = this.drafts.filter(d => d !== sch);
        this.lastLoadedIds.add(created.id);
        this.showSuccess();
        return sch;
      })
    );
  }

  showBreak(sch: IViewSchedule){
    sch.isShowBreak = !sch.isShowBreak;
  }

  showWork(sch: IViewSchedule){
    sch.isShowWork = !sch.isShowWork;
  }


  checkTimer(sch: IViewSchedule) {
    if (sch.work.start.hour === sch.work.end.hour && sch.work.start.minutes === sch.work.end.minutes )
      return true;

    return false;

  }

  groupsHours: string[] = ['00','01', '02', '03', '04', '05', '06', '07' ,'08', '09', '10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
  startStrHours: any[] = [{id: 15, text: '15 минут'}, {id: 30, text: '30 минут'},{id: 45, text:'45 минут'},
     {id: 60, text:'1 час'},{id: 120, text:'2 часа'}];
  startHours: any[] = [15,  30 ,45,
        60, 120];
  gapAfterHours: number[] = [0, 15, 30, 45, 60];
  gapAfterLabels: {id: number, text: string}[] = [
    {id: 0, text: 'Нет'},
    {id: 15, text: '15 минут'},
    {id: 30, text: '30 минут'},
    {id: 45, text: '45 минут'},
    {id: 60, text: '1 час'}
  ];
  groupsMinutes: string[] = ['00', '15', '30', '45'];
  setIsActive(){

    return true;
  }



  /***    Функция удаляет карточку график работы.   */
  public async deleteCalandrierCart(sch: IViewSchedule, _schedules: IViewSchedule[]) {
    if (this.deleting) {
      return;
    }
    if (!sch.id) {
      this.drafts = this.drafts.filter(d => d !== sch);
      this.schedulesList$.next(this.schedulesList$.value.filter(item => item !== sch));
      return;
    }
    this.deleting = true;
    (await this._apiSchedule.deleteScheduleProfileCart(sch.id))
        .subscribe({
          next: () => {
            this.deleting = false;
            this.lastLoadedIds.delete(sch.id!);
            this.drafts = this.drafts.filter(d => d !== sch);
            this.schedulesList$.next(this.schedulesList$.value.filter(item => item.id !== sch.id));
            this.messageService.add({
              severity: 'success',
              summary: 'Удалено',
              detail: 'График удалён',
              life: 5000
            });
            this.getSchedule();
          },
          error: err => {
            this.deleting = false;
            console.error('Не удалось удалить график:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: 'Не удалось удалить график. Попробуйте ещё раз.',
              life: 5000
            });
          }
        });
  }


  /*** выплываюзее уведомление p-toast    */
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Создано', detail: 'Изменения сохранены', life:5000});
  }

  /** ASP.NET иногда отдаёт PascalCase `Code`. */
  private isScheduleSaved(result: { code?: number; Code?: number } | null | undefined): boolean {
    const code = result?.code ?? result?.Code;
    return code === 201 || code === 200;
  }

  private dayKeys(days: IDaysOfSchedule[] | undefined): Set<string> {
    return new Set((days ?? []).map(day => {
      const date = toBusinessCalendarDate(day.daysOfWork);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }));
  }

  private scheduleFailText(err: any): string {
    return err?.message
      || err?.Message
      || err?.error?.message
      || err?.error?.Message
      || 'Не удалось сохранить график. Попробуйте ещё раз.';
  }

  /**
   * Раньше у всех подписок на график не было error-колбэка: любой сбой бэка
   * уходил в консоль, а пользователь видел, что «ничего не произошло», и жал ещё раз.
   */
  private showScheduleError(err: any) {
    console.error('Не удалось сохранить график:', err);
    this.messageService.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: this.scheduleFailText(err),
      life: 5000
    });
  }

  change() {
    this.isEdit = true;
  }

  changeGetOrder() {
      if (this.profile?.isPromo) {
        this.profile.isGetOrder = false;
        return;
      }
      // profileSubscribe держит подписку на стор и разрывается в ngOnDestroy —
      // перезаписывать его разовыми HTTP-подписками нельзя, подписка на стор течёт.
      this._apiProfile.changeIsGetOrder(this.profile?.id!, {isGetOrder: this.profile?.isGetOrder}).subscribe(
        result => {
          if (result.code === 200){
            this._loginService.updateProfile(this.profile?.id!);
            this.showSuccess();
          }
        }
      );
  }

  changeStatus(sch: IViewSchedule) {
    if (sch.id) {
      this._apiSchedule.updateSchedule(this.profile?.id!, sch).subscribe({
        next: result => {
          if (this.isScheduleSaved(result)) {
              this.showSuccess();
          }
        },
        error: err => this.showScheduleError(err)
      });
    }
  }
}
