"use strict";

angular
  .module("share")
  .constant("SharedConstant", {
    baseUrl: { url: "http://localhost:3000" },

    regex: {
      email: /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
      phone: /^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      password:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
  })
  .factory("localStorageFactory", function ($localStorage) {
    var localStorage = {
      data: $localStorage.data,
      token: $localStorage.token,
    };
    return localStorage;
  });
