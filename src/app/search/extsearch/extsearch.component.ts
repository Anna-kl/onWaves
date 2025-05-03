import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {FormBuilder, FormGroup} from "@angular/forms";
import {LocationService} from "../../../services/location.service";
import {ICategory} from "../../DTO/classes/ICategory";
import {ServiceRegisterBusinessProfile} from "../../../services/service-register-business";
import {ISearchRequest} from "../../DTO/views/search/ISearchRequest";
import {Gender} from "../../DTO/enums/gender";
import {SearchService} from "../../../services/search.service";
import {IResultSearch} from "../../DTO/views/search/IResultSearch";

@Component({
  selector: 'app-extsearch',
  templateUrl: './extsearch.component.html',
  styleUrls: ['./extsearch.component.css'],
  providers: [LocationService, SearchService],
  encapsulation: ViewEncapsulation.None,
})
export class ExtsearchComponent implements OnInit {
  search: string|null = null;
  location: any;
  isNear: boolean = false;
  rangeData: number = 0;

  GenderGroup: FormGroup = this._build.group({
    isAll: false,
    isWoman:false,
    isMan: false,
    isPet:  false,
    isChildren: false,
  });
  address = '';
  category: ICategory|null = null;
  resultSearch: IResultSearch[]= [];
  constructor(
    private router: Router,
    private _serviceRegisterBusinessProfile: ServiceRegisterBusinessProfile,
    private _location: LocationService,
    private _build: FormBuilder,
    private _route: ActivatedRoute) {
    this.search = this._route.snapshot.queryParamMap.get('search');
  }

  async ngOnInit() {
    this.isNotAll();
    await this.getListCities();
    this.changeAll();
    this._location.getPosition().then(
      result => {
        this.location = result;
      }
    )
  }


  // всплывюещее меню Select круг
  activeItemR: boolean = false;
  geo: number[] = [];
  public openListItemsR(): void {
    this.activeItemR = !this.activeItemR;
  }


  goToResult() {
    let gender: Gender[] = [];
    const genderList = this.GenderGroup.getRawValue();
    if (genderList['isAll']){
      gender.push(Gender.All);
    }
    if (genderList['isPet']){
      gender.push(Gender.Pet);
    }
    if (genderList['isWoman']){
      gender.push(Gender.Woman);
    }
    if (genderList['isMen']){
      gender.push(Gender.Men);
    }
    if (genderList['isChildren']){
      gender.push(Gender.Children);
    }
    const send = {
      search: this.search,
      distance: this.isNear ? this.rangeData : null ,
      categoryId: this.category ? this.category.id : null,
      address: this.address,
      gender: gender,
      geo: this.isNear ? this.geo : null,
    } as ISearchRequest;

      this.router.navigate(['search/result'],  { state: { send } });
    }
    
  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.geo.push(position.coords.longitude);
        this.geo.push(position.coords.latitude);
      });
    } else {
      console.log("User not allow")
    }
  }

  getNearLocation() {
    if (this.isNear){
      this.getUserLocation();
    }
  }

  keyword = 'name';
  data: any[] = [];

  public async getListCities(){
    (await this._serviceRegisterBusinessProfile.getCities())
      .subscribe(_=> {
        let index = this.data.length + 1;
        _.forEach(item => {
          this.data.push({id: index, name: item, type: 'city'});
        });
      });
  }

  //получаем регионы по стране
  // public async getListRegions(myCountry: string){
  //   (await this._serviceRegisterBusinessProfile.getAllRegions(myCountry))
  //     .subscribe(_=>{
  //       let index = this.data.length + 1;
  //       _.forEach(item => {
  //         this.data.push({id: index, name: `${this.address} ${item}`, type: 'region'});
  //       });
  //     });
  // }

  // public chooseCategoryMain(category: ICategory){
  //   this.mainCategory = category;
  //   this.setFalseChecked();
  // }
  //получаем города по региону
  // public async getListCity(myRegion:string){
  //   this.address = `${this.myCountry} ${myRegion}`;
  //   (await this._serviceRegisterBusinessProfile.getAllCity(myRegion))
  //     .subscribe(_=> {
  //     });
  // }

  async selectEvent(item: any) {
    this.address = item.name;

  }

  onChangeSearch(val: string) {
    if (val.length > 0) {
      if (this.data.find(_ => _.name.includes(val))) {
        this._location.getAddress(val).subscribe(
            result => {
              let address = result;
            }
        );
      }
      // } else {
      //   this._location.getAddress(val).subscribe(
      //       (answer: any) => {
      //         const candidatesAddress = answer['response']['GeoObjectCollection']['featureMember'];
      //         this.data = [];
      //         let index = 0;
      //         for (const candidate of candidatesAddress) {
      //           this.data.push({id: index, name: candidate['GeoObject']['metaDataProperty']
      //                 ['GeocoderMetaData']['text'],
      //             type: 'yandex-search'});
      //         }
      //       });

    }
  }

  onFocused(e: any){
    // do something when input is focused
  }

  changeAll() {
    this.GenderGroup.get('isAll')?.valueChanges.subscribe(
      res => {
        if (res){
          this.GenderGroup.patchValue({
            isWoman:false,
            isMan: false,
            isPet:  false,
            isChildren: false,
          });
        }
      }
    );
  }

  isNotAll() {
    this.GenderGroup.get('isPet')?.valueChanges.subscribe(
      res => {
        if (res){
          this.GenderGroup.patchValue({
            isAll:false,
          });
        }
      }
    );
    this.GenderGroup.get('isWoman')?.valueChanges.subscribe(
      res => {
        if (res){
          this.GenderGroup.patchValue({
            isAll:false,
          });
        }
      }
    );
    this.GenderGroup.get('isMan')?.valueChanges.subscribe(
      res => {
        if (res){
          this.GenderGroup.patchValue({
            isAll:false,
          });
        }
      }
    );
    this.GenderGroup.get('isChildren')?.valueChanges.subscribe(
      res => {
        if (res){
          this.GenderGroup.patchValue({
            isAll:false,
          });
        }
      }
    );
  }

  setRange($event: any) {
    console.log($event);
  }

  setCategory($event: ICategory) {
    this.category = $event;
  }
  goToMain() {
    this.router.navigate(['/']);
  }
}
