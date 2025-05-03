import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-help-question',
  templateUrl: './help-question.component.html',
  styleUrls: ['./help-question.component.css']
})
export class HelpQuestionComponent {
  constructor(
    private _router: Router,
    ) {
  }
  goToHelpQuestionAnswerPage() {
    this._router.navigate(['static/helpQuestionAnswer']);
  }
  goToHelp() {
    this._router.navigate(['static/help']);
  }
}
