import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {StoreService} from "../../ngrx-store/mainClient/store.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { ModalRegisterComponent } from '../../components/modals/register-profile/modal-register/modal-register.component';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  showLoginButton: boolean = false;
  showRegisterButton: boolean = true;
  choosedClient:any;
  status: boolean = false;
  constructor(
    private _router: Router,
    private _storeService : StoreService,
    private modalService: NgbModal)
  {
    // this._storeService.profileStoreMainProfileClient$.subscribe(data=>this.choosedClient=data);
    this._storeService.profileStoreMainProfileClient$.subscribe(data => {
      this.choosedClient = data;
      // Проверяем, не пустые ли данные, и скрываем кнопку "Зарегистрироваться" в случае непустых данных.
      if (this.choosedClient) {
        this.showRegisterButton = false;
      }
    });
  }

goToExtSearch() {
  this._router.navigate(['search/extsearch/', null]);
}
goToTypography() {
  this._router.navigate(['static/typography']);
}

goToDev() {
  this._router.navigate(['static/razrab']);
}
goToHelpPage() {
  this._router.navigate(['static/help']);
}
goToSettingsPage() {
  this._router.navigate(['static/settings']);
}
goToOServicePage() {
  this._router.navigate(['static/oservice']);
}
openPopUp() {
  this.status = !this.status;
  const modalRef = this.modalService.open(ModalRegisterComponent);
}
goToPolicies() {
  this._router.navigate(['static/policies']);

}
// if (choosedClient = true) {
//   this.showRegisterButton = false;
// }
}
