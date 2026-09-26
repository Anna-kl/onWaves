import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';

import { NotificationPageComponent } from './notification-page.component';
import { CommonComponentsModule } from '../../../common/common.module';

/** Ленивый чанк `/notification` — страница уведомлений (только для авторизованных). */
@NgModule({
  declarations: [NotificationPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    CommonComponentsModule,
    RouterModule.forChild([{ path: '', component: NotificationPageComponent }]),
  ],
})
export class NotificationPageModule {}
