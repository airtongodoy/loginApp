import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthLoginProvider } from '../../providers/auth-login/auth-login';
import { LoginAppPage } from '../login-app/login-app';

/**
 * Generated class for the LogoutAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout-app',
  templateUrl: 'logout-app.html',
})
export class LogoutAppPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authLogin: AuthLoginProvider) {



               //navParams.registerBackButtonAction(() => {
                //    console.log("backPressed 1");
               //   },1);
  }


  sair() : void
   {
      this.authLogin.logoutUser().then((data : any) => {
        this.navCtrl.setRoot(LoginAppPage);
      }).catch((error : any) => {
         console.dir(error);
      });
   }

   voltar(){
    this.navCtrl.pop();
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutAppPage');
  }

}
