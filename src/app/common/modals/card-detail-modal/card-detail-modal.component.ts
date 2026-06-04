import { Component, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, forkJoin, of } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Service } from '../../../DTO/classes/services/Service';
import { IPrice } from '../../../DTO/views/services/IPrice';
import { CurrencyType } from '../../../DTO/enums/currencyType';
import { GroupService } from '../../../../services/groupservice';
import { MediaCard } from '../../../../helpers/common/media.helpers';

@Component({
  selector: 'app-card-detail-modal',
  templateUrl: './card-detail-modal.component.html',
  styleUrls: ['./card-detail-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardDetailModalComponent implements OnInit, OnDestroy {
  @Input() card!: MediaCard;
  @Input() profileId!: string;
  @Input() linkedServices: Service[] = [];  // Передаем услуги из родителя!

  selectedIndex = -1;
  isLoading = false;

  private destroy$ = new Subject<void>();

  constructor(
    private activeModal: NgbActiveModal,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    // Если услуги не переданы, загружаем их (fallback для случаев открытия модала другим способом)
    if (!this.linkedServices?.length && this.card.serviceIds?.length) {
      this.isLoading = true;

      this.groupService.getGroupServices(this.profileId).pipe(
        switchMap(groups => {
          if (!groups?.length) return of([]);
          const reqs = groups.filter(g => g.id).map(g => this.groupService.getService(g.id!));
          return reqs.length ? forkJoin(reqs) : of([]);
        }),
        map((results: Service[][]) => results.flat()),
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

  selectService(index: number): void {
    // Toggle: отмена выбора при повторном клике, иначе выбор новой услуги
    this.selectedIndex = this.selectedIndex === index ? -1 : index;
  }

  get mainService(): Service | null {
    return this.selectedIndex >= 0 ? this.linkedServices[this.selectedIndex] ?? null : null;
  }

  formatPrice(price: IPrice): string {
    if (!price) return '';
    const sym = this.currencySymbol(price.currencyType);
    const val = price.isRange ? price.startRange : price.price;
    if (val == null) return '';
    try {
      return `от ${val.toLocaleString('ru-RU')} ${sym}`;
    } catch {
      return `от ${val} ${sym}`;
    }
  }

  formatDuration(minutes?: number | null): string {
    if (!minutes || minutes <= 0) return '';
    if (minutes < 60) return `${Math.round(minutes)} мин`;
    const h = minutes / 60;
    const hours = Number.isInteger(h) ? h : h.toFixed(1).replace('.', ',');
    return `${hours} ч`;
  }

  isUUID(text?: string): boolean {
    if (!text) return false;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(\.(png|jpg|jpeg|gif|mp4|webm))?$/i;
    return uuidRegex.test(text);
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
