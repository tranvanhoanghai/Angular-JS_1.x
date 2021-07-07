"use strict";

angular.module("contact").component("editContact", {
  templateUrl: "contacts/edit-contact/edit-contact.template.html",
  controller: [
    "$scope",
    "$window",
    "cssInjector",
    "ContactService",
    "$routeParams",
    "UserService",
    "BaseUrlService",
    "Notification",
    function (
      $scope,
      $window,
      cssInjector,
      ContactService,
      $routeParams,
      UserService,
      BaseUrlService,
      Notification
    ) {
      cssInjector.add("contacts/contact.template.css");
      var vm = this;
      var currentId = $routeParams.id;

      vm.detailContact = detailContact;
      vm.editContact = editContact;
      vm.loading = true;

      function detailContact() {
        ContactService.detailContact(currentId)
          .then((res) => {
            UserService.getAll()
              .then((response) => {
                vm.assignedTos = response.data;
                console.log(vm.assignedTos);
              })
              .catch((error) => {
                console.log("Error", error);
              });

            vm.name = res.data.name;
            vm.salutation = res.data.salutation;
            vm.phone = res.data.phone;
            vm.email = res.data.email;
            vm.organization = res.data.organization;
            vm.dateOfBirth = res.data.dateOfBirth;
            vm.address = res.data.address;
            vm.leadSource = res.data.leadSource;
            vm.assignedTo = res.data.assignedTo;
            vm.creator = res.data.creator;
            vm.description = res.data.description;
          })
          .catch((error) => {
            Notification.error({
              message: "Error",
              replaceMessage: true,
            });
          });
      }

      function editContact() {
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
        
        ContactService.updateContact(currentId, contact)
          .then((res) => {
            Notification.success({
              message: "Data update Successfully",
            });
            $window.location.href = "#!/contact/";
          })
          .catch((error) => {
            console.log(error);
            Notification.error({
              message: "Data update Error",
            });
          });
      }

      vm.detailContact();
    },
  ],
});
