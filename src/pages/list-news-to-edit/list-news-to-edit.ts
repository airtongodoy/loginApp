import { SaveDeleteImageFirebase } from './../../providers/util/saveDeleteImagemFirebase';
import { RefresherService } from './../../providers/util/refresher.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { News } from '../../models/news';
import { NewsProvider } from '../../providers/news/news';
import { NewsEditPage } from '../news-edit/news-edit';
import { AddNewsPage } from '../add-news/add-news';
import { NewsDetailPage } from '../news-detail/news-detail';

/**
 * Generated class for the ListNewsToEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-news-to-edit',
  templateUrl: 'list-news-to-edit.html',
})
export class ListNewsToEditPage {

  // Definição do atributo newsExistentes que será usado para o cadastro
  newsExistentes: Observable<News[]>;
  removeImage: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private newsProvider: NewsProvider,
              public loadingCtrl: LoadingController,
              public refresher: RefresherService,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              private saveDeleteImage: SaveDeleteImageFirebase,
              private mensagemCarregando: RefresherService) {

    this.refresher.showRefresher('Carregando Novidades...');
  }

  loadNewsToEdit(){
    this.newsProvider.findNewsAtivas().then(news => {

      this.newsExistentes = news;

      if(this.refresher.isRefreshing){
        this.refresher.refresher.complete();
        this.refresher.isRefreshing = false;
      }
      setTimeout(() => {
        this.refresher.carregando.dismiss();

      }, 500);

      //
    });

  }

  async removerNews(newsDeletar: News){

    try {
        this.mensagemCarregando.showRefresher('Excluindo novidade');

        var retorno = await this.newsProvider.disableNews(newsDeletar);

        if(retorno){

          if(this.removeImage){

            this.saveDeleteImage.deleteImageFirebase(this.newsProvider.pathReferenceImage, newsDeletar.imageUid).then(isImageDeleted => {
              console.log('Excluiu imagem');
              console.log(isImageDeleted);

              if(isImageDeleted){
                  // Se ocorrer tudo bem redireciona para a página tabs

                  this.mensagemCarregando.finishRefresher(100);
                  // this.loadNewsToEdit();
                  // this.mensagemToast.create("Novidade salva com sucesso", false, 3500);
                  //});
                }
              });
            }else{
              this.mensagemCarregando.finishRefresher(100);
              // this.loadNewsToEdit();
            }
        }else{
          this.mensagemCarregando.showRefresher("Erro ao excluir novidade!");
          this.mensagemCarregando.finishRefresher(500);
        }

    } catch (e) {
      // this.mensagemToast.create("Erro: " + e.message), true;
      alert('Erro ao logar'+ e.message);
    }
  }

  presentModal(){
    const modal = this.modalCtrl.create(AddNewsPage);
    modal.present();
  }

  doConfirm(newsToEdit: News) {
    console.log('Confirm');

    const confirm = this.alertCtrl.create({
      title: 'Excluir Novidade?',
      message: 'Deseja realmente remover esta novidade?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            //this.saveDeleteImage.deleteImageFirebase(this.newsProvider.pathReferenceImage, newsToEdit.imageUid);
            this.removerNews(newsToEdit);
          }
        }
      ]
    });

    confirm.present();
  }
  ionViewDidLoad() {
    this.loadNewsToEdit();
  }

  openNewsUpdate(newsToEdit){
    this.navCtrl.push(NewsEditPage, {newsToEdit});
  }

  openNewsDetails(newsToDetail){
    //console.log(newsToDetail);
    this.navCtrl.push(NewsDetailPage, {newsToDetail});
  }
}
