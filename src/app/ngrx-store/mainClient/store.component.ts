import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {selectProfileMainClient, selectTokenMainClient} from "./store.select";
import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
})
//это образец !! в модулях его нет
export class StoreComponent{
  tokenStoreMainProfileClient$: Observable<string>;
  profileStoreMainProfileClient$: Observable<IViewBusinessProfile|null>;
  constructor(private store$: Store<any>) {
    this.tokenStoreMainProfileClient$ = this.store$.select(selectTokenMainClient)
    this.profileStoreMainProfileClient$ = this.store$.select(selectProfileMainClient);
  }

  // this.store$.dispatch(ProfileClientAction.getActionProfileClient({ token: this.token, profile:[] }))
}
