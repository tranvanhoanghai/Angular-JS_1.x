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
      vm.creator = SharedService.getData().name;
      vm.titleBtn = "CREATE";
      vm.contact = {
        creator: vm.creator,
      };
      vm.keepData = keepData;
      vm.$onDestroy = onDestroy;
      vm.keepData();

      function onDestroy() {
        vm.form = {
          name: vm.contact.name,
          salutation: vm.contact.salutation,
          phone: vm.contact.phone,
          email: vm.contact.email,
          organization: vm.contact.organization,
          dateOfBirth: vm.contact.dateOfBirth,
          address: vm.contact.address,
          leadSource: vm.contact.leadSource,
          assignedTo: vm.contact.assignedTo,
          description: vm.contact.description,
        };

        ContactService.formCreated = vm.form;
      }

      function keepData() {
        if (ContactService.formCreated) {
          vm.contact.name = ContactService.formCreated.name;
          vm.contact.salutation = ContactService.formCreated.salutation;
          vm.contact.phone = ContactService.formCreated.phone;
          vm.contact.email = ContactService.formCreated.email;
          vm.contact.organization = ContactService.formCreated.organization;
          vm.contact.dateOfBirth = new Date(
            ContactService.formCreated.dateOfBirth
          );
          vm.contact.address = ContactService.formCreated.address;
          vm.contact.leadSource = ContactService.formCreated.leadSource;
          vm.contact.assignedTo = ContactService.formCreated.assignedTo;
          vm.contact.creator = ContactService.formCreated.creator;
          vm.contact.description = ContactService.formCreated.description;
        }
      }

      function createContact() {
        console.log("abc");
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
