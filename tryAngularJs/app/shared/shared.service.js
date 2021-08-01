"use strict";

angular
  .module("share")
  .service("SharedService", function ($localStorage, $rootScope) {
    const data = $localStorage.data;
    const token = $localStorage.token;

    const baseUrl = "http://localhost:3000";

    const regexEmail =
      /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;

    const regexPhone =
      /^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    this.getBaseUrl = function () {
      return baseUrl;
    };

    this.getData = function () {
      return data;
    };

    this.getToken = function () {
      return token;
    };

    this.regexEmail = function () {
      return regexEmail;
    };

    this.regexPhone = function () {
      return regexPhone;
    };

    this.regexPassword = function () {
      return regexPassword;
    };

    this.checkSizeObj = function (obj) {
      var size = 0,
        key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    };
  });
