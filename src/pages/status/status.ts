import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable , } from 'rxjs';
import { AboutPage } from '../about/about';
// import 'rxjs/add/observable/throw';

/**
 * Generated class for the StatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

  allstatus: Observable<any>
  backdrop: string = 'normal';
  height: number = 0;
  

  constructor(public db:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
   this.allstatus = this.db.list('status').snapshotChanges();

  }

  ionViewDidLoad() {
 
 }
 
 goto(key){
  this.navCtrl.push(AboutPage, {infokey:key})
}
}

















