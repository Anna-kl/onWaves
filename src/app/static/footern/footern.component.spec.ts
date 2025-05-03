import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooternComponent } from './footern.component';

describe('FooternComponent', () => {
  let component: FooternComponent;
  let fixture: ComponentFixture<FooternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooternComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
