import {Component, Input, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-change-avatar-ua',
  templateUrl: './change-avatar-ua.component.html',
  styleUrls: ['./change-avatar-ua.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChangeAvatarUAComponent {

  constructor(private _modal: NgbActiveModal) {

  }

  @Input() id!: string;
  @Input() avatar: string|null = null;

  onSave($event: boolean) {
    if ($event){
        this._modal.close(true);
    }
  }
}
