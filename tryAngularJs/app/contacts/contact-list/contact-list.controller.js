"use strict";

angular.module("contact").component("contactList", {
  templateUrl: "contacts/contact-list/contact-list.template.html",
  controller: [
    "UserService",
    "$rootScope",
    "NgTableParams",
    "$state",
    "$scope",
    "$location",
    "$uibModal",
    "ContactService",
    "Notification",
    function (
      UserService,
      $rootScope,
      NgTableParams,
      $state,
      $scope,
      $location,
      $uibModal,
      ContactService,
      Notification
    ) {
      var vm = this;
      vm.isLoading = true;

      vm.getListContacts = getListContacts;
      vm.getListAssignedTos = getListAssignedTos;
      vm.ngTable = ngTable;
      vm.create = createContact;
      vm.edit = editContact;
      vm.delete = deleteContact;
      vm.open = openModal;
      vm.deleteCheckBox = deleteCheckBox;

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

      vm.change = function (a) {
        // console.log(a);
        var values = Object.keys(a).filter((key) => a[key]);
        console.log(values);
      };

      vm.all = function () {
        console.log("all");
      };

      // $scope.$watch("checkboxes.checked", function (value) {
      //   console.log("âsdád");
      // });

      function getListContacts() {
        ContactService.listContact()
          .then((response) => {
            vm.getListAssignedTos();
            vm.contacts = response.data;
            vm.ngTable(vm.contacts);
            // $location.search({});

            vm.isLoading = false;
          })
          .catch((error) => {
            console.log("Error", error);
            setTimeout(function () {
              vm.getListContacts();
            }, 5000);
          });
      }

      vm.getListContacts();

      function getListAssignedTos() {
        UserService.listUsers()
          .then((response) => {
            vm.nullData = { name: "" };
            vm.assignedTos = response.data;
            vm.assignedTos.unshift(vm.nullData);

            vm.ngTableAssignedTos = [];
            vm.assignedTos.forEach((element) => {
              vm.ngTableAssignedTos.push({
                id: element.name,
                title: element.name,
              });
            });
          })
          .catch((error) => {
            console.log("Error", error);
          });
      }

      function ngTable(data) {
        var paramLeadSource = $location.search().leadSource;
        var paramAssignedTo = $location.search().assignedTo;
        vm.tableParams = new NgTableParams(
          { page: 1, count: 5 },
          {
            // page size buttons (right set of buttons in demo)
            total: data.length,

            counts: [],
            // determines the pager buttons (left set of buttons in demo)
            paginationMaxBlocks: 13,
            paginationMinBlocks: 2,
            dataset: data,
          }
        );

        vm.tableParams.filter()["assignedTo"] = paramAssignedTo;
        vm.tableParams.filter()["leadSource"] = paramLeadSource;
      }

      function createContact() {
        $state.go("main.createContact");
      }

      function editContact(id) {
        $state.go("main.editContact", { id: id });
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

      function deleteCheckBox() {}
    },
  ],
});
