import {NgModule} from "@angular/core";
import { RouterModule } from '@angular/router';
import { UABeforeComponent } from './uabefore/uabefore.component';
import {ClientsCardListComponent} from "./clients-card-list/clients-card-list.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import { MainMenuComponent } from './main-menu/main-menu.component';
import {MainAppModule} from "../main-app/main-app.module";
import {PaginatorModule} from "primeng/paginator";
import {CommonComponentsModule} from "../common/common.module";
import { CardForSearchComponent } from './card-for-search/card-for-search.component';
import { LandingVersion2Component } from "./landingVersion2/landingVersion2.component";
import { ConfirmPopup, ConfirmPopupModule } from 'primeng/confirmpopup';
import { MasterBookingLandingSectionComponent } from "./landingVersion2/components/master-booking-landing-section/master-booking-landing-section.component";
import { MastersLandingComponent } from "./masters-landing/masters-landing.component";


@NgModule({
  declarations: [
    UABeforeComponent,
    ClientsCardListComponent,
    MainMenuComponent,
    CardForSearchComponent,
    LandingVersion2Component,
    MasterBookingLandingSectionComponent,
    MastersLandingComponent],
  imports: [NgIf, NgForOf, AsyncPipe, MainAppModule,
    RouterModule,
    PaginatorModule,
    ConfirmPopupModule,
    CommonComponentsModule],
  exports: [ClientsCardListComponent, UABeforeComponent, MainMenuComponent, LandingVersion2Component, MastersLandingComponent],
})
export class PagesModule {}
