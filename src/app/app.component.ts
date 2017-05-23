

import { Component , ViewChild , Renderer } from '@angular/core';
import { Platform , Nav , Events , AlertController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


import { HomePage } from '../pages/home/home';
import { PeoplePage } from '../pages/people/people';
import { Categoriespage } from '../pages/categories/categories';
import { Network } from '@ionic-native/network';

import {PushProvider} from '../providers/push-provider/push-provider';

declare var window: any;


interface MenuItem{

  icon:String,
  tittle:String,
  page:any,
  task:()=>any
};


@Component({
  templateUrl: 'app.html',
  providers:[
    SQLite,
    Network,
    PushProvider
  ],
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  sideNavItems:MenuItem[] = null;
  activePage:any = HomePage;
  events:Events = null;
  private AuthHandler: any;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,events: Events,public sqlite: SQLite,public network: Network,public renderer:Renderer,private push: PushProvider,private alertCtrl: AlertController) {



    renderer.listenGlobal('document', 'mfpjsloaded', () => {
        console.log('--> MobileFirst API init complete');
        this.MFPInitComplete();
    });

    platform.ready().then(() => {

      if(this.network.type == "none"){


        alert("Network Connectivity Not found");

      }

      statusBar.styleLightContent();
      splashScreen.hide();
      this.initSideNav();
      this.events=events;
      this.configureDatabase();
      this.events.subscribe('page:home', () => {
        this.activePage = HomePage;
      });




      //https://github.com/csantanapr/mfp8-ionic-demo



      // WLAuthorizationManager.obtainAccessToken()
      //   .then(
      //       function(accessToken) {
      //
      //
      //
      //       },
      //
      //       function(error) {
      //        alert(JSON.stringify(error));
      //       }
      //   );








    });
  };


  MFPInitComplete(){
    console.log('--> MFPInitComplete function called')
    this.AuthInit();
    this.rootPage = HomePage;
    WL.Analytics.send();
    setInterval(function() {
  WL.Logger.send();
  WL.Analytics.send();
}, 60000)

    this.push.init();



          // Create an analytics log message
      //WL.Analytics.log("Analytics log message");

      // Create a custom activity
      //WL.Analytics.log({_activity: "customActivity"});

      // Create a custom activity with a log message
      //WL.Analytics.log({_activity: "customActivity"}, "Analytics log message");


  }


  initSideNav(){

    this.sideNavItems = [


     {
       icon:'md-people',
       tittle:'People',
       page:PeoplePage,
       task:()=>{
         if(this.activePage == PeoplePage) return;
         this.activePage = PeoplePage;
         this.nav.push(PeoplePage);


       }
     },
     {
      icon:'md-settings',
       tittle:'Settings',
       page:null,
       task:()=>{

       }
     },
     {
       icon:'md-help-circle',
       tittle:'Categories',
       page:null,
       task:()=>{

         if(this.activePage == Categoriespage) return;
         this.activePage = Categoriespage;
         this.nav.push(Categoriespage);


       }
     }
   ];

 };

configureDatabase(){

  this.sqlite.create({
    name: 'demomfpapp.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql("CREATE TABLE  IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(64), avatar TEXT , latitude REAL , longitude REAL , url TEXT)", {})
    .then((data) => {
        console.debug("Table people created");
     },(error) => {
        console.error("Unable to CREATE TABLE  IF NOT EXISTS people sql");
    });
 }).catch((error)=>{
   console.error("Unable to create database");
 });


}

 isActive(page:MenuItem) : boolean{

   return this.activePage == page.page;
 };



 AuthInit(){
    this.AuthHandler = WL.Client.createSecurityCheckChallengeHandler("LoginRequiredCheckResource");

    this.AuthHandler.handleChallenge = ((response) => {
        console.log('--> inside handleChallenge');

        if(response.errorMsg){
          var msg = response.errorMsg + '<br>';
          msg += 'Remaining attempts: ' + response.remainingAttempts;
        }
       this.displayLogin(msg);
    })

  }

  displayLogin(msg:any){

    let alert = this.alertCtrl.create({
     title: 'Login',
     message: msg,
     inputs: [
       {
          name: 'username',
          placeholder: 'Username'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        },
     ],
     buttons: [
       {
          text: 'Login',
          handler: data => {
            console.log('--> Trying to auth with user', data.username);

            this.AuthHandler.submitChallengeAnswer(data);
          }
        }
     ]
   });
   alert.present();


  }






}
