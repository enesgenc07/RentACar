// Ionic Starter App
var db=null;
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngCordova','ion-datetime-picker'])

.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if (window.cordova) {
      db = $cordovaSQLite.openDB({ name: "my.db" }); //device
     $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS users (userId integer PRIMARY KEY,name text, pass password , takim text )");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS oto ( otoId integer PRIMARY KEY,marka text, yil integer,tur text )");
     $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS customer ( cId integer PRIMARY KEY,name text, surname text,phone integer,address varchar)");


    }else{
      db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS users (userId integer PRIMARY KEY,name text, pass password, takim text)");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS oto (otoId integer PRIMARY KEY, marka text, yil integer,tur text )");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS customer (cId integer PRIMARY KEY ,name text, surname text,phone integer,address varchar)");


      //var query = "INSERT INTO customer (name,surname,phone,address) VALUES ('enes', 'genc', 0541252,'ulusmah2127sok no:5')";
     // $cordovaSQLite.execute(db,query);
    }



  });
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller:'searchctrl'
      }
    }
  })

    .state('app.kiralikliste', {
      url: '/search/kiralikliste',
      views: {
        'menuContent': {
          templateUrl: 'templates/kiralikliste.html',
          controller:'kiraliklistectrl'
        }
      }
    })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller:'Browsectrl'
        }
      }
    })

    .state('loginn', {
      url: '/loginn',
      templateUrl: 'templates/loginn.html',
      controller:'LoginCtrl'


    })

    .state('app.sign', {
      url: '/sign',
      views: {
        'menuContent': {
          templateUrl: 'templates/sign.html',
          controller:'SignCtrl'
        }
      }
    })



    .state('app.kirala', {
      url: '/kirala',
      views: {
        'menuContent': {
          templateUrl: 'templates/kirala.html',
          controller:'kiralactrl'
        }
      }
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/loginn');
});
