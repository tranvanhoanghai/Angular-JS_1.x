"use strict";

angular.module("view1").service("CrudService", function ($http) {
  var urlGet = "";
  var baseUrl = "https://5fa04305e21bab0016dfd001.mockapi.io/api/v1/listphone";

  this.post = function (Model) {
    var request = $http({
      method: "post",
      url: baseUrl,
      data: Model,
    });
    return request;
  };

  this.put = function (apiRoute, Model) {
    var request = $http({
      method: "put",
      url: apiRoute,
      data: Model,
    });
    return request;
  };

  this.delete = function (id) {
    var request = $http({
      method: "delete",
      url: baseUrl + "/" + id,
    });
    return request;
  };

  this.getAll = function () {
    return $http.get(baseUrl);
  };

  this.getByID = function (id) {
    return $http.get(baseUrl + "/" + id);
  };
});
