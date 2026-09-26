import {Component, OnInit} from '@angular/core';
import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient} from "../../ngrx-store/mainClient/store.select";
import {BehaviorSubject, concatMap, filter, map, Observable, scan, shareReplay, startWith, Subject, switchMap, tap} from 'rxjs';
import {ProfileService} from 'src/services/profile.service';
import {HistoryService} from 'src/services/history.service';

@Component({
  selector: 'app-uaafter-register',
  templateUrl: './uaafter-register.component.html',
  styleUrls: ['./uaafter-register.component.scss'],
})
export class UAAfterRegisterComponent implements OnInit {

  user$: Observable<IViewBusinessProfile> | null = null;

  /** «Последние посещения» — история просмотров пользователя (GET history/{id}). */
  public historyCards$: Observable<IViewBusinessProfile[]> | null = null;

  /** Карточки активного таба; накапливаются по «Смотреть еще». */
  public cards$: Observable<IViewBusinessProfile[]> | null = null;

  auth: IViewBusinessProfile | null = null;

  /** Активный таб: false — «Рекомендуем», true — «Рядом». Уходит в isRecommend бэка. */
  public readonly mode$ = new BehaviorSubject<boolean>(false);
  private readonly loadMoreClick$ = new Subject<void>();
  private readonly loading$ = new BehaviorSubject(false);
  public readonly hasMore$ = new BehaviorSubject(true);

  /** Сколько карточек уже показано — оно же skip (смещение) для следующей страницы. */
  private loadedCount = 0;
  /** Размер страницы бэк не сообщает — берём длину первой пачки текущего таба. */
  private pageSize: number | null = null;

  constructor(private _profileService: ProfileService,
              private _history: HistoryService,
              private store$: Store) {
  }

  ngOnInit(): void {
    /* «Кто я» — профиль из стора; для анонима поток не эмитит. */
    this.user$ = this.store$.pipe(
      select(selectProfileMainClient),
      filter(Boolean),
      shareReplay({bufferSize: 1, refCount: true})
    );

    // История просмотров лежит в отдельном сервисе (GET history/{id}).
    // Раньше сюда ходил ProfileService.getHistoryCards — копия getProfileAsync
    // с побайтово тем же URL, поэтому «Последние посещения» и «Рекомендуем»
    // показывали один и тот же список карточек.
    this.historyCards$ = this.user$.pipe(
      tap(user => this.auth = user),
      switchMap(user => this._history.getHistoryCards(user.id!)),
      map(list => list.map(item => item.businessProfile).filter(Boolean)),
      shareReplay({bufferSize: 1, refCount: true})
    );

    // Список таба: mode$ задаёт выборку и сбрасывает пагинацию,
    // loadMoreClick$ — подгрузка следующей страницы в тот же массив.
    // Запрос без id профиля: главная должна работать и для анонима.
    this.cards$ = this.mode$.pipe(
      tap(() => this.resetPaging()),
      switchMap(isRecommend => this.loadMoreClick$.pipe(
        startWith(null),                                   // первая страница
        concatMap(() => this.fetchPage(isRecommend)),
        scan((all: IViewBusinessProfile[], batch: IViewBusinessProfile[]) => [...all, ...batch],
          [] as IViewBusinessProfile[])
      )),
      shareReplay({bufferSize: 1, refCount: true})
    );
  }

  /** Переключение табов «Рекомендуем» / «Рядом». */
  changeCards(isRecommend: boolean): void {
    if (this.mode$.value !== isRecommend) {
      this.mode$.next(isRecommend);
    }
  }

  loadMore(): void {
    /** не посылаем сигнал, если уже грузим или карточек больше нет */
    if (!this.loading$.value && this.hasMore$.value) {
      this.loadMoreClick$.next();
    }
  }

  private resetPaging(): void {
    this.loadedCount = 0;
    this.pageSize = null;
    this.hasMore$.next(true);
  }

  private fetchPage(isRecommend: boolean): Observable<IViewBusinessProfile[]> {
    this.loading$.next(true);
    // skip — смещение в выдаче, поэтому считаем его от числа уже показанных карточек,
    // а не от номера страницы: размер пачки задаёт бэк.
    return this._profileService.getProfileAsync(this.loadedCount, isRecommend).pipe(
      tap(batch => {
        this.loading$.next(false);
        this.loadedCount += batch.length;
        if (this.pageSize === null) {
          this.pageSize = batch.length;
        }
        // Пришло пусто или меньше страницы — карточки кончились.
        if (batch.length === 0 || batch.length < this.pageSize) {
          this.hasMore$.next(false);
        }
      })
    );
  }
}
