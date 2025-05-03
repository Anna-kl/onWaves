import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetBAComponent } from './cabinet-ba.component';

describe('CabinetBAComponent', () => {
  let component: CabinetBAComponent;
  let fixture: ComponentFixture<CabinetBAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetBAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabinetBAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
