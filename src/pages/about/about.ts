import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  isnow = "no";
  hidd = false;
  data;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db:AngularFireDatabase) {

   setTimeout(() => {
    //  const email = undefined
    // + this.navParams.data.infokey
    this.db.database.ref("status/"+this.navParams.data.infokey).on("value", userd => {      
      console.log(userd.val())
      this.data = userd.val();
      this.isnow = "yes"
      setTimeout(()=>{
       this.hidd = true
      },1010);
    }, error => {
      console.log(error)
    });
  }, 2000);

    // setTimeout(() => {
    //    console.log("hello");
    //   this.isnow = "yes"
    //   setTimeout(()=>{
    //    this.hidd = true
    //   },1010);
    // }, 3000);

  }
  ionViewDidLoad() {
    console.log(this.navParams.data.infokey);
    console.log(this.navParams.get);
   
  }


}
