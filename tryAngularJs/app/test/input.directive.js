"use strict";

angular.module("test").directive("inputDirective", function () {
  return {
    restrict: "E",
    scope: true,
    template:
      "<input type='number' ng-model='vm.abc' ng-pattern='vm.regexPhone'>",
    controller: function ($scope, $attrs, SharedService) {
      var vm = this;
      vm.abc = 123456;

      vm.regexPhone = SharedService.regexPhone();
      console.log();
    },
    controllerAs: "vm",
  };
});
