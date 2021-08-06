(function () {
  "use strict";

  angular.module("contact").service("ContactService", serviceFunction);
  serviceFunction.$inject = ["$http", "SharedConstant"];

  function serviceFunction($http, SharedConstant) {
    var contact = "/contact";
    var baseUrl = SharedConstant.baseUrl.url + contact;

    return {
      listContact: function () {
        return $http.get(baseUrl);
      },

      listContactAssign: function (name) {
        return $http.get(`${baseUrl}/assign/${name}`);
      },

      detailContact: function (id) {
        return $http.get(`${baseUrl}/${id}`);
      },

      createContact: function (data) {
        return $http.post(baseUrl, data);
      },

      updateContact: function (id, data) {
        return $http.put(`${baseUrl}/${id}`, data);
      },

      deleteContact: function (id) {
        return $http.delete(`${baseUrl}/${id}`);
      },

      deleteMultipleContact: function (listId) {
        return $http.post(baseUrl + "/delete", listId);
      },
    };
  }
})();
