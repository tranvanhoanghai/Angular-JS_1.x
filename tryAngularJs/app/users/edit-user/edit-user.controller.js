"use strict";

angular.module("user").component("editUser", {
  templateUrl: "users/edit-user/edit-user.template.html",
  controller: [
    "$state",
    "$stateParams",
    "cssInjector",
    "UserService",
    "SharedService",
    "DialogService",
    "Notification",
    function (
      $state,
      $stateParams,
      cssInjector,
      UserService,
      SharedService,
      DialogService,
      Notification
    ) {
      cssInjector.add("users/user.template.css");
      var vm = this;
      var currentId = $stateParams.id;

      vm.detailUser = detailUser;
      vm.open = showDialog;
      vm.title = "Do you want to update it?";
      vm.regexEmail = SharedService.regexEmail();
      vm.regexPhone = SharedService.regexPhone();
      vm.detailUser();

      function detailUser() {
        UserService.detailUser(currentId)
          .then((res) => {
            vm.name = res.data.name;
            vm.username = res.data.username;
            vm.email = res.data.email;
            vm.phone = Number(res.data.phone);
            vm.isActive = res.data.isActive;
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
        var user = {
          name: vm.name,
          username: vm.username,
          email: vm.email,
          phone: vm.phone,
          isActive: vm.isActive,
        };

        UserService.updateUser(currentId, user)
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
