"use strict";

// Declare app level module which depends on views, and core components
angular
  .module("myApp", ["ngRoute", "myApp.view1", "myApp.view2", "myApp.version"])
  .config([
    "$locationProvider",
    "$routeProvider",
    function ($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix("!");

      $routeProvider
        // .when("/home", { templateUrl: "components/sidebar" })
        .otherwise({ redirectTo: "/view1" });
    },
  ]);
