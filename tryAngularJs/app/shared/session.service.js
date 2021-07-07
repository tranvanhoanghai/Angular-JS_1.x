"use strict";

angular.module("share").service("Session", function ($cookies) {
  this.put = function (key, value) {
    $cookies.put(key, value);
  };

  this.get = function (key) {
    return $cookies.get(key);
  };

  this.getToken = function (key) {
    return $cookies.get("tokenId");
  };

  this.delete = function (key) {
    $cookies.remove(key);
  };

  return this;
});
