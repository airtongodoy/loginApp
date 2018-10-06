
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsPage } from './news';

@NgModule({
  declarations: [
    NewsPage,
    //NewsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsPage),

  ],
  entryComponents:[
    //NewsDetailPage,
  ]
})
export class NewsPageModule {}
