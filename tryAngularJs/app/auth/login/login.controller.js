"use strict";

angular.module("auth").component("login", {
  templateUrl: "auth/login/login.template.html",
  controller: [
    "$state",
    "$stateParams",
    "$localStorage",
    "$rootScope",
    "cssInjector",
    "AuthService",
    "SharedService",
    "Notification",
    function (
      $state,
      $stateParams,
      $localStorage,
      $rootScope,
      cssInjector,
      AuthService,
      SharedService,
      Notification
    ) {
      cssInjector.add("auth/auth.template.css");
      var vm = this;
      vm.login = login;

      if ($stateParams.error == 401 || $stateParams.error == 403) {
        AuthService.logout();
      } else {
        if ($localStorage.data) {
          $state.go("main.dashboard", {
            reload: true,
            inherit: false,
            notify: true,
          });
        } else {
          AuthService.logout();
        }
      }

      function login() {
        var formData = {
          username: vm.username,
          password: vm.password,
        };

        AuthService.login(formData)
          .then((res) => {
            $localStorage.token = res.data.token;
            $localStorage.data = res.data.user;
            // $localStorage.refreshToken = res.data.refreshToken;

            $state.go("main.dashboard", {
              reload: true,
              inherit: false,
              notify: true,
            });
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
      }
    },
  ],
});
