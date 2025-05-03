import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtsearchComponent } from './extsearch.component';

describe('ExtsearchComponent', () => {
  let component: ExtsearchComponent;
  let fixture: ComponentFixture<ExtsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtsearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
