(function () {
  "use strict";

  angular
    .module("auth")
    .service(
      "AuthService",
      function (SharedConstant, $localStorage, $state, $http) {
        var baseUrl = SharedConstant.baseUrl.url;
        var login = "/auth/login";
        var changePassword = "/auth/changePassword";

        this.login = function (data) {
          return $http.post(baseUrl + login, data);
        };

        this.changePassword = function (data) {
          return $http.post(baseUrl + changePassword, data);
        };

        this.logout = function () {
          delete $localStorage.data;
          delete $localStorage.token;
          $state.go("login");
        };
      }
    );
})();
