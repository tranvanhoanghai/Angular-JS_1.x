"use strict";

angular.module("contact").component("createContact", {
  templateUrl: "contacts/create-contact/create-contact.template.html",
  controller: [
    "$state",
    "cssInjector",
    "ContactService",
    "SharedService",
    "Notification",
    function (
      $state,
      cssInjector,
      ContactService,
      SharedService,
      Notification
    ) {
      cssInjector.add("contacts/contact.template.css");
      var vm = this;
      vm.isLoading = true;

      vm.submit = createContact;
      vm.cancel = cancel;
      vm.show = false;
      vm.keepData = keepData;
      vm.$onDestroy = onDestroy;

      vm.creator = SharedService.getData().name;
      vm.submitBtn = "CREATE";
      vm.cancelBtn = "CANCEL";
      vm.contact = {
        creator: vm.creator,
      };

      vm.keepData();

      function onDestroy() {
        ContactService.formCreated = vm.contact;
      }

      function keepData() {
        if (ContactService.formCreated) {
          vm.contact = ContactService.formCreated;
          var size = SharedService.checkSizeObj(vm.contact);
          vm.show = size === 1 ? false : true;
        }
      }

      function cancel() {
        vm.contact = null;
        vm.show = false;
      }

      function createContact() {
        ContactService.createContact(vm.contact)
          .then((response) => {
            vm.contact = null;
            $state.go("main.contact");
            Notification.success({
              message: "Add data Successfully",
              replaceMessage: true,
            });
          })
          .catch((error) => {
            console.log("Error", error);
            Notification.error({
              message: error,
              replaceMessage: true,
            });
          });
      }
    },
  ],
});
