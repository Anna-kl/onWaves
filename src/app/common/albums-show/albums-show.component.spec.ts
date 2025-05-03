import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsShowComponent } from './albums-show.component';

describe('AlbumsShowComponent', () => {
  let component: AlbumsShowComponent;
  let fixture: ComponentFixture<AlbumsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumsShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
