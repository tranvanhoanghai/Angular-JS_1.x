"use strict";

angular
  .module("loading", [])
  .component("loading", {
    templateUrl: "loading/loading.template.html",
    controller: "loading",
  })
  .controller("loading", [
    "$scope",
    "cssInjector",
    function ($scope, cssInjector) {
      $scope.me = "ssss";
      cssInjector.add("loading/loading.template.css");
    },
  ]);
