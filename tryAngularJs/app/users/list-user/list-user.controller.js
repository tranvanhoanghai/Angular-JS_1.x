"use strict";

angular.module("user").component("listUser", {
  templateUrl: "users/list-user/list-user.template.html",
  controller: [
    "NgTableParams",
    "UserService",
    "cssInjector",
    "$location",
    "Notification",
    function (
      NgTableParams,
      UserService,
      cssInjector,
      $location,
      Notification
    ) {
      cssInjector.add("users/user.template.css");
      var vm = this;
      vm.loading = true;

      vm.getListUsers = getListUsers;
      vm.create = createUser;
      vm.edit = editUser;
      vm.delete = deleteUser;

      function getListUsers() {
        UserService.listUsers()
          .then((response) => {
            vm.users = response.data;
            vm.tableParams = new NgTableParams(
              { count: 2 },
              {
                // page size buttons (right set of buttons in demo)
                counts: [],
                // determines the pager buttons (left set of buttons in demo)
                paginationMaxBlocks: 13,
                paginationMinBlocks: 2,
                dataset: vm.users,
              }
            );
            vm.loading = false;
          })
          .catch((error) => {
            console.log("Error", error);
            setTimeout(function () {
              vm.getListUsers();
            }, 5000);
          });
      }

      vm.getListUsers();

      function createUser() {
        $location.url("/user/create/");
      }

      function editUser(id) {
        $location.url("/user/edit/" + id);
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
