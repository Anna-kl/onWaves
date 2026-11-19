import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { PromotionPublicationsComponent } from './promotion-publications.component';

@Component({standalone:true,imports:[CommonModule,PromotionPublicationsComponent],
  template:`<main class="promotion-terms"><h1>Условия предложения</h1><app-promotion-publications placement="terms" [publicationId]="id$ | async"></app-promotion-publications><p>Для уже оформленной записи действуют условия, сохранённые при её подтверждении.</p></main>`,
  styles:[`.promotion-terms{max-width:1100px;margin:130px auto 70px;padding:20px}`]})
export class PromotionTermsComponent {
  readonly id$=this.route.paramMap.pipe(map(params=>params.get('id')));
  constructor(private route:ActivatedRoute){}
}
