import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalEnterDataComponent} from './modal-enter-data.component';

describe('ModalEnterDataComponent', () => {
  let component: ModalEnterDataComponent;
  let fixture: ComponentFixture<ModalEnterDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEnterDataComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEnterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
