
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from 'src/services/toast.service';
 import {Component, OnInit, ElementRef, Renderer2, Input} from '@angular/core';

import { GroupService } from '../../../../../services/groupservice';
import {Group} from "../../../../DTO/views/services/IViewGroups";import { tap } from 'rxjs';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
    providers: []
})
export class ModalComponent {
  @Input() group!: Group;
  description!: string;
  // id: string | undefined;
  @Input() profileUserId!: string;
  @Input() isEdit= true;
  groupName: string = '';
  /** Защита от двойного клика по «Создать»: POST не идемпотентен, дублировал группы. */
  isSaving = false;
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private messageService: ToastService,
    private groupService: GroupService) {
}

  ngOnInit(): void {
    if (this.group){
      this.groupName = this.group.name;
    }
  }
    saveGroup() {     // Создание новой группы на основе введенных данных
      const name = this.groupName?.trim();
      if (!name || this.isSaving) return;
      // Без profileUserId бэк создаёт группу, не привязанную к профилю: POST отвечает
      // успехом, а в groups/{profileId} её нет — «создал, но в списке не появилась».
      if (!this.profileUserId) {
        this.showError('Профиль ещё загружается, попробуйте ещё раз');
        return;
      }

      const group: Group = {
        name,
        profileUserId: this.profileUserId,
        id: this.group ? this.group.id : null
      };
      this.isSaving = true;
      this.groupService.saveGroup(group).subscribe({
        // Бэк отвечает настоящим HTTP-статусом: 201 — создано, 200 — переименовано,
        // 400/404/409 — отказ (уйдёт в error). Раньше отказ приезжал с HTTP 200 и
        // кодом в теле, который никто не смотрел: экран показывал «Группа создана»,
        // перечитывал список — и тот не менялся. Визуально «фронт не обновился».
        next: result => this.activeModal.close(result ?? group),
        error: err => {
          this.isSaving = false;
          this.showError(err?.error?.message || 'Не удалось сохранить группу услуг');
        }
      });
    }

    private showError(detail: string) {
      this.messageService.add({severity: 'error', summary: 'Ошибка', detail, life: 5000});
    }

    showSuccess() {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
    }
    // Удаление группы делается в аккордеоне по group.id. Здесь был неиспользуемый
    // дубль, отправлявший в DELETE group/{id} название группы. Убран.

    closeModal() {
         this.activeModal.close();
      }
}





