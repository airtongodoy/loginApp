import { SaveImageFirebase } from './../providers/util/saveImageFirebase';
import { ToastService } from './../providers/util/toast.service';
import { LogoutAppPage } from './../pages/logout-app/logout-app';
import { Camera } from '@ionic-native/camera';
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
import { UsuarioProvider } from '../providers/usuario/usuario';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { LoginAppPage } from '../pages/login-app/login-app';
import { NewsProvider } from '../providers/news/news';
import { NewsPage } from '../pages/news/news';
import { MenuAppPage } from '../pages/menu-app/menu-app';
import { AppState } from './app.global';

//import { Camera } from '@ionic-native/camera';

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
    AddNewsPage

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
    AngularFirestoreModule
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
    AddNewsPage
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
    SaveImageFirebase
    //,Camera, CardIO
  ]
})
export class AppModule {}
