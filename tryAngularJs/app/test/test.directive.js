"use strict";

angular.module("test").directive("movieDirective", function () {
  return {
    restrict: "A",
    scope: { movie: "=", rating: "=", display: "&", add: "&" },
    templateUrl: "test/test.directive.html",

    link: function (scope, element, attrs) {
      scope.abc = "cvcvcvcv";
      // scope.display = function (movie) {
      //   alert("Movie : " + movie);
      // };
    },
  };
});
