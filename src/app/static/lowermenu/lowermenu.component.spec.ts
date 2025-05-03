import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowermenuComponent } from './lowermenu.component';

describe('LowermenuComponent', () => {
  let component: LowermenuComponent;
  let fixture: ComponentFixture<LowermenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LowermenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LowermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
