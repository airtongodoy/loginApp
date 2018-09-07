import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuAppPage } from './menu-app';

@NgModule({
  declarations: [
    MenuAppPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuAppPage),
  ],
})
export class MenuAppPageModule {}
