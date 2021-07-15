"use strict";

angular.module("error").component("forbidden", {
  templateUrl: "error/403/403.template.html",
  controller: [
    "cssInjector",
    function (cssInjector) {
      cssInjector.add("error/error.template.css");
    },
  ],
});
