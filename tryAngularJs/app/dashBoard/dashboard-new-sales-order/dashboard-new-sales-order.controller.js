"use strict";

angular.module("dashboard").component("dashboardNewSalesOrder", {
  templateUrl:
    "dashboard/dashboard-new-sales-order/dashboard-new-sales-order.template.html",
  controller: [
    "cssInjector",
    "NgTableParams",
    "$location",
    "DashboardService",
    "SalesOrderService",
    "Notification",
    function (
      cssInjector,
      NgTableParams,
      $location,
      DashboardService,
      SalesOrderService,
      Notification
    ) {
      cssInjector.add("dashboard/dashboard.template.css");
      var vm = this;
      vm.loading = true;
      vm.showDetail = false;

      vm.getNewSalesOrder = getNewSalesOrder;
      vm.redirect = redirect;
      vm.show = showDetail;
      vm.hideDetail = hideDetail;

      function hideDetail() {
        console.log("â");
        vm.showDetail = false;
      }

      function redirect(filter) {
        $location.url("sales-order?filter=" + filter);
      }

      function showDetail(id) {
        SalesOrderService.detailSalesOrder(id)
          .then((res) => {
            vm.subject = res.data.subject;
            vm.contactName = res.data.contactName;
            vm.status = res.data.status;
            vm.total = res.data.total;
            vm.assignedTo = res.data.assignedTo;
            vm.creator = res.data.creator;
            vm.description = res.data.description;
            vm.showDetail = true;
          })
          .catch((error) => {
            Notification.error({
              message: "Error",
              replaceMessage: true,
            });
          });
      }

      function getNewSalesOrder() {
        DashboardService.listDashBoard()
          .then((response) => {
            vm.newSalesOrders = response.data[3];
            vm.tableParams = new NgTableParams(
              { count: 10 },
              {
                // page size buttons (right set of buttons in demo)
                counts: [],
                // determines the pager buttons (left set of buttons in demo)
                paginationMaxBlocks: 13,
                paginationMinBlocks: 2,
                dataset: vm.newSalesOrders,
              }
            );
            vm.loading = false;
          })
          .catch((error) => {
            console.log("Error", error);
            if (error.status !== 403) {
              setTimeout(function () {
                vm.getCountSalesOrder();
              }, 5000);
            }
          });
      }

      vm.getNewSalesOrder();
    },
  ],
});
