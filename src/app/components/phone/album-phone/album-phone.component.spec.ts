import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPhoneComponent } from './album-phone.component';

describe('AlbumPhoneComponent', () => {
  let component: AlbumPhoneComponent;
  let fixture: ComponentFixture<AlbumPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumPhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
