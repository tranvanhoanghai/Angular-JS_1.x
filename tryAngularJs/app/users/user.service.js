"use strict";

user.service("UserService", function ($http) {
  var baseUrl = "http://localhost:3000";
  var user = "/users";

  this.getAll = function () {
    return $http.get(baseUrl + user);
  };

  this.getByID = function (id) {
    return $http.get(`${baseUrl}/${id}`);
  };

  this.addUser = function (data) {
    console.log(data);
    return $http.post(baseUrl + user, data);
  };

  this.update = function (id, data) {
    return $http.put(`${baseUrl}/${id}`, data);
  };

  this.delete = function (id) {
    return $http.delete(`${baseUrl}/${id}`);
  };
});
