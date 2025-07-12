import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalRegisterComponent } from 'src/app/components/modals/register-profile/modal-register/modal-register.component';
import { DeviceService } from 'src/helpers/common/DeviceType';

@Component({
  selector: 'app-show-phone-coupon',
  templateUrl: './show-phone-coupon.component.html',
  styleUrls: ['./show-phone-coupon.component.scss'],
  providers: [DeviceService]
})
export class ShowPhoneCouponComponent implements OnInit {

  registration() {
    this._modal.close();
    const modalRef = this.modalService.open(ModalRegisterComponent);
  }

  close() {
      this._modal.close();
  }


  phoneNumber: string|null = null;
  @Input() click: string|null = null;

  constructor(private device: DeviceService,
    private _modal: NgbActiveModal,
    private modalService: NgbModal
  ){}

  get isMobile(){
    if (this.device.isMobile) {
      return true;
    }
    return false;
  }

  ngOnInit(): void {
      console.log(this.click);
    }

}
