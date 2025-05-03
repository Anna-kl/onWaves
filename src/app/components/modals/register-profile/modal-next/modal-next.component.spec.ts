import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalNextComponent} from './modal-next.component';

describe('ModalNextComponent', () => {
  let component: ModalNextComponent;
  let fixture: ComponentFixture<ModalNextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalNextComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
