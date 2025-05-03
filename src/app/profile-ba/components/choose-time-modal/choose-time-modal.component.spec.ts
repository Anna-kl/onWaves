import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTimeModalComponent } from './choose-time-modal.component';

describe('ChooseTimeModalComponent', () => {
  let component: ChooseTimeModalComponent;
  let fixture: ComponentFixture<ChooseTimeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseTimeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseTimeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
