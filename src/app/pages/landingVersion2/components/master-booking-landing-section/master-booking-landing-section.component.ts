import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalRegisterComponent } from 'src/app/components/modals/register-profile/modal-register/modal-register.component';

interface FeatureCard {
  title: string;
  text: string;
}

interface AiCard {
  title: string;
  text: string;
  example: string;
}

interface StepCard {
  title: string;
  text: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface GalleryShot {
  src: string;
  alt: string;
  tag?: string;
  play?: boolean;
}

/**
 * /landing — саморегистрация мастера. Оффер не смешивать с /masters
 * (ручной набор + реклама) и не выносить на главную вместо поиска клиента.
 */
@Component({
  selector: 'app-master-booking-landing-section',
  templateUrl: './master-booking-landing-section.component.html',
  styleUrls: ['./master-booking-landing-section.component.scss'],
})
export class MasterBookingLandingSectionComponent {
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly modalService: NgbModal,
    private readonly sanitizer: DomSanitizer,
  ) {}

  public isIosInstructionOpen = false;
  public isAndroidInstructionOpen = false;
  public isBecomeMasterInfoOpen = false;
  public videoUrl: SafeResourceUrl | null = null;

  public readonly founderMail =
    'mailto:askme@onwaves.online?subject=OnWaves%20—%20предложение%20по%20сервису';

  public readonly categories: string[] = [
    'Красота',
    'Фото и видео',
    'Компьютеры и IT',
    'Бытовые услуги',
    'Строительство',
  ];

  public readonly heroBadges: string[] = [
    'Бесплатно для мастеров',
    '0% скрытых комиссий',
    'ИИ-агенты — в разработке',
  ];

  public readonly features: FeatureCard[] = [
    {
      title: 'Быстрый старт без затрат',
      text: 'Регистрация и кабинет бесплатны. Карта не нужна, с записей ничего не списываем.',
    },
    {
      title: 'Услуги и прайс',
      text: 'Добавляйте услуги, цены и длительность — клиент видит понятный прайс до записи.',
    },
    {
      title: 'График и уведомления',
      text: 'Слоты, записи и напоминания в одном месте. Клиент бронирует сам, вы получаете сигнал.',
    },
    {
      title: 'Витрина работ',
      text: 'Галерея, метка «Продвигаю» и попадание в «Рекомендуем» и «Рядом» на главной.',
    },
  ];

  public readonly aiCards: AiCard[] = [
    {
      title: 'Агент расписания',
      text: 'Будет подбирать слоты, заполнять окна и предупреждать о накладках.',
      example: 'Окно в 14:00 — предложить клиенту из листа ожидания?',
    },
    {
      title: 'Агент клиентов',
      text: 'Будет напоминать о записи, возвращать тех, кто давно не приходил, и закрывать типовые вопросы.',
      example: 'Напомню трём клиентам о записи на завтра',
    },
    {
      title: 'Агент роста',
      text: 'Будет подсказывать, какие работы показать и какие услуги продвигать, чтобы вас находили.',
      example: 'Добавьте 2 фото — профиль покажем чаще',
    },
  ];

  public readonly steps: StepCard[] = [
    {
      title: 'Зарегистрируйтесь',
      text: 'Сначала аккаунт, затем профиль мастера. Карта и оплата не нужны.',
    },
    {
      title: 'Настройте услуги',
      text: 'Прайс, длительность и график — клиент видит свободное время.',
    },
    {
      title: 'Принимайте записи',
      text: 'Клиенты бронируют онлайн 24/7, вам приходит уведомление.',
    },
    {
      title: 'Продвигайтесь',
      text: 'Загрузите работы — страница попадает в рекомендации рядом с клиентом.',
    },
  ];

  public readonly promoPoints: string[] = [
    'Галерея фото и видео ваших работ',
    'Метка «Продвигаю» для приоритетных услуг',
    'Показ в разделах «Рекомендуем» и «Рядом»',
    'Понятный профиль: цены, слоты, отзывы',
  ];

  public readonly gallery: GalleryShot[] = [
    {
      src: '/assets/img/calculator/ceiling-matte.jpg',
      alt: 'Пример работы в галерее мастера',
      tag: 'Продвигаю',
    },
    {
      src: '/assets/img/calculator/ceiling-glossy.jpg',
      alt: 'Видео работы в галерее',
      tag: 'Продвигаю',
      play: true,
    },
    {
      src: '/assets/img/calculator/ceiling-fabric.jpg',
      alt: 'Фото работы',
    },
    {
      src: '/assets/img/calculator/lighting-spotlights.jpg',
      alt: 'Фото работы',
    },
    {
      src: '/assets/img/calculator/ceiling-floating.jpg',
      alt: 'Фото работы',
      tag: 'Продвигаю',
    },
    {
      src: '/assets/img/calculator/lighting-line.jpg',
      alt: 'Фото работы',
    },
  ];

  public readonly themPoints: string[] = [
    'Абонплата и пакеты «за всё сразу»',
    'Комиссия с каждой записи',
    'Скрытые платежи и доплаты',
    'Шаблон без доработок под вас',
  ];

  public readonly usPoints: string[] = [
    '0 ₽ за подключение и кабинет',
    '0% комиссий с ваших записей',
    'Никаких скрытых списаний',
    'Доработки под ваш запрос',
  ];

  public readonly faqs: FaqItem[] = [
    {
      q: 'Это правда бесплатно?',
      a: 'Да. Регистрация, страница, онлайн-запись и кабинет бесплатны. Карта и абонплата не нужны.',
    },
    {
      q: 'Есть ли комиссия с записей?',
      a: 'Нет. OnWaves не берёт процент с записи и не списывает скрытые платежи — то, что вы зарабатываете, остаётся вашим.',
    },
    {
      q: 'Каким мастерам подходит?',
      a: 'Любым: красота, фото и видео, IT, бытовые услуги, ремонт и строительство. Мы рады мастеру любой профессии.',
    },
    {
      q: 'Нужно ли скачивать приложение?',
      a: 'Нет. OnWaves — PWA: откройте сайт на телефоне и добавьте на главный экран. Работает как обычное приложение.',
    },
    {
      q: 'Как быстро можно начать?',
      a: 'Около 10 минут: зарегистрируйтесь, создайте профиль мастера, добавьте услуги и график — и можно принимать записи.',
    },
    {
      q: 'Можно ли запросить доработку?',
      a: 'Да. Сервис развивает основатель лично. Не хватает функции — напишите на askme@onwaves.online, разберём и доработаем.',
    },
  ];

  public openBecomeMasterInfo(): void {
    this.isBecomeMasterInfoOpen = true;
  }

  public closeBecomeMasterInfo(): void {
    this.isBecomeMasterInfoOpen = false;
  }

  public registerFromInfoModal(): void {
    this.closeBecomeMasterInfo();
    this.modalService.open(ModalRegisterComponent);
  }

  public scrollTo(id: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  public playVideo(): void {
    if (!isPlatformBrowser(this.platformId) || this.videoUrl) {
      return;
    }
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/muGywqkVs70?autoplay=1&rel=0',
    );
  }

  public onInstallInstructionClick(platform: string): void {
    if (platform === 'iOS') {
      this.isIosInstructionOpen = !this.isIosInstructionOpen;
      return;
    }
    if (platform === 'Android') {
      this.isAndroidInstructionOpen = !this.isAndroidInstructionOpen;
    }
  }
}
