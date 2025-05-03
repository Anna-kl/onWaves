import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-confirm-without-time',
  templateUrl: './confirm-without-time.component.html',
  styleUrls: ['./confirm-without-time.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmWithoutTimeComponent implements OnInit {

  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
  };
  constructor(private activeModal: NgbActiveModal) {
  }
  ngOnInit(): void {
  }

  close(){
      this.activeModal.close(false);
  }

  cancel() {
    this.activeModal.close(false);
  }

  change() {
    this.activeModal.close(true);
  }
}
