import {Injectable} from '@angular/core';

@Injectable()
export class PushProvider {
  data: any = null;

  constructor() {}

  init() {

    console.log('--> PushProvider init called');

    // MFPPush.isPushSupported(function(success){
    //   alert(JSON.stringify(success));
    // },function(failure){
    //   alert(JSON.stringify(failure));
    // });

    MFPPush.initialize(
    function(success){
    //  alert('--> Push init success');

      MFPPush.registerNotificationsCallback(pushNotificationReceived);


      var options = {"phoneNumber": ""};

      MFPPush.registerDevice(
        options,
        function(success){
        //  alert('--> Push registration success');

          var tag = ['mytag'];


          MFPPush.subscribe(
            tag,
            function(success){
            //  alert('--> Push subscribe success');
            },
            function(failure){
              alert('--> Push subscribe failure');
            }
          )

        },
        function(failure){
          alert('--> Push registration failure '+JSON.stringify(failure));
        }
      )

    }, function(failure){
      alert('--> Push init failure '+JSON.stringify(failure));
    })

    function pushNotificationReceived(message){
      alert(message.alert);
      WL.Analytics.log({ AppView: 'MFPF' }, "visit mfpf view");
     WL.Analytics.log({location: "USA"}, "visit");
     WL.Analytics.log({location: "Mexico"}, "visit");
     WL.Analytics.log({location: "Canada"}, "visit");




     WL.Analytics.send().then(function(done){
       alert("analytics sent");
     },function(error){
       alert("analytics not sent")
     });



     WL.Logger.config({"level": "TRACE"});
     WL.Logger.fatal("test crash on app");
     WL.Logger.send();

    }

  }


}
