import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalPageUserComponent } from './personal-page-user.component';

describe('PersonalPageUserComponent', () => {
  let component: PersonalPageUserComponent;
  let fixture: ComponentFixture<PersonalPageUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalPageUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalPageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
