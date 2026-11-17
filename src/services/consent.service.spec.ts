import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { ConsentChannel } from '../app/DTO/enums/consentChannel';
import { environment } from '../enviroments/environment';
import { ConsentService } from './consent.service';

describe('Consent API channel contract', () => {
  let http: HttpTestingController;
  let consent: ConsentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: CookieService, useValue: { get: () => 'fixture' } }],
    });
    http = TestBed.inject(HttpTestingController);
    consent = TestBed.inject(ConsentService);
  });
  afterEach(() => http.verify());

  it('writes actual API ConsentChannel integers for each row', () => {
    const expected = [ConsentChannel.Sms, ConsentChannel.Email, ConsentChannel.Telegram,
      ConsentChannel.Push, ConsentChannel.Vk, ConsentChannel.Max];
    expected.forEach((channel, number) => {
      consent.sendConsent({ channel, profileUserId: 'profile', isGranted: true, consentTextVersion: 'v1', source: 'settings' }).subscribe();
      const pending = http.expectOne(environment.Uri + 'Consent/profile/settings');
      expect(pending.request.body.channel).toBe(number);
      expect(pending.request.headers.get('Authorization')).toBe('Bearer fixture');
      pending.flush({ code: 200 });
    });
  });

  it('asks for Telegram, VK and MAX deep links using MessageType values', () => {
    const cases: [ConsentChannel, number][] = [[ConsentChannel.Telegram, 1], [ConsentChannel.Vk, 3], [ConsentChannel.Max, 5]];
    cases.forEach(([channel, wire]) => {
      consent.getSubscribeLink('profile', channel).subscribe(result => expect(result.channel).toBe(channel));
      http.expectOne(request => request.url === environment.Uri + `profiles/subscribe-link/profile/${wire}`)
        .flush({ channel: wire, link: 'https://example.invalid' });
    });
  });

  it('reads business connection status again after subscription changes', () => {
    const statusUrl = environment.Uri + 'profiles/messenger-channels-status/profile';
    consent.getNotificationChannelsStatus('profile').subscribe(status => expect(status.telegram).toBeTrue());
    const first = http.expectOne(request => request.url === statusUrl);
    first.flush({ telegram: true });
    consent.getNotificationChannelsStatus('profile').subscribe(status => expect(status.telegram).toBeFalse());
    const second = http.expectOne(request => request.url === statusUrl);
    expect(second.request.urlWithParams).not.toBe(first.request.urlWithParams);
    second.flush({ telegram: false });
  });
});
