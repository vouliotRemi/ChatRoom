angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $ionicModal) {
  $scope.settings = {
    enableFriends: false
  };

    $scope.list = [
      { id: 1, title: 'Titre', icon: 'ion-speakerphone'},
      { id: 2, title: 'Titre', icon: 'ion-happy-outline'},
      { id: 3, title: 'Titre', icon: 'ion-bowtie'},
      { id: 4, title: 'Titre', icon: 'ion-android-bus'},
      { id: 5, title: 'Titre', icon: 'ion-social-angular'},
      { id: 6, title: 'Titre', icon: 'ion-social-freebsd-devil'}
    ];

  // define create account view
  $ionicModal.fromTemplateUrl('templates/login.html', {
     scope: $scope,
     animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.loginModal = modal;
  });
})

.controller('TestCtrl', function($scope, $ionicPopup) {
  // Triggered on a button click, or some other target
  $scope.showPopup = function() {
    $scope.data = {};

    // popup perso
    var myPopup = $ionicPopup.show({
      template: '<input type="password" ng-model="data.wifi">',
      title: 'Saisir le mot de passe Wi-Fi',
      scope: $scope,
      buttons: [
        { text: 'Annuler' },
        {
          text: '<b>Enregistrer</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.wifi) {
              //ne pas autoriser la fermeture si le mot de passe n'est pas saisi
              e.preventDefault();
            } else {
              return $scope.data.wifi;
            }
          }
        }
      ]
    });

    myPopup.then(function(res) {
      console.log('Saisi!', res);
    });

    $timeout(function() {
       myPopup.close(); //fermeture de la popup après 3 secondes
    }, 3000);
   };

   // popup de confirmations
   $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Manger une glace',
       template: 'Etes-vous sûr de vouloir manger cette glace?'
     });

     confirmPopup.then(function(res) {
       if(res) {
         console.log('Vous êtes sûr');
       } else {
         console.log('Vous n\'êtes pas sûr');
       }
     });
   };

   // popup d'alerte
   $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Ne manger pas ça!',
       template: 'Le goût semble bon'
     });

     alertPopup.then(function(res) {
       console.log('Merci de ne pas avoir manger ce cône glacé!');
     });
   };

   $scope.info = {
     platform: ionic.Platform.platform(),
     version: ionic.Platform.version()
   };
   
});
