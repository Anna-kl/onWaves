import {RouterModule, Routes} from "@angular/router";

import {NgModule} from "@angular/core";
import {profileEditGuard} from "../guards/profile-edit.guard";
import {BAEditComponent} from "./baedit.component";
import {MainProfileComponent} from "./components/main-profile/main-profile.component";
import {RubricComponent} from "./components/rubric/rubric.component";
import {ContactsComponent} from "./components/contacts/contacts.component";
import {UslugiComponent} from "./components/uslugi/uslugi.component";
import {GalereyaComponent} from "./components/galereya/galereya.component";
import {GrafikComponent} from "./components/grafik/grafik.component";
import {OplataComponent} from "./components/oplata/oplata.component";
import {ReviewsComponent} from "./profilebisacc/reviews/reviews.component";
import {ProfileBasicComponent} from "./profilebisacc/profilebisacc.component";
import {ProfileBAInfoComponent} from "./profilebisacc/profile-bainfo/profile-bainfo.component";
import {ArendaComponent} from "./components/uslugi/arenda/arenda.component";
import {Arenda2Component} from "./components/uslugi/arenda2/arenda2.component";
import { LentaComponent } from "../common/profile/lenta/lenta.component";
import { AddPostComponent } from "../common/profile/addPost/addPost.component";

const routes: Routes = [
  // Без guard'а страница редактирования бизнес-профиля была доступна неавторизованным
  // пользователям напрямую по ссылке /ba-edit/:id — добавлена проверка авторизации.
  { path:'ba-edit/:id', component: BAEditComponent, canActivate: [profileEditGuard], children: [
      {path: '',     component: MainProfileComponent},

      {path: 'galereya', component: GalereyaComponent},
      {path: 'uslugi', component: UslugiComponent},
      {path: 'contacts', component: ContactsComponent},
      {path: 'rubric',  component: RubricComponent},
      {path: 'schedule',  component: GrafikComponent},
      {path: 'oplata',  component: OplataComponent},
      {path: 'arenda-hour',  component: ArendaComponent},
          {path: 'arenda-service',  component: Arenda2Component},
    ]
  },
    { path: 'profilebisacc/:id', component: ProfileBasicComponent, children: [
            {path: '',     component: ProfileBAInfoComponent},
            {path: 'reviews',  component: ReviewsComponent},
            {path: 'lenta', component: LentaComponent},
            {path: 'add-post', component: AddPostComponent}
        ] },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class ProfileBAEditRouting { }
