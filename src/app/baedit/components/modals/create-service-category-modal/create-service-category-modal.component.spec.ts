import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceCategoryModalComponent } from './create-service-category-modal.component';

describe('CreateServiceCategoryModalComponent', () => {
  let component: CreateServiceCategoryModalComponent;
  let fixture: ComponentFixture<CreateServiceCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceCategoryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
