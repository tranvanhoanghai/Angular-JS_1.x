"use strict";

angular.module("salesOrder").component("listSalesOrder", {
  templateUrl: "sales-order/list-sales-order/list-sales-order.template.html",
  controller: [
    "NgTableParams",
    "cssInjector",
    "$rootScope",
    "$stateParams",
    "$state",
    "SalesOrderService",
    "UserService",
    "DialogService",
    "Notification",
    function (
      NgTableParams,
      cssInjector,
      $rootScope,
      $stateParams,
      $state,
      SalesOrderService,
      UserService,
      DialogService,
      Notification
    ) {
      cssInjector.add("sales-order/sales-order.template.css");
      var vm = this;

      vm.isLoading = true;
      vm.paramFilterStatus = $stateParams.status;
      vm.listId = { id: [] };
      vm.title = "Do you want to delete it?";

      vm.getListSalesOrder = getListSalesOrder;
      vm.create = createSalesOrder;
      vm.edit = editSalesOrder;
      vm.ngTable = ngTable;
      vm.getListAssignedTos = getListAssignedTos;
      vm.checkBox = checkBox;
      vm.delete = showDialog;
      vm.deleteMultiple = showDialog;

      vm.getListSalesOrder();

      function getListSalesOrder() {
        $rootScope.isAdmin
          ? SalesOrderService.listSalesOrder()
              .then((response) => {
                vm.getListAssignedTos();
                vm.salesOrders = response.data;
                vm.ngTable(vm.salesOrders);
                vm.isLoading = false;
              })
              .catch((error) => {
                console.log("Error", error);
                setTimeout(function () {
                  vm.getListSalesOrder();
                }, 5000);
              })
          : SalesOrderService.listSalesOrderAssign($rootScope.name)
              .then((response) => {
                vm.getListAssignedTos();
                vm.salesOrders = response.data;
                vm.ngTable(vm.salesOrders);
                vm.isLoading = false;
              })
              .catch((error) => {
                vm.isLoading = true;

                console.log("Error", error);
                setTimeout(function () {
                  vm.getListSalesOrder();
                }, 5000);
              });
      }

      function getListAssignedTos() {
        UserService.listUsers()
          .then((response) => {
            vm.nullData = { name: "" };
            vm.assignedTos = response.data;
            vm.assignedTos.unshift(vm.nullData);

            vm.ngTableAssignedTos = [];
            vm.assignedTos.forEach((element) => {
              vm.ngTableAssignedTos.push({
                id: element.name,
                title: element.name,
              });
            });
          })
          .catch((error) => {
            console.log("Error", error);
          });
      }

      function ngTable(data) {
        vm.tableParams = new NgTableParams(
          { page: 1, count: 5 },
          {
            // page size buttons (right set of buttons in demo)
            counts: [],
            // determines the pager buttons (left set of buttons in demo)
            paginationMaxBlocks: 13,
            paginationMinBlocks: 2,
            dataset: data,
          }
        );

        vm.tableParams.filter()["status"] = vm.paramFilterStatus;
      }

      function createSalesOrder() {
        $state.go("main.sales-orderCreate");
      }

      function editSalesOrder(id) {
        $state.go("main.sales-orderEdit", { id: id });
      }

      function checkBox(value) {
        vm.listId.id = Object.keys(value).filter((key) => value[key]);
      }

      function showDialog(id) {
        id
          ? DialogService.showDialog(deleteSalesOrder, vm.title, id)
          : DialogService.showDialog(deleteMultiple, vm.title);
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

      function deleteMultiple() {
        SalesOrderService.deleteMultipleSalesOrders(vm.listId)
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
