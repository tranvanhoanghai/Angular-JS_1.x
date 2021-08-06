"use strict";

angular.module("user").component("listUser", {
  templateUrl: "users/list-user/list-user.template.html",
  controller: [
    "NgTableParams",
    "UserService",
    "cssInjector",
    "$state",
    "localStorageFactory",
    "Notification",
    function (
      NgTableParams,
      UserService,
      cssInjector,
      $state,
      localStorageFactory,
      Notification
    ) {
      cssInjector.add("users/user.template.css");
      var vm = this;
      vm.isLoading = true;

      vm.getListUsers = getListUsers;
      vm.create = createUser;
      vm.edit = editUser;
      vm.delete = showDialog;
      vm.ngTable = ngTable;
      vm.title = "Do you want to delete it?";
      vm.getListUsers();

      function getListUsers() {
        var id = localStorageFactory.data.id;
        if (id) {
          UserService.listExceptUsers(id)
            .then((response) => {
              vm.users = response.data;
              vm.ngTable(vm.users);
              vm.isLoading = false;
            })
            .catch((error) => {
              console.log("Error", error);
              setTimeout(function () {
                vm.getListUsers();
              }, 5000);
            });
        }
      }

      function createUser() {
        $state.go("main.createUser");
      }

      function editUser(id) {
        $state.go("main.editUser", { id: id });
      }

      function ngTable(data) {
        vm.tableParams = new NgTableParams(
          { count: 5 },
          {
            // page size buttons (right set of buttons in demo)
            counts: [],
            // determines the pager buttons (left set of buttons in demo)
            paginationMaxBlocks: 13,
            paginationMinBlocks: 2,
            dataset: data,
          }
        );
      }

      function showDialog(id) {
        DialogService.showDialog(deleteUser, vm.title, id);
      }

      function deleteUser(id) {
        UserService.deleteUser(id)
          .then((response) => {
            Notification.success({
              message: "Delete data Successfully",
            });
            vm.getListUsers();
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
