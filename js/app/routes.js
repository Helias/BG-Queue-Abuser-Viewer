/*jslint browser: true, white: true, plusplus: true*/
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('abuserViewer');

  app.config(function ($stateProvider, $urlRouterProvider) {

    /* routing */

    // default route
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
      url: '/',
      templateUrl: 'partials/home.html',
      controller: 'playerController'
    })
    .state('paging', {
    url: '/:from',
    templateUrl: 'partials/home.html',
    controller: 'playerController'
  })
    .state('name', {
    url: '/:from/:name',
    templateUrl: 'partials/home.html',
    controller: 'playerController'
  });

  });

}());
