import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
  providers: [AuthService]
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private _auth:AuthService){

  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  email: string = '';
  goHome() {
    throw new Error('Method not implemented.');
  }
  seconds: number = 0;

  }
