import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderotComponent } from './sliderot.component';

describe('SliderotComponent', () => {
  let component: SliderotComponent;
  let fixture: ComponentFixture<SliderotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
