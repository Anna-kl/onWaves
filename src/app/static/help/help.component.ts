import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {

  setMaster() {
    this.btnProfile = false;
  }
  setClient() {
    this.btnProfile = true;
  }

  btnProfile: boolean = true;
  flag = false;

  constructor(
    private _router: Router,
    ) {

  }
  goToMainPage() {
    this._router.navigate(['/']);
  }
  goToHelpQuestionPage() {
    this._router.navigate(['static/helpQuestion']);
  }
}
