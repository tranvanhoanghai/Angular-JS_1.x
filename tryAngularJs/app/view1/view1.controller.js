"use strict";

angular
  .module("view1")
  .component("view1", {
    templateUrl: "view1/view1.template.html",
    controller: "View1Ctrl",
  })
  .controller("View1Ctrl", [
    "$scope",
    "cssInjector",
    "CrudService",
    function ($scope, cssInjector, CrudService) {
      cssInjector.add("view1/view1.template.css");

      CrudService.getAll().then(
        function (response) {
          $scope.products = response.data;
        },
        function (error) {
          console.log("Error: " + error);
        }
      );

      $scope.add = function () {
        var product = {
          name: $scope.name,
          price: $scope.price,
          image: $scope.image,
        };
        CrudService.post(product)
          .then((res) => CrudService.getAll())
          .catch((error) => console.log("Error: " + error));

        console.log(product);
      };

      $scope.delete = function (id) {
        CrudService.delete(id)
          .then((res) => CrudService.getAll())
          .catch((error) => console.log("Error: " + error));
      };
    },
  ]);
