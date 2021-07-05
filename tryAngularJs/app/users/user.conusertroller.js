"use strict";

user.component("user", {
  templateUrl: "users/user.template.html",
  controller: [
    "$scope",
    "cssInjector",
    "CrudService",
    "Notification",
    function ($scope, cssInjector, CrudService, Notification) {
      cssInjector.add("users/user.template.css");
    },
  ],
});
