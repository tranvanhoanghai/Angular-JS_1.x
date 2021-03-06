"use strict";

angular.module("dashboard").component("dashboardNewContact", {
  templateUrl:
    "dashboard/dashboard-new-contact/dashboard-new-contact.template.html",
  controller: [
    "NgTableParams",
    "cssInjector",
    "$location",
    "DashboardService",
    function (NgTableParams, cssInjector, $location, DashboardService) {
      cssInjector.add("dashboard/dashboard.template.css");
      var vm = this;
      vm.isLoading = true;

      vm.getNewContact = getNewContact;
      vm.redirect = redirect;

      function redirect(filter) {
        $location.url("contact?assignedTo=" + filter);
      }

      function getNewContact() {
        DashboardService.listDashBoard()
          .then((response) => {
            vm.newContacts = response.data[2];
            vm.tableParams = new NgTableParams(
              { count: 10 },
              {
                // page size buttons (right set of buttons in demo)
                counts: [],
                // determines the pager buttons (left set of buttons in demo)
                paginationMaxBlocks: 13,
                paginationMinBlocks: 2,
                dataset: vm.newContacts,
              }
            );
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
      }

      vm.getNewContact();
    },
  ],
});
