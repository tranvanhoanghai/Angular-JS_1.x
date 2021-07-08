"use strict";

angular.module("contact").component("contact", {
  templateUrl: "contacts/contact.template.html",
  controller: [
    "$scope",
    "cssInjector",
    "$window",
    "ContactService",
    "BaseUrlService",
    "Notification",
    function ($scope, cssInjector, $window, ContactService, Notification) {
      cssInjector.add("contacts/contact.template.css");
      var vm = this;
      vm.loading = true;
    },
  ],
});
