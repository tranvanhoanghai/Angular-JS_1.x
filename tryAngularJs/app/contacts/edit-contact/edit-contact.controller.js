"use strict";

angular.module("contact").component("editContact", {
  templateUrl: "contacts/edit-contact/edit-contact.template.html",
  controller: [
    "$state",
    "$location",
    "$uibModal",
    "cssInjector",
    "ContactService",
    "$stateParams",
    "UserService",
    "Notification",
    function (
      $state,
      $location,
      $uibModal,
      cssInjector,
      ContactService,
      $stateParams,
      UserService,
      Notification
    ) {
      cssInjector.add("contacts/contact.template.css");
      var vm = this;
      var currentId = $stateParams.id;
      vm.detailContact = detailContact;
      vm.update = updateContact;
      vm.loading = true;
      vm.open = openModal;
      vm.data = "Do you want to update it?";

      function openModal(size) {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "shared/dialog.template.html",
          controller: function ($uibModalInstance, data, $scope) {
            $scope.data = data;

            $scope.ok = function () {
              updateContact();
              $uibModalInstance.close();
            };

            $scope.cancel = function () {
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
          // alert("now I'll close the modal");
        });
      }

      function detailContact() {
        ContactService.detailContact($stateParams.id)
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
            vm.phone = Number(res.data.phone);
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
            $state.go("contact");
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
