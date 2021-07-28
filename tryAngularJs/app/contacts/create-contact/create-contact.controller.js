"use strict";

angular.module("contact").component("createContact", {
  templateUrl: "contacts/create-contact/create-contact.template.html",
  controller: [
    "$state",
    "cssInjector",
    "ContactService",
    "SharedService",
    "Notification",
    function (
      $state,
      cssInjector,
      ContactService,
      SharedService,
      Notification
    ) {
      cssInjector.add("contacts/contact.template.css");
      var vm = this;
      vm.isLoading = true;

      vm.submit = createContact;
      vm.change = change;
      vm.creator = SharedService.getData().name;
      vm.titleBtn = "TITLE.CREATE";
      vm.contact = {
        creator: vm.creator,
      };

      function change() {
        console.log("abc");
      }

      function createContact() {
        ContactService.createContact(vm.contact)
          .then((response) => {
            $state.go("main.contact");
            Notification.success({
              message: "Add data Successfully",
              replaceMessage: true,
            });
          })
          .catch((error) => {
            console.log("Error", error);
            Notification.error({
              message: error,
              replaceMessage: true,
            });
          });
      }
    },
  ],
});
