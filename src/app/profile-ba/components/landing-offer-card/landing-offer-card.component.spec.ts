import { AnalyticsService } from '../../../../services/analytics.service';
import { LandingOfferCardComponent } from './landing-offer-card.component';
import { ILandingOffer } from '../../../DTO/views/landing/ILandingOffer';
import { PromoActionKind } from '../../../DTO/enums/promoActionKind';
import { CommonModule } from '@angular/common';
import { EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PromoMediaKind } from '../../../DTO/enums/promoMediaKind';
import { CardDetailModalComponent } from '../../../common/modals/card-detail-modal/card-detail-modal.component';
import { LandingOfferType } from '../../../DTO/enums/landingOfferType';
import { PromoSeatState } from '../../../DTO/views/promo/promo-seats';
import { promoSeatCard } from '../../helpers/promo-seats';
import { MARY_PROMOS, onlinePayRub, promoPriceRub } from '../../helpers/promo-terms';

describe('Offer contact when booking is closed', () => {
  let card: LandingOfferCardComponent;
  beforeEach(() => {
    card = new LandingOfferCardComponent({} as AnalyticsService, {} as NgbModal);
    card.offer = { title: 'Уход', actions: [{ role: 0, kind: 0, text: 'Записаться', serviceId: 'service' }] } as ILandingOffer;
    card.contactPhone = '+7 (915) 266-94-45';
  });
  it('keeps booking for an accepting master', () => {
    expect(card.actions.length).toBe(1); expect(card.contactHref).toBeNull();
  });
  it('replaces unavailable booking with a real phone link', () => {
    card.bookingEnabled = false;
    expect(card.actions).toEqual([]); expect(card.contactHref).toBe('tel:+79152669445');
  });
  it('does not replace the calculator CTA or invent a missing phone', () => {
    card.bookingEnabled = false;
    card.offer.actions = [{ role: 0, kind: PromoActionKind.Calculator, text: 'Рассчитать', profileCalculatorId: 'calculator' }];
    expect(card.actions.length).toBe(1); expect(card.contactHref).toBeNull();
    card.offer.actions = []; card.contactPhone = '+7'; expect(card.contactHref).toBeNull();
  });
});

describe('Mary offer prices', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [LandingOfferCardComponent],
      providers: [{ provide: AnalyticsService, useValue: {} }, { provide: NgbModal, useValue: {} }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  for (const promo of MARY_PROMOS.offers) {
    it(`shows each price once for ${promo.anchor}, even with old CMS copy`, () => {
      const fixture = TestBed.createComponent(LandingOfferCardComponent);
      const card = fixture.componentInstance;
      const price = (value: number) => card.formatRub(value);
      const amount = promo.masterScope === 'online' ? promo.listRub : promoPriceRub(promo);
      card.priceText = price(amount);
      card.offer = {
        serviceId: promo.serviceId, offerType: LandingOfferType.Discount,
        title: `${promo.title} — ${price(amount)}`, titleBold: price(amount),
        description: `Скидка и купон, всего ${price(onlinePayRub(promo))}`,
        footerNote: `Цена без акции — ${price(promo.listRub)}`,
        benefits: [{ iconType: 0, title: price(amount), description: 'Цена по акции', sortOrder: 0 }],
        isActive: true, sortOrder: 0, buttonText: 'Записаться',
      };
      fixture.detectChanges();
      const element: HTMLElement = fixture.nativeElement;
      const text = element.textContent?.replace(/\s+/g, ' ') ?? '';
      for (const value of [promo.listRub, promoPriceRub(promo), onlinePayRub(promo)]) {
        expect(text.split(price(value).replace(/\s+/g, ' ')).length - 1).toBe(1);
      }
      expect(element.querySelector('.offer__mary-row--coupon dt')?.textContent).toContain('если доступен купон');

      card.priceText = price(amount + 100);
      fixture.detectChanges();
      expect(element.querySelector('.offer__mary-price')).toBeNull();
      expect(element.querySelector('.offer__price')?.textContent).toContain(card.priceText);
    });
  }
});

describe('Seat promotion badges on service cards', () => {
  let fixture: ComponentFixture<LandingOfferCardComponent>;
  let card: LandingOfferCardComponent;
  let state: PromoSeatState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [LandingOfferCardComponent],
      providers: [{ provide: AnalyticsService, useValue: {} }, { provide: NgbModal, useValue: {} }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(LandingOfferCardComponent);
    card = fixture.componentInstance;
    state = {
      code: 'permanent', title: 'Перманент', status: 'open',
      seatsLimit: 5, seatsLeft: 4, discountPercent: 20,
      endsAt: '2026-11-30T20:59:59Z', visitDeadline: '2026-12-31T20:59:59Z',
      heroOfferId: 'hidden-hero',
      services: ['brows', 'lips'].map(serviceId => ({
        serviceId, name: serviceId, listAmount: 8000, promoDiscount: 1600,
        couponDiscount: 500, clientPays: 5900,
      })),
    };
    setService('brows');
    card.promoPrice = {
      serviceName: 'Брови', listAmount: 8000, promoDiscount: 1600,
      couponDiscount: 500, payable: 5900, discountPercent: 20,
      seatsLeft: 4, seatsLimit: 5, pendingCheck: true, notice: null,
    };
  });

  function setService(serviceId: string): void {
    card.offer = {
      id: `${serviceId}-card`, serviceId, title: serviceId,
      description: 'Скидка и купон от OnWaves', offerType: LandingOfferType.Discount,
      isActive: true, sortOrder: 0, buttonText: 'Записаться', benefits: [],
    };
    card.promoSeats = promoSeatCard(state, card.offer, 'permanent_ozery');
  }

  function saleTexts(): string[] {
    fixture.detectChanges();
    return Array.from(fixture.nativeElement.querySelectorAll('.offer__proposal--sale') as NodeListOf<HTMLElement>)
      .map(element => element.textContent!.trim());
  }

  for (const serviceId of ['brows', 'lips']) {
    it(`shows both badges on ${serviceId} without the hidden hero`, () => {
      setService(serviceId);
      expect(card.promoSeats?.hero).toBeFalse();
      expect(saleTexts()).toEqual(['Скидка 20%', 'Первым 5 клиенткам']);
    });
  }

  for (const reason of ['ended', 'seats_exhausted', 'disabled'] as const) {
    it(`removes both badges when the campaign becomes ${reason}, even with an old quote`, () => {
      expect(saleTexts().length).toBe(2);
      state = { ...state, status: 'closed', closedReason: reason, seatsLeft: 0 };
      // Даже сохранённые вручную плашки не должны пережить закрытие кампании.
      card.offer.proposals = [{ text: 'Скидка 20%', tone: 'sale' }, { text: 'Первым 5 клиенткам', tone: 'sale' }];
      card.promoSeats = promoSeatCard(state, card.offer, 'permanent_ozery');
      expect(saleTexts()).toEqual([]);
    });
  }

  it('removes badges when the quote says there are no seats before state refreshes', () => {
    expect(saleTexts().length).toBe(2);
    card.promoPrice = { ...card.promoPrice!, seatsLeft: 0 };
    expect(saleTexts()).toEqual([]);
  });

  it('removes badges when the quote no longer grants the discount, keeping the coupon', () => {
    card.promoPrice = { ...card.promoPrice!, promoDiscount: 0, discountPercent: null };
    expect(saleTexts()).toEqual([]);
    expect(fixture.nativeElement.querySelector('.offer__proposal--coupon').textContent.trim()).toBe('Купон');
  });

  it('does not promise the promotion before a quote arrives or while loading fails', () => {
    card.promoPriceLoading = true;
    expect(saleTexts()).toEqual([]);
    card.promoPriceLoading = false;
    card.promoPriceError = true;
    expect(saleTexts()).toEqual([]);
    card.promoPriceError = false;
    card.promoPrice = null;
    expect(saleTexts()).toEqual([]);
  });

  it('reads the percentage and limit from the quote instead of fixing them to 20 and 5', () => {
    card.promoPrice = { ...card.promoPrice!, discountPercent: 15, seatsLimit: 10 };
    expect(saleTexts()).toEqual(['Скидка 15%', 'Первым 10 клиенткам']);
  });

  it('does not add promotion badges to the free consultation or alter booking actions', () => {
    setService('consultation');
    expect(card.promoSeats).toBeNull();
    expect(saleTexts()).toEqual([]);
    setService('brows');
    card.offer.actions = [{ role: 0, kind: PromoActionKind.Booking, text: 'Записаться', serviceId: 'brows' }];
    const handler = jasmine.createSpy('booking');
    card.actionClick.subscribe(handler);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.offer__btn').click();
    expect(handler).toHaveBeenCalledWith(jasmine.objectContaining({ kind: PromoActionKind.Booking, serviceId: 'brows' }));
  });
  it('renders disabled terms, start date and shared coupon quota from the same state as prices', () => {
    state = { ...state, status: 'closed', closedReason: 'disabled', startsAt: '2026-11-09T21:00:00Z', endsAt: '2026-12-15T20:59:59Z', visitDeadline: '2026-12-15T00:00:00Z', couponRequiresSeat: true };
    card.promoTerms = { state, masterSlug: 'chekanova_nails' };
    fixture.detectChanges();
    const terms: HTMLElement = fixture.nativeElement.querySelector('.offer__full-body');
    expect(terms.querySelector('[role="status"]')?.textContent).toContain('Акция пока не включена.');
    expect(terms.textContent).toContain('с 10 ноября по 15 декабря 2026 года');
    expect(terms.textContent).toContain('в пределах тех же первых 5 мест');
    expect(terms.textContent).not.toContain('г. года');
    expect(terms.querySelectorAll('tbody tr').length).toBe(state.services.length);
  });

});

describe('Promo video full-screen viewing', () => {
  let fixture: ComponentFixture<LandingOfferCardComponent>;
  let modalService: jasmine.SpyObj<NgbModal>;
  let viewer: CardDetailModalComponent;
  let modal: NgbModalRef;
  let close: () => void;
  const first = { url: '/first.mp4', kind: PromoMediaKind.Video, posterUrl: '/first.jpg' };
  const second = { url: '/second.mp4', kind: PromoMediaKind.Video };

  beforeEach(async () => {
    viewer = { videoStarted: new EventEmitter<void>() } as CardDetailModalComponent;
    modal = { componentInstance: viewer, result: new Promise<void>(resolve => close = resolve), dismiss: jasmine.createSpy('dismiss') } as unknown as NgbModalRef;
    modalService = jasmine.createSpyObj('NgbModal', ['open']);
    modalService.open.and.returnValue(modal);
    await TestBed.configureTestingModule({
      imports: [CommonModule], declarations: [LandingOfferCardComponent], schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: AnalyticsService, useValue: {} }, { provide: NgbModal, useValue: modalService }],
    }).compileComponents();
    fixture = TestBed.createComponent(LandingOfferCardComponent);
    fixture.componentInstance.offer = {
      id: 'offer', title: 'Работа мастера', description: 'Описание акции', media: [first],
      offerType: LandingOfferType.Discount, isActive: true, sortOrder: 0, buttonText: '', benefits: [],
    };
  });

  afterEach(() => fixture.destroy());

  for (const entry of ['cover', 'extra', 'carousel']) {
    it(`opens the shared viewer from ${entry} without inventing booking or a filename title`, () => {
      const card = fixture.componentInstance;
      if (entry !== 'cover') card.offer.media = [first, second];
      if (entry === 'extra') card.cellingsHero = true;
      fixture.detectChanges();
      const selector = entry === 'cover' ? '.offer__cover app-video-player' : entry === 'extra' ? '.offer__media app-video-player' : 'app-promo-media-carousel';
      fixture.debugElement.query(By.css(selector)).triggerEventHandler(entry === 'carousel' ? 'videoExpand' : 'expand', second);
      expect(modalService.open).toHaveBeenCalledWith(CardDetailModalComponent, jasmine.objectContaining({ windowClass: 'card-detail-modal card-detail-modal--video' }));
      expect(viewer.card.imageUrl).toBe(entry === 'cover' ? first.url : second.url);
      expect(viewer.card.name).toBe('Работа мастера');
      expect(viewer.card.description).toBe('Описание акции');
      expect(viewer.canBook).toBeFalse();
      expect(viewer.viewerLabel).toBe('Видео акции');
    });
  }

  it('reports an actual start, avoids duplicate windows and unsubscribes on close', fakeAsync(() => {
    const card = fixture.componentInstance;
    const started = spyOn(card.videoStart, 'emit');
    card.openVideo(first); card.openVideo(first);
    expect(modalService.open).toHaveBeenCalledTimes(1);
    expect(started).not.toHaveBeenCalled();
    viewer.videoStarted.emit();
    expect(started).toHaveBeenCalledOnceWith(first.url);
    close(); flushMicrotasks();
    viewer.videoStarted.emit();
    expect(started).toHaveBeenCalledTimes(1);
    card.openVideo(second);
    expect(modalService.open).toHaveBeenCalledTimes(2);
    fixture.destroy();
    expect(modal.dismiss).toHaveBeenCalled();
  }));
});
