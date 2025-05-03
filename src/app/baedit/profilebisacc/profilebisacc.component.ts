import {ActivatedRoute, Router} from '@angular/router';

import {GroupService} from '../../../services/groupservice';
import {environment} from '../../../enviroments/environment';
import {Group} from "../../DTO/views/services/IViewGroups";
import {subGroup} from "../../DTO/views/services/IViewSubGroups";
import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";
import {Component, OnInit, ViewChild} from "@angular/core";
import {IGroupWithSubGroups} from "../../DTO/views/services/IGroupWithSubGroup";
import {ProfileDataEditService} from "../services/ba-edit-service";
import {PaymentForType} from "../../DTO/enums/paymentForType";
import {DictionaryService} from "../../../services/dictionary.service";
import {IViewAddress} from "../../DTO/views/IViewAddress";
import {getAddressProfile} from "../../../helpers/common/address";
import {ProfileService} from "../../../services/profile.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "src/app/baedit/components/uslugi/modal/modal.component";
// import { ModalserviceComponent } from './modalservice/modalservice.component';
import {
  CreateServiceModalComponent
} from "src/app/baedit/components/modals/create-service-modal/create-service-modal.component";
import {Service} from "../../DTO/classes/services/Service";
import {MessageService} from "primeng/api";
import {FormatuslugiComponent} from "../../components/modals/formatuslugi/formatuslugi.component";
//import {ICardBusinessView} from "../../DTO/views/ICardBusinessView";

declare const ymaps: any;
@Component({
  selector: 'app-profile-basic',
  templateUrl: './profilebisacc.component.html',
  styleUrls: ['./profilebisacc.component.css'],
  providers: [GroupService, DictionaryService,
     ProfileService, MessageService ]
})
export class ProfileBasicComponent implements OnInit{
  btnProfile: boolean = true;
  setLenta() {
      this.btnProfile = false;
      this._router.navigate([`profilebisacc/${this.companyId}/lenta`]);
  }

  setProfile() {
    this.btnProfile = true;
    this._router.navigate([`profilebisacc/${this.companyId}`]);
  }

  //companyId = '{2b48605e-cbf2-4505-bbed-4bea2bbf5d0a}';
  companyId: string | null = null;
  subGroups: subGroup[] = [];
  businessProfile: IViewBusinessProfile | null = null;
  index: any;
  number: any;
  groups: Group[] = [];
  map: any;
  @ViewChild('yamaps')
  services: Service[] = [];

  groupShow: IGroupWithSubGroups[] = [];


  // businessProfile!: ICardBusinessView;
  private baseUrl = environment.Uri + 'services/'

  constructor(private route: ActivatedRoute,
    private _router: Router,
              private _dictionaries: DictionaryService,
              private  messageService: MessageService,
              private modalService: NgbModal,) { }

  onAddress($event: IViewAddress){
    // this._dictionaries.getPoint(getAddressProfile($event)).subscribe(
    //   response => {
    //     ymaps.ready().done(() => this.createMap(response[1], response[0]));
    //   }
    // );
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

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Создано', detail: 'Шруппа успешно добавлена', life:5000});
  }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id');
    // this.update();
  }
  openPopUpM() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.profileUserId = this.companyId;
    modalRef.result.then(res => {
      if (res){
        this.showSuccess();
      }
    });
  }

  openPopUpMS() {
    const modalRef = this.modalService.open(FormatuslugiComponent);
  }
  getMethodPayment(service: Service) {
    return service.paymentForType === PaymentForType.ForService;

  }
  onActivate($event: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }




}
