import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProfileDataService} from "../../services/profile-data.service";
import {PaymentForType} from "../../../DTO/enums/paymentForType";
import {IGroupWithSubGroups} from "../../../DTO/views/services/IGroupWithSubGroup";
import {Group} from "../../../DTO/views/services/IViewGroups";
import {Tutorial} from "../sliderba/sliderba.component";
import {subGroup} from "../../../DTO/views/services/IViewSubGroups";
import {DictionaryService} from "../../../../services/dictionary.service";
import {Observable, Subscription} from "rxjs";
import {getAddressProfile} from "../../../../helpers/common/address";
import {IViewCoordinates} from "../../../DTO/views/profile/IViewCoordinates";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-page-user-ba',
  templateUrl: './page-user-ba.component.html',
  styleUrls: ['./page-user-ba.component.css'],
  providers: [DictionaryService]
})
export class PageUserBAComponent implements OnInit {
  id: string|null = null;
  groupShow: IGroupWithSubGroups[] = [];
  groups: Group[] = [];
  isEdit: boolean = false;
  @Output() onChecked = new EventEmitter();
  tutorials!: Tutorial[];
  responsiveOptions!: any[];
  protected readonly PaymentForType = PaymentForType;
  services: subGroup[] = [];
  openOrNot: any; //для вспылвающего меню при нажатии- записаться Онлайн
  lat = 0;
  lng = 0;
  SubscruptionBA: Subscription|null = null;
  geoPoint$: Observable<IViewCoordinates|null> = new Observable<IViewCoordinates | null>();
  profile: IViewBusinessProfile | null = null;
  constructor(private _profileData: ProfileDataService,
              private _meta: Meta,
              private _dictionaries: DictionaryService) {

    this.tutorials = [
      {
        image:
          '/assets/img/1.22_b_a/manicure_1.jpg',
      },
      {

        image:
          '/assets/img/1.22_b_a/manicure_2.jpg',
      },
      {

        image:
          '/assets/img/1.22_b_a/manicure_3.jpg',
      },
      {

        image:
          '/assets/img/1.22_b_a/manicure_4.jpg',
      },
      {

        image:
          '/assets/img/1.22_b_a/manicure_5.jpg'
      },
    ];
    this.responsiveOptions = [
      {
        breakpoint: '1600px',
        numVisible: 5,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '460px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '346px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
  checkedService(subGroup: subGroup){
    subGroup.isChecked = !subGroup.isChecked;
    this.onChecked.emit(subGroup);
  }
  ngOnInit(): void {
    this._profileData.sendId.subscribe(result => {
      if (result) {
        this.id = result;

          }
      }
    );
    this.SubscruptionBA = this._profileData.sendProfileBA.subscribe(
      result => {
        if (result){
          this.profile = result;
          this._meta.addTag({ name: 'title', content: this.profile?.name! });
          this._meta.addTag({ name: 'description',
           content: `${this.profile.address ? this.profile.address.city : ''} ${this.profile.about ?? '' }`});
          this.geoPoint$ = this._dictionaries.getPoint(getAddressProfile(result?.address!));
        }
      }
    )
    }

    setServices($event: subGroup[]) {
        this.services = $event;
        this._profileData.transferChooseService(this.services);
    }

    protected readonly getAddressProfile = getAddressProfile;
}
