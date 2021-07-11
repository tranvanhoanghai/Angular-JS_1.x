"use strict";

angular.module("contact").component("contactList", {
  templateUrl: "contacts/contact-list/contact-list.template.html",
  controller: [
    "$scope",
    "NgTableParams",
    "cssInjector",
    "$location",
    "$uibModal",
    "ContactService",
    "Notification",
    function (
      $scope,
      NgTableParams,
      cssInjector,
      $location,
      $uibModal,
      ContactService,
      Notification
    ) {
      cssInjector.add("contacts/contact.template.css");
      var vm = this;
      vm.loading = true;

      vm.getListContacts = getListContacts;
      vm.create = createContact;
      vm.edit = editContact;
      vm.delete = deleteContact;
      vm.open = openModal;

      vm.data = "Do you want to delete it?";

      function openModal(id) {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "shared/dialog.template.html",
          controller: function ($uibModalInstance, data, $scope) {
            $scope.data = data;

            $scope.ok = function () {
              deleteContact(id);
              $uibModalInstance.close();
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss("cancel");
            };
          },
          // size: size,
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

      function getListContacts() {
        ContactService.listContact()
          .then((response) => {
            vm.contacts = response.data;
            vm.tableParams = new NgTableParams(
              { count: 10 },
              {
                // page size buttons (right set of buttons in demo)
                counts: [],
                // determines the pager buttons (left set of buttons in demo)
                paginationMaxBlocks: 13,
                paginationMinBlocks: 2,
                dataset: vm.contacts,
              }
            );
            vm.loading = false;
          })
          .catch((error) => {
            console.log("Error", error);
            setTimeout(function () {
              vm.getListContacts();
            }, 5000);
          });
      }

      vm.getListContacts();

      function createContact() {
        $location.url("/contact/create/");
      }

      function editContact(id) {
        $location.url("/contact/edit/" + id);
      }

      function deleteContact(id) {
        ContactService.deleteContact(id)
          .then((response) => {
            Notification.success({
              message: "Delete data Successfully",
            });
            vm.getListContacts();
          })
          .catch((error) => {
            console.log("Error", error);
            Notification.error({
              message: error,
            });
          });
      }
    },
  ],
});
