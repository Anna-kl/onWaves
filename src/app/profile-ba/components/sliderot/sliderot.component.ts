import { Component } from "@angular/core";
import { MessageService, PrimeNGConfig } from "primeng/api";

@Component({
	selector: 'app-sliderot',
  templateUrl: './sliderot.component.html',
  styleUrls: ['./sliderot.component.css'],
	providers: [MessageService]
})

export class SliderotComponent {
	tutorials!: Tutorial[];

	constructor(private messageService: MessageService) {}

	ngOnInit() {
		this.tutorials = [
			{
				name: "Зинаида Смирнова",
				text:
        'Осталась очень довольна посещением студии, мастер добрая и отзывчивая, явно была заинтересована в том, чтобы работа получилась качественной, помогала выбрать цвет и дизайн.',
				image: '/assets/img/1.22_b_a/ava_comments.png',
				ico: "/assets/img/page1/popular/Star-24.png"
			},
			{
				name: "Зинаида Смирнова",
				text:
        'Осталась очень довольна посещением студии, мастер добрая и отзывчивая, явно была заинтересована в том, чтобы работа получилась качественной, помогала выбрать цвет и дизайн.',
				image: '/assets/img/1.22_b_a/ava_comments.png',
				ico: "/assets/img/page1/popular/Star-24.png"
			},
			{
				name: "Зинаида Смирнова",
				text:
        'Осталась очень довольна посещением студии, мастер добрая и отзывчивая,  явно была заинтересована в том, чтобы работа получилась качественной, помогала выбрать цвет и дизайн.',
				image: '/assets/img/1.22_b_a/ava_comments.png',
				ico: "/assets/img/page1/popular/Star-24.png"
			}

		];
	}
	// pageChange(event: any) {
	// 	this.messageService.add({
	// 		severity: "info",
	// 		summary: "Новый комментарий",
	// 		detail: "Отзыв"
	// 	});
	// }
}
export interface Tutorial {
	title?: String;
  name?: String;
	image?: String;
  text?: String;
  ico?: String;
}
