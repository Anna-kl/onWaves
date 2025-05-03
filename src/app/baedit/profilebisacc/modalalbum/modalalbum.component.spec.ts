import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalalbumComponent } from './modalalbum.component';

describe('ModalalbumComponent', () => {
  let component: ModalalbumComponent;
  let fixture: ComponentFixture<ModalalbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalalbumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalalbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
