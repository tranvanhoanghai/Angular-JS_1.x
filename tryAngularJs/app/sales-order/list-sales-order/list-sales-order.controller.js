"use strict";

angular.module("salesOrder").component("listSalesOrder", {
  templateUrl: "sales-order/list-sales-order/list-sales-order.template.html",
  controller: [
    "NgTableParams",
    "cssInjector",
    "$location",
    "SalesOrderService",
    "Notification",
    function (
      NgTableParams,
      cssInjector,
      $location,
      SalesOrderService,
      Notification
    ) {
      cssInjector.add("sales-order/sales-order.template.css");
      var vm = this;
      var paramFilterStatus = $location.search().filter;
      vm.loading = true;

      vm.getListSalesOrder = getListSalesOrder;
      vm.create = createSalesOrder;
      vm.edit = editSalesOrder;
      vm.delete = deleteSalesOrder;
      vm.ngTable = ngTable;
      vm.open = openModal;
      vm.data = "Do you want to delete it?";

      function openModal(id) {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "shared/dialog.template.html",
          controller: function ($uibModalInstance, data, $scope) {
            $scope.data = data;

            $scope.ok = function () {
              deleteSalesOrder(id);
              $uibModalInstance.close();
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss("cancel");
            };
          },
          // size: size,
          resolve: {
            data: function () {
              return vm.data;
            },
          },
        });

        modalInstance.result.then(function () {
          // alert("now I'll close the modal");
        });
      }

      function getListSalesOrder() {
        SalesOrderService.listSalesOrder()
          .then((response) => {
            vm.salesOrders = response.data;
            vm.ngTable(vm.salesOrders);
            $location.search({});
            vm.loading = false;
          })
          .catch((error) => {
            console.log("Error", error);
            setTimeout(function () {
              vm.getListSalesOrder();
            }, 5000);
          });
      }

      vm.getListSalesOrder();

      function ngTable(data) {
        vm.tableParams = new NgTableParams(
          { page: 1, count: 5 },
          {
            // page size buttons (right set of buttons in demo)
            counts: [],
            // determines the pager buttons (left set of buttons in demo)
            paginationMaxBlocks: 13,
            paginationMinBlocks: 2,
            dataset: data,
          }
        );

        vm.tableParams.filter()["status"] = paramFilterStatus;
      }

      function createSalesOrder() {
        $location.url("/sales-order/create/");
      }

      function editSalesOrder(id) {
        $location.url("/sales-order/edit/" + id);
      }

      function deleteSalesOrder(id) {
        SalesOrderService.deleteSalesOrder(id)
          .then((response) => {
            Notification.success({
              message: "Delete data Successfully",
            });
            vm.getListSalesOrder();
          })
          .catch((error) => {
            console.log("Error", error);
            Notification.error({
              message: error,
            });
          });
      }
    },
  ],
});
