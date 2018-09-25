import { NavController, NavParams, LoadingController, IonicPage } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';

import { News } from '../../models/news';
import { NewsProvider } from '../../providers/news/news';
import { NewsDetailPage } from '../news-detail/news-detail';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {

  public refresher;
  public isRefreshing: boolean = false;
  public defaultImage = '../../assets/imgs/background/background-1.jpg';
  public carregando;

  // Definição do atributo newsExistentes que será usado para o cadastro
  newsExistentes: Observable<News[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private newsProvider: NewsProvider,
              public loadingCtrl: LoadingController
              ) {

     this.mostrarCarregando();

  }

  ionViewDidLoad() {
    this.loadNews();
  }

  loadNews(){
    //this.newsExistentes = this.newsProvider.news$;

     this.newsProvider.findNewsAtivas().then(news => {

      this.newsExistentes = news;

      if(this.isRefreshing){
        this.refresher.complete();
        this.isRefreshing = false;
      }
      setTimeout(() => {
        this.carregando.dismiss();

      }, 1000);
      //
    });
  }

  mostrarCarregando() {
    this.carregando = this.loadingCtrl.create({

      content:'Carregando novidades',
      spinner: 'circles'

    });

    this.carregando.present();
  }

  openNewsDetails(newsToDetail){
    //console.log(newsToDetail);
    this.navCtrl.push(NewsDetailPage, {newsToDetail});
  }
}
