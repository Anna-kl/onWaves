import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { EMPTY, catchError, filter, fromEvent, merge, of, startWith, switchMap, timeout } from 'rxjs';
import { LoginService } from '../auth/login.service';
import { formatMsk } from '../../helpers/giveaway';
import { GiveawayEntriesService, GiveawayEntry } from '../../services/giveaway-entries.service';

@Component({
  selector: 'app-giveaway-my-entries',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section id="entries" class="entries ym-hide-content" aria-labelledby="entries-title">
      <h2 id="entries-title">Мои участия</h2>
      <p *ngIf="rows === null && !error">Загружаем участия…</p>
      <p *ngIf="error" role="alert">{{ error }} <button type="button" (click)="refresh()">Повторить</button></p>
      <p *ngIf="rows?.length === 0 && !error">У вас пока нет заявок на розыгрыши.</p>
      <article *ngFor="let row of rows">
        <h3>{{ row.title }} · №{{ row.number }}</h3>
        <p *ngIf="row.city">{{ row.city }}</p>
        <p>Подано {{ date(row.createdAt) }} · {{ label(row) }}</p>
        <p *ngIf="row.result === 'participating' && row.resultsPlannedAt">Итоги {{ date(row.resultsPlannedAt, false) }}</p>
        <a [routerLink]="['/giveaways', row.campaignCode]">{{ row.result === 'participating' ? 'Условия розыгрыша' : 'Посмотреть итоги' }}</a>
      </article>
    </section>
  `,
  styles: [`
    .entries { display: block; width: 100%; max-width: 1200px; margin: 24px auto; padding: 16px; color: #073a45; scroll-margin-top: 130px; }
    h2 { font-size: 1.4rem; } h3 { font-size: 1.1rem; overflow-wrap: anywhere; }
    article { padding: 16px; border-radius: 16px; background: #f2f9f9; margin-top: 10px; }
    p { margin: 5px 0; } a, button { display: inline-flex; align-items: center; min-height: 44px; color: #005763; text-decoration: underline; }
    button { background: none; border: 0; font: inherit; }
  `],
})
export class GiveawayMyEntriesComponent implements OnInit {
  rows: GiveawayEntry[] | null = null;
  error = '';
  readonly date = formatMsk;
  private readonly browser: boolean;

  constructor(private api: GiveawayEntriesService, private login: LoginService, private destroy: DestroyRef,
    @Inject(PLATFORM_ID) platform: object) { this.browser = isPlatformBrowser(platform); }

  ngOnInit(): void {
    if (!this.browser) return;
    this.login.session.ended$.pipe(takeUntilDestroyed(this.destroy)).subscribe(() => { this.rows = []; this.error = ''; });
    merge(fromEvent(window, 'focus'), fromEvent(document, 'visibilitychange')).pipe(
      startWith(null), filter(() => document.visibilityState !== 'hidden'),
      switchMap(() => this.load()), takeUntilDestroyed(this.destroy),
    ).subscribe(rows => this.rows = rows);
  }

  refresh(): void { this.load().pipe(takeUntilDestroyed(this.destroy)).subscribe(rows => this.rows = rows); }

  label(row: GiveawayEntry): string {
    if (row.result === 'won') return 'Вы выиграли. Приз в «Моих выигрышах»';
    if (row.result === 'not_won') return 'В этот раз номер не выиграл';
    return row.phase === 'active' ? 'Вы участвуете' : 'Приём завершён, ждём итоги';
  }

  private load() {
    const token = this.api.token;
    this.error = '';
    if (!token) return of([]);
    return this.api.mine().pipe(
      timeout(8000),
      filter(() => this.login.session.sameSession(token, this.api.token)),
      catchError(e => {
        if (!this.login.session.sameSession(token, this.api.token)) return EMPTY;
        this.error = e instanceof HttpErrorResponse && e.status === 403
          ? 'Войдите с подтверждением телефона, чтобы увидеть свои участия.'
          : 'Не удалось загрузить участия.';
        return of([]);
      }),
    );
  }
}
