import { Component } from '@angular/core';
import { IonicPage, NavController , NavParams} from 'ionic-angular';

import { HomePage } from '../home/home';
import { VolunteerPage } from '../volunteer/volunteer';
import { LoginPage } from '../login/login';
import { StatusPage } from '../status/status';
import { NewsPage } from '../news/news';
import { NewVolunteersPage } from '../new-volunteers/new-volunteers';
import { AngularFireAuth } from 'angularfire2/auth';
import { AboutPage } from '../about/about';
import { ProfilePage } from '../profile/profile';
import { NewStatusPage } from '../new-status/new-status';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = VolunteerPage;
  tab3Root = LoginPage;
  tab4Root = StatusPage;
  tab5Root = NewsPage;
   
  myindex:number = 0;
  loginstatus;
  constructor(public fireauth:AngularFireAuth, public navCtrl: NavController, public navParams:NavParams) {
    setInterval( () => {
     if(this.fireauth.auth.currentUser == null){
      this.loginstatus = "logout"
     } else {
       this.loginstatus = this.fireauth.auth.currentUser.displayName
     }      
    }, 2000);
 
    try {
     this.myindex =  this.navParams.data.tabIndex || 0;
     console.log( this.navParams.data.tabIndex)

    } catch (error) {
      console.log(error)
    }
    
  }
}
