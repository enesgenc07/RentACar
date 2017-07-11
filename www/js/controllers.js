angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$cordovaSQLite,$state) {


})
/*  $scope.loginData = {};


  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form

*/

  .controller('LoginCtrl', function($scope, $ionicModal, $timeout,$cordovaSQLite,$state,$ionicPopup) {
    $scope.deger = {
      userId: null,
      username: null,

      password: null,
    }


    $scope.doLogin = function () {


      var girisquery = ("SELECT * FROM users WHERE name ='" + $scope.deger.username + "' AND pass ='" + $scope.deger.password + "'");
      $cordovaSQLite.execute(db, girisquery).then(function (res) {

          if (res.rows.length > 0) {
            $state.go('app.search')
          }
          else {
            $scope.showAlert();

          }

        },
        function (err) {
          console.log(JSON.stringify(err));
        }
      );


    }
    $scope.showAlert = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Yanlis Giriş'
        template: 'Tekrar Dene'
      });
    }

  })




.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {

})

.controller('searchctrl',function ($scope,$state) {

  $scope.Ekle = function () {

    $state.go('app.browse');


  };
  $scope.Kirala = function ()

  {

    $state.go('app.kirala');



  };


  $scope.Gerigetir=function () {
    $state.go('app.kiralikliste');
  };

})

.controller('Browsectrl',function ($scope,$cordovaSQLite,$state) {

  $scope.arac = {

    marka: null,
    yil: null,
    tur: null
  }
  $scope.Tamamla=function () {



    var aracekle = "INSERT INTO oto (marka,yil,tur) VALUES (?, ?, ?)";

    $cordovaSQLite.execute(db, aracekle,[$scope.arac.marka, $scope.arac.yil, $scope.arac.tur]);

    $scope.arac.marka="";
    $scope.arac.yil="";
    $scope.arac.tur="";
    alert("Özellikleri Belirtilen Araç Eklendi");
    $state.go('app.search');

  };
  $scope.Geridon2=function () {

    $scope.modal.hide();

  }



})

.controller('kiralactrl',function ($scope,$state,$cordovaSQLite,$ionicModal,$ionicPopup) {

  $scope.oto={
    value:null,
  };

  $scope.data={
    value:null,
  };
  $scope.dateValue2={
    value:null,
  };

  $scope.dateValue3={
    value:null  ,
  };
  $scope.aracListele={
    Turvalue:null,
    Yilvalue:null,
    Markavalue:null
  };







  $scope.sec=function (oto) {

    $scope.modal.show();
    $scope.oto=oto;
}

//modal
  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {

    $scope.modal = modal;

  });



  $scope.yilList=[];
  $scope.markaList=[];
  $scope.turList=[];




    $scope.kiraliklist=[];



  $cordovaSQLite.execute(db, "SELECT * FROM oto where NOT EXISTS (select * from kiralik where oto.otoId=kiralik.otoId)")

    .then(function (res)
    {
      for (var i = 0; i < res.rows.length; i++)
      {
        $scope.kiraliklist.push(
          {
            otoId : res.rows.item(i).otoId,
            marka : res.rows.item(i).marka,
            yil   : res.rows.item(i).yil,
            tur   : res.rows.item(i).tur,
          });

              if ($scope.TurCtrl(res.rows.item(i).tur))
              {
                $scope.turList.push(res.rows.item(i).tur);
                //console.log($scope.turList);
              }
              if ($scope.MarkaCtrl(res.rows.item(i).marka))
              {
                $scope.markaList.push(res.rows.item(i).marka);
              }
               if ($scope.yilCtrl(res.rows.item(i).yil))
             {
               $scope.yilList.push(res.rows.item(i).yil);
              }

      }
			});




      //console.log(JSON.stringify($scope.kiraliklist));

  




  $scope.musteriList=[];


  $cordovaSQLite.execute(db, "SELECT cId,name,surname FROM customer")
    .then(function (res)
    {
      for (var i = 0; i < res.rows.length; i++)
      {
        $scope.musteriList.push(
          {

            cId : res.rows.item(i).cId,
            name : res.rows.item(i).name,
            surname   : res.rows.item(i).surname,
          });
      }
      //console.log(JSON.stringify($scope.musteriList));

    });





  $scope.Geridon=function () {

    $scope.modal.hide();

  }

 /* $scope.CustBul=function () {
    var obj=JSON.parse($scope.data.value);



      console.log(obj.cId);
   angular.forEach(obj,function (value,key)
    {


      console.log(value + " " +  key );
    }
    );



  }*/
  $scope.MarkaCtrl=function (marka) {

    for (var i=0;i<$scope.markaList.length;i++)
    {
      if (marka==$scope.markaList[i])
      {
        return false;
      }

    }
    return true;

  }

  $scope.yilCtrl=function (yil) {

    for (var i=0;i<$scope.yilList.length;i++)
    {
      if (yil==$scope.yilList[i])
      {
        return false;
      }

    }
    return true;

  }



  $scope.TurCtrl=function (tur) {

  for (var i=0;i<$scope.turList.length;i++)
  {
    if (tur==$scope.turList[i])
    {
      return false;
    }

  }
  return true;

}





  $scope.KayitGonder=function () {

    var obj=JSON.parse($scope.data.value);
      var query= "Insert into kiralik (cId,userId,otoId,kiralamatarih,donustarih) values (?,?,?,?,?)";


    $cordovaSQLite.execute(db, query,[obj.cId,,$scope.oto.otoId,$scope.dateValue2.value,$scope.dateValue3.value])
      .then(function (res)
      {
       // alert("Başarı ile kiralandı");
        $scope.modal.hide();
        console.log("Başarılı bir şekilde kiralandı")
        $state.go('app.search');


      },
      function (err)
      {
        console.log(err);
      }
    );





  }






  /* $scope.Ara=function () {


   for(var i=0;i<$scope.kiraliklist.length;i++)
   {
       console.log($scope.kiraliklist[i].tur + ".  ." + JSON.stringify($scope.aracListele.Turvalue)+ ".  ." +  ((" "+$scope.kiraliklist[i].tur+"  ") == $scope.aracListele.Turvalue) );
     console.log($scope.aracListele.Yilvalue+"  "+$scope.kiraliklist[i].yil+ "  "+ ($scope.aracListele.Yilvalue==$scope.kiraliklist[i].yil))
     console.log($scope.aracListele.Markavalue+" "+$scope.kiraliklist[i].marka+"  " +($scope.aracListele.Markavalue==$scope.kiraliklist[i].marka))
     console.log("     ")
     if($scope.aracListele.Turvalue==$scope.kiraliklist[i].tur  &&  $scope.aracListele.Yilvalue==$scope.kiraliklist[i].yil
     && $scope.aracListele.Markavalue==$scope.kiraliklist[i].marka)
     {

     }
     else {

     }
   }


  }*/






})

.controller('kiraliklistectrl',function ($scope,$cordovaSQLite,$ionicPopup,$state,$timeout) {

  $scope.kiralikaraclist = [];

  $cordovaSQLite.execute(db, "SELECT * FROM kiralik k,oto o WHERE k.otoId=o.otoId ORDER BY kirID DESC")
    .then(function (res)
    {
      for (var i = 0; i < res.rows.length; i++)
      {
        $scope.kiralikaraclist.push(
          {

            kirId : res.rows.item(i).kirId,
            otoId : res.rows.item(i).otoId,
            marka :res.rows.item(i).marka,
            tur :res.rows.item(i).tur,
            yil :res.rows.item(i).yil,
            kiralamatarih : res.rows.item(i).kiralamatarih,
            donustarih : res.rows.item(i).donustarih,
          });
      }
     // console.log(JSON.stringify($scope.kiralikaraclist));

    });


    $scope.AracSil=function (item) {
        var query = "DELETE FROM kiralik WHERE kirId = ?";

        $cordovaSQLite.execute(db, query, [item.kirId]).then(function(res) {

          $scope.showAlert1();



        }, function (err) {

          console.error(err);
        });


    };

  $scope.showAlert1 = function () {
     $scope.alertPopup = $ionicPopup.show({
      // templateUrl:'templates/kirala.html',

       title: 'Kiralanan Araç Teslim Edildi',



    });
  }
  $timeout(function() {

     $state.go('app.search');

   $scope.alertPopup.close();

  },3000);

})

.controller('SignCtrl',function ($scope,$cordovaSQLite,$state) {


  $scope.sign = {

    name: null,
    pass: null,
    takim: null
  }

  $scope.doSign=function () {


    var usersadd = "INSERT INTO users (name,pass,takim) VALUES (?, ?, ?)";

    $cordovaSQLite.execute(db, usersadd,[$scope.sign.name, $scope.sign.pass, $scope.sign.takim]);

  $scope.sign.name="";
  $scope.sign.pass="";
  $scope.sign.takim="";

  $state.go('app.loginn');
  }

})







