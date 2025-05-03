import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./main-page.component";
import {PageUserBAComponent} from "../profile-ba/components/page-user-ba/page-user-ba.component";
import {UABeforeComponent} from "./uabefore/uabefore.component";
import {UAAfterRegisterComponent} from "./uaafter-register/uaafter-register.component";
import { LandingVersion2Component } from "./landingVersion2/landingVersion2.component";


const routes: Routes = [
  {
    path: 'main-page', component: MainPageComponent, children: [
      { path: 'no-register',     component: LandingVersion2Component},
      { path: 'after', component: UAAfterRegisterComponent},
    ]
  }
  ]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class PagesRoutingModule {
  constructor() {
    console.log('routing');
  }
}
