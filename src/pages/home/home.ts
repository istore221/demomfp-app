import { Component } from '@angular/core';
import { NavController , Events} from 'ionic-angular';

interface GridItem{

  tittle:String,
  color:String
};



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  gridMenuItems:GridItem[] = [];


  constructor(public navCtrl: NavController,public events: Events) {
    this.gridMenuItems = [
      {
        tittle:'Header',
        color:'#1abc9c'
      },
      {
        tittle:'Header',
        color:'#e67e22'
      },
      {
        tittle:'Header',
        color:'#9b59b6'
      },
      {
        tittle:'Header',
        color:'#e74c3c'
      }
    ];

  }



  ionViewWillEnter() {
    this.events.publish('page:home');
  }

}
