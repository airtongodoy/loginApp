import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthLoginProvider } from '../auth-login/auth-login';
import { News } from '../../models/news';

/*
  Generated class for the NewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsProvider {



  private xx: string;
  //Referenciando o nome da "entidade" no firebase
  private idEntidadeNews = '/news/';

  //Objeto que armazenará a coleção de Novidades disponíveis
  private newsCollection: AngularFirestoreCollection<News>;

  constructor(private angFireStore: AngularFirestore,
              private authLogin: AuthLoginProvider) {

    // Verificando se o usuário está logado para criarmos o caminho
    if(this.authLogin.usuarioSistema.subscribe(authLogin => {

      // Caso o usuário já esteja logado (!= null) vamos setar alguns valores para facilitar encontrar informações do usuário caso necessário
      if(authLogin != null) {

        this.newsCollection = angFireStore.collection<News>(this.idEntidadeNews, ref => {
          return ref;
        });


        //authLogin.uid - representa o ID único do usuário, gerado automáticamente pelo Firebase quando fez o cadastro do usuário
        this.xx = authLogin.uid;
        console.log('News 01');
      } else{
        //Se ainda não estiver logado, setamos o ID para vazio
        this.xx = '';
      }
    }))

    console.log('Hello NewsProvider Provider');
  }

  findNewsAtivas(){

    console.log('News 02');
    return this.angFireStore.collection<News>(this.idEntidadeNews, ref => {
      return ref.where('dataValidade', '>', new Date());
    }).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as News;
        const id = a.payload.doc.id;
        return {id, ...data};
      })
    })
  }

  addNews(newsAdd: News){
    this.newsCollection.add(newsAdd);
  }

  updateNews(newsUpd: News){
    this.newsCollection.doc(newsUpd.idNews).update(newsUpd);
  }

  disableNews(newsDisable: News){
    this.newsCollection.doc(newsDisable.idNews).update(newsDisable);
  }




  /*
          pegarTarefas(finalizada: boolean) {
            return this.afs.collection<Tarefas>(this.caminho, ref => {
                return ref.where('finalizada', '==', finalizada);

            }).snapshotChanges().map(actions => {
                return actions.map(a => {
                  const data = a.payload.doc.data() as Tarefas;
                  const id = a.payload.doc.id;
                  return { id, ...data };
                })
            });
          }
        */

}
