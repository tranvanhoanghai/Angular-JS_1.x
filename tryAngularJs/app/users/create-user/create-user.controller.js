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
      vm.submit = createUser;
      vm.creator = SharedService.getData().name;
      vm.submitBtn = "CREATE";
      vm.user = {
        password: 123456,
        creator: vm.creator,
      };

      function createUser() {
        UserService.createUser(vm.user)
          .then((response) => {
            Notification.success({
              message: "Add data Successfully",
              replaceMessage: true,
            });

            $state.go("main.user");
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
