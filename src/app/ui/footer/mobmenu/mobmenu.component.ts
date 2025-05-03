import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {StoreService} from "../../../ngrx-store/mainClient/store.service";
import {UserType} from "../../../DTO/classes/profiles/profile-user.model";
@Component({
  selector: 'app-mobmenu',
  templateUrl: './mobmenu.component.html',
  styleUrls: ['./mobmenu.component.scss']
})
export class MobmenuComponent {
  choosedClient:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _storeService : StoreService)
  {
    this._storeService.profileStoreMainProfileClient$.subscribe(data=>this.choosedClient=data);
  }

  goToSearch() {
    this.router.navigate(['/search/extsearch/:search']);
  }

  myNotes(){
    // идет сюда profile-ba/HeaderBAComponent
      if (this.choosedClient) {
        // Главное Меню юзера
        if (this.choosedClient.userType === UserType.User){
          this.router.navigate(['/profile-user', this.choosedClient?.id]);
        } else { // Главное Меню бизнеса
          this.router.navigate(['/notes', this.choosedClient!.id]);
         }}
  }

  goToKabinet() {
    this.router.navigate(['/cabinet-ba']);
  }

  GoToProfile() {
      if (this.choosedClient) {
        // Главное Меню юзера
        if (this.choosedClient.userType === UserType.User) {
          this.router.navigate(['/page-user/', this.choosedClient?.id]);
        } else { // Главное Меню бизнеса
          this.router.navigate(['/profilebisacc/', this.choosedClient!.id]);
        }
      }
    }
}
