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
    function (
      $scope,
      cssInjector,
      TestService,
      TestProvider,
      TestFactory,
      ContactService
    ) {
      cssInjector.add("test/test.template.css");
      var vm = this;

      // $scope.movie = "Ice Age";

      // console.log(TestService.sayHello());
      // console.log(TestProvider.sayHello());
      // console.log(TestProvider.sayBye());
      // console.log(TestProvider.thingOnConfig);

      // console.log(TestFactory.sayHello());

      $scope.movie = "Ice Age";
      $scope.rating = 5;
      $scope.isLoading = true;

      ContactService.listContact()
        .then((response) => {
          // vm.data = { response };
          // console.log(response.data[0]);
          vm.key = [];
          Object.keys(response.data[0]).forEach(function (key) {
            vm.key.push(key);
          });
          // console.log(vm.key);
          // key null if data empty by node js response

          vm.data = {
            headList: [
              { name: "Name" },
              { name: "Salutation" },
              { name: "Phone" },
              { name: "Email" },
              { name: "Organization" },
              { name: "Date of birth" },
              { name: "Address" },
              { name: "Lead source" },
              { name: "Assigned to" },
              { name: "Creator" },

              { name: "Action" },
            ],
            rowList: response.data,
            key: vm.key,
          };
        })
        .catch();

      // vm.data = {
      //   headList: [
      //     { name: "Company" },
      //     { name: "Address" },
      //     { name: "City" },
      //     { name: "Action" },
      //   ],
      //   rowList: [
      //     {
      //       name: "Huy",
      //       surname: "Hải",
      //       propertyName: "Ân",
      //       isEdit: true,
      //       isDelete: false,
      //     },
      //   ],
      // };

      vm.display = function (movie) {
        alert("Movie : " + movie);
      };
      vm.add = function () {
        console.log(vm.movie, vm.rating);
      };
    },
  ],
});

angular.module("test").controller("movieController", function ($scope) {
  $scope.movie = "Ice Age";
  $scope.rating = 5;
  // $scope.display = function (movie) {
  //   alert("Movie : " + movie);
  // };
});
