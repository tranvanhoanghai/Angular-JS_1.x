"use strict";

app.config([
  "$locationProvider",
  "$routeProvider",
  "cssInjectorProvider",
  function ($locationProvider, $routeProvider, cssInjectorProvider) {
    $locationProvider.hashPrefix("!");
    cssInjectorProvider.setSinglePageMode(true);

    // $routeProvider.otherwise({ redirectTo: "/view1" });

    $routeProvider
      .when("/view1", {
        template: "<view1></view1>", //crud demo (<view1></view1> is name component)
      })
      .when("/view2", {
        template: "<view2></view2>",
      })
      .when("/view3", {
        template: "<loading></loading>",
      })
      .otherwise("/view1");
  },
]);
