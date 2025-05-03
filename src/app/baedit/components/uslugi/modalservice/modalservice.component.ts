import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
 import {Component, OnInit, ElementRef, Renderer2, Input} from '@angular/core';

import { GroupService } from '../../../../../services/groupservice';
import {Group} from "../../../../DTO/views/services/IViewGroups";

@Component({
  selector: 'app-modalservice',
  templateUrl: './modalservice.component.html',
  styleUrls: ['./modalservice.component.css']
})
export class ModalserviceComponent {
  groupName!: string;
  description!: string;
  // id: string | undefined;
  @Input() profileUserId: string|null = null;

  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private groupService: GroupService) {
}

ngOnInit(): void {
}
    saveGroup() {     // Создание новой группы на основе введенных данных
      if (this.groupName) {
        let group: Group = {
          name: this.groupName,
          profileUserId: this.profileUserId!,
          id: null,

        };
        this.groupService.saveGroup(group).subscribe(
          () => {
            this.activeModal.close('Group saved');
          },
          error => {
            console.error('Ошибка при сохранении группы услуг:', error);
          }
        );
      }
      // Вызов сервиса для сохранения группы услуг
    }

    // deleteGroup() {
    //   if (this.groupName) {
    //     let group: Group = {
    //       name: this.groupName,
    //       profileUserId: this.profileUserId!
    //     };
    //     this.groupService.deleteGroup(group).subscribe(
    //       () => {
    //         this.activeModal.close('Group deleted');
    //       },
    //       error => {
    //         console.error('Ошибка при сохранении группы услуг:', error);
    //       }
    //     );
    //   }

    // }
}
