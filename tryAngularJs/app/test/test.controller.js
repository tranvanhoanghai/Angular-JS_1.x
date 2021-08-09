"use strict";

angular.module("test").component("test", {
  templateUrl: "test/test.template.html",
  controller: [
    "$scope",
    "cssInjector",
    "TestService",
    "TestProvider",
    "TestFactory",
    "ContactService",
    "example",
    "example1",
    "$q",
    function (
      $scope,
      cssInjector,
      TestService,
      TestProvider,
      TestFactory,
      ContactService,
      example,
      example1,
      $q
    ) {
      cssInjector.add("test/test.template.css");
      var vm = this;
      vm.getData = getData;
      vm.camelCase = camelCase;
      vm.setHeading = setHeading;
      vm.edit = edit;
      vm.getData();
      vm.password = "abcdefgh";
      vm.show = show;
      vm.change = change;
      // vm.change = change;
      // vm.text = "a";

      example.test(true);
      console.log(example1.api.getName());

      var a = false;
      var defer = $q.defer();
      defer.notify("aaaaaaaaaaa");
      if (a) {
        defer.resolve("Success!");
      } else {
        defer.reject("Oops... something went wrong");
      }

      // The $q.reject() method creates a promise that is immediately rejected
      // with the given reason.
      $q.reject("meha").catch(function handleReject(reason) {
        console.log("Rejected with reason:", reason);
      });

      $q.when("woot!").then(function handleResolve(value) {
        console.log("Resolved with value:", value);
      });

      // var promise = $q((resolve, reject) => {
      // if (a) {
      //   resolve("Success!");
      // } else {
      //   reject("Oops... something went wrong");
      // }
      // });

      // $q.when(123).then((res) => {
      //   // 123
      //   console.log(res);
      // });

      // $q.resolve(123).then((res) => {
      //   // 123
      //   console.log(res);
      // });

      // defer.promise.then(
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
      // vm.name = "controller";
      // example1
      //   .getName()
      //   .then(function (name) {
      //     console.log(name);
      //   })
      //   .catch(function (err) {
      //     console.log(err);
      //   });

      function show() {
        console.log(vm.text);
      }
      function change() {
        console.log(vm.text);
      }

      // console.log(TestService.sayHello());
      // console.log(TestProvider.sayHello());
      // console.log(TestProvider.sayBye());
      // console.log(TestProvider.thingOnConfig);

      // console.log(TestFactory.sayHello());

      vm.moviee = "Ice Age";
      vm.rating = 5;
      vm.timeMovie = "60p";
      $scope.isLoading = true;

      function getData() {
        ContactService.listContact()
          .then((response) => {
            vm.key = ["id"];
            vm.setHeading().forEach((data) => {
              vm.key.push(vm.camelCase(data));
            });

            vm.data = {
              headList: vm.headers,
              rowList: response.data,
              key: vm.key,
              isEdit: true,
              isDelete: true,
            };
          })
          .catch();
      }

      function setHeading() {
        return (vm.headers = [
          "Name",
          "Salutation",
          "Phone",
          "Email",
          "Organization",
          "Date of birth",
          "Address",
          "Lead source",
          "Assigned to",
          "Creator",
          "Action",
        ]);
      }

      function camelCase(str) {
        return str
          .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
          })
          .replace(/\s+/g, "");
      }

      function edit(id, data) {
        console.log(id, data);
      }

      vm.display = function (movie) {
        alert("Movie : " + movie);
      };
      vm.showMovie = function () {
        console.log(vm.moviee, vm.rating);
      };
    },
  ],
});

// angular.module("test").controller("movieController", function ($scope) {
//   $scope.movie = "Ice Age";
//   $scope.rating = 5;
//   // $scope.display = function (movie) {
//   //   alert("Movie : " + movie);
//   // };
// });
