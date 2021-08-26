"use strict";

angular.module("contact").component("contact", {
  templateUrl: "contact/contact.template.html",
  controller: [
    "$scope",
    "cssInjector",
    "ContactConstant",
    "ContactService",
    "SharedService",
    "Notification",
    function (
      $scope,
      cssInjector,
      ContactConstant,
      ContactService,
      Notification
    ) {
      cssInjector.add(ContactConstant.contacts.cssTpl);
      var vm = this;
      vm.isLoading = true;
    },
  ],
});
