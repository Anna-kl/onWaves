import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilebaComponent } from './profileba.component';

describe('ProfilebaComponent', () => {
  let component: ProfilebaComponent;
  let fixture: ComponentFixture<ProfilebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilebaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
