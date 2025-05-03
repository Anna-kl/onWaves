import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uslugis2Component } from './uslugis2.component';

describe('Uslugis2Component', () => {
  let component: Uslugis2Component;
  let fixture: ComponentFixture<Uslugis2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Uslugis2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uslugis2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
