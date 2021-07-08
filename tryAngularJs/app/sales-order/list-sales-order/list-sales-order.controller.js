"use strict";

angular.module("salesOrder").component("listSalesOrder", {
  templateUrl: "sales-order/list-sales-order/list-sales-order.template.html",
  controller: [
    "$scope",
    "cssInjector",
    "$window",
    // "ngTableParams",
    "SalesOrderService",
    "Notification",
    function (
      $scope,
      cssInjector,
      $window,
      SalesOrderService,
      ngTableParams,
      Notification
    ) {
      cssInjector.add("sales-order/sales-order.template.css");
      var vm = this;
      vm.loading = true;

      vm.getListSalesOrder = getListSalesOrder;
      vm.create = createSalesOrder;
      vm.edit = editSalesOrder;
      vm.delete = deleteSalesOrder;

      function getListSalesOrder() {
        SalesOrderService.listSalesOrder()
          .then((response) => {
            vm.salesOrders = response.data;

            vm.usersTable = new ngTableParams(
              {
                page: 1,

                count: 5,
              },
              {
                total: vm.salesOrders.length,

                getData: function ($defer, params) {
                  vm.data = vm.salesOrders.slice(
                    (params.page() - 1) * params.count(),
                    params.page() * params.count()
                  );

                  $defer.resolve(vm.data);
                },
              }
            );
            console.log(usersTable);
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
