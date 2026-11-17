import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntil } from 'rxjs';
import {
  GiveawayAdminCampaign, GiveawayAdminService, GiveawayAdminSlot, GiveawayAssignment, GiveawayLoad,
  GiveawayOwnerAward, GiveawayPreview,
} from '../DTO/views/giveaway/giveaway';
import { prizeDeadline, newIdempotencyKey } from '../../helpers/giveaway';
import { formatRub } from '../../helpers/common/welcome-coupon';
import { GiveawaysService } from '../../services/giveaways.service';
import { OwnerOperationsService } from '../../services/owner-operations.service';
import { giveawayHasVk, giveawayHasWebsite } from '../../helpers/giveaway';
import { GiveawayEntryRegistryComponent } from './giveaway-entry-registry.component';

type AssignmentBody = Parameters<GiveawaysService['assign']>[0];
interface PendingAssignment {
  key: string;
  campaignCode: string;
  slotId: string;
  version: number;
}
const attemptStorage = 'ow-giveaway-pending-assignment';

@Component({
  selector: 'app-giveaway-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, GiveawayEntryRegistryComponent],
  templateUrl: './giveaway-admin.component.html',
  styleUrls: ['./giveaway-admin.component.scss'],
})
export class GiveawayAdminComponent implements OnInit {
  allowed = false;
  campaigns: GiveawayLoad<GiveawayAdminCampaign[]> = { kind: 'loading', value: null };
  history: GiveawayLoad<GiveawayOwnerAward[]> = { kind: 'loading', value: null };
  campaignCode = '';
  slotId = '';
  serviceId = '';
  phone = '';
  entryNumber: number | null = null;
  entryPlatform: 'website' | 'vk' = 'website';
  tab: 'assign' | 'entries' = 'assign';
  evidence = '';
  note = '';
  preview: GiveawayPreview | null = null;
  result: GiveawayAssignment | null = null;
  error: string | null = null;
  notice = '';
  pending = false;
  attempt: PendingAssignment | null = null;
  recovery: 'idle' | 'unknown' | 'missing' = 'idle';
  revokeAward: GiveawayOwnerAward | null = null;
  revokeReason = '';
  private checkedBody: AssignmentBody | null = null;
  private historyRequest = 0;
  readonly money = formatRub;
  readonly labels: Record<string, string> = {
    assigned: 'Ожидает подтверждения номера', available: 'Доступен для записи', reserved: 'Есть запись',
    redeemed: 'Использован', partially_redeemed: 'Использован частично', expired: 'Срок истёк',
    review_required: 'Требуется разбор', revoked: 'Отозван',
    Reserved: 'Запланирован', Released: 'Отменён', Redeemed: 'Выполнен', ReviewRequired: 'Требуется разбор',
    Assigned: 'Назначение', Claimed: 'Получение', Attendance: 'Отметка визита', Revoked: 'Отзыв',
    Resolved: 'Разбор', Paid: 'Компенсация',
  };
  readonly conflicts: Record<string, string> = {
    phone_invalid: 'Укажите российский номер телефона.',
    prize_slot_assigned: 'На это место уже назначен приз.',
    prize_phone_already_awarded: 'На этот номер уже назначен приз в этом розыгрыше.',
    campaign_not_published: 'Кампания ещё не опубликована.',
    prize_policy_incomplete: 'Условия приза заполнены не полностью.',
    prize_service_mismatch: 'Услуга не подходит к выбранному призу.',
    prize_limit_exceeded: 'Цена услуги выше предела приза.',
    not_found: 'Призовое место не найдено.',
  };

  constructor(private giveaways: GiveawaysService, private owner: OwnerOperationsService,
    private route: ActivatedRoute, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    if (!this.owner.browser) return;
    this.owner.access$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(allowed => {
      this.allowed = allowed === true;
      if (!this.allowed) {
        this.phone = this.note = this.evidence = this.revokeReason = '';
        this.entryNumber = null;
        this.revokeAward = null;
        this.result = null;
        this.preview = this.checkedBody = null;
        this.history = { kind: 'loading', value: null };
        this.campaigns = { kind: 'loading', value: null };
        this.error = null;
        this.notice = '';
        this.pending = false;
        return;
      }
      try {
        const stored = JSON.parse(sessionStorage.getItem(attemptStorage) || 'null') as PendingAssignment | null;
        this.attempt = stored?.key && stored.campaignCode && stored.slotId ? stored : null;
      } catch { this.attempt = null; }
      this.campaignCode = this.attempt?.campaignCode || this.route.snapshot.queryParamMap.get('campaign') || '';
      this.slotId = this.attempt?.slotId || '';
      this.tab = !this.attempt && this.route.snapshot.queryParamMap.get('tab') === 'entries' ? 'entries' : 'assign';
      this.reload();
      if (this.attempt) this.recover();
    });
  }

  get campaign(): GiveawayAdminCampaign | null {
    return (this.campaigns.value ?? []).find(item => item.code === this.campaignCode) ?? null;
  }

  get slot(): GiveawayAdminSlot | null {
    return this.campaign?.slots.find(item => item.id === this.slotId) ?? null;
  }
  get websiteEntry(): boolean { return giveawayHasWebsite(this.campaign?.entryMode); }
  get hybrid(): boolean { return this.websiteEntry && giveawayHasVk(this.campaign?.entryMode); }
  get websiteWinner(): boolean { return this.websiteEntry && (!this.hybrid || this.entryPlatform === 'website'); }

  get locked(): boolean {
    return this.pending || this.recovery === 'unknown';
  }

  get normalizedPhone(): string {
    const digits = this.phone.replace(/[^0-9]/g, '');
    return '+7' + (digits.length === 11 ? digits.slice(1) : digits);
  }

  serviceDisabled(service: GiveawayAdminService): boolean {
    return !this.slot || service.price == null || service.price > this.slot.maxAmountRub;
  }

  when(iso?: string | null): string | null {
    return prizeDeadline(iso);
  }

  reload(): void {
    this.campaigns = { kind: 'loading', value: null };
    this.giveaways.adminCampaigns().pipe(takeUntil(this.owner.cleared$), takeUntilDestroyed(this.destroyRef)).subscribe(load => {
      this.campaigns = load;
      if (!this.campaign && !this.attempt) this.campaignCode = load.value?.[0]?.code || '';
      this.loadHistory();
    });
  }

  changeCampaign(): void {
    this.slotId = this.serviceId = '';
    this.entryNumber = null;
    if (!this.websiteEntry) this.tab = 'assign';
    this.resetPreview();
    this.loadHistory();
  }

  loadHistory(): void {
    const request = ++this.historyRequest;
    this.history = { kind: 'loading', value: null };
    if (!this.campaignCode) return;
    this.giveaways.awardHistory(this.campaignCode).pipe(takeUntil(this.owner.cleared$), takeUntilDestroyed(this.destroyRef)).subscribe(load => {
      if (request === this.historyRequest) this.history = load;
    });
  }

  resetPreview(): void {
    this.preview = this.checkedBody = null;
    this.error = null;
  }

  check(): void {
    if (this.locked) return;
    const campaign = this.campaign;
    const slot = this.slot;
    const needsNumber = this.websiteWinner || !!campaign?.configured;
    const hasNumber = Number.isInteger(this.entryNumber) && (this.entryNumber ?? 0) > 0;
    const hasRecipient = (!needsNumber || hasNumber) && (this.websiteWinner || !!this.phone.trim());
    if (!campaign || !slot || (!slot.policy && !this.serviceId) || !hasRecipient) {
      this.error = this.websiteEntry ? 'Выберите приз и укажите номер заявки. Для фиксированного приза выберите услугу.'
        : 'Выберите приз и укажите телефон. Для фиксированного приза выберите услугу.';
      return;
    }
    if (!this.websiteWinner && !campaign.configured && !/^https:\/\/[^\s]+$/i.test(this.evidence.trim())) {
      this.error = 'Вставьте HTTPS-ссылку на опубликованные итоги.';
      return;
    }
    this.pending = true;
    this.resetPreview();
    this.result = null;
    const body: AssignmentBody = {
      campaignCode: campaign.code, prizeSlotId: slot.id, phone: this.phone.trim(),
      entryNumber: this.websiteWinner ? this.entryNumber ?? undefined : undefined,
      vkEntryNumber: campaign.configured && !this.websiteWinner ? this.entryNumber ?? undefined : undefined,
      serviceId: slot.policy ? '00000000-0000-0000-0000-000000000000' : this.serviceId,
      expectedSlotVersion: this.attempt?.version ?? slot.version,
      winnerEvidenceUrl: this.websiteWinner ? '' : this.evidence.trim(), note: this.note.trim(),
    };
    this.giveaways.previewAssignment(body).pipe(takeUntil(this.owner.cleared$), takeUntilDestroyed(this.destroyRef)).subscribe(load => {
      this.pending = false;
      this.preview = load.value;
      this.checkedBody = this.preview && !this.preview.conflict ? body : null;
      const reason = load.value?.conflict;
      this.error = reason ? this.conflicts[reason] || 'Назначение недоступно. Обновите список призов.'
        : load.kind === 'failed' ? load.reason || 'Не удалось проверить назначение.' : null;
    });
  }

  assign(): void {
    if (this.pending || !this.checkedBody) return;
    const body = this.checkedBody;
    if (!this.attempt) {
      this.attempt = { key: newIdempotencyKey(), campaignCode: body.campaignCode, slotId: body.prizeSlotId, version: body.expectedSlotVersion };
      try { sessionStorage.setItem(attemptStorage, JSON.stringify(this.attempt)); } catch { /* Same-page retry remains available. */ }
    }
    this.pending = true;
    this.error = null;
    this.giveaways.assign(body, this.attempt.key).pipe(takeUntil(this.owner.cleared$), takeUntilDestroyed(this.destroyRef)).subscribe(load => {
      this.pending = false;
      if (load.value) {
        this.finish(load.value);
        return;
      }
      if (load.httpStatus && load.httpStatus >= 400 && load.httpStatus < 500 && load.httpStatus !== 408 && load.httpStatus !== 409) {
        this.clearAttempt();
        this.error = load.reason || 'Сервер отклонил назначение.';
        return;
      }
      this.error = load.reason || 'Сервер не подтвердил результат. Проверяем, сохранилось ли назначение.';
      this.recover();
    });
  }

  recover(): void {
    if (!this.attempt || this.pending) return;
    this.recovery = 'unknown';
    this.pending = true;
    this.giveaways.recoverAssignment(this.attempt.key).pipe(takeUntil(this.owner.cleared$), takeUntilDestroyed(this.destroyRef)).subscribe(load => {
      this.pending = false;
      if (load.value) this.finish(load.value);
      else this.recovery = load.kind === 'empty' ? 'missing' : 'unknown';
    });
  }

  clearAttempt(): void {
    this.attempt = null;
    this.recovery = 'idle';
    try { sessionStorage.removeItem(attemptStorage); } catch { /* Storage can be unavailable. */ }
  }

  private finish(result: GiveawayAssignment): void {
    this.clearAttempt();
    this.resetPreview();
    this.phone = this.note = this.slotId = this.serviceId = '';
    this.entryNumber = null;
    this.result = result;
    this.reload();
  }

  revoke(): void {
    if (this.locked || !this.revokeAward || !this.revokeReason.trim()) return;
    this.pending = true;
    this.error = null;
    this.giveaways.revoke(this.revokeAward.awardId, this.revokeReason.trim(), this.revokeAward.version)
      .pipe(takeUntil(this.owner.cleared$), takeUntilDestroyed(this.destroyRef)).subscribe(load => {
        this.pending = false;
        if (load.kind === 'ready') {
          this.revokeAward = null;
          this.revokeReason = '';
          this.notice = 'Назначение отозвано. Место можно назначить заново.';
          this.reload();
        } else this.error = load.reason || 'Не удалось подтвердить отзыв. Обновите историю.';
      });
  }

  copyInstructions(): void {
    const url = this.websiteEntry ? 'https://onwaves.online/giveaways/' + encodeURIComponent(this.campaignCode)
      : 'https://onwaves.online/permanent_ozery';
    const text = 'Вам назначен приз в розыгрыше OnWaves. Откройте ' + url
      + ', войдите по номеру, который указали для розыгрыша. В личном кабинете откройте «Мои выигрыши», выберите услугу и время.';
    navigator.clipboard.writeText(text).then(
      () => this.notice = 'Инструкция скопирована.',
      () => this.notice = text,
    );
  }
}
