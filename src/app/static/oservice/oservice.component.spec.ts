import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OserviceComponent } from './oservice.component';

describe('OserviceComponent', () => {
  let component: OserviceComponent;
  let fixture: ComponentFixture<OserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OserviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
