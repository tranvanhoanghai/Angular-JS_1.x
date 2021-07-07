"use strict";

angular.module("view1").service("CrudService", function ($http) {
  // var baseUrl = "http://localhost:3300";

  this.addProduct = function (data) {
    console.log(baseUrl);
    return $http.post(baseUrl, data);
  };

  this.update = function (id, data) {
    return $http.put(`${baseUrl}/${id}`, data);
  };

  this.delete = function (id) {
    return $http.delete(`${baseUrl}/${id}`);
  };

  this.getAll = function () {
    return $http.get(baseUrl);
  };

  this.getByID = function (id) {
    return $http.get(`${baseUrl}/${id}`);
  };
});
