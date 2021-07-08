"use strict";

angular.module("salesOrder").component("salesOrder", {
  templateUrl: "sales-order/sales-order.template.html",
  controller: [
    "$scope",
    "cssInjector",
    "SalesOrderService",
    "Notification",
    function ($scope, cssInjector, SalesOrderService, Notification) {
      cssInjector.add("sales-order/sales-order.template.css");
    },
  ],
});
