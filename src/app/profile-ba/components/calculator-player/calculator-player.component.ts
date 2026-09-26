import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, forkJoin, of, takeUntil } from 'rxjs';
import { CalculatorAnswerKind } from '../../../DTO/enums/calculatorAnswerKind';
import { WelcomeCouponMe, WelcomeOffer, WelcomeQuote } from '../../../DTO/views/promo/welcome-coupon';
import { WelcomeCouponService } from 'src/services/welcome-coupon.service';
import { formatRub, welcomeTierList } from 'src/helpers/common/welcome-coupon';
import { CalculatorCtaKind } from '../../../DTO/enums/calculatorCtaKind';
import { CalculatorQuoteStatus } from '../../../DTO/enums/calculatorQuoteStatus';
import { CalculatorResultKind } from '../../../DTO/enums/calculatorResultKind';
import { IResponse } from '../../../DTO/classes/IResponse';
import {
  ICalculatorAnswer,
  ICalculatorBreakdownItem,
  ICalculatorConnection,
  ICalculatorMeasurement,
  ICalculatorPublicOption,
  ICalculatorPublicStep,
  ICalculatorQuoteState,
} from '../../../DTO/views/calculator/ICalculator';
import { CalculatorService } from '../../../../services/calculator.service';
import { AnalyticsService } from '../../../../services/analytics.service';
import { liftStageToBody, lockPageScroll, pinCalculatorStage, restoreStageHome } from '../../helpers/calculator-stage';
import { CalculatorFunnelEvent, claimQuoteEvent } from '../../helpers/calculator-events';
import { buildCalculatorHandoff, formatMasterIntro, quoteNumber, writeCalculatorHandoff } from '../../helpers/calculator-handoff';

/** Что стало со служебным сообщением мастеру в MAX. */
export type MasterNoticeState = 'idle' | 'sending' | 'sent' | 'skipped';

interface StoredQuote {
  quoteId: string;
  token: string;
}

export type CalculatorViewMode = 'chat' | 'form';

const OPTION_PHOTOS: Record<string, string> = {
  floating: '/assets/img/calculator/ceiling-floating.jpg',
  simple: '/assets/img/calculator/ceiling-simple.jpg',
  shadow: '/assets/img/calculator/ceiling-shadow.jpg',
  matte: '/assets/img/calculator/ceiling-matte.jpg',
  glossy: '/assets/img/calculator/ceiling-glossy.jpg',
  gloss: '/assets/img/calculator/ceiling-glossy.jpg',
  fabric: '/assets/img/calculator/ceiling-fabric.jpg',
  chandelier: '/assets/img/calculator/lighting-chandelier.jpg',
  light_lines: '/assets/img/calculator/lighting-line.jpg',
  spotlights: '/assets/img/calculator/lighting-spotlights.jpg',
  regular: '/assets/img/calculator/curtain-regular.jpg',
  hidden: '/assets/img/calculator/curtain-hidden.jpg',
  hidden_light: '/assets/img/calculator/curtain-hidden-light.jpg',
  internal: '/assets/img/calculator/corner-internal.jpg',
  external: '/assets/img/calculator/corner-external.jpg',
};

@Component({
  selector: 'app-calculator-player',
  templateUrl: './calculator-player.component.html',
  styleUrls: ['./calculator-player.component.scss']
})
export class CalculatorPlayerComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() profileId: string | null = null;
  @Input() connection: ICalculatorConnection | null = null;
  @Input() offerId: string | null = null;
  /** Имя мастера для подписи «по прайсу мастера …». Без имени — нейтральная подпись. */
  @Input() masterName: string | null = null;
  /** Ссылка на MAX мастера (из профиля, `getMaxUrl`). Пусто — кнопки «Написать мастеру» нет. */
  @Input() masterMaxUrl: string | null = null;
  @Output() bookMeasurement = new EventEmitter<string>();
  @Output() closed = new EventEmitter<void>();
  /** Результат по этому расчёту показан впервые — родитель шлёт calculator_complete. */
  @Output() finished = new EventEmitter<void>();
  /** Создан новый расчёт (не возобновлён) — родитель шлёт calculator_start. */
  @Output() started = new EventEmitter<void>();
  /**
   * Выезжать ли панели. false — когда её место уже занимала заглушка «Загружаю вопросы…»:
   * второй выезд подряд выглядит как рывок.
   */
  @Input() animateIn = true;
  /** Клиент ушёл писать мастеру в MAX — родитель шлёт calculator_max. */
  @Output() writeMaster = new EventEmitter<void>();

  @ViewChild('thread') private thread?: ElementRef<HTMLElement>;
  @ViewChild('panel') private panel?: ElementRef<HTMLElement>;
  @ViewChild('composerInput') private composerInput?: ElementRef<HTMLInputElement>;

  step: ICalculatorPublicStep | null = null;
  state: ICalculatorQuoteState | null = null;
  private history: ICalculatorPublicStep[] = [];
  numberValue: number | null = null;
  textValue = '';
  optionId: string | null = null;
  optionIds: string[] = [];
  leadName = '';
  leadPhone = '';
  leadCity = '';
  leadComment = '';
  consentAccepted = false;
  busy = false;
  error: string | null = null;
  viewMode: CalculatorViewMode = 'chat';
  composerText = '';
  /** Промежуточная смета на узком экране свёрнута до строки с суммой. */
  runExpanded = false;
  /** Заявка без записи — запасной путь, раскрывается по запросу. */
  showLeadForm = false;
  /** Клиент уже нажимал «Написать мастеру» — под кнопкой подсказка, что делать в MAX. */
  maxOpened = false;
  masterNotice: MasterNoticeState = 'idle';
  introCopied = false;
  /** Итог уже прокручен к началу карточки: дальше лента снова липнет к низу. */
  private resultAnchored = false;
  /** Один requestId на расчёт: повторный клик не шлёт мастеру второе сообщение. */
  private noticeRequestId: string | null = null;
  private viewingResult = true;
  brokenImages = new Set<string>();
  private pendingScroll = false;
  private pinFrame = 0;
  private mountFrame = 0;
  private homeMark: Comment | null = null;
  private unlockScroll: (() => void) | null = null;
  private readonly times = new Map<string, string>();

  readonly kinds = CalculatorAnswerKind;
  readonly ctaKinds = CalculatorCtaKind;

  private token: string | null = null;
  private startingQuote = false;
  private pendingAnswer: { stepId: string; answer: ICalculatorAnswer } | null = null;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly api: CalculatorService,
    private readonly analytics: AnalyticsService,
    private readonly coupons: WelcomeCouponService,
    private readonly host: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private readonly platformId: object,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Только resize: положение панели от прокрутки страницы не зависит (calculator-stage.ts).
      window.addEventListener('resize', this.onViewportChange);
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.mountStage();
    // Колонка могла ещё не сложиться — уточняем положение через кадр, без повторного переноса и фокуса.
    this.mountFrame = requestAnimationFrame(() => {
      this.mountFrame = 0;
      this.pinStage();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['connection']) {
      return;
    }
    if (!this.connection) {
      this.resetLocal();
      return;
    }
    this.startFresh(false);
    if (!isPlatformBrowser(this.platformId) || !this.connection.profileCalculatorId) {
      return;
    }
    const stored = this.readStored(this.connection.profileCalculatorId);
    if (stored) {
      this.resume(stored);
      return;
    }
    this.beginQuote();
  }

  ngAfterViewChecked(): void {
    if (!this.pendingScroll) {
      return;
    }
    this.pendingScroll = false;
    this.scrollThread();
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.onViewportChange);
      if (this.pinFrame) {
        cancelAnimationFrame(this.pinFrame);
      }
      if (this.mountFrame) {
        cancelAnimationFrame(this.mountFrame);
      }
      restoreStageHome(this.host.nativeElement, this.homeMark);
      this.homeMark = null;
      this.unlockScroll?.();
      this.unlockScroll = null;
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  close(event?: Event): void {
    event?.stopPropagation();
    this.closed.emit();
  }

  clearChat(): void {
    if (!this.connection || this.busy || this.startingQuote) {
      return;
    }
    this.startFresh(true);
    this.beginQuote();
  }

  setView(mode: CalculatorViewMode): void {
    this.viewMode = mode;
    this.pendingScroll = true;
  }

  get result() {
    if (!this.viewingResult) {
      return null;
    }
    return this.state?.result ?? null;
  }

  get headline(): string {
    return this.connection?.name || 'Расчёт стоимости';
  }

  get leadText(): string {
    return this.connection?.description
      || 'Расскажите, что вам нужно — уточню детали и сразу рассчитаю ориентировочную стоимость.';
  }

  get greeting(): string {
    return 'Здравствуйте! Я помогу рассчитать стоимость. Для начала ответьте на несколько вопросов.';
  }

  get composerPlaceholder(): string {
    if (!this.step) {
      return 'Напишите сообщение…';
    }
    if (this.step.answerKind === CalculatorAnswerKind.Number) {
      const unit = this.unitLabel(this.step.unit);
      return this.step.placeholder || (unit ? `Укажите значение, ${unit}` : 'Укажите число');
    }
    if (this.step.answerKind === CalculatorAnswerKind.Text) {
      return this.step.placeholder || 'Напишите ответ…';
    }
    return 'Напишите свой вопрос или уточнение…';
  }

  get composerEnabled(): boolean {
    if (this.busy || this.leadSent) {
      return false;
    }
    if (this.composerText.trim()) {
      return true;
    }
    return this.step?.answerKind === CalculatorAnswerKind.ChoiceMultiple && this.optionIds.length > 0;
  }

  get pastTurns(): { step: ICalculatorPublicStep; answer: ICalculatorAnswer }[] {
    const answers = this.visibleAnswers;
    const turns: { step: ICalculatorPublicStep; answer: ICalculatorAnswer }[] = [];
    for (const answer of answers) {
      const step = this.history.find(item => item.id === answer.stepId);
      if (step) {
        turns.push({ step, answer });
      }
    }
    return turns;
  }

  get canGoBack(): boolean {
    if (this.leadSent) {
      return false;
    }
    const answers = this.state?.answers ?? [];
    if (answers.length === 0) {
      return false;
    }
    if (this.result) {
      return true;
    }
    return this.step?.id !== answers[0].stepId;
  }

  get sumText(): string | null {
    const total = this.result?.total;
    if (total == null) {
      return null;
    }
    const money = this.formatMoney(total);
    return this.result?.totalIsFrom ? `от ${money}` : money;
  }

  get resultTitle(): string {
    if (!this.result) {
      return '';
    }
    if (this.result.resultKind === CalculatorResultKind.Unavailable) {
      return 'Стоимость мастер назовёт на замере';
    }
    return this.viewMode === 'form' ? 'Ориентир по прайсу' : 'Ваш расчёт готов';
  }


  // ── Приветственный купон ─────────────────────────────────────────────────
  // Витрина сама ничего не считает. Спрашиваем сервер о двух разных вещах:
  // применится ли скидка к той услуге, на которую ведёт кнопка (quote), и есть ли
  // у клиента право вообще (offer + me). Это не одно и то же: кнопка часто ведёт на
  // бесплатный замер, скидка к нему не применяется, но купон у клиента остаётся.
  couponOffer: WelcomeOffer | null = null;
  couponQuote: WelcomeQuote | null = null;
  couponMine: WelcomeCouponMe | null = null;
  private couponKey = '';

  /** Текст под сметой или null, если показывать нечего. */
  get couponNoteText(): string | null {
    const campaign = this.couponOffer?.campaign;
    if (!this.couponOffer?.active || !this.couponOffer.masterParticipates || !campaign?.tiers?.length) {
      return null;
    }

    // 1. Скидка применится прямо к этой записи — говорим сумму.
    const quote = this.couponQuote;
    if (quote?.couponStatus === 'available' && quote.discountAmount > 0) {
      return `У вас есть купон Onwaves на ${formatRub(quote.discountAmount)} — он применится к этой записи,`
        + ' если оформить её онлайн через сайт.';
    }
    if (quote?.couponStatus === 'login_required' && quote.potentialDiscount > 0) {
      return `Запишитесь онлайн через сайт — к этой записи применится купон Onwaves на ${formatRub(quote.potentialDiscount)}.`
        + ' Войдите или зарегистрируйтесь при оформлении.';
    }

    // 2. К этой записи скидка не применится (бесплатный замер, цена за м²), но право
    // у клиента есть. Зовём записаться онлайн, не обещая скидку на саму эту запись.
    const tier = welcomeTierList(campaign)[0];
    if (!tier) {
      return null;
    }
    // Вошедшему показываем, только если сервер подтвердил, что право ещё не израсходовано.
    if (this.coupons.isLoggedIn) {
      return this.couponMine?.status === 'available'
        ? `У вас есть купон Onwaves на скидку от ${formatRub(tier.discount)}. Он применится при онлайн-записи`
          + ` на услугу от ${formatRub(tier.threshold)} — эта запись его не расходует.`
        : null;
    }
    return `Запишитесь онлайн через Onwaves — у новых клиентов есть купон на скидку от ${formatRub(tier.discount)}.`
      + ` Он применится к первой записи на услугу от ${formatRub(tier.threshold)}; эта запись его не расходует.`;
  }

  /**
   * Тянем условия один раз на смету. Ключ включает признак входа: гость и вошедший
   * получают разные ответы, а после входа расчёт надо перезапросить.
   */
  private refreshCouponNote(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const masterId = this.profileId;
    const serviceId = this.result?.measurementServiceId || this.connection?.measurementServiceId || '';
    // Кнопка «жду звонка» записи не создаёт — звать записаться онлайн там нечем.
    if (!masterId || this.result?.ctaKind !== CalculatorCtaKind.Record) {
      this.couponOffer = null;
      this.couponQuote = null;
      this.couponMine = null;
      this.couponKey = '';
      return;
    }
    const key = `${masterId}|${serviceId}|${this.coupons.isLoggedIn ? 'auth' : 'guest'}`;
    if (key === this.couponKey) {
      return;
    }
    this.couponKey = key;
    forkJoin({
      offer: this.coupons.getOffer(masterId),
      quote: serviceId ? this.coupons.quote(masterId, [serviceId]) : of(null),
      mine: this.coupons.isLoggedIn ? this.coupons.getMine() : of(null),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ offer, quote, mine }) => {
        this.couponOffer = offer;
        this.couponQuote = quote;
        this.couponMine = mine;
        if (this.couponNoteText) {
          this.coupons.track('calculator_shown', offer.campaign?.code);
        }
      });
  }

  /** Первый ответ дан — шапка ужимается, место отдаётся диалогу. */
  get hasStarted(): boolean {
    return (this.state?.answers?.length ?? 0) > 0;
  }

  get priceSourceText(): string {
    const name = (this.masterName ?? '').trim();
    return name ? `По прайсу мастера ${name}` : 'По прайсу мастера';
  }

  /** Подпись под кнопкой записи: сумма остаётся перед глазами в момент решения. */
  get ctaSubline(): string {
    if (this.resultIsUnavailable) {
      return 'Мастер посчитает стоимость на замере';
    }
    if (this.measurements.length) {
      return this.sumText
        ? `${this.sumText} · особенности мастер посчитает отдельно`
        : 'Особенности мастер посчитает отдельно';
    }
    return this.sumText
      ? `${this.sumText} · расчёт уйдёт мастеру вместе с записью`
      : 'Расчёт уйдёт мастеру вместе с записью';
  }

  get runningCaption(): string {
    const count = this.runningRows.length;
    if (!count) {
      return 'Сумма появится после первых ответов';
    }
    return `${count} ${this.plural(count, 'позиция', 'позиции', 'позиций')} · дальше уточнится`;
  }

  /** «от 42 000 ₽, №abcdef12» — то, что клиент называет мастеру, если буфер обмена недоступен. */
  get quoteLabel(): string {
    const id = this.state?.quoteId;
    const number = id ? `№${quoteNumber(id)}` : '';
    return [this.sumText, number].filter(Boolean).join(', ');
  }

  get canWriteMaster(): boolean {
    return !!this.masterMaxUrl;
  }

  get maxHintText(): string {
    const pasted = this.introCopied ? ' Первое сообщение скопировано — вставьте его в чат.' : '';
    switch (this.masterNotice) {
      case 'sent':
        return `Расчёт уже у мастера в MAX.${pasted}`;
      case 'sending':
        return `Передаём расчёт мастеру…${pasted}`;
      default:
        return this.introCopied
          ? 'Первое сообщение с расчётом скопировано — вставьте его в чат с мастером.'
          : `Напишите мастеру сумму и номер расчёта: ${this.quoteLabel} — так он сразу поймёт, о чём речь.`;
    }
  }

  /**
   * «Написать мастеру»: пока без чата OnWaves — переписка в MAX мастера.
   * Сам расчёт мастер получает от бота OnWaves (служебный канал), а клиенту
   * кладём в буфер короткое первое сообщение с суммой и номером расчёта.
   */
  openMasterMax(): void {
    const url = this.masterMaxUrl;
    if (!url || !isPlatformBrowser(this.platformId)) {
      return;
    }
    // Вкладку открываем первой и синхронно: иначе мобильный браузер сочтёт её всплывающим окном.
    window.open(url, '_blank', 'noopener,noreferrer');
    this.maxOpened = true;
    this.copyIntro();
    this.notifyMaster();
    this.trackOnce('max', () => this.writeMaster.emit());
  }

  toggleRun(): void {
    this.runExpanded = !this.runExpanded;
  }

  openLeadForm(): void {
    this.showLeadForm = true;
    this.pendingScroll = true;
  }

  get resultIsUnavailable(): boolean {
    return this.result?.resultKind === CalculatorResultKind.Unavailable;
  }

  get measurementCtaText(): string {
    return this.result?.ctaText
      || this.connection?.ctaText
      || 'Записаться на бесплатный замер';
  }

  /** Сумма с сервера после шагов, где уже есть ставки: площадь + тип + (периметр) + полотно. */
  get showRunningQuote(): boolean {
    return !this.result && this.state?.runningTotal != null;
  }

  get runningSumText(): string | null {
    if (this.state?.runningTotal == null) {
      return null;
    }
    const money = this.formatMoney(this.state.runningTotal);
    return this.state.runningTotalIsFrom ? `от ${money}` : money;
  }

  get runningRows(): ICalculatorBreakdownItem[] {
    return this.state?.runningBreakdown ?? [];
  }

  get runningMeasureItems(): ICalculatorMeasurement[] {
    return this.state?.runningMeasurements ?? [];
  }

  get measurements(): { label: string }[] {
    return this.result?.measurements ?? [];
  }

  get extrasTitle(): string {
    if (this.measurements.length === 1) {
      return `«${this.measurements[0].label}» мастер посчитает отдельно`;
    }
    return 'Эти работы мастер посчитает отдельно';
  }

  get extrasHint(): string {
    return this.canWriteMaster
      ? 'В сумме этого нет — напишите мастеру, чтобы уточнить детали.'
      : 'В сумме этого нет. Запишитесь на замер — мастер посчитает эту работу отдельно.';
  }

  get runningExtrasTitle(): string {
    if (this.runningMeasureItems.length === 1) {
      return `«${this.runningMeasureItems[0].label}» мастер посчитает отдельно`;
    }
    return 'Эти работы мастер посчитает отдельно';
  }

  get leadSent(): boolean {
    return this.state?.status === CalculatorQuoteStatus.LeadSent;
  }

  get resultSummary(): string {
    return this.pastTurns
      .map(item => this.answerLabel(item.step, item.answer))
      .filter(Boolean)
      .slice(0, 6)
      .join(', ');
  }

  timeOf(id: string): string {
    return this.times.get(id) || this.stamp(id);
  }

  hideImage(url?: string | null): void {
    if (url) {
      this.brokenImages.add(url);
    }
  }

  showImage(url?: string | null): boolean {
    return !!url && !this.brokenImages.has(url);
  }

  optionPhoto(option: ICalculatorPublicOption): string | null {
    return option.imageUrl || OPTION_PHOTOS[option.code] || null;
  }

  optionPhotoAlt(option: ICalculatorPublicOption): string {
    return option.imageAlt || option.label;
  }

  hasOptionImages(step: ICalculatorPublicStep | null): boolean {
    return !!step?.options.some(item => this.showImage(this.optionPhoto(item)));
  }

  hasOptionDescriptions(step: ICalculatorPublicStep | null): boolean {
    return !!step?.options.some(item => !!item.description);
  }

  isSelected(option: ICalculatorPublicOption): boolean {
    if (this.step?.answerKind === CalculatorAnswerKind.ChoiceMultiple) {
      return this.optionIds.includes(option.id);
    }
    return this.optionId === option.id;
  }

  get imagedOptions(): ICalculatorPublicOption[] {
    return (this.step?.options || []).filter(option => this.showImage(this.optionPhoto(option)));
  }

  get textOptions(): ICalculatorPublicOption[] {
    return (this.step?.options || []).filter(option => !this.showImage(this.optionPhoto(option)));
  }

  get multipleHint(): string {
    const key = this.step?.key || '';
    const title = this.step?.title || '';
    if (key === 'lighting_types' || /освещен/i.test(title)) {
      return 'Можно выбрать несколько: люстру, линии и светильники — в любой комбинации';
    }
    if (key === 'extra_corner_types' || /углы/i.test(title)) {
      return '4 внутренних угла уже в базовой цене. Можно отметить внешние и дополнительные внутренние вместе';
    }
    return 'Можно выбрать несколько вариантов';
  }

  get numberPresets(): number[] {
    if (this.step?.answerKind !== CalculatorAnswerKind.Number || this.isTypedNumberStep) {
      return [];
    }
    const min = this.step.minValue ?? 1;
    const max = this.step.maxValue;
    const last = max != null ? Math.min(max, min + 4) : min + 4;
    const values: number[] = [];
    for (let n = min; n <= last; n++) {
      values.push(n);
    }
    return values;
  }

  /** Площадь и углы — только ввод, без чипов. */
  private get isTypedNumberStep(): boolean {
    const step = this.step;
    if (!step) {
      return false;
    }
    if (step.unit === 'm2') {
      return true;
    }
    const key = `${step.key || ''} ${step.id || ''}`.toLowerCase();
    if (key.includes('area') || key.includes('площад') || key.includes('corner') || key.includes('reinforce')) {
      return true;
    }
    return /площад|углов|усилива/i.test(step.title || '');
  }

  pickNumber(value: number): void {
    if (this.busy) {
      return;
    }
    this.numberValue = value;
    this.composerText = String(value);
    this.submitStep();
  }

  nudgeNumber(delta: number): void {
    if (!this.step || this.busy || !this.canNudge(delta)) {
      return;
    }
    const next = this.currentNumber() + delta * (this.step.stepValue || 1);
    this.numberValue = next;
    this.composerText = String(next);
  }

  canNudge(delta: number): boolean {
    if (!this.step) {
      return false;
    }
    const next = this.currentNumber() + delta * (this.step.stepValue || 1);
    if (this.step.minValue != null && next < this.step.minValue) {
      return false;
    }
    if (this.step.maxValue != null && next > this.step.maxValue) {
      return false;
    }
    return next > 0 || (this.step.minValue != null && this.step.minValue <= 0);
  }

  pickOption(option: ICalculatorPublicOption): void {
    if (!this.step || this.busy) {
      return;
    }
    if (this.step.answerKind === CalculatorAnswerKind.ChoiceMultiple) {
      if (this.isSelected(option)) {
        this.optionIds = this.optionIds.filter(id => id !== option.id);
      } else if (option.exclusive) {
        this.optionIds = [option.id];
      } else {
        const exclusiveIds = this.step.options.filter(item => item.exclusive).map(item => item.id);
        this.optionIds = [...this.optionIds.filter(id => !exclusiveIds.includes(id)), option.id];
      }
      return;
    }
    this.optionId = option.id;
    if (this.viewMode === 'chat') {
      this.submitStep();
    }
  }

  goBack(): void {
    const answers = this.state?.answers ?? [];
    if (!answers.length) {
      return;
    }
    const idx = answers.findIndex(item => item.stepId === this.step?.id);
    const previous = idx > 0 ? answers[idx - 1] : idx < 0 ? answers[answers.length - 1] : null;
    if (!previous) {
      return;
    }
    const fromHistory = [...this.history].reverse().find(item => item.id === previous.stepId)
      ?? this.connection?.entryStep;
    if (!fromHistory) {
      return;
    }
    this.error = null;
    this.step = fromHistory;
    this.viewingResult = false;
    this.resultAnchored = false;
    this.hydrateFromAnswer(fromHistory, previous);
    this.pendingScroll = true;
  }

  submitStep(): void {
    if (!this.connection || !this.step || this.busy) {
      return;
    }
    const answer = this.buildAnswer(this.step);
    if (!answer) {
      return;
    }
    this.error = null;
    this.busy = true;
    this.pendingScroll = true;
    this.stamp('a-' + this.step.id);
    if (this.token && this.state) {
      this.sendAnswer(this.step.id, answer);
      return;
    }
    if (this.startingQuote) {
      this.pendingAnswer = { stepId: this.step.id, answer };
      return;
    }
    this.startThenAnswer(answer);
  }

  sendComposer(): void {
    if (!this.composerEnabled) {
      return;
    }
    const text = this.composerText.trim();
    if (!this.step) {
      return;
    }
    if (!text && this.step.answerKind === CalculatorAnswerKind.ChoiceMultiple) {
      this.submitStep();
      return;
    }
    if (this.step.answerKind === CalculatorAnswerKind.Number) {
      const parsed = this.parseNumber(text);
      if (parsed == null) {
        this.error = 'Укажите число';
        return;
      }
      this.numberValue = parsed;
      this.composerText = '';
      this.submitStep();
      return;
    }
    if (this.step.answerKind === CalculatorAnswerKind.Text) {
      this.textValue = text;
      this.composerText = '';
      this.submitStep();
      return;
    }
    const matched = this.matchOption(text);
    if (!matched) {
      this.error = 'Выберите вариант ниже или напишите его название';
      return;
    }
    this.composerText = '';
    this.error = null;
    this.pickOption(matched);
    if (this.step.answerKind === CalculatorAnswerKind.ChoiceMultiple && this.optionIds.length > 0) {
      this.submitStep();
    }
  }

  submitLead(): void {
    if (!this.state || !this.token || this.busy || this.leadSent) {
      return;
    }
    if (!this.consentAccepted) {
      this.error = 'Нужно согласие на обработку данных';
      return;
    }
    this.busy = true;
    this.error = null;
    this.api.submitLead(
      this.state.quoteId,
      this.token,
      this.state.revision,
      this.requestId(),
      {
        name: this.leadName,
        phone: this.leadPhone,
        city: this.leadCity || undefined,
        comment: this.leadComment || undefined,
        consentAccepted: true
      }
    ).pipe(takeUntil(this.destroy$)).subscribe({
      next: res => {
        this.busy = false;
        const state = this.api.asState(res);
        if (!state) {
          this.error = res.message || 'Не удалось отправить заявку';
          return;
        }
        this.applyState(state);
        this.analytics.trackEvent('calculator', 'calculator_lead', this.connection?.calculatorId ?? undefined);
      },
      error: err => this.fail(err, true)
    });
  }

  goRecord(): void {
    const serviceId = this.result?.measurementServiceId || this.connection?.measurementServiceId || '';
    this.saveHandoff();
    this.analytics.trackEvent('calculator', 'calculator_record', this.connection?.calculatorId ?? undefined);
    this.bookMeasurement.emit(serviceId);
    this.close();
  }

  formatMoney(amount: number): string {
    return `${Math.round(amount).toLocaleString('ru-RU')} ₽`;
  }

  unitLabel(unit?: string | null): string {
    switch (unit) {
      case 'm2': return 'м²';
      case 'm': return 'м';
      case 'pcs': return 'шт.';
      case 'groups': return 'групп';
      case 'job': return 'работа';
      default: return unit || '';
    }
  }

  answerLabel(step: ICalculatorPublicStep, answer: ICalculatorAnswer): string {
    switch (step.answerKind) {
      case CalculatorAnswerKind.Choice: {
        const option = step.options.find(item => item.id === answer.optionId);
        return option?.label || 'Выбрано';
      }
      case CalculatorAnswerKind.ChoiceMultiple: {
        const labels = step.options
          .filter(item => answer.optionIds?.includes(item.id))
          .map(item => item.label);
        return labels.join(', ') || 'Выбрано';
      }
      case CalculatorAnswerKind.Number: {
        const unit = this.unitLabel(step.unit);
        return unit ? `${answer.numberValue} ${unit}` : String(answer.numberValue ?? '');
      }
      case CalculatorAnswerKind.Text:
        return answer.textValue || '';
      default:
        return '';
    }
  }

  instanceKicker(step: ICalculatorPublicStep): string | null {
    if (!step.instanceIndex || !step.instanceCount) {
      return null;
    }
    const label = step.instanceLabel || 'Помещение';
    return `${label} ${step.instanceIndex} из ${step.instanceCount}`;
  }

  rowAmount(amount: number | null | undefined): string {
    if (amount == null) {
      return 'на замере';
    }
    return this.formatMoney(amount);
  }

  trackOption(_: number, option: ICalculatorPublicOption): string {
    return option.id;
  }

  trackRow(_: number, row: ICalculatorBreakdownItem): string {
    return `${row.scopeId || ''}:${row.instanceIndex ?? 0}:${row.key}`;
  }

  rowDetail(row: ICalculatorBreakdownItem): string | null {
    if (row.quantity == null) {
      return null;
    }
    const qty = row.quantity.toLocaleString('ru-RU', { maximumFractionDigits: 2 });
    const unit = this.unitLabel(row.unit);
    const qtyText = unit ? `${qty} ${unit}` : qty;
    if (row.unitPrice == null) {
      return qtyText;
    }
    return `${qtyText} × ${this.formatMoney(row.unitPrice)}`;
  }

  /** Расчёт едет в запись: шаги записи дописывают его в комментарий мастеру. */
  private saveHandoff(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const handoff = buildCalculatorHandoff({
      profileId: this.profileId,
      quoteId: this.state?.quoteId,
      result: this.result,
      clientNote: this.leadComment,
    });
    if (handoff) {
      writeCalculatorHandoff(handoff);
    }
  }

  private copyIntro(): void {
    const quoteId = this.state?.quoteId;
    if (!quoteId) {
      return;
    }
    const text = formatMasterIntro(
      quoteId,
      this.sumText,
      this.connection?.name,
      this.measurements.map(item => item.label),
    );
    if (!text) {
      return;
    }
    this.writeClipboard(text).then(ok => this.introCopied = ok);
  }

  private writeClipboard(text: string): Promise<boolean> {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      return navigator.clipboard.writeText(text).then(
        () => true,
        () => this.copyFallback(text),
      );
    }
    return Promise.resolve(this.copyFallback(text));
  }

  private copyFallback(text: string): boolean {
    try {
      const area = this.document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.left = '-9999px';
      this.document.body.appendChild(area);
      area.select();
      const ok = this.document.execCommand('copy');
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }

  /** Служебное сообщение мастеру от бота OnWaves. Сбой не мешает клиенту написать самому. */
  private notifyMaster(): void {
    if (!this.state?.quoteId || !this.token || !this.result || this.masterNotice !== 'idle') {
      return;
    }
    this.noticeRequestId ??= this.requestId();
    this.masterNotice = 'sending';
    this.api.notifyMaster(this.state.quoteId, this.token, this.noticeRequestId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => this.masterNotice = this.noticeDelivered(res) ? 'sent' : 'skipped',
        error: () => this.masterNotice = 'skipped',
      });
  }

  private noticeDelivered(res: IResponse): boolean {
    const data = this.api.asNotify(res);
    return !!data?.sent || data?.reason === 'already_sent';
  }

  private plural(n: number, one: string, few: string, many: string): string {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) {
      return one;
    }
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
      return few;
    }
    return many;
  }

  private get visibleAnswers(): ICalculatorAnswer[] {
    const answers = this.state?.answers ?? [];
    if (this.result) {
      return answers;
    }
    const idx = answers.findIndex(item => item.stepId === this.step?.id);
    return idx >= 0 ? answers.slice(0, idx) : answers;
  }

  private startThenAnswer(answer: ICalculatorAnswer): void {
    this.api.startQuote(this.connection!.profileCalculatorId, this.requestId())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          const state = this.api.asState(res);
          if (!state?.accessToken || !state.quoteId) {
            this.busy = false;
            this.error = res.message || 'Не удалось начать расчёт';
            return;
          }
          this.token = state.accessToken;
          this.state = state;
          this.writeStored(state.profileCalculatorId, { quoteId: state.quoteId, token: state.accessToken });
          this.markStarted(state.quoteId);
          this.sendAnswer(answer.stepId, answer);
        },
        error: err => this.fail(err)
      });
  }

  private sendAnswer(stepId: string, answer: ICalculatorAnswer): void {
    this.api.putAnswer(
      this.state!.quoteId,
      stepId,
      this.token!,
      this.state!.revision,
      this.requestId(),
      answer
    ).pipe(takeUntil(this.destroy$)).subscribe({
      next: res => {
        this.busy = false;
        const state = this.api.asState(res);
        if (!state) {
          this.error = res.message || 'Не удалось сохранить ответ';
          return;
        }
        this.applyState(state);
        this.analytics.trackEvent('calculator', 'calculator_step', this.step?.key ?? undefined);
        if (state.result) {
          this.markComplete();
        }
      },
      error: err => this.fail(err, true)
    });
  }

  private resume(stored: StoredQuote): void {
    this.busy = true;
    this.api.getQuote(stored.quoteId, stored.token).pipe(takeUntil(this.destroy$)).subscribe({
      next: res => {
        this.busy = false;
        const state = this.api.asState(res);
        if (!state) {
          this.clearStored(this.connection!.profileCalculatorId);
          return;
        }
        this.token = stored.token;
        this.applyState(state);
      },
      error: () => {
        this.busy = false;
        this.clearStored(this.connection!.profileCalculatorId);
      }
    });
  }

  private applyState(state: ICalculatorQuoteState, reopenStepId?: string): void {
    this.state = state;
    if (state.answeredSteps) {
      this.history = [...state.answeredSteps];
    }
    this.viewingResult = !!state.result;
    if (reopenStepId) {
      return;
    }
    this.step = state.currentStep ?? null;
    if (this.step) {
      this.stamp(this.step.id);
      if (!this.history.some(item => item.id === this.step!.id)) {
        this.history = [...this.history, this.step];
      }
      const existing = state.answers.find(item => item.stepId === this.step!.id);
      if (existing) {
        this.hydrateFromAnswer(this.step, existing);
      } else {
        this.hydrateDraft(this.step);
      }
    }
    if (state.result) {
      this.stamp('result');
      this.refreshCouponNote();
    }
    this.pendingScroll = true;
    if (this.viewMode === 'chat' && this.needsComposerFocus) {
      queueMicrotask(() => this.composerInput?.nativeElement?.focus({ preventScroll: true }));
    }
  }

  private get needsComposerFocus(): boolean {
    const kind = this.step?.answerKind;
    return kind === CalculatorAnswerKind.Number || kind === CalculatorAnswerKind.Text;
  }

  private buildAnswer(step: ICalculatorPublicStep): ICalculatorAnswer | null {
    const base: ICalculatorAnswer = {
      stepId: step.id,
      stepKey: step.key,
      scopeId: step.scopeId,
      instanceIndex: step.instanceIndex
    };
    switch (step.answerKind) {
      case CalculatorAnswerKind.Choice: {
        if (!this.optionId) {
          this.error = 'Выберите вариант';
          return null;
        }
        return { ...base, optionId: this.optionId };
      }
      case CalculatorAnswerKind.ChoiceMultiple:
        if (step.isRequired && this.optionIds.length === 0) {
          this.error = 'Выберите хотя бы один вариант';
          return null;
        }
        return { ...base, optionIds: [...this.optionIds] };
      case CalculatorAnswerKind.Number: {
        if (this.numberValue == null || Number.isNaN(this.numberValue)) {
          this.error = 'Укажите число';
          return null;
        }
        return { ...base, numberValue: this.numberValue };
      }
      case CalculatorAnswerKind.Text:
        if (step.isRequired && !this.textValue.trim()) {
          this.error = 'Напишите ответ';
          return null;
        }
        return { ...base, textValue: this.textValue.trim() };
      default:
        this.error = 'Неизвестный шаг';
        return null;
    }
  }

  private hydrateDraft(step: ICalculatorPublicStep): void {
    this.optionId = this.viewMode === 'form'
      ? step.options.find(item => item.isDefault)?.id ?? null
      : null;
    this.optionIds = [];
    this.numberValue = step.defaultValue ?? null;
    this.textValue = '';
    this.syncComposer(step);
  }

  private hydrateFromAnswer(step: ICalculatorPublicStep, answer: ICalculatorAnswer): void {
    this.optionId = answer.optionId ?? null;
    this.optionIds = answer.optionIds ?? [];
    this.numberValue = answer.numberValue ?? step.minValue ?? null;
    this.textValue = answer.textValue ?? '';
    this.syncComposer(step);
  }

  private syncComposer(step: ICalculatorPublicStep): void {
    if (this.viewMode !== 'chat') {
      this.composerText = '';
      return;
    }
    if (step.answerKind === CalculatorAnswerKind.Number && this.numberValue != null) {
      this.composerText = String(this.numberValue);
      return;
    }
    if (step.answerKind === CalculatorAnswerKind.Text) {
      this.composerText = this.textValue;
      return;
    }
    this.composerText = '';
  }

  private startFresh(forgetQuote: boolean): void {
    if (forgetQuote && this.connection?.profileCalculatorId) {
      this.clearStored(this.connection.profileCalculatorId);
    }
    this.resetLocal();
    this.step = this.connection?.entryStep ?? null;
    this.history = this.step ? [this.step] : [];
    if (this.step) {
      this.hydrateDraft(this.step);
      this.stamp(this.step.id);
    }
    this.stamp('hello');
    this.pendingScroll = true;
  }

  private resetLocal(): void {
    this.state = null;
    this.token = null;
    this.error = null;
    this.busy = false;
    this.brokenImages.clear();
    this.history = [];
    this.viewingResult = true;
    this.viewMode = 'chat';
    this.composerText = '';
    this.times.clear();
    this.leadName = '';
    this.leadPhone = '';
    this.leadCity = '';
    this.leadComment = '';
    this.consentAccepted = false;
    this.runExpanded = false;
    this.showLeadForm = false;
    this.noticeRequestId = null;
    this.maxOpened = false;
    this.masterNotice = 'idle';
    this.introCopied = false;
    this.resultAnchored = false;
    this.startingQuote = false;
    this.pendingAnswer = null;
  }

  /** Quote создаём сразу: проход живёт на сервере даже до первого ответа. */
  private beginQuote(): void {
    if (!this.connection || this.token || this.startingQuote || !isPlatformBrowser(this.platformId)) {
      return;
    }
    this.startingQuote = true;
    this.api.startQuote(this.connection.profileCalculatorId, this.requestId())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.startingQuote = false;
          const state = this.api.asState(res);
          if (!state?.accessToken || !state.quoteId) {
            return;
          }
          this.token = state.accessToken;
          this.writeStored(state.profileCalculatorId, { quoteId: state.quoteId, token: state.accessToken });
          this.applyState(state);
          this.markStarted(state.quoteId);
          const pending = this.pendingAnswer;
          this.pendingAnswer = null;
          if (pending) {
            this.busy = true;
            this.sendAnswer(pending.stepId, pending.answer);
          }
        },
        error: () => {
          this.startingQuote = false;
          const pending = this.pendingAnswer;
          this.pendingAnswer = null;
          if (pending) {
            this.startThenAnswer(pending.answer);
          }
        }
      });
  }

  private markComplete(): void {
    this.trackOnce('complete', () => this.finished.emit());
  }

  /** Новый расчёт создан сервером: resume и повторное открытие сюда не попадают. */
  private markStarted(quoteId: string): void {
    this.trackOnce('start', () => this.started.emit(), quoteId);
  }

  /** Событие воронки: Метрика здесь, get-reference — у родителя. Один раз на расчёт. */
  private trackOnce(event: CalculatorFunnelEvent, emit: () => void, quoteId = this.state?.quoteId): void {
    if (!claimQuoteEvent(quoteId, event)) {
      return;
    }
    this.analytics.trackEvent('calculator', `calculator_${event}`, this.connection?.calculatorId ?? undefined);
    emit();
  }

  private fail(err: unknown, applyConflict = false): void {
    this.busy = false;
    const http = err as HttpErrorResponse;
    const body = http?.error as IResponse | undefined;
    this.error = body?.message || 'Сеть недоступна, попробуйте ещё раз';
    this.pendingScroll = true;
    if (body?.code !== 409) {
      return;
    }
    if (applyConflict) {
      const state = this.api.asState(body);
      if (state) {
        this.applyState(state);
        if (state.result) {
          this.markComplete();
        }
        return;
      }
    }
    this.startFresh(true);
  }

  private matchOption(text: string): ICalculatorPublicOption | null {
    if (!this.step || !text) {
      return null;
    }
    const needle = this.normalize(text);
    const exact = this.step.options.find(item => this.normalize(item.label) === needle);
    if (exact) {
      return exact;
    }
    const contained = this.step.options.filter(item => {
      const label = this.normalize(item.label);
      return label.includes(needle) || needle.includes(label);
    });
    return contained.length === 1 ? contained[0] : null;
  }

  private currentNumber(): number {
    const parsed = this.parseNumber(this.composerText);
    if (parsed != null) {
      return parsed;
    }
    if (this.numberValue != null) {
      return this.numberValue;
    }
    return this.step?.minValue ?? this.step?.defaultValue ?? 1;
  }

  private parseNumber(raw: string): number | null {
    const cleaned = raw.replace(',', '.').replace(/[^\d.+-]/g, '');
    if (!cleaned) {
      return null;
    }
    const value = Number(cleaned);
    return Number.isFinite(value) ? value : null;
  }

  private normalize(value: string): string {
    return value.trim().toLowerCase().replace(/ё/g, 'е');
  }

  private stamp(id: string): string {
    const current = this.times.get(id);
    if (current) {
      return current;
    }
    const now = new Date();
    const stamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    this.times.set(id, stamp);
    return stamp;
  }

  private scrollThread(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const root = this.thread?.nativeElement;
    if (!root) {
      return;
    }
    // Итог показываем с суммы, а не с хвоста карточки: кнопка записи и так закреплена внизу.
    const card = this.result && !this.resultAnchored
      ? root.querySelector<HTMLElement>('.calc-result')
      : null;
    if (card) {
      this.resultAnchored = true;
      root.scrollTop += card.getBoundingClientRect().top - root.getBoundingClientRect().top - 12;
      return;
    }
    root.scrollTop = root.scrollHeight;
  }

  private readonly onViewportChange = (): void => {
    if (this.pinFrame) {
      return;
    }
    this.pinFrame = requestAnimationFrame(() => {
      this.pinFrame = 0;
      this.pinStage();
    });
  };

  private mountStage(): void {
    this.homeMark = liftStageToBody(this.host.nativeElement, this.document, this.homeMark);
    this.unlockScroll ??= lockPageScroll(this.document);
    this.pinStage();
    // preventScroll обязателен: панель в этот момент за краем (translateX(100%)), и обычный
    // focus() прокручивает хост с overflow:hidden так, чтобы её показать. Выезд тогда
    // гасится прокруткой, а на композиторе это видно как дрожание.
    queueMicrotask(() => this.panel?.nativeElement?.focus({ preventScroll: true }));
  }

  private pinStage(): void {
    pinCalculatorStage(this.host.nativeElement, this.document);
  }

  private requestId(): string {
    if (isPlatformBrowser(this.platformId) && typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return '00000000-0000-4000-8000-000000000000';
  }

  private storageKey(id: string): string {
    return `ow-calc-quote:${id}`;
  }

  private readStored(id: string): StoredQuote | null {
    try {
      const raw = localStorage.getItem(this.storageKey(id));
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw) as StoredQuote;
      if (!parsed?.quoteId || !parsed?.token) {
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }

  private writeStored(id: string, value: StoredQuote): void {
    try {
      localStorage.setItem(this.storageKey(id), JSON.stringify(value));
    } catch {
      return;
    }
  }

  private clearStored(id: string): void {
    try {
      localStorage.removeItem(this.storageKey(id));
    } catch {
      return;
    }
  }
}
