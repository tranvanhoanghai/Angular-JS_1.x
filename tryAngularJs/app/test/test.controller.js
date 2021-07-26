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
          vm.headers = [
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
          ];
          vm.key = [];
          vm.headers.forEach((data) => {
            vm.key.push(this.camelize(data));
          });

          // console.log(response.data);

          vm.data = {
            headList: vm.headers,
            rowList: response.data,
            key: vm.key,
            isEdit: true,
            isDelete: true,
          };
        })
        .catch();

      this.camelize = function (str) {
        return str
          .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
          })
          .replace(/\s+/g, "");
      };

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
