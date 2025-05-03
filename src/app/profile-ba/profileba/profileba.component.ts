import {Component, OnInit, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { GroupService } from '../../../services/groupservice';
// import { Service } from '../../services/servicein';
import { Group } from '../../DTO/views/services/IViewGroups';
import { subGroup } from '../../DTO/views/services/IViewSubGroups';

import {ScheduleService} from "../../../services/schedule.service";

import {DictionaryService} from "../../../services/dictionary.service";

import {ProfileDataService} from "../services/profile-data.service";


import {ProfileService} from "../../../services/profile.service";

import { Store, select } from '@ngrx/store';
import { selectProfileMainClient } from 'src/app/ngrx-store/mainClient/store.select';


interface GroupWithSubGroups {
  isOpen: boolean;
  group: Group;
  subGroups: subGroup[];
}

declare var DG: any;
declare var DGWidgetLoader: any;
declare const ymaps: any;
@Component({
  selector: 'app-profileba',
  templateUrl: './profileba.component.html',
  styleUrls: ['./profileba.component.css'],
  providers:[GroupService, ScheduleService, DictionaryService ]

})
export class ProfileBAComponent implements OnInit {
  map: any;
  @ViewChild('yamaps')

  companyId: string | undefined;
  subGroups: subGroup[] = [];
  index: any;
  number: any;
 // businessProfile!: ICardBusinessView;
  scheduleToday: string | undefined = '';
  id: string | null = null;

  constructor(private route: ActivatedRoute,
              private _api: ProfileService,
              private store$: Store,
              private _profileData: ProfileDataService,
              private _router: Router)
  {

  }
  btnProfile: boolean = true;

  setLenta() {
    this.btnProfile = false;
    this._router.navigate([`id/${this.id}/lenta`]);
  }

  setProfile() {
    this.btnProfile = true;
    this._router.navigate([`id/${this.id}`]);
  }

  private createMap(lat: number, lng: number): void {
    if (this.map){
      this.map.panTo([lat, lng], {
        flying: true
      });
    } else {
      this.map = new ymaps.Map('map', {
        center: [lat, lng],
        zoom: 14
      });
    }
    const placeMark = new ymaps.Placemark([lat, lng]);
    this.map.geoObjects.add(placeMark);
  }

  // onAddress($event: IViewAddress){
  //   this._dictionaries.getPoint(getAddressProfile($event)).subscribe(
  //     response => {
  //       ymaps.ready().done(() => this.createMap(response[1], response[0]));
  //     }
  //   );
  // }
  async ngOnInit() {
    let link = this.route.snapshot.paramMap.get('id');
    if (link) {
      this._api.translateLink(link).subscribe(
          result => {
            this.id = result.data;
            this._profileData.transferId(result.data);
          }
      );
    }
    // this._profileData.sendAddress.subscribe(result => {
    //   if (result) {
    //     this.onAddress(result);
    //   }
    // });

    }
    onActivate($event: any) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }

}


