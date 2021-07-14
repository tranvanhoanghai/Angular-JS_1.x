"use strict";

angular.module("auth").component("auth", {
  templateUrl: "auth/auth.template.html",
  controller: [
    "$localStorage",
    "$state",
    "cssInjector",
    "AuthService",
    "Notification",
    function ($localStorage, $state, cssInjector, AuthService, Notification) {
      cssInjector.add("auth/auth.template.css");
      var vm = this;
      vm.check = check;
      vm.changePassword = changePassword;

      function check() {
        setInterval(() => {
          vm.token = $localStorage.data;
          if ($localStorage.data) {
            vm.name = $localStorage.data.name;
          }
        }, 100);
      }
      vm.check();

      function changePassword() {
        $state.go("changePassword");
      }
    },
  ],
});
