import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AuthLoginProvider } from './../auth-login/auth-login';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Usuario } from '../../models/usuario';

import * as firebase from 'firebase';

/*
  @author: Airton Godoy

  Generated class for the UsuarioProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  //Caminho para especificar a "Tabela" de Usuarios no Firebase
  private userPathDefault: string = '/usuarios/';

  //ID do usuário, utilizado para encontrar o mesmo na base (neste caso sempre será salvo com o mesmo ID gerado pelo Auth do firebase)
  private userId: string;

  //Representa a referencia do usuário (logado) - Contem informação que virá do "select" no Firebase (no construtor)
  public usuarioRefFirebase: AngularFirestoreCollection<Usuario>;

  //Nome do usuário que fez login (Será mostrado na HomePage)
  public nomeUsuarioLogadoApp: string;

  public usuario: Usuario;

  public obsUsuario: Observable<Usuario[]>;

  // Parametros que vamos injetar no construtor
  constructor(private angFireStore: AngularFirestore,
              private authLogin: AuthLoginProvider) {


    // Verificando se o usuário está logado para criarmos o caminho
    if(this.authLogin.usuarioSistema.subscribe(authLogin => {

      // Caso o usuário já esteja logado (!= null) vamos setar alguns valores para facilitar encontrar informações do usuário caso necessário
      if(authLogin != null) {

        //authLogin.uid - representa o ID único do usuário, gerado automáticamente pelo Firebase quando fez o cadastro do usuário
        this.userId = authLogin.uid;

        //Retornará uma referencia do Login do usuário no Firebase, podendo utilizar para ser feito "Insert", "Update", "Delete"
        this.usuarioRefFirebase = this.angFireStore.collection<Usuario>(this.userPathDefault, ref => {
          return ref;
        });

        //Faz uma busca no Firebase para obter o nome do usuário na "Tabela Usuarios"
        this.getNomeUsuarioLogado(this.userId).then(retornoNomeUsuario => {
          this.nomeUsuarioLogadoApp = retornoNomeUsuario;
        });

        console.log(this.getUsuarioLogado());
      } else{
        //Se ainda não estiver logado, setamos o ID para vazio
        this.userId = '';
      }
    }))
    console.log('Hello UsuarioProvider Provider');
  }

/*
  // Este método será retorna uma collection de usuario (apenas 1 devido usar Where)
  getUsuarioByEmail(emailUsuarioLogado: string) {

    return this.angFireStore.collection<Usuario>(this.userPathDefault, ref => {
      return ref.where('emailUsuario', '==', emailUsuarioLogado); //authLogin.email);

    }).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    });
  }*/

  getUsuarioLogado() {
    return this.angFireStore.collection<Usuario>(this.userPathDefault, ref => {
      return ref.where('idUsuario', '==', this.userId);
    }).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        const id = a.payload.doc.id;

        return {id, ...data};
      })
    })
  }

  async getNomeUsuarioLogado(especifyUserId): Promise<string> {
    var userIdFind = especifyUserId != null ? especifyUserId : this.userId;

    const userProfile: firebase.firestore.DocumentSnapshot = await firebase.firestore().doc(this.userPathDefault + userIdFind).get();
    this.nomeUsuarioLogadoApp = userProfile.data().nomeUsuario;
    console.log('this.nomeUsuarioLogadoApp ' + this.nomeUsuarioLogadoApp);
    return userProfile.data().nomeUsuario;//nomeUsuario;
  }

  // Método usado para adicionar uma tarefa
  adicionar(usuarioAdd: Usuario) {
    usuarioAdd.id = this.userId;
    this.usuarioRefFirebase.doc(this.userId).set(usuarioAdd);
  }

  // Método usado para atualizar uma tarefa
  atualizar (id: string, userUpd:Usuario) {
    this.usuarioRefFirebase.doc(id).update(userUpd);
  }

  getUidUser(){
    return this.userId;
  }
}
