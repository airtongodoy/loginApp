import { MenuAppPage } from './../menu-app/menu-app';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewsProvider } from '../../providers/news/news';
import { News } from '../../models/news';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ToastService } from '../../providers/util/toast.service';
import { SaveImageFirebase } from '../../providers/util/saveImageFirebase';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, AsyncValidatorFn } from '@angular/forms';
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


  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              private newsProvider: NewsProvider,
              private formBuilder: FormBuilder ,
              private mensagemToast: ToastService,
              private saveImage: SaveImageFirebase,
              private cam: Camera) {

      this.todoForm = this.formBuilder.group({
        titulo:         new FormControl('', {validators: [Validators.maxLength(50),Validators.minLength(5),Validators.required], updateOn: 'blur'}),
        conteudo:       new FormControl('', {validators: [Validators.maxLength(500),Validators.minLength(25),Validators.required], updateOn: 'blur'}),
        dataNovidade:   new FormControl('', Validators.required, this.verificaDataMenor(this.newsCadastrando.dataNovidade,this.newsCadastrando.dataValidade, 'Data Novidade')),
        usuarioCriacao: new FormControl(['', Validators.required]),
        dataValidade:   new FormControl(['', Validators.required])
      });

      this.titulo = this.todoForm.controls['titulo'];
      this.conteudo = this.todoForm.controls['conteudo'];

      this.dataNovidade = this.todoForm.controls['dataNovidade'];
      this.dataValidade = this.todoForm.controls['dataValidade'];

  }

  verificaDataMenor(data1: Date,data2: Date, nomeData: string):AsyncValidatorFn{
    console.log(data1);
    console.log(data2);
    console.log(nomeData);
    return null;
  }


  onSubmit(newsAdd: News): void {
    if(this.todoForm.valid) {
        //window.localStorage.setItem('username', value.username);
        //window.localStorage.setItem('password', value.password);
        this.adicionarNovaNews(newsAdd);
    }else{

    }
}

 // Método para exibir as nossas mensagens de erro.

  async adicionarNovaNews(newsAdicionar: News){

    try {

        //newsAdicionar.urlImagem = 'https://picsum.photos/200/200'; //this.imageSrc;
        //this.imageSrc = '../../assets/imgs/background/background-1.jpg'; //this.imageSrc;
        //this.saveImage.saveImageAndReturnPath(this.newsProvider.pathReferenceImage, this.saveImage.generateUUID() + '.jpg', this.imageSrc.slice('data:image/jpeg;base64,'.length)).then(imageSaved => {

        this.saveImage.saveImageAndReturnPath(this.newsProvider.pathReferenceImage, this.saveImage.generateUUID() + '.jpg', this.imageSrc2).then(imageSaved => {

           newsAdicionar.urlImagem = imageSaved;
           console.log('imageSaved');
           console.log(imageSaved);

            this.newsProvider.addNews(newsAdicionar).then(result => {
              // Se ocorrer tudo bem redireciona para a página tabs
              this.navCtrl.setRoot(MenuAppPage);
              this.mensagemToast.create("Novidade salva com sucesso", false, 3000);
            });

          });
    } catch (e) {
      this.mensagemToast.create("Erro: " + e.message), true;
      alert('Erro ao logar'+ e.message);
    }

  }

  validarCampos(){

  }

  escolherFoto(sourceTypeCam) {
    var typePhotoOrigin = (sourceTypeCam == 'CAMERA' ? this.cam.PictureSourceType.CAMERA : this.cam.PictureSourceType.PHOTOLIBRARY);
    console.log(typePhotoOrigin);

    const options: CameraOptions = {
      quality: 80,
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
    //this.hiddenSrc();
    console.log('ionViewDidLoad AddNewsPage');
  }


}
