import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../../services/groupservice';
import { Group, GroupShow, GroupShowWithDate, GroupWithDate } from "../../DTO/views/services/IViewGroups";
import { subGroup } from "../../DTO/views/services/IViewSubGroups";
import { ProfileService } from "../../../services/profile.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../../baedit/components/uslugi/modal/modal.component";
import {
  ChangeModalGroupComponent
} from "../../baedit/components/uslugi/change-modal-group/change-modal-group.component";
import { Service } from "../../DTO/classes/services/Service";
import { PaymentForType } from "../../DTO/enums/paymentForType";
import { MessageService } from "primeng/api";
import { DomSanitizer } from "@angular/platform-browser";
import { AlbumsService } from "../../../services/albums.service";
import { DataService } from 'src/app/profile-ba/components/group-service/dataservice.service';
import { getHours, getMinutes } from "../../../helpers/common/timeHelpers";
import { ConfirmWithoutTimeComponent } from "./modals/confirm-without-time/confirm-without-time.component";
import { IPrice } from 'src/app/DTO/views/services/IPrice';
import { forkJoin, map, Observable, switchMap } from 'rxjs';


@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  providers: [ProfileService, MessageService, AlbumsService],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AccordionComponent implements OnChanges, OnInit {
  combinedData$: Observable<any[]>|null = null;
  serviceWithout$: Observable<Service[]>|null = null;
  ifExist: boolean = false;
  visibleCards: boolean = false;


  getPrice(price: IPrice): string | number {
    if (price.isRange) {
      let res = `от ${price.startRange}`;
      if (price.endRange) {
        res += ` до ${price.endRange}`;
      }
      return res;
    } else {
      return price.price!;
    }
  }
  
  // protected readonly getPrice = getPrice;
  isCheckboxChecked: boolean = false;

  groups: GroupWithDate[] | Group[] = [];
  group: Group[] = [];
  @Input() canSetService: boolean = true;
  @Input() viewCreate: boolean = false;
  //companyId = '{2b48605e-cbf2-4505-bbed-4bea2bbf5d0a}';
  @Input() reload: boolean = false;
  index: any;
  setIsTimeLimit: boolean = false;
  number: any;
  sendService: subGroup[] = [];
  // businessProfile!: ICardBusinessView;
  groupShow: GroupShowWithDate[] = [];
  @Input() isUpdate = false;
  @Input() profileId: string | null = null;
  @Input() chooseServices: subGroup[] = [];
  @Output() setServices = new EventEmitter<subGroup[]>();
  showDeletePanel: any;
 // services: Service[] = [];
  constructor(private messageService: MessageService,
    private _groupService: GroupService,
    private modalService: NgbModal,
    private _route: Router,
    private _activateRoute: ActivatedRoute,
    private _apiImages: AlbumsService,
    private sanitizer: DomSanitizer,
    private dataService: DataService) { }

  showCreateAlbumBlock: boolean = false;

  ngOnInit(): void {
    this.checkIfProfilebisaccRoute();
  }
  
  checkIfProfilebisaccRoute() {
    const currentUrl = this._route.url;
    const desiredRoute = '/profilebisacc/';

    this.showCreateAlbumBlock = currentUrl.includes(desiredRoute);
  }

  getImage(image: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${image}`);
  }
  update() {
    if (this.profileId) {
      let idsChoose = this.chooseServices.map(_ => _.id);

      this.serviceWithout$ =  this._groupService.getServiceWithout(this.profileId)
        .pipe(map((items: Service[]) => {
          if (items.length > 0)
              this.ifExist = true;
            items = items.map(_ => new Service(_.id, _.name, _.gender, _.profileUserId, _.price,
              _.paymentForType, _.groupServiceId, _.about, _.duration, _.isTimeUnlimited)
            );
           return items.map(item =>
                item.setCheck( idsChoose.includes(item.id))
            );
            
          }) );

          // this.serviceWithout$.subscribe(result => {
          //   console.log(result);
          // });


      this.combinedData$ = this._groupService.getGroupServices(this.profileId).pipe(
        switchMap((users: any[]) => {
          if (users.length > 0)
            this.ifExist = true;
          // Используем forkJoin, чтобы выполнить второй запрос для каждого элемента массива
          const userDetailRequests = users.map(item => 
            this._groupService.getService(item.id!).pipe(
              map(details => ({
                    isOpen: true,
                    group: item,
                    subGroups: details })) // объединяем каждый user с его details
            )
          );
          // forkJoin ждет завершения всех запросов
          return forkJoin(userDetailRequests);
        }));
      
   
    }
  }

  sortGroups() {
    this.groupShow.sort((a, b) => {
      const dateA = new Date(a.dateCreated);
      const dateB = new Date(b.dateCreated);
      return dateB.getTime() - dateA.getTime();
    });
    return this.groupShow
  }

  ngOnChanges(): void {
    if (this.profileId) {
      this.update();
      this.dataService.getIsCheckboxChecked().subscribe((isChecked) => {
        this.isCheckboxChecked = isChecked;
      });
    }
  }

  deleteGroup(group: Group) {
    this._groupService.deleteGroup(group.id!).subscribe(result => {
      const groupIndex = this.groups.findIndex(OLDgroup => OLDgroup.id === group.id);
      if (groupIndex > -1) {
        this.groupShow.splice(groupIndex, 1);
        this.groups.splice(groupIndex, 1);
      }
      this.showSuccessDelGr();
      this.update();
    });
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Создано', detail: 'Группа изменена', life: 5000 });
  }
  showSuccessDel() {
    this.messageService.add({ severity: 'success', summary: 'Успешно', detail: 'Услуга удалена', life: 5000 });
  }
  showSuccessDelGr() {
    this.messageService.add({ severity: 'success', summary: 'Успешно', detail: 'Группа удалена', life: 5000 });
  }

  changeService(subGroup: subGroup) {
    if (subGroup.paymentForType === PaymentForType.ForService) {
      this._route.navigate(['../arenda-service'], {
        state: { subGroup },
        relativeTo: this._activateRoute
      });
    } else {
      this._route.navigate([`../arenda-hour`], {
        state: { subGroup },
        relativeTo: this._activateRoute
      });
    }
  }

  changeGroupService(group: Group) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.group = group;
    modalRef.componentInstance.profileUserId = this.profileId;
    modalRef.componentInstance.isEdit = true;
    modalRef.result.then(res => {
      if (res) {
        this.showSuccess();
        this.update();
      }
    });
  }

  changeGroup(subGroup: subGroup) {
    const modalRef = this.modalService.open(ChangeModalGroupComponent);
    modalRef.componentInstance.groups = this.groups;
    modalRef.componentInstance.myGroupId = subGroup.groupServiceId;
    modalRef.result.then(
      (res: Group) => {
        if (res) {
          this._groupService.changeGroup(subGroup.id!, res.id!).subscribe(
            result => {
              console.log('Успешно');
            }
          );
        }
      }
    );
  }

  deleteService(subGroup: subGroup) {
    this._groupService.deleteService(subGroup.id!).subscribe(
      result => {
        if (result.code === 200) {
          this.showSuccessDel();
          this.update();
        }
      }
    );
  }

  setService(service: Service | subGroup) {
    if (service.isChecked) {
      if ((this.sendService.find(_ => _.isChecked && !_.isTimeUnlimited && service.isTimeUnlimited))
      || this.sendService.find(_ => _.isChecked && _.isTimeUnlimited && !service.isTimeUnlimited)) {
        const modalRef = this.modalService.open(ConfirmWithoutTimeComponent);
        modalRef.result.then(result => {
          if (result) {
            // this.sendService.forEach(item => {
            //   this.delService(item);
            // });
            this.sendService.forEach(_ => {
              _.isChecked = false;
            })
            this.sendService = [];
           // this.setServices = new EventEmitter();
            this.addService(service);
          } else {
            service.isChecked = false;
          }

        });
       
      } else {
          this.addService(service);
    }
      
    } else {
      this.delService(service);
    }
  }
  isWriteTime(subGroup: Service) {
    return subGroup.paymentForType !== PaymentForType.ForHour && !subGroup.isTimeUnlimited;
  }

  private clearAllServices(ids: string[]) {
    this.sendService = [];
    // this.groupShow.forEach(item => {
    //   item.subGroups.forEach(_ => {
    //     _.isChecked = false;

    //   });
    // });
    if (this.combinedData$){
      this.combinedData$ = this.combinedData$.pipe(map(items => 
        items.map(_ => ({
           ..._,
           subGroups: _.subGroups.map((x: any) => ({
          ...x,
          isChecked: ids.includes(x.id) ? true :  false
        }))
      }
        )
      )));
  }
      
    
  if (this.serviceWithout$){
    this.serviceWithout$ = this.serviceWithout$?.pipe(map(items => {
      return items.map(_ => _.setCheck(ids.includes(_.id!) ? true : false))
    }));
  }
    // this.services.forEach(_ => {
    //   _.isChecked = false;

    // });
  }

  private addService(service: Service | subGroup) {
    service.isChecked = true;
    this.sendService.push(service);
    this.setServices.emit(this.sendService);
  }

  private delService(service: Service | subGroup) {
    if (service.paymentForType === PaymentForType.ForHour){
      if (service.price){
        service.price.price = service.price.price!/(service.duration!/60) 
        service.duration = 60;
      }
    }
    service.isChecked = false;
    if (service.isTimeUnlimited) {
      this.setIsTimeLimit = false;
    }
    this.sendService = this.sendService.filter(_ => _.id !== service.id);
    this.setServices.emit(this.sendService);
  }
  // else {
  //     let tempService = this.sendService.find(_ => _.id === service.id);
  //     if (tempService && tempService.paymentForType === PaymentForType.ForHour) {
  //       tempService.price = tempService.price / (tempService.duration! / 60);
  //     }
  //     this.sendService = this.sendService.filter(_ => _.id !== service.id);
  // }
  // this.setServices.emit(this.sendService);


  getDescribeTypePayment(subGroup: Service) {
    switch (subGroup.paymentForType) {
      case PaymentForType.ForHour: {
        return '( почасовая оплата )';
      }
      case PaymentForType.ForService: {
        return '( оплата за услугу )';
      }
      default: {
        return '( без ограничения )';
      }
    }
  }

  protected readonly getHours = getHours;
  protected readonly getMinutes = getMinutes;



}
