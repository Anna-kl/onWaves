import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProfileBAComponent} from "./profileba/profileba.component";
import {GroupServiceComponent} from "./components/group-service/group-service.component";

import {PageUserBAComponent} from "./components/page-user-ba/page-user-ba.component";
import {ChooseDateTimeComponent} from "./components/choose-date-time/choose-date-time.component";
import {ConfirmRecordComponent} from "./components/confirm-record/confirm-record.component";
import {ReviewsComponent} from "../baedit/profilebisacc/reviews/reviews.component";
import { ConfirmRecord2Component } from "./components/confirm-record2/confirm-record2.component";
import { LentaComponent } from "../common/profile/lenta/lenta.component";

const routes: Routes = [
  // { path:'profile-ba/:id', component: ProfileBAComponent, children: [
  //     { path: '',     component: PageUserBAComponent},
  //     // {path: 'choose-service',     component: GroupServiceComponent},
  //     {path: 'choose-date',     component: ChooseDateTimeComponent},
  //     {path: 'confirm-record',     component: ConfirmRecordComponent},
  //     {path: 'reviews',     component: ReviewsComponent},
  //   ]
  // },
  { path:':id', component: ProfileBAComponent, children: [
      { path: '',     component: PageUserBAComponent},
      { path: 'lenta',     component: LentaComponent},
    ]},
      {path: ':id/choose-service',     component: GroupServiceComponent},
  {path: ':id/choose-date',     component: ChooseDateTimeComponent},
      {path: ':id/confirm-record',     component: ConfirmRecordComponent},
      {path: ':id/reviews',     component: ReviewsComponent},
      {path: ':id/confirm-record2',     component: ConfirmRecord2Component},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class ProfileBARouting { }
