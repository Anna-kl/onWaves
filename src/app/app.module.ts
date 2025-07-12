import {LOCALE_ID, NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { MainPageComponent } from './pages/main-page.component';
import { SliderComponent } from './slider/slider.component';
import { ModalEnterDataComponent } from './components/modals/register-profile/modal-enter-data/modal-enter-data.component';
import { ModalRegisterComponent } from './components/modals/register-profile/modal-register/modal-register.component';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { BusService } from '../services/busService';
import { ModalNextComponent } from './components/modals/register-profile/modal-next/modal-next.component';
import { ModalRegisterNextComponent } from './components/modals/register-profile/modal-register-next/modal-register-next.component';

import {RegisterBusinessProfileComponent} from "./components/modals/register-business-profile/register-business-profile.component";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import {ToastModule} from "primeng/toast";
import {ImageModule} from "primeng/image";


import { GrafikComponent } from './baedit/components/grafik/grafik.component';
import { OplataComponent } from './baedit/components/oplata/oplata.component';

import { GalereyaComponent } from './baedit/components/galereya/galereya.component';
import { CardalbombaComponent } from './baedit/components/galereya/cardalbomba/cardalbomba.component';
import { CardalbombafotoComponent } from './baedit/components/galereya/cardalbombafoto/cardalbombafoto.component';

import {CommonModule, DatePipe, HashLocationStrategy, LocationStrategy, NgOptimizedImage, PathLocationStrategy} from "@angular/common";


import { MainAppModule } from './main-app/main-app.module';
import {ModalComponent} from "./baedit/components/uslugi/modal/modal.component";
import {ModalserviceComponent} from "./baedit/components/uslugi/modalservice/modalservice.component";
import {ProfileBAComponent} from "./profile-ba/profileba/profileba.component";
import {ProfileBAModule} from "./profile-ba/profile-ba.module";
import {CategoryTreeComponent} from "./common/category-tree/category-tree.component";
import {ProfileBasicComponent} from "./baedit/profilebisacc/profilebisacc.component";
import {
  CreateServiceModalComponent
} from "./baedit/components/modals/create-service-modal/create-service-modal.component";
import {
  CreateServiceCategoryModalComponent
} from "./baedit/components/modals/create-service-category-modal/create-service-category-modal.component";
import {
  CreateServiceOplataModalComponent
} from "./baedit/components/modals/create-service-oplata-modal/create-service-oplata-modal.component";
import {ColumnBAProfileEditComponent} from "./baedit/components/column-baprofile/column-baprofile.component";

import {RubricComponent} from "./baedit/components/rubric/rubric.component";
import {MenueditbaprofileComponent} from "./baedit/menu-ba-edit/menueditbaprofile.component";
import {BAEditComponent} from "./baedit/baedit.component";
import {ProfileDataEditService} from "./baedit/services/ba-edit-service";
import {ProfileBAEditRouting} from "./baedit/ba-edit-routing";
import {MainProfileComponent} from "./baedit/components/main-profile/main-profile.component";
import {UslugiComponent} from "./baedit/components/uslugi/uslugi.component";
import {AccordionComponent} from "./common/accordion/accordion.component";
import {ContactsComponent} from "./baedit/components/contacts/contacts.component";
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {MyNotesComponent} from "./profile-user/my-notes/my-notes.component";
import {ModalCalendarComponent} from "./baedit/components/modals/modal-calendar/modal-calendar.component";
import {BANotesComponent} from "./profile-ba/notes/ba-notes/ba-notes.component";
import {CommonComponentsModule} from "./common/common.module";
import { ChangeModalGroupComponent } from './baedit/components/uslugi/change-modal-group/change-modal-group.component';
import { HelpComponent } from './static/help/help.component';
import { SettingsComponent } from './profile-user/settings/settings.component';
import { HelpQuestionComponent } from './static/help-question/help-question.component';
import { HelpQuestionsAnswerComponent } from './static/help-questions-answer/help-questions-answer.component';
import { ExtsearchComponent } from './search/extsearch/extsearch.component';
import { ResultComponent } from './search/result/result.component';
import { OserviceComponent } from './static/oservice/oservice.component';
import { ProfileuaComponent } from './profileua/profileua.component';
import { PravilaComponent } from './static/pravila/pravila.component';
import { UAAfterRegisterComponent } from './pages/uaafter-register/uaafter-register.component';
import {PagesModule} from "./pages/pages.module";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {MenuModule} from "primeng/menu";
import { CropImgComponent } from './maks/crop-img/crop-img.component';
import {ImageCropperModule} from "ngx-image-cropper";
import { PersonalPageUserComponent } from './profile-user/personal-page-user/personal-page-user.component';
import { StranicaComponent } from './static/stranica/stranica.component';

import { NotificationPageComponent } from './components/mesages/notification-page/notification-page.component';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../enviroments/environment";
import {CalendarModule} from "primeng/calendar";
import { FooternComponent } from './static/footern/footern.component';
import { DisallowSymbolsDirective } from './disallow-symbols.directive';
import {StoreModule} from "@ngrx/store";
import { CreateAlbumComponent } from './baedit/components/modals/create-album/create-album.component';
import { FormatsComponent } from './components/modals/formats/formats.component';
import { LowermenuComponent } from './static/lowermenu/lowermenu.component';

import { TypographyComponent } from './static/typography/typography.component';

import { CropImageModalComponent } from './baedit/components/modals/crop-image-modal/crop-image-modal.component';
import { MainRubricComponent } from './services/main-rubric/main-rubric.component';
import {StoreComponent} from "./ngrx-store/mainClient/store.component";
import {stateReducerBAClient} from "./ngrx-store/profileBAClient/ba-store.reducer";
import {stateReducerMainClient} from "./ngrx-store/mainClient/store.reducer";
import {stateReducerChecedIDClient} from "./ngrx-store/checkedClientID/idClient.state";
import {AutocompleteLibModule} from "angular-ng-autocomplete";

import { FormatuslugiComponent } from './components/modals/formatuslugi/formatuslugi.component';
import { ChooseAlbumComponent } from './baedit/components/modals/choose-album/choose-album.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { PoliciesComponent } from './static/policies/policies.component';
import { ProfileBAInfoComponent } from './baedit/profilebisacc/profile-bainfo/profile-bainfo.component';
import { ModalAlbumComponent } from './baedit/profilebisacc/modalalbum/modalalbum.component';
import { ShowTimeModalComponent } from './baedit/components/modals/show-time-modal/show-time-modal.component';
import {NgScrollbar, ScrollViewport} from "ngx-scrollbar";
import { ReviewsUserComponent } from './profile-user/components/reviews-user/reviews-user.component';
import {NotificationEffect} from "./ngrx-store/notification/effect/notification.effect";
// import {EffectsModule} from "@ngrx/effects";
import {reducers} from "./ngrx-store/notification/notification.reducers";
import {UIModule} from "./ui/ui.module";
import { DeleteaccComponent } from './baedit/components/modals/deleteacc/deleteacc.component';
import {LoginService} from "./auth/login.service";
import {loadUpdateReducer} from "./ngrx-store/update/update.reducers";
import { DelalbumComponent } from './baedit/components/galereya/delalbum/delalbum.component';


import {
  ModalRegisterEndComponent
} from "./components/modals/register-profile/modal-register-end/modal-register-end.component";

import {reducersLink} from "./ngrx-store/links/link.reducers";
import {LinkEffect} from "./ngrx-store/links/effect/link.effect";

import { DeleteAlbumComponent } from './baedit/components/modals/delete-album/delete-album.component';
import { DeleteImageAlbumComponent } from './baedit/components/modals/delete-image-album/delete-image-album.component';

import { AlbumPhoneComponent } from './components/phone/album-phone/album-phone.component';

import { FotoPhoneComponent } from './components/phone/foto-phone/foto-phone.component';
import {GalleriaModule} from "primeng/galleria";
import { PageClient1Component } from './maks/pageClient1/pageClient1.component';
import { BaEditModule } from './baedit/ba-edit.module';
import { ChatMainComponent } from './pages/chat-main/chat-main.component';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { EffectsModule } from '@ngrx/effects';
import { provideYConfig, YConfig
 } from 'angular-yandex-maps-v3';


const mapConfig: YConfig  = {
    apikey: '91ce60c3-9067-4742-9c3c-302de08cfc30',
    lang: 'ru_RU',
};


// Регистрируем локаль "ru"
registerLocaleData(localeRu, 'ru');

// registerLocaleData(localeRu, 'ru');
@NgModule({
  declarations: [
    ChatMainComponent,
    AppComponent,
    MainPageComponent,
    ModalserviceComponent,
    SliderComponent,
    ModalEnterDataComponent,
    ModalRegisterComponent,
    ModalNextComponent,
    ModalRegisterNextComponent,
    RegisterBusinessProfileComponent,
    ProfileBAComponent,
    GrafikComponent,
    OplataComponent,
    GalereyaComponent,
    CardalbombaComponent,
    CardalbombafotoComponent,
    ModalComponent,
    ProfileBAComponent,
    CategoryTreeComponent,
    ProfileBasicComponent,
    CreateServiceModalComponent,
    CreateServiceCategoryModalComponent,
    CreateServiceOplataModalComponent,
    ColumnBAProfileEditComponent,
    RubricComponent,
    MenueditbaprofileComponent,
    BAEditComponent,
    MainProfileComponent,
    UslugiComponent,
    ContactsComponent,
    MyNotesComponent,
    BANotesComponent,
    ModalCalendarComponent,
    ChangeModalGroupComponent,
    HelpComponent,
    SettingsComponent,
    HelpQuestionComponent,
    HelpQuestionsAnswerComponent,
    ExtsearchComponent,
    ResultComponent,
    OserviceComponent,
    ProfileuaComponent,
    PravilaComponent,
    UAAfterRegisterComponent,
    CropImgComponent,
    PersonalPageUserComponent,
    StranicaComponent,
    NotificationPageComponent,
    FooternComponent,
    DisallowSymbolsDirective,
    CreateAlbumComponent,
    FormatsComponent,
    LowermenuComponent,
    TypographyComponent,
    CropImageModalComponent,
    MainRubricComponent,
    StoreComponent,
    FormatuslugiComponent,
    ChooseAlbumComponent,
    PoliciesComponent,
      ProfileBAInfoComponent,
      ModalAlbumComponent,
      ShowTimeModalComponent,
      ReviewsUserComponent,
      DeleteaccComponent,
      DelalbumComponent,
    ModalRegisterEndComponent,
    DeleteAlbumComponent,
    DeleteImageAlbumComponent,
    AlbumPhoneComponent,
    FotoPhoneComponent,
    PageClient1Component
  ],
    imports: [
      NgxMaskDirective,
       NgxMaskPipe,
      BrowserModule,
      ScrollingModule,
      RouterModule,
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      CarouselModule,
      ButtonModule,
      AppRoutingModule,
      NgbDropdownModule,
      ReactiveFormsModule,
      FormsModule,
      ToastModule,
      ImageModule,
      UIModule,
      NgOptimizedImage,
      MainAppModule,
      ProfileBAModule,
      CommonComponentsModule,
      BaEditModule,
      PagesModule, ProgressSpinnerModule, MenuModule, ImageCropperModule,
      // AngularFireMessagingModule,
      // AngularFireModule.initializeApp({ /* See project settings in Firebase Console for this information */
      //     apiKey: "AIzaSyBiOQ4X8q8Kf5UHwTq_TaRSTb9j0xClRJs",
      //     authDomain: "ocpio-311510.firebaseapp.com",
      //     projectId: "ocpio-311510",
      //     storageBucket: "ocpio-311510.appspot.com",
      //     messagingSenderId: "625145012665",
      //     appId: "1:625145012665:web:b19feea8ea4bd2679fd668",
      //     measurementId: "G-T8F0R2G5YN"
      // }),
      EffectsModule.forFeature([NotificationEffect, LinkEffect]),
      EffectsModule.forRoot([]),
      StoreModule.forFeature('notification', reducers),
      StoreModule.forFeature('link', reducersLink),
      StoreModule.forRoot({
          modeleReducerPoint: stateReducerMainClient, baClientReducer: stateReducerBAClient,
          checedIdClient: stateReducerChecedIDClient, updateGallery: loadUpdateReducer
      }),
      StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
      CalendarModule, AutocompleteLibModule, NgScrollbar, ScrollViewport,
      ClipboardModule,
      GalleriaModule,
      ],
  providers: [NgbDropdown,ProfileDataEditService, BusService,LoginService,   provideNgxMask(),
    { provide: LOCALE_ID, useValue: 'ru' }, provideYConfig(mapConfig)],

  bootstrap: [AppComponent],

    exports: [
        // CategoryTreeComponent,
        // AccordionComponent
    ]
})
export class AppModule {
}
