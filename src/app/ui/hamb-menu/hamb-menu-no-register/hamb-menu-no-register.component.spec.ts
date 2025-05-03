import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HambMenuNoRegisterComponent } from './hamb-menu-no-register.component';

describe('HambMenuNoRegisterComponent', () => {
  let component: HambMenuNoRegisterComponent;
  let fixture: ComponentFixture<HambMenuNoRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HambMenuNoRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HambMenuNoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
