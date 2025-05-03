import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileuaComponent } from './profileua.component';

describe('ProfileuaComponent', () => {
  let component: ProfileuaComponent;
  let fixture: ComponentFixture<ProfileuaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileuaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
