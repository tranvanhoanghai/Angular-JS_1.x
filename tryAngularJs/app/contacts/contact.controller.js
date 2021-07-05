"use strict";

contact.component("contact", {
  templateUrl: "contacts/contact.template.html",
  controller: [
    "$scope",
    "cssInjector",
    "CrudService",
    "Notification",
    function ($scope, cssInjector, CrudService, Notification) {
      cssInjector.add("contacts/contact.template.css");
    },
  ],
});
