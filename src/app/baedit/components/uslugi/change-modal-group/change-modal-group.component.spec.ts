import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeModalGroupComponent } from './change-modal-group.component';

describe('ChangeModalGroupComponent', () => {
  let component: ChangeModalGroupComponent;
  let fixture: ComponentFixture<ChangeModalGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeModalGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeModalGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
