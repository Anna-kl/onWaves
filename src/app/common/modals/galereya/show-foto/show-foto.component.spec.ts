import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFotoComponent } from './show-foto.component';

describe('ShowFotoComponent', () => {
  let component: ShowFotoComponent;
  let fixture: ComponentFixture<ShowFotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
