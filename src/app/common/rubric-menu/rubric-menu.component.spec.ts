import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricMenuComponent } from './rubric-menu.component';

describe('RubricMenuComponent', () => {
  let component: RubricMenuComponent;
  let fixture: ComponentFixture<RubricMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RubricMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
