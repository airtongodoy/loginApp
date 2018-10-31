import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestMapPage } from './test-map';

@NgModule({
  declarations: [
    TestMapPage,
  ],
  imports: [
    IonicPageModule.forChild(TestMapPage),
  ],
})
export class TestMapPageModule {}
