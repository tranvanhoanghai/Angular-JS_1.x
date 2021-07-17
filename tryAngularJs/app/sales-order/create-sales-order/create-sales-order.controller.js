"use strict";

angular.module("contact").component("createSalesOrder", {
  templateUrl:
    "sales-order/create-sales-order/create-sales-order.template.html",
  controller: [
    "$state",
    "cssInjector",
    "SalesOrderService",
    "UserService",
    "ContactService",
    "SharedService",
    "Notification",
    function (
      $state,
      cssInjector,
      SalesOrderService,
      UserService,
      ContactService,
      SharedService,
      Notification
    ) {
      cssInjector.add("sales-order/sales-order.template.css");
      var vm = this;
      vm.loading = true;

      vm.create = createSalesOrder;
      vm.creator = SharedService.getData().name;

      UserService.listUsersActive()
        .then((response) => {
          vm.assignedTos = response.data;
        })
        .catch((error) => {
          console.log("Don't get user data", error);
          Notification.error({
            message: "Don't get user data",
            replaceMessage: true,
          });
        });

      ContactService.listContact()
        .then((response) => {
          vm.contactNames = response.data;
        })
        .catch((error) => {
          console.log("Don't get contact data", error);
          Notification.error({
            message: "Don't get contact data",
            replaceMessage: true,
          });
        });

      function createSalesOrder() {
        var salesOrder = {
          subject: vm.subject,
          contactName: vm.contactName,
          assignedTo: vm.assignedTo,
          status: vm.status,
          total: vm.total,
          creator: vm.creator,
          description: vm.description,
        };

        SalesOrderService.createSalesOrder(salesOrder)
          .then((response) => {
            Notification.success({
              message: "Add data Successfully",
              replaceMessage: true,
            });
            // $location.url("/sales-order/");
            $state.go("sales-order");
          })
          .catch((error) => {
            console.log("Error", error);
            Notification.error({
              message: error,
              replaceMessage: true,
            });
          });
      }
    },
  ],
});
