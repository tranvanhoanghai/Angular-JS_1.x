"use strict";

angular.module("auth").component("changePassword", {
  templateUrl: "auth/change-password/change-password.template.html",
  controller: [
    "$state",
    "$localStorage",
    "cssInjector",
    "AuthService",
    "Notification",
    function ($state, $localStorage, cssInjector, AuthService, Notification) {
      cssInjector.add("auth/auth.template.css");
      var vm = this;
      vm.change = change;
      console.log();

      function change() {
        if (vm.newPass !== vm.confirmPass) {
          Notification.error({
            message: "Your new password and confirmation password do not match",
          });
          return false;
        }
        var data = {
          id: $localStorage.data.id,
          oldPass: vm.oldPass,
          newPass: vm.newPass,
        };
        AuthService.changePassword(data);
      }
    },
  ],
});
