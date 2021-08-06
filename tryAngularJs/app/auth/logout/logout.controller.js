"use strict";

angular.module("auth").component("logout", {
  templateUrl: "auth/logout/logout.template.html",
  controller: [
    "cssInjector",
    "AuthService",
    "Notification",
    function (cssInjector, AuthService, Notification) {
      cssInjector.add("auth/auth.template.css");
      var vm = this;
      vm.logout = logout;

      function logout() {
        AuthService.logout();
        Notification.success({
          message: "Logout Successfully",
        });
      }
    },
  ],
});
