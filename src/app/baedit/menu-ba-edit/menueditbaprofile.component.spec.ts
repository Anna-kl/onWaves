import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenueditbaprofileComponent } from './menueditbaprofile.component';

describe('MenueditbaprofileComponent', () => {
  let component: MenueditbaprofileComponent;
  let fixture: ComponentFixture<MenueditbaprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenueditbaprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenueditbaprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
