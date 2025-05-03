import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {IViewCategoryTree} from "../../DTO/views/categories/IViewCategoryTree";
import {DictionaryService} from "../../../services/dictionary.service";
import {TypeViewList} from "../../DTO/enums/typeViewList";
import {ProfileDataEditService} from "../../baedit/services/ba-edit-service";

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.css'],
  providers: [DictionaryService]
})
export class CategoryTreeComponent implements OnChanges {
  @Input() treeCategory: IViewCategoryTree[] = [];
  @Output() onSave = new EventEmitter<IViewCategoryTree[]>();
  @Input() isEditService = false;
  constructor(private _dictionaries: DictionaryService,
              private _dataService: ProfileDataEditService) {
    // this._dataService.getCategoryFromTree.subscribe(
    //   result => {
    //       this._dataService.transferTreeService(this.treeCategory);
    //   }
    // );
  }

  ngOnChanges(): void {
  }
  checkStatusOpen(cat: IViewCategoryTree){
    switch (cat.isShow){
      case TypeViewList.Open: {
        return false;
      }
      case TypeViewList.Close: {
        return true;
      }
      case TypeViewList.None: {
        return false;
      }
      default: {
        return false;
      }
    }
  }
  checkStatusClose(cat: IViewCategoryTree){
    switch (cat.isShow){
      case TypeViewList.Open: {
        return true;
      }
      case TypeViewList.Close: {
        return false;
      }
      case TypeViewList.None: {
        return false;
      }
      default: {
        return false;
      }
    }
  }
  checkStatusView(cat: IViewCategoryTree){
    switch (cat.isShow){
      case TypeViewList.Open: {
        return true;
      }
      case TypeViewList.Close: {
        return false;
      }
      case TypeViewList.None: {
        return true;
      }
      default: {
        return false;
      }
    }
  }

  open(treeCat: IViewCategoryTree){
      treeCat.isShow = TypeViewList.Open;
    this.treeCategory.forEach(item => {
      if (item.id == treeCat.id){
        item.childrens?.forEach(_ => {
          _.isShow = TypeViewList.None;
        });
      }
        });
  }
  close(treeCat: IViewCategoryTree){
    treeCat.isShow = TypeViewList.Close;
    let index = 0;
    this.treeCategory.forEach(item => {
      if (item.id == treeCat.id){
        item.childrens?.forEach(_ => {
          if (index < 4) {
            _.isShow = TypeViewList.None;
          } else {
            _.isShow = TypeViewList.Close;
          }
          index ++;
        });
      }
    });
  }

  saveChanges() {
    this.onSave.emit(this.treeCategory);
  }


  onBack(){
    this.onSave.emit([]);
  }

  setCategory() {
    this.onSave.emit(this.treeCategory);
  }
}
