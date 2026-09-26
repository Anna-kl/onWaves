import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CarouselModule } from 'primeng/carousel';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { BrowserModule, HAMMER_LOADER, provideClientHydration } from '@angular/platform-browser';

import { MainPageComponent } from './pages/main-page.component';
import { SliderComponent } from './slider/slider.component';
import { ModalEnterDataComponent } from './components/modals/register-profile/modal-enter-data/modal-enter-data.component';
import { ModalRegisterComponent } from './components/modals/register-profile/modal-register/modal-register.component';
import { NgbDropdown, NgbDropdownModule, NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { BusService } from '../services/busService';
import { ModalNextComponent } from './components/modals/register-profile/modal-next/modal-next.component';
import { ModalRegisterNextComponent } from './components/modals/register-profile/modal-register-next/modal-register-next.component';

import {RegisterBusinessProfileComponent} from "./components/modals/register-business-profile/register-business-profile.component";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import {ImageModule} from "primeng/image";


import {CommonModule, DatePipe, HashLocationStrategy, LocationStrategy, NgOptimizedImage, PathLocationStrategy} from "@angular/common";


import { MainAppModule } from './main-app/main-app.module';
import {ProfileBAComponent} from "./profile-ba/profileba/profileba.component";
import {ProfileBAModule} from "./profile-ba/profile-ba.module";
import {ProfileDataEditService} from "./baedit/services/ba-edit-service";
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {BANotesComponent} from "./profile-ba/notes/ba-notes/ba-notes.component";
import {CommonComponentsModule} from "./common/common.module";
import { ExtsearchComponent } from './search/extsearch/extsearch.component';
import { ResultComponent } from './search/result/result.component';
import { ProfileuaComponent } from './profileua/profileua.component';
import { UAAfterRegisterComponent } from './pages/uaafter-register/uaafter-register.component';
import {PagesModule} from "./pages/pages.module";
import {ImageCropperModule} from "ngx-image-cropper";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../enviroments/environment";
import { DisallowSymbolsDirective } from './disallow-symbols.directive';
import {StoreModule} from "@ngrx/store";
import { FormatsComponent } from './components/modals/formats/formats.component';
import { MainRubricComponent } from './services/main-rubric/main-rubric.component';
import {StoreComponent} from "./ngrx-store/mainClient/store.component";
import {stateReducerBAClient} from "./ngrx-store/profileBAClient/ba-store.reducer";
import {stateReducerMainClient} from "./ngrx-store/mainClient/store.reducer";
import {stateReducerChecedIDClient} from "./ngrx-store/checkedClientID/idClient.state";

import { FormatuslugiComponent } from './components/modals/formatuslugi/formatuslugi.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {NgScrollbar, ScrollViewport} from "ngx-scrollbar";
import {NotificationEffect} from "./ngrx-store/notification/effect/notification.effect";
// import {EffectsModule} from "@ngrx/effects";
import {reducers} from "./ngrx-store/notification/notification.reducers";
import {UIModule} from "./ui/ui.module";
import {LoginService, initializeAuth} from "./auth/login.service";
import {loadUpdateReducer} from "./ngrx-store/update/update.reducers";
import {
  ModalRegisterEndComponent
} from "./components/modals/register-profile/modal-register-end/modal-register-end.component";

import {reducersLink} from "./ngrx-store/links/link.reducers";
import {LinkEffect} from "./ngrx-store/links/effect/link.effect";

import { AlbumPhoneComponent } from './components/phone/album-phone/album-phone.component';

import { FotoPhoneComponent } from './components/phone/foto-phone/foto-phone.component';
import {GalleriaModule} from "primeng/galleria";

import { ClipboardModule } from '@angular/cdk/clipboard';
import { EffectsModule } from '@ngrx/effects';
import { provideYConfig, YConfig
 } from 'angular-yandex-maps-v3';
import { InsertPinCodeComponent } from './components/modals/insert-pin-code/insert-pin-code.component';
import { loadAIReducer, reducersAI } from './ngrx-store/aiStore/ai.reducers';
import { AIEffect } from './ngrx-store/aiStore/effect/ai.effect';
import { RegisterEmailComponent } from './components/modals/register-profile/register-email/register-email.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { RegisterEmailCodeComponent } from './components/modals/register-profile/register-email-code/register-email-code.component';
import { EmailSanitizeDirective } from './components/modals/services/email.directive';
import { AppToastComponent } from './ui/toast/app-toast.component';
const mapConfig: YConfig  = {
    apikey: '91ce60c3-9067-4742-9c3c-302de08cfc30',
    lang: 'ru_RU',
};


// Регистрируем локаль "ru"
registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    EmailSanitizeDirective,
    AppComponent,
    MainPageComponent,
    SliderComponent,
    ModalEnterDataComponent,
    ModalRegisterComponent,
    ModalNextComponent,
    ModalRegisterNextComponent,
    RegisterBusinessProfileComponent,
    ProfileBAComponent,
    ProfileBAComponent,
    BANotesComponent,
    ExtsearchComponent,
    ResultComponent,
    ProfileuaComponent,
    UAAfterRegisterComponent,
    DisallowSymbolsDirective,
    FormatsComponent,
    MainRubricComponent,
    StoreComponent,
    FormatuslugiComponent,
    ModalRegisterEndComponent,
    AlbumPhoneComponent,
    FotoPhoneComponent,
    InsertPinCodeComponent,
    RegisterEmailComponent,
    ConfirmEmailComponent,
    RegisterEmailCodeComponent
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
    AppRoutingModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    FormsModule,
    ImageModule,
    AppToastComponent,
    UIModule,
    NgOptimizedImage,
    MainAppModule,
    ProfileBAModule,
    CommonComponentsModule,
    PagesModule, ImageCropperModule,
    EffectsModule.forFeature([NotificationEffect, LinkEffect, AIEffect]),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('notification', reducers),
    StoreModule.forFeature('link', reducersLink),
    StoreModule.forFeature('aiStore', reducersAI),
    StoreModule.forRoot({
        modeleReducerPoint: stateReducerMainClient, baClientReducer: stateReducerBAClient,
        checedIdClient: stateReducerChecedIDClient, updateGallery: loadUpdateReducer,
        aiReducer: loadAIReducer
    }),
    // logOnly не выключает инструментацию — стор всё равно снимает и держит
    // 25 снимков состояния на каждый экшен. В проде devtools не нужен вовсе;
    // до правки fileReplacements в angular.json `environment.production` в
    // задеплоенной сборке был false, поэтому писался полный лог с историей.
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 25 }),
    NgScrollbar, ScrollViewport,
    ClipboardModule,
    GalleriaModule,
    
    NgbCollapse
],
  providers: [NgbDropdown,ProfileDataEditService, BusService,LoginService, provideClientHydration(), provideNgxMask(),
    { provide: LOCALE_ID, useValue: 'ru' }, provideYConfig(mapConfig),
    { provide: APP_INITIALIZER, useFactory: initializeAuth, deps: [LoginService], multi: true },
    // Пинч-зум в кадрировании аватара (ngx-image-cropper ищет глобальный window.Hammer).
    // Грузим лениво через HAMMER_LOADER: библиотека нужна только когда открыт кроппер,
    // в стартовый бандл и в SSR она не попадает. Под webpack hammerjs уходит в
    // module.exports и глобал сам не ставит — присваиваем вручную.
    {
      provide: HAMMER_LOADER,
      useValue: () => import('hammerjs').then(module => {
        (window as any).Hammer = (module as any).default ?? module;
      })
    }],

  bootstrap: [AppComponent]
})
export class AppModule {
}
