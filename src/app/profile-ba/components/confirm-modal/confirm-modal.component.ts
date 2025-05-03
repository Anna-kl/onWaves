// import { Component } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Component, Input, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {UserType} from "../../../DTO/classes/profiles/profile-user.model";
import { ProfileDataService } from "../../services/profile-data.service";
@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  typeUserForEquels: UserType | undefined = UserType.User;
  @Input() baProfile: IViewBusinessProfile|null = null;
  auth: IViewBusinessProfile | null = null;
  @Input() isAuth: boolean = false;
  id: string | null = null;

  constructor(private modalService: NgbModal,
    private _profileData: ProfileDataService,
    private activeModal: NgbActiveModal,
    private router: Router) {}

  ngOnInit(): void {
    this._profileData.sendId.subscribe(result => {
      this.id = result;
    });
  }

  closeModal() {
    this.activeModal.close();
  }
  goToNewPage() {
    this.activeModal.close();

  }
  GoToProfile() {
    if (this.auth) {
      // Главное Меню юзера
      if (this.auth.userType === UserType.User) {
        this.router.navigate(['/page-user/', this.auth?.id]);
      } else { // Главное Меню бизнеса
        this.router.navigate(['/profilebisacc/', this.auth!.id]);
      }
    }
  }
}
