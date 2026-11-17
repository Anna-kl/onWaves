import { LandingOfferType } from '../../DTO/enums/landingOfferType';
import { PromoMediaKind } from '../../DTO/enums/promoMediaKind';
import { ILandingOffer } from '../../DTO/views/landing/ILandingOffer';
import { coverMedia, extraMedia, offerHeaderChips } from './promo-offer';

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

describe('offerHeaderChips', () => {
  it('uses every stored proposal, sale and coupon apart', () => {
    const chips = offerHeaderChips(offer({
      proposals: [
        { text: 'Скидка 20%', tone: 'sale' },
        { text: 'Купон', tone: 'coupon' },
      ],
    }));

    expect(chips).toEqual([
      { text: 'Скидка 20%', tone: 'sale' },
      { text: 'Купон', tone: 'coupon' },
    ]);
  });

  it('builds both chips from the percent and the coupon text when the server omits proposals', () => {
    const chips = offerHeaderChips(offer({
      discountPercent: 20,
      description: '20 % и купон на первую запись',
      benefits: [{ title: 'Маникюр', description: 'минус 20 % и купон 300 ₽', iconType: 0, sortOrder: 1 }],
    }));

    expect(chips).toEqual([
      { text: 'Скидка 20%', tone: 'sale' },
      { text: 'Купон', tone: 'coupon' },
    ]);
  });
});

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
