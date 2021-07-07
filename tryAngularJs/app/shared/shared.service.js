"use strict";

angular.module("share").service("BaseUrlService", function () {
  var baseUrl = "";
  this.getBaseUrl = function () {
    return (baseUrl = "http://localhost:3000");
  };
});
