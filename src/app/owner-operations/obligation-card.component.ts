import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OperationObligation } from '../DTO/views/owner-operations/owner-operations';
import { OperationsMoneyPipe } from './operations-format';
@Component({
  selector: 'app-operation-obligation', standalone: true, imports: [CommonModule, OperationsMoneyPipe],
  template: `<article class="obligation" [class.review]="row.dataQuality.length">
    <div class="heading"><div><span class="label">{{row.city || 'OnWaves'}} · {{stateText[row.state] || row.state}}</span><h3>{{row.recipient}}</h3><p>{{row.title}}</p></div>
      <strong>{{row.outstandingKopecks | operationsMoney}}</strong></div>
    <p class="evidence">{{row.attendanceEvidence}}<span *ngIf="row.dueDate"> · Срок {{row.dueDate | date:'dd.MM.yyyy'}}</span></p>
    <div class="actions"><label *ngIf="selectable && row.canPay"><input type="checkbox" [checked]="selected" (change)="toggle.emit(row)"> Включить в перевод</label>
      <button *ngIf="row.canPay" type="button" (click)="pay.emit(row)">Отметить выплату</button>
      <button type="button" class="plain" (click)="expanded = !expanded" [attr.aria-expanded]="expanded">{{expanded ? 'Скрыть' : 'Подробнее'}}</button></div>
    <div *ngIf="expanded" class="details">
      <dl><div><dt>Стоимость услуг</dt><dd>{{row.originalKopecks | operationsMoney}}</dd></div><div><dt>Клиент оплачивает по условиям</dt><dd>{{row.clientPayableKopecks | operationsMoney}}</dd></div>
        <div><dt>Начислено источником</dt><dd>{{row.accruedKopecks | operationsMoney}}</dd></div><div><dt>Уже выплачено</dt><dd>{{row.paidKopecks | operationsMoney}}</dd></div>
        <div *ngFor="let part of row.components"><dt>{{part.label}}</dt><dd>{{part.amountKopecks | operationsMoney}}</dd></div>
        <div><dt>Прогноз по назначенным визитам</dt><dd>{{row.forecastKopecks | operationsMoney}}</dd></div>
        <div *ngIf="row.maxVisits != null"><dt>Право: не более {{row.maxVisits}} визитов</dt><dd>Использовано {{row.usedVisits}}, назначено {{row.reservedVisits}}</dd></div>
        <div *ngIf="row.rightsCapKopecks != null"><dt>Общий предел права</dt><dd>{{row.rightsCapKopecks | operationsMoney}}</dd></div>
        <div *ngIf="row.unscheduledReserveKopecks != null"><dt>Остаток права без даты</dt><dd>{{row.unscheduledReserveKopecks | operationsMoney}}</dd></div>
      </dl><p *ngFor="let reason of row.dataQuality" class="problem">{{reason}}</p><small>Источник: {{row.obligationKey}}</small>
      <small *ngFor="let id of row.recordRefs">Запись: {{id}}</small><small *ngFor="let id of row.campaignRefs">Акция: {{id}}</small>
      <button type="button" class="plain" (click)="history.emit(row.obligationKey)">История этого обязательства</button>
    </div>
  </article>`,
  styleUrls: ['./obligation-card.component.scss']
})
export class ObligationCardComponent {
  @Input() row!: OperationObligation; @Input() selectable = false; @Input() selected = false;
  @Output() pay = new EventEmitter<OperationObligation>(); @Output() toggle = new EventEmitter<OperationObligation>(); @Output() history = new EventEmitter<string>();
  expanded = false;
  stateText: Record<string, string> = { waiting: 'Ждём подтверждения', review: 'Требует сверки', paid: 'Оплачено', partial: 'Частично оплачено', due: 'К оплате', cancelled: 'Отмена / неявка' };
}
