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
