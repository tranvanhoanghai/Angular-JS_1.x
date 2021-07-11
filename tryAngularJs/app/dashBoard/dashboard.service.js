"use strict";

angular
  .module("dashboard")
  .service("DashboardService", function ($http, BaseUrlService) {
    var dashboard = "/dashboard";
    var baseUrl = BaseUrlService.getBaseUrl() + dashboard;

    this.listDashBoard = function () {
      return $http.get(baseUrl);
    };

    this.detailSalesOrder = function (id) {
      return $http.get(`${baseUrl}/${id}`);
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
  });
