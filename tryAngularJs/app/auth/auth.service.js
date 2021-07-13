"use strict";

angular
  .module("auth")
  .service(
    "LoginService",
    function (
      BaseUrlService,
      $http,
      $window,
      $cookies,
      Session,
      $localStorage
    ) {
      var login = "/auth/login";
      var baseUrl = BaseUrlService.getBaseUrl() + login;

      this.login = function (data) {
        return $http.post(baseUrl, data);
      };
    }
  );
