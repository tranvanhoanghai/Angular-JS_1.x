"use strict";

angular.module("auth").component("auth", {
  templateUrl: "auth/auth.template.html",
  controller: [
    "$scope",
    "$localStorage",
    "$rootScope",
    "cssInjector",
    "LoginService",
    "Notification",
    function (
      $scope,
      $localStorage,
      $rootScope,
      cssInjector,
      LoginService,
      Notification
    ) {
      cssInjector.add("auth/auth.template.css");
    },
  ],
});
