import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  data;
  key;


  constructor(public db:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    // var sss = this.db.list("volunteer", ref => ref.orderByChild("email").equalTo(this.navParams.data.infokey)).snapshotChanges();   
    // sss.subscribe(data => {
    //   this.key = data[0].key;
      this.db.database.ref("volunteer/"+  this.navParams.data.infokey).on("value", userd => {      
        console.log(userd.val())
        this.data = userd.val();
        console.log(this.data)
      }, error => {
        console.log(error)
      });
    // })
    

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
     console.log(this.navParams.data);
    
  }
  back(){
    this.navCtrl.pop();
  }

}



