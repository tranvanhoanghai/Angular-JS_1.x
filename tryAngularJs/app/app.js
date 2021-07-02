"use strict";

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
        template: "<view1></view1>", //crud demo
      })
      .when("/view2", {
        template: "<view2></view2>",
      })
      .otherwise("/view1");
  },
]);
