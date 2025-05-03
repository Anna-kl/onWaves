import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAvatarUAComponent } from './change-avatar-ua.component';

describe('ChangeAvatarUAComponent', () => {
  let component: ChangeAvatarUAComponent;
  let fixture: ComponentFixture<ChangeAvatarUAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAvatarUAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeAvatarUAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
