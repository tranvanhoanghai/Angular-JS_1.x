"use strict";

angular.module("user").component("user", {
  templateUrl: "users/user.template.html",
  controller: [
    "$location",
    "$localStorage",
    "cssInjector",
    "UserService",
    "Notification",
    function (
      $location,
      $localStorage,
      cssInjector,
      UserService,
      Notification
    ) {
      cssInjector.add("users/user.template.css");
      if ($localStorage.data) {
        if ($localStorage.data.isAdmin == "false") {
          $location.url("/403");
        }
      }
    },
  ],
});
