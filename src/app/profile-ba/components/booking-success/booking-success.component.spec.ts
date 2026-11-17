import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookingSuccessComponent } from './booking-success.component';
import { BookingPrice } from '../../helpers/booking-price';
import { bookingSuccessDetails } from '../../helpers/booking-success';
import { WorkLocationType } from '../../../DTO/enums/workLocationType';

describe('Финальная карточка визита', () => {
  let fixture: ComponentFixture<BookingSuccessComponent>;
  const price: BookingPrice = { original: 7000, payable: 5100, coupon: 500, promo: 1400,
    pending: false, isFrom: false, notice: null, termsPath: '/mary/usloviya', seats: { limit: 5, left: 3 } };
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [BookingSuccessComponent, RouterTestingModule] });
    fixture = TestBed.createComponent(BookingSuccessComponent);
    fixture.componentInstance.details = bookingSuccessDetails('Перманент бровей', 'Светлана', '5 ноября 2026, 08:30',
      { locationType: WorkLocationType.Fixed, title: 'Студия', city: 'Озёры', street: 'Болотный переулок', house: '2' });
  });
  it('показывает услугу, мастера, время и точное место визита', () => {
    fixture.componentInstance.price = price;
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    for (const value of ['Перманент бровей', 'Светлана', '5 ноября 2026, 08:30', 'Болотный переулок', 'Место визита']) {
      expect(text).toContain(value);
    }
    expect(fixture.nativeElement.querySelector('.booking-price--benefit')).toBeTruthy();
    expect(text).toContain('Акция применена');
    expect(text).toContain('5 100');
  });
  it('обычная запись не обещает акцию и не получает её подсветку', () => {
    fixture.componentInstance.price = { ...price, original: 2000, payable: 2000, coupon: 0, promo: 0, seats: undefined, termsPath: null };
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.booking-price--benefit')).toBeNull();
    expect(fixture.nativeElement.textContent).not.toContain('Акция применена');
    expect(fixture.nativeElement.textContent).toContain('2 000');
  });
  it('не подставляет адрес мастера в выездную или онлайн-запись', () => {
    const mobile = bookingSuccessDetails('Услуга', '', '', { locationType: WorkLocationType.Mobile, city: 'Кашира', street: 'Садовая', house: '5' }, 'Адрес салона');
    expect(mobile.place).toContain('Садовая');
    expect(mobile.place).not.toContain('Адрес салона');
    const online = bookingSuccessDetails('Услуга', '', '', null, 'Адрес салона', WorkLocationType.Online);
    expect(online.place).toContain('Онлайн');
    expect(online.place).not.toContain('Адрес салона');
  });
  it('не придумывает дату для услуги без согласованного времени', () => {
    fixture.componentInstance.details = bookingSuccessDetails('Консультация', '', '', null);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Мастер согласует время визита');
    expect(fixture.nativeElement.textContent).toContain('Место визита уточнит мастер');
  });
  it('кнопка завершения передаёт закрытие родительскому окну', () => {
    const done = jasmine.createSpy('done');
    fixture.componentInstance.done.subscribe(done);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.booking-success__done').click();
    expect(done).toHaveBeenCalledTimes(1);
  });
});
