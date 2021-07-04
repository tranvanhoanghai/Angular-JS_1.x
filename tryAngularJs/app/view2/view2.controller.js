"use strict";

angular.module("view2", []).component("view2", {
  templateUrl: "view2/view2.template.html",
  controller: [
    "$scope",
    "cssInjector",
    function ($scope, cssInjector) {
      $scope.me = "ssss";
      cssInjector.add("view2/view2.template.css");
    },
  ],
});
