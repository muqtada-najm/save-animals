import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  , LoadingController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import * as $ from "jquery";


/**
 * Generated class for the VolunteerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-volunteer',
  templateUrl: 'volunteer.html',
})
export class VolunteerPage {
  ivolunteer:boolean = false;
  status:string;
  data = {
    name: '',
    zone: '',
    phone: '',
    email: '',
    password: '',
    confirmpassword: '',
    status: '',
    
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public fireauth:AngularFireAuth, public db: AngularFireDatabase , public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VolunteerPage');

  }


  gotovolunteer(){
      this.ivolunteer = true;
    }
    showalert(title, subTitle) {
      const alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: ['موافق']
      });
      alert.present();
    }


    volunteer(){
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
          this.showalert('حدث خطاء', 'من فضلك حدد صنفك سواء كنت طبيب بيطري او ناقل للحيوانات .. الخ');
        } else
          if (this.data.zone == '') {
            loader.dismiss();
            this.showalert('حدث خطاء', 'من فضلك اضف عنوان سكنك حتى نعرف اين تسكن');
          } else
            if (this.data.phone == '') {
              loader.dismiss();
              this.showalert('حدث خطاء', 'من فضلك اكتب رقم هاتفق من اجل التواصل معك عن طريقه');
            } else
            if (this.data.email == '') {
              loader.dismiss();
              this.showalert('حدث خطاء', 'من فضلك اكتب الاميل الخاص بك حتى تتمكن من اشناء حساب');
            } 
            else
              if (this.data.password == '') {
                loader.dismiss();
                this.showalert('حدث خطاء', 'من فضلك اكتب كلمه المرور الخاصة بك لاكمال عملية التسجيل');
              } 
              else
              if (this.data.confirmpassword == '') {
                loader.dismiss();
                this.showalert('حدث خطاء', 'من فضلك اعد كتابة كلمه المرور في الخانة الاخيرة من اجل التأكد منها');
              } else if(this.data.password != this.data.confirmpassword){
                loader.dismiss();
                this.showalert('حدث خطاء', 'عذرا كلمه المرور غيير متطابقه تأكد من ان كلمه المرور تطابق اعادة كتابة كلمه المرور');
              } else {
      this.fireauth.auth.createUserWithEmailAndPassword(this.data.email, this.data.password)
      .then(resulat=>{
        this.db.list("volunteer").push({
          name:this.data.name,
          zone:this.data.zone,
          phone:this.data.phone,
          email:this.data.email,
          status:this.data.status,
          approv: false,
          admin:false,
          
        }).then(res=>{
          this.fireauth.auth.currentUser.updateProfile({
            displayName: res.key,
            photoURL:' '    
            });
          this.fireauth.auth.signOut();
          console.log(res.key);
          console.log(this.fireauth.auth.currentUser);
          loader.dismiss();
          this.showalert('تمت عملة التسجيل بنجاح', "اكتملت عملية التسجيل للتطوع بنجاح (: \n بانتضار موافقة الادمن من اجل تفعيل حسابك");
          this.data.name = '';
          this.data.status = '';
          this.data.phone = '';
          this.data.zone = '';
          this.data.email = '';
          this.data.password = '';
          this.data.confirmpassword = '';
          this.navCtrl.push(LoginPage);
        },error=>{
          console.log(error);
          loader.dismiss();
          this.showalert('حدث خطاء', error);
        });
      },error=>{
        console.log(error.code);
        console.log(error);
        loader.dismiss();
          if (error.code == "auth/email-already-in-use"){
            this.showalert('حدث خطاء', 'هذا الاميل مستخدم بلفعل ): \n من فضلك استخدم الاميل الحقيقي لك');
          } else  
          if (error.code == "auth/invalid-email"){
            this.showalert('حدث خطاء', 'الاميل مرفوض من فضلك اكتب الاميل بلشكل الصحيح ):');
          } else
          if (error.code == "auth/weak-password"){
            this.showalert('حدث خطاء', 'يجب ان تكون كلمه المرور اكثر من 6 احرف او ارقام.');
          } else
          if (error.code == "auth/network-request-failed"){
            this.showalert('حدث خطاء', 'خطاء في الانترنيت  . من فضلك تأكد من الاتصال في الانترنيت ثم حاول مرة اخرى.');
          } else
          {
          this.showalert('حدث خطاء', error);
        }
      });
    }
  }
}

