"use strict";

angular.module("user").component("createUser", {
  templateUrl: "users/create-user/create-user.template.html",
  controller: [
    "$state",
    "cssInjector",
    "UserService",
    "Notification",
    "SharedService",
    function ($state, cssInjector, UserService, Notification, SharedService) {
      cssInjector.add("users/user.template.css");

      var vm = this;
      vm.create = createUser;
      vm.creator = SharedService.getData().name;
      vm.regexEmail = SharedService.regexEmail();
      vm.regexPhone = SharedService.regexPhone();

      function createUser() {
        var user = {
          name: vm.name,
          username: vm.username,
          password: 123456,
          email: vm.email,
          phone: vm.phone,
          creator: vm.creator,
        };

        UserService.createUser(user)
          .then((response) => {
            Notification.success({
              message: "Add data Successfully",
              replaceMessage: true,
            });

            $state.go("user");
          })
          .catch((error) => {
            console.log("Error", error.data.message);
            Notification.error({
              message: error.data.message,
              replaceMessage: true,
            });
          });
      }
    },
  ],
});
