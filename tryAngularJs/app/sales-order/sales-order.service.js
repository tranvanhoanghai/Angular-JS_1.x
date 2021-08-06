"use strict";

angular
  .module("salesOrder")
  .service("SalesOrderService", function ($http, SharedConstant) {
    var salesOrder = "/sales-order";
    var baseUrl = SharedConstant.baseUrl.url + salesOrder;

    this.listSalesOrder = function () {
      return $http.get(baseUrl);
    };

    this.detailSalesOrder = function (id) {
      return $http.get(`${baseUrl}/${id}`);
    };

    this.listSalesOrderAssign = function (name) {
      return $http.get(`${baseUrl}/assign/${name}`);
    };

    this.createSalesOrder = function (data) {
      return $http.post(baseUrl, data);
    };

    this.updateSalesOrder = function (id, data) {
      return $http.put(`${baseUrl}/${id}`, data);
    };

    this.deleteSalesOrder = function (id) {
      return $http.delete(`${baseUrl}/${id}`);
    };

    this.deleteMultipleSalesOrders = function (listId) {
      return $http.post(baseUrl + "/delete", listId);
    };
  });
