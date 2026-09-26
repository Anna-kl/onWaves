import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { LandingTemplateType } from '../app/DTO/enums/landingTemplateType';
import { ILandingOffer } from '../app/DTO/views/landing/ILandingOffer';
import { IViewLanding } from '../app/DTO/views/landing/IViewLanding';
import { environment } from '../enviroments/environment';
import { LandingService } from './landing.service';

describe('LandingService.getLanding', () => {
  let service: LandingService;
  let http: HttpTestingController;
  const profileId = 'profile-guid';
  const url = `${environment.Uri}landing/${profileId}`;

  const isLandingGet = (req: TestRequest): boolean =>
    req.request.method === 'GET' && (req.request.url === url || req.request.url.startsWith(`${url}?`));

  const isGuestLandingGet = (req: TestRequest): boolean =>
    req.request.method === 'GET' && req.request.url === url && !req.request.params.has('_');

  const landing = (title: string): IViewLanding => ({
    templateType: LandingTemplateType.Classic,
    isActive: true,
    offers: [{ title, description: '', isActive: true, sortOrder: 0 } as ILandingOffer],
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LandingService,
        { provide: CookieService, useValue: { get: () => '' } },
      ],
    });
    service = TestBed.inject(LandingService);
    http = TestBed.inject(HttpTestingController);
    spyOn(console, 'error');
  });

  afterEach(() => {
    http.verify();
  });

  it('does not cache a domain error: second call hits HTTP again', () => {
    service.getLanding(profileId).subscribe(result => {
      expect(result.ok).toBeFalse();
    });
    http.expectOne(isGuestLandingGet).flush({
      code: 500,
      message: 'column l.Actions does not exist',
      data: null,
    });

    service.getLanding(profileId).subscribe(result => {
      expect(result.ok).toBeFalse();
    });
    http.expectOne(isGuestLandingGet).flush({
      code: 500,
      message: 'column l.Actions does not exist',
      data: null,
    });
  });

  it('caches a successful envelope so the second subscriber does not hit HTTP', () => {
    const data = landing('Cached');
    service.getLanding(profileId).subscribe(result => {
      expect(result.ok).toBeTrue();
      expect(result.landing).toEqual(data);
    });
    http.expectOne(isGuestLandingGet).flush({ code: 200, message: 'ok', data });

    service.getLanding(profileId).subscribe(result => {
      expect(result.ok).toBeTrue();
      expect(result.landing).toEqual(data);
    });
    http.expectNone(isLandingGet);
  });

  it('deduplicates simultaneous subscribers into one HTTP request', () => {
    service.getLanding(profileId).subscribe();
    service.getLanding(profileId).subscribe();
    http.expectOne(isGuestLandingGet).flush({ code: 200, message: 'ok', data: null });
  });

  it('busts cache only when the cabinet JWT is present', () => {
    const cookies = TestBed.inject(CookieService);
    spyOn(cookies, 'get').and.returnValue('jwt');
    service.getLanding(profileId).subscribe();
    const req = http.expectOne(isLandingGet);
    expect(req.request.params.get('_')).toBeTruthy();
    req.flush({ code: 200, message: 'ok', data: null });
  });

  it('after updateLanding does not keep the pre-save card', () => {
    service.getLanding(profileId).subscribe();
    http.expectOne(isGuestLandingGet).flush({ code: 200, message: 'ok', data: landing('Старая') });

    const saved = landing('Новая');
    service.updateLanding(profileId, saved).subscribe();
    http.expectOne(req => req.method === 'PUT' && req.url === url).flush({
      code: 200,
      message: 'ok',
      data: null,
    });

    service.getLanding(profileId).subscribe(result => {
      expect(result.ok).toBeTrue();
      expect(result.landing?.offers[0].title).toBe('Новая');
    });
    http.expectNone(isLandingGet);
  });
});
