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
    "SharedService",
    "Notification",
    function (
      $state,
      $stateParams,
      $uibModal,
      cssInjector,
      ContactService,
      DialogService,
      SharedService,
      Notification
    ) {
      cssInjector.add("contacts/contact.template.css");
      var vm = this;
      vm.currentId = $stateParams.id;

      vm.isLoading = true;
      vm.title = "Do you want to update it?";
      vm.submitBtn = "UPDATE";
      vm.cancelBtn = "CANCEL";
      vm.show = false;

      vm.detailContact = detailContact;
      vm.submit = updateContact;
      vm.keepData = keepData;
      vm.$onDestroy = onDestroy;
      vm.submit = showDialog;
      vm.showDataInput = showDataInput;
      vm.cancel = cancel;

      vm.contact = {
        id: vm.currentId,
      };

      vm.showDataInput();

      function onDestroy() {
        ContactService.formEdit = vm.contact;
      }

      function showDataInput() {
        var size = SharedService.checkSizeObj(ContactService.formEdit);
        size ? vm.keepData() : vm.detailContact();
      }

      function keepData() {
        if (ContactService.formEdit) {
          if (ContactService.formEdit.id === vm.currentId) {
            vm.contact = ContactService.formEdit;
            ContactService.formEdit = null;
            vm.show = true;
          } else {
            vm.detailContact();
          }
        }
      }

      function cancel() {
        vm.detailContact();
        vm.show = false;
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
          })
          .catch((error) => {
            Notification.error({
              message: "Can't get data by ID contact",
              replaceMessage: true,
            });
          });
      }

      function updateContact() {
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
