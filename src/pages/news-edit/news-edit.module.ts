import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsEditPage } from './news-edit';

@NgModule({
  declarations: [
    NewsEditPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsEditPage)
  ],
  exports:[
    NewsEditPage
  ]
})
export class NewsEditPageModule {}
