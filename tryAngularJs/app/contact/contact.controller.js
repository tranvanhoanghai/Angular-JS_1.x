"use strict";

angular.module("contact").component("contact", {
  templateUrl: "contact/contact.template.html",
  controller: [
    "$scope",
    "cssInjector",
    "$window",
    "ContactService",
    "SharedService",
    "Notification",
    function ($scope, cssInjector, $window, ContactService, Notification) {
      cssInjector.add("contact/contact.template.css");
      var vm = this;
      vm.isLoading = true;
    },
  ],
});
