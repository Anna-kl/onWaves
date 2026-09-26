import {NgModule} from "@angular/core";
import {GroupServiceComponent} from "./components/group-service/group-service.component";
import {ConfirmRecordComponent} from "./components/confirm-record/confirm-record.component";

import {ChooseTimeModalComponent} from "./components/choose-time-modal/choose-time-modal.component";
import {ChooseDateTimeComponent} from "./components/choose-date-time/choose-date-time.component";
import {CommonModule, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {ProfileBARouting} from "./profileBARouting";

import {ProfileDataService} from "./services/profile-data.service";
import {SliderBAComponent} from "./components/sliderba/sliderba.component";
import {CarouselModule} from "primeng/carousel";
import {ButtonModule} from "primeng/button";
import {SliderotComponent} from "./components/sliderot/sliderot.component";
import {ImageModule} from "primeng/image";
import { PageUserBAComponent } from './components/page-user-ba/page-user-ba.component';
import {ColumnBAProfileComponent} from "./components/column-baprofile/column-baprofile.component";
import {AddRecordBAComponent} from "./notes/add-record-ba/add-record-ba.component";
import {CommonNotesComponent} from "./notes/common-notes.component";
import {ProfileBANotesRouting} from "./notes/notes-routing.module";
import {NotesService} from "./notes/notes-events.service";
import { CabinetBAComponent } from './cabinet-ba/cabinet-ba.component';
import {RouterModule} from "@angular/router";
import {CommonComponentsModule} from "../common/common.module";
import {NgxMaskDirective, NgxMaskPipe} from "ngx-mask";
import { ArendaComponent } from '../baedit/components/uslugi/arenda/arenda.component';
import { UslugisComponent } from './uslugis/uslugis.component';

import { Arenda2Component } from '../baedit/components/uslugi/arenda2/arenda2.component';
import { ServiceFormatSelectComponent } from '../baedit/components/uslugi/service-format-select/service-format-select.component';
import { ServicePriceUnitSelectComponent } from '../baedit/components/uslugi/service-price-unit/service-price-unit.component';
import { ServiceMediaComponent } from '../baedit/components/uslugi/service-media/service-media.component';
import { Uslugis2Component } from './uslugis2/uslugis2.component';

import { DayrentComponent } from './dayrent/dayrent.component';
import {ReviewsComponent} from "../baedit/profilebisacc/reviews/reviews.component";
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { RecordSuccessTelegramModalComponent } from './components/record-success-telegram-modal/record-success-telegram-modal.component';

import {UIModule} from "../ui/ui.module";
import { ConfirmRecord2Component } from './components/confirm-record2/confirm-record2.component';
import { SetIntervalStartComponent } from './components/set-interval-start/set-interval-start.component';
import { ErrorConfirmRecordComponent } from "./components/errorConfirmRecord/error-confirm-record.component";
import { YMapComponent } from "angular-yandex-maps-v3";
import { CouponNewUserComponent } from './popup/coupon-new-user/coupon-new-user.component';
import { ShowPhoneCouponComponent } from './popup/show-phone-coupon/show-phone-coupon.component';
import { BookingContactModalComponent } from './components/booking-contact-modal/booking-contact-modal.component';
import { LandingUiModule } from './landing-ui.module';
import { CellingsOfferComponent } from './components/cellings-offer/cellings-offer.component';


@NgModule({
  declarations: [
    GroupServiceComponent,
    ConfirmRecordComponent,
    ColumnBAProfileComponent,
    ChooseTimeModalComponent,
    ChooseDateTimeComponent,
    SliderBAComponent,
    SliderotComponent,
    PageUserBAComponent,
    AddRecordBAComponent,
    CommonNotesComponent,
    CabinetBAComponent,
    ArendaComponent,
    ServiceFormatSelectComponent,
    ServicePriceUnitSelectComponent,
    ServiceMediaComponent,
    UslugisComponent,
    Arenda2Component,
    Uslugis2Component,
    DayrentComponent,
    ReviewsComponent,
    ConfirmModalComponent,
    RecordSuccessTelegramModalComponent,
    ConfirmRecord2Component,
    SetIntervalStartComponent,
    ErrorConfirmRecordComponent,
    CouponNewUserComponent,
    BookingContactModalComponent,
    CellingsOfferComponent,
    // ShowPhoneCouponComponent
  ],
    imports: [
      YMapComponent,
      // Public profile booking routes must be registered before notes/:id.
      // Otherwise a profile whose slug is "notes" opens notes/:id with
      // id="choose-service" instead of /:id/choose-service.
      ProfileBARouting,
      ProfileBANotesRouting,
      NgxMaskDirective, NgxMaskPipe,
        NgClass,
        FormsModule,
        NgIf,
        DatePipe,
        NgForOf,
        CarouselModule,
        ButtonModule,
        ImageModule,
        ReactiveFormsModule,
        NgxMaskDirective,
        UIModule,
        CommonComponentsModule,
        CommonModule,
        LandingUiModule],
  exports: [
    ProfileBARouting,
    ProfileBANotesRouting,
    GroupServiceComponent,
    ConfirmRecordComponent,
    ColumnBAProfileComponent,
    ChooseTimeModalComponent,
    ChooseDateTimeComponent,
    SliderBAComponent,
    SliderotComponent,
    CommonNotesComponent,
    ReviewsComponent,
    PageUserBAComponent,
    CouponNewUserComponent,
    CellingsOfferComponent,
    LandingUiModule
  ],
  providers: [ProfileDataService, NotesService]
})
export class ProfileBAModule {}
