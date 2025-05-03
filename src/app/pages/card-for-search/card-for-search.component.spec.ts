import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardForSearchComponent } from './card-for-search.component';

describe('CardForSearchComponent', () => {
  let component: CardForSearchComponent;
  let fixture: ComponentFixture<CardForSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardForSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardForSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
