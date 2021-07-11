"use strict";

login.component("login", {
  templateUrl: "login/login.template.html",
  controller: [
    "$scope",
    "$localStorage",
    "$rootScope",
    "cssInjector",
    "LoginService",
    "Notification",
    function (
      $scope,
      $localStorage,
      $rootScope,
      cssInjector,
      LoginService,
      Notification
    ) {
      cssInjector.add("login/login.template.css");

      $scope.login = function () {
        var formData = {
          username: $scope.username,
          password: $scope.password,
        };

        LoginService.login(formData)
          .then(
            function (res) {
              console.log(res);
              $localStorage.token = res.data.token;
              // $location.path("/me");
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
