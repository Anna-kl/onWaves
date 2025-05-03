import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalRegisterComponent} from "../modal-register/modal-register.component";
import { ModalRegisterNextComponent } from '../modal-register-next/modal-register-next.component';




@Component({
  selector: 'app-modal-next',
  templateUrl: './modal-next.component.html',
  styleUrls: ['./modal-next.component.css']
})
export class ModalNextComponent implements OnInit {

  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  close() {
    this.activeModal.close();
    const modalRef = this.modalService.open(ModalRegisterComponent);
    //const modalRef = this.modalService.open(ModalRegisterNextComponent);
    modalRef.componentInstance.name = 'World';
  }

}
