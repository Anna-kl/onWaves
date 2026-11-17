import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { RecordService } from './record.service';
import { Record } from '../app/DTO/classes/records/record';

describe('Авторизация записи по акции без приветственного купона', () => {
  it('передаёт сессию для проверки права на место, даже если купон не используется', () => {
    const post = jasmine.createSpy('post').and.returnValue(of({ code: 201 }));
    const service = new RecordService({ post } as unknown as HttpClient,
      { check: () => true, get: () => 'test-token' } as unknown as CookieService);
    service.saveRecord('master', { usePromoSeat: true, useWelcomeCoupon: false } as Record).subscribe();
    expect(post.calls.mostRecent().args[2].headers.get('Authorization')).toBe('Bearer test-token');
  });
  it('не подставляет авторизацию гостю', () => {
    const post = jasmine.createSpy('post').and.returnValue(of({ code: 201 }));
    const service = new RecordService({ post } as unknown as HttpClient,
      { check: () => false } as unknown as CookieService);
    service.saveRecord('master', { usePromoSeat: true } as Record).subscribe();
    expect(post.calls.mostRecent().args[2].headers.has('Authorization')).toBeFalse();
  });
});
