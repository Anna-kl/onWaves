import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ScheduleService } from '../../../../services/schedule.service';
import { ProfileService } from '../../../../services/profile.service';
import { WelcomeCouponService } from '../../../../services/welcome-coupon.service';
import { AnalyticsService } from '../../../../services/analytics.service';
import { ProfileDataService } from '../../services/profile-data.service';
import { ColumnBAProfileComponent } from './column-baprofile.component';

describe('Public profile booking button', () => {
  let fixture: ComponentFixture<ColumnBAProfileComponent>;
  let component: ColumnBAProfileComponent;
  const button = () => fixture.nativeElement.querySelector('[data-testid="book-online"]') as HTMLElement | null;

  beforeEach(async () => {
    spyOn(ColumnBAProfileComponent.prototype, 'ngOnInit');
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule],
      declarations: [ColumnBAProfileComponent],
      providers: [
        { provide: ProfileService, useValue: {} },
        { provide: ProfileDataService, useValue: {} },
        { provide: Store, useValue: {} },
        { provide: NgbModal, useValue: {} },
        { provide: DeviceDetectorService, useValue: {} },
        { provide: WelcomeCouponService, useValue: {} },
        { provide: AnalyticsService, useValue: {} },
      ],
    }).overrideComponent(ColumnBAProfileComponent, {
      set: { providers: [{ provide: ScheduleService, useValue: {} }] },
    }).compileComponents();
    fixture = TestBed.createComponent(ColumnBAProfileComponent);
    component = fixture.componentInstance;
    component.businessProfile = { id: 'master', name: 'Разработчик', link: 'developer', isGetOrder: true, isPromo: false } as any;
  });

  it('keeps booking available on a day off and opens the booking flow', () => {
    component.hasReceptionHours = false;
    component.isHasSchedule = false;
    component.schedulesListFree = ['Сегодня не работает'];
    const open = spyOn(component, 'onlineRecord');
    fixture.detectChanges();
    expect(button()?.textContent?.trim()).toBe('Записаться онлайн');
    button()!.click();
    expect(open).toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).not.toContain('Рабочее время сегодня:');
  });

  it('keeps booking available before today hours have loaded', () => {
    fixture.detectChanges();
    expect(button()).not.toBeNull();
  });

  it('hides booking when the master has stopped accepting orders', () => {
    component.businessProfile!.isGetOrder = false;
    component.hasReceptionHours = true;
    fixture.detectChanges();
    expect(button()).toBeNull();
  });

  it('does not enable booking on a demo profile', () => {
    component.businessProfile!.isPromo = true;
    component.hasReceptionHours = true;
    fixture.detectChanges();
    expect(button()).toBeNull();
  });
});
