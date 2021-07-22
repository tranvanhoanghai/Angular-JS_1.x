"use strict";

angular.module("contact").component("editContact", {
  templateUrl: "contacts/edit-contact/edit-contact.template.html",
  controller: [
    "$state",
    "$stateParams",
    "$uibModal",
    "cssInjector",
    "ContactService",
    "Notification",
    function (
      $state,
      $stateParams,
      $uibModal,
      cssInjector,
      ContactService,
      Notification
    ) {
      cssInjector.add("contacts/contact.template.css");
      var vm = this;
      var currentId = $stateParams.id;
      vm.detailContact = detailContact;
      vm.submit = updateContact;
      vm.loading = true;
      vm.submit = openModal;
      vm.dataModal = "Do you want to update it?";

      vm.titleBtn = "Update";
      vm.detailContact();

      vm.contact = {};

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
              return vm.dataModal;
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
            vm.contact.name = res.data.name;
            vm.contact.salutation = res.data.salutation;
            vm.contact.phone = res.data.phone;
            vm.contact.email = res.data.email;
            vm.contact.organization = res.data.organization;
            vm.contact.dateOfBirth = new Date(res.data.dateOfBirth);
            vm.contact.address = res.data.address;
            vm.contact.leadSource = res.data.leadSource;
            vm.contact.assignedTo = res.data.assignedTo;
            vm.contact.creator = res.data.creator;
            vm.contact.description = res.data.description;
          })
          .catch((error) => {
            Notification.error({
              message: "Can't get data by ID contact",
              replaceMessage: true,
            });
          });
      }

      function updateContact() {
        ContactService.updateContact(currentId, vm.contact)
          .then((res) => {
            Notification.success({
              message: "Data update Successfully",
            });
            $state.go("main.contact");
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
