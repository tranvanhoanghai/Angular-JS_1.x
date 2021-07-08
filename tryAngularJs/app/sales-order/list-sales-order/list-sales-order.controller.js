"use strict";

angular.module("salesOrder").component("listSalesOrder", {
  templateUrl: "sales-order/list-sales-order/list-sales-order.template.html",
  controller: [
    "$scope",
    "NgTableParams",
    "UserService",
    "cssInjector",
    "$window",
    "SalesOrderService",
    "Notification",
    function (
      $scope,
      NgTableParams,
      UserService,
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

      function getListSalesOrder() {
        SalesOrderService.listSalesOrder()
          .then((response) => {
            vm.salesOrders = response.data;
            vm.tableParams = new NgTableParams(
              { count: 2 },
              {
                // page size buttons (right set of buttons in demo)
                counts: [],
                // determines the pager buttons (left set of buttons in demo)
                paginationMaxBlocks: 13,
                paginationMinBlocks: 2,
                dataset: vm.salesOrders,
              }
            );
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
