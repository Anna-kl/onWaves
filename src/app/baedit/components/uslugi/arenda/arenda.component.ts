import {select, Store} from "@ngrx/store";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { Location } from '@angular/common'
import {ICategory} from "../../../../DTO/classes/ICategory";
import {Gender} from "../../../../DTO/enums/gender";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileDataEditService} from "../../../services/ba-edit-service";
import {Group} from "../../../../DTO/views/services/IViewGroups";
import {CurrencyType} from "../../../../DTO/enums/currencyType";
import {currencyName} from "../../../../../helpers/constant/currencyConstant";
import {selectProfileMainClient} from "../../../../ngrx-store/mainClient/store.select";
import {IViewBusinessProfile} from "../../../../DTO/views/business/IViewBussinessProfile";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ChooseAlbumComponent} from "../../modals/choose-album/choose-album.component";
import {AlbumsService} from "../../../../../services/albums.service";
import {IViewImage} from "../../../../DTO/views/images/IViewImage";
import {DomSanitizer} from "@angular/platform-browser";
import {PaymentForType} from "../../../../DTO/enums/paymentForType";
import {Service} from "../../../../DTO/classes/services/Service";
import {ServiceStatus} from "../../../../DTO/enums/serviceStatus";
import {GroupService} from "../../../../../services/groupservice";
import {MessageService} from "primeng/api";
import { getNameCurrency } from "src/helpers/common/price.helpers";
import { Subject, takeUntil } from "rxjs";
import { environment } from "src/enviroments/environment";

@Component({
  selector: 'app-arenda',
  templateUrl: './arenda.component.html',
  styleUrls: ['./arenda.component.scss'],
  providers: [AlbumsService, GroupService, MessageService, NgbActiveModal ]
})

export class ArendaComponent implements OnInit, OnDestroy {
  isRubric = true;
  category: ICategory|null = null;
  allGenders: Gender[] = [
    Gender.Woman,
    Gender.Men,
    Gender.Children,
    Gender.Pet,
  ];
  images: IViewImage[] = [];
  currencies: CurrencyType[] = [CurrencyType.RUB];
  genders: Gender[] = [];
  maxChars: number = environment.TEXT_LENGTH;
  remainingText = environment.TEXT_LENGTH;
  remainingChars: number = this.maxChars;
  text: string = '';
  serviceGroup!: FormGroup;
  groups: Group[] = [];
  service: Service|null = null;
  profile: IViewBusinessProfile|null = null;
  private imagesId: any;
  choosedGroup: Group = {name: 'Выберите группу', id: '', profileUserId: ''};
  characterCount: number = 0;
  private destroy$ = new Subject<void>();

  isErrorPrice = false;
  isErrorName = false;
  isErrorGender = false;

  errors = {
    errorLink: 'Заполните поле',
    errorLinkStyle: 'border-color: red; color: red'
  };
  changeService: Service|null = null;
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
              private builder: FormBuilder,
              private store: Store,
              private activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private sanitizer: DomSanitizer,
              private _apiImage: AlbumsService,
              private _apiService: GroupService,
              private messageService: MessageService,
              private location: Location,
              private _dataService: ProfileDataEditService) {

    //  = this.router.getCurrentNavigation()?.extras.state;
   

   let temp = this.router.getCurrentNavigation()?.extras.state;
      if (temp){
        this.service  = temp['subGroup'];
        this.groups = temp['groups'];
      }
    this.store.pipe(select(selectProfileMainClient)).subscribe(result => {
        this.profile = result;
        // this.profile?.currency?.forEach(item => {
        //   this.currencies?.push(currencyName[item]);
        // });
      }
    );

  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  customValidator(control: { value: string; }) {
    const validInput = /^[0-9:]*$/; // Регулярное выражение, разрешающее только цифры и двоеточия
    return validInput.test(control.value) ? null : { invalidInput: true };
  }

  goToRubric() {
    this.router.navigate(['profile-ba/rubric']);
  }
  goToBackInUslugi() {
    this.router.navigate([ `ba-edit/${this.profile?.id}/uslugi`]);
  }

  ngOnInit(): void {
    this.serviceGroup?.get('about')!.valueChanges.subscribe(
      res => {
        if (res.length >= environment.TEXT_LENGTH){
          this.serviceGroup?.patchValue({'about': res.substring(0, 149)});
        }
        this.remainingText = environment.TEXT_LENGTH - res.length;
      }
    );

     if (this.service){
      this.isRubric = false;
      this.serviceGroup = this.builder.group({
        name:  [this.service.name, Validators.required], 
        about: this.service.about,
        group: this.service.groupServiceId,
        isAll: this.service.gender.find(_ => _ === Gender.All),
        isWoman: this.service.gender.find(_ => _ === Gender.Woman),
        isMen: this.service.gender.find(_ => _ === Gender.Men),
        isChildren: this.service.gender.find(_ => _ === Gender.Children),
        isPet: this.service.gender.find(_ => _ === Gender.Pet),
        price: this.builder.group({
          price: this.service.price.price,
          isRange: this.service.price.isRange,
          startRange: this.service.price.startRange,
          endRange: this.service.price.endRange,
          currencyType: CurrencyType.RUB
        }),
      });
      this._apiImage.getImagesFromService(this.service.id!).subscribe(
        result_images => {
          this.images = result_images;
        }
      );
    } else {
      this.serviceGroup = this.builder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        about:  ['', [ Validators.maxLength(environment.TEXT_LENGTH)]],
        group: this.choosedGroup,
        isAll: false,
        isWoman: false,
        isMen: false,
        isChildren: false,
        isPet: false,
        //price: 0,
        price: this.builder.group({
          price: new FormControl(null, Validators.required),
          isRange: false,
          startRange: null,
          endRange: null,
          currencyType: CurrencyType.RUB
        }),
      });
    }

    // if (this.profile?.id){
    //   this._apiService.getGroupServices(this.profile?.id).pipe(takeUntil(this.destroy$)).subscribe(
    //       result => {
    //         this.groups = result;
    //         if (this.service){
    //           if (this.service.groupServiceId) {
    //             this.choosedGroup = this.groups.find(_ => _.id === this.service?.groupServiceId)!;
    //             this.serviceGroup.patchValue({'group': this.choosedGroup});
    //             }
    //     }
    //   });
    // } 
  }

  protected readonly getNameCurrency = getNameCurrency;

  isFormValid(): boolean {
     const priceControl = this.serviceGroup.get('price');
     let price = priceControl!.get('price');
    let b = this.serviceGroup.get('isWoman')?.value || this.serviceGroup.get('isMen')?.value
    || this.serviceGroup.get('isPet')?.value || this.serviceGroup.get('isChildren')?.value;
     let a = (this.serviceGroup.valid && price?.value > 0 
     && (this.serviceGroup.get('isWoman')?.value || this.serviceGroup.get('isMen')?.value
    || this.serviceGroup.get('isPet')?.value || this.serviceGroup.get('isChildren')?.value));
     return a;
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

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Создано', detail: 'Услуга добавлена',
      life:5000});
  }
  showSuccess2() {
    this.messageService.add({severity:'success', summary: 'Успешно', detail: 'Услуга изменена',
      life:5000});
  }

  save() {
    let flagValidation = true;
    this.isErrorGender = false;
    this.isErrorName = false;
    this.isErrorPrice = false;
    let data = this.serviceGroup.getRawValue();
    let gender: Gender[] = [];
    if (data['isWoman']){
      gender.push(Gender.Woman)
    }
    if (data['isMen']){
      gender.push(Gender.Men)
    }
    if (data['isChildren']){
      gender.push(Gender.Children)
    }
    if (data['isPet']){
      gender.push(Gender.Pet)
    }
    if (data['isAll']){
      gender.push(Gender.All)
    }
    if (data['price']['price'] === 0){
      this.isErrorPrice = true;
      flagValidation = false;
    }
    if (gender.length === 0){
      this.isErrorGender = true;
      flagValidation = false;
    }
    if (data['name'].length === 0){
      this.isErrorName = true;
      flagValidation = false;
    }
    if (flagValidation) {
      let service: Service = new Service (this.service ? this.service.id : null,
        data['name'], gender,this.profile?.id!, data['price'], PaymentForType.ForHour,
        data['group'].id !== '' ? data['group']['id'] : null, 
        data['about'], data['duration'], false, this.category?.id);
       
      this._apiService.saveService(service).subscribe(
          result => {
            if (result.code === 201) {
              let serv = result.data as Service;
              if (this.imagesId) {
                if (this.imagesId.length > 0) {
                  this._apiImage.saveImageService(this.imagesId, serv.id!).subscribe(
                      res_images => {

                      }
                  );
                }
              }
              this.showSuccess();
              this.location.back();
            }
          }
      );
    }
    }

  changeCurrency($event: Event) {
  }

  addFoto() {
    const modalRef = this.modalService.open(ChooseAlbumComponent);
    modalRef.componentInstance.profileId = this.profile?.id;
    modalRef.result.then((result: string[]) => {
      this.imagesId = result;
      this.imagesId.forEach((item: string) => {
        this._apiImage.getImage(item).subscribe(
          result_image => {
            this.images.push(result_image);
          }
        );
      });
    });
  }

  back(){
    if (!this.isRubric){
      this.isRubric = true;
    }
    let element = document.getElementById('groupModal');
    element?.scrollIntoView(true);
  }

  getImage(image: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${image}`);
  }

}
