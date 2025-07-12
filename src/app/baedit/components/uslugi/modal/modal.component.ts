
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
 import {Component, OnInit, ElementRef, Renderer2, Input} from '@angular/core';

import { GroupService } from '../../../../../services/groupservice';
import {Group} from "../../../../DTO/views/services/IViewGroups";
import {MessageService} from "primeng/api";
import { tap } from 'rxjs';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
    providers: [MessageService]
})
export class ModalComponent {
  @Input() group!: Group;
  description!: string;
  // id: string | undefined;
  @Input() profileUserId!: string;
  @Input() isEdit= true;
  groupName: string = '';
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private messageService: MessageService,
    private groupService: GroupService) {
}

  ngOnInit(): void {
    if (this.group){
      this.groupName = this.group.name;
    }
  }
    saveGroup() {     // Создание новой группы на основе введенных данных
      if (this.groupName) {
        let group: Group = {
          name: this.groupName,
          profileUserId: this.profileUserId,
          id: this.group ? this.group.id : null
        };
        this.groupService.saveGroup(group).subscribe(
          result => {
            this.activeModal.close(result);
          }

        )  }
      // Вызов сервиса для сохранения группы услуг
    }

    showSuccess() {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
    }
    deleteGroup() {
      if (this.groupName) {
        this.groupService.deleteGroup(this.groupName).subscribe(
          () => {
            this.activeModal.close('Group deleted');
          },
          error => {
            console.error('Ошибка при удалении группы услуг:', error);
          }
        );
      }
    }
    closeModal() {
         this.activeModal.close();
      }
}





