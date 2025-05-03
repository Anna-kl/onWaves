import {Observable} from "rxjs";
import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";
import {Store} from "@ngrx/store";
import {selectProfileMainClient, selectTokenMainClient} from "./store.select";
import {Injectable} from "@angular/core";



@Injectable({
  providedIn: 'root'
})
export class StoreService {

tokenStoreMainProfileClient$: Observable<string>;
profileStoreMainProfileClient$: Observable<IViewBusinessProfile|null>;

constructor(private store$: Store<any>) {
  this.tokenStoreMainProfileClient$ = this.store$.select(selectTokenMainClient)
  this.profileStoreMainProfileClient$ = this.store$.select(selectProfileMainClient);

  // this.tokenStoreMainProfileClient$.subscribe(data=>console.log(data));
  // this.profileStoreMainProfileClient$.subscribe(data=>console.log(data.id));

}


}
