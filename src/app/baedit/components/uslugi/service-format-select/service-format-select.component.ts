import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { WorkLocationType } from 'src/app/DTO/enums/workLocationType';
import { workLocationTypesOf } from 'src/helpers/common/address';
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
  @Output() valueChange = new EventEmitter<WorkLocationType | null>();

  protected readonly WorkLocationType = WorkLocationType;
  /** Форматы, реально настроенные у профиля (в порядке Fixed → Mobile → Online). */
  available: WorkLocationType[] = [];
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

        // Сбрасываем значение, если оно больше не поддерживается профилем.
        if (this.value != null && !this.available.includes(this.value)) {
          this.value = null;
          this.valueChange.emit(null);
        }
        // Единственный доступный формат — предвыбираем.
        if (this.value == null && this.available.length === 1) {
          this.select(this.available[0]);
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
  }
}
