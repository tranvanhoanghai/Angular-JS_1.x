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
  this.thingFromConfig = "";

  this.$get = function () {
    var name = this.name;
    var thingFromConfig = this.thingFromConfig;
    return {
      sayHello: function () {
        return "Hello, " + name + "!";
      },
      sayBye: function () {
        return "Bye, " + name + "!";
      },
      thingOnConfig: thingFromConfig,
    };
  };

  this.setName = function (newName) {
    this.name = newName;
  };
});

app.factory("TestFactory", () => {
  // var service = {};

  // var _artist = "Shakira by Fatory";
  // var hello = "Hello Factory";

  // service.sayHello = () => {
  //   return hello;
  // };

  // service.getArtist = () => {
  //   return _artist;
  // };

  // return service;

  var factory = {
    sayHello,
    sayBye,
  };

  var hello = "Hello Factory";
  var bye = "Hello Factory";

  function sayHello() {
    return hello;
  }

  function sayBye() {
    return bye;
  }

  return factory;
});
