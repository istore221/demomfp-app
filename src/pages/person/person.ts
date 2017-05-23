import { Component } from '@angular/core';
import {  NavController, NavParams  } from 'ionic-angular';

import { Network } from '@ionic-native/network';


@Component({
  selector: 'page-person',
  templateUrl: 'person.html',


})
export class PersonPage {

  person:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public network: Network) {
    this.person = navParams.get('person');
  }

  ionViewDidLoad(){
    WL.Analytics.log({ AppView: 'person' }, "visit person "+this.person.name);
    WL.Analytics.send();
  }

  openUrl(){

    if(this.network.type == "none"){


      alert("Network Connectivity Not found");

    }else{
          window.open(this.person.url,"_system","location=yes");
    }

  }

}
