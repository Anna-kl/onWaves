import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";
import {IViewProfileMenu} from "../app/DTO/views/profile/IViewProfileMenu";
import {IViewBusinessProfile} from "../app/DTO/views/business/IViewBussinessProfile";

@Injectable()
export class BusService {
  private token = new BehaviorSubject<IViewProfileMenu|null>(null);
  private user = new BehaviorSubject<IViewProfileMenu|null>(null);
  private chooseProfile = new BehaviorSubject<IViewBusinessProfile|null>(null);
  sendToken = this.token.asObservable();
  userProfile = this.user.asObservable();
  choosedProfile = this.chooseProfile.asObservable();
  constructor() {}

  transferToken(user: IViewProfileMenu|null): void{
    this.token.next(user);
  }

  chooseMainProfile(user: IViewBusinessProfile|null){
    this.chooseProfile.next(user);
  }



}
