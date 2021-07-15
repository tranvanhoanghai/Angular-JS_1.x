"use strict";

angular.module("auth").component("login", {
  templateUrl: "auth/login/login.template.html",
  controller: [
    "$state",
    "$localStorage",
    "$rootScope",
    "cssInjector",
    "AuthService",
    "Notification",
    function (
      $state,
      $localStorage,
      $rootScope,
      cssInjector,
      AuthService,
      Notification
    ) {
      cssInjector.add("auth/auth.template.css");
      var vm = this;
      vm.login = login;

      if ($localStorage.data) {
        $state.go("dashboard");
      }

      $rootScope.hideSideBar = $state.current.hideSideBar;

      function login() {
        var formData = {
          username: vm.username,
          password: vm.password,
        };

        AuthService.login(formData)
          .then((res) => {
            $localStorage.token = res.data.token;
            $localStorage.data = res.data.user;
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
