(function () {
  "use strict";

  angular.module("share").factory("SharedService", serviceFunction);
  serviceFunction.$inject = [];

  function serviceFunction() {
    var factory = { checkSizeObj };

    return factory;

    ////////////////////////////////

    function checkSizeObj(obj) {
      var size = 0,
        key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    }
  }
})();
