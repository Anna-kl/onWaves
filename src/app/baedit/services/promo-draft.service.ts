import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LandingTemplateType } from '../../DTO/enums/landingTemplateType';
import { ILandingOffer } from '../../DTO/views/landing/ILandingOffer';

interface PromoDraftPayload {
  templateType: LandingTemplateType | null;
  offerId: string | null;
  badgeText: string;
  offer: ILandingOffer | null;
}

/**
 * Черновик шага «тексты и фото». Живёт в sessionStorage, как выбор слота в записи.
 * Один ключ на профиль: создание не должно читать черновик редактирования соседней карточки.
 */
@Injectable({ providedIn: 'root' })
export class PromoDraftService {
  templateType: LandingTemplateType | null = null;
  offerId: string | null = null;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  startCreate(templateType: LandingTemplateType, profileId?: string | null): void {
    this.templateType = templateType;
    this.offerId = null;
    if (!profileId) {
      return;
    }
    const stored = this.read(profileId);
    // Соседняя карточка или другой шаблон не подставляются в новую форму.
    if (stored?.offerId || (stored && stored.templateType !== templateType)) {
      this.removeStored(profileId);
    }
  }

  startEdit(offerId: string, templateType: LandingTemplateType): void {
    this.offerId = offerId;
    this.templateType = templateType;
  }

  clear(profileId?: string | null): void {
    this.templateType = null;
    this.offerId = null;
    if (profileId) {
      this.removeStored(profileId);
    }
  }

  write(profileId: string, payload: PromoDraftPayload): void {
    this.templateType = payload.templateType;
    this.offerId = payload.offerId;
    if (!this.canUseStorage()) {
      return;
    }
    try {
      sessionStorage.setItem(this.key(profileId), JSON.stringify(payload));
    } catch {
      /* квота / приватный режим */
    }
  }

  read(profileId: string): PromoDraftPayload | null {
    if (!this.canUseStorage()) {
      return null;
    }
    try {
      const raw = sessionStorage.getItem(this.key(profileId));
      if (!raw) {
        return null;
      }
      return JSON.parse(raw) as PromoDraftPayload;
    } catch {
      return null;
    }
  }

  private removeStored(profileId: string): void {
    if (!this.canUseStorage()) {
      return;
    }
    try {
      sessionStorage.removeItem(this.key(profileId));
    } catch {
      /* квота / приватный режим */
    }
  }

  private canUseStorage(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private key(profileId: string): string {
    return `promo-draft:${profileId}`;
  }
}
