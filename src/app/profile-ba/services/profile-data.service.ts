import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";
import {IViewAuthProfile} from "../../DTO/views/profile/IViewAuthProfile";
import {IGroupWithSubGroups} from "../../DTO/views/services/IGroupWithSubGroup";
import {subGroup} from "../../DTO/views/services/IViewSubGroups";
import {IViewAddress} from "../../DTO/views/IViewAddress";
import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";

@Injectable()
export class ProfileDataService {
  private id = new BehaviorSubject<string | null>(null);
  private service = new BehaviorSubject<IGroupWithSubGroups[]>([]);
  private dayId = new BehaviorSubject<string|null>(null);
  private date = new BehaviorSubject<Date|null>(null);
  private profileBA = new BehaviorSubject<IViewBusinessProfile|null>(null);
  private chooseService = new BehaviorSubject<subGroup[]>([]);
  private address = new BehaviorSubject<IViewAddress|null>(null);

  sendId= this.id.asObservable();
  servicesProfile = this.service.asObservable();
  sendDayId = this.dayId.asObservable();
  sendDate = this.date.asObservable();
  sendAddress = this.address.asObservable();
  sendProfileBA = this.profileBA.asObservable();
  sendChooseServices = this.chooseService.asObservable();
  
  transferId(id: string): void{
    this.id.next(id);
  }
  transferServicesProfile(groups: IGroupWithSubGroups[]): void{
    this.service.next(groups);
  }

  transferDate(date: Date|null){
    this.date.next(date);
  }

  transferDayId(id: string){
    this.dayId.next(id);
  }

  transferAddress(address: IViewAddress){
    this.address.next(address);
  }

  transferProfileBA(profileBA: IViewBusinessProfile){
    this.profileBA.next(profileBA);
  }

  transferChooseService(services: subGroup[]){
    this.chooseService.next(services);
  }
}
