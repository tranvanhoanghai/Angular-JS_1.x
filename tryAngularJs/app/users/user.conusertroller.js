"use strict";

angular.module("user").component("user", {
  templateUrl: "users/user.template.html",
  controller: [
    "$state",
    "$localStorage",
    "cssInjector",
    "$rootScope",
    function ($state, $localStorage, cssInjector, $rootScope) {
      cssInjector.add("users/user.template.css");
      if ($rootScope.isAdmin === false) {
        $state.go("main.403");
      }
    },
  ],
});
