"use strict";

angular.module("contact").component("contactList", {
  templateUrl: "contacts/contact-list/contact-list.template.html",
  controller: [
    "UserService",
    "$rootScope",
    "NgTableParams",
    "$stateParams",
    "$state",
    "$scope",
    "ContactService",
    "DialogService",
    "Notification",
    function (
      UserService,
      $rootScope,
      NgTableParams,
      $stateParams,
      $state,
      $scope,
      ContactService,
      DialogService,
      Notification
    ) {
      var vm = this;

      vm.paramLeadSource = $stateParams.leadSource;
      vm.paramAssignedTo = $stateParams.assignedTo;
      vm.getListContacts = getListContacts;
      vm.getListAssignedTos = getListAssignedTos;
      vm.ngTable = ngTable;
      vm.create = createContact;
      vm.edit = editContact;
      vm.delete = showDialog;
      vm.deleteMultiple = showDialog;

      vm.checkBox = checkBox;

      vm.isLoading = true;
      vm.title = "Do you want to delete it?";
      vm.getListContacts();
      vm.listId = { id: [] };

      function checkBox(value) {
        Object.keys(value).map((key) => {
          if (value[key]) {
            if (!vm.listId.id.includes(key)) {
              vm.listId.id.push(key);
            }
          } else {
            var index = vm.listId.id.indexOf(key);
            vm.listId.id.splice(index, 1);
          }
        });
      }

      function getListContacts() {
        if ($rootScope.isAdmin) {
          ContactService.listContact()
            .then((response) => {
              vm.getListAssignedTos();
              vm.contacts = response.data;
              vm.ngTable(vm.contacts);
              vm.isLoading = false;
            })
            .catch((error) => {
              console.log("Error", error);
              setTimeout(function () {
                vm.getListContacts();
              }, 5000);
            });
        } else {
          ContactService.listContactAssign($rootScope.name)
            .then((response) => {
              vm.getListAssignedTos();
              vm.contacts = response.data;
              vm.ngTable(vm.contacts);
              vm.isLoading = false;
            })
            .catch((error) => {
              console.log("Error", error);
              setTimeout(function () {
                vm.getListContacts();
              }, 5000);
            });
        }
      }

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

        vm.tableParams.filter()["assignedTo"] = vm.paramAssignedTo;
        vm.tableParams.filter()["leadSource"] = vm.paramLeadSource;
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

      function showDialog(id) {
        id
          ? DialogService.showDialog(deleteContact, vm.title, id)
          : DialogService.showDialog(deleteMultiple, vm.title);
      }

      function deleteMultiple() {
        ContactService.deleteMultipleContact(vm.listId)
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
