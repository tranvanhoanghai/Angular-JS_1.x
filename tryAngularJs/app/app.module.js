"use strict";

// Define the `myApp` module
angular
  .module("myApp", [
    "loading",
    "view1",
    "view2",
    "share",
    "myApp.version",

    "angular.css.injector",
    "ngRoute",
    "ngResource",
    "ui-notification",
    //1 "ui.bootstrap",
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
