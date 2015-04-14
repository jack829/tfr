angular.module('login.controllers', [])

.controller('LoginCtrl', function($scope, $state, $firebaseSimpleLogin, FIREBASE_REF, userSession){
  
  // {scope: 'email, publish_actions, public_profile'});

  userSession.auth = $firebaseSimpleLogin(new Firebase(FIREBASE_REF));

  $scope.login = function(provider){
    userSession.auth.$login(provider);
  }
});