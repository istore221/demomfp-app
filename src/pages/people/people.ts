import { Component } from '@angular/core';
import { NavController, NavParams , FabContainer , ModalController , ToastController } from 'ionic-angular';

import {PersonPage} from '../../pages/person/person';
import { Contacts , Contact} from '@ionic-native/contacts';

import {AddpersonPage} from '../../pages/addperson/addperson';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


interface Person{

  firstName:String,
  lastName:String,
  avatar:String,



};

@Component({
  templateUrl: 'people.html',
  providers:[
    Contacts,
    ModalController,
    SQLite
  ],
})
export class PeoplePage {

  people:Person[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,public contacts: Contacts,public modalCtrl:ModalController,public sqlite: SQLite) {

  }

  ionViewWillEnter() {
    this.loadPeople();
  }

  ionViewDidLoad(){
    WL.Analytics.log({ AppView: 'people' }, "visit people view");
    WL.Analytics.send();
  
  }

  createToast(message){
    let toast = this.toastCtrl.create({
       message: message,
       duration: 3000,
       position: 'top'
     });
     toast.present();
  }


  loadPeople(){

     this.people = [];

        this.sqlite.create({
          name: 'demomfpapp.db',
          location: 'default'
        }).then((db: SQLiteObject) => {

          db.executeSql("SELECT * FROM people", {})
          .then((data) => {

           if(data.rows.length > 0) {
               for(var i = 0; i < data.rows.length; i++) {
                   this.people.push(data.rows.item(i));
               }
           }

           },(error) => {
              console.log("Unable to SELECT * FROM people sql");
          });
       }).catch((error)=>{
         console.log("Unable to open database");
       });
  }

  goTo(person:Person){
    this.navCtrl.push(PersonPage,{person:person});

  }

  createPerson(fab: FabContainer){
    fab.close();



    this.contacts.pickContact().then((person:Contact) => {
      let myModal = this.modalCtrl.create(AddpersonPage,{person:person});
      myModal.onDidDismiss(person => {

        if(person){
          this.createToast(person+" was added successfully");
          this.loadPeople();
        }

      });

      myModal.present();

    }).catch((error:any)=>{

    })


  }


}
