"use strict";
var app = angular.module("test");

app.filter("passwordFilter", function () {
  return function (string) {
    return string.replace(/[a-z]/g, "*");
  };
});

app.filter("base64Filter", function () {
  return function (string) {
    return btoa(string);
  };
});

app.filter("base64DecodeFilter", function () {
  return function (string) {
    return atob(string);
  };
});
