import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-accordion',
  templateUrl: './create-accordion.component.html',
  styleUrls: ['./create-accordion.component.scss']
})
export class CreateAccordionComponent {

  constructor(
    private _route: Router,
    private route: ActivatedRoute) {}

    getUrls(childrenPanh: string, type: string) {

      const id = this.route.snapshot.paramMap.get('id');
        this._route.navigate([`/ba-edit/${id}/${childrenPanh}`, { isActive: type }]);
    }
 
}
