import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilebisaccComponent } from './profilebisacc.component';

describe('ProfilebisaccComponent', () => {
  let component: ProfilebisaccComponent;
  let fixture: ComponentFixture<ProfilebisaccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilebisaccComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilebisaccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
