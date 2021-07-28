"use strict";

angular.module("test").directive("inputDirective", function () {
  return {
    restrict: "E",
    // require: "ngModel",
    scope: {
      text: "=",
    },
    replace: false,
    template:
      // "<input type='text' ng-model='vm.abc' ng-pattern='vm.regexPhone'>",
      // "<input type='text' ng-model='text'>",
      "<input type='text' >",

    controller: function ($scope, $attrs, SharedService) {
      var vm = this;
      vm.abc = 123456;

      // vm.regexPhone = SharedService.regexPhone();
      $scope.$watch("text", function (data) {
        console.log(data);
      });
    },
    controllerAs: "vm",

    link: function (scope, element) {
      // element.addClass("form-control");
      // scope.$watch("text", function (data) {
      //   console.log(data.replace(/[a-z]/g, "*"));
      // });
    },
  };
});
