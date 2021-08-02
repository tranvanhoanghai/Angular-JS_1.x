"use strict";

angular.module("user").directive("userForm", function (SharedService) {
  return {
    restrict: "E",
    transclude: true,

    scope: {
      titleBtn: "@",
      onSubmit: "&",
      user: "=",
    },

    templateUrl: "users/user.form.directive.html",

    link: function (scope, element, attrs) {
      scope.regexEmail = SharedService.regexEmail();
      scope.regexPhone = SharedService.regexPhone();
    },
  };
});
