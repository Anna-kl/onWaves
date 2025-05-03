import {NgModule} from "@angular/core";
import { UABeforeComponent } from './uabefore/uabefore.component';
import {ClientsCardListComponent} from "./clients-card-list/clients-card-list.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import { MainMenuComponent } from './main-menu/main-menu.component';
import {MainAppModule} from "../main-app/main-app.module";
import {PaginatorModule} from "primeng/paginator";
import {CommonComponentsModule} from "../common/common.module";
import { CardForSearchComponent } from './card-for-search/card-for-search.component';
import { LandingVersion2Component } from "./landingVersion2/landingVersion2.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ConfirmPopup, ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    UABeforeComponent,
    ClientsCardListComponent,
    MainMenuComponent,
    CardForSearchComponent,
    LandingVersion2Component,
  ],
  imports: [NgIf, NgForOf, AsyncPipe, MainAppModule, 
    PaginatorModule,
    ConfirmPopupModule, ToastModule,
    ProgressSpinnerModule, CommonComponentsModule],
  exports: [ClientsCardListComponent, UABeforeComponent, MainMenuComponent, LandingVersion2Component],
})
export class PagesModule {}
