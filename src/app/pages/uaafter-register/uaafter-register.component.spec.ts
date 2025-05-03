import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UAAfterRegisterComponent } from './uaafter-register.component';

describe('UAAfterRegisterComponent', () => {
  let component: UAAfterRegisterComponent;
  let fixture: ComponentFixture<UAAfterRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UAAfterRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UAAfterRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
