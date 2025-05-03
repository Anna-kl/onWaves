import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {selectIdChecedClient} from "./idClient.state";

@Injectable({
  providedIn: 'root'
})
export class IdClientService {

  checedIdClientBaOrMainProfile$: Observable<any> | undefined;
  checedId: any | undefined;
  constructor(private store$: Store<any>) {
    this.store$.pipe(select(selectIdChecedClient))
      .subscribe((idClient=>this.checedId=idClient));


    // this.tokenStoreMainProfileClient$.subscribe(data=>console.log(data));
    // this.profileStoreMainProfileClient$.subscribe(data=>console.log(data.id));

  }


}
