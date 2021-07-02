"use strict";

angular.module("view1").service("CrudService", function ($http) {
  var baseUrl = "https://5fa04305e21bab0016dfd001.mockapi.io/api/v1/listphone";

  this.add = function (data) {
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
