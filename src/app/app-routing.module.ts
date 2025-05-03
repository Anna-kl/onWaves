
import { NgModule } from '@angular/core';
import {provideRouter, RouterModule, Routes, withHashLocation} from '@angular/router';
import { MainPageComponent } from 'src/app/pages/main-page.component';

import { GrafikComponent } from './baedit/components/grafik/grafik.component';
import { OplataComponent } from './baedit/components/oplata/oplata.component';

import { GalereyaComponent } from './baedit/components/galereya/galereya.component';

import {MyNotesComponent} from "./profile-user/my-notes/my-notes.component";
import {CabinetBAComponent} from "./profile-ba/cabinet-ba/cabinet-ba.component";
import { HelpComponent } from './static/help/help.component';
import { SettingsComponent } from './profile-user/settings/settings.component';
import { HelpQuestionComponent } from './static/help-question/help-question.component';
import { HelpQuestionsAnswerComponent } from './static/help-questions-answer/help-questions-answer.component';
import { ResultComponent } from './search/result/result.component';
import { ExtsearchComponent } from './search/extsearch/extsearch.component';
import {OserviceComponent} from "./static/oservice/oservice.component";
import {PravilaComponent} from "./static/pravila/pravila.component";
import {PersonalPageUserComponent} from "./profile-user/personal-page-user/personal-page-user.component";
import { StranicaComponent } from './static/stranica/stranica.component';

import {NotificationPageComponent} from "./components/mesages/notification-page/notification-page.component";

import { UslugisComponent } from './profile-ba/uslugis/uslugis.component';
import { MobmenuComponent } from './ui/footer/mobmenu/mobmenu.component';

import { Uslugis2Component } from './profile-ba/uslugis2/uslugis2.component';
import { Mobmenu2Component } from './ui/footer/mobmenu2/mobmenu2.component';
import {NotificationsComponent} from "./ui/header/notifications/notifications.component";
import { LowermenuComponent } from './static/lowermenu/lowermenu.component';

import { TypographyComponent } from './static/typography/typography.component';
import { DayrentComponent } from './profile-ba/dayrent/dayrent.component';

import {MainRubricComponent} from "./services/main-rubric/main-rubric.component";
import { ReviewsComponent } from './baedit/profilebisacc/reviews/reviews.component';

import { PoliciesComponent } from './static/policies/policies.component';
import {AlbumPhoneComponent} from "./components/phone/album-phone/album-phone.component";
import {FotoPhoneComponent} from "./components/phone/foto-phone/foto-phone.component";
import { LandingPageComponent } from './common/LandingPage/LandingPage.component';
import { LandingVersion2Component } from './pages/landingVersion2/landingVersion2.component';
import { PageClient1Component } from './maks/pageClient1/pageClient1.component';
import { PageClient2Component } from './maks/pageClient2/pageClient2.component';
import { LentaComponent } from './common/profile/lenta/lenta.component';
import { ChatMainComponent } from './pages/chat-main/chat-main.component';


const routes: Routes = [

    { path: '', component: MainPageComponent },


    {path: 'cabinet-ba', component: CabinetBAComponent },

  { path: 'common/albums-phone', component: AlbumPhoneComponent},
  { path: 'common/foto-phone', component: FotoPhoneComponent},
  { path: 'grafik/:id', component: GrafikComponent },
  { path: 'profile-user/:id', component: MyNotesComponent },
  { path: 'oplata/:id', component: OplataComponent },
  // { path: 'uslugi/:id', component: UslugiComponent },
  { path: 'galereya/:id', component: GalereyaComponent },
  { path: 'static/help', component: HelpComponent },
  { path: 'static/settings', component: SettingsComponent },
  { path: 'static/helpQuestion', component: HelpQuestionComponent },
  { path: 'static/helpQuestionAnswer', component: HelpQuestionsAnswerComponent},
  { path: 'search/extsearch/:search', component: ExtsearchComponent},
  { path: 'search/result', component: ResultComponent},
  { path: 'static/oservice', component: OserviceComponent},

  { path: 'static/pravila', component: PravilaComponent},
  { path: 'page-user/:id', component: PersonalPageUserComponent},
  { path: 'static/stranica', component: StranicaComponent},
  { path: 'notification', component: NotificationPageComponent},
  { path: 'static/notifications', component: NotificationsComponent},
  { path: 'profile-ba/rubric', component: MainRubricComponent},
  { path: 'profile-ba/uslugis', component: UslugisComponent},
  { path: 'profile-ba/mobmenu', component: MobmenuComponent},
  { path: 'profile-ba/uslugis2', component: Uslugis2Component},
  { path: 'profile-ba/mobmenu2', component: Mobmenu2Component},
  { path: 'static/lowermenu', component: LowermenuComponent},

  { path: 'static/typography', component: TypographyComponent},
  { path: 'profile-ba/dayrent', component: DayrentComponent},
  { path: 'landing', component: LandingPageComponent},
  { path: 'landing2', component: LandingVersion2Component},
  { path: 'search/extsearch', component: ExtsearchComponent},
  { path: 'static/policies', component: PoliciesComponent},
  { path: 'clients', component: PageClient1Component},
  { path: 'chat-page', component: ChatMainComponent},


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
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers:[provideRouter(routes) ]
})
export class AppRoutingModule {
}
