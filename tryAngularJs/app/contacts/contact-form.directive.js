"use strict";

angular
  .module("contact")
  .directive(
    "contactForm",
    function (UserService, Notification, SharedService) {
      return {
        restrict: "E",
        scope: {
          open: "&",
          titleBtn: "@",
          contact: "=",
        },
        templateUrl: "contacts/contact-form.template.html",
        link: function (scope, element, attrs) {
          scope.regexEmail = SharedService.regexEmail();
          scope.regexPhone = SharedService.regexPhone();

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
        },
      };
    }
  );
