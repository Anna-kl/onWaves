import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { finalize, take } from 'rxjs';
import { GiveawayCampaign, GiveawayFeaturedParticipant, GiveawayFeaturedPost } from '../DTO/views/giveaway/giveaway';
import { GiveawaysService } from '../../services/giveaways.service';
import { CommonComponentsModule } from '../common/common.module';

@Component({selector:'app-giveaway-featured-post',standalone:true,imports:[CommonModule,RouterModule,CommonComponentsModule],
  templateUrl:'./giveaway-featured-post.component.html',styleUrls:['./giveaway-featured-post.component.scss']})
export class GiveawayFeaturedPostComponent implements OnChanges {
  @Input() campaign!: GiveawayCampaign;
  imageFailed=false; videoFailed=false; loadingMore=false; registryError=false;
  participants:GiveawayFeaturedParticipant[]=[];
  nextAfter:number|null=null;
  private revision='';
  constructor(private giveaways:GiveawaysService) {}
  get post():GiveawayFeaturedPost {return this.campaign.featuredPost!;}
  get published():boolean {return this.campaign.phase==='results_published';}
  get prizes(){return [...this.campaign.prizes].sort((a,b)=>a.position-b.position);}
  get status():string {
    if(this.published)return 'Итоги розыгрыша';
    if(this.campaign.phase==='awaiting_results')return 'Приём заявок завершён';
    if(this.campaign.phase==='active')return 'Приём заявок открыт';
    return 'Скоро начнём';
  }
  winner(position:number){return this.post.winners.find(w=>w.position===position);}
  ngOnChanges():void {
    const key=[this.campaign.code,this.campaign.version,this.campaign.phase,this.post?.version,this.post?.participants.totalCount].join(':');
    if(key===this.revision)return;
    this.revision=key;this.imageFailed=false;this.videoFailed=false;this.registryError=false;
    this.participants=this.post?.participants.items??[];this.nextAfter=this.post?.participants.nextAfter??null;
  }
  more():void {
    if(this.loadingMore||this.nextAfter===null)return;
    this.loadingMore=true;this.registryError=false;const revision=this.revision;
    this.giveaways.featuredParticipants(this.campaign.code,this.nextAfter).pipe(take(1),finalize(()=>this.loadingMore=false)).subscribe({
      next:page=>{if(revision!==this.revision)return;const rows=new Map(this.participants.map(row=>[row.number,row]));
        page.items.forEach(row=>rows.set(row.number,row));this.participants=[...rows.values()];this.nextAfter=page.nextAfter;},
      error:()=>this.registryError=true,
    });
  }
}
