import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import { MoreStatusPage } from '../more-status/more-status';

/**
 * Generated class for the NewStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-status',
  templateUrl: 'new-status.html',
})
export class NewStatusPage {

  allstatus: Observable<any>
  backdrop: string = 'normal';
  height: number = 0;
  
  
  // items = [{ name: "archie" }, { name: "jake" }, { name: "richard" }];

  constructor(public db:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.allstatus = this.db.list('status').snapshotChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewStatusPage');
    console.log("eroif")

  }
  goto(key){
    this.navCtrl.push(MoreStatusPage, {infokey:key})
  }
 
  back(){
    this.navCtrl.pop();
  }
}
