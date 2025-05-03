import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StranicaComponent } from './stranica.component';

describe('StranicaComponent', () => {
  let component: StranicaComponent;
  let fixture: ComponentFixture<StranicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StranicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StranicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
