import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { NgbCollapse, NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgScrollbar, ScrollViewport } from 'ngx-scrollbar';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { MenuModule } from 'primeng/menu';

import { CommonComponentsModule } from '../common/common.module';
import { UIModule } from '../ui/ui.module';
import { LandingUiModule } from '../profile-ba/landing-ui.module';

import { BAEditComponent } from './baedit.component';
import { MenueditbaprofileComponent } from './menu-ba-edit/menueditbaprofile.component';
import { MainProfileComponent } from './components/main-profile/main-profile.component';
import { PromoComponent } from './components/promo/promo.component';
import { PromoTemplateComponent } from './components/promo/promo-template.component';
import { PromoEditorComponent } from './components/promo/promo-editor.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { UslugiComponent } from './components/uslugi/uslugi.component';
import { ModalserviceComponent } from './components/uslugi/modalservice/modalservice.component';
import { ChangeModalGroupComponent } from './components/uslugi/change-modal-group/change-modal-group.component';
import { GrafikComponent } from './components/grafik/grafik.component';
import { OplataComponent } from './components/oplata/oplata.component';
import { GalereyaComponent } from './components/galereya/galereya.component';
import { CardalbombaComponent } from './components/galereya/cardalbomba/cardalbomba.component';
import { CardalbombafotoComponent } from './components/galereya/cardalbombafoto/cardalbombafoto.component';
import { DelalbumComponent } from './components/galereya/delalbum/delalbum.component';
import { ColumnBAProfileEditComponent } from './components/column-baprofile/column-baprofile.component';
import { NotificationChannelsBannerComponent } from './components/notification-channels-banner/notification-channels-banner.component';
import { NotificationChannelSelectModalComponent } from './components/notification-channel-select-modal/notification-channel-select-modal.component';
import { CreateServiceModalComponent } from './components/modals/create-service-modal/create-service-modal.component';
import { CreateServiceCategoryModalComponent } from './components/modals/create-service-category-modal/create-service-category-modal.component';
import { CreateServiceOplataModalComponent } from './components/modals/create-service-oplata-modal/create-service-oplata-modal.component';
import { CreateAlbumComponent } from './components/modals/create-album/create-album.component';
import { ChooseAlbumComponent } from './components/modals/choose-album/choose-album.component';
import { CropImageModalComponent } from './components/modals/crop-image-modal/crop-image-modal.component';
import { DeleteAlbumComponent } from './components/modals/delete-album/delete-album.component';
import { DeleteImageAlbumComponent } from './components/modals/delete-image-album/delete-image-album.component';
import { DeleteaccComponent } from './components/modals/deleteacc/deleteacc.component';
import { ModalCalendarComponent } from './components/modals/modal-calendar/modal-calendar.component';
import { DayHasRecordsModalComponent } from './components/modals/day-has-records-modal/day-has-records-modal.component';
import { ShowTimeModalComponent } from './components/modals/show-time-modal/show-time-modal.component';
import { ProfileBasicComponent } from './profilebisacc/profilebisacc.component';
import { ProfileBAInfoComponent } from './profilebisacc/profile-bainfo/profile-bainfo.component';

/**
 * Все объявления зоны редактирования бизнес-профиля. Роутинга здесь нет
 * намеренно: раздел висит на двух разных URL-префиксах (`ba-edit` и
 * `profilebisacc`), у каждого свой корневой компонент, поэтому маршруты живут
 * в двух отдельных ленивых модулях, а этот подключается ими обоими. webpack
 * вынесет общий код в один чанк и загрузит его один раз.
 *
 * Компоненты, которые нужны и публичным страницам (app-rubric, app-modal,
 * app-modalalbum, app-category-tree, app-lenta), сюда НЕ входят — они остались
 * в жадном CommonComponentsModule.
 */
@NgModule({
  declarations: [
    BAEditComponent,
    MenueditbaprofileComponent,
    MainProfileComponent,
    PromoComponent,
    PromoTemplateComponent,
    PromoEditorComponent,
    ContactsComponent,
    UslugiComponent,
    ModalserviceComponent,
    ChangeModalGroupComponent,
    GrafikComponent,
    OplataComponent,
    GalereyaComponent,
    CardalbombaComponent,
    CardalbombafotoComponent,
    DelalbumComponent,
    ColumnBAProfileEditComponent,
    NotificationChannelsBannerComponent,
    NotificationChannelSelectModalComponent,
    CreateServiceModalComponent,
    CreateServiceCategoryModalComponent,
    CreateServiceOplataModalComponent,
    CreateAlbumComponent,
    ChooseAlbumComponent,
    CropImageModalComponent,
    DeleteAlbumComponent,
    DeleteImageAlbumComponent,
    DeleteaccComponent,
    ModalCalendarComponent,
    DayHasRecordsModalComponent,
    ShowTimeModalComponent,
    ProfileBasicComponent,
    ProfileBAInfoComponent],
  imports: [
    CommonModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ScrollingModule,
    ClipboardModule,
    NgbCollapse,
    NgbDropdownModule,
    NgbModalModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ImageCropperModule,
    NgScrollbar,
    ScrollViewport,
    ButtonModule,
    CalendarModule,
    CarouselModule,
    GalleriaModule,
    ImageModule,
    MenuModule,
    CommonComponentsModule,
    UIModule,
    LandingUiModule],
  exports: [
    BAEditComponent,
    MainProfileComponent,
    ContactsComponent,
    UslugiComponent,
    GrafikComponent,
    OplataComponent,
    GalereyaComponent,
    PromoComponent,
    PromoTemplateComponent,
    PromoEditorComponent,
    ProfileBasicComponent,
    ProfileBAInfoComponent],
})
export class BaEditSharedModule {}
