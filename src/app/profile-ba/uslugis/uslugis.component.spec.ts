import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UslugisComponent } from './uslugis.component';

describe('UslugisComponent', () => {
  let component: UslugisComponent;
  let fixture: ComponentFixture<UslugisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UslugisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UslugisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
