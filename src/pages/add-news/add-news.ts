import { CameraProvider } from './../../providers/util/camera.provider';
import { MenuAppPage } from './../menu-app/menu-app';
import { Camera } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewsProvider } from '../../providers/news/news';
import { News } from '../../models/news';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ToastService } from '../../providers/util/toast.service';
import { SaveImageFirebase } from '../../providers/util/saveImageFirebase';


/**
 * Generated class for the AddNewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-news',
  templateUrl: 'add-news.html',
})
export class AddNewsPage {

  // Definição do atributo newsCadastrando que será usado para o cadastro
  public newsCadastrando = {} as News;
  public hiddenImg: boolean = true;
  public imageSrc: string = 'https://picsum.photos/200/200';
  private cameraApp: Camera;



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private cameraProvider: CameraProvider,
              private newsProvider: NewsProvider,
              private usuarioProvider: UsuarioProvider,
              private mensagemToast: ToastService,
              private camApp: Camera,
              private saveImage: SaveImageFirebase) {

              this.cameraApp = this.camApp;

  }
 // Método para exibir as nossas mensagens de erro.

  async adicionarNovaNews(newsAdicionar: News){
    console.log(this.usuarioProvider.getUsuarioLogado());
    try {

          newsAdicionar.urlImagem = 'https://picsum.photos/200/200'; //this.imageSrc;

           //this.saveImage.saveImage('');
          await this.saveImage.saveImageAndReturnPath(this.newsProvider.pathReferenceImage, this.usuarioProvider.getUidUser(), this.imageSrc).then(imageSaved => {

            newsAdicionar.urlImagem = imageSaved;
            this.newsProvider.updateNews(newsAdicionar);


            this.newsProvider.addNews(newsAdicionar).then(result => {
              console.log('result.uid' + result.id);

              // Se ocorrer tudo bem redireciona para a página tabs

              this.navCtrl.setRoot(MenuAppPage);
              this.mensagemToast.create("Novidade salva com sucesso", false, 3000);
            });
          });
    } catch (e) {
      this.mensagemToast.create("Erro: " + e.message), true;
      //this.alert('Erro ao logar', e.message);
    }

  }

  hiddenSrc(){
    this.hiddenImg = this.imageSrc != null && this.imageSrc.length > 0;
  }

  pegarImagem(){
    console.log(this.cameraProvider.getPictureFromPhotoLibrary());
  }


  getOpenGallery(){
    this.abrirGaleria();

  }

  abrirGaleria (): void {
    let cameraOptions = {
      sourceType: this.cameraApp.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.cameraApp.DestinationType.FILE_URI,
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.cameraApp.EncodingType.JPEG,
      correctOrientation: true
    }

    this.cameraApp.getPicture(cameraOptions)
      .then(file_uri => this.imageSrc = file_uri,
      err => console.log(err));

  }

  ionViewDidLoad() {
    //this.hiddenSrc();
    console.log('ionViewDidLoad AddNewsPage');
  }


}
