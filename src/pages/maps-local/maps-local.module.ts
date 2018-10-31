import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapsLocalPage } from './maps-local';

@NgModule({
  declarations: [
    MapsLocalPage,
  ],
  imports: [
    IonicPageModule.forChild(MapsLocalPage),
  ],
})
export class MapsLocalPageModule {}
