import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Service } from '../../../DTO/classes/services/Service';
import { IPrice } from '../../../DTO/views/services/IPrice';
import { displayPriceUnit, formatPriceAmount } from '../../../../helpers/common/price.helpers';
import { CurrencyType } from '../../../DTO/enums/currencyType';
import { GroupService } from '../../../../services/groupservice';
import { getMediaTitle, isGeneratedMediaName, MediaCard } from '../../../../helpers/common/media.helpers';
import { VideoPlaybackCoordinatorService } from '../../video-player/video-playback-coordinator.service';

@Component({
  selector: 'app-card-detail-modal',
  templateUrl: './card-detail-modal.component.html',
  styleUrls: ['./card-detail-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardDetailModalComponent implements OnInit, OnDestroy {
  @Input() card!: MediaCard;
  @Input() profileId!: string;
  @Input() linkedServices: Service[] = [];
  @Input() canBook: boolean = false;
  @Input() canBook$?: Observable<boolean>;

  @ViewChild('infoPanel') private infoPanelRef!: ElementRef<HTMLElement>;

  selectedIndex = -1;
  isLoading = false;

  /** Заголовок карточки: null, если в name лежит служебное имя файла. */
  get title(): string | null {
    return getMediaTitle(this.card?.name);
  }

  private swipeStartY = 0;
  private swipeDeltaY = 0;
  private isSwiping = false;

  private destroy$ = new Subject<void>();

  constructor(
    private activeModal: NgbActiveModal,
    private groupService: GroupService,
    private videoCoordinator: VideoPlaybackCoordinatorService
  ) {}

  ngOnInit(): void {
    this.videoCoordinator.pauseAll();
    this.canBook$?.pipe(takeUntil(this.destroy$)).subscribe(canBook => {
      this.canBook = canBook;
    });

    // Если услуги не переданы, загружаем их (fallback для случаев открытия модала другим способом)
    if (!this.linkedServices?.length && this.card.serviceIds?.length) {
      this.isLoading = true;

      this.groupService.getAllServices(this.profileId).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: services => {
          this.linkedServices = services.filter(s =>
            s.id && this.card.serviceIds?.includes(s.id)
          );
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Failed to load linked services:', error);
          this.isLoading = false;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  close(): void {
    this.activeModal.close();
  }

  book(): void {
    if (this.selectedIndex < 0) return;
    this.activeModal.close({ action: 'book', service: this.linkedServices[this.selectedIndex] });
  }

  onSwipeStart(event: TouchEvent): void {
    this.swipeStartY = event.touches[0].clientY;
    this.swipeDeltaY = 0;
    this.isSwiping = true;
    const panel = this.infoPanelRef?.nativeElement;
    if (panel) panel.style.transition = 'none';
  }

  onSwipeMove(event: TouchEvent): void {
    if (!this.isSwiping) return;
    const delta = event.touches[0].clientY - this.swipeStartY;
    if (delta > 0) {
      this.swipeDeltaY = delta;
      const panel = this.infoPanelRef?.nativeElement;
      if (panel) panel.style.transform = `translateY(${delta}px)`;
      event.preventDefault();
    }
  }

  onSwipeEnd(): void {
    if (!this.isSwiping) return;
    this.isSwiping = false;
    const panel = this.infoPanelRef?.nativeElement;
    if (!panel) return;
    panel.style.transition = 'transform 0.3s ease';
    if (this.swipeDeltaY > 120) {
      panel.style.transform = 'translateY(100%)';
      setTimeout(() => this.close(), 300);
    } else {
      panel.style.transform = '';
    }
  }

  selectService(index: number): void {
    // Toggle: отмена выбора при повторном клике, иначе выбор новой услуги
    this.selectedIndex = this.selectedIndex === index ? -1 : index;
  }

  get mainService(): Service | null {
    return this.selectedIndex >= 0 ? this.linkedServices[this.selectedIndex] ?? null : null;
  }

  formatPrice(price: IPrice): string {
    if (!price) return '';
    return formatPriceAmount(price, this.currencySymbol(price.currencyType));
  }

  formatPriceUnit(svc: Service): string {
    return displayPriceUnit(svc?.price, svc?.paymentForType);
  }

  formatDuration(minutes?: number | null): string {
    if (!minutes || minutes <= 0) return '';
    if (minutes < 60) return `${Math.round(minutes)} мин`;
    const h = minutes / 60;
    const hours = Number.isInteger(h) ? h : h.toFixed(1).replace('.', ',');
    return `${hours} ч`;
  }

  /** @deprecated Используйте isGeneratedMediaName из media.helpers. Оставлено для шаблонов. */
  isUUID(text?: string): boolean {
    return isGeneratedMediaName(text);
  }

  private currencySymbol(type: CurrencyType): string {
    const m: Partial<Record<CurrencyType, string>> = {
      [CurrencyType.RUB]: '₽',
      [CurrencyType.USD]: '$',
      [CurrencyType.EUR]: '€',
      [CurrencyType.KZT]: '₸',
    };
    return m[type] ?? '₽';
  }
}
