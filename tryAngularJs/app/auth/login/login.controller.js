"use strict";

angular.module("auth").component("login", {
  templateUrl: "auth/login/login.template.html",
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

      if ($localStorage.token) {
        $location.path("/dashboard");
      }

      vm.login = function () {
        var formData = {
          username: vm.username,
          password: vm.password,
        };

        LoginService.login(formData)
          .then(
            function (res) {
              console.log(res);
              $localStorage.token = res.data.token;
              $location.path("/dashboard");
            },
            function () {
              $rootScope.error = "Failed to signin";
            }
          )
          .catch((err) => console.log("lỗi", err));
      };
    },
  ],
});
