(function () {
  'use strict';

  var app = angular.module('abuserViewer', ['ui.router', 'ui.bootstrap', 'chieffancypants.loadingBar', 'ngAnimate', 'tableSort']);

  app.controller('playerController', function($rootScope, $scope, $http, $stateParams) {

    $rootScope.status = false;

     $rootScope.from = $stateParams.from == null ? 0 : $stateParams.from;
     $rootScope.name = $stateParams.name == null ? '' : $stateParams.name;

     $rootScope.search = $rootScope.name;

    /* Retrieve all achievement_progress data */
    $http.get( app.api + "battleground/deserters/recent/50?from=" + $rootScope.from + "&name=" + $rootScope.name)
      .success(function (data, status, header, config) {
      $scope.players = data;

      for (var i = 0; i < $scope.players.length; i++) {
        switch(parseInt($scope.players[i].type)) {
          case 0:
            $scope.players[i].status = "blue";
            $scope.players[i].popover = "il giocatore abbandona il BG (deserter)";
          break;
          case 1:
            $scope.players[i].status = "grey";
            $scope.players[i].popover = "il giocatore è stato buttato fuori dal BG dopo essere stato offline per un certo numero di minuti (deserter oppure player crashato)";
          break;
          case 2:
            $scope.players[i].status = "red";
            $scope.players[i].popover = "il giocatore è stato invitato a joinare il BG ma si rifiuta esplicitamente di farlo, cliccando nel pulsante (queue abuser)";
          break;
          case 3:
            $scope.players[i].status = "orange";
            $scope.players[i].popover = "il giocatore è stato invitato a joinare il BG ma non preme nessun pulsante e scade il tempo (AFK oppure queue abuser)";
          break;
          case 4:
            $scope.players[i].status = "yellow";
            $scope.players[i].popover = "il giocatore è stato invitato a joinare BG ed in quel momento slogga (queue abuser, oppure per una rara coincidenza il player deve sloggare proprio in quel momento)";
          break;
        }
      }
    })
      .error(function (data, status, header, config) {
      console.log("[ERROR] $http.get request failed in playerController!");
    });

  });

}());
