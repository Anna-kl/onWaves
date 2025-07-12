import {select, Store} from "@ngrx/store";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {ICategory} from "../../../../DTO/classes/ICategory";
import {Gender} from "../../../../DTO/enums/gender";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileDataEditService} from "../../../services/ba-edit-service";
import {Group} from "../../../../DTO/views/services/IViewGroups";
import {CurrencyType} from "../../../../DTO/enums/currencyType";
import {currencyName} from "../../../../../helpers/constant/currencyConstant";
import {selectProfileMainClient} from "../../../../ngrx-store/mainClient/store.select";
import {IViewBusinessProfile} from "../../../../DTO/views/business/IViewBussinessProfile";
import {IViewImage} from "../../../../DTO/views/images/IViewImage";
import {DomSanitizer} from "@angular/platform-browser";
import {ChooseAlbumComponent} from "../../modals/choose-album/choose-album.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlbumsService} from "../../../../../services/albums.service";
import {GroupService} from "../../../../../services/groupservice";
import {Service} from "../../../../DTO/classes/services/Service";
import { map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import {PaymentForType} from "../../../../DTO/enums/paymentForType";
import {MessageService} from "primeng/api";
import {DisallowSymbolsDirective} from "src/app/disallow-symbols.directive";
import {
  getHoursString,
  getMinutesStr,
  getTimeFromFields
} from "../../../../../helpers/common/timeHelpers";
import { getNameCurrency } from "src/helpers/common/price.helpers";
import { environment } from "src/enviroments/environment";

@Component({
  selector: 'app-arenda2',
  templateUrl: './arenda2.component.html',
  styleUrls: ['./arenda2.component.scss'],
  providers: [AlbumsService, GroupService, MessageService, DisallowSymbolsDirective],

})
export class Arenda2Component implements OnInit, OnDestroy {
  changeService: { [k: string]: any; } | undefined; 
  TEXT_LENGTH: number = environment.TEXT_LENGTH;


  changeDb($event: Event) {
   console.log($event);
  }

  private destroy$ = new Subject<void>();
  currencyType: CurrencyType = CurrencyType.RUB;

  getIsRange(flag: boolean): boolean {
    let data = this.serviceGroup?.value;
    if ((data['price']['isRange'] && flag)){
      return true;
    }
    if ((data['price']['isRange'] || flag) === false){
      return true;
    }else{
      return false;
    }
  }

  myForm!: FormGroup;
  isRubric = true;
  category: ICategory|null = null;
  allGenders: Gender[] = [
    Gender.Woman,
    Gender.Men,
    Gender.Children,
    Gender.Pet,
  ];
  groupsHours: string[] = ['00','01', '02', '03', '04', '05', '06', '07' ,'08', '09', '10','11','12','13','14','15','16','17','18','19','20','21','22','23'];

  groupsMinutes: string[] = ['00', '15', '30', '45'];
  currencies: CurrencyType[] = [CurrencyType.RUB];
  genders: Gender[] = [];
  maxChars: number = environment.TEXT_LENGTH;
  remainingText = environment.TEXT_LENGTH;
  remainingChars: number = this.maxChars;
  text: string = '';
  serviceGroup!: FormGroup;

  groups: Group[] = [];
  service: Service|null = null;
  allSelected: boolean = true;
  profile: IViewBusinessProfile|null = null;
  images: IViewImage[] = [];
  imagesId: string[] = [];
  choosedGroup: Group = {name: 'Выберите группу', id: '', profileUserId: ''};
  characterCount: number = 0;
  errors = {
    errorLink: 'Заполните поле',
    errorLinkStyle: 'border-color: red; color: red'
  };
  limitServiceName(event: any) {
    const inputText = event.target.value;
    if (inputText.length > 70) {
      event.target.value = inputText.substring(0, 70); // Truncate to 70 characters
    }
    this.characterCount = event.target.value.length;
  }
  setGender(gender: Gender) {
    if (gender === Gender.All) {
      if (this.genders.length === this.allGenders.length) {
        this.genders = [];
      } else {
        this.genders = [...this.allGenders];
      }
    } else {
      if (this.genders.includes(gender)) {
        this.genders = this.genders.filter((_gender) => _gender !== gender);
      } else {
        this.genders.push(gender);
      }
    }
  }
  constructor(private router: Router,
              private location: Location,
              private builder: FormBuilder,
              private store: Store,
              private modalService: NgbModal,
              private sanitizer: DomSanitizer,
              private _apiImage: AlbumsService,
              private _apiService: GroupService,
              private messageService: MessageService,
              private _dataService: ProfileDataEditService) {
  
    this.store.pipe(select(selectProfileMainClient)).pipe(takeUntil(this.destroy$)).subscribe(result => {
        this.profile = result;
        // this.profile?.currency?.forEach(item => {
        //   this.currencies?.push(currencyName[item]);
        // });
      }
    );
      let temp = this.router.getCurrentNavigation()?.extras.state;
      if (temp){
        this.changeService  = temp['subGroup'];
        this.groups = temp['groups'];
      }
  }
  get duration() {
    //return this.myForm.get('numericInput') || new FormControl('');
    return this.myForm.get('duration') || new FormControl('');
  }



  customValidator(control: { value: string; }) {
    const validInput = /^[0-9:]*$/; // Регулярное выражение, разрешающее только цифры и двоеточия
    return validInput.test(control.value) ? null : { invalidInput: true };
  }

  onKeyPress(event: any) {
    const allowedChars = /[0-9:]/; // Разрешенные символы: числа и двоеточие

    // Проверяем, является ли символ разрешенным, иначе отменяем ввод
    if (!allowedChars.test(event.key)) {
      event.preventDefault();
    }
  }
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Создано', detail: 'Услуга добавлена',
      life:5000});
  }

  showSuccess2() {
    this.messageService.add({severity:'success', summary: 'Успешно', detail: 'Услуга изменена',
      life:5000});
  }

  ngOnDestroy(){
        // Эмитируем значение, чтобы завершить все потоки, подписанные через takeUntil
        this.destroy$.next();
        this.destroy$.complete();
  }

  ngOnInit(): void {

    this.serviceGroup = this.builder.group({
      name: new FormControl(null, Validators.required),
      about: '',
      group: this.choosedGroup,
      isAll: false,
      isWoman: false,
      isMen: false,
      isChildren: false,
      isPet: false,
      //price: 0,
      price: this.builder.group({
        price: null,
        isRange: false,
        startRange: null,
        endRange: null,
        currencyType: new FormControl(this.currencies[0], Validators.required)
      }),
      isTimeUnlimited: false,
      durationHours: this.groupsHours[0],
      durationMinutes: this.groupsMinutes[0]
    });
    
    // if (this.changeService){
    //   this.service = this.changeService['subGroup'] as Service;
    //   this.isRubric = false;
    //   this.serviceGroup = this.builder.group({
    //     id: this.changeService['subGroup'].id,
    //     name: [this.service.name, Validators.required],
    //     about: this.service.about,
    //     group: this.groups.find(_ => _.id === this.service?.groupServiceId),
    //     isAll: this.service.gender.includes(Gender.All),
    //     isWoman: this.service.gender.includes(Gender.Woman),
    //     isMen: this.service.gender.includes(Gender.Men),
    //     isChildren: this.service.gender.includes(Gender.Children),
    //     isPet: this.service.gender.includes(Gender.Pet),
    //     price: this.builder.group({
    //       price: this.service.price.price,
    //       isRange: this.service.price.isRange,
    //       startRange: this.service.price.startRange,
    //       endRange: this.service.price.endRange,
    //       currencyType: CurrencyType.RUB
    //     }),
    //     durationHours: this.service.duration ? getHoursString(this.service.duration) : this.groupsHours[0],
    //     isTimeUnlimited: this.service.isTimeUnlimited,
    //     durationMinutes: this.service.duration ? getMinutesStr(this.service.duration) : this.groupsMinutes[0],
    //   });


               
        if (this.changeService){
          this.service = this.changeService as Service;
          this.isRubric = false;
          this.serviceGroup = this.builder.group({
            id: this.service.id,
            name: [this.service.name, Validators.required],
            about: this.service.about,
            group: this.groups.find(_ => _.id === this.service?.groupServiceId),
            isAll: this.service.gender.includes(Gender.All),
            isWoman: this.service.gender.includes(Gender.Woman),
            isMen: this.service.gender.includes(Gender.Men),
            isChildren: this.service.gender.includes(Gender.Children),
            isPet: this.service.gender.includes(Gender.Pet),
            price: this.builder.group({
              price: this.service.price.price,
              isRange: this.service.price.isRange,
              startRange: this.service.price.startRange,
              endRange: this.service.price.endRange,
              currencyType: CurrencyType.RUB
            }),
            durationHours: this.service.duration ? getHoursString(this.service.duration) : this.groupsHours[0],
            isTimeUnlimited: this.service.isTimeUnlimited,
            durationMinutes: this.service.duration ? getMinutesStr(this.service.duration) : this.groupsMinutes[0],
        });
              
  }
          
      
      
          
          // .subscribe(
          //    result => {
          //       this.groups = result;
        
    
  
    // this._dataService.sendGroupsService.subscribe(
    //   result => {
    //     this.groups = result;
    //     if (this.service){
    //       if (this.service.groupServiceId) {
    //         this.choosedGroup = this.groups.find(_ => _.id === this.service?.groupServiceId)!;
    //         this.serviceGroup?.patchValue({'group': this.choosedGroup});
    //       }
    //     }
    //   }
    // );

    this.serviceGroup?.get('about')!.valueChanges.subscribe(
      res => {
        if (res.length >= environment.TEXT_LENGTH){
          this.serviceGroup?.patchValue({'about': res.substring(0, environment.TEXT_LENGTH)});
        }
        this.remainingText = environment.TEXT_LENGTH - res.length;
      }
    );
    this.serviceGroup?.get('isTimeUnlimited')!.valueChanges.subscribe(
        res => {
          if (res) {
            this.serviceGroup?.get('durationMinutes')!.disable();
            this.serviceGroup?.get('durationHours')!.disable();
          } else {
            this.serviceGroup?.get('durationMinutes')!.enable()
            this.serviceGroup?.get('durationHours')!.enable();
          }
        }
    );
  }
  // isFormValid(): boolean {
  //   return this.serviceGroup.valid;
  // }
  isErrorTime = false;
  isErrorPrice = false;
  isErrorName = false;
  isErrorGender = false;

  isFormValid(): boolean {
    const priceControl = this.serviceGroup?.get('price');
    let flag = true;
    if (priceControl){
      if (priceControl.get('isRange')?.value){
       if (!priceControl.get('startRange')?.value)
        flag = false;
      }else
        if (!priceControl.get('price')?.value){
          flag = false;
        }
    }

    if (!( this.serviceGroup?.get('isPet')?.value || this.serviceGroup?.get('isWoman')?.value
    || this.serviceGroup?.get('isMen')?.value || this.serviceGroup?.get('isAll')?.value
    ||this.serviceGroup?.get('isChildren')?.value)){
        flag = false;
    }
    if (!this.serviceGroup?.get('isTimeUnlimited')?.value){
          if (this.serviceGroup?.get('durationHours')?.value === '00' &&
          this.serviceGroup?.get('durationMinutes')?.value === '00' ){
            flag = false;
          }
    }
    if ( this.serviceGroup)
      return this.serviceGroup?.valid && flag;
    else{
      return false;
    }
  }

  getGender(gender: Gender){
    return this.genders.includes(gender);
  }
  setCategory($event: ICategory) {
    this.isRubric = false;
    this.category = $event;
  }

  updateCounter() {
    this.remainingChars = this.maxChars - this.text.length;
    if (this.remainingChars < 0) {
      this.text = this.text.slice(0, this.maxChars); // ограничиваем количество символов
      this.remainingChars = 0;
    }
  }

  save() {
    let flagValidation = true;
    this.isErrorGender = false;
    this.isErrorName = false;
    this.isErrorTime = false;
    this.isErrorPrice = false;
    let data = this.serviceGroup?.getRawValue();
    let gender: Gender[] = [];
    if (data['isWoman']) {
      gender.push(Gender.Woman)
    }
    if (data['isMen']) {
      gender.push(Gender.Men)
    }
    if (data['isChildren']) {
      gender.push(Gender.Children)
    }
    if (data['isPet']) {
      gender.push(Gender.Pet)
    }
    if (data['isAll']) {
      gender.push(Gender.All)
    }
    if ((data['durationHours'] === '00' && data['durationMinutes'] === '00') && !data['isTimeUnlimited']){
      this.isErrorTime = true;
      flagValidation = false;
    }
    // if (data['price'] === 0){
    //   this.isErrorPrice = true;
    //   flagValidation = false;
    // }
    if (gender.length === 0){
      this.isErrorGender = true;
      flagValidation = false;
    }
    if (data['name'].length === 0){
      this.isErrorName = true;
      flagValidation = false;
    }
    if (flagValidation) {
      let service: Service = new Service (this.service ? this.service.id : null, data['name'],
        gender, this.profile?.id!, data['price'], PaymentForType.ForService, 
        data['group'].id !== '' ? data['group']['id'] : null, 
        data['about'],  getTimeFromFields(data['durationHours'], data['durationMinutes']),
        data['isTimeUnlimited'], this.category?.id);

      this._apiService.saveService(service).pipe(takeUntil(this.destroy$)).subscribe(
          result => {
            if (result.code === 201) {
              let serv = result.data as Service;
              if (this.imagesId.length > 0) {
                this._apiImage.saveImageService(this.imagesId, serv.id!).pipe(takeUntil(this.destroy$)).subscribe(
                    res_images => {

                    }
                );
              }
              this.showSuccess();
              this.location.back();
            }
          }
      );
    }
  }

  getImage(image: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${image}`);
  }

  addFoto() {
    const modalRef = this.modalService.open(ChooseAlbumComponent);
    modalRef.componentInstance.profileId = this.profile?.id;
    modalRef.result.then((result: string[]) => {
      this.imagesId = result;
      this.images = [];
      this.imagesId.forEach((item: string) => {
          this._apiImage.getImage(item).pipe(takeUntil(this.destroy$)).subscribe(
              result_image => {
                this.images.push(result_image);
              }
          );
      });
    });
  }

  goToBackInUslugi() {
    this.router.navigate([ `ba-edit/${this.profile?.id}/uslugi`]);
  }

  backToCategories() {
    this.isRubric = true;
    let element = document.getElementById('groupModal');
    element?.scrollIntoView(true);
  }

  protected readonly getNameCurrency = getNameCurrency;

}
