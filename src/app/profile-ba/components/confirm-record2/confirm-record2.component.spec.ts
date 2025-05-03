import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRecord2Component } from './confirm-record2.component';

describe('ConfirmRecord2Component', () => {
  let component: ConfirmRecord2Component;
  let fixture: ComponentFixture<ConfirmRecord2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmRecord2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmRecord2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
