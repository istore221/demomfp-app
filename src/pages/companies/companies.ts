import { Component } from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';


@Component({
  templateUrl: 'companies.html',
})
export class companyPage {


    companies:any[] = [];
    category:any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.category = navParams.get('category');
      
  }


  ionViewWillEnter() {

     var resourceRequest = new WLResourceRequest("/adapters/categoryAdapter/categories/"+this.category.id+"/companies",WLResourceRequest.GET);
     resourceRequest.send().then((response) => {
       this.companies = JSON.parse(response.responseText);

    },
    function(error){
        alert(JSON.stringify(error));
    });
  }


  ionViewDidLoad(){
    WL.Analytics.log({ AppView: 'companies by ' +this.category.categoryType}, "visit companies view");
    WL.Analytics.send();

  }



}
