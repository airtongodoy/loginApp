import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogoutAppPage } from './logout-app';

@NgModule({
  declarations: [
    LogoutAppPage,
  ],
  imports: [
    IonicPageModule.forChild(LogoutAppPage),
  ],
  exports: [
    LogoutAppPage
  ]
})
export class LogoutAppPageModule {}
