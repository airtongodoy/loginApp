import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalAtualMapPage } from './local-atual-map';

@NgModule({
  declarations: [
    LocalAtualMapPage,
  ],
  imports: [
    IonicPageModule.forChild(LocalAtualMapPage),
  ],
})
export class LocalAtualMapPageModule {}
