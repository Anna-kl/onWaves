import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalRegisterComponent } from 'src/app/components/modals/register-profile/modal-register/modal-register.component';

@Component({
  selector: 'app-landingVersion2',
  templateUrl: './landingVersion2.component.html',
  styleUrls: ['./landingVersion2.component.scss']
})
export class LandingVersion2Component implements OnInit {

  constructor(private modalService: NgbModal){

  }


  openPopUp() {
  const modalRef = this.modalService.open(ModalRegisterComponent);
}


  ngOnInit() {
  }

}
