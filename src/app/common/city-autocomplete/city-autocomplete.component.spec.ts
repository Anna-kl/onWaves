import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';

import {CityAutocompleteComponent} from './city-autocomplete.component';

describe('CityAutocompleteComponent', () => {
  let component: CityAutocompleteComponent;
  let fixture: ComponentFixture<CityAutocompleteComponent>;

  const CITIES = [
    'Казань', 'Кашира', 'Краснослободск', 'Маркс', 'Орлов',
    'Ступино', 'Озёры', 'Каширский', 'Новокаширск',
  ];

  /** Ввод + ожидание debounce (в тестах он обнулён). */
  async function type(value: string): Promise<void> {
    component.onInput(value);
    await new Promise(resolve => setTimeout(resolve, 5));
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [CityAutocompleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CityAutocompleteComponent);
    component = fixture.componentInstance;
    component.debounceMs = 0;
    component.cities = CITIES;
    component.ngOnChanges({
      cities: {currentValue: CITIES, previousValue: [], firstChange: true, isFirstChange: () => true},
    });
    fixture.detectChanges();
  });

  it('не открывает список, пока введён один символ', async () => {
    await type('К');
    expect(component.isOpen).toBeFalse();
    expect(component.suggestions.length).toBe(0);
    expect(fixture.nativeElement.querySelectorAll('li').length).toBe(0);
  });

  it('точное совпадение показывает первым', async () => {
    await type('Кашира');
    expect(component.suggestions[0]).toBe('Кашира');
  });

  it('сначала совпадения по началу строки, потом по вхождению', async () => {
    await type('каш');
    expect(component.suggestions).toEqual(['Кашира', 'Каширский', 'Новокаширск']);
  });

  it('игнорирует регистр', async () => {
    await type('СТУП');
    expect(component.suggestions).toEqual(['Ступино']);
  });

  it('приводит ё к е', async () => {
    await type('Озер');
    expect(component.suggestions).toEqual(['Озёры']);
  });

  it('обрезает крайние пробелы', async () => {
    await type('  кашир  ');
    expect(component.suggestions).toEqual(['Кашира', 'Каширский', 'Новокаширск']);
  });

  it('показывает «Города не найдены» при отсутствии совпадений', async () => {
    await type('бессмысленный текст');
    expect(component.suggestions.length).toBe(0);
    expect(component.notFound).toBeTrue();
    expect(fixture.nativeElement.querySelector('.city-ac__empty').textContent).toContain('Города не найдены');
  });

  it('рендерит не больше maxItems опций', async () => {
    component.maxItems = 2;
    await type('ка');
    expect(component.suggestions.length).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('.city-ac__option').length).toBe(2);
  });

  it('закрывает список и отдаёт выбранный город наверх', async () => {
    const selected: (string | null)[] = [];
    component.valueChange.subscribe(v => selected.push(v));

    await type('каш');
    component.select(component.suggestions[0]);
    fixture.detectChanges();

    expect(selected).toEqual(['Кашира']);
    expect(component.query).toBe('Кашира');
    expect(component.isOpen).toBeFalse();
    expect(fixture.nativeElement.querySelector('.city-ac__list')).toBeNull();
  });

  it('стрелки двигают активный вариант, Enter выбирает', async () => {
    const selected: (string | null)[] = [];
    component.valueChange.subscribe(v => selected.push(v));

    await type('каш');
    component.onKeydown(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
    component.onKeydown(new KeyboardEvent('keydown', {key: 'Enter'}));

    expect(selected).toEqual(['Каширский']);
  });

  it('Escape закрывает список и возвращает выбранное значение в поле', async () => {
    await type('каш');
    component.select('Кашира');
    await type('Ступ');
    component.onKeydown(new KeyboardEvent('keydown', {key: 'Escape'}));

    expect(component.isOpen).toBeFalse();
    expect(component.query).toBe('Кашира');
  });

  it('очистка поля сбрасывает выбранный город', async () => {
    const selected: (string | null)[] = [];
    await type('каш');
    component.select('Кашира');
    component.valueChange.subscribe(v => selected.push(v));

    await type('');
    component.onBlur();

    expect(selected).toEqual([null]);
    expect(component.query).toBe('');
  });

  it('проставляет ARIA-атрибуты комбобокса', async () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('.city-ac__input');
    expect(input.getAttribute('role')).toBe('combobox');
    expect(input.getAttribute('aria-autocomplete')).toBe('list');
    expect(input.getAttribute('aria-expanded')).toBe('false');

    await type('каш');

    const list: HTMLElement = fixture.nativeElement.querySelector('.city-ac__list');
    expect(input.getAttribute('aria-expanded')).toBe('true');
    expect(input.getAttribute('aria-controls')).toBe(list.id);
    expect(input.getAttribute('aria-activedescendant')).toBe(component.optionId(0));
    expect(list.getAttribute('role')).toBe('listbox');

    const options: HTMLElement[] = Array.from(fixture.nativeElement.querySelectorAll('.city-ac__option'));
    expect(options.every(o => o.getAttribute('role') === 'option')).toBeTrue();
    expect(options[0].getAttribute('aria-selected')).toBe('true');
    expect(options[1].getAttribute('aria-selected')).toBe('false');
  });
});
