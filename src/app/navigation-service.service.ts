import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private location: Location) {}

  goToBack(): void {
    this.location.back();
  }

  goToHelpPage(): void {
    this.location.go('/static/help');
    location.reload();
  }
  goToServicePage(): void {
    this.location.go('/static/oservice');
    location.reload();
  }
}