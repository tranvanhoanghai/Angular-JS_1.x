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
      vm.loading = true;

      vm.create = createContact;
      vm.creator = SharedService.getData().name;
      vm.regexEmail = SharedService.regexEmail();
      vm.regexPhone = SharedService.regexPhone();

      UserService.listUsersActive()
        .then((response) => {
          vm.assignedTos = response.data;
        })
        .catch((error) => {
          console.log("Error", error);
        });

      console.log();

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
          creator: vm.creator,
          description: vm.description,
        };

        ContactService.createContact(contact)
          .then((response) => {
            Notification.success({
              message: "Add data Successfully",
              replaceMessage: true,
            });
            $state.go("contact");
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
