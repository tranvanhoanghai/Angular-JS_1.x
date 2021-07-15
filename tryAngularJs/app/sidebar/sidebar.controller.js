"use strict";

angular.module("sidebar").component("sidebar", {
  templateUrl: "sidebar/sidebar.template.html",
  controller: [
    "cssInjector",
    function (cssInjector) {
      cssInjector.add("sidebar/sidebar.template.css");
    },
  ],
});
