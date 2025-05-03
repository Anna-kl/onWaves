import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBAInfoComponent } from './profile-bainfo.component';

describe('ProfileBAInfoComponent', () => {
  let component: ProfileBAInfoComponent;
  let fixture: ComponentFixture<ProfileBAInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileBAInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileBAInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
