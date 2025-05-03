import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBusinessProfileComponent } from './register-business-profile.component';

describe('RegisterBusinessProfileComponent', () => {
  let component: RegisterBusinessProfileComponent;
  let fixture: ComponentFixture<RegisterBusinessProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterBusinessProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterBusinessProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
