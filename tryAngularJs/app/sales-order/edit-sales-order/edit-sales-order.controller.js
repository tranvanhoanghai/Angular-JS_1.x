"use strict";

angular.module("salesOrder").component("editSalesOrder", {
  templateUrl: "sales-order/edit-sales-order/edit-sales-order.template.html",
  controller: [
    "$stateParams",
    "$state",
    "cssInjector",
    "SalesOrderService",
    "UserService",
    "ContactService",
    "Notification",
    function (
      $stateParams,
      $state,
      cssInjector,
      SalesOrderService,
      UserService,
      ContactService,
      Notification
    ) {
      cssInjector.add("sales-order/sales-order.template.css");
      var vm = this;
      var currentId = $stateParams.id;

      vm.detailSalesOrder = detailSalesOrder;
      vm.submit = updateSalesOrder;
      vm.isLoading = true;
      vm.detailSalesOrder();

      function detailSalesOrder() {
        SalesOrderService.detailSalesOrder(currentId)
          .then((res) => {
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

            vm.subject = res.data.subject;
            vm.contactName = res.data.contactName;
            vm.status = res.data.status;
            vm.total = res.data.total;
            vm.assignedTo = res.data.assignedTo;
            vm.creator = res.data.creator;
            vm.description = res.data.description;
          })
          .catch((error) => {
            Notification.error({
              message: "Error",
              replaceMessage: true,
            });
          });
      }

      function updateSalesOrder() {
        var salesOrder = {
          subject: vm.subject,
          contactName: vm.contactName,
          assignedTo: vm.assignedTo,
          status: vm.status,
          total: vm.total,
          creator: vm.creator,
          description: vm.description,
        };

        SalesOrderService.updateSalesOrder(currentId, salesOrder)
          .then((res) => {
            Notification.success({
              message: "Data update Successfully",
            });
            $state.go("main.sales-order");
          })
          .catch((error) => {
            console.log(error);
            Notification.error({
              message: "Data update Error",
            });
          });
      }
    },
  ],
});
