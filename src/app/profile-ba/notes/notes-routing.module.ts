import {RouterModule, Routes} from "@angular/router";

import {BANotesComponent} from "./ba-notes/ba-notes.component";
import {AddRecordBAComponent} from "./add-record-ba/add-record-ba.component";
import {NgModule} from "@angular/core";
import {CommonNotesComponent} from "./common-notes.component";

const routes: Routes = [
  { path:'notes/:id', component: CommonNotesComponent, children: [
      { path: '',     component: BANotesComponent},
      {path: 'add-record-ba',     component: AddRecordBAComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class ProfileBANotesRouting { }
