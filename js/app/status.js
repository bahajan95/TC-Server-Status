/*jslint browser: true, white: true, plusplus: true */
/*global angular, console, alert*/

(function () {
  'use strict';
  var app = angular.module('status', ['ui.bootstrap', 'chieffancypants.loadingBar', 'tableSort']);

  app.controller("StatusController", function($scope, $http) {

    $scope.serverName = app.serverName;

    var request = app.api + "online";
    $scope.apiLoaded = true;

    $http.get( request )
      .success(function(data, status, header, config) {

      $scope.onlinePlayers = data.length;

      if ($scope.onlinePlayers > 0) {
        $scope.players = data;
        $scope.allianceCount = 0;
        $scope.hordeCount = 0;

        $scope.players.forEach(function(player) {

          switch (parseInt(player.race, 10)) {
            case 2:
            case 5:
            case 6:
            case 8:
            case 9:
            case 10:
              $scope.hordeCount++;
              player.faction = "horde";
              break;

            case 1:
            case 3:
            case 4:
            case 7:
            case 11:
              $scope.allianceCount++;
              player.faction = "alliance";
              break;
          }

        });
      }

    })
      .error(function(data, status, header, config) {
      $scope.apiLoaded = false;
      console.log("Error while retrieving online players.");
    });

  });

}());
