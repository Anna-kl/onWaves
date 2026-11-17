import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Clipboard } from '@angular/cdk/clipboard';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import { LoginService } from '../../../auth/login.service';
import { BackendService } from '../../../../services/backend.service';
import { ProfileService } from '../../../../services/profile.service';
import { ToastService } from '../../../../services/toast.service';
import { MainProfileComponent } from './main-profile.component';

describe('MainProfileComponent promo switch', () => {
  let fixture: ComponentFixture<MainProfileComponent>;
  let response: Subject<any>;
  let profiles: jasmine.SpyObj<ProfileService>;
  let login: jasmine.SpyObj<LoginService>;
  let toasts: jasmine.SpyObj<ToastService>;
  const reason = 'Подтвердите длительность и место оказания активных услуг перед выходом из демо';
  const checkbox = (): HTMLInputElement => fixture.nativeElement.querySelector('.block-promo input');

  beforeEach(async () => {
    response = new Subject();
    profiles = jasmine.createSpyObj('ProfileService', ['changeIsPromo']);
    profiles.changeIsPromo.and.returnValue(response);
    login = jasmine.createSpyObj('LoginService', ['updateProfile']);
    toasts = jasmine.createSpyObj('ToastService', ['add']);
    await TestBed.configureTestingModule({
      declarations: [MainProfileComponent],
      imports: [FormsModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useValue: { pipe: () => of({ id: 'master', name: 'Мастер', isPromo: true, isGetOrder: false }) } },
        { provide: LoginService, useValue: login },
        { provide: ToastService, useValue: toasts },
        { provide: NgbModal, useValue: {} },
        { provide: Clipboard, useValue: {} },
      ],
    }).overrideComponent(MainProfileComponent, { set: { providers: [
      { provide: BackendService, useValue: {} },
      { provide: ProfileService, useValue: profiles },
    ] } }).compileComponents();
    fixture = TestBed.createComponent(MainProfileComponent);
    fixture.detectChanges(); await fixture.whenStable();
  });

  async function clickSwitch(): Promise<void> {
    checkbox().click(); fixture.detectChanges(); await fixture.whenStable();
  }

  it('shows an HTTP-200 business rejection and retains the confirmed promo status', async () => {
    await clickSwitch();
    response.next({ code: 400, message: reason }); response.complete();
    fixture.detectChanges(); await fixture.whenStable();
    expect(profiles.changeIsPromo).toHaveBeenCalledOnceWith('master', { isPromo: false });
    expect(checkbox().checked).toBeTrue();
    expect(fixture.componentInstance.profile?.isPromo).toBeTrue();
    expect(fixture.nativeElement.textContent).toContain(reason);
    expect(login.updateProfile).not.toHaveBeenCalled();
    expect(toasts.add).toHaveBeenCalledWith(jasmine.objectContaining({ severity: 'error', detail: reason }));
  });

  it('shows an ownership rejection without pretending the status was saved', async () => {
    await clickSwitch();
    response.next({ code: 403, message: 'Нет доступа к этому профилю' }); response.complete();
    fixture.detectChanges(); await fixture.whenStable();
    expect(checkbox().checked).toBeTrue();
    expect(fixture.nativeElement.textContent).toContain('Нет доступа к этому профилю');
    expect(login.updateProfile).not.toHaveBeenCalled();
  });

  it('preserves the server error text for an HTTP failure and allows retry', async () => {
    await clickSwitch();
    response.error({ error: { message: 'Сессия истекла' } });
    fixture.detectChanges(); await fixture.whenStable();
    expect(checkbox().checked).toBeTrue();
    expect(checkbox().disabled).toBeFalse();
    expect(fixture.nativeElement.textContent).toContain('Сессия истекла');
  });

  it('prevents a second request while saving and exits without enabling booking', async () => {
    await clickSwitch();
    expect(fixture.componentInstance.profile?.isPromo).toBeTrue();
    expect(checkbox().disabled).toBeTrue();
    await clickSwitch();
    expect(profiles.changeIsPromo).toHaveBeenCalledTimes(1);
    response.next({ code: 200, data: false }); response.complete();
    fixture.detectChanges(); await fixture.whenStable();
    expect(checkbox().checked).toBeFalse();
    expect(checkbox().disabled).toBeFalse();
    expect(fixture.componentInstance.profile?.isGetOrder).toBeFalse();
    expect(login.updateProfile).toHaveBeenCalledOnceWith('master');
    expect(toasts.add).toHaveBeenCalledWith(jasmine.objectContaining({ severity: 'success' }));
  });

  it('disables booking only after entering promo is confirmed', async () => {
    fixture.componentInstance.profile!.isPromo = false;
    fixture.componentInstance.profile!.isGetOrder = true;
    fixture.detectChanges(); await fixture.whenStable();
    await clickSwitch();
    expect(fixture.componentInstance.profile!.isGetOrder).toBeTrue();
    response.next({ code: 200, data: true }); response.complete();
    fixture.detectChanges(); await fixture.whenStable();
    expect(checkbox().checked).toBeTrue();
    expect(fixture.componentInstance.profile!.isGetOrder).toBeFalse();
  });
});
