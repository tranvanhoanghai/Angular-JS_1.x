"use strict";

app.config([
  // "$rootScope",
  "$locationProvider",
  "$routeProvider",
  "$httpProvider",
  "cssInjectorProvider",
  "NotificationProvider",
  function (
    // $rootScope,
    $locationProvider,
    $routeProvider,
    $httpProvider,
    cssInjectorProvider,
    NotificationProvider
  ) {
    $locationProvider.hashPrefix("!");
    cssInjectorProvider.setSinglePageMode(true);

    $routeProvider
      .when("/view1", {
        template: "<view1></view1>", //crud demo (<view1></view1> is name component)
      })
      .when("/view2", {
        template: "<view2></view2>",
      })
      .when("/dashboard", {
        template: "<dashboard></dashboard>",
      })
      .when("/contact", {
        template: "<contact></contact>",
      })
      .when("/contact/create", {
        template: "<create-contact></create-contact>",
      })
      .when("/contact/edit/:id", {
        template: "<edit-contact></edit-contact>",
      })
      .when("/sales-order", {
        template: "<sales-order></sales-order>",
      })
      .when("/user", {
        template: "<user></user>",
      })
      .when("/login", {
        template: "<login></login>",
      })
      .otherwise("/dashboard");

    NotificationProvider.setOptions({
      delay: 2000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: "right",
      positionY: "top",
    });
  },
]);
