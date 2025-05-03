import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { Router } from '@angular/router';
import {select, Store} from "@ngrx/store";
import { selectLink} from "../../../../ngrx-store/links/link.selector";
import {resolve} from "@angular/compiler-cli";
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
  }
  closeModal() {
    this.activeModal.close();
    this.loginService.isAutentificate$.next(true);
    this.loginService.updateProfileUA();
  }
}
