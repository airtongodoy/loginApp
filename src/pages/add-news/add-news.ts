import { AuthLoginProvider } from './../../providers/auth-login/auth-login';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsProvider } from '../../providers/news/news';
import { News } from '../../models/news';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Usuario } from '../../models/usuario';

/**
 * Generated class for the AddNewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-news',
  templateUrl: 'add-news.html',
})
export class AddNewsPage {

  // Definição do atributo newsCadastrando que será usado para o cadastro
  public newsCadastrando = {} as News;

  /*
  // Definição do atributo tarefa que será usado para o cadastro
  public tarefa = {} as Tarefas;

  // Adicionando o serviço de tarefa no construtor
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private tarefasProvider:TarefasProvider) {
  }

  // Método que será usado para adicionar uma tarefa
  adicionarTarefa(tarefa: Tarefas) {
      tarefa.finalizada = false;
      tarefa.dataX = new Date();

      this.tarefasProvider.adicionar(tarefa);
      this.navCtrl.setRoot(TabsPage);
  }

  */
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private newsProvider: NewsProvider,
              private usuarioProvider: UsuarioProvider,
              private authLogin: AuthLoginProvider) {


  }

  adicionarNovaNews(newsAdicionar: News){
    var userCreate: Usuario;
    userCreate.id = this.authLogin.uidUser;

    console.log(this.usuarioProvider.getUsuarioLogado());

    newsAdicionar.usuarioCriacao = userCreate;

    this.newsProvider.addNews(newsAdicionar);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewsPage');
  }

  @ViewChild('myInputTextArea') myInputTextArea: ElementRef;
  resize() {
    this.myInputTextArea.nativeElement.style.height = this.myInputTextArea.nativeElement.scrollHeight + 'px';
}
}
