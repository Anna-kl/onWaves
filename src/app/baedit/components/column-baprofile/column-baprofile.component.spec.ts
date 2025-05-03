import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnBAProfileComponent } from './column-baprofile.component';

describe('ColumnBAProfileComponent', () => {
  let component: ColumnBAProfileComponent;
  let fixture: ComponentFixture<ColumnBAProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnBAProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnBAProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
