"use strict";

angular.module("user").service("UserService", function ($http, SharedConstant) {
  var user = "/user";
  var baseUrl = SharedConstant.baseUrl.url + user;

  this.listUsers = function () {
    return $http.get(baseUrl);
  };

  this.listUsersActive = function () {
    return $http.get(baseUrl + "/active");
  };

  this.listExceptUsers = function (id) {
    return $http.get(baseUrl + "/except/" + id);
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
