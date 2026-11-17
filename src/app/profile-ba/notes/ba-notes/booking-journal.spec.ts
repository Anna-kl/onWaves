import { CommonModule, Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subject } from 'rxjs';
import { ScheduleService } from '../../../../services/schedule.service';
import { RecordService } from '../../../../services/record.service';
import { ToastService } from '../../../../services/toast.service';
import { MessageNotificationService } from '../../../../services/notification.service';
import { IViewScheduleBA } from '../../../DTO/views/schedule/IViewScheduleBA';
import { NotesService } from '../notes-events.service';
import { BANotesComponent } from './ba-notes.component';

describe('Booking journal loading', () => {
  let fixture: ComponentFixture<BANotesComponent>;
  let notes: NotesService;
  let api: jasmine.SpyObj<ScheduleService>;
  let first: Subject<IViewScheduleBA[]>;
  const selectedDate = new Date(2099, 10, 18);
  const profile = { id: 'route-owned-profile', userType: 1, paymentMethods: [] };
  const free = { recordId: null, start: '2099-11-18T10:00:00Z', end: '2099-11-18T17:00:00Z', isBreak: true } as unknown as IViewScheduleBA;

  beforeEach(async () => {
    first = new Subject<IViewScheduleBA[]>();
    api = jasmine.createSpyObj<ScheduleService>('schedule', ['getProfileScheduleBA', 'getProfileScheduleCanceledBA']);
    api.getProfileScheduleBA.and.returnValue(first);
    api.getProfileScheduleCanceledBA.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      declarations: [BANotesComponent],
      imports: [CommonModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        NotesService,
        { provide: ActivatedRoute, useValue: { parent: { data: of({ notesProfile: profile }) } } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: Location, useValue: { getState: () => ({}) } },
        { provide: ToastService, useValue: { add: jasmine.createSpy('add') } },
        { provide: NgbModal, useValue: {} },
        { provide: MessageNotificationService, useValue: {} },
      ],
    }).overrideComponent(BANotesComponent, { set: { providers: [
      { provide: ScheduleService, useValue: api }, { provide: RecordService, useValue: {} },
    ] } }).compileComponents();
    notes = TestBed.inject(NotesService);
    notes.transferToday({ date: selectedDate, dayId: 'selected-day', ifExist: true });
    fixture = TestBed.createComponent(BANotesComponent);
    fixture.detectChanges();
  });

  it('loads the resolved URL profile and retries the same selected date after an HTTP failure', () => {
    const [id, request, includePayment] = api.getProfileScheduleBA.calls.mostRecent().args;
    expect(id).toBe(profile.id);
    expect(request.dateRequest).toEqual(new Date('2099-11-18T00:00:00.000Z'));
    expect(includePayment).toBeTrue();
    first.error({ status: 500 });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('Не удалось загрузить записи');
    expect(fixture.nativeElement.querySelector('.add_notes_stl')).toBeNull();

    api.getProfileScheduleBA.and.returnValue(of([free]));
    fixture.nativeElement.querySelector('[role="alert"] button').click();
    fixture.detectChanges();
    expect(api.getProfileScheduleBA.calls.count()).toBe(2);
    expect(api.getProfileScheduleBA.calls.mostRecent().args[1].dateRequest).toEqual(new Date('2099-11-18T00:00:00Z'));
    expect(fixture.componentInstance.today).toEqual(selectedDate);
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('.add_notes_stl').textContent).toContain('Добавить запись');
  });

  it('keeps active rows visible when cancelled rows fail, and retries cancelled rows separately', () => {
    first.next([free]);
    const cancelled = new Subject<IViewScheduleBA[]>();
    api.getProfileScheduleCanceledBA.and.returnValue(cancelled);
    fixture.componentInstance.getListScheduleCanceled();
    fixture.detectChanges();
    cancelled.error({ status: 503 });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('отменённые записи');
    expect(fixture.nativeElement.querySelector('.add_notes_stl')).not.toBeNull();
    api.getProfileScheduleCanceledBA.and.returnValue(of([]));
    fixture.nativeElement.querySelector('[role="alert"] button').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeNull();
    expect(api.getProfileScheduleBA.calls.count()).toBe(1);
  });

  it('ignores the previous day response after another date is selected', () => {
    const next = new Subject<IViewScheduleBA[]>();
    api.getProfileScheduleBA.and.returnValue(next);
    notes.transferToday({ date: new Date(2099, 10, 19), dayId: 'next-day', ifExist: true });
    fixture.detectChanges();
    first.error({ status: 500 });
    next.next([free]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeNull();
    expect(api.getProfileScheduleBA.calls.mostRecent().args[1].dateRequest).toEqual(new Date('2099-11-19T00:00:00Z'));
    expect(fixture.componentInstance.dayId).toBe('next-day');
  });
});
