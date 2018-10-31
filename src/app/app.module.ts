import { MapsLocalPage } from './../pages/maps-local/maps-local';
import { NewsEditPageModule } from './../pages/news-edit/news-edit.module';
import { RefresherService } from './../providers/util/refresher.service';
import { NewsDetailPageModule } from './../pages/news-detail/news-detail.module';

import { ToastService } from './../providers/util/toast.service';
import { LogoutAppPage } from './../pages/logout-app/logout-app';
import { Camera } from '@ionic-native/camera';
import { ListNewsToEditPageModule } from '../pages/list-news-to-edit/list-news-to-edit.module';
import { SaveDeleteImageFirebase } from '../providers/util/saveDeleteImagemFirebase';
import { BaseService } from '../providers/util/base.service';
import { AddNewsPage } from '../pages/add-news/add-news';
import { CameraProvider } from '../providers/util/camera.provider';
//import { CardIO } from '@ionic-native/card-io';

import { AngularFireModule } from 'angularfire2';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, IonicPageModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthLoginProvider } from '../providers/auth-login/auth-login';

// Configurações do FIREBASE
import { configFirebase } from '../configFirebase';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';

import { UsuarioProvider } from '../providers/usuario/usuario';
import { LoginAppPage } from '../pages/login-app/login-app';
import { NewsProvider } from '../providers/news/news';
import { NewsPage } from '../pages/news/news';
import { MenuAppPage } from '../pages/menu-app/menu-app';
import { AppState } from './app.global';

import { Geolocation } from '@ionic-native/geolocation';
import { LocalAtualMapPage } from '../pages/local-atual-map/local-atual-map';
import { TestMapPage } from '../pages/test-map/test-map';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    NewsPage,
    TabsPage,
    LoginAppPage,
    MenuAppPage,
    LogoutAppPage,
    AddNewsPage,
    MapsLocalPage,
    LocalAtualMapPage,
    TestMapPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicPageModule.forChild(LoginAppPage),
    // Configurações do Firebase
    AngularFireModule.initializeApp(configFirebase.firebase),

    // Just like that, you're offline enabled!
    AngularFirestoreModule.enablePersistence(),

    // Configuração do serviço de autenticação do firebase
    AngularFireAuthModule,

    // Configuração do serviço de banco de dados do firebase
    AngularFirestoreModule,
    NewsDetailPageModule,
    NewsEditPageModule,
    ListNewsToEditPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    NewsPage,
    TabsPage,
    LoginAppPage,
    MenuAppPage,
    LogoutAppPage,
    AddNewsPage,
    MapsLocalPage,
    LocalAtualMapPage,
    TestMapPage
  ],
  providers: [
    StatusBar,
    AppState,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthLoginProvider,
    UsuarioProvider,
    AngularFirestore,
    NewsProvider,
    Camera,
    CameraProvider,
    ToastService,
    SaveDeleteImageFirebase,
    BaseService,
    RefresherService,
    Geolocation

  ]
})
export class AppModule {}
