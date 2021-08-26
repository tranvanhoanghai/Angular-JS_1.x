(function () {
  "use strict";

  angular.module("contact").directive("contactForm", directiveFunction);
  directiveFunction.$inject = [
    "UserService",
    "Notification",
    "SharedConstant",
    "ContactConstant",
  ];

  function directiveFunction(
    UserService,
    Notification,
    SharedConstant,
    ContactConstant
  ) {
    return {
      restrict: "E",
      replace: true,
      scope: {
        onSubmit: "&",
        onCancel: "&",
        submitBtn: "@",
        cancelBtn: "@",
        contact: "=",
        showBtnCancel: "=",
      },
      templateUrl: ContactConstant.contacts.formTpl,

      link: function (scope, element, attrs) {
        scope.regexEmail = SharedConstant.regex.email;
        scope.regexPhone = SharedConstant.regex.phone;
        scope.getListUser = getListUser;
        scope.getListUser();

        function getListUser() {
          UserService.listUsersActive()
            .then((response) => {
              scope.assignedTos = response.data;
            })
            .catch((error) => {
              console.log("Error", error);
              Notification.error({
                message: "Can't get data assignedTos",
                replaceMessage: true,
              });
            });
        }
      },
    };
  }
})();
