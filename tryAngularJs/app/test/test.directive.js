"use strict";

angular.module("test").directive("movieDirective", function () {
  return {
    restrict: "A",

    // scope: {
    //   movie: "=",
    //   rating: "@",
    //   display: "&",
    //   add: "&",
    // },
    scope: true,
    // scope: true,
    templateUrl: "test/test.directive.html",

    controller: function ($scope, $attrs) {
      $scope.abc = "controller";
      this.c = function () {
        console.log(this.abc);
      };
    },

    controllerAs: "vm",
    // bindToController: true,

    link: function (scope, element, attrs, ctrl) {
      scope.abd = "link";
      // scope.display = function (movie) {
      //   alert("Movie : " + movie);
      // };
    },
  };
});
