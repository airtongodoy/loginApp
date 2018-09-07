import { Component, ViewChild } from '@angular/core';
//import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Nav, Platform, NavController, NavParams, MenuController } from 'ionic-angular';

import { Subject } from 'rxjs';
import { AppState } from '../../app/app.global';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../tabs/tabs';

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

  pages: Array<{ title: string, component: any, active: boolean, icon: string }>;
  rightMenuItems: Array<{ icon: string, active: boolean }>;
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
      { icon: 'home', active: true },
      { icon: 'alarm', active: false },
      { icon: 'analytics', active: false },
      { icon: 'archive', active: false },
      { icon: 'basket', active: false },
      { icon: 'body', active: false },
      { icon: 'bookmarks', active: false },
      { icon: 'camera', active: false },
      { icon: 'beer', active: false },
      { icon: 'power', active: false },
    ];

    this.pages = [
      { title: 'Home', component: 'SideMenuPage', active: true, icon: 'home' },
      { title: 'My Address', component: 'SideMenuPage', active: false, icon: 'map' },
      { title: 'My Orders',
        component: 'SideMenuPage', active: false, icon: 'ionic' },
      { title: 'My Cart', component: 'SideMenuPage', active: false, icon: 'ionic' },
      { title: 'Login', component: 'SideMenuPage', active: false, icon: 'archive' },
      { title: 'Offer Zone', component: 'SideMenuPage', active: false, icon: 'body' },
      { title: 'Need Help', component: 'SideMenuPage', active: false, icon: 'bookmarks' },
      { title: 'Rate Us', component: 'SideMenuPage', active: false, icon: 'book' },
      { title: 'Settings', component: 'SideMenuPage', active: false, icon: 'map' },

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
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage.next(page);
  }

  rightMenuClick(item) {
    this.rightMenuItems.map(menuItem => menuItem.active = false);
    item.active = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuAppPage');
  }

}
