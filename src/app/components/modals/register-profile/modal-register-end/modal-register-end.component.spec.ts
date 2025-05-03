import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalRegisterEndComponent} from './modal-register-end.component';

describe('ModalRegisterEndComponent', () => {
  let component: ModalRegisterEndComponent;
  let fixture: ComponentFixture<ModalRegisterEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalRegisterEndComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegisterEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
