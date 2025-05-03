import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalRegisterNextComponent} from './modal-register-next.component';

describe('ModalRegisterNextComponent', () => {
  let component: ModalRegisterNextComponent;
  let fixture: ComponentFixture<ModalRegisterNextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalRegisterNextComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegisterNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
