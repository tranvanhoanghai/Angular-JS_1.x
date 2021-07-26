"use strict";

angular.module("share").directive("tableDirective", function () {
  return {
    restrict: "E",
    scope: {
      data: "=",
    },
    templateUrl: "shared/table/table.directive.html",

    link: function (scope, element, attrs) {},
  };
});
