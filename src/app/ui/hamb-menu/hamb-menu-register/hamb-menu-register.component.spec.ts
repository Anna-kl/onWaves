import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HambMenuRegisterComponent } from './hamb-menu-register.component';

describe('HambMenuRegisterComponent', () => {
  let component: HambMenuRegisterComponent;
  let fixture: ComponentFixture<HambMenuRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HambMenuRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HambMenuRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
