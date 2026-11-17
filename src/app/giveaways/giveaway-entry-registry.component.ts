import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { firstValueFrom, timeout } from 'rxjs';
import { GiveawayAdminCampaign } from '../DTO/views/giveaway/giveaway';
import { GiveawayEntriesService, GiveawayEntryPage } from '../../services/giveaway-entries.service';

@Component({
  selector: 'app-giveaway-entry-registry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './giveaway-entry-registry.component.html',
  styles: [`
    .filters, .paging { display: flex; align-items: end; flex-wrap: wrap; gap: 10px; margin: 12px 0; }
    label { display: grid; gap: 4px; } select { min-height: 44px; }
    .rows { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 10px; }
    article { border: 1px solid #cbe2e3; border-radius: 14px; padding: 12px; overflow-wrap: anywhere; }
    article p { margin: 6px 0; }
    button { min-height: 44px; border: 1px solid #8eacb0; border-radius: 22px; padding-inline: 16px; color: #005763; background: white; }
    button:disabled { opacity: .55; }
  `],
})
export class GiveawayEntryRegistryComponent implements OnChanges {
  @Input({ required: true }) campaign!: GiveawayAdminCampaign;
  @Output() published = new EventEmitter<void>();
  rows: GiveawayEntryPage | null = null;
  source = '';
  loading = true;
  busy = false;
  confirming = false;
  error = '';
  private request = 0;

  constructor(private api: GiveawayEntriesService, private destroy: DestroyRef) {}

  ngOnChanges(): void { this.source = ''; this.confirming = false; this.load(); }

  load(page = 1): void {
    const generation = ++this.request;
    this.loading = true;
    this.error = '';
    this.api.registry(this.campaign.code, page, this.source).pipe(timeout(12_000), takeUntilDestroyed(this.destroy)).subscribe({
      next: rows => {
        if (generation !== this.request) return;
        this.rows = rows;
        this.loading = false;
      },
      error: () => {
        if (generation !== this.request) return;
        this.rows = null;
        this.error = 'Не удалось загрузить заявки.';
        this.loading = false;
      },
    });
  }

  async download(): Promise<void> {
    this.busy = true;
    this.error = '';
    try {
      const file = await firstValueFrom(this.api.export(this.campaign.code).pipe(timeout(30_000)));
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = this.campaign.code + '-entries.csv';
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) { this.error = this.message(e, 'Не удалось выгрузить список.'); }
    finally { this.busy = false; }
  }

  async publish(): Promise<void> {
    this.busy = true;
    this.error = '';
    try {
      await firstValueFrom(this.api.publish(this.campaign.code, this.campaign.version).pipe(timeout(12_000)));
      this.confirming = false;
      this.published.emit();
    } catch (e) { this.error = this.message(e, 'Не удалось подтвердить публикацию. Обновите страницу.'); }
    finally { this.busy = false; }
  }

  get allPrizesAssigned(): boolean { return this.campaign.slots.length >= 2 && this.campaign.slots.every(slot => slot.assigned); }

  private message(e: unknown, fallback: string): string {
    return e instanceof HttpErrorResponse && typeof e.error?.message === 'string' ? e.error.message : fallback;
  }
}
