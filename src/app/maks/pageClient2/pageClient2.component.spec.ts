/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageClient2Component } from './pageClient2.component';

describe('PageClient2Component', () => {
  let component: PageClient2Component;
  let fixture: ComponentFixture<PageClient2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageClient2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageClient2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
