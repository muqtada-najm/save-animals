import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the MoreStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more-status',
  templateUrl: 'more-status.html',
})
export class MoreStatusPage {

  isnow = "no";
  hidd = false;
  data;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db:AngularFireDatabase , public alertCtrl:AlertController) {

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
  approv(status){
    if(status == true ){
      console.log("true");
      this.db.list('status').update(this.navParams.data.infokey,{
        approv:true
      }).then(()=>{
        this.navCtrl.pop()
          const alert = this.alertCtrl.create({
            title: "تمت الموافقة",
            subTitle: "تمت عملية الموافقة على هذه الحالة وتم ارسال اشعار تنبيه لجميع المتطوعين",
            buttons: ['موافق'],
            cssClass: 'myalert' 
      
          });
          alert.present();      
      })
          
      

    }else {
      console.log("true");
      this.navCtrl.pop().then(()=>{
      this.db.list('status').remove(this.navParams.data.infokey).then(()=>{
      const alert = this.alertCtrl.create({
        title: "تمت الرفض",
        subTitle: "تم رفض هذه الحالة شكرا لك :)",
        buttons: ['موافق'],
        cssClass: 'myalert' 
  
      });

      alert.present();      
  })     
      })
  
           
    }

  }


}
