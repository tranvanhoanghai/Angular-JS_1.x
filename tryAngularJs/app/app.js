"use strict";

// Declare app level module which depends on views, and core components
angular.module("myApp").config([
  "$locationProvider",
  "$routeProvider",
  "cssInjectorProvider",
  function ($locationProvider, $routeProvider, cssInjectorProvider) {
    $locationProvider.hashPrefix("!");
    cssInjectorProvider.setSinglePageMode(true);

    // $routeProvider.otherwise({ redirectTo: "/view1" });

    $routeProvider
      .when("/view1", {
        template: "<view1></view1>",
      })
      .when("/view2", {
        template: "<view2></view2>",
      })
      .otherwise("/view1");
  },
]);
