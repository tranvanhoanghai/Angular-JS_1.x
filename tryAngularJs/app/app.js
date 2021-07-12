"use strict";

app.config([
  // "$rootScope",
  "$locationProvider",
  "$routeProvider",
  "$httpProvider",
  "cssInjectorProvider",
  "NotificationProvider",
  "$qProvider",
  function (
    // $rootScope,
    $locationProvider,
    $routeProvider,
    $httpProvider,
    cssInjectorProvider,
    NotificationProvider,
    $qProvider
  ) {
    $locationProvider.hashPrefix("!");
    cssInjectorProvider.setSinglePageMode(true);
    $qProvider.errorOnUnhandledRejections(false);
    $routeProvider
      .when("/view1", {
        template: "<view1></view1>", //crud demo (<view1></view1> is name component)
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
      .when("/contact?leadSource=:filter", {
        template: "<contact></contact>",
      })
      .when("/contact?assignedTo=:filter", {
        template: "<contact></contact>",
      })
      .when("/sales-order", {
        template: "<sales-order></sales-order>",
      })
      .when("/sales-order/create", {
        template: "<create-sales-order></create-sales-order>",
      })
      .when("/sales-order?filter=:filter", {
        template: "<sales-order></sales-order>",
      })
      .when("/sales-order/edit/:id", {
        template: "<edit-sales-order></edit-sales-order>",
      })
      .when("/user", {
        template: "<user></user>",
      })
      .when("/user/create", {
        template: "<create-user></create-user>",
      })
      .when("/user/edit/:id", {
        template: "<edit-user></edit-user>",
      })
      .when("/login", {
        template: "<login></login>",
      });
    // .otherwise("/dashboard");

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
