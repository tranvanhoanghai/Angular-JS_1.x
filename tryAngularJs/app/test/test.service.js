"use strict";

var app = angular.module("test");

app.service("TestService", function () {
  var test = "TestService";
  this.sayHello = function () {
    return test;
  };
});

app.provider("TestProvider", function () {
  this.name = "Default";

  this.$get = function () {
    var name = this.name;
    return {
      sayHello: function () {
        return "Hello, " + name + "!";
      },
      sayBye: function () {
        return "Bye, " + name + "!";
      },
    };
  };

  this.setName = function (newName) {
    this.name = newName;
  };
});

app.factory("TestFactory", function () {
  return {
    sayHello: function () {
      return "Hello, World!";
    },
  };
});
