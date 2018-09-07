import { MenuAppPage } from './../menu-app/menu-app';
import { UsuarioProvider } from './../../providers/usuario/usuario';

import { AuthLoginProvider } from './../../providers/auth-login/auth-login';

import { Usuario } from './../../models/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the LoginAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-app',
  templateUrl: 'login-app.html',
})
export class LoginAppPage {

  public usuarioApp = {} as Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private atuhLogin: AuthLoginProvider, private alertCtrl: AlertController,
              private usuarioProvider: UsuarioProvider) {
  }

  // Método para exibir as nossas mensagens de erro.
  alert(title, message) {

    let al = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Fechar']
    });
    al.present();
  }

  // Método usado para login do usuário
  // Recebe como parametro um tipo user e tenta fazer o login
  async loginUsuario(usuario: Usuario) {
    // Valida se foi informado email e password
    if(usuario.emailUsuario == "" || usuario.senhaAcesso == "")
    {
      this.alert('Erro', 'É necessário informar o email e senha');
    } else {
      try {
        // Chama o método para fazer login
        const result = await this.atuhLogin.loginUsuario(usuario);
        if (result) {
          console.log('result.uid');
          var currentuser = this.atuhLogin.uidUser;
          this.usuarioProvider.getNomeUsuarioLogado(currentuser);

          //this.usuarioApp.nomeUsuario = this.usuarioProvider.getNomeUsuarioLogado(currentuser);
          // Se ocorrer tudo bem redireciona para a página tabs
          this.navCtrl.setRoot(MenuAppPage);
        }
      } catch (e) {

        this.alert('Erro ao logar', e.message);
      }
    }
  }


  async cadastrarUsuario(usuarioApp: Usuario) {

    // Valida se foi informado email e password
    if(usuarioApp.emailUsuario == "" || usuarioApp.senhaAcesso == "")
    {
      this.alert('Erro', 'É necessário informar o email e senha');
    } else {
      try {


        // Chama o método para cadastrar usuário
        const result = await this.atuhLogin.cadastroUsuario(usuarioApp);
        if (result) {
          // Se ocorrer tudo bem redireciona para a página tabs
          this.usuarioProvider.adicionar(usuarioApp);
          this.usuarioProvider.nomeUsuarioLogadoApp = usuarioApp.nomeUsuario;
          //this.loginUsuario(usuarioApp);

         this.navCtrl.setRoot(LoginAppPage);
        }
      } catch (e) {
        this.alert('Erro ao cadastrar', e.message);
      }
    }
  }

  ionViewDidLoad() {
    // Toda vez que um usuário acessar a página de login ele será deslogado
    //this.atuhLogin.logoutSistema();
  }

}
