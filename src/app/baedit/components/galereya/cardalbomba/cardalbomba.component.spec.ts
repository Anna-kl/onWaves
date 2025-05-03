import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardalbombaComponent } from './cardalbomba.component';

describe('CardalbombaComponent', () => {
  let component: CardalbombaComponent;
  let fixture: ComponentFixture<CardalbombaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardalbombaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardalbombaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
