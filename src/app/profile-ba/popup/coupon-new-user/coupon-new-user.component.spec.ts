import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CouponNewUserComponent } from './coupon-new-user.component';

describe('CouponNewUserComponent', () => {
  let component: CouponNewUserComponent;
  let fixture: ComponentFixture<CouponNewUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CouponNewUserComponent]
    });
    fixture = TestBed.createComponent(CouponNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
