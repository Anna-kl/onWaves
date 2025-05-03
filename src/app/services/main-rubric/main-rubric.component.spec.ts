import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRubricComponent } from './main-rubric.component';

describe('MainRubricComponent', () => {
  let component: MainRubricComponent;
  let fixture: ComponentFixture<MainRubricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainRubricComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainRubricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
