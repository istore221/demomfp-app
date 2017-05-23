import { Component } from '@angular/core';
import { NavParams  , ViewController , Platform , ToastController } from 'ionic-angular';
import { Contact} from '@ionic-native/contacts';
import { Camera } from '@ionic-native/camera';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { File } from '@ionic-native/file';
import { UUID } from 'angular2-uuid';
import { FilePath } from '@ionic-native/file-path';
import {Geolocation} from '@ionic-native/geolocation';



@Component({
  selector: 'page-addperson',
  templateUrl: 'addperson.html',
  providers: [
    Camera,
    SQLite,
    File,
    FilePath,
    Geolocation
  ]
})
export class AddpersonPage {

  person:Contact;
  personAdded:Boolean = false;


  constructor( public navParams: NavParams,public platform: Platform,public viewCtrl: ViewController,public camera:Camera,public sqlite: SQLite,public file: File,public filePath: FilePath,public geolocation: Geolocation,public toastCtrl: ToastController) {
    this.person = navParams.get('person');

  }


  ionViewDidLoad(){
    WL.Analytics.log({ AppView: 'add person' }, "visit addperson");
    WL.Analytics.send();
  }


  closeModal() {
    this.viewCtrl.dismiss((this.personAdded ? this.person.name.formatted : null));
  }



  takePhoto(avatar){



    this.camera.getPicture({
      quality: 85,
      targetWidth: 500,
      targetHeight: 500,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true,
      saveToPhotoAlbum:false
    }).then((imagePath) => {

    var newFileName = UUID.UUID()+".jpg";


    if (this.platform.is('android')) {



      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {

          let currentImageName = filePath.split("/").pop();
          let currentImagePath = filePath.substr(0, filePath.lastIndexOf('/') + 1);


          this.copyFileToLocalDir(currentImagePath, currentImageName, newFileName)
          .then(success => {
            avatar.src = this.pathForImage(newFileName);
            this.person['avatar'] = avatar.src;
            this.insertPerson();
          },
          error => {
            console.log("Error while storing file.");
          });

        });

    } else {

      let currentImageName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      let currentImagePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(currentImagePath, currentImageName, newFileName)
      .then(success => {
        avatar.src = this.pathForImage(newFileName);
        this.person['avatar'] = avatar.src;
        this.insertPerson();
      },
      error => {
        console.log("Error while storing file.");
      });


    }













    }, (err) => {

    });


  }


  insertPerson(){




    this.geolocation.getCurrentPosition({
       enableHighAccuracy: true,
       maximumAge: 0
    }).then((resp) => {



      this.sqlite.create({
        name: 'demomfpapp.db',
        location: 'default'
      }).then((db: SQLiteObject) => {

        db.executeSql("INSERT INTO people (name, avatar , latitude , longitude , url) VALUES ('"+this.person.name.formatted+"', '"+this.person['avatar']+"','"+resp.coords.latitude+"','"+resp.coords.longitude+"','"+this.person['url']+"')", {})
        .then((data) => {
          console.debug("Record created on people");
          this.personAdded = true;
          this.closeModal();
        },(error) => {
          console.log("Unable to CREATE TABLE  IF NOT EXISTS people sql");
        });
      }).catch((error)=>{
        console.log("Unable to open database");
      });




    }).catch((error) => {

      this.toastCtrl.create({
        message: error.message,
        duration: 3000,
        position: 'middle'
      }).present();



    });





  }


  copyFileToLocalDir(currentImagePath,currentImageName,newFileName){

    return this.file.copyFile(currentImagePath, currentImageName, this.file.dataDirectory, newFileName);

  }


  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return this.file.dataDirectory + img;
    }
  }





}
