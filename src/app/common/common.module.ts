import {NgModule} from "@angular/core";
import {CalendarComponent} from "./calendar/calendar.component";
import {CommonModule, DatePipe, NgForOf, NgIf} from "@angular/common";
import { RubricMenuComponent } from './rubric-menu/rubric-menu.component';
import {AccordionComponent} from "./accordion/accordion.component";
import {ToastModule} from "primeng/toast";
import {FormsModule} from "@angular/forms";
import {BreadcrumbModule} from "primeng/breadcrumb";
import { ShowFotoComponent } from './modals/galereya/show-foto/show-foto.component';
import {CarouselModule} from "primeng/carousel";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import { AlbumsShowComponent } from './albums-show/albums-show.component';
import { AvatarCroppedComponent } from './avatar-cropped/avatar-cropped.component';
import {ImageCropperModule} from "ngx-image-cropper";
import { ChangeAvatarUAComponent } from './modals/change-avatar-ua/change-avatar-ua.component';
import {SafePipe} from "../pipe/pipeSafe";
import { DelfotoComponent } from './modals/delfoto/delfoto.component';
import { ConfirmWithoutTimeComponent } from './accordion/modals/confirm-without-time/confirm-without-time.component';
import { SelectAddressComponent } from "./select-address/select-address.component";
import { AddPostComponent } from "./profile/addPost/addPost.component";
import { CommonLentaComponent } from "./profile/commonLenta/commonLenta.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { CreateAccordionComponent } from './accordion/create-accordion/create-accordion.component';
import { MyYComponentComponent } from './maps/my-ycomponent/my-ycomponent.component';
import { YMapComponent, YMapDefaultFeaturesLayerDirective, YMapDefaultMarkerDirective, YMapDefaultSchemeLayerDirective, YMapFeatureDirective, YMapMarkerDirective } from "angular-yandex-maps-v3";


@NgModule({
  declarations: [
    CalendarComponent,
    RubricMenuComponent,
    AccordionComponent,
    ShowFotoComponent,
    AlbumsShowComponent,
    AvatarCroppedComponent,
    ChangeAvatarUAComponent,
      SafePipe,
      DelfotoComponent,
      ConfirmWithoutTimeComponent,
      SelectAddressComponent,
      AddPostComponent,
      CommonLentaComponent,
      CreateAccordionComponent,
      MyYComponentComponent
  ],
  imports: [
     YMapComponent, YMapDefaultSchemeLayerDirective, YMapMarkerDirective, YMapFeatureDirective, YMapDefaultMarkerDirective,
  YMapDefaultFeaturesLayerDirective,
    DatePipe,
    NgForOf,
    DatePipe,
    NgIf,
    ToastModule,
    FormsModule,
    BreadcrumbModule,
    CarouselModule,
    TagModule,
    ButtonModule,
    ImageCropperModule,
    ProgressSpinnerModule,
    CommonModule
  ],
    exports: [
        CalendarComponent,
        RubricMenuComponent,
        AccordionComponent,
        AlbumsShowComponent,
        AvatarCroppedComponent,
        SelectAddressComponent,
        AddPostComponent,
        CommonLentaComponent,
        MyYComponentComponent,
    ]
})

export class CommonComponentsModule {}
