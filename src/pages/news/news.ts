import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { News } from '../../models/news';
import { NewsProvider } from '../../providers/news/news';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  // Definição do atributo newsExistentes que será usado para o cadastro
  newsExistentes: Observable<News[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private newsProvider: NewsProvider) {
  }

  ionViewDidLoad() {
    this.newsExistentes = this.newsProvider.findNewsAtivas();
    console.log('News 03');
    console.log(this.newsExistentes);
  }

  openPage(pageName){

  }

}
