import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Subject, debounceTime, distinctUntilChanged, takeUntil} from 'rxjs';

/** Город + заранее посчитанная нормализованная форма (регистр и «ё» приведены). */
interface INormalizedCity {
  name: string;
  normalized: string;
}

/**
 * Комбобокс выбора города для справочника на ~1000+ значений.
 *
 * Почему свой компонент, а не ng-autocomplete: библиотека рендерила весь справочник
 * (1084 <li>) и фактически не фильтровала ввод. Здесь в DOM попадает максимум
 * `maxItems` строк, поиск идёт по нормализованному индексу и с debounce,
 * а разметка соответствует паттерну combobox + listbox (ARIA).
 *
 * Компонент презентационный: данные загружает родитель, выбранный город хранится
 * снаружи ([value] / (valueChange)), поэтому применение других фильтров его не сбрасывает.
 */
@Component({
  selector: 'app-city-autocomplete',
  templateUrl: './city-autocomplete.component.html',
  styleUrls: ['./city-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityAutocompleteComponent implements OnInit, OnChanges, OnDestroy {

  /** Полный справочник городов (строки, как их отдаёт dictionaries/address/cities). */
  @Input() cities: string[] = [];
  /** Выбранный город. Источник истины — родитель. */
  @Input() value: string | null = null;
  @Input() placeholder = 'Введите город';
  /** С какой длины запроса начинаем искать. */
  @Input() minChars = 2;
  /** Сколько подсказок максимум показываем (и рендерим в DOM). */
  @Input() maxItems = 10;
  @Input() debounceMs = 250;
  /** Базовый id — из него строятся id инпута, списка и опций (должен быть уникален на странице). */
  @Input() inputId = 'city-autocomplete';

  /** Город выбран (или очищен — тогда null). */
  @Output() valueChange = new EventEmitter<string | null>();

  /** Текст в поле — может не совпадать с value, пока пользователь печатает. */
  query = '';
  suggestions: string[] = [];
  isOpen = false;
  activeIndex = -1;
  /** Запрос достаточной длины, но совпадений нет. */
  notFound = false;

  @ViewChild('listbox') private listbox?: ElementRef<HTMLElement>;

  /** Нормализованный справочник — считается один раз на загрузку списка, а не на каждое нажатие. */
  private index: INormalizedCity[] = [];
  private readonly input$ = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.input$.pipe(
      debounceTime(this.debounceMs),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    ).subscribe(query => this.applyQuery(query));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cities']) {
      this.index = (this.cities ?? []).map(name => ({name, normalized: this.normalize(name)}));
    }
    // Родитель поменял выбранный город (в т.ч. восстановил из URL) — синхронизируем поле.
    if (changes['value'] && this.value !== this.query) {
      this.query = this.value ?? '';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get listboxId(): string {
    return `${this.inputId}-suggestions`;
  }

  optionId(index: number): string {
    return `${this.inputId}-option-${index}`;
  }

  trackByCity(_: number, city: string): string {
    return city;
  }

  onInput(raw: string): void {
    this.query = raw;
    if (this.normalize(raw).length < this.minChars) {
      // Меньше minChars (в т.ч. пустое поле) — список закрыт, справочник не рендерим.
      this.reset();
      return;
    }
    this.input$.next(raw);
  }

  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) {
          this.applyQuery(this.query);
          return;
        }
        this.moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen) {
          this.moveActive(-1);
        }
        break;
      case 'Enter':
        if (this.isOpen && this.activeIndex >= 0) {
          event.preventDefault();
          this.select(this.suggestions[this.activeIndex]);
        }
        break;
      case 'Escape':
        if (this.isOpen) {
          event.preventDefault();
          this.query = this.value ?? '';
          this.reset();
        }
        break;
      // Tab не перехватываем: список закроется в (blur), фокус уйдёт дальше штатно.
    }
  }

  onBlur(): void {
    // Классическое поведение combobox: в поле остаётся только реально выбранный город.
    if (this.query.trim() === '') {
      if (this.value !== null) {
        this.value = null;
        this.valueChange.emit(null);
      }
    } else if (this.query !== this.value) {
      this.query = this.value ?? '';
    }
    this.reset();
  }

  select(city: string): void {
    this.value = city;
    this.query = city;
    this.valueChange.emit(city);
    this.reset();
  }

  clear(): void {
    this.query = '';
    if (this.value !== null) {
      this.value = null;
      this.valueChange.emit(null);
    }
    this.reset();
  }

  /**
   * Отбор и ранжирование: точное совпадение → начинается с запроса → содержит запрос,
   * внутри группы — по алфавиту. Не более maxItems значений.
   */
  private filterCities(search: string): string[] {
    const query = this.normalize(search);
    if (query.length < this.minChars) {
      return [];
    }

    return this.index
      .filter(item => item.normalized.includes(query))
      .sort((a, b) => {
        const aExact = a.normalized === query;
        const bExact = b.normalized === query;
        if (aExact !== bExact) {
          return aExact ? -1 : 1;
        }

        const aStarts = a.normalized.startsWith(query);
        const bStarts = b.normalized.startsWith(query);
        if (aStarts !== bStarts) {
          return aStarts ? -1 : 1;
        }

        return a.normalized.localeCompare(b.normalized, 'ru-RU');
      })
      .slice(0, this.maxItems)
      .map(item => item.name);
  }

  /** Регистр, «ё» → «е», крайние пробелы. */
  private normalize(value: string): string {
    return (value ?? '')
      .trim()
      .toLocaleLowerCase('ru-RU')
      .replace(/ё/g, 'е');
  }

  private applyQuery(raw: string): void {
    const found = this.filterCities(raw);
    if (this.normalize(raw).length < this.minChars) {
      this.reset();
      return;
    }
    this.suggestions = found;
    this.notFound = found.length === 0;
    this.isOpen = true;
    this.activeIndex = found.length ? 0 : -1;
    this._cdr.markForCheck();
  }

  private moveActive(step: number): void {
    if (!this.suggestions.length) {
      return;
    }
    const count = this.suggestions.length;
    this.activeIndex = (this.activeIndex + step + count) % count;
    this.scrollActiveIntoView();
    this._cdr.markForCheck();
  }

  private reset(): void {
    this.isOpen = false;
    this.suggestions = [];
    this.notFound = false;
    this.activeIndex = -1;
    this._cdr.markForCheck();
  }

  private scrollActiveIntoView(): void {
    const options = this.listbox?.nativeElement.querySelectorAll<HTMLElement>('.city-ac__option');
    options?.item(this.activeIndex)?.scrollIntoView({block: 'nearest'});
  }
}
