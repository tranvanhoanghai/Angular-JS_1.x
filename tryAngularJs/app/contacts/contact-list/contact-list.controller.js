"use strict";

angular.module("contact").component("contactList", {
  templateUrl: "contacts/contact-list/contact-list.template.html",
  controller: [
    "$scope",
    "cssInjector",
    "$window",
    "ContactService",
    "BaseUrlService",
    "Notification",
    function (
      $scope,
      cssInjector,
      $window,
      ContactService,
      BaseUrlService,
      Notification
    ) {
      cssInjector.add("contacts/contact.template.css");
      var vm = this;
      vm.loading = true;

      vm.getListContacts = getListContacts;
      vm.editContacts = editContacts;
      vm.deleteContacts = deleteContacts;

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

      function editContacts(id) {
        $window.location.href = "#!/contact/edit/" + id;
      }

      function deleteContacts(id) {
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
