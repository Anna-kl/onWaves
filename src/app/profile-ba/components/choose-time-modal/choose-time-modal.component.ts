import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-choose-time-modal',
  templateUrl: './choose-time-modal.component.html',
  styleUrls: ['./choose-time-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChooseTimeModalComponent implements OnInit {
  time = 1;
  count = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {

  }
  sendTime(){
    this.activeModal.close(Number(this.time * 60));
  }
  close(){
    this.activeModal.close(null);
 }

}
