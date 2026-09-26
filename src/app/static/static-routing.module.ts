import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HelpComponent } from './help/help.component';
import { HelpQuestionComponent } from './help-question/help-question.component';
import { HelpQuestionsAnswerComponent } from './help-questions-answer/help-questions-answer.component';
import { OserviceComponent } from './oservice/oservice.component';
import { PravilaComponent } from './pravila/pravila.component';
import { StranicaComponent } from './stranica/stranica.component';
import { PoliciesComponent } from './policies/policies.component';
import { TypographyComponent } from './typography/typography.component';
import { LowermenuComponent } from './lowermenu/lowermenu.component';
import { SettingsComponent } from '../profile-user/settings/settings.component';
import { NotificationsComponent } from '../ui/header/notifications/notifications.component';
import { profileEditGuard } from '../guards/profile-edit.guard';

/**
 * Пути здесь заданы без префикса `static/` — он навешивается в AppRoutingModule
 * через `{ path: 'static', loadChildren: ... }`.
 *
 * `settings` и `notifications` живут в других папках, но их URL начинается с
 * `static/`, поэтому маршруты обязаны быть здесь: иначе роутер, зайдя в ленивый
 * `static`, не нашёл бы их и пришлось бы качать чанк впустую перед откатом.
 */
const routes: Routes = [
  {
    path: 'help',
    component: HelpComponent,
    data: {
      title: 'Центр помощи OnWaves — ответы на вопросы',
      description: 'Как записаться, перенести или отменить запись, настроить профиль ' +
        'и график. Ответы на частые вопросы о сервисе OnWaves.',
    },
  },
  { path: 'settings', component: SettingsComponent, canActivate: [profileEditGuard], data: { noindex: true } },
  {
    path: 'helpQuestion',
    component: HelpQuestionComponent,
    data: { title: 'Помощь — вопрос | OnWaves' },
  },
  {
    path: 'helpQuestionAnswer',
    component: HelpQuestionsAnswerComponent,
    data: { title: 'Помощь — ответ | OnWaves' },
  },
  {
    path: 'oservice',
    component: OserviceComponent,
    data: {
      title: 'О сервисе OnWaves — онлайн-запись для мастеров и клиентов',
      description: 'Что такое OnWaves: онлайн-запись без комиссий, личная страница ' +
        'мастера, график и напоминания клиентам.',
    },
  },
  {
    path: 'pravila',
    component: PravilaComponent,
    data: { title: 'Правила сервиса | OnWaves' },
  },
  { path: 'stranica', component: StranicaComponent, data: { noindex: true } },
  { path: 'notifications', component: NotificationsComponent, data: { noindex: true } },
  // Служебные экраны вёрстки — публичного смысла не несут.
  { path: 'lowermenu', component: LowermenuComponent, data: { noindex: true } },
  { path: 'typography', component: TypographyComponent, data: { noindex: true } },
  {
    path: 'policies',
    component: PoliciesComponent,
    data: { title: 'Политика конфиденциальности | OnWaves' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaticRoutingModule {}
