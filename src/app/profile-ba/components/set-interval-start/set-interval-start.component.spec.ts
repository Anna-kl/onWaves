import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetIntervalStartComponent } from './set-interval-start.component';

describe('SetIntervalStartComponent', () => {
  let component: SetIntervalStartComponent;
  let fixture: ComponentFixture<SetIntervalStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetIntervalStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetIntervalStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
