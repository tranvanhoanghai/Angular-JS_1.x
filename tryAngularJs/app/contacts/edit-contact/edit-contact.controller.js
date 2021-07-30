"use strict";

angular.module("contact").component("editContact", {
  templateUrl: "contacts/edit-contact/edit-contact.template.html",
  controller: [
    "$state",
    "$stateParams",
    "$uibModal",
    "cssInjector",
    "ContactService",
    "DialogService",
    "Notification",
    function (
      $state,
      $stateParams,
      $uibModal,
      cssInjector,
      ContactService,
      DialogService,
      Notification
    ) {
      cssInjector.add("contacts/contact.template.css");
      var vm = this;
      vm.currentId = $stateParams.id;

      vm.detailContact = detailContact;
      vm.submit = updateContact;
      vm.isLoading = true;
      vm.submit = showDialog;
      vm.showDataInput = showDataInput;
      vm.title = "Do you want to update it?";
      vm.titleBtn = "TITLE.UPDATE";
      vm.contact = {
        id: vm.currentId,
      };
      vm.keepData = keepData;
      vm.$onDestroy = onDestroy;
      vm.showDataInput();

      function onDestroy() {
        ContactService.formEdit = vm.contact;
        console.log(ContactService.formEdit);
      }

      function showDataInput() {
        Object.size = function (obj) {
          var size = 0,
            key;
          for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
          }
          return size;
        };

        var size = Object.size(ContactService.formEdit);
        console.log(size);

        size != 0 ? vm.keepData() : vm.detailContact();
      }

      function keepData() {
        if (ContactService.formEdit) {
          if (ContactService.formEdit.id == vm.currentId) {
            vm.contact.name = ContactService.formEdit.name;
            vm.contact.salutation = ContactService.formEdit.salutation;
            vm.contact.phone = ContactService.formEdit.phone;
            vm.contact.email = ContactService.formEdit.email;
            vm.contact.organization = ContactService.formEdit.organization;
            vm.contact.dateOfBirth = new Date(
              ContactService.formEdit.dateOfBirth
            );
            vm.contact.address = ContactService.formEdit.address;
            vm.contact.leadSource = ContactService.formEdit.leadSource;
            vm.contact.assignedTo = ContactService.formEdit.assignedTo;
            vm.contact.creator = ContactService.formEdit.creator;
            vm.contact.description = ContactService.formEdit.description;
          } else {
            vm.detailContact();
          }
        }
      }

      function showDialog() {
        DialogService.showDialog(updateContact, vm.title);
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
            return vm.contact;
          })
          .catch((error) => {
            Notification.error({
              message: "Can't get data by ID contact",
              replaceMessage: true,
            });
          });
      }

      function updateContact() {
        console.log("abc");
        ContactService.updateContact(vm.currentId, vm.contact)
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
