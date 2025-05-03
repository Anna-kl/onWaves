import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { SideMenuComponent } from './header/components/side-menu/side-menu.component';
import { HeaderBottomComponent } from './header/components/header/header-bottom.component';

@NgModule({
  declarations: [
    SideMenuComponent,
    HeaderBottomComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SideMenuComponent,
    HeaderBottomComponent,
    CommonModule, 
  ],
})
export class MainAppModule { }
