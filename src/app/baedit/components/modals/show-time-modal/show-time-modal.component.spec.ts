import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTimeModalComponent } from './show-time-modal.component';

describe('ShowTimeModalComponent', () => {
  let component: ShowTimeModalComponent;
  let fixture: ComponentFixture<ShowTimeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTimeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowTimeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
