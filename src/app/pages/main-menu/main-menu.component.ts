import {Component, HostListener, Input, OnInit} from '@angular/core';
import {DropDownAnimation, DropDownAnimation2Level} from "../../common/rubric-menu/animation";
import {ICategory} from "../../DTO/classes/ICategory";
import {DictionaryService} from "../../../services/dictionary.service";
import {Router} from "@angular/router";
import {ISearchRequest} from "../../DTO/views/search/ISearchRequest";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
  providers: [DictionaryService]
})
export class MainMenuComponent implements OnInit{
  mainCategory: ICategory[] = [];
  constructor(private _dictionary: DictionaryService,
              private _router: Router) {

  }
  isOpen = false;
  search: string = '';

  ngOnInit(){
    this._dictionary.getMainCategories().subscribe(
        result => {
          this.mainCategory = result;
        }
    );
  }
  goToExtSearch() {
    this._router.navigate(['search/extsearch', this.search]);
  }
  goToStranica() {
    this._router.navigate(['static/stranica']);
  }
  setOpen() {
    this.isOpen = !this.isOpen;
  }

  setCategory($event: ICategory) {
    let category = this.mainCategory.find(_ => _.name === $event.name);
    const send = {
      search: null,
      distance:  null ,
      categoryId: category ? category.id : null,
      address: '',
      gender: [],
      geo:  null,
    } as ISearchRequest;
    this._router.navigate(['search/result'],  { state: { send } });
  }

  goToSearch() {
    const send = {
      search: this.search,
      distance:  null ,
      categoryId:  null,
      address: '',
      gender: [],
      geo:  null,
    } as ISearchRequest;
    this._router.navigate(['search/result'],  { state: { send } });
  }
}
