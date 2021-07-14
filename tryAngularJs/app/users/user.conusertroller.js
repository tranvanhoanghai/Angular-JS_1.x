"use strict";

angular.module("user").component("user", {
  templateUrl: "users/user.template.html",
  controller: [
    "$state",
    "$localStorage",
    "cssInjector",
    "UserService",
    "Notification",
    function ($state, $localStorage, cssInjector, UserService, Notification) {
      cssInjector.add("users/user.template.css");
      if ($localStorage.data) {
        if ($localStorage.data.isAdmin == "false") {
          // $location.path("/403");
          $state.go("403");
        }
      }
    },
  ],
});
