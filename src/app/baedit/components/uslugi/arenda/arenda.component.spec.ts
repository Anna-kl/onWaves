import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArendaComponent } from './arenda.component';

describe('ArendaComponent', () => {
  let component: ArendaComponent;
  let fixture: ComponentFixture<ArendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
