"use strict";

angular.module("contact").component("createContact", {
  templateUrl: "contacts/create-contact/create-contact.template.html",
  controller: [
    "$location",
    "cssInjector",
    "ContactService",
    "UserService",
    "Notification",
    function (
      $location,
      cssInjector,
      ContactService,
      UserService,
      Notification
    ) {
      cssInjector.add("contacts/contact.template.css");
      var vm = this;
      vm.loading = true;

      vm.create = createContact;

      UserService.listUsers()
        .then((response) => {
          vm.assignedTos = response.data;
        })
        .catch((error) => {
          console.log("Error", error);
        });

      function createContact() {
        var contact = {
          name: vm.name,
          salutation: vm.salutation,
          phone: vm.phone,
          email: vm.email,
          organization: vm.organization,
          dateOfBirth: vm.dateOfBirth,
          address: vm.address,
          leadSource: vm.leadSource,
          assignedTo: vm.assignedTo,
          creator: "Hai",
          description: vm.description,
        };

        ContactService.createContact(contact)
          .then((response) => {
            Notification.success({
              message: "Add data Successfully",
              replaceMessage: true,
            });

            $location.url("/contact/");
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
