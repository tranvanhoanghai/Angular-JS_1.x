"use strict";

angular.module("test").component("test", {
  templateUrl: "test/test.template.html",
  controller: [
    "$scope",
    "cssInjector",
    "$window",
    "ContactService",
    "SharedService",
    "Notification",
    function ($scope, cssInjector, $window, ContactService, Notification) {
      cssInjector.add("test/test.template.css");
      var vm = this;
      vm.loading = true;
      // $scope.movie = "Ice Age";
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
