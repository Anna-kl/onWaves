import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardalbombafotoComponent } from './cardalbombafoto.component';

describe('CardalbombafotoComponent', () => {
  let component: CardalbombafotoComponent;
  let fixture: ComponentFixture<CardalbombafotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardalbombafotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardalbombafotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
