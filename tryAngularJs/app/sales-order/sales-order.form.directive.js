"use strict";

angular.module("salesOrder").directive("salesOrderForm", function () {
  return {
    restrict: "E",
    scope: false,
    templateUrl: "sales-order/sales-order.form.directive.html",
  };
});
