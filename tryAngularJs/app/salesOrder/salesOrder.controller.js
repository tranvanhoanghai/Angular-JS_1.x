"use strict";

angular.module("salesOrder").component("salesOrder", {
  templateUrl: "salesOrder/salesOrder.template.html",
  controller: [
    "$scope",
    "cssInjector",
    "CrudService",
    "Notification",
    function ($scope, cssInjector, CrudService, Notification) {
      cssInjector.add("salesOrder/salesOrder.template.css");
    },
  ],
});
