import { Component, Input } from '@angular/core';
import { FaqContent } from 'src/app/DTO/views/help/IFaq';

@Component({
  selector: 'app-faq-question',
  templateUrl: './faq-question.component.html',
  styleUrls: ['./faq-question.component.scss']
})
export class FaqQuestionComponent {
  
  @Input() question!: string;
  @Input() content!: FaqContent;

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}