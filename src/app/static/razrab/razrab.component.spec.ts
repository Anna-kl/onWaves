import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RazrabComponent } from './razrab.component';

describe('RazrabComponent', () => {
  let component: RazrabComponent;
  let fixture: ComponentFixture<RazrabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RazrabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RazrabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
