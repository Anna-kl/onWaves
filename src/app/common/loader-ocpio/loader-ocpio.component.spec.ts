import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderOcpioComponent } from './loader-ocpio.component';

describe('LoaderOcpioComponent', () => {
  let component: LoaderOcpioComponent;
  let fixture: ComponentFixture<LoaderOcpioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderOcpioComponent]
    });
    fixture = TestBed.createComponent(LoaderOcpioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
