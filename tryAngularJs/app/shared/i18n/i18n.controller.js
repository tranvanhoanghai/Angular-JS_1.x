"use strict";

angular.module("i18n").component("i18n", {
  templateUrl: "shared/i18n/i18n.template.html",
  controller: [
    "$window",
    "$translate",
    function ($window, $translate) {
      var vm = this;

      vm.change = change;
      vm.language = $window.localStorage["NG_TRANSLATE_LANG_KEY"];

      function change() {
        $translate.use(vm.language);
      }
    },
  ],
});
