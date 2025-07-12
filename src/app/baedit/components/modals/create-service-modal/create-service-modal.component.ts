import {Component, Input, OnInit} from '@angular/core';
import {ProfileDataEditService} from "../../../services/ba-edit-service";
import {Group} from "../../../../DTO/views/services/IViewGroups";
 import {Gender} from "../../../../DTO/enums/gender";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  CreateServiceCategoryModalComponent
} from "../create-service-category-modal/create-service-category-modal.component";
import {Service} from "../../../../DTO/classes/services/Service";
import {IViewBusinessProfile} from "../../../../DTO/views/business/IViewBussinessProfile";
import {subGroup} from "../../../../DTO/views/services/IViewSubGroups";
import { environment } from 'src/enviroments/environment';


// enum Gender {
//   Female = 0,
//   Male = 1,
//   Children = 2,
//   Animals = 3,
//   All = 4,
// }
@Component({
  selector: 'app-create-service-modal',
  templateUrl: './create-service-modal.component.html',
  styleUrls: ['./create-service-modal.component.scss']
})
export class CreateServiceModalComponent implements OnInit {

  groups: Group[] = [];
  changeService!: Service;
  myGroup!: Group;
  genders: Gender[] = [];
  nameService: string = '';
  @Input() service: Service|null = null;
  profile!: IViewBusinessProfile;
  about: string|undefined;
  allSelected: boolean = false;

  constructor(private _dataService: ProfileDataEditService,
              private modalService: NgbModal,
              private activeModal: NgbActiveModal) {
    this._dataService.sendProfile.subscribe(
      result => {
        this.profile = result!;
      }
    );

  }


  remainingText = environment.TEXT_LENGTH;
  chooseGroup(){
      console.log(this.myGroup);
  }
  ngOnInit(): void {
    // if (this.service){
    //   this.changeService = new Service(this.service.name, this.service.gender,
    //     this.profile.id!, this.service.about, this.service.groupServiceId);
    //   this.changeService.setCategoryIds(this.service.categoryId!);
    //   this.changeService.setOplata(this.service.paymentForType!, this.service.currencyType!,
    //     this.service.price!, this.service.duration);
    //   this.nameService = this.service.name;
    //   this.about = this.service.about;
    //   this.genders = this.service.gender;
    //   if (this.service.groupServiceId) {
    //     this.myGroup = this.groups.find(_ => _.id === this.service?.groupServiceId)!;
    //   }
    // }
  }

  getGender(gender: Gender){
    return this.genders.includes(gender);
  }

  // setGender(gender: Gender){
  //   if (this.genders.find(_ => _ === gender)){
  //     this.genders = this.genders.filter(_ => _ !== gender);
  //   } else {
  //     this.genders.push(gender);
  //   }
  // }

  onNext(){
    // if (!this.service) {
    //   this.service = new Service(this.nameService, this.genders, this.profile.id!,
    //     this.about,  this.myGroup.id)
    // } else {
    //   this.service.name = this.nameService;
    //   this.service.about = this.about;
    //   this.service.gender = this.genders;
    //   this.service.groupServiceId = this.myGroup.id;
    // }
    // this.activeModal.close();
    // let modalRef = this.modalService.open(CreateServiceCategoryModalComponent);
    // modalRef.componentInstance.service = this.service;
  }

  checkConditions() {
    return !(this.genders.length > 0 && this.nameService.length > 0);
  }

  closeModal() {
    this.activeModal.close();
  }
  text: string = '';
  maxChars: number = environment.TEXT_LENGTH;
  remainingChars: number = this.maxChars;

  updateCounter() {
    this.remainingChars = this.maxChars - this.text.length;
    if (this.remainingChars < 0) {
      this.text = this.text.slice(0, this.maxChars); // ограничиваем количество символов
      this.remainingChars = 0;
    }
  }
}
