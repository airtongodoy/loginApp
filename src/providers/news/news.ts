import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthLoginProvider } from '../auth-login/auth-login';
import { News } from '../../models/news';
import * as firebase from 'firebase';
/*
  Generated class for the NewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsProvider {

  //Referenciando o nome da "entidade" no firebase
  private idEntidadeNews = '/news/';
  public  pathReference: string = 'news/';
  public  pathReferenceImage: string = 'imagesNews/';

firebase
  //Objeto que armazenará a coleção de Novidades disponíveis
  private newsCollection: AngularFirestoreCollection<News>;

  constructor(private angFireStore: AngularFirestore,
              private authLogin: AuthLoginProvider) {

    // Verificando se o usuário está logado para criarmos o caminho
    if(this.authLogin.usuarioSistema.subscribe(authLogin => {

      // Caso o usuário já esteja logado (!= null) vamos vamos buscar as novidades para serem exibidas
      if(authLogin != null) {

        this.newsCollection = angFireStore.collection<News>(this.idEntidadeNews, ref => {
          return ref;
        });

        //authLogin.uid - representa o ID único do usuário, gerado automáticamente pelo Firebase quando fez o cadastro do usuário
      }
    }))

    console.log('Hello NewsProvider Provider');
  }

  async findNewsAtivas(){

    return this.angFireStore.collection<News>(this.idEntidadeNews, ref => {
      return ref.where('dataValidade', '>=', new Date()).where('status', '==', 1);
    }).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as News;

        const id = a.payload.doc.id;
        data.idNews = id;
        // console.log(id);

        return {id, ...data};
      })
    })
  }

  async addNews(newsAdd: News){

      return this.newsCollection.add(this.updateDataNovidade(newsAdd));
  }

  async updateNews(newsUpd: News){
    newsUpd = this.updateDataNovidade(newsUpd);

    this.newsCollection.doc(newsUpd.idNews).update(newsUpd);
  }
  async updateNewsTituloConteudo(newsUpd: News){

    this.newsCollection.doc(newsUpd.idNews).update(newsUpd);
  }

  disableNews(newsDisable: News): Promise<boolean>{
    console.log(this.pathReference + newsDisable.idNews);

    var newsUpd = firebase.firestore().doc(this.pathReference + newsDisable.idNews);
    newsDisable.status = 0;

    return newsUpd.update(newsDisable).then(retorno => {
      return true;
    }).catch(function(error) {
      return false;
    });

  }

  updateDataNovidade(newsAdd){
      var dataAdd = new Date(newsAdd.dataNovidade);
      var dataEnd = new Date(newsAdd.dataValidade);
      newsAdd.status = 1;
      newsAdd.dataNovidade = new Date(dataAdd.getUTCFullYear(), dataAdd.getUTCMonth(), dataAdd.getUTCDate(), 0, 0, 1);//new Date(dataAdd);
      newsAdd.dataValidade = new Date(dataEnd.getUTCFullYear(), dataEnd.getUTCMonth(), dataEnd.getUTCDate(), 23, 59, 59);//new Date(dataEnd);
    return newsAdd;
  }
}
