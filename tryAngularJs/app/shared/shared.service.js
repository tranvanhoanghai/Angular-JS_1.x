"use strict";

angular.module("share").service("SharedService", function ($localStorage) {
  var baseUrl = "http://localhost:3000";
  var data = $localStorage.data;
  var token = $localStorage.token;

  this.getBaseUrl = function () {
    return baseUrl;
  };

  this.getData = function () {
    return data;
  };
  this.getToken = function () {
    return token;
  };
});
