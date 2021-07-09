"use strict";

angular.module("contact").component("editContact", {
  templateUrl: "contacts/edit-contact/edit-contact.template.html",
  controller: [
    "$location",
    "$uibModal",
    "cssInjector",
    "ContactService",
    "$routeParams",
    "UserService",
    "Notification",
    function (
      $location,
      $uibModal,
      cssInjector,
      ContactService,
      $routeParams,
      UserService,
      Notification
    ) {
      cssInjector.add("contacts/contact.template.css");
      var vm = this;
      var currentId = $routeParams.id;

      vm.detailContact = detailContact;
      vm.update = updateContact;
      vm.loading = true;
      vm.open = open;
      vm.data = "Lorem Name Test";

      function open(size) {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "confirmTpl.html",
          controller: function ($uibModalInstance, data) {
            vm.data = data;

            vm.ok = function () {
              $uibModalInstance.close();
            };

            vm.cancel = function () {
              //{...}
              alert("You clicked the cancel button.");
              $uibModalInstance.dismiss("cancel");
            };
          },
          size: size,
          resolve: {
            data: function () {
              return vm.data;
            },
          },
        });

        modalInstance.result.then(function () {
          alert("now I'll close the modal");
        });
      }

      function detailContact() {
        ContactService.detailContact(currentId)
          .then((res) => {
            UserService.listUsers()
              .then((response) => {
                vm.assignedTos = response.data;
              })
              .catch((error) => {
                console.log("Error", error);
                Notification.error({
                  message: "Can't get data assignedTos",
                  replaceMessage: true,
                });
              });
            vm.name = res.data.name;
            vm.salutation = res.data.salutation;
            vm.phone = res.data.phone;
            vm.email = res.data.email;
            vm.organization = res.data.organization;
            vm.dateOfBirth = new Date(res.data.dateOfBirth);
            vm.address = res.data.address;
            vm.leadSource = res.data.leadSource;
            vm.assignedTo = res.data.assignedTo;
            vm.creator = res.data.creator;
            vm.description = res.data.description;
          })
          .catch((error) => {
            Notification.error({
              message: "Can't get data by ID contact",
              replaceMessage: true,
            });
          });
      }
      vm.detailContact();

      function updateContact() {
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
            $location.url("/contact/");
          })
          .catch((error) => {
            console.log(error);
            Notification.error({
              message: "Data update Error",
            });
          });
      }
    },
  ],
});
