
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsPage } from './news';
import { NewsDetailPage } from '../news-detail/news-detail';

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
