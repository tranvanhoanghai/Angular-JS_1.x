"use strict";

angular.module("i18n").component("i18n", {
  templateUrl: "shared/i18n/i18n.template.html",
  controller: [
    "cssInjector",
    "$scope",
    "$translate",
    function (cssInjector, $scope, $translate) {
      //   cssInjector.add("sales-order/sales-order.template.css");
      var vm = this;

      vm.change = change;
      vm.language = "en";

      function change() {
        $translate.use(vm.language);
      }
    },
  ],
});
