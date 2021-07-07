"use strict";

angular.module("contact").component("contact", {
  templateUrl: "contacts/contact.template.html",
  controller: [
    "$scope",
    "cssInjector",
    "ContactService",
    "BaseUrlService",
    "Notification",
    function ($scope, cssInjector, ContactService, Notification) {
      cssInjector.add("contacts/contact.template.css");
      var vm = this;
      vm.loading = true;
    },
  ],
});
