import { CommonModule } from '@angular/common';
import { Component, DestroyRef, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize, forkJoin, of, Subject, switchMap, tap } from 'rxjs';
import { OwnerOperationsService } from '../../services/owner-operations.service';
import { OperationAudit, OperationCampaign, OperationObligation, OperationPayment, OperationPaymentRequest, OperationsPage, OperationsSummary, OperationVisit, Reconciliation } from '../DTO/views/owner-operations/owner-operations';
import { ObligationCardComponent } from './obligation-card.component';
import { ReviewOperationsComponent } from './review-operations.component';
import { ReviewProgramComponent } from './review-program.component';
import { inputKopecks, moscowDateTime, OperationsMoneyPipe } from './operations-format';

type Tab = 'today' | 'campaigns' | 'visits' | 'payouts' | 'history';
@Component({ standalone: true, selector: 'app-owner-operations', imports: [CommonModule, FormsModule, RouterLink, OperationsMoneyPipe, ObligationCardComponent, ReviewOperationsComponent, ReviewProgramComponent],
  templateUrl: './owner-operations.component.html', styleUrls: ['./owner-operations.component.scss'] })
export class OwnerOperationsComponent {
  @ViewChild('editor', { static: true }) editor!: ElementRef<HTMLDialogElement>;
  readonly tabs: { key: Tab; label: string }[] = [{ key: 'today', label: 'Сегодня' }, { key: 'campaigns', label: 'Акции' }, { key: 'visits', label: 'Визиты' }, { key: 'payouts', label: 'Выплаты' }, { key: 'history', label: 'История' }];
  tab: Tab = 'today'; allowed = false; loading = false; busy = false; error = ''; formError = ''; notice = '';
  date = ''; masterId = ''; state = ''; kind = ''; city = ''; search = ''; undated = false; cursor = 0; auditCursor = 0; entityKey = '';
  periodFrom = ''; periodTo = ''; draftFrom = ''; draftTo = ''; periodError = '';
  masters: { id: string; name: string }[] = []; summary: OperationsSummary | null = null; campaigns: OperationsPage<OperationCampaign> | null = null;
  obligations: OperationsPage<OperationObligation> | null = null; visitPage: OperationsPage<OperationVisit> | null = null;
  undatedRights: OperationObligation[] = []; payments: OperationsPage<OperationPayment> | null = null; audit: OperationsPage<OperationAudit> | null = null;
  selection: OperationObligation[] = []; mode = ''; payRows: { row: OperationObligation; amount: string }[] = []; prepared: OperationPaymentRequest | null = null;
  preview: { recipient: string; totalKopecks: number; items: OperationObligation[] } | null = null;
  reconciliation: Reconciliation | null = null; selectedVisit: OperationVisit | null = null; selectedPayment: OperationPayment | null = null;
  form = this.emptyForm(); private reload$ = new Subject<void>(); private requestGeneration = 0;
  constructor(public api: OwnerOperationsService, private destroyRef: DestroyRef) {
    if (!api.browser) return;
    this.date = moscowDateTime().slice(0, 10);
    this.setPeriod(`${this.date.slice(0, 7)}-01`, this.date);
    api.cleared$.pipe(takeUntilDestroyed(destroyRef)).subscribe(() => this.clear());
    this.reload$.pipe(switchMap(() => {
      this.loading = true;
      this.error = '';
      const generation = ++this.requestGeneration;
      const q = { masterId: this.masterId, cursor: this.cursor, state: this.state, kind: this.kind, city: this.city, search: this.search,
        from: this.periodFrom, to: this.periodTo };
      const summary = this.api.get<OperationsSummary>('summary', { date: this.date, masterId: this.masterId });
      const content = this.tab === 'campaigns' ? this.api.get<OperationsPage<OperationCampaign>>('campaigns', q) :
        this.tab === 'payouts' ? this.api.get<OperationsPage<OperationObligation>>('obligations', q) :
        this.tab === 'visits' ? this.api.get<{ page: OperationsPage<OperationVisit>; undatedRights: OperationObligation[] }>('visits', {
          ...q, from: this.undated ? '' : q.from, to: this.undated ? '' : q.to, undated: this.undated
        }) :
        this.tab === 'history' ? forkJoin({ payments: this.api.get<OperationsPage<OperationPayment>>('payments', q), audit: this.api.get<OperationsPage<OperationAudit>>('audit', { cursor: this.auditCursor, entityKey: this.entityKey }) }) : of(null);
      return forkJoin({ summary, content }).pipe(tap(result => {
        if (generation !== this.requestGeneration || !this.allowed) return;
        this.summary = result.summary; if (!this.masterId) this.masters = result.summary.masters;
        if (this.tab === 'campaigns') this.campaigns = result.content as OperationsPage<OperationCampaign>;
        if (this.tab === 'payouts') this.obligations = result.content as OperationsPage<OperationObligation>;
        if (this.tab === 'visits') { const visits = result.content as { page: OperationsPage<OperationVisit>; undatedRights: OperationObligation[] }; this.visitPage = visits.page; this.undatedRights = visits.undatedRights; }
        if (this.tab === 'history') { const history = result.content as { payments: OperationsPage<OperationPayment>; audit: OperationsPage<OperationAudit> }; this.payments = history.payments; this.audit = history.audit; }
      }), catchError(error => { this.error = this.message(error); return of(null); }), finalize(() => this.loading = false));
    }), takeUntilDestroyed(destroyRef)).subscribe();
    api.access$.pipe(takeUntilDestroyed(destroyRef)).subscribe(allowed => { this.allowed = allowed === true; if (this.allowed) this.refresh(); });
  }
  private clear(): void {
    this.requestGeneration++; this.allowed = false; this.masters = []; this.summary = null; this.campaigns = null; this.obligations = null; this.visitPage = null;
    this.undatedRights = []; this.payments = null; this.audit = null; this.selection = []; this.preview = null; this.prepared = null; this.reconciliation = null;
    this.payRows = []; this.selectedVisit = null; this.selectedPayment = null; this.form = this.emptyForm(); this.mode = ''; this.error = ''; this.notice = '';
    this.editor?.nativeElement.close();
  }
  refresh(): void { if (this.allowed) { this.selection = []; this.reload$.next(); } }
  chooseTab(tab: Tab, state = ''): void {
    this.tab = tab; this.state = state; this.kind = ''; this.entityKey = '';
    this.setPeriod(this.periodFrom, this.periodTo);
    this.changeFilter();
  }
  get showPeriod(): boolean { return this.tab !== 'today'; }
  get hasPeriod(): boolean { return !!(this.periodFrom || this.periodTo); }
  applyPeriod(): void {
    const from = this.draftFrom;
    const to = this.draftTo;
    if ([from, to].some(value => value && (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value < '2000-01-01' || value > '2099-12-31'))) {
      this.periodError = 'Укажите даты с 2000 по 2099 год.';
      return;
    }
    if (from && to) {
      const days = (Date.parse(to) - Date.parse(from)) / 86400000;
      if (days < 0 || days >= 366) {
        this.periodError = days < 0 ? 'Дата окончания раньше даты начала.' : 'Выберите период не длиннее 366 дней.';
        return;
      }
    }
    this.setPeriod(from, to);
    if (this.tab === 'visits') this.undated = false;
    this.changeFilter();
  }
  clearPeriod(): void {
    this.setPeriod('', '');
    if (this.tab === 'visits') this.undated = false;
    this.changeFilter();
  }
  private setPeriod(from: string, to: string): void {
    this.draftFrom = this.periodFrom = from;
    this.draftTo = this.periodTo = to;
    this.periodError = '';
  }
  showDue(range: 'today' | 'overdue'): void {
    this.setPeriod(range === 'today' ? this.date : '', range === 'today' ? this.date : this.shifted(-1));
    this.chooseTab('payouts', 'payable');
  }
  showAllObligations(state = ''): void { this.setPeriod('', ''); this.chooseTab('payouts', state); }
  showDayPayments(): void { this.setPeriod(this.date, this.date); this.chooseTab('history'); }
  showDayVisits(state = ''): void {
    this.undated = false;
    this.setPeriod(this.date, this.date);
    this.chooseTab('visits', state);
  }
  changeFilter(): void { this.cursor = 0; this.auditCursor = 0; this.refresh(); }
  shifted(days: number): string { return new Date(Date.parse(this.date + 'T12:00:00Z') + days * 86400000).toISOString().slice(0, 10); }
  changeDay(days: number): void { this.date = this.shifted(days); this.changeFilter(); }
  today(): void { this.date = moscowDateTime().slice(0, 10); this.changeFilter(); }
  history(key: string): void { this.tab = 'history'; this.state = ''; this.cursor = 0; this.auditCursor = 0; this.entityKey = key; this.refresh(); }
  next(cursor: number | null | undefined): void { if (cursor != null) { this.cursor = cursor; this.refresh(); } }
  nextAudit(cursor: number | null): void { if (cursor != null) { this.auditCursor = cursor; this.refresh(); } }
  selected(row: OperationObligation): boolean { return this.selection.some(x => x.obligationKey === row.obligationKey); }
  toggle(row: OperationObligation): void {
    if (this.selected(row)) this.selection = this.selection.filter(x => x.obligationKey !== row.obligationKey);
    else if (!this.selection.length || this.selection[0].masterId === row.masterId && this.selection[0].recipient === row.recipient) this.selection = [...this.selection, row];
    else this.notice = 'Для одного перевода выберите обязательства одного получателя.';
  }
  open(mode: string): void {
    this.mode = mode; this.form = this.emptyForm(); this.form.commandKey = crypto.randomUUID(); this.formError = ''; this.preview = null; this.prepared = null;
    this.editor.nativeElement.showModal();
  }
  close(): void { if (!this.busy) { this.editor.nativeElement.close(); this.mode = ''; this.payRows = []; this.preview = null; this.prepared = null; } }
  cancel(event: Event): void { if (this.busy) event.preventDefault(); else this.close(); }
  pay(rows: OperationObligation[]): void {
    this.open('payment'); this.payRows = rows.map(row => ({ row, amount: row.outstandingKopecks == null ? '' : String(row.outstandingKopecks / 100) }));
  }
  prepare(): void {
    try {
      const allocations = this.payRows.map(x => ({ obligationKey: x.row.obligationKey, amountKopecks: inputKopecks(x.amount) ?? 0, expectedVersion: x.row.expectedVersion }));
      this.prepared = { idempotencyKey: this.prepared?.idempotencyKey || crypto.randomUUID(), transferredAtUtc: this.utc(this.form.when), method: this.form.method,
        reason: this.form.reason, reference: this.form.reference || null, allocations };
      this.run(this.api.post<typeof this.preview>('payments/preview', this.prepared), result => this.preview = result);
    } catch (error) { this.formError = (error as Error).message; }
  }
  savePayment(): void { if (this.prepared && this.preview) this.run(this.api.post('payments', this.prepared), () => this.done('Выплата зарегистрирована. Остатки обновлены.')); }
  addVisit(campaign: OperationCampaign): void { this.open('visit'); this.form.planId = campaign.id; this.form.recipient = campaign.master; this.form.result = 'pending'; this.selectedVisit = null; }
  attendance(v: OperationVisit): void {
    if (v.recordId) { this.open('attendance'); this.selectedVisit = v; return; }
    this.open('visit'); this.selectedVisit = v;
    this.run(this.api.get<{ planId: string; startsAtUtc: string | null; durationMinutes: number; clientLabel: string; services: string; originalKopecks: number | null; evidence: string }>('manual-visits/' + v.visitKey.split(':')[1]), x => {
      this.form.planId = x.planId; this.form.when = x.startsAtUtc ? moscowDateTime(new Date(x.startsAtUtc)) : ''; this.form.undated = !x.startsAtUtc;
      this.form.duration = x.durationMinutes; this.form.client = x.clientLabel; this.form.services = x.services;
      this.form.base = x.originalKopecks == null ? '' : String(x.originalKopecks / 100); this.form.reason = x.evidence;
    });
  }
  correction(payment: OperationPayment): void { this.open('correction'); this.selectedPayment = payment; this.form.result = 'mistaken'; }
  manualEdit(campaign: OperationCampaign): void {
    this.open('manual'); this.form.planId = campaign.id;
    this.run(this.api.get<Record<string, unknown>>('manual-plans/' + campaign.id), value => {
      this.form = { ...this.form, ...value, fixed: value['fixedKopecks'] == null ? '' : String(Number(value['fixedKopecks']) / 100),
        base: value['confirmedBaseKopecks'] == null ? '' : String(Number(value['confirmedBaseKopecks']) / 100), cap: value['capKopecks'] == null ? '' : String(Number(value['capKopecks']) / 100) } as typeof this.form;
    });
  }
  link(campaign: OperationCampaign): void { this.open('link'); this.form.planId = campaign.id; this.run(this.api.get<{ expectedVersion: number }>('manual-plans/' + campaign.id), p => this.form.expectedVersion = p.expectedVersion); }
  saveManual(): void {
    try {
      const body = { idempotencyKey: this.form.commandKey, expectedVersion: this.form.expectedVersion, kind: this.form.kind, title: this.form.title, masterId: this.form.masterId || null, recipient: this.form.recipient,
        agreementSource: this.form.agreementSource, terms: this.form.terms, approved: this.form.approved, requiresVisit: this.form.requiresVisit, fixedKopecks: inputKopecks(this.form.fixed),
        percent: this.form.percent === '' ? null : Number(this.form.percent), confirmedBaseKopecks: inputKopecks(this.form.base), capKopecks: inputKopecks(this.form.cap), rightsLimit: this.form.rightsLimit,
        useBy: this.form.useBy || null, dueDate: this.form.dueDate || null, note: this.form.reason, sources: [] };
      this.run(this.form.planId ? this.api.put('manual-plans/' + this.form.planId, body) : this.api.post('manual-plans', body), () => this.done('Обязательство сохранено. Условия штатных акций не изменены.'));
    } catch (e) { this.formError = (e as Error).message; }
  }
  saveVisit(): void {
    try {
      const body = { idempotencyKey: this.form.commandKey, expectedVersion: this.selectedVisit?.recordId == null ? Number(this.selectedVisit?.expectedVersion || 0) : 0, planId: this.form.planId,
        startsAtUtc: this.form.undated ? null : this.utc(this.form.when), durationMinutes: this.form.duration, clientLabel: this.form.client, services: this.form.services,
        originalKopecks: inputKopecks(this.form.base), result: this.form.result, evidence: this.form.reason };
      this.run(this.selectedVisit ? this.api.put('manual-visits/' + this.selectedVisit.visitKey.split(':')[1], body) : this.api.post('manual-visits', body), () => this.done('Внешний визит сохранён.'));
    } catch (e) { this.formError = (e as Error).message; }
  }
  saveAttendance(): void {
    const v = this.selectedVisit; if (!v?.recordId) return;
    this.run(this.api.post('visits/record/' + v.recordId + '/attendance', { attended: this.form.result === 'attended', reason: this.form.reason, expectedVersion: v.expectedVersion }), () => this.done('Результат визита сохранён.'));
  }
  saveCorrection(): void {
    const p = this.selectedPayment; if (!p) return;
    this.run(this.api.post('payments/' + p.id + '/corrections', { idempotencyKey: crypto.randomUUID(), expectedVersion: p.version, kind: this.form.result,
      reason: this.form.reason, returnedAtUtc: this.form.result === 'refund' ? this.utc(this.form.when) : null }), () => this.done('Корректировка добавлена в журнал.'));
  }
  saveLink(): void { this.run(this.api.post('manual-plans/' + this.form.planId + '/link', { expectedVersion: this.form.expectedVersion, obligationKey: this.form.reference, recordId: null, reason: this.form.reason }), () => this.done('Связь сохранена без повторного учёта.')); }
  reconcile(): void { this.open('reconciliation'); this.run(this.api.get<Reconciliation>('reconciliation/preview'), value => this.reconciliation = value); }
  importLegacy(): void { if (this.reconciliation) this.run(this.api.post('reconciliation/import', { expectedVersion: this.reconciliation.expectedVersion }), () => this.done('Исторические итоги импортированы. Неизвестные даты сохранены без подстановки.')); }
  private run<T>(request: import('rxjs').Observable<T>, success: (value: T) => void): void {
    if (this.busy) return; this.busy = true; this.formError = '';
    request.pipe(finalize(() => this.busy = false), takeUntilDestroyed(this.destroyRef)).subscribe({ next: success, error: error => { this.formError = this.message(error); } });
  }
  private done(message: string): void { this.busy = false; this.close(); this.notice = message; this.refresh(); }
  private utc(value: string): string { const date = new Date(value + ':00+03:00'); if (isNaN(date.valueOf())) throw new Error('Укажите дату и время по Москве'); return date.toISOString(); }
  private message(error: { status?: number; error?: { message?: string } }): string {
    if (error.status === 409) return error.error?.message || 'Данные изменились, обновите расчёт.';
    if (error.status === 401) return 'Сессия завершена. Войдите снова.';
    if (error.status === 403) return 'Нет доступа к разделу.';
    return error.error?.message || 'Не удалось загрузить данные. Проверьте сеть и повторите обновление. Прежние суммы не считаются актуальными.';
  }
  @HostListener('window:focus') onFocus(): void { if (this.allowed && !this.mode) this.refresh(); }
  @HostListener('document:visibilitychange') onVisible(): void { if (this.api.browser && document.visibilityState === 'visible') this.onFocus(); }
  @HostListener('window:offline') onOffline(): void { this.clear(); }
  private emptyForm() { return { commandKey: '', planId: '', expectedVersion: 0, kind: 'service', title: '', masterId: '', recipient: '', agreementSource: '', terms: '', approved: false,
    requiresVisit: true, fixed: '', percent: '', base: '', cap: '', rightsLimit: 1, useBy: '', dueDate: '', reason: '', when: this.api?.browser ? moscowDateTime() : '',
    method: 'sbp', reference: '', duration: 60, client: '', services: '', result: 'attended', undated: false }; }
}
