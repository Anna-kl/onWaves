import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBAComponent } from './header-ba.component';

describe('HeaderBAComponent', () => {
  let component: HeaderBAComponent;
  let fixture: ComponentFixture<HeaderBAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderBAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderBAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
