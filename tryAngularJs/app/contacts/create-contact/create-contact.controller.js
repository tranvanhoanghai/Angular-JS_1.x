"use strict";

angular.module("contact").component("createContact", {
  templateUrl: "contacts/create-contact/create-contact.template.html",
  controller: [
    "$scope",
    "$window",
    "cssInjector",
    "ContactService",
    "BaseUrlService",
    "UserService",
    "Notification",
    function (
      $scope,
      $window,
      cssInjector,
      ContactService,
      BaseUrlService,
      UserService,
      Notification
    ) {
      cssInjector.add("contacts/contact.template.css");
      var vm = this;
      vm.loading = true;

      vm.createContacts = createContacts;

      UserService.getAll()
        .then((response) => {
          vm.assignedTos = response.data;
        })
        .catch((error) => {
          console.log("Error", error);
        });

      function createContacts() {
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

            $window.location.href = "#!/contact/";
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
