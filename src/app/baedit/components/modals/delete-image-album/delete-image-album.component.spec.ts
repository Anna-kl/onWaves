import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteImageAlbumComponent } from './delete-image-album.component';

describe('DeleteImageAlbumComponent', () => {
  let component: DeleteImageAlbumComponent;
  let fixture: ComponentFixture<DeleteImageAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteImageAlbumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteImageAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
