"use strict";

angular.module("user").component("editUser", {
  templateUrl: "users/edit-user/edit-user.template.html",
  controller: [
    "$location",
    "$routeParams",
    "cssInjector",
    "UserService",
    "Notification",
    function ($location, $routeParams, cssInjector, UserService, Notification) {
      cssInjector.add("users/user.template.css");
      var vm = this;
      var currentId = $routeParams.id;

      vm.detailUser = detailUser;
      vm.update = updateUser;
      vm.loading = true;

      function detailUser() {
        UserService.detailUser(currentId)
          .then((res) => {
            vm.name = res.data.name;
            vm.username = res.data.username;
            vm.email = res.data.email;
            vm.phone = res.data.phone;
          })
          .catch((error) => {
            Notification.error({
              message: "Error",
              replaceMessage: true,
            });
          });
      }

      vm.detailUser();

      function updateUser() {
        var user = {
          name: vm.name,
          username: vm.username,
          email: vm.email,
          phone: vm.phone,
        };

        UserService.updateUser(currentId, user)
          .then((res) => {
            Notification.success({
              message: res.data.message,
            });
            $location.url("user");
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
