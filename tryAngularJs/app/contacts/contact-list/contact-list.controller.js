(function () {
  "use strict";

  angular.module("contact").component("contactList", {
    templateUrl: "contacts/contact-list/contact-list.template.html",
    controller: [
      "$rootScope",
      "NgTableParams",
      "$stateParams",
      "$state",
      "$scope",
      "ContactService",
      "DialogService",
      "UserService",
      "Notification",
      function (
        $rootScope,
        NgTableParams,
        $stateParams,
        $state,
        $scope,
        ContactService,
        DialogService,
        UserService,
        Notification
      ) {
        var vm = this;

        vm.paramLeadSource = $stateParams.leadSource;
        vm.paramAssignedTo = $stateParams.assignedTo;
        vm.isLoading = true;
        vm.title = "Do you want to delete it?";
        vm.listId = { id: [] };
        vm.isSelected = {};
        $scope.model = {};
        $scope.model.checkAlls = false;

        vm.getListContacts = getListContacts;
        vm.getListAssignedTos = getListAssignedTos;
        vm.ngTable = ngTable;
        vm.create = createContact;
        vm.edit = editContact;
        vm.delete = showDialog;
        vm.deleteMultiple = showDialog;
        vm.checkBox = checkBox;
        $scope.checkAll = checkAll;

        console.log();

        vm.getListContacts();

        function checkBox(value) {
          vm.listId.id = Object.keys(value).filter((key) => value[key]);
          vm.contacts.map(() => {
            vm.listId.id.length < vm.contacts.length
              ? ($scope.model.checkAlls = false)
              : ($scope.model.checkAlls = true);
          });
        }

        function checkAll(checked) {
          angular.forEach(vm.contacts, function (contact) {
            checked
              ? (vm.isSelected[contact.id] = true)
              : (vm.isSelected[contact.id] = false);
          });

          vm.listId.id = Object.keys(vm.isSelected).filter(
            (key) => vm.isSelected[key]
          );
        }

        function getListContacts() {
          var promise = $rootScope.isAdmin
            ? ContactService.listContact()
            : ContactService.listContactAssign($rootScope.name);

          promise
            .then((response) => {
              vm.getListAssignedTos();
              vm.contacts = response.data;
              vm.ngTable(vm.contacts);
              vm.isLoading = false;
            })
            .catch((error) => {
              console.log("Error", error.data);
              if (error.status !== 403 && error.status !== 401) {
                setTimeout(function () {
                  vm.getListContacts();
                }, 5000);
              }
            });
        }

        function getListAssignedTos() {
          UserService.listUsers()
            .then((response) => {
              vm.nullData = { name: "" };
              vm.assignedTos = response.data;
              vm.assignedTos.unshift(vm.nullData);

              vm.ngTableAssignedTos = [];
              angular.forEach(vm.assignedTos, function (value) {
                vm.ngTableAssignedTos.push({
                  id: value.name,
                  title: value.name,
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
})();
