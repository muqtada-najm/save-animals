import { Component, ViewChild } from '@angular/core';
import { Platform , Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { VolunteerPage } from '../pages/volunteer/volunteer';
import { AngularFireAuth } from 'angularfire2/auth';
import { NewVolunteersPage } from '../pages/new-volunteers/new-volunteers';
import { StatusPage } from '../pages/status/status';
import { NewsPage } from '../pages/news/news';
import { NewStatusPage } from '../pages/new-status/new-status';
import { AngularFireDatabase } from 'angularfire2/database';
import { AllVolunteerPage } from '../pages/all-volunteer/all-volunteer';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav; 
  rootPage:any = TabsPage;
  statuslogin;
  isadmin;
  pages: Array<{title: string, component: any, index: number}>;
  constructor(public db:AngularFireDatabase , public fireauth:AngularFireAuth,   public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    setInterval( () => {
      if(localStorage.getItem('uid') == "logout"){
       this.statuslogin = "logout"
       this.isadmin = false
      } else {
        this.isadmin = localStorage.getItem('isadmin');
        this.statuslogin = "login";
            }      
     }, 1000);  
     // or you can yse that ....
    //  setInterval( () => {
    //   if(this.fireauth.auth.currentUser == null){
    //    this.statuslogin = "logout"
    //    this.isadmin = false
    //   } else {
    //     this.statuslogin = this.fireauth.auth.currentUser.displayName
    //     this.db.database.ref('volunteer/' + this.fireauth.auth.currentUser.displayName).once("value", result=>{
    //     this.isadmin = result.val().admin
    //      })
    //   }      
    //  }, 1000);    
    this.initializeApp();
    this.pages = [
      { title: 'Home', component: HomePage , index: 0 },
      { title: 'volunteer', component: VolunteerPage , index: 1 },
      { title: 'Login', component: LoginPage , index: 2 },
      { title: 'newVolunteers', component: NewVolunteersPage , index: 0},
      { title: 'status', component: StatusPage , index: 1 },
      { title: 'news', component: NewsPage , index: 2 },
      { title: 'NewStatusPage', component: NewStatusPage , index: 0 },
      { title: 'AllVulonteerPage', component: AllVolunteerPage , index: 0 },
 
    ];

  }
  logout(){
    this.fireauth.auth.signOut();
    localStorage.setItem('uid','logout')
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {    
    let params = {};
    if (page.index){
      params = { tabIndex: page.index}
    }
    if (this.nav.getActiveChildNav() && page.index != undefined){
      this.nav.getActiveChildNav().select(page.index)
    } else {
      this.nav.setRoot(page.component, params)
    }
  }

  rootpage(page){
    let params = {tabIndex: page.index};
    if (page.index){
      params = { tabIndex: page.index}
    }
    if (this.nav.getActiveChildNav() && page.index != undefined){
      this.nav.push(page.component,params)     
      this.nav.getActiveChildNav().select(0)
 
    } else {
      this.nav.push(page.component,params)      
    }
  }
  }

