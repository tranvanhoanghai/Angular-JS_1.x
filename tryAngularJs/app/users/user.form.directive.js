(function () {
  "use strict";

  angular.module("user").directive("userForm", directiveFunction);
  directiveFunction.$inject = ["SharedConstant"];

  function directiveFunction(SharedConstant) {
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
        scope.regexEmail = SharedConstant.regex.email;
        scope.regexPhone = SharedConstant.regex.phone;
      },
    };
  }
})();
