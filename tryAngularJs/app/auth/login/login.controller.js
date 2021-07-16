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
    "Notification",
    function (
      $state,
      $stateParams,
      $localStorage,
      $rootScope,
      cssInjector,
      AuthService,
      Notification
    ) {
      cssInjector.add("auth/auth.template.css");
      var vm = this;
      vm.login = login;

      console.log($stateParams);
      if ($stateParams.error == 401) {
        AuthService.logout();
      } else {
        if ($localStorage.data) {
          $state.go("dashboard");
        } else {
          $rootScope.hideSideBar = $state.current.hideSideBar;
        }
      }

      //

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
            $rootScope.hideSideBar = false;

            $state.go("dashboard");
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
