import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginService} from "../../../../auth/login.service";
@Component({
  selector: 'app-modal-register-end',
  templateUrl: './modal-register-end.component.html',
  styleUrls: ['./modal-register-end.component.css']
})
export class ModalRegisterEndComponent implements OnInit {

  @Input() Id!: string;
  constructor(
    private loginService: LoginService,
    public activeModal: NgbActiveModal,
  ) {
  }
  ngOnInit(): void {

  }

  goToNewPage() {
    this.activeModal.close();
    this.loginService.isAutentificate$.next(true);
    this.loginService.updateProfileUA();
    this.loginService.afterLoginNavigateAwayFromLanding();
  }
  closeModal() {
    this.activeModal.close();
    this.loginService.isAutentificate$.next(true);
    this.loginService.updateProfileUA();
    this.loginService.afterLoginNavigateAwayFromLanding();
  }
}
