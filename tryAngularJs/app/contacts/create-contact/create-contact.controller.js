"use strict";

angular.module("contact").component("createContact", {
  templateUrl: "contacts/create-contact/create-contact.template.html",
  controller: [
    "$state",
    "cssInjector",
    "ContactService",
    "UserService",
    "SharedService",
    "Notification",
    function (
      $state,
      cssInjector,
      ContactService,
      UserService,
      SharedService,
      Notification
    ) {
      cssInjector.add("contacts/contact.template.css");
      var vm = this;
      vm.isLoading = true;

      vm.submit = createContact;
      vm.creator = SharedService.getData().name;
      vm.titleBtn = "Create";
      vm.contact = {
        creator: vm.creator,
      };

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
