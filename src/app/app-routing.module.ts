
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from 'src/app/pages/main-page.component';



import {CabinetBAComponent} from "./profile-ba/cabinet-ba/cabinet-ba.component";
import { ResultComponent } from './search/result/result.component';
import { ExtsearchComponent } from './search/extsearch/extsearch.component';


import { UslugisComponent } from './profile-ba/uslugis/uslugis.component';
import { MobmenuComponent } from './ui/footer/mobmenu/mobmenu.component';

import { Uslugis2Component } from './profile-ba/uslugis2/uslugis2.component';
import { Mobmenu2Component } from './ui/footer/mobmenu2/mobmenu2.component';

import { DayrentComponent } from './profile-ba/dayrent/dayrent.component';

import {MainRubricComponent} from "./services/main-rubric/main-rubric.component";

import {AlbumPhoneComponent} from "./components/phone/album-phone/album-phone.component";
import {FotoPhoneComponent} from "./components/phone/foto-phone/foto-phone.component";
import { LandingVersion2Component } from './pages/landingVersion2/landingVersion2.component';
import { MastersLandingComponent } from './pages/masters-landing/masters-landing.component';
import { redirectAuthenticatedFromLandingGuard } from "./guards/redirect-authenticated-from-landing.guard";
import { profileEditGuard } from "./guards/profile-edit.guard";
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { NetworkAwarePreloadStrategy } from './ssr/network-aware-preload.strategy';


// SEO-поля в data читает AppComponent на каждой навигации (см. collectRouteSeo):
// title/description уходят в теги, noindex закрывает от индексации приватные
// разделы. Публичных страниц у сервиса мало, поэтому у каждой заголовок задан
// вручную под запрос, а не собирается из шаблона.
const routes: Routes = [

    {
      path: "",
      component: MainPageComponent,
      data: {
        title: 'OnWaves — онлайн-запись к мастерам и в салоны красоты',
        description: 'Найдите мастера или салон рядом, посмотрите свободное время ' +
          'и запишитесь онлайн за минуту. Без звонков и комиссий.',
      },
    },
    {
      path: "landing",
      component: LandingVersion2Component,
      canActivate: [redirectAuthenticatedFromLandingGuard],
      data: {
        title: 'Принимайте записи 24/7 бесплатно — без комиссий | OnWaves',
        description: 'Онлайн-запись, график и витрина работ в одном кабинете. ' +
          'Без карты, абонплаты и комиссий с записей. Регистрация бесплатно.',
      },
    },


    // Маркетинговая посадочная под набор мастеров-одиночек: статика без запросов
    // и без гардов, открыта для индексации — на неё ведёт реклама.
    {
      path: "masters",
      component: MastersLandingComponent,
      data: {
        title: 'Страница и реклама для мастеров бесплатно | OnWaves',
        shareTitle: 'Страница и реклама для мастеров бесплатно',
        description: 'Соберу страницу с работами, ценами и онлайн-записью, запущу рекламу на ваш город ' +
          'и оплачу скидку первым клиентам. Для первых 10 мастеров.',
      },
    },

    {path: 'cabinet-ba', component: CabinetBAComponent, canActivate: [profileEditGuard], data: { noindex: true } },

  { path: 'common/albums-phone', component: AlbumPhoneComponent, data: { noindex: true }},
  { path: 'common/foto-phone', component: FotoPhoneComponent, data: { noindex: true }},
  {
    path: 'profile-user',
    data: { noindex: true },
    loadChildren: () => import('./profile-user/my-notes.module').then(m => m.MyNotesModule),
  },
   { path: 'confirm-url/:id', component: ConfirmEmailComponent, data: { noindex: true } },

  // Кабинет редактирования и превью профиля — два ленивых чанка с общими
  // объявлениями (ba-edit-shared.module.ts). Оба раздела за profileEditGuard /
  // доступны только из кабинета, поэтому в главный бандл им ехать незачем.
  {
    path: 'ba-edit',
    canActivate: [profileEditGuard],
    data: { preload: true, noindex: true },
    loadChildren: () => import('./baedit/ba-edit.module').then(m => m.BaEditModule),
  },
  {
    path: 'profilebisacc',
    data: { preload: true, noindex: true },
    loadChildren: () => import('./baedit/profilebisacc.module').then(m => m.ProfilebisaccModule),
  },

  // Старые одиночные URL редактора. Ни одна навигация в коде на них не ведёт,
  // те же экраны живут внутри /ba-edit/:id — оставляем редиректы, чтобы не
  // ломать возможные закладки и не держать ради них отдельные точки монтирования.
  { path: 'grafik/:id', redirectTo: 'ba-edit/:id/schedule' },
  { path: 'oplata/:id', redirectTo: 'ba-edit/:id/oplata' },
  { path: 'galereya/:id', redirectTo: 'ba-edit/:id/galereya' },
  // Весь раздел /static/* вынесен в ленивый чанк — см. static/static.module.ts.
  // Маршрут стоит здесь, в forRoot, то есть раньше catch-all ':id' из
  // ProfileBARouting: литеральный сегмент 'static' выигрывает у параметра.
  {
    path: 'static',
    loadChildren: () => import('./static/static.module').then(m => m.StaticModule),
  },
  // Выдача поиска закрыта от индекса намеренно: это бесконечное множество
  // URL с одним и тем же набором карточек. Индексироваться должны сами
  // карточки мастеров и форма расширенного поиска, а не срезы выдачи.
  { path: 'search/extsearch/:search', component: ExtsearchComponent, data: { noindex: true }},
  { path: 'search/result', component: ResultComponent, data: { noindex: true }},
  {
    path: 'page-user',
    data: { noindex: true },
    loadChildren: () => import('./profile-user/personal-page.module').then(m => m.PersonalPageModule),
  },
  {
    path: 'notification',
    data: { noindex: true },
    loadChildren: () =>
      import('./components/mesages/notification-page/notification-page.module')
        .then(m => m.NotificationPageModule),
  },
  { path: 'profile-ba/rubric', component: MainRubricComponent, canActivate: [profileEditGuard], data: { noindex: true } },
  { path: 'profile-ba/uslugis', component: UslugisComponent, canActivate: [profileEditGuard], data: { noindex: true } },
  { path: 'profile-ba/mobmenu', component: MobmenuComponent, canActivate: [profileEditGuard], data: { noindex: true } },
  { path: 'profile-ba/uslugis2', component: Uslugis2Component, canActivate: [profileEditGuard], data: { noindex: true } },
  { path: 'profile-ba/mobmenu2', component: Mobmenu2Component, canActivate: [profileEditGuard], data: { noindex: true } },
  { path: 'profile-ba/dayrent', component: DayrentComponent, canActivate: [profileEditGuard], data: { noindex: true } },
  {
    path: 'search/extsearch',
    component: ExtsearchComponent,
    data: {
      title: 'Расширенный поиск мастеров и салонов | OnWaves',
      description: 'Подберите мастера по услуге, городу и удобному времени — ' +
        'и запишитесь онлайн без звонков.',
    },
  },
  {
    path: 'clients',
    data: { noindex: true },
    loadChildren: () => import('./maks/clients.module').then(m => m.ClientsModule),
  },
  {
    path: 'chat-page',
    data: { noindex: true },
    loadChildren: () => import('./pages/chat-main/chat.module').then(m => m.ChatModule),
  },


  //{ path: 'static/lowermobmenu', component: LowermenuComponent},
];

// const routes: Routes = [
//   {
//     path: '', component: MainLayoutComponent, children: [
//       {path: '', redirectTo: '/', pathMatch: 'full'},
//       {path: '', component: MainPageComponent},
//       {path: 'product/:id', component: ProductPageComponent},
//       {path: 'cart', component: CartPageComponent}
//     ]
//   },
//   {
//     // path: 'admin', loadChildren: './admin/admin.module#AdminModule'
//     path: 'admin', loadChildren: () => import ('./admin/admin.module').then(m => m.AdminModule)
//   }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    initialNavigation: 'enabledBlocking',
    // Иначе SPA оставляет scrollY с прошлой страницы: с главной карточка
    // мастера открывалась «с середины». 'enabled' — наверх при переходе,
    // назад по истории возвращает прежнюю позицию списка.
    scrollPositionRestoration: 'enabled',
    // Греем только помеченные data.preload разделы, и только в браузере
    // у авторизованного пользователя на нормальном соединении — см. стратегию.
    preloadingStrategy: NetworkAwarePreloadStrategy,
  })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
