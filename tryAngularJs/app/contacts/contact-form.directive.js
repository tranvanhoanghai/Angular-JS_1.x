"use strict";

angular.module("contact").directive("contactForm", function () {
  return {
    restrict: "E",
    scope: true,
    templateUrl: "contacts/contact-form.template.html",
  };
});
