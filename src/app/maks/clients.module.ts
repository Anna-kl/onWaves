import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PageClient1Component } from './pageClient1/pageClient1.component';
import { CommonComponentsModule } from '../common/common.module';

/** Ленивый чанк `/clients` — список клиентов мастера. */
@NgModule({
  declarations: [PageClient1Component],
  imports: [
    CommonModule,
    FormsModule,
    CommonComponentsModule,
    RouterModule.forChild([{ path: '', component: PageClient1Component }]),
  ],
})
export class ClientsModule {}
