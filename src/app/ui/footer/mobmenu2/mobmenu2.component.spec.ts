import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mobmenu2Component } from './mobmenu2.component';

describe('Mobmenu2Component', () => {
  let component: Mobmenu2Component;
  let fixture: ComponentFixture<Mobmenu2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Mobmenu2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mobmenu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
