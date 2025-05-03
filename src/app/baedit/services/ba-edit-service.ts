import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";
import {Group} from "../../DTO/views/services/IViewGroups";
import {IViewCategoryTree} from "../../DTO/views/categories/IViewCategoryTree";

@Injectable()
export class ProfileDataEditService
{
  private businessProfile = new BehaviorSubject<IViewBusinessProfile|null>(null);
  private groupsService = new BehaviorSubject<Group[]>([]);
  private categoryFromTree = new BehaviorSubject(null);
  private categoriesFromTree = new BehaviorSubject<IViewCategoryTree[]>([]);
  private upService = new BehaviorSubject(false);

  sendProfile = this.businessProfile.asObservable();
  sendGroupsService = this.groupsService.asObservable();
  getCategoryFromTree = this.categoryFromTree.asObservable();
  sendCategoriesFromTree = this.categoriesFromTree.asObservable();
  upServices = this.upService.asObservable();

  transferBusinessProfile(user: IViewBusinessProfile){
    this.businessProfile.next(user);
  }

  updateServices(){
    this.upService.next(true);
  }

  getCategoryService(){
    this.categoryFromTree.next(null);

  }
  transferGroupsService(groups: Group[]){
    this.groupsService.next(groups);
  }

  transferTreeService(groups: IViewCategoryTree[]){
    this.categoriesFromTree.next(groups);
  }
}
