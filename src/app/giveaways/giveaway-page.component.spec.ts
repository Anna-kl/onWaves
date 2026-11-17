import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { GiveawaysService } from '../../services/giveaways.service';
import { PromoSeatsService } from '../../services/promo-seats.service';
import { SeoService } from '../../services/seo.service';
import { AnalyticsService } from '../../services/analytics.service';
import { GiveawayPageComponent } from './giveaway-page.component';

registerLocaleData(localeRu);

const campaign = {"code": "svetlana-vk-2026-11", "version": 2, "title": "Два приза на услуги Светланы Бирюковой", "phase": "draft", "city": "Озёры", "master": {"id": "master", "name": "Светлана Бирюкова", "slug": "permanent_ozery"}, "entriesCloseAt": "2026-11-09T18:00:00Z", "resultsPlannedAt": "2026-11-10T09:00:00Z", "rulesText": "Организатор — Климова Анна Геннадиевна. Вопросы — в личных сообщениях сообщества OnWaves во VK: vk.ru/club238581537. Мастер — Светлана Бирюкова, Озёры, Болотный переулок, 2, ТЦ «Рубин», 2 этаж. Адрес и возможность проведения выбранной услуги согласуются с мастером.\n\nУчастницы — девушки от 18 лет, которые смогут приехать в Озёры. Участие бесплатное. Покупка, запись, регистрация на сайте, подписка, репост и отметки подруг для участия не обязательны и дополнительных шансов не дают. Подписаться на OnWaves можно, чтобы следить за итогами.\n\nДля участия оставьте один комментарий «Участвую, [ваш город]» под исходным конкурсным постом OnWaves во VK. Один человек — одна заявка. Повторные комментарии не увеличивают шансы. Комментарии под рекламными анонсами не оформляют участие. Телефон в комментариях писать не нужно.\n\nНачало участия будет объявлено отдельно. Приём заявок заканчивается 9 ноября 2026 года в 21:00 МСК. Итоги — 10 ноября 2026 года в 12:00 МСК. Двух победительниц выберут случайным образом по заранее опубликованным правилам и покажут запись выбора. Инструмент выбора, порядок резерва и связи с победительницами уточняются до старта.\n\nПервый приз — до 8 000 ₽ на любые максимум две услуги Светланы, включая коррекцию, не более чем за два визита. Это общий предел покрытия на все призовые услуги и визиты. Сумму сверх доступного покрытия клиентка оплачивает отдельно; доплата показывается до подтверждения записи. Коррекцию можно оплатить из оставшегося покрытия либо отдельно. Например, первый визит 6 000 ₽ и коррекция 4 000 ₽: OnWaves оплачивает 8 000 ₽ суммарно, клиентка — 2 000 ₽. Перманент за 8 000 ₽ использует всё покрытие, последующая коррекция оплачивается отдельно. После двух услуг, двух визитов или исчерпания покрытия приз закрывается; остаток не переносится. Снятие старого перманента оплачивается отдельно.\n\nВторой приз — одноразовый купон до 3 500 ₽ на одну выбранную услугу Светланы. При цене ниже номинала OnWaves оплачивает фактическую цену, а остаток сгорает. При цене выше номинала победительница оплачивает разницу; доплата показывается до подтверждения записи. Например, за услугу стоимостью 1 900 ₽ клиентка платит 0 ₽, и после выполненного визита купон считается использованным полностью. При цене 8 000 ₽ OnWaves оплачивает 3 500 ₽, клиентка — 4 500 ₽.\n\nПобедительницам напишут от имени сообщества OnWaves. Победительница сообщает свой номер телефона в личных сообщениях сообщества; приз привязывается к этому номеру. Для доступа к призу и записи нужно подтвердить владение номером текущей сессии. При входе и записи используйте номер, к которому привязан приз. Номер не публикуется в комментариях.\n\nОба призовых купона действуют только при записи через OnWaves и используются по 10 января 2027 года включительно, по Москве. В этот срок должна состояться услуга; по первому призу — оба визита, если выбрано два. Личная договорённость с мастером без записи через OnWaves не является использованием купона.\n\nПризы действуют только у Светланы. Денежная выплата и передача остатка другому человеку не предусмотрены. Призовые права не суммируются с приветственным купоном 500 ₽ и скидкой первых пяти. Отзыв и фото результата не являются условием получения. Обычные ноябрьские скидки действуют по своим срокам.\n\nОтмена до оказания услуги освобождает резерв в пределах срока приза. Неявка приостанавливает право до решения организатора и не создаёт выплату за неоказанную услугу. Порядок ответа победительницы, переноса, замены, резервных участниц и налоговые условия должны быть опубликованы до старта.\n\nЭто подготовленная редакция условий. Начало, порядок выбора и получения, налоговые условия и ссылка на исходный пост ещё уточняются. Кампания пока не опубликована.", "organizerName": "Климова Анна Геннадиевна", "prizes": [{"position": 1, "title": "Услуги максимум за два визита", "maxAmountRub": 8000, "serviceNames": [], "policy": {"version": 2, "capAmountRub": 8000, "maxVisits": 2, "allowClientTopUp": true, "anyMasterService": true, "eligibleServiceIds": [], "excludedServiceIds": [], "bookingEndsAt": "2027-01-10T21:00:00Z", "visitEndsAt": "2027-01-10T21:00:00Z", "description": "До 8 000 ₽ на любые максимум две услуги Светланы, включая коррекцию, не более чем за два визита. Сумму сверх доступного покрытия вы оплачиваете отдельно. После двух услуг или исчерпания покрытия приз закрывается. Снятие старого перманента оплачивается отдельно.", "maxServices": 2}}, {"position": 2, "title": "Одноразовый купон", "maxAmountRub": 3500, "serviceNames": [], "policy": {"version": 2, "capAmountRub": 3500, "maxVisits": 1, "allowClientTopUp": true, "anyMasterService": true, "eligibleServiceIds": [], "excludedServiceIds": [], "bookingEndsAt": "2027-01-10T21:00:00Z", "visitEndsAt": "2027-01-10T21:00:00Z", "description": "Одноразовый купон до 3 500 ₽ на одну выбранную услугу Светланы. Если услуга дешевле, оплачивается её фактическая цена, а остаток сгорает. Если дороже, вы оплачиваете разницу. Купон погашается целиком после выполненного визита.", "maxServices": 1}}], "publicationGaps": ["rules", "dates", "vk_post"]};

describe('Полные условия розыгрыша v2', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiveawayPageComponent, RouterTestingModule],
      providers: [
        { provide: LOCALE_ID, useValue: 'ru' },
        { provide: GiveawaysService, useValue: { getCampaign: () => of({ kind: 'ready', value: campaign }) } },
        { provide: PromoSeatsService, useValue: { readState: () => of({ kind: 'empty', value: null }) } },
        { provide: SeoService, useValue: { update: () => {} } },
        { provide: AnalyticsService, useValue: { trackPage: () => {} } },
        { provide: Store, useValue: { select: () => of(null) } },
      ],
    }).compileComponents();
    TestBed.inject(ActivatedRoute).snapshot.data = { giveawayPreview: true };
  });

  it('показывает условия двух призов, согласованные сроки и блокирует участие в черновике', () => {
    const fixture = TestBed.createComponent(GiveawayPageComponent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelectorAll('h1').length).toBe(1);
    expect(root.querySelectorAll('.gw-prizes section').length).toBe(2);
    expect(root.textContent).toContain('максимум две услуги');
    expect(root.textContent).toContain('включая коррекцию');
    expect(root.textContent).toContain('Сумму сверх доступного покрытия');
    expect(root.querySelector('#gw-publication-gaps')).not.toBeNull();
    expect(root.textContent).toContain('победительница оплачивает разницу');
    expect(root.textContent).toContain('9 ноября');
    expect(root.textContent).toContain('21:00 МСК');
    expect(root.textContent).toContain('10 ноября');
    expect(root.textContent).toContain('12:00 МСК');
    expect(root.textContent).toContain('по 10 января 2027 года включительно');
    expect(root.querySelector('a[href*="wall"]')).toBeNull();
    expect(root.querySelectorAll('#rules p').length).toBeGreaterThan(5);
    const qa = (window as unknown as { __karma__?: { config: { args: string[] } } }).__karma__;
    if (qa?.config.args.includes('gw-ui')) {
      const styles = Array.from(document.head.querySelectorAll('style')).filter(style => style.textContent?.includes('.gw-page'))
        .map(style => style.outerHTML).join('');
      const html = '<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
        + '<link rel="stylesheet" href="browser/styles.css">' + styles + '</head><body>' + root.outerHTML + '</body></html>';
      const bytes = new TextEncoder().encode(html);
      console.log('GW_UI_HTML:' + btoa(Array.from(bytes, b => String.fromCharCode(b)).join('')));
    }
  });
});
