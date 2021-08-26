"use strict";

angular.module("dashboard").component("dashboardSalesOrder", {
  templateUrl:
    "dashboard/dashboard-sales-order/dashboard-sales-order.template.html",
  controller: [
    "cssInjector",
    "$state",
    "$location",
    "DashboardService",
    "Notification",
    function (cssInjector, $state, $location, DashboardService, Notification) {
      cssInjector.add("dashboard/dashboard.template.css");
      var vm = this;
      vm.isLoading = true;
      vm.chartData = [];
      vm.getCountSalesOrder = getCountSalesOrder;
      vm.redirect = redirect;

      function redirect(filter) {
        $location.url("sales-order?filter=" + filter);
      }
      vm.getCountSalesOrder();

      function getCountSalesOrder() {
        vm.labels = ["Created", "Approved", "Delivered", "Cancelled"];
        vm.colours = ["#36A2EB", "#28a745", "#007bff", "#dc3545"];
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
              vm.chartData = [
                vm.countCreated,
                vm.countApproved,
                vm.countDelivered,
                vm.countCancelled,
              ];
            });
            vm.isLoading = false;
          })
          .catch((error) => {
            console.log("Error", error);
            if (error.status !== 403) {
              setTimeout(function () {
                vm.getCountSalesOrder();
              }, 5000);
            }
          });

        vm.onClick = function (points, evt) {
          var dataFilter = points[0]._view.label;
          if (dataFilter) {
            $state.go("main.filterStatus", {
              status: dataFilter,
            });
          }
        };

        vm.options = {
          legend: {
            display: true,
            position: "right",
          },
          tooltipEvents: [],
          showTooltips: true,
          tooltipCaretSize: 0,
          onAnimationComplete: function () {
            this.showTooltip(this.segments, true);
          },
        };
      }
    },
  ],
});
