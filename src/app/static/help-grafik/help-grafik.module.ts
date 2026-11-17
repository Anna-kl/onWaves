import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HelpGrafikComponent } from './help-grafik.component';

@NgModule({
  declarations: [HelpGrafikComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: HelpGrafikComponent,
      data: {
        title: 'Как настроить график работы мастера | OnWaves',
        description: 'Постоянный график, часы на одну дату и закрытие занятого времени: ' +
          'короткая инструкция для мастеров OnWaves со скриншотами и PDF.',
        ogType: 'article',
      },
    }]),
  ],
})
export class HelpGrafikModule {}
