import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-oservice',
  templateUrl: './oservice.component.html',
  styleUrls: ['./oservice.component.css']
})
export class OserviceComponent {
  constructor(
    private _router: Router,
    ) {
  }

  goToMain() {
    this._router.navigate(['/']);
  }
}
