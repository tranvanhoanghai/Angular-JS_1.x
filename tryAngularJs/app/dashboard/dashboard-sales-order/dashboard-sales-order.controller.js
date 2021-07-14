"use strict";

angular.module("dashboard").component("dashboardSalesOrder", {
  templateUrl:
    "dashboard/dashboard-sales-order/dashboard-sales-order.template.html",
  controller: [
    "cssInjector",
    "$location",
    "DashboardService",
    "Notification",
    function (cssInjector, $location, DashboardService, Notification) {
      cssInjector.add("dashboard/dashboard.template.css");
      var vm = this;
      vm.loading = true;

      vm.getCountSalesOrder = getCountSalesOrder;
      vm.redirect = redirect;

      function redirect(filter) {
        $location.url("sales-order?filter=" + filter);
      }

      function getCountSalesOrder() {
        DashboardService.listDashBoard()
          .then((response) => {
            response.data[1].forEach((element) => {
              switch (element._id) {
                case "Created":
                  vm.countCreated = element.count;
                  break;
                case "Approved":
                  vm.countApproved = element.count;
                  break;
                case "Delivered":
                  vm.countDelivered = element.count;
                  break;
                case "Cancelled":
                  vm.countCancelled = element.count;
                  break;
                default:
                  break;
              }
            });
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

      vm.getCountSalesOrder();
    },
  ],
});
