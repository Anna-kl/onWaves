import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PromoParticipantsComponent } from './promo-participants.component';
import { PromoSeatsService } from '../../../../services/promo-seats.service';
import { PromoSeatReport } from '../../../DTO/views/promo/promo-seats';

describe('Участники акции и неявка', () => {
  let fixture: ComponentFixture<PromoParticipantsComponent>;
  let getReports: jasmine.Spy;
  let markAttendance: jasmine.Spy;
  const report: PromoSeatReport = {
    code: 'first-five', title: 'Первые пять', seatsLimit: 5, taken: 3, seatsLeft: 2,
    registered: 3, awaitingVisit: 3, attended: 0, noShows: 0, cancelled: 0,
    entries: [{ recordId: 'record', clientName: 'Анна', serviceName: 'Перманент бровей',
      registeredAt: '2026-10-20T10:00:00Z', visitAt: '2026-10-23T09:00:00Z', timeZone: 3,
      outcome: 'pending', canMarkAttendance: true, clientPays: 5100 }],
  };
  beforeEach(() => {
    getReports = jasmine.createSpy('getReports').and.returnValue(of([report]));
    markAttendance = jasmine.createSpy('markAttendance').and.returnValue(of({ code: 200 }));
    TestBed.configureTestingModule({ imports: [PromoParticipantsComponent], providers: [
      { provide: PromoSeatsService, useValue: { getReports, markAttendance } },
    ] });
    fixture = TestBed.createComponent(PromoParticipantsComponent);
    fixture.componentRef.setInput('masterId', 'master');
    fixture.detectChanges();
  });
  it('показывает серверный лимит и фактические счётчики', () => {
    expect(fixture.nativeElement.textContent).toContain('Для первых 5 записавшихся');
    expect(fixture.nativeElement.querySelector('.campaign__taken').textContent).toContain('3');
    expect(fixture.nativeElement.textContent).toContain('Нужна отметка явки');
  });
  it('подтверждает неявку отдельно и не прибавляет место локально', () => {
    fixture.nativeElement.querySelector('.participant__absent').click();
    fixture.detectChanges();
    expect(markAttendance).not.toHaveBeenCalled();
    getReports.and.returnValue(of([{ ...report, noShows: 1, awaitingVisit: 2,
      entries: [{ ...report.entries[0], outcome: 'no_show', canMarkAttendance: false }] }]));
    fixture.nativeElement.querySelector('.participant__confirm button').click();
    fixture.detectChanges();
    expect(markAttendance).toHaveBeenCalledOnceWith('master', 'record', false);
    expect(fixture.componentInstance.reports[0].taken).toBe(3);
    expect(fixture.componentInstance.reports[0].seatsLeft).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('Не пришёл · место учтено');
  });
  it('не принимает отметку, пока сервер не разрешил её по времени визита', () => {
    fixture.componentInstance.mark({ ...report.entries[0], canMarkAttendance: false }, false);
    expect(markAttendance).not.toHaveBeenCalled();
  });
  it('ошибка загрузки не выглядит как отсутствие участников', () => {
    getReports.and.returnValue(throwError(() => new Error('offline')));
    fixture.componentInstance.load();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('Не удалось загрузить');
    expect(fixture.nativeElement.querySelector('.participants__empty')).toBeNull();
  });
  it('конфликт на сервере показывается без локальной смены счётчика', () => {
    markAttendance.and.returnValue(of({ code: 409, message: 'Итог уже изменился' }));
    fixture.componentInstance.mark(report.entries[0], true);
    fixture.detectChanges();
    expect(fixture.componentInstance.reports[0].attended).toBe(0);
    expect(fixture.nativeElement.textContent).toContain('Итог уже изменился');
  });
});
