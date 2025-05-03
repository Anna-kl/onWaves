import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {DropDownAnimation, DropDownAnimation2Level} from "./animation";
import {ICategory} from "../../DTO/classes/ICategory";
import {DictionaryService} from "../../../services/dictionary.service";
import {PaymentForType} from "../../DTO/enums/paymentForType";
import {getServiceForType} from "../../../helpers/common/category";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-rubric-menu',
  templateUrl: './rubric-menu.component.html',
  styleUrls: ['./rubric-menu.component.scss'],
  animations: [DropDownAnimation, DropDownAnimation2Level],
  providers: [DictionaryService],
  encapsulation: ViewEncapsulation.None
})
export class RubricMenuComponent implements OnChanges{
  private isBlockedMain: boolean = false;
  private isBlocked2Level: boolean = false;
  home: { icon: string } = { icon: 'pi pi-home' };
  constructor(private _dictionary: DictionaryService){
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.getScreenSize();
    this._dictionary.getMainCategories().subscribe(
      async response => {
         this.allCategories = response as ICategory[];
         if (this.isOption !== PaymentForType.Default) {
           this.allCategories = getServiceForType(this.allCategories, this.isOption);
         }
         this.mainCategories = this.allCategories.filter(_ => _.parentId == null);
      }
    );
  }
  @Input() isOpen = false;
  @Input() isOption = PaymentForType.Default;
  @Output() setCategory = new EventEmitter<ICategory>();
  menu2Level: ICategory[] = [];
  menu3Level: ICategory[] = [];
  isShow2Level: boolean = false;
  isShow3Level: boolean = false;
  allCategories: ICategory[] = [];
  mainCategories: ICategory[] = [];
  isBlocked3Level = false;
  set2Level(item: ICategory) {
    if (!this.isBlockedMain) {
      this.mainCategories.forEach(_ => {
        _.isChoose = _.id === item.id;
      });
      this.isShow3Level = false;
      this.menu2Level = this.allCategories.filter(_ => _.parentId === item.id);
      this.items = [{label: item.name, separator: false, id: '0'}];
      if (this.screenWidth < 550) {
        this.isOpen = false;
        setTimeout(() => {                           // <<<---using ()=> syntax
          this.isShow2Level = true;
        }, 300);
      } else {
        this.isShow2Level = true;
      }
    }
  }



  unset2Level() {
    this.isShow2Level = false;
  }
  private screenHeight  = 0;
  private screenWidth = 0;
  items: MenuItem[] = [];

  @HostListener('window:resize', ['$event'])
  @HostListener('window')
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

  }
  set3Level(item: any) {
    if (!this.isBlocked2Level) {
      this.menu2Level.forEach(_ => {
        _.isChoose = _.id === item.id;
      });
      this.items.push({label: item.name, id: '1'});
      let tempItems = [];
      tempItems.push(...this.items);
      this.items = [];
      this.items = tempItems;
      this.menu3Level = this.allCategories.filter(_ => _.parentId === item.id);
      if (this.menu3Level.length > 0) {
        if (this.screenWidth < 550) {
          this.isShow2Level = false;
          setTimeout(() => {                           // <<<---using ()=> syntax
            this.isShow3Level = true;
          }, 300);
        } else {
          this.isShow3Level = true;
        }
      }
    }
  }

  backMainMenu() {
    this.isShow2Level = false;
    this.isShow3Level = false;
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.isOpen = true;
    }, 300);
  }

  back2LevelMenu() {
    this.isShow3Level = false;
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.isShow2Level = true;
    }, 300);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.isOpen ) {
      this.isOpen = true;
      this.isShow3Level = false;
      this.isShow2Level = false;
    } else {
      this.isOpen = false;
      this.isShow3Level = false;
      this.isShow2Level = false;
    }
  }

  chooseLevel2(item: ICategory) {
    item.isChoose = true;
    this.isBlocked2Level = item.isChoose;
    this.menu2Level.forEach(_ => {
      _.isChoose = _.id === item.id;
    });
    this.menu3Level = this.allCategories.filter(_ => _.parentId === item.id);
    // this.menu2Level.forEach(_ => {_.isChoose = false});
    this.setCategory.emit(item);
    this.isBlocked3Level = false;
  }

  chooseLevel3(item: ICategory) {
    item.isChoose = true;
    this.isBlocked3Level = item.isChoose;
    let ch = this.menu2Level.find(_ => _.id === item.id);
    if (ch) {
      if (item.isChoose) {
        ch!.isChoose = true;
      } else {
        ch!.isChoose = false;
      }
    }
    this.setCategory.emit(item);
  }

  chooseMain(item: ICategory) {
    item.isChoose = true;
    this.mainCategories.forEach(_ => {
      _.isChoose = _.id === item.id;
    });
    this.menu2Level = this.allCategories.filter(_ => _.parentId === item.id);
    this.menu2Level.forEach(_ => {_.isChoose = false});
    this.isBlockedMain = true;
    this.isBlocked2Level = false;
    this.setCategory.emit(item);
  }

  chooseMenu($event: any) {
      switch ($event.item.id){
        case '0': {
          this.items = [];
          this.backMainMenu();
          break;
        }
        case '1':{
          this.back2LevelMenu();
          this.items = this.items.filter(_ => _.id !== '1')
          break;
        }
        default: {
          this.items = [];
          this.isOpen = true;
          this.isShow3Level = false;
          this.isShow2Level = false;
        }
      }
  }

  getIsShow() {
    if (!this.isOpen && !this.isShow3Level && !this.isShow2Level){
      return false;
    }
    if (!this.isOpen && (this.isShow3Level || this.isShow2Level)) {
      return true;
    }
    return false;
  }
}
