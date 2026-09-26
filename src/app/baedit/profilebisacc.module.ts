import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaEditSharedModule } from './ba-edit-shared.module';
import { ProfileBasicComponent } from './profilebisacc/profilebisacc.component';
import { ProfileBAInfoComponent } from './profilebisacc/profile-bainfo/profile-bainfo.component';
import { ReviewsComponent } from './profilebisacc/reviews/reviews.component';
import { LentaComponent } from '../common/profile/lenta/lenta.component';
import { AddPostComponent } from '../common/profile/addPost/addPost.component';

/**
 * Ленивый чанк раздела `/profilebisacc/*` — «как мой профиль видят клиенты».
 * Открывается только изнутри кабинета (baedit.component, contacts, galereya,
 * column-baprofile), публичных входов нет.
 *
 * Делит объявления с BaEditModule через BaEditSharedModule: webpack вынесет их
 * в общий чанк, который скачается один раз на оба раздела.
 */
const routes: Routes = [
  {
    path: ':id',
    component: ProfileBasicComponent,
    children: [
      { path: '', component: ProfileBAInfoComponent },
      { path: 'reviews', component: ReviewsComponent },
      { path: 'lenta', component: LentaComponent },
      { path: 'add-post', component: AddPostComponent },
    ],
  },
];

@NgModule({
  imports: [BaEditSharedModule, RouterModule.forChild(routes)],
})
export class ProfilebisaccModule {}
