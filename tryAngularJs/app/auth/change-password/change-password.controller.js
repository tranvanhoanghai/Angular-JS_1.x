"use strict";

angular.module("auth").component("changePassword", {
  templateUrl: "auth/change-password/change-password.template.html",
  controller: [
    "$location",
    "$localStorage",
    "$rootScope",
    "cssInjector",
    "LoginService",
    "Notification",
    function (
      $location,
      $localStorage,
      $rootScope,
      cssInjector,
      LoginService,
      Notification
    ) {
      cssInjector.add("auth/auth.template.css");
      var vm = this;

      vm.login = function () {
        var formData = {
          username: vm.username,
          password: vm.password,
        };

        LoginService.login(formData)
          .then((res) => {
            $localStorage.token = res.data.token;
            $localStorage.data = res.data.user;
            $location.url("/dashboard");

            Notification.success({
              message: res.data.message,
            });
          })
          .catch((err) => {
            console.log(err);
            Notification.error({
              message: err.data.message,
            });
          });
      };
    },
  ],
});
