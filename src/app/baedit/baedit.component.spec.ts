import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaeditComponent } from './baedit.component';

describe('BaeditComponent', () => {
  let component: BaeditComponent;
  let fixture: ComponentFixture<BaeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
