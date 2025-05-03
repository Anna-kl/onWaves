import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IViewAddress } from 'src/app/DTO/views/IViewAddress';
import { IViewBusinessProfile } from 'src/app/DTO/views/business/IViewBussinessProfile';

import { DictionaryService } from 'src/services/dictionary.service';
import { ServiceRegisterBusinessProfile } from 'src/services/service-register-business';


@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DictionaryService,ServiceRegisterBusinessProfile]
})
export class SelectAddressComponent implements OnInit {

  constructor( private _dictionaries: DictionaryService,
    private _serviceRegisterBusinessProfile: ServiceRegisterBusinessProfile)
    {
      this.myCountry = '';
      this.myRegion = '';
      this.myCity = '';
    }

  @Output() changeAddress = new EventEmitter();  
  @Input() profile: IViewBusinessProfile | null = null;
  async ngOnInit(): Promise<void> {
    if (this.profile) {
      this.address = this.profile.address as IViewAddress;
      if (this.address) {
          this.myCountry = this.address.country;
          this.myRegion = this.address.region;
          this.myCity = this.address.city;
          this.getListRegions(this.myCountry);
          if (this.myRegion) {
              this.getListCity(this.myRegion);
          }
      }
    }else {
      this.address = {
        street: '',
        city: null,
        country: null,
        home: null,
        region: null,
        apartment: null
      } as unknown as IViewAddress
    }
  await this.getListCountry();
  }

  setAnotherCity() {
    if (this.address){
      this.myCity = null;
      this.address = {
        city: '',
          street: this.address.street,
          region: this.address.region,
          home: this.address.home,
          apartment: this.address.apartment,
          country: this.myCountry
      } as IViewAddress;
    }
    this.checkAddress();
  }

  checkAddress(){
    if (this.address)
      if (this.address.city)
        if (this.address.city.length > 1)
          if (this.address.home){
            this.changeAddress.emit({
              strAddress:  this.getStringAddress(),
              viewAddress: this.address});
    }
  }

  public async getListCountry(){
    (await this._serviceRegisterBusinessProfile.getAllCountry())
      .subscribe(_=> {
      });
  }
  change($event: Event, type: string) {
   
    switch (type){
      case 'country': {
        this.getListRegions(this.myCountry!);
          if ( this.address) {
            this.myRegion = '';
              this.address = {
                city: '',
                  street: '',
                  region: '',
                  home: '',
                  apartment: '',
                  country: this.myCountry
              } as IViewAddress;
          }
        break;
      }
        case 'region': {
          this.getListCity(this.myRegion!);
            if ( this.address) {
              this.myCity = '';
                this.address = {
                  city: '',
                    street: '',
                    region: this.myRegion,
                    home: '',
                    apartment: '',
                    country: this.myCountry
                } as IViewAddress;
            }
          break;
        }
        case 'city': {
          this.getListStreet(this.myCity);
            this.address = {
                city: this.myCity ?? $event.toString(),
                street: '',
                region: this.myRegion,
                home: '',
                apartment: '',
                country: this.myCountry
            } as IViewAddress;
            break;
        }
        case 'street': {
            this.address = {
                city: this.myCity ?? this.address?.city,
                street: $event.toString(),
                region: this.myRegion,
                home: '',
                apartment: '',
                country: this.myCountry
            } as IViewAddress;
            break;
        }
        case 'home': {
            this.address = {
                city: this.myCity ?? this.address?.city,
                street: this.address?.street,
                region: this.myRegion,
                home: $event.toString(),
                apartment: '',
                country: this.myCountry
            } as IViewAddress;
             break;
        }
        case 'apartment': {
            this.address = {
                city: this.myCity ?? this.address?.city,
                street: this.address?.street,
                region: this.myRegion,
                home: this.address?.home,
                apartment: $event.toString(),
                country: this.myCountry
            } as IViewAddress;
            break;
        }
        default: {
          return;
        }
    }
    this.checkAddress();
  }
  public countryList$ = this._serviceRegisterBusinessProfile.countryList$;
  public readonly allRegions$ = this._serviceRegisterBusinessProfile.allRegions$;
  public readonly allCity$ = this._serviceRegisterBusinessProfile.allCity$;
  myRegion: string|null = null;
  myCountry: string|null = null;
  myCity: string|null = null;

  address: IViewAddress|null = null;
 isAnotherCity: boolean = false;

public async getListRegions(myCountry: string|null){
  if (myCountry) {
    (await this._serviceRegisterBusinessProfile.getAllRegions(myCountry))
      .subscribe(_ => {
          this.myRegion = _.find(_ => _.includes(this.myRegion!))!;
          });
  }
}

public async getListCity(myRegion: string){
  if (myRegion) {
    (await this._serviceRegisterBusinessProfile.getAllCity(myRegion))
      .subscribe(_ => {
          if (_.length === 1){
              this.myCity = _[0];
          }
          if (this.address?.city){
          if(!_.includes(this.address?.city)){
              this.isAnotherCity = true;

          }
        }
      });
  }
}

getListStreet(myCity: string|null) {
}

getStringAddress(): string {
  let str = '';
  if (this.myCountry){
    str = `${this.myCountry}`;
  }
  if (this.myRegion){
    str = `${str}, ${this.myRegion}`;
  }
  if (this.myCity !== this.myRegion && this.myCity){
    str = `${str}, ${this.myCity}`;
  }
  if (this.myCity === null && this.address?.city){
    str = `${str}, ${this.address?.city}`;
  }
  if (this.address?.street){
    str = `${str}, ${this.address?.street}`;
  }
  if (this.address?.home){
    str = `${str}, ${this.address?.home}`;
  }
  if (this.address?.apartment){
    str = `${str}, ${this.address?.apartment}`;
  }
  return str;
}
}
