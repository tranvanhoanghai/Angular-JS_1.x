"use strict";

user.component("user", {
  templateUrl: "users/user.template.html",
  controller: [
    "$scope",
    "cssInjector",
    "UserService",
    "Notification",
    function ($scope, cssInjector, UserService, Notification) {
      cssInjector.add("users/user.template.css");

      $scope.loading = true;
      $scope.btnText = true;
      $scope.id = "";

      $scope.GetAllUser = function () {
        UserService.getAll()
          .then((response) => {
            $scope.users = response.data;
            $scope.loading = false;
          })
          .catch((error) => {
            console.log("Error", error);
            setTimeout(function () {
              $scope.GetAllUser();
            }, 5000);
          });
      };

      $scope.GetAllUser();

      $scope.submit = function () {
        var user = {
          name: $scope.name,
          username: $scope.username,
          password: $scope.password,
          email: $scope.email,
          phone: $scope.phone,
        };

        if ($scope.btnText) {
          if (
            $scope.name &&
            $scope.username &&
            $scope.password &&
            $scope.email &&
            $scope.phone
          ) {
            UserService.addUser(user)
              .then((res) => {
                Notification.success({
                  message: "Add data Successfully",
                });

                $scope.GetAllUser();
                $scope.Clear();
              })
              .catch((error) => {
                Notification.error({
                  message: "Add data Error",
                  replaceMessage: true,
                });
              });
          }
        } else {
          if ($scope.price && $scope.name && $scope.image) {
            CrudService.update($scope.id, product)
              .then((res) => {
                Notification.success({
                  message: "Data update Successfully",
                });
                $scope.GetProduct();
                $scope.Clear();
                $scope.btnText = true;
                $scope.id = "";
              })
              .catch((error) => {
                console.log(error);
                Notification.error({
                  message: "Data update Error",
                });
              });
          }
        }
      };

      $scope.Clear = function () {
        $scope.name = "";
        $scope.username = "";
        $scope.password = "";
        $scope.email = "";
        $scope.phone = "";
      };
    },
  ],
});
