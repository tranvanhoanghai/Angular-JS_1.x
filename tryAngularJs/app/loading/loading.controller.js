"use strict";

loading
  .component("loading", {
    templateUrl: "loading/loading.template.html",
    controller: [
      "$scope",
      "cssInjector",
      function ($scope, cssInjector) {
        $scope.me = "ssss";
        cssInjector.add("loading/loading.template.css");
      },
    ],
  })
 
