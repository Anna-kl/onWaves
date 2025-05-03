import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UABeforeComponent } from './uabefore.component';

describe('UABeforeComponent', () => {
  let component: UABeforeComponent;
  let fixture: ComponentFixture<UABeforeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UABeforeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UABeforeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
