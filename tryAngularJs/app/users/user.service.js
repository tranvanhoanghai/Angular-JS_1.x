"use strict";

angular.module("user").service("UserService", function ($http, BaseUrlService) {
  var user = "/user";
  var baseUrl = BaseUrlService.getBaseUrl() + user;

  this.listUsers = function () {
    return $http.get(baseUrl);
  };

  this.detailUser = function (id) {
    return $http.get(`${baseUrl}/${id}`);
  };

  this.createUser = function (data) {
    return $http.post(baseUrl, data);
  };

  this.updateUser = function (id, data) {
    return $http.put(`${baseUrl}/${id}`, data);
  };

  this.deleteUser = function (id) {
    return $http.delete(`${baseUrl}/${id}`);
  };
  
});
