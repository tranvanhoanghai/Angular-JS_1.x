"use strict";

angular.module("auth").service("AuthService", function (BaseUrlService, $http) {
  var baseUrl = BaseUrlService.getBaseUrl();
  var login = "/auth/login";
  var changePassword = "/auth/changePassword";

  this.login = function (data) {
    return $http.post(baseUrl + login, data);
  };

  this.changePassword = function (data) {
    return $http.post(baseUrl + changePassword, data);
  };
});
