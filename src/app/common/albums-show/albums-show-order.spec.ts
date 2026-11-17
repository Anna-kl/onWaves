import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AlbumsShowComponent } from './albums-show.component';
import { AlbumsService } from '../../../services/albums.service';
import { PageMediaCacheService } from '../media-cache/page-media-cache.service';
import { IAlbumWithFoto } from '../../DTO/views/images/IAlbumWithFoto';
import { IViewImage } from '../../DTO/views/images/IViewImage';

describe('Portfolio album order', () => {
  it('keeps later album media after real works when returning to All', () => {
    const data: Record<string, IViewImage[]> = {
      manicure: [{ id: 'second', sortOrder: 10, url: '/second.jpg', typeImage: 0 }, { id: 'first', sortOrder: 0, url: '/first.jpg', typeImage: 0 }] as IViewImage[],
      ideas: [{ id: 'ai', sortOrder: 0, url: '/ai.mp4', typeImage: 3 }] as IViewImage[],
    };
    const component = new AlbumsShowComponent(null!, { getImages: (id: string) => of(data[id]) } as AlbumsService,
      null!, null!, null!, null!, { select: () => of({ isUpdate: false }) } as unknown as Store,
      { clear: () => {}, warmCards: () => {} } as unknown as PageMediaCacheService, null!);
    component.albums = [{ id: 'manicure' }, { id: 'ideas' }] as IAlbumWithFoto[];
    component.selectTab(null);
    expect(component.displayCards.map(item => item.id)).toEqual(['first', 'second', 'ai']);
    component.selectTab('ideas');
    expect(component.displayCards.map(item => item.id)).toEqual(['ai']);
    component.selectTab(null);
    expect(component.displayCards.map(item => item.id)).toEqual(['first', 'second', 'ai']);
    component.ngOnDestroy();
  });
});
