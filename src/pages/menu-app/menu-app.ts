import { HomePage } from './../home/home';
import { Component, ViewChild } from '@angular/core';
//import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Nav, Platform, NavController, NavParams, MenuController } from 'ionic-angular';

import { Subject } from 'rxjs';
import { AppState } from '../../app/app.global';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../tabs/tabs';
import { Page } from 'ionic-angular/umd/navigation/nav-util';

import { LogoutAppPage } from '../logout-app/logout-app';
import { AddNewsPage } from '../add-news/add-news';

/**
 * Generated class for the MenuAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
/*

*/
@Component({

  templateUrl: 'menu-app.html'
})


export class MenuAppPage {
  @ViewChild(Nav) nav: Nav;

  // Basic root for our content view
  rootPage = TabsPage;

  activePage = new Subject();

  pages: Array<{id:number,  title: string, component: Page, active: boolean, icon: string }>;
  rightMenuItems: Array<{id:number,  icon: string, active: boolean, component: Page}>;
  state: any;

  //@ViewChild(navCtrl) nav: Nav;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashscreen: SplashScreen,

              public navCtrl: NavController,
              public navParams: NavParams,
              public global: AppState,
              public menuCtrl: MenuController) {

    this.initializeApp();

    this.rightMenuItems = [
      {id:1,  icon: 'home',       active: true,  component: HomePage},
      {id:2,  icon: 'alarm',      active: false, component: HomePage},
      {id:3,  icon: 'analytics',  active: false, component: HomePage},
      {id:4,  icon: 'archive',    active: false, component: HomePage},
      {id:5,  icon: 'basket',     active: false, component: HomePage},
      {id:6,  icon: 'body',       active: false, component: HomePage},
      {id:7,  icon: 'bookmarks',  active: false, component: HomePage},
      {id:8,  icon: 'camera',     active: false, component: AddNewsPage},
      {id:9,  icon: 'beer',       active: false, component: HomePage},
      {id:10, icon: 'power',      active: false, component: LogoutAppPage},
    ];

    this.pages = [
      {id:1,   title: 'Home',        component: HomePage,     active: true,  icon: 'home' },
      {id:2,   title: 'My Address',  component: HomePage,     active: false, icon: 'map' },
      {id:3,   title: 'My Orders',   component: HomePage,     active: false, icon: 'ionic' },
      {id:4,   title: 'My Cart',     component: HomePage,     active: false, icon: 'ionic' },
      {id:5,   title: 'Login',       component: HomePage,     active: false, icon: 'archive' },
      {id:6,   title: 'Offer Zone',  component: HomePage,     active: false, icon: 'body' },
      {id:7,   title: 'Need Help',   component: HomePage,     active: false, icon: 'bookmarks' },
      {id:8,   title: 'Rate Us',     component: HomePage,     active: false, icon: 'book' },
      {id:9,   title: 'Settings',    component: HomePage,     active: false, icon: 'map' },
      {id:10,  title: 'Sair',        component: LogoutAppPage, active: false, icon: 'power'}

    ];

    this.activePage.subscribe((selectedPage: any) => {
      this.pages.map(page => {
        page.active = page.title === selectedPage.title;
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.global.set('theme', '');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashscreen.hide();
      this.menuCtrl.enable(false, 'right');
    });
  }

  openPage(page) {
    this.nav.push(page.component);
    this.activePage.next(page.component);
  }

  rightMenuClick(item) {
    this.rightMenuItems.map(menuItem => menuItem.active = false);
    item.active = true;

    //item.actionExecute;

    this.nav.push(item.component);
    this.activePage.next(item.component);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuAppPage');
  }

}
