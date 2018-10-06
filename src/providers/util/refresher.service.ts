import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class RefresherService {

  public refresher;
  public isRefreshing: boolean = false;
  public carregando;

  constructor(public loadingCtrl: LoadingController) { }

  finishRefresher(timeOutSet){
    var timeout = timeOutSet != null ? timeOutSet : 600;
    if(this.isRefreshing){
      this.refresher.complete();
      this.isRefreshing = false;
    }
    setTimeout(() => {
      this.carregando.dismiss();
    }, timeout);

  }

  showRefresher(messageShow: string) {
    this.carregando = this.loadingCtrl.create({

      content: messageShow,
      spinner: 'circles'

    });

    this.carregando.present();
  }
}
