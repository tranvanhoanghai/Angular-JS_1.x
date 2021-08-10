(function () {
  "use strict";

  angular.module("contact").directive("contactForm", directiveFunction);
  directiveFunction.$inject = ["UserService", "Notification", "SharedConstant"];

  function directiveFunction(UserService, Notification, SharedConstant) {
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
      templateUrl: "contact/contact-form.directive.html",

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
