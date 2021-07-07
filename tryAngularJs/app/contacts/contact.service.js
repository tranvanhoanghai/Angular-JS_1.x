"use strict";

angular
  .module("contact")
  .service("ContactService", function ($http, BaseUrlService) {
    var contact = "/contact";
    var baseUrl = BaseUrlService.getBaseUrl() + contact;

    this.listContact = function () {
      return $http.get(baseUrl);
    };

    this.detailContact = function (id) {
      return $http.get(`${baseUrl}/${id}`);
    };

    this.createContact = function (data) {
      console.log(data);
      return $http.post(baseUrl, data);
    };

    this.updateContact = function (id, data) {
      return $http.put(`${baseUrl}/${id}`, data);
    };

    this.deleteContact = function (id) {
      return $http.delete(`${baseUrl}/${id}`);
    };
  });
