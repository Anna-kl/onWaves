import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ChatMainComponent } from './chat-main.component';
import { CommonComponentsModule } from '../../common/common.module';

/**
 * Ленивый чанк `/chat-page`. Вместе с компонентом из главного бандла уезжает
 * `@microsoft/signalr` (~48 КБ минифицированного), который нужен только здесь.
 */
@NgModule({
  declarations: [ChatMainComponent],
  imports: [
    CommonModule,
    FormsModule,
    CommonComponentsModule,
    RouterModule.forChild([{ path: '', component: ChatMainComponent }]),
  ],
})
export class ChatModule {}
