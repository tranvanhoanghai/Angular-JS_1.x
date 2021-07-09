"use strict";

angular.module("user").component("createUser", {
  templateUrl: "users/create-user/create-user.template.html",
  controller: [
    "$location",
    "cssInjector",
    "UserService",
    "Notification",
    function ($location, cssInjector, UserService, Notification) {
      cssInjector.add("users/user.template.css");

      var vm = this;
      vm.create = createUser;

      function createUser() {
        var user = {
          name: vm.name,
          username: vm.username,
          password: 123456,
          email: vm.email,
          phone: vm.phone,
          creator: "Admin",
        };

        UserService.createUser(user)
          .then((response) => {
            Notification.success({
              message: "Add data Successfully",
              replaceMessage: true,
            });

            $location.url("user");
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
