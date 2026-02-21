import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallBannerComponent } from './install-banner.component';

describe('InstallBannerComponent', () => {
  let component: InstallBannerComponent;
  let fixture: ComponentFixture<InstallBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstallBannerComponent]
    });
    fixture = TestBed.createComponent(InstallBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
