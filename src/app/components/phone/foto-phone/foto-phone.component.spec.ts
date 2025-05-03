import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoPhoneComponent } from './foto-phone.component';

describe('FotoPhoneComponent', () => {
  let component: FotoPhoneComponent;
  let fixture: ComponentFixture<FotoPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotoPhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotoPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
