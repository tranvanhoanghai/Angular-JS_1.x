"use strict";

angular.module("share").directive("tableDirective", function () {
  return {
    restrict: "E",
    scope: {
      data: "=",
      editt: "&",
    },
    templateUrl: "shared/table/table.directive.html",
  };
});
