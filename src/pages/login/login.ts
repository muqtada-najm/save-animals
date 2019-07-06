import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { VolunteerPage } from '../volunteer/volunteer';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
declare var jquery:any;
declare var $:any;
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * 
 *  onfocus=" $(this).parent().addClass('is-select filed');"
            onblur="if ($(this).val() == ''){$(this).parent().removeClass('is-select'); }"
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  select = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public fireauth: AngularFireAuth, public db: AngularFireDatabase, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
 
 
 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  fucus(){
    $('flat-input').addClass('is-select filed');
  }
  
  visitedInput()
  {
    this.select = false;

      console.log("hit2");
  }

  ivolunteer() {
    var params = { tabIndex: 1 }
    this.navCtrl.push(VolunteerPage, params)
    localStorage.setItem
  }


  showalert(title, subTitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['موافق'],
      cssClass: 'myalert' 

    });
    alert.present();
  }




  login(email, password) {
    const loader = this.loadingCtrl.create({
      content: "جاري التحميل .....",
    });
    loader.present();
    console.log(email,password);
    
   if (email == ''){
    loader.dismiss();
    this.showalert("حدث خطاء","من فضلك اكتب الاميل الخاص بك")
   } else 
   if(password == ''){
    loader.dismiss();
    this.showalert("حدث خطاء","من فضلك اكتب كلمه المرور الخاصة بك")
   }  else {
    this.fireauth.auth.signInWithEmailAndPassword(email, password).then(result => {
      console.log(result);
      this.db.database.ref('volunteer/' + result.user.displayName).once('value', value => {
        if (value.val().approv == false) {
          console.log(value.val());
          console.log('uesr is not actvites');

          localStorage.setItem('uid','logout')
          loader.dismiss();
          this.showalert("خطاء","حسابك غيير مفعل الى الان بانتضار الموافقة من قبل المدير اذا تأخر ذالك فلا تتردد بارسال اميل لنا عبر الاميل التالي :   muqtada.najm@codeforiraq.org")
          this.fireauth.auth.signOut();
        } else 
        if (value.val().approv != true && value.val().approv != false){
          this.fireauth.auth.currentUser.delete()
          this.db.list('volunteer').remove(value.val().approv)
          localStorage.setItem('uid','logout')
          loader.dismiss();
          this.showalert("اسف","تم رفض طلبك في التطوع في هذا البرنامج لاسبب معيينه , اذا كنت تعتقد نفسك تستحق الانضمام فلا تتردد في مراسلتنا على الاميل التالي muqtada.najm@codeforiraq.org")

        } else {
          console.log('uesr is actvites');
          console.log(value.val().admin);
          loader.dismiss();
          localStorage.setItem('uid',result.user.displayName)
          localStorage.setItem('isadmin',value.val().admin)
        }
      })

    }, error => {
      if(error.code == "auth/wrong-password"){
        loader.dismiss();
        this.showalert("حدث خطاء","من فضلك اكتب كلمه المرور الخاصة بك بشكل صحيح")
      } else 
      if (error.code == "auth/invalid-email"){
        loader.dismiss();
        this.showalert("حدث خطاء","من فضلك اكتب الاميل الخاص بك بشكل صحيح");
      } else 
      if(error.code == "auth/user-not-found"){
        loader.dismiss();
        this.showalert("حدث خطاء","عذرا هذا الاميل غيير موجود من فضلك اكتب الاميل بشكل صحيح او تطولع لهذا البرنامج");
      } else {
      const alert = this.alertCtrl.create({
        title: "حدث خطاء",
        subTitle: error,
        buttons: ['موافق']
      });
      console.log(error);
      loader.dismiss();
      alert.present();
    } 
  });
}
  }


  passwordReset(){
    const prompt = this.alertCtrl.create({
      title: 'كلمه المرور',
      message: "اكتب الاميل الخاص بك من اجل استرجاح كلمه المرور الخاصة بك",
      inputs: [
        {
          name: 'الاميل',
          placeholder: 'ex@codeforiraq.org',
          id:'resetemail',
        },
      ],
      buttons: [
        {
          text: 'الغاء',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'اعادة تعيين', 
          handler: data => {
           const getelement:HTMLInputElement = document.getElementById('resetemail') as HTMLInputElement
            console.log(getelement.value);
            if (getelement.value == ''){
              const alert = this.alertCtrl.create({
                title: "خطاء",
                subTitle: "لم تقم بكتابة الاميل الخاص بك من اجل تعيين كلمه المرور",
                buttons: ['موافق'],
                cssClass: 'myalert' 
              });
              alert.present();
            } else {
              this.fireauth.auth.sendPasswordResetEmail(getelement.value).then(result=>{
                console.log(result);
                
              },error=>{
                if (error.code == "auth/invalid-email"){
                  const alert = this.alertCtrl.create({
                    title: "خطاء",
                    subTitle: "من فضلك اكتب الاميل بشكل صحيح",
                    buttons: ['موافق'],
                    cssClass: 'myalert' 
                  });
                  alert.present();
                } else if (error.code ==  "auth/user-not-found"){
                  const alert = this.alertCtrl.create({
                    title: "خطاء",
                    subTitle: "انت لم تقم بانشاء حساب اذهب الى التطوع لانشاء حساب",
                    buttons: ['موافق'],
                    cssClass: 'myalert' 
                  });
                  alert.present();
                 
                } else {
                  const alert = this.alertCtrl.create({
                    title: "خطاء",
                    subTitle: error,
                    buttons: ['موافق'],
                    cssClass: 'myalert' 
                  });
                  alert.present();
                }
                console.log(error);
                
              })
            }
          }
        },
      ],
    });
    prompt.present();
}
}
