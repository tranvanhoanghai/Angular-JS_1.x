"use strict";

angular.module("auth").component("auth", {
  templateUrl: "auth/auth.template.html",
  controller: [
    "$state",
    "cssInjector",
    "localStorageFactory",
    function ($state, cssInjector, localStorageFactory) {
      cssInjector.add("auth/auth.template.css");
      var vm = this;
      vm.displayUser = displayUser;
      vm.changePassword = changePassword;
      vm.displayUser();

      function displayUser() {
        vm.data = localStorageFactory.data;
        if (vm.data) {
          vm.name = vm.data.name;
        }
      }

      function changePassword() {
        $state.go("main.changePassword");
      }
    },
  ],
});
