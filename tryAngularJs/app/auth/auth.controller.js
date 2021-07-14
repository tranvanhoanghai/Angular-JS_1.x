"use strict";

angular.module("auth").component("auth", {
  templateUrl: "auth/auth.template.html",
  controller: [
    "$localStorage",
    "$location",
    "cssInjector",
    "LoginService",
    "Notification",
    function (
      $localStorage,
      $location,
      cssInjector,
      LoginService,
      Notification
    ) {
      cssInjector.add("auth/auth.template.css");
      var vm = this;
      vm.check = check;
      function check() {
        setInterval(() => {
          vm.token = $localStorage.data;
          if ($localStorage.data) {
            vm.name = $localStorage.data.name;
          }
        }, 100);
      }
      vm.check();
    },
  ],
});
