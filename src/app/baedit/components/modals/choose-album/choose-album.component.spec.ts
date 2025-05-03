import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAlbumComponent } from './choose-album.component';

describe('ChooseAlbumComponent', () => {
  let component: ChooseAlbumComponent;
  let fixture: ComponentFixture<ChooseAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseAlbumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
