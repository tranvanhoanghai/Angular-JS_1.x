"use strict";

angular.module("auth").component("changePassword", {
  templateUrl: "auth/change-password/change-password.template.html",
  controller: [
    "$state",
    "$localStorage",
    "cssInjector",
    "SharedService",
    "AuthService",
    "Notification",
    function (
      $state,
      $localStorage,
      cssInjector,
      SharedService,
      AuthService,
      Notification
    ) {
      cssInjector.add("auth/auth.template.css");
      var vm = this;
      vm.change = change;
      vm.regexPassword = SharedService.regexPassword();
      // console.log(vm.regexPassword);

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
        
        AuthService.changePassword(data)
          .then((res) => {
            AuthService.logout();
            Notification.success({
              message: res.data.message,
              replaceMessage: true,
            });
          })
          .catch((error) => {
            console.log("Error", error.data.message);
            Notification.error({
              message: error.data.message,
              replaceMessage: true,
            });
          });
      }
    },
  ],
});
