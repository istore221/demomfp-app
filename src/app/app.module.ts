import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { HomePage } from '../pages/home/home';
import { PeoplePage } from '../pages/people/people';
import {PersonPage} from '../pages/person/person';
import {AddpersonPage} from '../pages/addperson/addperson';
import {Categoriespage} from '../pages/categories/categories';
import {companyPage} from '../pages/companies/companies';




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AgmCoreModule } from '@agm/core';
import {GoogleMapsAPIWrapper} from '@agm/core/services/google-maps-api-wrapper';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PeoplePage,
    PersonPage,
    AddpersonPage,
    Categoriespage,
    companyPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText:'',
      iconMode: 'md'
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpkjSdQH00rlRELpQxM-6DHlt2bbVTjCk',
      libraries: ['places']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PeoplePage,
    PersonPage,
    AddpersonPage,
    Categoriespage,
    companyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleMapsAPIWrapper
  ]
})
export class AppModule {}
