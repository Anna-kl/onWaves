/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LandingVersion2Component } from './landingVersion2.component';

describe('LandingVersion2Component', () => {
  let component: LandingVersion2Component;
  let fixture: ComponentFixture<LandingVersion2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingVersion2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingVersion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
