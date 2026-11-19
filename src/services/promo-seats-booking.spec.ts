import { HttpBackend, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { of, throwError } from 'rxjs';
import { PromoSeatsService } from './promo-seats.service';

describe('Проверка акции перед записью', () => {
  function service(response: any): PromoSeatsService {
    return new PromoSeatsService({ post: () => response } as unknown as HttpClient,
      { check: () => false } as unknown as CookieService, {} as HttpBackend);
  }
  it('не маскирует 500 как цену без акции', () => {
    service(throwError(() => new HttpErrorResponse({ status: 500 })))
      .quoteForBooking('master', ['service']).subscribe({
        next: () => fail('Технический сбой не является отсутствием акции'),
        error: error => expect(error).toBeTruthy(),
      });
  });
  it('считает 404 и пустой body ошибкой проверки цены', () => {
    for (const response of [of(null), throwError(() => new HttpErrorResponse({ status: 404 }))]) {
      service(response).quoteForBooking('master', ['service']).subscribe({
        next: () => fail('Ожидался DTO расчёта'), error: error => expect(error).toBeTruthy(),
      });
    }
  });
  it('не блокирует необязательный предпросмотр витрины при 500', () => {
    service(throwError(() => new HttpErrorResponse({ status: 500 })))
      .quote('master', ['service']).subscribe(value => expect(value).toBeNull());
  });
  it('передаёт успешный DTO с отсутствующей акцией без блокировки обычной записи', () => {
    const quote = { status: 'unavailable', reason: 'master_not_participating', payableAmount: 2200 };
    service(of(quote)).quoteForBooking('master', ['service']).subscribe(value => expect(value).toBe(quote as any));
  });
});
