"use strict";

angular.module("user").component("listUser", {
  templateUrl: "users/list-user/list-user.template.html",
  controller: [
    "NgTableParams",
    "$uibModal",
    "UserService",
    "cssInjector",
    "$location",
    "Notification",
    function (
      NgTableParams,
      $uibModal,
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
      vm.open = openModal;

      vm.data = "Do you want to delete it?";

      function openModal(id) {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "shared/dialog.template.html",
          controller: function ($uibModalInstance, data, $scope) {
            $scope.data = data;

            $scope.ok = function () {
              deleteUser(id);
              $uibModalInstance.close();
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss("cancel");
            };
          },
          // size: size,
          resolve: {
            data: function () {
              return vm.data;
            },
          },
        });

        modalInstance.result.then(function () {
          // alert("now I'll close the modal");
        });
      }

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
