import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertPinCodeComponent } from './insert-pin-code.component';

describe('InsertPinCodeComponent', () => {
  let component: InsertPinCodeComponent;
  let fixture: ComponentFixture<InsertPinCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertPinCodeComponent]
    });
    fixture = TestBed.createComponent(InsertPinCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
