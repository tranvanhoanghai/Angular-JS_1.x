"use strict";

// Define the `myApp` module
var app = angular
  .module("myApp", [
    "view1",
    "view2",
    "contact",
    "dashboard",
    "user",
    "salesOrder",

    "angular.css.injector",
    "ngRoute",
    "ngResource",
    "ui-notification",
    // "ui.bootstrap",
  ])
  .config(function (NotificationProvider) {
    NotificationProvider.setOptions({
      delay: 2000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: "right",
      positionY: "top",
    });
  });
