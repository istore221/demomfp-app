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

  ionViewDidLoad() {
  }

  openUrl(){
    window.open(this.person.url,"_system","location=yes");
  }

}
