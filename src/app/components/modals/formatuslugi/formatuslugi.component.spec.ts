import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatuslugiComponent } from './formatuslugi.component';

describe('FormatuslugiComponent', () => {
  let component: FormatuslugiComponent;
  let fixture: ComponentFixture<FormatuslugiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatuslugiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormatuslugiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
