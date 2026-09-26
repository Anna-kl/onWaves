import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

import { StaticRoutingModule } from './static-routing.module';
import { UIModule } from '../ui/ui.module';

import { HelpComponent } from './help/help.component';
import { HelpQuestionComponent } from './help-question/help-question.component';
import { HelpQuestionsAnswerComponent } from './help-questions-answer/help-questions-answer.component';
import { OserviceComponent } from './oservice/oservice.component';
import { PravilaComponent } from './pravila/pravila.component';
import { StranicaComponent } from './stranica/stranica.component';
import { PoliciesComponent } from './policies/policies.component';
import { TypographyComponent } from './typography/typography.component';
import { LowermenuComponent } from './lowermenu/lowermenu.component';
import { FooternComponent } from './footern/footern.component';
import { FaqQuestionComponent } from '../common/faq-question/faq-question.component';
import { SettingsComponent } from '../profile-user/settings/settings.component';
import {
  SubscribeChannelModalComponent,
} from '../profile-user/settings/subscribe-channel-modal/subscribe-channel-modal.component';
import {
  RevokeChannelModalComponent,
} from '../profile-user/settings/revoke-channel-modal/revoke-channel-modal.component';

/**
 * Ленивый чанк для всего раздела `/static/*` — самая крупная и самая
 * изолированная часть приложения (~850 КБ исходников, 11 маршрутов, ни один
 * компонент не встречается в шаблонах за пределами раздела).
 *
 * SubscribeChannelModalComponent открывается из SettingsComponent программно
 * через NgbModal, поэтому объявлен здесь же — в шаблонах он не используется.
 */
@NgModule({
  declarations: [
    HelpComponent,
    HelpQuestionComponent,
    HelpQuestionsAnswerComponent,
    OserviceComponent,
    PravilaComponent,
    StranicaComponent,
    PoliciesComponent,
    TypographyComponent,
    LowermenuComponent,
    FooternComponent,
    FaqQuestionComponent,
    SettingsComponent,
    SubscribeChannelModalComponent,
    RevokeChannelModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    UIModule,
    StaticRoutingModule],
})
export class StaticModule {}
