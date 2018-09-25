import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import 'rxjs/add/operator/map';

import * as firebase from 'firebase';

import { Usuario } from '../../models/usuario';


  /*Generated class for the AuthLoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthLoginProvider {

   // Atributo usuário que será usado para cadastro e autenticação
   usuarioSistema: Observable<firebase.User>;
   uidUser: string;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.usuarioSistema = firebaseAuth.authState;
  }

  //Cadastrar o usuário
  cadastroUsuario(usuario: Usuario){
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(usuario.emailUsuario, usuario.senhaAcesso);
  }

  //Efetua login
  loginUsuario(usuario: Usuario){
    this.firebaseAuth.auth.signInWithEmailAndPassword(usuario.emailUsuario, usuario.senhaAcesso).then(ref => {
      this.uidUser = ref.user.uid;
      return ref;
    });

  }


  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

ngOnDestroy() {
  this.firebaseAuth.authState.subscribe().unsubscribe();

}
}
