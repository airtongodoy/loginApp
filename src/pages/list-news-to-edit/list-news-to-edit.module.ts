import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListNewsToEditPage } from './list-news-to-edit';

@NgModule({
  declarations: [
    ListNewsToEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ListNewsToEditPage),
  ],
})
export class ListNewsToEditPageModule {}
