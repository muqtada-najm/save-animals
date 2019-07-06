import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { interval } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isend = 'first';
  complet: string
  data = {
    name: '',
    zone: '',
    phone: '',
    status: '',
    note: '',
  }


  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
  ) {

    
   // myinbut.onblur = function(){    
     // console.log("hello");
   // }

  }
  showalert(title, subTitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['موافق']
    });
    alert.present();
  }

  iamsend(isend) {
    this.isend = isend;
  }
  send() {
    const loader = this.loadingCtrl.create({
      content: "جاري التحميل .....",
    });
    loader.present();
    if (this.data.name == "") {
      loader.dismiss();
      this.showalert('حدث خطاء', 'من فضلك اكتب اسمك الكامل');
    } else
      if (this.data.status == '') {
        loader.dismiss();
        this.showalert('حدث خطاء', 'من فضلك حدد نوع الحيوان الذي تعرض لحادث');
      } else
        if (this.data.zone == '') {
          loader.dismiss();
          this.showalert('حدث خطاء', 'من فضلك اضف منطقه الحادث التي يوجد فيها الحيوان');
        } else
          if (this.data.phone == '') {
            loader.dismiss();
            this.showalert('حدث خطاء', 'من فضلك اكتب رقم هاتفق من اجل التواصل معك عن طريقه');
          } else
            if (this.data.note == '') {
              loader.dismiss();
              this.showalert('حدث خطاء', 'من فضلك اكتب وصف مختصر على هذه الحالة في الملاحضات');
            } else
              if (this.data.status != '' && this.data.name != '' && this.data.zone != '' && this.data.phone != '' && this.data.note != '') {
                var now = new Date();
                var getdate = now.toISOString().substr(0, 10).replace(/-/g, '/');
                this.db.list('status').push({
                  name: this.data.name,
                  zone: this.data.zone,
                  phone: this.data.phone,
                  note: this.data.note,
                  status: this.data.status,
                  approv: false,
                  date: getdate
                }).then(resualt => {
                  loader.dismiss();
                  this.showalert('تمت  الارسال', 'تمت عملة ارسال الحالة الى المتطوعين وسوف يصلك اتصال هاتفي بعد قليل من فضلك كن متوجد');
                  this.data.name = '';
                  this.data.status = '';
                  this.data.phone = '';
                  this.data.zone = '';
                  this.data.note = '';
                  this.isend = 'iscomplet'
                }, error => {
                  console.log(error);
                  loader.dismiss();
                  if (error.code == "auth/network-request-failed"){
                    this.showalert('حدث خطاء', 'خطاء في الانترنيت  . من فضلك تأكد من الاتصال في الانترنيت ثم حاول مرة اخرى.');
                  } else {
                  this.showalert('حدث خطاء', error)
               } 
              })
              }
  }

}



