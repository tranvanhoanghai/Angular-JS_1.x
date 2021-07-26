"use strict";

angular.module("share").directive("loading", function () {
  return {
    restrict: "A",
    scope: {
      loading: "=",
    },
    templateUrl: "shared/loading/loading.template.html",
  };
});
