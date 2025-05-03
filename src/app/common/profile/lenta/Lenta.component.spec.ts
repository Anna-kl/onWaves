/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LentaComponent } from './lenta.component';

describe('LentaComponent', () => {
  let component: LentaComponent;
  let fixture: ComponentFixture<LentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
