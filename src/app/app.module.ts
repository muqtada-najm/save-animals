import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler  } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { VolunteerPage } from '../pages/volunteer/volunteer';
import { LoginPage } from '../pages/login/login';
import { StatusPage } from '../pages/status/status';


import { ServersPipe } from '../pipes/servers/servers'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule , AngularFirestore } from 'angularfire2/firestore';
import { NewVolunteersPage } from '../pages/new-volunteers/new-volunteers';
import { NewStatusPage } from '../pages/new-status/new-status';
import { NewsPage } from '../pages/news/news';
import { ProfilePage } from '../pages/profile/profile';
import { AllVolunteerPage } from '../pages/all-volunteer/all-volunteer';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MoreStatusPage } from '../pages/more-status/more-status';
export const firebaseConfig = {
  apiKey: "AIzaSyD38DD3RuR8_dCXs_nMdtATPRgpNNKYiKQ",
  authDomain: "save-animal.firebaseapp.com",
  databaseURL: "https://save-animal.firebaseio.com",
  projectId: "save-animal",
  storageBucket: "save-animal.appspot.com",
  messagingSenderId: "828536877168",
};




@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    VolunteerPage,
    LoginPage,
    StatusPage,
    NewVolunteersPage,
    NewsPage,
    ServersPipe,
    ProfilePage,
    AllVolunteerPage,
    NewStatusPage,
    MoreStatusPage

  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
   AngularFirestoreModule,
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    VolunteerPage,
    LoginPage,
    StatusPage,
    NewVolunteersPage,
    NewsPage,
    ProfilePage,
    AllVolunteerPage,
    NewStatusPage,
    MoreStatusPage

    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AngularFirestore,
    OneSignal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
