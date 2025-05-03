/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageClient1Component } from './pageClient1.component';

describe('PageClient1Component', () => {
  let component: PageClient1Component;
  let fixture: ComponentFixture<PageClient1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageClient1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageClient1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
