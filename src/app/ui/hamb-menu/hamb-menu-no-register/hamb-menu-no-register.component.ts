import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';

import { ModalNextComponent } from '../../../components/modals/register-profile/modal-next/modal-next.component';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { NavigationService } from 'src/app/navigation-service.service';

import {
  ModalRegisterComponent
} from "../../../components/modals/register-profile/modal-register/modal-register.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hamb-menu-no-register',
  templateUrl: './hamb-menu-no-register.component.html',
  styleUrls: ['./hamb-menu-no-register.component.css']
})
export class HambMenuNoRegisterComponent implements OnInit{
  status: boolean = false;
  @Output() onCloseMenu = new EventEmitter<boolean>();
  // active: boolean = false;
  isMenuOpen: boolean = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  hideMenu() {
    // this.active = false;
    this.onCloseMenu.emit(false);
  }
  //
  // clickEvent() {
  //   this.status = !this.status;
  // }
  constructor(private elementRef: ElementRef,
              private _route: Router,
              private modalService: NgbModal,
              private renderer: Renderer2,
              private navigationService: NavigationService) {
    this.renderer.listen('window', 'click',(e:Event)=>{
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      let element = e.target as HTMLElement;
      if(element.className.toString().includes('btn1')
        || element.className.toString().includes('hamburger-icon2')
        || element.className.toString().includes('icon-left')
        || element.className.toString().includes('icon-right')){
        this.isMenuOpen = !this.isMenuOpen;
      }else {
        this.isMenuOpen = false;
      }
    });
  }
  /////////////////////////////////////
 
  /////////////////////////////////////

  @ViewChild('toggleButton') toggleButton: ElementRef | undefined;
  @ViewChild('menu') menu: ElementRef | undefined;
  isCollapsed=false;
  openPopUp() {
    this.status = !this.status;
    const modalRef = this.modalService.open(ModalRegisterComponent);
  }

  ngOnInit(): void {

  }

  cropImage() {
    this._route.navigate(['/notification']);
  }
  getToHelp() {
    this._route.navigate(['static/help']);
  }
  getToService() {
    this._route.navigate(['static/oservice']);
  }
  redirectMainPage() {
    this._route.navigate(['/']);
  }
  goToHelp(): void {
    this.navigationService.goToHelpPage();
  }
  goToService(): void {
    this.navigationService.goToServicePage();
  }
  goToBack(): void {
    this.navigationService.goToBack();
  }
}

