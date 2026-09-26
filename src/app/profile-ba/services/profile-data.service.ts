import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";
import {IViewAuthProfile} from "../../DTO/views/profile/IViewAuthProfile";
import {IGroupWithSubGroups} from "../../DTO/views/services/IGroupWithSubGroup";
import {subGroup} from "../../DTO/views/services/IViewSubGroups";
import {IViewAddress} from "../../DTO/views/IViewAddress";
import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";
import {IWorkLocation} from "../../DTO/views/IWorkLocation";

@Injectable()
export class ProfileDataService {
  private id = new BehaviorSubject<string | null>(null);
  private service = new BehaviorSubject<IGroupWithSubGroups[]>([]);
  private dayId = new BehaviorSubject<string|null>(null);
  private date = new BehaviorSubject<Date|null>(null);
  private profileBA = new BehaviorSubject<IViewBusinessProfile|null>(null);
  private chooseService = new BehaviorSubject<subGroup[]>([]);
  private address = new BehaviorSubject<IViewAddress|null>(null);
  private bookingAvailable = new BehaviorSubject<boolean>(false);
  // Бэк отдаёт GET /work-location массивом (по одной записи на формат) — храним массив.
  private workLocation = new BehaviorSubject<IWorkLocation[]>([]);

  sendId= this.id.asObservable();
  servicesProfile = this.service.asObservable();
  sendDayId = this.dayId.asObservable();
  sendDate = this.date.asObservable();
  sendAddress = this.address.asObservable();
  sendProfileBA = this.profileBA.asObservable();
  sendChooseServices = this.chooseService.asObservable();
  canBook$ = this.bookingAvailable.asObservable();
  sendWorkLocation = this.workLocation.asObservable();

  transferWorkLocation(workLocations: IWorkLocation[] | null): void {
    this.workLocation.next(workLocations ?? []);
  }
  
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

  transferCanBook(canBook: boolean){
    this.bookingAvailable.next(canBook);
  }

  /** Сброс данных черновика записи (внутренняя «шина» между экранами выбора). */
  clearBookingState(): void {
    this.id.next(null);
    this.service.next([]);
    this.dayId.next(null);
    this.date.next(null);
    this.profileBA.next(null);
    this.chooseService.next([]);
    this.address.next(null);
    this.bookingAvailable.next(false);
  }
}
