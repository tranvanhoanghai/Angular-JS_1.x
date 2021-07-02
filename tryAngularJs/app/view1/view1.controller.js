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

      $scope.GetProduct = function () {
        CrudService.getAll()
          .then((response) => ($scope.products = response.data))
          .catch((error) => console.log("Error", error));
      };

      $scope.btnText = true;
      $scope.id = "";
      $scope.GetProduct();

      $scope.add = function () {
        var product = {
          name: $scope.name,
          price: $scope.price,
          image: $scope.image,
        };

        if ($scope.btnText) {
          if ($scope.price && $scope.name && $scope.image) {
            CrudService.add(product)
              .then((res) => {
                alert("Data Save Successfully");
                $scope.GetProduct();
                $scope.Clear();
              })
              .catch((error) => console.log("Error: " + error));
          }
        } else {
          if ($scope.price && $scope.name && $scope.image) {
            CrudService.update($scope.id, product)
              .then((res) => {
                alert("Data update Successfully");
                $scope.GetProduct();
                $scope.Clear();
                $scope.btnText = true;
                $scope.id = "";
              })
              .catch((error) => console.log("Error: " + error));
          }
        }
      };

      $scope.edit = function (id) {
        $scope.id = id;
        CrudService.getByID(id)
          .then((res) => {
            $scope.name = res.data.name;
            $scope.price = res.data.price;
            $scope.image = res.data.image;
            $scope.btnText = false;
          })
          .catch((error) => console.log("Error: " + { error }));
      };

      $scope.delete = function (id) {
        CrudService.delete(id)
          .then((res) => {
            alert("Data Delete Successfully");
            $scope.GetProduct();
            $scope.Clear();
          })
          .catch((error) => console.log("Error: " + { error }));
      };

      $scope.Clear = function () {
        $scope.name = "";
        $scope.price = "";
        $scope.image = "";
      };
    },
  ]);
