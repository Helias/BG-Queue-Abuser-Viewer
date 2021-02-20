(function () {
  'use strict';

  var app = angular.module('abuserViewer', ['ui.router', 'ui.bootstrap', 'chieffancypants.loadingBar', 'ngAnimate', 'tableSort']);

  app.controller('playerController', function($rootScope, $scope, $http, $stateParams) {

    $rootScope.status = false;

     $rootScope.from = $stateParams.from == null ? 0 : $stateParams.from;
     $rootScope.name = $stateParams.name == null ? '' : $stateParams.name;

     $rootScope.search = $rootScope.name;

    /* Retrieve all battleground deserters data */
    $http.get( app.api + "characters/battleground_deserters/50?from=" + $rootScope.from + "&name=" + $rootScope.name)
      .success(function (data, status, header, config) {
      $scope.players = data;

      for (var i = 0; i < $scope.players.length; i++) {
        switch(parseInt($scope.players[i].type)) {
          case 0:
            $scope.players[i].status = "blue";
            $scope.players[i].popover = "the player abandoned the BG (deserter)";
          break;
          case 1:
            $scope.players[i].status = "grey";
            $scope.players[i].popover = "the player is kicked out from the BG after being offline (deserter or player crashed)";
          break;
          case 2:
            $scope.players[i].status = "red";
            $scope.players[i].popover = "the player is invited to join BG but he refused, he clicked Leave Queue (queue abuser)";
          break;
          case 3:
            $scope.players[i].status = "orange";
            $scope.players[i].popover = "the player is invited to join BG but he doesn't click on any button and the time expires (AFK or queue abuser)";
          break;
          case 4:
            $scope.players[i].status = "yellow";
            $scope.players[i].popover = "the player is invited to join BG but in that time he logs out (queue abuser or the player just logged out)";
          break;
        }
      }
    })
      .error(function (data, status, header, config) {
      console.log("[ERROR] $http.get request failed in playerController!");
    });

  });

}());
