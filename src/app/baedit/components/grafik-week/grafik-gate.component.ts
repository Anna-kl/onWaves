import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ScheduleService } from '../../../../services/schedule.service';

/**
 * Новая неделя открывается, как только сервер отдал неделю.
 * Режим 0 не прячет экраны: правки новых ручек сервер не примет, карточки остаются.
 * Нет ручки или ошибка — сразу прежний редактор, база не переводится.
 */
@Component({
  selector: 'app-grafik-gate',
  templateUrl: './grafik-gate.component.html',
  styleUrls: ['./grafik-schedule.scss'],
  providers: [ScheduleService],
})
export class GrafikGateComponent implements OnInit, OnDestroy {
  ready = false;
  weekMode = false;
  weekOk = false;
  private cards = false;
  private sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private schedules: ScheduleService,
  ) {}

  ngOnInit(): void {
    this.sub.add(this.route.queryParamMap.subscribe(params => {
      this.cards = params.get('view') === 'cards';
      this.apply();
    }));
    const id = this.route.parent?.snapshot.paramMap.get('id');
    if (!id) {
      this.ready = true;
      this.apply();
      return;
    }
    this.schedules.getWeek(id).subscribe({
      next: result => {
        this.weekOk = result?.code === 200 && !!result?.data;
        this.ready = true;
        this.apply();
      },
      error: () => {
        this.weekOk = false;
        this.ready = true;
        this.apply();
      },
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  showWeek(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { view: null },
      queryParamsHandling: 'merge',
    });
  }

  private apply(): void {
    this.weekMode = this.ready && this.weekOk && !this.cards;
  }
}
