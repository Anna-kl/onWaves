import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaEditSharedModule } from './ba-edit-shared.module';
import { BAEditComponent } from './baedit.component';
import { MainProfileComponent } from './components/main-profile/main-profile.component';
import { PromoComponent } from './components/promo/promo.component';
import { PromoTemplateComponent } from './components/promo/promo-template.component';
import { PromoEditorComponent } from './components/promo/promo-editor.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { UslugiComponent } from './components/uslugi/uslugi.component';
import { GalereyaComponent } from './components/galereya/galereya.component';
import { GrafikComponent } from './components/grafik/grafik.component';
import { OplataComponent } from './components/oplata/oplata.component';
import { RubricComponent } from './components/rubric/rubric.component';
import { ArendaComponent } from './components/uslugi/arenda/arenda.component';
import { Arenda2Component } from './components/uslugi/arenda2/arenda2.component';

/**
 * Ленивый чанк раздела `/ba-edit/*` — кабинет редактирования бизнес-профиля.
 * Раздел закрыт profileEditGuard (гард навешен на маршрут в AppRoutingModule),
 * то есть рекламный и поисковый трафик сюда не попадает никогда — а раньше его
 * код ехал в главном бандле.
 *
 * Пути относительны префикса `ba-edit`, который навешивается в AppRoutingModule
 * через loadChildren.
 */
const routes: Routes = [
  {
    path: ':id',
    component: BAEditComponent,
    children: [
      { path: '', component: MainProfileComponent },
      { path: 'galereya', component: GalereyaComponent },
      { path: 'uslugi', component: UslugiComponent },
      { path: 'promo', component: PromoComponent },
      { path: 'promo/template', component: PromoTemplateComponent },
      { path: 'promo/edit', component: PromoEditorComponent },
      { path: 'promo/edit/:offerId', component: PromoEditorComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'rubric', component: RubricComponent },
      { path: 'schedule', component: GrafikComponent },
      { path: 'oplata', component: OplataComponent },
      { path: 'arenda-hour', component: ArendaComponent },
      { path: 'arenda-service', component: Arenda2Component },
    ],
  },
];

@NgModule({
  imports: [BaEditSharedModule, RouterModule.forChild(routes)],
})
export class BaEditModule {}
