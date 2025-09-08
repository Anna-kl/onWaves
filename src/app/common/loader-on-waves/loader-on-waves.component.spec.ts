import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderOnWavesComponent } from './loader-on-waves.component';

describe('LoaderOnWavesComponent', () => {
  let component: LoaderOnWavesComponent;
  let fixture: ComponentFixture<LoaderOnWavesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderOnWavesComponent]
    });
    fixture = TestBed.createComponent(LoaderOnWavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
