import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalRegisterComponent } from "src/app/components/modals/register-profile/modal-register/modal-register.component";

interface ProcessStep {
  title: string;
  description: string;
}

interface InstallCard {
  platform: string;
  title: string;
  description: string;
  cta: string;
  steps: string[];
}

@Component({
  selector: "app-master-booking-landing-section",
  templateUrl: "./master-booking-landing-section.component.html",
  styleUrls: ["./master-booking-landing-section.component.scss"],
})
export class MasterBookingLandingSectionComponent {
  constructor(private readonly modalService: NgbModal) {}

  public isIosInstructionOpen = false;
  public isAndroidInstructionOpen = false;
  public isBecomeMasterInfoOpen = false;

  public readonly categories: string[] = [
    "Бесплатно для мастеров",
    "Без скрытых платежей",
    "Подключение за 10 минут",
  ];

  public readonly processSteps: ProcessStep[] = [
    {
      title: "Быстрый старт без затрат",
      description:
        "Регистрация и базовые функции бесплатны: вы начинаете работать без комиссии и скрытых списаний.",
    },
    {
      title: "Гибкое управление услугами",
      description:
        "Легко добавляйте услуги, корректируйте цены и длительность, собирайте понятный прайс для клиентов.",
    },
    {
      title: "Оповещения и личное расписание",
      description:
        "Автоуведомления о новых записях и изменениях помогают держать индивидуальный график под контролем.",
    },
  ];

  public readonly installCards: InstallCard[] = [
    {
      platform: "iOS",
      title: "Установка на iPhone",
      description:
        "Откройте платформу в Safari и добавьте ее на экран Домой за 30 секунд.",
      cta: "Инструкция для iOS",
      steps: [
        "Откройте сайт в Safari.",
        "Нажмите Поделиться внизу экрана.",
        "Выберите На экран Домой и подтвердите.",
      ],
    },
    {
      platform: "Android",
      title: "Установка на Android",
      description:
        "При входе на сайт приложение покажет окно снизу с предложением установить сервис на главный экран.",
      cta: "Инструкция для Android",
      steps: [
        "Откройте сайт на Android в браузере Chrome.",
        "Дождитесь окна снизу с предложением установки приложения.",
        "Нажмите Установить и следуйте подсказкам на экране.",
        "После установки запускайте сервис с главного экрана как обычное приложение.",
      ],
    },
  ];

  public onInstallInstructionClick(platform: string): void {
    if (platform === "iOS") {
      this.isIosInstructionOpen = !this.isIosInstructionOpen;
      return;
    }

    if (platform === "Android") {
      this.isAndroidInstructionOpen = !this.isAndroidInstructionOpen;
    }
  }

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
}
