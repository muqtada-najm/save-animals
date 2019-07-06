import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var jquery:any;
declare var $:any;
/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  zone = ['الثقافي','الحوراء','الزراعيين','الجمهوري الشرقي','الجمهوري الغربي','الاستقامة','الفجر الجديد','الابرار','العصري','الزعيم','الامير','الانصار','العراق','الشرطة','الجنوب','الحكيم','الوفاء','الثقلين','الزهراء','النهضة','التضامن','الفاضلية','الصادق الثاني','الصادق الاول','الغدير','النسيج','الاسكان','الكرامة','العذارية','الوحدة','الموظفين','الجديدة','السراي','المتقاعدين','الجمعية','العدالة','السلام','الصدر الثالثة','الصدر الثانية','الصدر الاولى','الضباط','العروبةالثالثة','العروبة الاولى','صوب الشامية','التقية','الكرار','الخضراء','رمضان','الجزائر','الحي الصناعي','المعلمين','التراث','الجامعة','الاساتذة','الحكيم','الفرات','الحضارة'];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
    
  }
  toggle(){
    $('.title').text("heelo");

  }

}
