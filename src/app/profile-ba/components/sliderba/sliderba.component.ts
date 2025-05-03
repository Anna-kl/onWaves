
import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ImageModule } from 'primeng/image';

export interface Tutorial {
  title?: String;
  image?: String;
}
@Component({
  selector: 'app-sliderba',
    templateUrl: './sliderba.component.html',
    styleUrls: ['./sliderba.component.css']
})
export class SliderBAComponent {
    tutorials!: Tutorial[];
    responsiveOptions!: any[];
    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.tutorials = [
            {
                image:
                '/assets/img/1.22_b_a/manicure_1.jpg',
            },
            {

                image:
                '/assets/img/1.22_b_a/manicure_2.jpg',
            },
            {

                image:
                '/assets/img/1.22_b_a/manicure_3.jpg',
            },
            {

                image:
                '/assets/img/1.22_b_a/manicure_4.jpg',
            },
            {

                image:
                '/assets/img/1.22_b_a/manicure_5.jpg'
            },
        ];
        this.responsiveOptions = [
            {
              breakpoint: '1600px',
              numVisible: 5,
              numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 3,
                numScroll: 1
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
    }
}
// import { Component, OnInit } from '@angular/core';
// import { PrimeNGConfig } from 'primeng/api';

// @Component({
//     selector: 'app-sliderba',
//    templateUrl: './sliderba.component.html',
//     styleUrls: ['./sliderba.component.css']
// })
// export class SliderbaComponent implements OnInit {

//   images!: any[];

//   responsiveOptions!: any[];

//   numVisible = 1;

//   constructor(private primengConfig: PrimeNGConfig) {}

//   ngOnInit() {
//     this.images = [
//       {src: '/assets/img/1.22_b_a/manicure_1.jpg', alt: 'Image 1'},
//       {src: '/assets/img/1.22_b_a/manicure_2.jpg', alt: 'Image 2'},
//       {src: '/assets/img/1.22_b_a/manicure_3.jpg', alt: 'Image 3'},
//       {src: '/assets/img/1.22_b_a/manicure_4.jpg', alt: 'Image 4'},
//       {src: '/assets/img/1.22_b_a/manicure_5.jpg', alt: 'Image 5'}
//     ];

//     this.responsiveOptions = [
//       {
//         breakpoint: '1024px',
//         numVisible: 3,
//         numScroll: 3
//       },
//       {
//         breakpoint: '768px',
//         numVisible: 2,
//         numScroll: 2
//       },
//       {
//         breakpoint: '560px',
//         numVisible: 1,
//         numScroll: 1
//       }
//     ];

//     this.primengConfig.ripple = true;
//   }

// }
