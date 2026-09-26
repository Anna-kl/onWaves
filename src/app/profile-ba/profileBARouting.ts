import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProfileBAComponent} from "./profileba/profileba.component";
import {GroupServiceComponent} from "./components/group-service/group-service.component";

import {PageUserBAComponent} from "./components/page-user-ba/page-user-ba.component";
import {ChooseDateTimeComponent} from "./components/choose-date-time/choose-date-time.component";
import {ConfirmRecordComponent} from "./components/confirm-record/confirm-record.component";
import {ReviewsComponent} from "../baedit/profilebisacc/reviews/reviews.component";
import { ConfirmRecord2Component } from "./components/confirm-record2/confirm-record2.component";
import { LentaComponent } from "../common/profile/lenta/lenta.component";
import { PublicProfileResolver } from "./public-profile.resolver";

const routes: Routes = [
  // { path:'profile-ba/:id', component: ProfileBAComponent, children: [
  //     { path: '',     component: PageUserBAComponent},
  //     // {path: 'choose-service',     component: GroupServiceComponent},
  //     {path: 'choose-date',     component: ChooseDateTimeComponent},
  //     {path: 'confirm-record',     component: ConfirmRecordComponent},
  //     {path: 'reviews',     component: ReviewsComponent},
  //   ]
  // },
  // dynamicSeo: title/description/og:image страница ставит сама, когда придёт
  // профиль с бэка (см. page-user-ba). AppComponent по такому роуту трогает
  // только canonical и robots — иначе затёр бы уже выставленные теги.
  { path:':id', component: ProfileBAComponent, data: { dynamicHit: true, dynamicSeo: true }, resolve: { publicProfile: PublicProfileResolver }, children: [
      { path: '',     component: PageUserBAComponent},
      { path: 'lenta',     component: LentaComponent},
    ]},
  // Шаги воронки записи. Индексировать нечего: содержимое зависит от выбранной
  // услуги и живых слотов, а публичная ценность вся в карточке мастера.
      {path: ':id/choose-service',     component: GroupServiceComponent, data: { noindex: true, title: 'Выбор услуги | OnWaves' }},
  {path: ':id/choose-date',     component: ChooseDateTimeComponent, data: { noindex: true, title: 'Выбор даты и времени | OnWaves' }},
      {path: ':id/confirm-record',     component: ConfirmRecordComponent, data: { noindex: true, title: 'Подтверждение записи | OnWaves' }},
      {path: ':id/reviews',     component: ReviewsComponent, data: { noindex: true, title: 'Отзывы | OnWaves' }},
      {path: ':id/confirm-record2',     component: ConfirmRecord2Component, data: { noindex: true, title: 'Подтверждение записи | OnWaves' }},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class ProfileBARouting { }
