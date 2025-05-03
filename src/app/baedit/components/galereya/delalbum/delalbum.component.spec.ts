import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelalbumComponent } from './delalbum.component';

describe('DelalbumComponent', () => {
  let component: DelalbumComponent;
  let fixture: ComponentFixture<DelalbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelalbumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelalbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
