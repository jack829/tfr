angular.module('matches.controllers', [])

.controller('MatchesCtrl', function($scope, MatchesFactory, User){
  $scope.fbId = User.fbId;
  
  $scope.matches = MatchesFactory.all();

  $scope.remove = function(match){
    MatchesFactory.remove(match);
    //Will also need to do a PUT request here
  }
})
