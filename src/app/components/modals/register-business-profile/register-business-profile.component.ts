import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ServiceRegisterBusinessProfile} from "../../../../services/service-register-business";
import {DictionaryService} from "../../../../services/dictionary.service";
import {ICategory} from "../../../DTO/classes/ICategory";
import {IViewCategoryTree} from "../../../DTO/views/categories/IViewCategoryTree";
import {ProfileService} from "../../../../services/profile.service";
import {AuthStatus} from "../../../DTO/enums/authStatus";
import {IViewAddress} from "../../../DTO/views/IViewAddress";

import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IViewAuthProfile} from "../../../DTO/views/profile/IViewAuthProfile";
import {getCategoryForSend, prepareTreeList, setCategoryState} from "../../../../helpers/common/category";
import {UserType} from "../../../DTO/classes/profiles/profile-user.model";
import {createMap} from "../../../../helpers/common/maps";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {StoreService} from "../../../ngrx-store/mainClient/store.service";
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient, selectTokenMainClient} from "../../../ngrx-store/mainClient/store.select";
import {urlProfile} from "../../../../helpers/constant/commonConstant";
import {Observable} from "rxjs";
import {IViewCoordinates} from "../../../DTO/views/profile/IViewCoordinates";

declare const ymaps: any;
@Component({
  selector: 'app-register-business-profile',
  templateUrl: './register-business-profile.component.html',
  styleUrls: ['./register-business-profile.component.scss'],
  providers: [DictionaryService, ProfileService]
})
export class RegisterBusinessProfileComponent implements OnInit {
  strAddress: string = '';



  changeAddress($event: {strAddress: string,
    viewAddress: IViewAddress}) {
      this.address = $event.viewAddress;
      this.strAddress = $event.strAddress;
      this.geoPoint$ = this._dictionaries.getPoint(this.strAddress);
  }


  errors = {
    errorLink: '(Только латинские символы)',
    errorLinkStyle: ''
  };

  categories: ICategory[] = [];
  textBtn: string = 'Далее';
  lng = 37.00;
  lat = 53.00;



  public readonly mainProfile$ = this._storeService.profileStoreMainProfileClient$;
  //из store
  mainToken = '';
  urlProfileLocal = urlProfile;
  registrationForm!: FormGroup;
  numberStreetPage:number = 1;
  private formData: FormData | null = null;
  mainCategory: ICategory|null = null;
  treeCategory: IViewCategoryTree[] = [];
  user: IViewBusinessProfile | null = null;
  private allCategories: ICategory[] = [];

  mapType = 'satellite';
  mainProfile: any;
  remainingText:any = 0;
  exceptWords: string[] = [];
  address: IViewAddress|null = null;
  geoPoint$: Observable<IViewCoordinates|null> = new Observable<IViewCoordinates | null>();
  constructor( private _serviceRegisterBusinessProfile: ServiceRegisterBusinessProfile,
               public activeModal: NgbActiveModal,
               private _dictionaries: DictionaryService,
               private _api: ProfileService,
               private _store: Store,
               private _storeService: StoreService) {
    //store ngrx
    this._storeService.profileStoreMainProfileClient$.subscribe(
        data=>
        {
          this.mainProfile = data;

        });
    this._store.pipe(select(selectTokenMainClient)).subscribe(
      result => {
        this.mainToken = result;
      }
    )
    this._store.pipe(select(selectProfileMainClient)).subscribe(
      result => {
        let test = result;
      }
    );

    // this.renderer2.listen('window', 'click',(e:Event)=>{
    //   /**
    //    * Only run when toggleButton is not clicked
    //    * If we don't check this, all clicks (even on the toggle button) gets into this
    //    * section which in the result we might never see the menu open!
    //    * And the menu itself is checked here, and it's where we check just outside of
    //    * the menu and button the condition abbove must close the menu
    //    */
    //   let element = e.target as HTMLElement;
    //   if(element.className.toString().includes('change')){
    //     const tab = this.elementRef.nativeElement.getElementsByClassName('upfile2')
    //     if (tab.length > 0){
    //       tab[0].click();
    //     }
    //   }
    // });
  }

  closeModal() {
    this.activeModal.close();
  }

  increment () {
    let element = document.getElementById('groupModal');
    element?.scrollIntoView(true);
    if (this.numberStreetPage === 2){
      this.textBtn = 'Готово';
      this.numberStreetPage++;
    }
    if (this.numberStreetPage === 1){
      let link = this.registrationForm.controls['link'].value;
      if (link.length > 0){
        let word = this.exceptWords.find(_ => _ === link);
        if (word){
          this.errors.errorLink = 'Данное имя зарезервировано';
          this.errors.errorLinkStyle = 'border-color: red; color: red';
          return;
        }
          this._api.checkLink(link).subscribe(
              result => {
                if (result.code === 200){
                  this.numberStreetPage++;
                } else {
                  this.errors.errorLink = 'Данное имя уже занято';
                  this.errors.errorLinkStyle = 'border-color: red; color: red';
                  return;
                }
              }
          );
        }
        else {
          this.numberStreetPage++;
        }
      }

    if (this.numberStreetPage === 3){
      const data = this.registrationForm.getRawValue();
      let view = {
        id: null,
        status: AuthStatus.Active,
        about: data['about'],
        userType: UserType.Business,
        address: this.address,
        name: data['name'],
        phone: data['phone'],
        telegram: data['telegram'],
        webSite: data['webSite'],
        link: data['link'].replace(urlProfile, ''),
        whatsApp: data['whatsApp'],
        // parentId: this.auth?.profile?.id!,
        parentId: this.mainProfile.id, //из store
        timeZone: new Date().getTimezoneOffset(),
        email: undefined,
      } as unknown as IViewBusinessProfile;
          this._api.createBAProfile(view, this.mainToken).subscribe(
            result => {
              if (result.code === 201) {
                let user = result.data as IViewAuthProfile;
                this.numberStreetPage ++;
                if (this.formData) {
                  this._serviceRegisterBusinessProfile
                      .save_avatar(user.profileUserId!, this.formData)
                      .subscribe(
                          (res) => {
                            if (res){
                              this.activeModal.dismiss();
                              window.location.href = `/`;
                            }
                          });
                }else{
                  this.activeModal.dismiss();
                  window.location.href = `/`;
                }

              }
            }
        );
    }
    // if (this.numberStreetPage >= 4){
    //         this.activeModal.dismiss();
    //         window.location.href = `/`;
    // }


  }


  decrement () {this.numberStreetPage--; }

  async ngOnInit(): Promise<void> {
 
    let element = document.getElementById('groupModal');
    element?.scrollIntoView(true);
    //методы для заполнения полей адреса шаг 2
    this._dictionaries.getExceptWords().subscribe(
        result => {
        this.exceptWords = result;}
    );

    this._dictionaries.getMainCategories().subscribe(
      response => {
        this.allCategories = response as ICategory[];
        this.categories = this.allCategories.filter(_ => _.parentId === null);
        if (this.categories.length > 0) {
          this.mainCategory = this.categories[0];
          this.setFalseChecked();
        }
      }
    );


    this.registrationForm = new FormGroup({
      //форма numberStreepPage=1  шаг 1
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      link: new FormControl('', [
        Validators.minLength(4)
      ]),
      phone: new FormControl(this.mainProfile ? this.mainProfile.phone : '', [
        Validators.required,
        Validators.minLength(10),
        // Validators.pattern('[0-9]{3}-[0-9]{2}-[0-9]{3}')
      ]),
      search: new FormControl(''),
      whatsApp: new FormControl(this.user ? this.user.phone : '', [
        Validators.minLength(4),
        // Validators.pattern('[0-9]{3}-[0-9]{2}-[0-9]{3}')
      ]),
      telegram: new FormControl('@', [
        Validators.minLength(4)
      ]),
      // webSite: new FormControl('https://', [
      //   Validators.minLength(4)
      // ]),
      webSite: new FormControl('', [
        Validators.minLength(4)
      ]),

      //шаг 2
      country: new FormControl('', [
        Validators.required
      ]),
      region: new FormControl('', [
        Validators.minLength(2)
      ]),
      city: new FormControl('', [
        Validators.minLength(2)
      ]),
      street: new FormControl('', [
        Validators.minLength(2)
      ]),
      home: new FormControl('', [
        Validators.required,
        Validators.minLength(1)
      ]),
      apartment: new FormControl('', [
        Validators.minLength(1)
      ]),

      //шаг 3
      avatar: new FormControl('', []),
      about: new FormControl('', [
        Validators.minLength(1), Validators.maxLength(150)
      ]),
    });

    
    this.registrationForm.get('link')!.valueChanges.subscribe((value: string) => {
      this.registrationForm.get('link')!.setValue(value.replace(/[^A-Za-z0-9]/, ""),
       { emitEvent: false });
    });

    this.registrationForm?.get('about')!.valueChanges.subscribe(
      res => {
        if (res.length >= 150){
          this.registrationForm?.patchValue({'about': res.substring(0, 150)});
        }
        this.remainingText = res.length;
      }
    );

    // this.registrationForm?.get('link')!.valueChanges.subscribe(
    //   res => {
    //     if (res.length <= 16){
    //       this.registrationForm?.patchValue({'webResource': 'https://ocpio.ru/'});
    //     }
    //   }
    // );


    this.registrationForm?.get('phone')?.valueChanges.subscribe(
      res => {
        if (res.length <= 16) {
          this.registrationForm?.patchValue({ 'phone': '+7(000) 000-0000' });
        }
      }
    );


  }
  //шаг 1
  get name() { return this.registrationForm.get('name')!;}//ВАЖНО эту палочку ! в конце
  get webResource() { return this.registrationForm.get('webResource')!;}
  get phone() { return this.registrationForm.get('phone')!;}
  get whatsApp() { return this.registrationForm.get('whatsApp')!;}
  get telegram() { return this.registrationForm.get('telegram')!;}
  get webSite() { return this.registrationForm.get('webSite')!;}


  //шаг 2
  get country() { return this.registrationForm.get('country')!;}
  get search() { return this.registrationForm.get('search')!;}
  get region() { return this.registrationForm.get('region')!;}
  get city() { return this.registrationForm.get('city')!;}
  get street() { return this.registrationForm.get('street')!;}
  get home() { return this.registrationForm.get('home')!;}
  get apartment() { return this.registrationForm.get('apartment')!;}

  //шаг 3
  get avatar() { return this.registrationForm.get('avatar')!;}
  get about() { return this.registrationForm.get('about')!;}
  //получаем регионы по стране


  public chooseCategoryMain(category: ICategory){
    this.mainCategory = category;
    this.setFalseChecked();
  }


  setFalseChecked(){
    this.categories.filter(_ => _.id !== this.mainCategory!.id).forEach(item => {
      item.isChoose = false;
    });
    this.categories.sort((a, b) => a.name.localeCompare(b.name));
    this.mainCategory!.isChoose = true;
    this.treeCategory = prepareTreeList(this.allCategories, this.mainCategory?.id!,'',
      false);
    this.treeCategory = setCategoryState(this.treeCategory);
  }


  //загрузка файла
  // remainingText = 150;

  isFormValid(): boolean {
    switch (this.numberStreetPage){
      case 1: {
        return this.registrationForm?.get('name')!.value.length <= 0;
      }
      case 2: {
        return this.address === null;
      }

    }
    return false;
  }


  ////////////////////////
  imageChangedEvent: any = null;
  isShowCropped: boolean = false;

  getData($event: any) {
    this.formData = $event;
  }
}
