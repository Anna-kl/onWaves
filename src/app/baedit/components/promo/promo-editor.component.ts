import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, catchError, firstValueFrom, forkJoin, of, takeUntil } from 'rxjs';
import { IViewBusinessProfile } from '../../../DTO/views/business/IViewBussinessProfile';
import { IViewLanding } from '../../../DTO/views/landing/IViewLanding';
import { ILandingOffer } from '../../../DTO/views/landing/ILandingOffer';
import { ILandingBenefit } from '../../../DTO/views/landing/ILandingBenefit';
import { IPromoAction } from '../../../DTO/views/landing/IPromoAction';
import { IPromoMedia } from '../../../DTO/views/landing/IPromoMedia';
import { BenefitIconType } from '../../../DTO/enums/benefitIconType';
import { LandingTemplateType } from '../../../DTO/enums/landingTemplateType';
import { PromoActionKind } from '../../../DTO/enums/promoActionKind';
import { PromoActionRole } from '../../../DTO/enums/promoActionRole';
import { PromoCalcUnit } from '../../../DTO/enums/promoCalcUnit';
import { PromoMediaKind } from '../../../DTO/enums/promoMediaKind';
import { selectProfileMainClient } from '../../../ngrx-store/mainClient/store.select';
import { LandingService } from '../../../../services/landing.service';
import { CalculatorService } from '../../../../services/calculator.service';
import { GroupService } from '../../../../services/groupservice';
import { ToastService } from '../../../../services/toast.service';
import { Service } from '../../../DTO/classes/services/Service';
import { IPrice } from '../../../DTO/views/services/IPrice';
import { PromoDraftService } from '../../services/promo-draft.service';
import { ChooseAlbumComponent } from '../modals/choose-album/choose-album.component';
import { IViewImage } from '../../../DTO/views/images/IViewImage';
import { isMediaVideoType, normalizeImageMedia } from '../../../../helpers/common/media.helpers';
import {
  BENEFIT_ICON_OPTIONS,
  PromoTemplateDef,
  getPromoTemplate,
  templateFromOfferType,
} from './promo-templates';
import {
  calcUnitLabel,
  coverMedia,
  defaultActions,
  defaultCalculator,
  extraMedia,
  offerActions,
  offerMedia,
  offerPriceText,
} from '../../../profile-ba/helpers/promo-offer';
import { ICalculatorConnection } from '../../../DTO/views/calculator/ICalculator';

const MAX_MEDIA = 4;

@Component({
  selector: 'app-promo-editor',
  templateUrl: './promo-editor.component.html',
  styleUrls: ['./promo-editor.component.scss'],
})
export class PromoEditorComponent implements OnInit, OnDestroy {
  profile: IViewBusinessProfile | null = null;
  landing: IViewLanding | null = null;
  template!: PromoTemplateDef;
  offer!: ILandingOffer;
  badgeText = '';
  validTo = '';
  services: Service[] = [];
  graphs: ICalculatorConnection[] = [];
  isLoading = true;
  isSaving = false;
  isNew = true;
  imageBusy = false;

  readonly icons = BENEFIT_ICON_OPTIONS;
  readonly kinds = PromoActionKind;
  readonly units = PromoCalcUnit;
  readonly mediaKind = PromoMediaKind;
  readonly maxMedia = MAX_MEDIA;

  private booted = false;
  private readonly destroy$ = new Subject<void>();
  private readonly prices = new Map<string, IPrice>();

  constructor(
    private readonly store$: Store,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly landingService: LandingService,
    private readonly calculatorService: CalculatorService,
    private readonly groupService: GroupService,
    private readonly draft: PromoDraftService,
    private readonly toast: ToastService,
    private readonly modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.store$.pipe(select(selectProfileMainClient), takeUntil(this.destroy$)).subscribe(profile => {
      if (!profile?.id) {
        return;
      }
      this.profile = profile;
      if (!this.booted) {
        this.booted = true;
        this.bootstrap(profile.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.persistDraft();
    this.destroy$.next();
    this.destroy$.complete();
  }

  get actions(): IPromoAction[] {
    return this.offer?.actions ?? [];
  }

  get media(): IPromoMedia[] {
    return this.offer?.media ?? [];
  }

  get cover(): IPromoMedia | null {
    return this.offer ? coverMedia(this.offer) : null;
  }

  get extras(): IPromoMedia[] {
    return this.offer ? extraMedia(this.offer) : [];
  }

  get canSave(): boolean {
    return !this.saveBlockReason && !this.isSaving;
  }

  /** Почему серая «Опубликовать» — иначе мастер не видит, какого поля не хватает. */
  get saveBlockReason(): string | null {
    if (!this.offer?.title?.trim()) {
      return 'Нужен заголовок';
    }
    const actions = this.actions;
    const primary = actions.find(item => item.role === PromoActionRole.Primary) ?? actions[0];
    if (!primary?.text?.trim()) {
      return 'Напишите текст главной кнопки';
    }
    if (actions.some(item => item.kind === PromoActionKind.Booking && !item.serviceId)) {
      return 'У кнопки записи выберите услугу';
    }
    if (this.hasCalculator && this.graphs.length && !this.usesGraphCalculator) {
      return 'Выберите калькулятор';
    }
    if (this.template.fields.discount && !Number(this.offer.discountPercent)) {
      return 'Укажите скидку в процентах';
    }
    if (this.template.type === LandingTemplateType.Campaign && !this.validTo) {
      return 'Укажите дату окончания акции';
    }
    return null;
  }

  get previewPrice(): string | null {
    return this.offer ? offerPriceText(this.offer, this.prices, this.offer.calculator) : null;
  }

  get canAddAction(): boolean {
    return this.actions.length < 2;
  }

  get hasCalculator(): boolean {
    return this.actions.some(item => item.kind === PromoActionKind.Calculator);
  }

  get usesGraphCalculator(): boolean {
    return this.actions.some(item => item.kind === PromoActionKind.Calculator && !!item.profileCalculatorId);
  }

  get needsValidTo(): boolean {
    return this.template.type === LandingTemplateType.Campaign;
  }

  back(): void {
    this.persistDraft();
    this.goToPromo(this.isNew ? ['template'] : []);
  }

  addAction(): void {
    if (!this.canAddAction) {
      return;
    }
    const used = new Set(this.actions.map(item => item.kind));
    const kind = used.has(PromoActionKind.Booking) ? PromoActionKind.Calculator : PromoActionKind.Booking;
    this.offer.actions = [
      ...this.actions,
      {
        role: PromoActionRole.Secondary,
        kind,
        text: kind === PromoActionKind.Calculator ? 'Рассчитать стоимость' : 'Записаться',
        serviceId: null,
        profileCalculatorId: kind === PromoActionKind.Calculator ? this.defaultGraphId() : null,
      },
    ];
    this.bindCalculatorActions();
  }

  removeAction(index: number): void {
    if (index === 0) {
      return;
    }
    this.offer.actions = this.actions.filter((_, i) => i !== index);
    this.bindCalculatorActions();
  }

  onKindChange(action: IPromoAction): void {
    const other = this.actions.find(item => item !== action);
    if (other && other.kind === action.kind) {
      other.kind = action.kind === PromoActionKind.Booking ? PromoActionKind.Calculator : PromoActionKind.Booking;
    }
    if (action.kind === PromoActionKind.Calculator && !action.text?.trim()) {
      action.text = 'Рассчитать стоимость';
    }
    this.bindCalculatorActions();
  }

  onGraphChange(): void {
    this.bindCalculatorActions();
  }

  onUnitChange(): void {
    if (!this.offer?.calculator) {
      return;
    }
    this.offer.calculator.unitLabel = calcUnitLabel(this.offer.calculator.unit);
  }

  onServiceChange(action: IPromoAction): void {
    if (action.kind !== PromoActionKind.Booking) {
      return;
    }
    const service = this.services.find(item => item.id === action.serviceId);
    this.offer.serviceId = action.serviceId ?? null;
    this.offer.serviceName = service?.name ?? '';
    if (action.role === PromoActionRole.Primary) {
      this.offer.buttonText = action.text;
    }
  }

  addBenefit(): void {
    if (this.offer.benefits.length >= this.template.fields.benefits) {
      return;
    }
    this.offer.benefits = [
      ...this.offer.benefits,
      { iconType: BenefitIconType.Check, title: '', description: '', sortOrder: this.offer.benefits.length },
    ];
  }

  removeBenefit(index: number): void {
    this.offer.benefits = this.offer.benefits.filter((_, i) => i !== index);
  }

  setIcon(benefit: ILandingBenefit, iconType: BenefitIconType): void {
    benefit.iconType = iconType;
  }

  async onCoverSelected(event: Event): Promise<void> {
    const file = this.fileFrom(event);
    if (!file) {
      return;
    }
    this.imageBusy = true;
    try {
      this.offer.imageUrl = await this.uploadPromoPhoto(file);
    } catch {
      this.toast.add({ severity: 'error', summary: 'Фото', detail: 'Не удалось загрузить изображение' });
    } finally {
      this.imageBusy = false;
    }
  }

  clearCover(): void {
    if (this.offer.imageUrl) {
      this.offer.imageUrl = null;
      return;
    }
    const cover = this.cover;
    if (cover) {
      this.offer.media = this.media.filter(item => item.url !== cover.url);
    }
  }

  pickCoverFromGallery(): void {
    this.openGallery(1).then(images => {
      const item = this.toPromoMedia(images[0]);
      if (!item) {
        return;
      }
      if (item.kind === PromoMediaKind.Image) {
        this.offer.imageUrl = item.url;
        return;
      }
      this.offer.imageUrl = null;
      this.offer.media = [item, ...this.media.filter(media => media.url !== item.url)].slice(0, MAX_MEDIA);
    });
  }

  pickFromGallery(): void {
    const remaining = MAX_MEDIA - this.media.length;
    if (remaining <= 0) {
      return;
    }
    this.openGallery(remaining).then(images => {
      const added = images.map(image => this.toPromoMedia(image)).filter((item): item is IPromoMedia => !!item);
      const seen = new Set(this.media.map(item => item.url));
      this.offer.media = [
        ...this.media,
        ...added.filter(item => {
          if (seen.has(item.url)) {
            return false;
          }
          seen.add(item.url);
          return true;
        }),
      ].slice(0, MAX_MEDIA);
    });
  }

  clearMedia(index: number): void {
    const extra = this.extras[index];
    if (!extra) {
      return;
    }
    this.offer.media = this.media.filter(item => item.url !== extra.url);
  }

  save(): void {
    if (!this.canSave || !this.profile?.id) {
      return;
    }
    const landing = this.buildLanding();
    this.isSaving = true;
    const request = this.landing
      ? this.landingService.updateLanding(this.profile.id, landing)
      : this.landingService.createLanding(this.profile.id, landing);

    request.subscribe({
      next: res => {
        this.isSaving = false;
        if (res.code === 200 || res.code === 201) {
          this.draft.clear(this.profile!.id!);
          this.toast.add({ severity: 'success', summary: 'Опубликовано', detail: 'Карточка появится на странице' });
          this.goToPromo();
        } else {
          this.toast.add({ severity: 'error', summary: 'Не удалось сохранить', detail: res.message || 'Попробуйте ещё раз' });
        }
      },
      error: () => {
        this.isSaving = false;
        this.toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Карточка не сохранилась' });
      },
    });
  }

  private bootstrap(profileId: string): void {
    forkJoin({
      landing: this.landingService.getLanding(profileId),
      services: this.groupService.getAllServices(profileId).pipe(
        catchError(() => of([] as Service[]))
      ),
      graphs: this.calculatorService.getByProfile(profileId).pipe(
        catchError(() => of([] as ICalculatorConnection[]))
      ),
    }).pipe(takeUntil(this.destroy$)).subscribe(({ landing, services, graphs }) => {
      this.graphs = graphs;
      this.services = services as Service[];
      this.prices.clear();
      for (const service of this.services) {
        if (service.id && service.price) {
          this.prices.set(service.id, service.price);
        }
      }
    this.landing = landing.ok ? landing.landing : null;
      const routeOfferId = this.route.snapshot.paramMap.get('offerId');
      const stored = this.draft.read(profileId);
      if (routeOfferId && this.landing) {
        const existing = this.landing.offers.find(item => item.id === routeOfferId);
        if (existing) {
          this.isNew = false;
          this.offer = this.hydrate(existing);
          const type = this.draft.templateType
            ?? this.offer.templateType
            ?? this.landing.templateType
            ?? templateFromOfferType(existing.offerType);
          this.template = getPromoTemplate(type);
          this.badgeText = this.offer.badge ?? this.landing.promoBadgeText ?? this.template.defaultBadge;
          this.validTo = toDateInput(this.offer.validTo);
          this.attachDefaultServices();
          this.isLoading = false;
          return;
        }
      }
      // /promo/edit без :offerId — только черновик новой карточки, не соседняя акция.
      const wantedType = this.draft.templateType ?? stored?.templateType;
      if (!routeOfferId && stored?.offer && !stored.offerId && stored.templateType != null
        && (wantedType == null || stored.templateType === wantedType)) {
        this.template = getPromoTemplate(stored.templateType);
        this.offer = this.hydrate({ ...stored.offer, id: undefined });
        this.badgeText = stored.badgeText || this.template.defaultBadge;
        this.validTo = toDateInput(this.offer.validTo);
        this.isNew = true;
        this.attachDefaultServices();
        this.isLoading = false;
        return;
      }
      this.startNew();
    });
  }

  private startNew(): void {
    if (this.draft.templateType == null) {
      this.goToPromo(['template']);
      return;
    }
    this.isNew = true;
    this.template = getPromoTemplate(this.draft.templateType);
    this.badgeText = this.template.defaultBadge;
    this.offer = this.emptyOffer();
    this.attachDefaultServices();
    this.isLoading = false;
  }

  private emptyOffer(): ILandingOffer {
    const defaults = this.template.defaultOffer;
    return {
      offerType: this.template.offerType,
      templateType: this.template.type,
      badge: this.badgeText,
      title: defaults.title,
      titleBold: defaults.titleBold,
      description: defaults.description,
      buttonText: defaults.buttonText,
      footerNote: defaults.footerNote,
      discountPercent: defaults.discountPercent,
      serviceId: null,
      serviceName: '',
      imageUrl: null,
      galleryUrls: [],
      actions: defaultActions(this.template.type),
      media: [],
      calculator: this.template.type === LandingTemplateType.Campaign ? defaultCalculator() : null,
      slogan: this.template.defaultSlogan ?? null,
      isActive: true,
      sortOrder: (this.landing?.offers?.length ?? 0),
      benefits: defaults.benefits.map(item => ({ ...item })),
    };
  }

  private hydrate(offer: ILandingOffer): ILandingOffer {
    const type = offer.templateType ?? this.draft.templateType ?? this.landing?.templateType ?? LandingTemplateType.Classic;
    const actions = offerActions({ ...offer, actions: offer.actions });
    return {
      ...offer,
      templateType: type,
      benefits: [...(offer.benefits ?? [])],
      galleryUrls: [...(offer.galleryUrls ?? [])],
      actions: actions.length ? actions : defaultActions(type),
      media: offerMedia(offer),
      calculator: offer.calculator ?? (actions.some(item => item.kind === PromoActionKind.Calculator) ? defaultCalculator() : null),
    };
  }

  private ensureCalculator(): void {
    if (!this.actions.some(item => item.kind === PromoActionKind.Calculator)) {
      this.offer.calculator = null;
      return;
    }
    if (this.usesGraphCalculator) {
      this.offer.calculator = null;
      return;
    }
    const current = this.offer.calculator ?? defaultCalculator();
    this.offer.calculator = {
      ...current,
      unitLabel: current.unitLabel || calcUnitLabel(current.unit),
    };
  }

  /** Калькулятор графа берёт весь прайс — serviceId у кнопки расчёта не храним. */
  private bindCalculatorActions(): void {
    const graphId = this.defaultGraphId();
    const first = this.services[0];
    for (const action of this.actions) {
      if (action.kind === PromoActionKind.Calculator) {
        action.serviceId = null;
        const known = action.profileCalculatorId
          && this.graphs.some(item => item.profileCalculatorId === action.profileCalculatorId);
        if (!known) {
          action.profileCalculatorId = graphId;
        }
        continue;
      }
      action.profileCalculatorId = null;
      if (!action.serviceId && first?.id) {
        action.serviceId = first.id;
      }
    }
    this.syncOfferBookingService();
    this.ensureCalculator();
  }

  private defaultGraphId(): string | null {
    return this.graphs[0]?.profileCalculatorId ?? null;
  }

  private syncOfferBookingService(): void {
    const booking = this.actions.find(item => item.kind === PromoActionKind.Booking);
    if (!booking) {
      return;
    }
    const service = this.services.find(item => item.id === booking.serviceId);
    this.offer.serviceId = booking.serviceId ?? null;
    this.offer.serviceName = service?.name ?? '';
  }

  private attachDefaultServices(): void {
    this.bindCalculatorActions();
  }

  private buildLanding(): Partial<IViewLanding> {
    const badge = this.badgeText.trim();
    const editedId = this.offer.id;
    const others = (this.landing?.offers ?? []).filter(item => !editedId || item.id !== editedId);
    const actions = this.actions.map((item, index) => ({
      ...item,
      role: index === 0 ? PromoActionRole.Primary : PromoActionRole.Secondary,
      text: item.text.trim().slice(0, 24),
      serviceId: item.kind === PromoActionKind.Calculator ? null : item.serviceId,
      profileCalculatorId: item.kind === PromoActionKind.Calculator
        ? (item.profileCalculatorId || this.defaultGraphId())
        : null,
    }));
    const primary = actions[0];
    const calcAction = actions.find(item => item.kind === PromoActionKind.Calculator);
    const calculator = calcAction && !calcAction.profileCalculatorId
      ? {
          ...(this.offer.calculator ?? defaultCalculator()),
          unitLabel: this.offer.calculator?.unitLabel || calcUnitLabel(this.offer.calculator?.unit ?? PromoCalcUnit.M2),
        }
      : null;
    const offer: ILandingOffer = {
      ...this.offer,
      templateType: this.template.type,
      badge,
      slogan: this.template.fields.photoCaption ? (this.offer.slogan ?? '').trim() || null : badge,
      buttonText: primary?.text ?? this.offer.buttonText,
      serviceId: actions.find(item => item.kind === PromoActionKind.Booking)?.serviceId ?? primary?.serviceId ?? null,
      actions,
      media: this.media,
      galleryUrls: this.media.filter(item => item.kind === PromoMediaKind.Image).map(item => item.url),
      calculator,
      validTo: this.validTo ? new Date(`${this.validTo}T23:59:59`).toISOString() : null,
      benefits: this.offer.benefits
        .filter(item => item.title.trim())
        .map((item, index) => ({ ...item, sortOrder: index })),
    };
    const { masterName, avatar, ...current } = (this.landing ?? {}) as Partial<IViewLanding>;
    return {
      ...current,
      id: this.landing?.id,
      templateType: this.landing?.templateType ?? this.template.type,
      isActive: this.landing?.isActive ?? true,
      promoBadgeText: badge,
      offers: [...others, offer],
    };
  }

  private persistDraft(): void {
    if (!this.profile?.id || !this.offer || this.isLoading) {
      return;
    }
    const offer = this.isNew ? { ...this.offer, id: undefined } : this.offer;
    this.draft.write(this.profile.id, {
      templateType: this.template?.type ?? this.draft.templateType,
      offerId: this.isNew ? null : (this.offer.id ?? null),
      badgeText: this.badgeText,
      offer,
    });
  }

  private goToPromo(child: string[] = []): void {
    const profileLink = this.route.snapshot.pathFromRoot
      .map(item => item.paramMap.get('id'))
      .find(id => !!id);
    if (!profileLink) {
      return;
    }
    this.router.navigate(['/ba-edit', profileLink, 'promo', ...child]);
  }

  private async uploadPromoPhoto(file: File): Promise<string> {
    if (!this.profile?.id) {
      throw new Error('no profile');
    }
    const jpeg = await compressPromoImageToFile(file);
    const res = await firstValueFrom(this.landingService.uploadImage(this.profile.id, jpeg));
    const url = typeof res.data === 'string' && res.data ? res.data : res.message;
    if ((res.code !== 200 && res.code !== 201) || !url) {
      throw new Error(res.message || 'upload failed');
    }
    return url;
  }

  private fileFrom(event: Event): File | null {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    input.value = '';
    if (!file) {
      return null;
    }
    if (file.type.startsWith('video/')) {
      this.toast.add({
        severity: 'info',
        summary: 'Ролик',
        detail: 'Видео добавьте из галереи — сначала загрузите его в альбом',
      });
      return null;
    }
    if (!file.type.startsWith('image/')) {
      return null;
    }
    return file;
  }

  private openGallery(maxCount: number): Promise<IViewImage[]> {
    if (!this.profile?.id || maxCount <= 0) {
      return Promise.resolve([]);
    }
    const ref = this.modal.open(ChooseAlbumComponent, {
      scrollable: true,
      windowClass: 'choose-album-modal',
    });
    ref.componentInstance.profileId = this.profile.id;
    ref.componentInstance.maxCount = maxCount;
    return ref.result.then(
      (picked: { images?: IViewImage[] } | IViewImage[] | null) => {
        if (!picked) {
          return [];
        }
        return Array.isArray(picked) ? picked : (picked.images ?? []);
      },
      () => [] as IViewImage[],
    );
  }

  private toPromoMedia(image?: IViewImage | null): IPromoMedia | null {
    if (!image) {
      return null;
    }
    const media = normalizeImageMedia(image);
    const url = media.mediaUrl || image.url;
    if (!url) {
      return null;
    }
    const video = isMediaVideoType(image.typeImage);
    return {
      url,
      kind: video ? PromoMediaKind.Video : PromoMediaKind.Image,
      posterUrl: video ? (media.previewUrl || null) : null,
    };
  }
}

function toDateInput(value?: string | null): string {
  if (!value) {
    return '';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  return date.toISOString().slice(0, 10);
}

function compressPromoImageToFile(file: File, maxSize = 1280, quality = 0.8): Promise<File> {
  return compressPromoImage(file, maxSize, quality).then(dataUrl => {
    const [header, data] = dataUrl.split(',');
    const mime = /data:(.*?);/.exec(header)?.[1] ?? 'image/jpeg';
    const binary = atob(data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new File([bytes], 'promo.jpg', { type: mime });
  });
}

function compressPromoImage(file: File, maxSize = 1280, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('read'));
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('canvas'));
          return;
        }
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      image.onerror = () => reject(new Error('image'));
      image.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
