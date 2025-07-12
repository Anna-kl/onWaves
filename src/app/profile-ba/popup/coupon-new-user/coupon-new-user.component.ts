import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalRegisterComponent } from 'src/app/components/modals/register-profile/modal-register/modal-register.component';

@Component({
  selector: 'app-coupon-new-user',
  templateUrl: './coupon-new-user.component.html',
  styleUrls: ['./coupon-new-user.component.scss']
})
export class CouponNewUserComponent implements OnInit {

  constructor(private _modal: NgbModal){}

  registration() {
    this.isVisible = false;
    let modalRef  = this._modal.open(ModalRegisterComponent);
  }

  isVisible = false;

  /** Таймаут в миллисекундах */
  delay = 5000; // 5 секунд

  /** Событие закрытия (если родитель хочет знать) */
  @Output() closed = new EventEmitter<void>();

  ngOnInit(): void {
    // Покажем виджет через delay миллисекунд
    setTimeout(() => this.show(), this.delay);
  }

  show(): void {
    this.isVisible = true;
  }

  hide(): void {
    this.isVisible = false;
    this.closed.emit();
  }
}
