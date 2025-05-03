import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendService} from '../../../../services/backend.service';

import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {DictionaryService} from "../../../../services/dictionary.service";
import {ICategory} from "../../../DTO/classes/ICategory";

import {IViewCategoryProfile} from "../../../DTO/views/categories/IViewCategoryProfile";
import {ProfileDataEditService} from "../../services/ba-edit-service";
import {IViewCategoryTree} from "../../../DTO/views/categories/IViewCategoryTree";
import {TypeViewList} from "../../../DTO/enums/typeViewList";
import {ProfileService} from "../../../../services/profile.service";
import {getCategoryForSend, prepareTreeList, setCategoryState} from "../../../../helpers/common/category";

@Component({
  selector: 'app-rubric',
  templateUrl: './rubric.component.html',
  styleUrls: ['./rubric.component.css'],
  providers: [DictionaryService, BackendService, ProfileService]
})
export class RubricComponent {
  id: string | null = null;
  profile: IViewBusinessProfile | null = null;
  @Input() isEditService = false;
  @Input() treeCategoryChoosed: number[] = [];
  @Output() onSend = new EventEmitter<IViewCategoryTree[]>();
  mainCategoryProfile$: ICategory[] = [];
  mainCategories: ICategory[] = [];
  categoriesProfile$: IViewCategoryProfile[] = [];
  treeCategory: IViewCategoryTree[] = [];
  categoryProfile: ICategory|null = null;
  private allCategories: ICategory[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private backendService: BackendService,
    private _dateService: ProfileDataEditService,
    private _dictionary: DictionaryService,
    private _apiProfile: ProfileService
  ) {

    this._dateService.sendProfile.subscribe(
      result => {
        this.profile = result;
        this._dictionary.getMainCategories().subscribe(
          async response => {
            this.allCategories = response as ICategory[];
            this.mainCategories = this.allCategories.filter(_ => _.parentId === null);
            if (this.mainCategories.length > 0){
              this.mainCategories[0].isChoose = true;
              await this.setFalseChecked(this.mainCategories[0]);
            }
          }
        );
      }
    );
  }

  setOnlyProfilesCategories(){
    let tempCategories: IViewCategoryTree[] = [];
    this.treeCategory.forEach(_ => {
       if (_.childrens?.length! > 0){
         let tempChilds: IViewCategoryTree[] = [];
         _.childrens?.forEach(x => {
           if (this.categoriesProfile$.map(item => item.categoryId).includes(x.id)){
             tempChilds.push({
               id: x.id,
               name: x.name,
               isChecked: false,
               childrens: [],
               isShow: TypeViewList.None
             });
           }
         });
         if (tempChilds.length > 0){
           tempCategories.push({
             id: _.id,
             name: _.name,
             isChecked: false,
             childrens: tempChilds,
             isShow: TypeViewList.None
           } as IViewCategoryTree)
         }
       } else {
         if (this.categoriesProfile$.map(item => item.categoryId).includes(_.id)){
           tempCategories.push(_);
         }
       }
      });
    this.treeCategory = tempCategories;
  }
  // chooseMainCategory(category: ICategory){
  //     this.mainCategory = category;
  //     this.setFalseChecked();
  //
  // }

  setFalseChecked(mainId: ICategory){
    // this.mainCategories.filter(_ => _.id !== this.mainCategoryProfile!.id).forEach(item => {
    //   item.isChoose = false;
    // });
    // this.mainCategoryProfile!.isChoose = true;
    this.treeCategory = prepareTreeList(this.allCategories, mainId.id, '', true);
    this.treeCategory = setCategoryState(this.treeCategory);
    this.treeCategory.forEach(_ => {
      if (this.categoriesProfile$.map(x => x.categoryId).includes(_.id)) {
        _.isChecked = true;
      }
      _.childrens?.forEach(sub => {
        if (this.categoriesProfile$.map(x => x.categoryId).includes(sub.id)) {
          sub.isChecked = true;
        }
      });
    });
  }

  async ngOnInit(): Promise<void> {

  }
  async getMainCategoriesProfile(id: string) {
    (await this.backendService.getMainCategoryProfile(id))
      .subscribe(_ => {
        const main = this.backendService.mainCategoriesProfile$.value as string[];
        this.mainCategories.forEach(item => {
          if (main.includes(item.name)){
            item.isChoose = true;
            this.getCategoriesProfile(this.profile!.id!, item);
          }
        });
        // this.setFalseChecked();
        // if (this.isOnlyProfileCategories){
        //   this.setOnlyProfilesCategories();
        // }
      });
  }

  async getCategoriesProfile(id: string, main:ICategory) {
    (await this.backendService.getCategoryProfile(id))
      .subscribe(_ => {
        this.categoriesProfile$ = this.backendService.categoriesProfile$.value as IViewCategoryProfile[];
        this.setFalseChecked(main);
        this.setOnlyProfilesCategories();

      });
  }
  saveChanges(): void {
    if (this.id) {
      this.backendService.saveProfile(this.id, this.profile! ).subscribe(
        () => {
          console.log('Profile saved successfully.');
        },
        (error: any) => {
          console.error('Failed to save profile:', error);
        }
      );
    }
  }

  saveChangesButton(){
    this.onSend.emit(this.treeCategory);
  }

  onBack(){
    this.onSend.emit([]);
  }
  saveCategories($event: IViewCategoryTree[]){
    if (!this.isEditService) {
      let sendCategory = getCategoryForSend($event);
      this._apiProfile.setCategories(this.profile?.id!, sendCategory, '').subscribe(result => {
        if (result.code === 201) {
        }
      });
    }
  }
  backToProfile() {
    this.router.navigate(['profilebisacc', this.id]);
  }

  checkValidate() {
    return  getCategoryForSend(this.treeCategory).length === 0;

  }

  chooseMainCategory(main: ICategory) {
    this.mainCategories.forEach(item => {
      if (item.id === main.id){
        item.isChoose;
      } else {
        item.isChoose = false;
      }
    });
    this.setFalseChecked(main);
  }
}
