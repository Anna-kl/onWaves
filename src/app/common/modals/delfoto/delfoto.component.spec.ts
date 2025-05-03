import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelfotoComponent } from './delfoto.component';

describe('DelfotoComponent', () => {
  let component: DelfotoComponent;
  let fixture: ComponentFixture<DelfotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelfotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelfotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
