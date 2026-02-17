import {NgModule} from "@angular/core";
import {HambMenuNoRegisterComponent} from "./hamb-menu/hamb-menu-no-register/hamb-menu-no-register.component";

import {HambMenuRegisterComponent} from "./hamb-menu/hamb-menu-register/hamb-menu-register.component";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MenuModule} from "primeng/menu";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import { NgbCollapse, NgbPanelTitle } from "@ng-bootstrap/ng-bootstrap";
import {FooterComponent} from "./footer/footer.component";
import {ProfileBAModule} from "../profile-ba/profile-ba.module";
import {ReviewsCaruselComponent} from "../static/razrab/razrab.component";
import {MobmenuComponent} from "./footer/mobmenu/mobmenu.component";
import {CarouselModule} from "primeng/carousel";
import {NotificationsComponent} from "./header/notifications/notifications.component";
import {HeaderBAComponent} from "./header/header-ba/header-ba.component";
import { SeenDirective } from "./header/notifications/seen.directive";
import { CommonComponentsModule } from "src/app/common/common.module";

@NgModule({
    declarations: [
        HeaderBAComponent,
        HambMenuNoRegisterComponent,
        HambMenuRegisterComponent,
        FooterComponent,
        ReviewsCaruselComponent,
        MobmenuComponent,
        NotificationsComponent,
        SeenDirective
    ],
    imports: [
    CommonModule, NgOptimizedImage, MenuModule, ButtonModule, ToastModule, NgbCollapse, CarouselModule,
    NgbPanelTitle,
    CommonComponentsModule
],
    exports: [
        HeaderBAComponent,
        HambMenuNoRegisterComponent,
        HambMenuRegisterComponent,
        FooterComponent,
        ReviewsCaruselComponent,
        MobmenuComponent,
        NotificationsComponent,
        SeenDirective
    ]
})

export class UIModule {}
