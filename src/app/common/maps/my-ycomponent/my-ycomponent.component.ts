import { Component, Input, OnInit } from '@angular/core';
import { IViewCoordinates } from 'src/app/DTO/views/profile/IViewCoordinates';

@Component({
  selector: 'app-my-ycomponent',
  templateUrl: './my-ycomponent.component.html',
  styleUrls: ['./my-ycomponent.component.css']
})
export class MyYComponentComponent implements OnInit {
  ngOnInit(): void {
   
  }

  @Input() geo: IViewCoordinates|null = null;

}
