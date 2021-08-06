"use strict";

var app = angular.module("test");

app.service("TestService", function ($timeout) {
  var test = "TestService";

  this.sayHello = function () {
    // return $timeout(function () {
    //   return { test };
    // }, 1000);

    return test;
  };
});

app.factory("TestFactory", () => {
  var factory = {
    sayHello,
    sayBye,
  };

  var hello = "Hello Factory";
  var bye = "Bye Factory";

  function sayHello() {
    return hello;
  }

  function sayBye() {
    return bye;
  }

  return factory;
});

app.provider("TestProvider", function () {
  this.name = "Default";
  this.thingFromConfig = "";

  this.$get = function () {
    var names = this.name;
    var thingFromConfig = this.thingFromConfig;
    return {
      sayHello: function () {
        return "Hello, " + names + "!";
      },

      sayBye: function () {
        return "Bye, " + names + "!";
      },

      thingOnConfig: thingFromConfig,
    };
  };

  this.setName = function (newName) {
    this.name = newName;
  };
});

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

app.factory("example", [
  "$http",
  "$q",
  "$timeout",
  function ($http, $q, $timeout) {
    var factory = {
      test,
    };

    var getName1 = $q.defer();
    var getName2 = $q.defer();
    var a = {};
    return factory;

    function test(is) {
      if (is) {
        $timeout(function () {
          getName1.notify("aaaaaaaaaa");
          // api trả về nhiều lần mutipart
        }, 500);

        $timeout(function () {
          getName1.resolve("Name 1 là A");
        }, 2000);

        $timeout(function () {
          getName2.resolve("Name 2 là B");
        }, 1000);
      } else {
        $timeout(function () {
          getName1.reject("Không thể get Name 1");
        }, 2000);

        $timeout(function () {
          getName2.reject("Không thể get Name 2");
        }, 1000);
      }

      // $q.all([getName1.promise, getName2.promise]).then((response) => {
      //   console.log(response);
      // });

      // $q.resolve(getName1.promise).then(function (response) {
      //   console.log(response);
      // });

      // // console.log("test", $q.reject(getName1.promise));

      $q.when(getName2.promise).then(function (response) {
        console.log(response);
      });

      // getName1.promise.then(
      //   function (response) {
      //     console.log(response);
      //   },
      //   function (reason) {
      //     console.log("Failed: " + reason);
      //   },
      //   function (update) {
      //     console.log("Got notification: " + update);
      //   }
      // );

      // getName2.promise
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (response) {
      //     console.log(response);
      //   });
    }
  },
]);

app.factory("example1", [
  "$http",
  "$q",
  "$timeout",
  function ($http, $q, $timeout) {
    var factory = {
      getName,
    };
    var name;

    function getName() {
      var deferred = $q.defer();
      //    If we already have the name, we can resolve the promise.
      if (name !== null) {
        deferred.resolve(name + " (from Cache!)");
      } else {
        //    Get the name from the server.
        deferred.resolve(name + " (from Server!)");
      }

      //    Now return the promise.
      return deferred.promise;
    }

    return factory;
  },
]);
