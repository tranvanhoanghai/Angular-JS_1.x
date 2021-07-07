"use strict";

angular.module("view1").component("view1", {
  templateUrl: "view1/view1.template.html",
  controller: [
    "$scope",
    "cssInjector",
    "CrudService",
    "Notification",
    function ($scope, cssInjector, CrudService, Notification) {
      cssInjector.add("view1/view1.template.css");
      var vm = this;
      vm.loading = true;
      vm.btnText = true;
      vm.id = "";

      vm.submit = submit;
      vm.getProduct = getProduct;
      vm.edit = edit;
      vm.delete = deleteProduct;
      vm.clear = clear;

      function getProduct() {
        CrudService.getAll()
          .then((response) => {
            vm.products = response.data;
            vm.loading = false;
          })
          .catch((error) => {
            console.log("Error", error);
            setTimeout(function () {
              vm.getProduct();
            }, 5000);
          });
      }

      vm.getProduct();

      function submit() {
        var product = {
          name: vm.name,
          price: vm.price,
          image: vm.image,
        };

        if (vm.btnText) {
          if (vm.price && vm.name && vm.image) {
            CrudService.addProduct(product)
              .then((res) => {
                Notification.success({
                  message: "Add data Successfully",
                });

                vm.getProduct();
                vm.clear();
              })
              .catch((error) => {
                Notification.error({
                  message: "Add data Error",
                  replaceMessage: true,
                });
              });
          }
        } else {
          if (vm.price && vm.name && vm.image) {
            CrudService.update(vm.id, product)
              .then((res) => {
                Notification.success({
                  message: "Data update Successfully",
                });
                vm.getProduct();
                vm.clear();
                vm.btnText = true;
                vm.id = "";
              })
              .catch((error) => {
                console.log(error);
                Notification.error({
                  message: "Data update Error",
                });
              });
          }
        }
      }

      function edit(id) {
        vm.id = id;
        CrudService.getByID(id)
          .then((res) => {
            vm.name = res.data.name;
            vm.price = res.data.price;
            vm.image = res.data.image;
            vm.btnText = false;
          })
          .catch((error) => {
            Notification.error({
              message: "Error",
            });
          });
      }

      function deleteProduct(id) {
        CrudService.delete(id)
          .then((res) => {
            Notification.success({
              message: "Data Delete Successfully",
            });
            vm.getProduct();
            vm.clear();
          })
          .catch((error) =>
            Notification.success({
              message: "Data Delete Error",
            })
          );
      }

      function clear() {
        vm.name = "";
        vm.price = "";
        vm.image = "";
      }
    },
  ],
});
