"use strict";

angular.module("contact").component("contactList", {
  templateUrl: "contacts/contact-list/contact-list.template.html",
  controller: [
    "$scope",
    "cssInjector",
    "$location",
    "ContactService",
    "Notification",
    function ($scope, cssInjector, $location, ContactService, Notification) {
      cssInjector.add("contacts/contact.template.css");
      var vm = this;
      vm.loading = true;

      vm.getListContacts = getListContacts;
      vm.create = createContact;
      vm.edit = editContact;
      vm.delete = deleteContact;

      function getListContacts() {
        ContactService.listContact()
          .then((response) => {
            vm.contacts = response.data;
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
