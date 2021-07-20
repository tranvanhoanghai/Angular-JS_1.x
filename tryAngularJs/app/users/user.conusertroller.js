"use strict";

angular.module("user").component("user", {
  templateUrl: "users/user.template.html",
  controller: [
    "$state",
    "$localStorage",
    "cssInjector",
    "Notification",
    function ($state, $localStorage, cssInjector, Notification) {
      cssInjector.add("users/user.template.css");
      if ($localStorage.data) {
        if ($localStorage.data.isAdmin == "false") {
          $state.go("main.403");
        }
      }
    },
  ],
});
