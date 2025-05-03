import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarCroppedComponent } from './avatar-cropped.component';

describe('AvatarCroppedComponent', () => {
  let component: AvatarCroppedComponent;
  let fixture: ComponentFixture<AvatarCroppedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarCroppedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarCroppedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
