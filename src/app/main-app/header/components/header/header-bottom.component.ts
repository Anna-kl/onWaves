import { Component, OnInit, ViewChild } from "@angular/core";
import { SideMenuComponent } from "../side-menu/side-menu.component";

@Component({
    selector: 'header-bottom',
    templateUrl: './header-bottom.component.html',
    styleUrls: ['./header-bottom.component.less']
})
export class HeaderBottomComponent implements OnInit {

    search: string = '';
    menuActive: boolean = false;
    // @ViewChild()
    @ViewChild("menu", {static: false})
    private sideMenuComponent: SideMenuComponent | undefined;

    ngOnInit(): void {

    }

    toggleMenu(): void {
        this.menuActive = !this.menuActive;
        if (!this.menuActive) {
            this.sideMenuComponent?.closeMenu();
        }
    }

  goToExtSearch() {

  }

  goToStranica() {

  }
}
