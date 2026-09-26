import { LandingOfferType } from '../../DTO/enums/landingOfferType';
import { PromoMediaKind } from '../../DTO/enums/promoMediaKind';
import { ILandingOffer } from '../../DTO/views/landing/ILandingOffer';
import { coverMedia, extraMedia } from './promo-offer';

function offer(partial: Partial<ILandingOffer> = {}): ILandingOffer {
  return {
    offerType: LandingOfferType.Discount,
    title: 'Скидка',
    description: '',
    buttonText: 'Записаться',
    isActive: true,
    sortOrder: 0,
    benefits: [],
    ...partial,
  };
}

describe('coverMedia / extraMedia', () => {
  it('uses imageUrl as cover and keeps other media as extras', () => {
    const data = offer({
      imageUrl: 'https://cdn/cover.jpg',
      media: [
        { url: 'https://cdn/clip.mp4', kind: PromoMediaKind.Video, posterUrl: 'https://cdn/poster.jpg' },
        { url: 'https://cdn/extra.jpg', kind: PromoMediaKind.Image },
      ],
    });

    expect(coverMedia(data)).toEqual({ url: 'https://cdn/cover.jpg', kind: PromoMediaKind.Image, posterUrl: null });
    expect(extraMedia(data).map(item => item.url)).toEqual([
      'https://cdn/clip.mp4',
      'https://cdn/extra.jpg',
    ]);
  });

  it('promotes the first video to cover when there is no photo', () => {
    const data = offer({
      imageUrl: null,
      media: [
        { url: 'https://cdn/clip.mp4', kind: PromoMediaKind.Video, posterUrl: 'https://cdn/poster.jpg' },
        { url: 'https://cdn/extra.jpg', kind: PromoMediaKind.Image },
      ],
    });

    expect(coverMedia(data)?.url).toBe('https://cdn/clip.mp4');
    expect(extraMedia(data).map(item => item.url)).toEqual(['https://cdn/extra.jpg']);
  });

  it('does not duplicate cover photo that is also listed in media', () => {
    const data = offer({
      imageUrl: 'https://cdn/cover.jpg',
      media: [
        { url: 'https://cdn/cover.jpg', kind: PromoMediaKind.Image },
        { url: 'https://cdn/extra.jpg', kind: PromoMediaKind.Image },
      ],
    });

    expect(coverMedia(data)?.url).toBe('https://cdn/cover.jpg');
    expect(extraMedia(data).map(item => item.url)).toEqual(['https://cdn/extra.jpg']);
  });
});
