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
         // Меню всегда открывается «чистым»: isChoose — это состояние показа, а не данные
         // категории, и тащить его из прошлого выбора нельзя.
         this.clearChoice(this.allCategories);
         this.mainCategories = this.allCategories.filter(_ => _.parentId == null && _.id !== null);
      }
    );
  }

  /** Снимает подсветку со списка пунктов меню. */
  private clearChoice(items: ICategory[]): void {
    items.forEach(item => item.isChoose = false);
  }

  /**
   * Полный сброс состояния меню: подсветка на всех уровнях и защёлки isBlocked*.
   * Уровни 2 и 3 — это отфильтрованные проекции одного и того же массива
   * allCategories, поэтому объекты между показами переиспользуются: без сброса
   * пункты, выбранные в прошлый раз, снова приходят подсвеченными.
   */
  private resetMenuState(): void {
    this.clearChoice(this.allCategories);
    this.clearChoice(this.mainCategories);
    this.clearChoice(this.menu2Level);
    this.clearChoice(this.menu3Level);
    this.isBlockedMain = false;
    this.isBlocked2Level = false;
    this.isBlocked3Level = false;
    this.items = [];
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
      // Те же объекты уже могли быть подсвечены в прошлый заход в эту рубрику.
      this.clearChoice(this.menu2Level);
      this.clearChoice(this.menu3Level);
      this.menu3Level = [];
      this.items = [{label: item.name, separator: false, id: '0'}];
      if (this.screenWidth < 550) {
        this.isOpen = false;
        setTimeout(() => {                           // <<<---using ()=> syntax
          this.isShow2Level = true;
        }, 300);
        // this.setCategory.emit(item);
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
      this.clearChoice(this.menu3Level);
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
      if (this.menu3Level.length == 0){
        this.setCategory.emit(item);
      }
    }
  }

  backMainMenu() {
    this.mainCategories.forEach(item => {
      item.isChoose = false
    });
    this.menu2Level.forEach(item => {
      item.isChoose=false;
    });
    this.menu3Level.forEach(item => {
      item.isChoose=false;
    });
    this.isShow2Level = false;
    this.isShow3Level = false;
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.isOpen = true;
    }, 300);
  }

  back2LevelMenu() {
    this.menu2Level.forEach(item => {
      item.isChoose=false;
    });
    this.menu3Level.forEach(item => {
      item.isChoose=false;
    });
    this.isShow3Level = false;
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.isShow2Level = true;
    }, 300);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Меню возвращают на первый уровень — значит и подсветку с защёлками нужно снять,
    // иначе пункт, выбранный в прошлый раз, остаётся активным, а клики по соседним
    // пунктам молча игнорируются (isBlocked*).
    this.resetMenuState();
    this.isShow3Level = false;
    this.isShow2Level = false;
  }

  chooseLevel2(item: ICategory) {
    item.isChoose = true;
    this.isBlocked2Level = item.isChoose;
    this.menu2Level.forEach(_ => {
      _.isChoose = _.id === item.id;
    });
    this.menu3Level = this.allCategories.filter(_ => _.parentId === item.id);
    // this.menu2Level.forEach(_ => {_.isChoose = false});
    if (this.menu3Level.length == 0){
    this.setCategory.emit(item);
    }
    this.isBlocked3Level = false;
    
  }

  chooseLevel3(item: ICategory) {
    // Выбор одиночный: снимаем подсветку с соседей, иначе после нескольких кликов
    // подряд подсвеченными остаются все выбранные ранее пункты.
    this.clearChoice(this.menu3Level);
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
    // this.setCategory.emit(item);
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
