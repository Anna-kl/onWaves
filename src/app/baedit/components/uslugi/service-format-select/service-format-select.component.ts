import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { WorkLocationType } from 'src/app/DTO/enums/workLocationType';
import { IWorkLocation } from 'src/app/DTO/views/IWorkLocation';
import { fixedPointsOf, workLocationTypesOf } from 'src/helpers/common/address';
import { ProfileService } from 'src/services/profile.service';

/**
 * Radio-выбор формата оказания услуги. Варианты берутся из форматов работы профиля
 * (`GET profiles/{id}/work-location`) — показываем только реально настроенные.
 * Услуга оказывается ровно в одном формате.
 *
 * ProfileService берём корневой (без `providers`): именно там лежит кеш
 * work-location, который инвалидирует сохранение форматов в разделе «Контакты».
 * Со своим инстансом компонент имел отдельный кеш и не видел инвалидацию.
 */
@Component({
  selector: 'app-service-format-select',
  templateUrl: './service-format-select.component.html',
  styleUrls: ['./service-format-select.component.scss'],
})
export class ServiceFormatSelectComponent implements OnInit, OnChanges {
  @Input() profileId: string | null = null;
  /** Текущее значение (для редактирования услуги). */
  @Input() value: WorkLocationType | null = null;
  @Input() pointIds: string[] = [];
  /** Сохранение отклонено: ни один офис не отмечен. */
  @Input() invalid = false;
  @Input() allowDraft = false;
  @Output() valueChange = new EventEmitter<WorkLocationType | null>();
  @Output() pointIdsChange = new EventEmitter<string[]>();
  /** Сколько сохранённых точек можно выбрать. Одна подставляется сама. */
  @Output() pointChoiceCount = new EventEmitter<number>();

  protected readonly WorkLocationType = WorkLocationType;
  /** Форматы, реально настроенные у профиля (в порядке Fixed → Mobile → Online). */
  available: WorkLocationType[] = [];
  points: IWorkLocation[] = [];
  loading = true;
  /** Запрос форматов не удался — это НЕ то же самое, что «форматы не настроены». */
  loadFailed = false;

  private loadedFor: string | null = null;

  constructor(private _profile: ProfileService) {}

  ngOnInit(): void {
    this.load();
  }

  /** profileId может прийти позже первого рендера — тогда грузим форматы при его появлении. */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profileId'] && !changes['profileId'].firstChange) {
      this.load();
    }
  }

  private load(): void {
    if (!this.profileId) {
      this.loading = false;
      return;
    }
    if (this.loadedFor === this.profileId) return;
    this.loadedFor = this.profileId;
    this.loading = true;
    this.loadFailed = false;

    this._profile.getWorkLocation(this.profileId).subscribe({
      next: (res) => {
        // Нормализация терпит число, числовую строку, имя enum и PascalCase-ключ.
        this.available = res?.code === 200 ? workLocationTypesOf(res.data) : [];
        if ((res?.code === 200 || res?.code === 404) && this.allowDraft && !this.available.length) this.available = [WorkLocationType.Fixed, WorkLocationType.Mobile, WorkLocationType.Online];
        this.points = res?.code === 200 ? fixedPointsOf(res.data).filter(point => !!point.id) : [];
        this.pointChoiceCount.emit(this.points.length);
        this.keepKnownPoints();

        // Сбрасываем значение, если оно больше не поддерживается профилем.
        if (this.value != null && !this.available.includes(this.value)) {
          this.value = null;
          this.valueChange.emit(null);
        }
        // Единственный доступный формат — предвыбираем.
        if (this.value == null && this.available.length === 1) {
          this.select(this.available[0]);
        } else if (this.value === WorkLocationType.Fixed) {
          this.assignDefaultPoints();
        }
        this.loading = false;
      },
      error: () => {
        // Не выдаём сетевую ошибку за «настройте форматы в профиле» — иначе
        // пользователь уходит чинить настройки, с которыми всё в порядке.
        this.loadedFor = null;
        this.loadFailed = true;
        this.loading = false;
      }
    });
  }

  select(type: WorkLocationType): void {
    this.value = type;
    this.valueChange.emit(type);
    if (type === WorkLocationType.Fixed) {
      this.assignDefaultPoints();
      return;
    }
    if (this.pointIds.length) {
      this.pointIds = [];
      this.pointIdsChange.emit([]);
    }
  }

  pointOn(id: string | null | undefined): boolean {
    return !!id && this.pointIds.includes(id);
  }

  get selectedCount(): number {
    return this.points.filter(point => this.pointOn(point.id)).length;
  }

  pointTitle(point: IWorkLocation): string {
    const title = `${point.title ?? ''}`.trim();
    const city = `${point.city ?? ''}`.trim();
    return title || city || 'Адрес';
  }

  /** Улица без повтора города, если он уже в заголовке карточки. */
  pointAddress(point: IWorkLocation): string {
    const title = `${point.title ?? ''}`.trim();
    const city = `${point.city ?? ''}`.trim();
    const street = [point.street, point.house, point.apartment]
      .filter(part => !!part && `${part}`.trim().length > 0)
      .join(', ');
    const cityInTitle = !!city && title.toLowerCase() === city.toLowerCase();
    if (!title || cityInTitle) return street || (cityInTitle ? '' : city);
    return [city, street].filter(part => part.length > 0).join(', ');
  }

  togglePoint(id: string | null | undefined): void {
    if (!id || this.points.length < 2) return;
    this.pointIds = this.pointOn(id)
      ? this.pointIds.filter(item => item !== id)
      : [...this.pointIds, id];
    this.pointIdsChange.emit(this.pointIds);
  }

  private keepKnownPoints(): void {
    const allowed = new Set(this.points.map(point => point.id).filter((id): id is string => !!id));
    const next = this.pointIds.filter(id => allowed.has(id));
    if (next.length !== this.pointIds.length) {
      this.pointIds = next;
      this.pointIdsChange.emit(next);
    }
  }

  /**
   * Пустой список при нескольких офисах значит «во всех»: так услуга жила до явного выбора.
   * Уже отмеченные офисы не трогаем. Одна точка подставляется сама.
   */
  private assignDefaultPoints(): void {
    if (!this.points.length || this.pointIds.length) return;
    const ids = this.points.map(point => point.id).filter((id): id is string => !!id);
    if (!ids.length) return;
    this.pointIds = ids;
    this.pointIdsChange.emit(ids);
  }
}
