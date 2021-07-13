"use strict";

app.config([
  // "$rootScope",
  "$locationProvider",
  "$routeProvider",
  "$httpProvider",
  "$stateProvider",
  "$urlRouterProvider",
  "cssInjectorProvider",
  "NotificationProvider",
  "$qProvider",
  function (
    // $rootScope,
    $locationProvider,
    $routeProvider,
    $httpProvider,
    $stateProvider,
    $urlRouterProvider,
    cssInjectorProvider,
    NotificationProvider,
    $qProvider
  ) {
    $locationProvider.hashPrefix("!");
    cssInjectorProvider.setSinglePageMode(true);
    $qProvider.errorOnUnhandledRejections(false);

    // $urlRouterProvider.otherwise("/home"); //Mọi đường dẫn không hợp lệ đều được chuyển đến state home

    // $stateProvider
    //   .state("dashboard", {
    //     url: "/dashboard",
    //     template: "<dashboard></dashboard>",
    //   })
    //   .state("login", {
    //     url: "/login",
    //     template: "<login></login>",
    //   })
    //   .state("contact", {
    //     url: "/contact",
    //     template: "<contact></contact>",
    //     // reloadOnSearch: false,
    //   })
    //   .state("contact.create", {
    //     url: "/create",
    //     template: "<create-contact></create-contact>",
    //   })
    //   .state("contact.edit", {
    //     url: "/contact/edit/:id",
    //     template: "<edit-contact></edit-contact>",
    //   })
    //   .state("sales-order", {
    //     url: "/sales-order",
    //     template: "<sales-order></sales-order>",
    //     reloadOnSearch: false,
    //   })
    //   .state("sales-order.create", {
    //     url: "/sales-order/create",
    //     template: "<create-sales-order></create-sales-order>",
    //   })
    //   .state("sales-order.edit", {
    //     url: "/sales-order/edit/:id",
    //     template: "<edit-sales-order></edit-sales-order>",
    //   })
    //   .state("user", {
    //     url: "/user",
    //     template: "<user></user>",
    //   })
    //   .state("user.create", {
    //     url: "/user/create",
    //     template: "<create-user></create-user>",
    //   })
    //   .state("user.edit", {
    //     url: "/user/edit/:id",
    //     template: "<edit-user></edit-user>",
    //   });

    $routeProvider
      .when("/", {
        template: "<dashboard></dashboard>", //(<view1></view1> is name component)
      })
      .when("/dashboard", {
        template: "<dashboard></dashboard>", //(<view1></view1> is name component)
      })
      .when("/contact", {
        template: "<contact></contact>",
        reloadOnSearch: false,
      })
      .when("/contact/create", {
        template: "<create-contact></create-contact>",
      })
      .when("/contact/edit/:id", {
        template: "<edit-contact></edit-contact>",
      })
      .when("/sales-order", {
        template: "<sales-order></sales-order>",
        reloadOnSearch: false,
      })
      .when("/sales-order/create", {
        template: "<create-sales-order></create-sales-order>",
      })
      .when("/sales-order/edit/:id", {
        template: "<edit-sales-order></edit-sales-order>",
      })
      .when("/user", {
        template: "<user></user>",
      })
      .when("/user/create", {
        template: "<create-user></create-user>",
      })
      .when("/user/edit/:id", {
        template: "<edit-user></edit-user>",
      })
      .when("/login", {
        template: "<login></login>",
      })
      .otherwise("/dashboard");

    NotificationProvider.setOptions({
      delay: 2000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: "right",
      positionY: "top",
    });

    $httpProvider.interceptors.push([
      "$q",
      "$location",
      "$localStorage",
      function ($q, $location, $localStorage) {
        return {
          request: function (config) {
            config.headers = config.headers || {};
            if ($localStorage.token) {
              config.headers.Authorization = "Bearer " + $localStorage.token;
            }
            console.log();
            return config;
          },
          responseError: function (response) {
            if (response.status === 401 || response.status === 403) {
              $location.url("/login");
            }
            return $q.reject(response);
          },
        };
      },
    ]);
  },
]);
