import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayrentComponent } from './dayrent.component';

describe('DayrentComponent', () => {
  let component: DayrentComponent;
  let fixture: ComponentFixture<DayrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayrentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
