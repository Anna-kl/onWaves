import {Component, Input, OnInit} from '@angular/core';
import {Group} from "../../../../DTO/views/services/IViewGroups";
import {Service} from "../../../../DTO/classes/services/Service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-change-modal-group',
  templateUrl: './change-modal-group.component.html',
  styleUrls: ['./change-modal-group.component.css']
})
export class ChangeModalGroupComponent implements OnInit {
  @Input() groups: Group[] = [];


  @Input() myGroupId: string|null = null;

  myGroup: Group = {
    name: 'Выберите группу',
    id: null,
    profileUserId: ''
  };

  constructor(private modal: NgbActiveModal) {
  }
  ngOnInit(): void {
    if (this.myGroupId !== null) {
      this.myGroup = this.groups.find(_ => _.id === this.myGroupId)!;
    }
  }

  chooseGroup(){
    console.log(this.myGroup);
  }

  changeGroup() {
    this.modal.close(this.myGroup);
  }
}
