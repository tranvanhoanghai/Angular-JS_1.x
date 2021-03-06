"use strict";

angular.module("dashboard").component("dashboardContact", {
  templateUrl: "dashboard/dashboard-contact/dashboard-contact.template.html",
  controller: [
    "$state",
    "cssInjector",
    "$location",
    "DashboardService",
    function ($state, cssInjector, $location, DashboardService) {
      cssInjector.add("dashboard/dashboard.template.css");
      var vm = this;
      vm.isLoading = true;
      vm.redirect = redirect;
      vm.chartData = [];
      vm.pieChartContact = pieChartContact;
      vm.pieChartContact();

      function pieChartContact() {
        vm.labels = [
          "Existing Customer",
          "Partner",
          "Conference",
          "Website",
          "Word of mouth",
          "Other",
        ];
        vm.colours = ["#17a2b8", "#FF6384", "#CC65FE", "#FFCE56"];

        DashboardService.listDashBoard()
          .then((response) => {
            response.data[0].forEach((element) => {
              switch (element._id) {
                case "Existing Customer":
                  vm.countExistingCustomer = element.count;
                  break;
                case "Partner":
                  vm.countPartner = element.count;
                  break;
                case "Conference":
                  vm.countConference = element.count;
                  break;
                case "Website":
                  vm.countWebsite = element.count;
                  break;
                case "Word of mouth":
                  vm.countWordOfMouth = element.count;
                  break;
                case "Other":
                  vm.countOther = element.count;
                  break;
                default:
                  break;
              }
              vm.chartData = [
                vm.countExistingCustomer,
                vm.countPartner,
                vm.countConference,
                vm.countWebsite,
                vm.countWordOfMouth,
                vm.countOther,
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
            $state.go("main.filterContactLeadSource", {
              leadSource: dataFilter,
            });
          }
        };
        vm.options = {
          legend: {
            display: true,
            position: "right",
            labels: {
              boxWidth: 15,
              padding: 20,
              pieceLabel: {
                render: "value",
              },
            },
          },
        };
      }

      function redirect(filter) {
        $location.url("contact?leadSource=" + filter);
      }
    },
  ],
});
