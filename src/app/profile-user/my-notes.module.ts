import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MyNotesComponent } from './my-notes/my-notes.component';
import { CommonComponentsModule } from '../common/common.module';
import { UIModule } from '../ui/ui.module';

/** Ленивый чанк `/profile-user/:id` — список записей пользователя (только для авторизованных). */
@NgModule({
  declarations: [MyNotesComponent],
  imports: [
    CommonModule,
    FormsModule,
    CommonComponentsModule,
    UIModule,
    RouterModule.forChild([{ path: ':id', component: MyNotesComponent }]),
  ],
})
export class MyNotesModule {}
