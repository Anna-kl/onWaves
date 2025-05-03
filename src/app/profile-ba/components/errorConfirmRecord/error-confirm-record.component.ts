import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ErrorConfirmRecord',
  templateUrl: './error-confirm-record.component.html',
  styleUrls: ['./error-confirm-record.component.css'],
})
export class ErrorConfirmRecordComponent implements OnInit {

  constructor( private activeModal: NgbActiveModal,) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }
  goToNewPage() {
    this.activeModal.close();

  }

}
