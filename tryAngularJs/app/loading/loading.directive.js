"use strict";
loading.directive("myDirective", function () {
  return {
    restrict: "A",
    template: "<div class='loader'></div>",
  };
});
