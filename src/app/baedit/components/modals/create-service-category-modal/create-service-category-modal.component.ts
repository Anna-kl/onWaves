import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateServiceOplataModalComponent} from "../create-service-oplata-modal/create-service-oplata-modal.component";
import {Service} from "../../../../DTO/classes/services/Service";
import {ProfileDataEditService} from "../../../services/ba-edit-service";
import {getCategoryForSend} from "../../../../../helpers/common/category";
import {IViewCategoryTree} from "../../../../DTO/views/categories/IViewCategoryTree";
import {CreateServiceModalComponent} from "../create-service-modal/create-service-modal.component";

@Component({
  selector: 'app-create-service-category-modal',
  templateUrl: './create-service-category-modal.component.html',
  styleUrls: ['./create-service-category-modal.component.css']
})
export class CreateServiceCategoryModalComponent implements OnInit {

  @Input() service: Service|null = null;
  choosedCategory: number[] = [];
  constructor(private modal:NgbModal,
              private _dataService: ProfileDataEditService,
              private activeModal: NgbActiveModal) {
  }
  ngOnInit(): void {
    // this.choosedCategory = this.service?.categoryId!;
    // this._dataService.sendCategoriesFromTree.subscribe(
    //   result => {
    //     if (result.length > 0){
    //       this.sendServiceNext(result);
    //     }
    //   }
    // );

  }

  sendServiceNext(result: IViewCategoryTree[]){
    let chooseCategory = getCategoryForSend(result.filter(_ => _.isChecked));
    this.activeModal.close();

    // this.service?.setCategoryIds(chooseCategory.map(_ => _.id));

    let modalRef = this.modal.open(CreateServiceOplataModalComponent);
    modalRef.componentInstance.service = this.service;
  }
  onSend($event: IViewCategoryTree[]){
    if ($event.length > 0){
      this.sendServiceNext($event);
    } else {
      this.activeModal.close();
      let modalRef = this.modal.open(CreateServiceModalComponent);
      modalRef.componentInstance.service = this.service;
    }

  }
  closeModal() {
    this.activeModal.close();
  }
}
