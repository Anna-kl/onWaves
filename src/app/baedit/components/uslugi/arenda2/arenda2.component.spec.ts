import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Arenda2Component } from './arenda2.component';

describe('Arenda2Component', () => {
  let component: Arenda2Component;
  let fixture: ComponentFixture<Arenda2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Arenda2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Arenda2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
