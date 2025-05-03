import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';


interface ITimer {
  time: string;
  isChoose: boolean;
}

@Component({
  selector: 'app-show-time-modal',
  templateUrl: './show-time-modal.component.html',
  styleUrls: ['./show-time-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShowTimeModalComponent implements OnInit{

  // всплывюещее меню Select овал
  activeItemOv: boolean = false;
  public openListItemsOv(): void {
    this.activeItemOv = !this.activeItemOv;
  }
  // всплывюещее меню Select круг
  activeItemR: boolean = false;
  public openListItemsR(): void {
    this.activeItemR = !this.activeItemR;
  }




  // hours: ITimer[] = [];
  // minutes: ITimer[] = [];
  //
  // settedTime: any = {
  //   hour: '',
  //   minutes: ''
  // };
  // // settedMinutes
  // itemSize: number = 50;
  //
  // timeModel: string | undefined;
  // // blockHeight: 80
  //
  // @ViewChild('hr', { static: true }) viewPortHour: CdkVirtualScrollViewport | undefined;
  // @ViewChild('mnts', { static: true }) viewPortMinutes: CdkVirtualScrollViewport | undefined;
  //


  constructor() {
  }

  ngOnInit(): void {
    // let index = 1;
    // while (index<24){
    //   this.hours.push({time: index < 10 ? '0' + index : String(index), isChoose: false});
    //   index += 1;
    // }
    // const minute = ['00', '15', '30','45'];
    // minute.forEach(item => {
    //   this.minutes.push({time: item, isChoose: false});
    // });

  }

  // setTime(timePicked: any, index: any, minutes?: boolean) {
  //   this.minutes.forEach(item => {
  //     item.isChoose = false;
  //   });
  //   this.hours.forEach(item => {
  //     item.isChoose = false;
  //   });
  //   timePicked.isChoose = true;
  //   const { time } = timePicked;
  //   if (minutes) {
  //     this.settedTime.minutes = time;
  //   } else {
  //     this.settedTime.hour = time;
  //   }
  //   if (this.settedTime.hour && this.settedTime.minutes) {
  //     this.timeModel = `${this.settedTime.hour}:${this.settedTime.minutes}`;
  //     console.log(this.timeModel);
  //   }
  //   this.scrollElement(index, minutes);
  // }

  // private scrollElement(index: number, minutes?: boolean) {
  //   // 81 - высота блока с числом с учетом бордеров (77 + 2 + 2) // думаю стоит записать в переменную, и в шаблоне через инлайновые стили задать высоту
  //   // 145 - высота отступов снизу и сверху
  //   const viewPortHeight = this.viewPortHour?.getViewportSize();
  //   if (minutes) {
  //     // const currentOffset = this.viewPortMinutes.measureScrollOffset('top');
  //     const offset = index * 81 + 145 - viewPortHeight! / 2;
  //     this.viewPortMinutes?.scrollToOffset(offset, "smooth");
  //   } else {
  //     const offset = index * 81 + 145 - viewPortHeight! / 2;
  //     this.viewPortHour?.scrollToOffset(offset, "smooth");
  //   }
  // }
}
