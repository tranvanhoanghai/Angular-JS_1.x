"use strict";

angular.module("user").component("editUser", {
  templateUrl: "users/edit-user/edit-user.template.html",
  controller: [
    "$state",
    "$stateParams",
    "cssInjector",
    "UserService",
    "DialogService",
    "Notification",
    function (
      $state,
      $stateParams,
      cssInjector,
      UserService,
      DialogService,
      Notification
    ) {
      cssInjector.add("users/user.template.css");
      var vm = this;
      var currentId = $stateParams.id;

      vm.detailUser = detailUser;
      vm.title = "Do you want to update it?";
      vm.submitBtn = "UPDATE";
      vm.submit = showDialog;
      vm.user = {};

      vm.detailUser();

      function detailUser() {
        UserService.detailUser(currentId)
          .then((res) => {
            vm.user.name = res.data.name;
            vm.user.username = res.data.username;
            vm.user.email = res.data.email;
            vm.user.phone = res.data.phone;
            vm.user.isActive = res.data.isActive;
          })
          .catch((error) => {
            Notification.error({
              message: "Error",
              replaceMessage: true,
            });
          });
      }

      function showDialog() {
        DialogService.showDialog(updateUser, vm.title);
      }

      function updateUser() {
        UserService.updateUser(currentId, vm.user)
          .then((res) => {
            Notification.success({
              message: res.data.message,
            });
            $state.go("main.user");
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
