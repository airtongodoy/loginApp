import { MenuAppPage } from './../pages/menu-app/menu-app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginAppPage } from '../pages/login-app/login-app';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = LoginAppPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth) {

    //No inicio da aplicação vamos verificar se existe "Sessão Ativa de Login anterior"
    platform.ready().then((readySource) => {
        afAuth.auth.onAuthStateChanged(userAut => {
              if (userAut){
                //Se ja existir Login anterior, envia direto para a página Inicial
                this.rootPage = MenuAppPage;

              }else
                //Caso não existe sessão e/ou tenha expirado, será enviado para tela de Login
                this.rootPage = LoginAppPage;
            });
            statusBar.styleDefault();
            splashScreen.hide();
    });
  }
}
