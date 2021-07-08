"use strict";

angular.module("salesOrder").component("listSalesOrder", {
  templateUrl: "sales-order/list-sales-order/list-sales-order.template.html",
  controller: [
    "$scope",
    "NgTableParams",
    "cssInjector",
    "$window",
    "SalesOrderService",
    "Notification",
    function (
      $scope,
      NgTableParams,
      cssInjector,
      $window,
      SalesOrderService,
      Notification
    ) {
      cssInjector.add("sales-order/sales-order.template.css");
      var vm = this;
      vm.loading = true;

      vm.getListSalesOrder = getListSalesOrder;
      vm.create = createSalesOrder;
      vm.edit = editSalesOrder;
      vm.delete = deleteSalesOrder;

      var data = [{ name: "Moroni", age: 50 } /*,*/];
      vm.tableParams = new NgTableParams({}, { dataset: data });

      function getListSalesOrder() {
        SalesOrderService.listSalesOrder()
          .then((response) => {
            vm.salesOrders = response.data;
            // vm.tableParams = new NgTableParams({}, { dataset: vm.salesOrders });
            console.log(vm.salesOrders);

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

      function createSalesOrder() {
        $window.location.href = "#!/sales-order/create/";
      }

      function editSalesOrder(id) {
        $window.location.href = "#!/sales-order/edit/" + id;
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
