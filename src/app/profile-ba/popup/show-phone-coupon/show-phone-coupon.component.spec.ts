import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPhoneCouponComponent } from './show-phone-coupon.component';

describe('ShowPhoneCouponComponent', () => {
  let component: ShowPhoneCouponComponent;
  let fixture: ComponentFixture<ShowPhoneCouponComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowPhoneCouponComponent]
    });
    fixture = TestBed.createComponent(ShowPhoneCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
