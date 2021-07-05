"use strict";

dashboard.component("dashboard", {
  templateUrl: "dashboard/dashboard.template.html",
  controller: [
    "$scope",
    "cssInjector",
    "CrudService",
    "Notification",
    function ($scope, cssInjector, CrudService, Notification) {
      cssInjector.add("dashboard/dashboard.template.css");
    },
  ],
});
