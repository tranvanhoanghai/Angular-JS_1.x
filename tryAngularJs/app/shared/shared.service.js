(function () {
  "use strict";

  angular.module("share").service("SharedService", serviceFunction);
  serviceFunction.$inject = [];
  
  function serviceFunction() {
    this.checkSizeObj = function (obj) {
      var size = 0,
        key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    };
  }
})();
