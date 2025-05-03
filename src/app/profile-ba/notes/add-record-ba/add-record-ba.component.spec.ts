import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecordBAComponent } from './add-record-ba.component';

describe('AddRecordBAComponent', () => {
  let component: AddRecordBAComponent;
  let fixture: ComponentFixture<AddRecordBAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecordBAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecordBAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
