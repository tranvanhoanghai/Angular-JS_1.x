"use strict";

angular.module("auth").component("login", {
  templateUrl: "auth/login/login.template.html",
  controller: [
    "$location",
    "$localStorage",
    "$rootScope",
    "cssInjector",
    "AuthService",
    "Notification",
    function (
      $location,
      $localStorage,
      $rootScope,
      cssInjector,
      AuthService,
      Notification
    ) {
      cssInjector.add("auth/auth.template.css");
      var vm = this;

      if ($localStorage.data) {
        $location.url("/dashboard");
      }
      // console.log($localStorage.data.user.name);

      vm.login = function () {
        var formData = {
          username: vm.username,
          password: vm.password,
        };

        AuthService.login(formData)
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
