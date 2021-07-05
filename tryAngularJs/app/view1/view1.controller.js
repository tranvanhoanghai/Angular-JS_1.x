"use strict";

view1.component("view1", {
  templateUrl: "view1/view1.template.html",
  controller: [
    "$scope",
    "cssInjector",
    "CrudService",
    "Notification",
    function ($scope, cssInjector, CrudService, Notification) {
      cssInjector.add("view1/view1.template.css");

      $scope.GetProduct = function () {
        CrudService.getAll()
          .then((response) => {
            ($scope.products = response.data), ($scope.loading = false);
          })
          .catch((error) => console.log("Error", error));
      };

      $scope.loading = true;
      $scope.btnText = true;
      $scope.id = "";
      $scope.GetProduct();

      
      $scope.expression = function () {
        var product = {
          name: $scope.name,
          price: $scope.price,
          image: $scope.image,
        };

        if ($scope.btnText) {
          if ($scope.price && $scope.name && $scope.image) {
            CrudService.addProduct(product)
              .then((res) => {
                Notification.success({
                  message: "Add data Successfully",
                });

                $scope.GetProduct();
                $scope.Clear();
              })
              .catch((error) => {
                Notification.error({
                  message: "Add data Error",
                  replaceMessage: true,
                });
              });
          }
        } else {
          if ($scope.price && $scope.name && $scope.image) {
            CrudService.update($scope.id, product)
              .then((res) => {
                Notification.success({
                  message: "Data update Successfully",
                });
                $scope.GetProduct();
                $scope.Clear();
                $scope.btnText = true;
                $scope.id = "";
              })
              .catch((error) => {
                console.log(error);
                Notification.error({
                  message: "Data update Error",
                });
              });
          }
        }
      };

      $scope.addData = function () {};

      $scope.edit = function (id) {
        $scope.id = id;
        CrudService.getByID(id)
          .then((res) => {
            $scope.name = res.data.name;
            $scope.price = res.data.price;
            $scope.image = res.data.image;
            $scope.btnText = false;
          })
          .catch((error) => {
            Notification.error({
              message: "Error",
            });
          });
      };

      $scope.delete = function (id) {
        CrudService.delete(id)
          .then((res) => {
            Notification.success({
              message: "Data Delete Successfully",
            });
            $scope.GetProduct();
            $scope.Clear();
          })
          .catch((error) =>
            Notification.success({
              message: "Data Delete Error",
            })
          );
      };

      $scope.Clear = function () {
        $scope.name = "";
        $scope.price = "";
        $scope.image = "";
      };
    },
  ],
});
