import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the NewVolunteersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-volunteers',
  templateUrl: 'new-volunteers.html',
})
export class NewVolunteersPage {

  newvolunteers:Observable<any>

  constructor(public fireauth:AngularFireAuth, public db:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.newvolunteers =  this.db.list('volunteer').snapshotChanges();
    console.log(this.newvolunteers);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewVolunteersPage');
 
  }
  approv(key){
   console.log(key);
   this.db.list('volunteer').update(key,{
    approv:true,
   })
  }
  delete(key){
    this.db.list('volunteer').update(key,{
      approv:key,
     })
  }
  back(){
    this.navCtrl.pop();
  }

}
