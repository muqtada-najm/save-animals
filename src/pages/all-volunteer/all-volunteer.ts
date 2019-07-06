import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the AllVolunteerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-volunteer',
  templateUrl: 'all-volunteer.html',
})
export class AllVolunteerPage {
  allmember:Observable<any>
  alldatamember
  searchQuery: string = '';
  items : Array<any>  = [];
  myar : Array<any>  = [];
  allitem;
  constructor(public navCtrl: NavController, public navParams: NavParams, public db:AngularFireDatabase) {
    this.allmember = this.db.list('volunteer').snapshotChanges();
    this.db.list('volunteer').valueChanges().subscribe(data=>{
     console.log(data);
     this.alldatamember = data
     
    }) 
    this.db.list("volunteer").valueChanges().subscribe(data => {
      this.items = data;
      this.myar = data;
      console.log(data)

    });   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllVolunteerPage');
  }
  initializeItems() {
    this.items = this.myar;
   }

   goto(key){
     var kays
     var datas
    var sss = this.db.list("volunteer", ref => ref.orderByChild("email").equalTo(key)).snapshotChanges();   
    sss.subscribe(data => {
    kays = data[0].key;
    // console.log(data[0].key);
    // console.log(data[0].key);
    this.navCtrl.push(ProfilePage, {infokey:data[0].key})

    
    }) 

   }
 

  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.phone.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.zone.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.email.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  back(){
    this.navCtrl.pop();
  }

}
