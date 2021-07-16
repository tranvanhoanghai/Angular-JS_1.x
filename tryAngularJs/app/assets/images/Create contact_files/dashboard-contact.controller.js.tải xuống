"use strict";

angular.module("dashboard").component("dashboardContact", {
  templateUrl: "dashboard/dashboard-contact/dashboard-contact.template.html",
  controller: [
    "cssInjector",
    "$location",
    "DashboardService",
    function (cssInjector, $location, DashboardService) {
      cssInjector.add("dashboard/dashboard.template.css");
      var vm = this;
      vm.loading = true;
      vm.getCountContact = getCountContact;
      vm.redirect = redirect;

      function redirect(filter) {
        $location.url("contact?leadSource=" + filter);
      }

      function getCountContact() {
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

      vm.getCountContact();
    },
  ],
});
