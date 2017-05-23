import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

import {companyPage} from '../../pages/companies/companies';


@Component({
  templateUrl: 'categories.html',
})
export class Categoriespage {


    categories:any[] = [];

  constructor(public navCtrl: NavController) {

  }


  ionViewWillEnter() {

     var resourceRequest = new WLResourceRequest("/adapters/categoryAdapter/categories",WLResourceRequest.GET);
     resourceRequest.send().then((response) => {
       this.categories = JSON.parse(response.responseText);

    },
    function(error){
        alert(JSON.stringify(error));
    });
  }

  goTo(category:any){
    this.navCtrl.push(companyPage,{category:category});
  }


  ionViewDidLoad(){
    WL.Analytics.log({ AppView: 'categories' }, "visit category view");
    WL.Analytics.send();

  }



}
