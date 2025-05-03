import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmWithoutTimeComponent } from './confirm-without-time.component';

describe('ConfirmWithoutTimeComponent', () => {
  let component: ConfirmWithoutTimeComponent;
  let fixture: ComponentFixture<ConfirmWithoutTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmWithoutTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmWithoutTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
