import { Component, ViewChild, OnInit } from '@angular/core';

import {DictionaryService} from "../../services/dictionary.service";
import {ICategory} from "../DTO/classes/ICategory";
import {ISearchRequest} from "../DTO/views/search/ISearchRequest";
import {Router} from "@angular/router";


export interface Tutorial {
  title?: String;
  name?: String;
  images?: String;
  text?: String;
  ico?: String;

}
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [DictionaryService]
})
export class SliderComponent {
//   images: Image[] = [];
  responsiveOptions!: any[];

  tutorials!: Tutorial[];
  mainCategory: ICategory[] = [];

  constructor(private _apiDictionary: DictionaryService,
              private _route: Router) {
  }

  ngOnInit() {
    this._apiDictionary.getMainCategories().subscribe(
        result => {
          this.mainCategory = result;
        }
    );
    this.responsiveOptions = [
      {
        breakpoint: '6000px',
        numVisible: 9,
        numScroll: 2
      },
      {
        breakpoint: '3200px',
        numVisible: 9,
        numScroll: 2
      },
      {
        breakpoint: '2500px',
        numVisible: 8,
        numScroll: 2
      },
      {
        breakpoint: '1850px',
        numVisible: 7,
        numScroll: 2
      },
      {
        breakpoint: '1600px',
        numVisible: 7,
        numScroll: 2
      },
      {
        breakpoint: '2000px',
        numVisible: 9,
        numScroll: 3
      },
      {
        breakpoint: '1199px',
        numVisible: 5,
        numScroll: 2
      },
      {
        breakpoint: '768px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '460px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '346px',
        numVisible: 1,
        numScroll: 1
      }
    ];
    this.tutorials = [
      {
        name: "Красота",
        images: '/assets/category/beaty.jpg',
      },
      // {
      //   name: "Отдых и туризм",
      //   images: '/assets/img/ico_rubric/2Travel.svg',
      // },
      // {
      //   name: "Эзотерика",
      //   images: '/assets/img/ico_rubric/3esoteric.svg',
      // },
      // {
      //   name: "Обучение и курсы",
      //   images: '/assets/img/ico_rubric/4Studing.svg',
      // },
      {
        name: "Фото, видео, аудио",
        images: '/assets/category/foto_video.jpg',
      },
      {
        name: "Компьютеры и IT",
        images: '/assets/category/it.jpg',
      },
      // {
      //   name: "Мероприятия",
      //   images: '/assets/img/ico_rubric/7Celebration.svg',
      // },
      {
        name: "Бытовые услуги",
        images: '/assets/category/cleaning.jpg',
      },
      // {
      //   name: "Аренда, прокат",
      //   images: '/assets/img/ico_rubric/9Rent.svg',
      // },
      // {
      //   name: "Животные",
      //   images: '/assets/img/ico_rubric/10Pets.svg',
      // },
      {
        name: "Строительство",
        images: '/assets/category/home_service.jpg',
      },
      // {
      //   name: "Доставка груза",
      //   images: '/assets/img/ico_rubric/12Transportation.svg',
      // },
      // {
      //   name: "Авто/Мото",
      //   images: '/assets/img/ico_rubric/13AutoMoto.svg',
      // },
      // {
      //   name: "Ремонт техники",
      //   images: '/assets/img/ico_rubric/8Equipment.svg',
      // },
      // {
      //   name: "Здоровье",
      //   images: '/assets/img/ico_rubric/15Medicine.svg',
      // },
      // {

      //   name: "Спорт",
      //   images: '/assets/img/ico_rubric/16Sport.svg',
      // }

    ];
  }

  getImageStyles(): { [key: string]: string } {
    // Calculate image styles dynamically based on the screen width
    const width = window.innerWidth;
    if (width <= 640) {
      return {width: '100px', height: '100px', 'aspect-ratio': '1 / 1'};
    } else if (width <= 320) {
      return {width: '80px', height: '80px', 'aspect-ratio': '1 / 1'};
    } else {
      return {width: '250px', height: '250px', 'aspect-ratio': '1 / 1'};
    }
  }

  getFontStyles(): { [key: string]: string } {
    // Calculate font size dynamically based on the screen width
    const width = window.innerWidth;
    if (width <= 640) {
      return {'font-size': '16px'};
    } else {
      return {};
    }
    //
  }

  chooseCardForSearch(item: Tutorial) {
    let category = this.mainCategory.find(_ => _.name === item.name);
    const send = {
      search: null,
      distance:  null ,
      categoryId: category ? category.id : null,
      address: '',
      gender: [],
      geo:  null,
    } as ISearchRequest;
    this._route.navigate(['search/result'],  { state: { send } });
  }
}
