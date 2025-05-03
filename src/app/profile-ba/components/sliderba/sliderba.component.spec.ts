import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderbaComponent } from './sliderba.component';

describe('SliderbaComponent', () => {
  let component: SliderbaComponent;
  let fixture: ComponentFixture<SliderbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderbaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
