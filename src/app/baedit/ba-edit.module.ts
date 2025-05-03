import { NgModule } from "@angular/core";
import { LentaComponent } from "../common/profile/lenta/lenta.component";
import { ProfileBAEditRouting } from "./ba-edit-routing";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { CommonComponentsModule } from "../common/common.module";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        LentaComponent
    ],
    imports: [
        ProfileBAEditRouting,
        ProgressSpinnerModule,
        CommonComponentsModule,
        CommonModule
    ],
      exports: [

      ]
  })
  
  export class BaEditModule {}
  