import { Component } from '@angular/core';
import {  NavController, NavParams  } from 'ionic-angular';



@Component({
  selector: 'page-person',
  templateUrl: 'person.html',


})
export class PersonPage {

  person:any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.person = navParams.get('person');
  }

  ionViewDidLoad(){
    WL.Analytics.log({ AppView: 'person' }, "visit person "+this.person.name);
    WL.Analytics.send();
  }

  openUrl(){
    window.open(this.person.url,"_system","location=yes");
  }

}
