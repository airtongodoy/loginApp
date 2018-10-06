import { RefresherService } from './../../providers/util/refresher.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { NewsProvider } from '../../providers/news/news';
import { News } from '../../models/news';
import { ToastService } from '../../providers/util/toast.service';
import { SaveDeleteImageFirebase } from '../../providers/util/saveDeleteImagemFirebase';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';

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
  public imageSrc;// = '../../assets/imgs/background/noImage.png';
  public imageSrc2;// = '../../assets/imgs/background/noImage.png';

  todoForm : FormGroup;
  public titulo: AbstractControl;
  public conteudo: AbstractControl;

  public dataNovidade: AbstractControl;
  public dataValidade: AbstractControl;

  public dataVeriry = false;

  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              private newsProvider: NewsProvider,
              private formBuilder: FormBuilder ,
              private mensagemToast: ToastService,
              private saveImage: SaveDeleteImageFirebase,
              private cam: Camera,
              private mensagemCarregando: RefresherService,
              public viewCtrl: ViewController) {

      this.todoForm = this.formBuilder.group({
        titulo:         new FormControl('', {validators: [Validators.maxLength(50),Validators.minLength(5),Validators.required], updateOn: 'blur'}),
        conteudo:       new FormControl('', {validators: [Validators.maxLength(500),Validators.minLength(25),Validators.required], updateOn: 'blur'}),
        dataNovidade:   new FormControl('', Validators.required),
        usuarioCriacao: new FormControl(['', Validators.required]),
        dataValidade:   new FormControl('', {validators: [Validators.required], updateOn: 'blur'})
      });

      this.titulo = this.todoForm.controls['titulo'];
      this.conteudo = this.todoForm.controls['conteudo'];

      this.dataNovidade = this.todoForm.controls['dataNovidade'];
      this.dataValidade = this.todoForm.controls['dataValidade'];

  }

  onSubmit(newsAdd: News): void {
    if(this.todoForm.valid) {
      if(this.verificaDataMenor(newsAdd)){
        this.dataVeriry = false;
        this.mensagemCarregando.showRefresher('Salvando informações...');
        //window.localStorage.setItem('username', value.username);
        //window.localStorage.setItem('password', value.password);
        this.adicionarNovaNews(newsAdd).then(_ =>{
          this.mensagemCarregando.finishRefresher(600);
          this.mensagemToast.create("Novidade salva com sucesso", false, 3500);
          this.dismiss();
        });
      }else{
        this.dataVeriry = true;
        this.mensagemToast.create("Data Validade inválida!", false, 3500);
      }

    }else{
      //this.dataVeriry = true;
    }
}

 // Método para adicionar novas novidades - Insere a imagem primeiro, pois leva mais tempo e caso de certo inserimos a novidade!
  async adicionarNovaNews(newsAdicionar: News){

    try {

        return this.saveImage.saveImageAndReturnPath(this.newsProvider.pathReferenceImage, this.saveImage.generateUUID() + '.jpg', this.imageSrc2).then(imageSaved => {

           newsAdicionar.urlImagem = imageSaved.urlImagem;
           newsAdicionar.imageUid = imageSaved.imageUid;

           console.log('imageSaved');
           console.log(imageSaved);

            return this.newsProvider.addNews(newsAdicionar).then(result => {
              return;
            });

          });
    } catch (e) {
      this.mensagemToast.create("Erro: " + e.message), true;
      alert('Erro ao logar'+ e.message);
    }

  }

  verificaDataMenor(newsVerify):boolean{

    newsVerify = this.newsProvider.updateDataNovidade(newsVerify);
    console.log('newsVerify.dataNovidade > newsVerify.dataValidade');
    console.log(newsVerify.dataNovidade > newsVerify.dataValidade);

    if(newsVerify.dataNovidade > newsVerify.dataValidade){
      return false;
    }
    return true;
  }


  escolherFoto(sourceTypeCam) {
    var typePhotoOrigin = (sourceTypeCam == 'CAMERA' ? this.cam.PictureSourceType.CAMERA : this.cam.PictureSourceType.PHOTOLIBRARY);
    console.log(typePhotoOrigin);

    const options: CameraOptions = {
      quality: 45,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      allowEdit: true,
      targetWidth: 500,
      targetHeight: 500,
      sourceType: typePhotoOrigin,

      destinationType: this.cam.DestinationType.DATA_URL,
      encodingType: this.cam.EncodingType.JPEG,
      mediaType: this.cam.MediaType.PICTURE
    }

    this.cam.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imageSrc = 'data:image/jpeg;base64,' + imageData;
      this.imageSrc2 = imageData;

     }, (err) => {
      // Handle error
     });
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad AddNewsPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
