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
      vm.logout = logout;
      vm.token = $localStorage.data;
      if ($localStorage.data) {
        vm.name = $localStorage.data.name;
      }

      function logout() {
        delete $localStorage.data;
        delete $localStorage.token;
        $location.url("/login");
        vm.token = $localStorage.data;

        Notification.success({
          message: "Logout Successfully",
        });
      }
    },
  ],
});