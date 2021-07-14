"use strict";

angular.module("auth").component("logout", {
  templateUrl: "auth/logout/logout.template.html",
  controller: [
    "$location",
    "$localStorage",
    "cssInjector",
    "LoginService",
    "Notification",
    function (
      $location,
      $localStorage,
      cssInjector,
      LoginService,
      Notification
    ) {
      cssInjector.add("auth/auth.template.css");
      var vm = this;
      vm.logout = logout;

      function logout() {
        delete $localStorage.data;
        delete $localStorage.token;
        $location.url("/login");

        Notification.success({
          message: "Logout Successfully",
        });
      }
    },
  ],
});
