import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private isCheckboxCheckedSubject = new BehaviorSubject<boolean>(false);

  setIsCheckboxChecked(isChecked: boolean) {
    this.isCheckboxCheckedSubject.next(isChecked);
  }

  getIsCheckboxChecked(): Observable<boolean> {
    return this.isCheckboxCheckedSubject.asObservable();
  }
}