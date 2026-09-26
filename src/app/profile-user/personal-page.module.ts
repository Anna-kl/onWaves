import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PersonalPageUserComponent } from './personal-page-user/personal-page-user.component';
import { ReviewsUserComponent } from './components/reviews-user/reviews-user.component';
import { CommonComponentsModule } from '../common/common.module';
import { UIModule } from '../ui/ui.module';

/** Ленивый чанк `/page-user/:id` — личная страница пользователя. */
@NgModule({
  declarations: [PersonalPageUserComponent, ReviewsUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    CommonComponentsModule,
    UIModule,
    RouterModule.forChild([{ path: ':id', component: PersonalPageUserComponent }]),
  ],
})
export class PersonalPageModule {}
