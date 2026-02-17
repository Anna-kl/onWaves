import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEmailCodeComponent } from './register-email-code.component';

describe('RegisterEmailCodeComponent', () => {
  let component: RegisterEmailCodeComponent;
  let fixture: ComponentFixture<RegisterEmailCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterEmailCodeComponent]
    });
    fixture = TestBed.createComponent(RegisterEmailCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
