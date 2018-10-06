import { NewsProvider } from './../../providers/news/news';
import { News } from './../../models/news';

import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, DateTime } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { RefresherService } from '../../providers/util/refresher.service';
import { ToastService } from '../../providers/util/toast.service';


/**
 * Generated class for the NewsEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-edit',
  templateUrl: 'news-edit.html',
})
export class NewsEditPage {
  public newsOk: News;
  public newsUpdating: News;

  public titulo: AbstractControl;
  public conteudo: AbstractControl;

  todoForm : FormGroup;
  constructor(private formBuilder: FormBuilder ,
              public navParams: NavParams,
              public navCtrl: NavController,

              private newsProvider: NewsProvider,
              private mensagemCarregando: RefresherService,
              private mensagemToast: ToastService) {

    this.todoForm = this.formBuilder.group({
      titulo:         new FormControl('', {validators: [Validators.maxLength(50),Validators.minLength(5),Validators.required], updateOn: 'blur'}),
      conteudo:       new FormControl('', {validators: [Validators.maxLength(500),Validators.minLength(25),Validators.required], updateOn: 'blur'}),
    });

    this.titulo = this.todoForm.controls['titulo'];
    this.conteudo = this.todoForm.controls['conteudo'];

  }
  ionViewDidLoad() {
    this.newsUpdating = this.navParams.get('newsToEdit');
    this.newsOk = this.navParams.get('newsToEdit');

    console.log('new Date(newsUpdating.dataValidade);');
    console.log(new Date('1539140399'));
    console.log(this.newsUpdating.dataValidade);
    console.log(this.newsUpdating.dataValidade.toLocaleTimeString);

    // this.dataNovidadeFmt = this.newsUpdating.dataNovidade as Date;
    // this.dataValidadeFmt = this.newsUpdating.dataValidade as Date;

    console.log('this.dataNovidadeFmt');
    // console.log(this.dataNovidadeFmt);
    console.log('ionViewDidLoad NewsDetailPage');
  }

  onSubmit(newsUpd: News): void {

    if(this.todoForm.valid) {
        this.mensagemCarregando.showRefresher('Salvando informações...');
        //window.localStorage.setItem('username', value.username);
        //window.localStorage.setItem('password', value.password);

        this.newsOk.titulo = newsUpd.titulo;
        this.newsOk.conteudo = newsUpd.conteudo;

        this.updateNews(this.newsOk).then(_ =>{
          this.mensagemCarregando.finishRefresher(600);
          this.mensagemToast.create("Novidade atualizada com sucesso", false, 3500);
          this.navCtrl.pop();
        });

    }else{
      //this.dataVeriry = true;
    }
  }

  async updateNews(newsUpd: News){
    return this.newsProvider.updateNewsTituloConteudo(newsUpd).then(result => {
      return;
    });
  }

  verificaDataMenor(newsVerify):boolean{
    console.log('Validando');

    // newsVerify = this.newsProvider.updateDataNovidade(newsVerify);
    var dataEnd = new Date(newsVerify.dataValidade);

    newsVerify.dataValidade = new Date(dataEnd.getUTCFullYear(), dataEnd.getUTCMonth(), dataEnd.getUTCDate(), 23, 59, 59);//new Date(dataEnd);

    console.log('newsVerify.dataNovidade > newsVerify.dataValidade');
    console.log(newsVerify.dataNovidade > newsVerify.dataValidade);

    if(newsVerify.dataNovidade > newsVerify.dataValidade){
      console.log(newsVerify.dataNovidade +'-'+ newsVerify.dataValidade);
      return false;
    }
    return true;
  }

}
