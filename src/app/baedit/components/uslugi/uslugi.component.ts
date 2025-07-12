import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from './modal/modal.component';

import { IViewBusinessProfile } from "../../../DTO/views/business/IViewBussinessProfile";
import { BackendService } from "../../../../services/backend.service";
import { GroupService } from "../../../../services/groupservice";
import { CreateServiceModalComponent } from "../modals/create-service-modal/create-service-modal.component";
import { ProfileDataEditService } from "../../services/ba-edit-service";
import { FormatuslugiComponent } from 'src/app/components/modals/formatuslugi/formatuslugi.component';
import { Group } from "../../../DTO/views/services/IViewGroups";
import { MessageService } from "primeng/api";
import { PaymentForType } from "../../../DTO/enums/paymentForType";
import { select, Store } from '@ngrx/store';
import { selectProfileMainClient } from 'src/app/ngrx-store/mainClient/store.select';
import { Subscription, take } from 'rxjs';


@Component({
  selector: 'app-uslugi',
  templateUrl: './uslugi.component.html',
  styleUrls: ['./uslugi.component.scss'],
  providers: [MessageService]
})
export class UslugiComponent implements OnInit, OnDestroy {
  // @Output() closeWindow = new EventEmitter();
  showDeletePanel = false;
  groups: Group[] = [];
  isReload: boolean = false;
  private unsubscribe$: Subscription | null = null;

  toggleDeletePanel() {
    this.showDeletePanel = !this.showDeletePanel;
  }
  groupName!: string;
  id: string | null = null;
  profile!: IViewBusinessProfile | null;
  isUpdate = true;
  isActive: string = '';

  constructor(
    private router: Router,
    private _dataService: ProfileDataEditService,
    private backendService: BackendService,
    private modalService: NgbModal,
    private messageService: MessageService,
    private _activateRoute: ActivatedRoute,
    private groupService: GroupService,
    private store$: Store
  ) {

   
  }


  ngOnInit(): void {
     this._activateRoute.params.subscribe(params => {
      this.isActive = params['isActive'];
    });

    this.unsubscribe$ = this._dataService.sendProfile.subscribe(

      result => {
        this.profile = result;
        this.groupService.getGroupServices(this.profile?.id!)
          .subscribe(groups => {
            this.groups = groups;
          });
      });
    this.store$.pipe(select(selectProfileMainClient)).subscribe(result => {
      if (result) {
        this.profile = result;
      }
    });

    this.unsubscribe$ = this._dataService.upServices.subscribe(
      result => {
        if (result) {
          this.isUpdate = true;
        }
      }

    )

    if (this.isActive == 'uslug') {
      this.createBAProfileFormatUslugi()
    }
    if (this.isActive == 'group') {
      this.openPopUpM()
    }



  }
  saveChanges(): void {
    if (this.profile) {
      this.unsubscribe$ = this.backendService.saveProfile(this.profile.id!, this.profile!).subscribe(
        () => {

          this.showSuccess();
        },
        (error: any) => {

        }
      );
    }
  }
  // closeModal() {
  //   this.activeModal.close();
  // }
  backToProfile() {
    this.router.navigate(['profilebisacc', this.id]);
  }

  private modaltPopUpMRef: any;
  openPopUpM() {
    this.modaltPopUpMRef = this.modalService.open(ModalComponent);
    this.modaltPopUpMRef.componentInstance.profileUserId = this.profile?.id;
    this.modaltPopUpMRef.result.then((result: any) => {
      if (result) {
        this.isReload = !this.isReload;
      }
    });
  }

  openPopUpMS() {
    const modalRef = this.modalService.open(CreateServiceModalComponent);

  }

  deleteGroup() {
    if (this.groupName) {
      this.groupService.deleteGroup(this.groupName).subscribe(
        () => {
          // this.activeModal.close('Group deleted');
        },
        error => {
          console.error('Ошибка при удалении группы услуг:', error);
        }
      );
    }
  }

  goToArenda() {
    this.router.navigate(['profile-ba/arenda']);
  }
  goToUslugis() {
    this.router.navigate(['profile-ba/uslugis']);
  }
  goToMobMenu() {
    this.router.navigate(['profile-ba/mobmenu']);
  }
  goToDayRent() {
    this.router.navigate(['profile-ba/dayrent']);
  }

  private modaltUslugiRef: any;
  createBAProfileFormatUslugi() {
    // this.closeWindow.emit();
    // this.active = !this.active;
    this.modaltUslugiRef = this.modalService.open(FormatuslugiComponent);
    this.modaltUslugiRef.componentInstance.id = this.profile?.id;
    this.modaltUslugiRef.result.then((type: any) => {
      if (type === PaymentForType.ForHour) {
        this.router.navigate([`../arenda-hour`], { relativeTo: this._activateRoute,  state: { subGroup: null,  groups: this.groups } })
      } else {
        this.router.navigate([`../arenda-service`], { relativeTo: this._activateRoute,  state: { subGroup: null,  groups: this.groups } })
      }
    });

  }

  /*** выплываюзее уведомление p-toast    */
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Создано', detail: 'Изменения сохранены', life: 5000 });
  }


  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();

    if (this.modaltUslugiRef) {
      this.modaltUslugiRef.close();
    }
    if (this.modaltPopUpMRef) {
      this.modaltPopUpMRef.close();
    }


  }
}
