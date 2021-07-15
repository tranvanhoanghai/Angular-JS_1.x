"use strict";

angular.module("auth").component("auth", {
  templateUrl: "auth/auth.template.html",
  controller: [
    "$state",
    "cssInjector",
    "AuthService",
    "SharedService",
    "Notification",
    function ($state, cssInjector, AuthService, SharedService, Notification) {
      cssInjector.add("auth/auth.template.css");
      var vm = this;
      vm.check = check;
      vm.changePassword = changePassword;

      function check() {
        setInterval(() => {
          vm.data = SharedService.getData();
          if (vm.data) {
            vm.name = vm.data.name;
          }
        }, 500);
      }
      vm.check();

      function changePassword() {
        $state.go("changePassword");
      }
    },
  ],
});
