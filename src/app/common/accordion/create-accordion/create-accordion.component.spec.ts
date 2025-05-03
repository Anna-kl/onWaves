import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccordionComponent } from './create-accordion.component';

describe('CreateAccordionComponent', () => {
  let component: CreateAccordionComponent;
  let fixture: ComponentFixture<CreateAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
