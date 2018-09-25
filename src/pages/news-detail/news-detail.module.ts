import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsDetailPage } from './news-detail';

@NgModule({
  declarations: [
    NewsDetailPage,
    //NewsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsDetailPage),
  ],
  exports: [
    NewsDetailPage
  ]
})
export class NewsDetailPageModule {}
