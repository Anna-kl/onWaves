import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsUserComponent } from './reviews-user.component';

describe('ReviewsUserComponent', () => {
  let component: ReviewsUserComponent;
  let fixture: ComponentFixture<ReviewsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
