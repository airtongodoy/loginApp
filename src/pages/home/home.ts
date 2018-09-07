import { LoginAppPage } from './../login-app/login-app';
import { Component } from '@angular/core';
import { NavController, App, NavParams, LoadingController } from 'ionic-angular';
import { AuthLoginProvider } from '../../providers/auth-login/auth-login';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public usuarioLog: any = '';

  constructor(public navCtrl: NavController,
              private authLogin: AuthLoginProvider,
              public navParams: NavParams,
              private app:App,
              private usuarioProv: UsuarioProvider,
              public loadingCtrl: LoadingController) {


    this.usuarioLog = this.usuarioProv.nomeUsuarioLogadoApp;
    this.presentLoading();
  }
  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present();
  }
  /*sairX() : void
   {
      this.authLogin.logoutSistema().then((data : any) => {
         this.app.getRootNav().setRoot(LoginAppPage);
      }).catch((error : any) => {
         console.dir(error);
      });
   }
*/
  sair() : void
   {
      this.authLogin.logoutUser().then((data : any) => {
        this.usuarioLog = '';
         this.app.getRootNav().setRoot(LoginAppPage);
      }).catch((error : any) => {
         console.dir(error);
      });
   }

  ionViewDidLoad() {
    this.usuarioProv.getNomeUsuarioLogado(null).then((result) => {
      this.usuarioLog = result
    }).catch(error => console.log(error));
  }
  ionViewDidEnter(){

    //if(this.usuarioLog == null || this.usuarioLog.lenght == 0){


    //}
    /**/
  }
}
