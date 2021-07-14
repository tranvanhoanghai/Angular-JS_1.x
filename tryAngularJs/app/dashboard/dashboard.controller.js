"use strict";

angular.module("dashboard").component("dashboard", {
  templateUrl: "dashboard/dashboard.template.html",
  controller: [
    "cssInjector",
    "Notification",
    function (cssInjector, Notification) {
      cssInjector.add("dashboard/dashboard.template.css");
    },
  ],
});
