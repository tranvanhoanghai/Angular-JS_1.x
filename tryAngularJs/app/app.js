"use strict";

angular.module("myApp").config([
  "$locationProvider",
  "$httpProvider",
  "$stateProvider",
  "$urlRouterProvider",
  "cssInjectorProvider",
  "NotificationProvider",
  "$qProvider",
  function (
    $locationProvider,
    $httpProvider,
    $stateProvider,
    $urlRouterProvider,
    cssInjectorProvider,
    NotificationProvider,
    $qProvider
  ) {
    $locationProvider.hashPrefix("!");
    cssInjectorProvider.setSinglePageMode(false);
    $qProvider.errorOnUnhandledRejections(false);

    $stateProvider
      .state("dashboard", {
        url: "/dashboard",
        template: "<dashboard></dashboard>",
        data: {
          pageTitle: "Dashboard",
        },
      })
      .state("contact", {
        url: "/contact",
        template: "<contact></contact>",
        data: {
          pageTitle: "Contact",
        },
      })
      .state("create", {
        url: "/contact/create",
        template: "<create-contact></create-contact>",
        data: {
          pageTitle: "Create contact",
        },
      })
      .state("edit", {
        url: "/contact/edit/:id",
        template: "<edit-contact></edit-contact>",
        data: {
          pageTitle: "Edit contact",
        },
      })
      .state("sales-order", {
        url: "/sales-order",
        template: "<sales-order></sales-order>",
        data: {
          pageTitle: "Sales order",
        },
      })
      .state("sales-orderCreate", {
        url: "/sales-order/create",
        template: "<create-sales-order></create-sales-order>",
        data: {
          pageTitle: "Create sales order",
        },
      })
      .state("sales-orderEdit", {
        url: "/sales-order/edit/:id",
        template: "<edit-sales-order></edit-sales-order>",
        data: {
          pageTitle: "Edit sales order",
        },
      })
      .state("user", {
        url: "/user",
        template: "<user></user>",
        data: {
          pageTitle: "User management",
        },
      })
      .state("createUser", {
        url: "/user/create",
        template: "<create-user></create-user>",
        data: {
          pageTitle: "Create user",
        },
      })
      .state("editUser", {
        url: "/user/edit/:id",
        template: "<edit-user></edit-user>",
        data: {
          pageTitle: "Edit user",
        },
      })
      .state("403", {
        url: "/403",
        template: "<error></error>",
        data: {
          pageTitle: "Error",
        },
      })
      .state("login", {
        url: "/login",
        template: "<login></login>",
        data: {
          pageTitle: "Login",
        },
        // views: {
        //   layout: {
        //     template: "<login></login>",
        //   },
        // },
      })
      .state("changePassword", {
        url: "/changePassword",
        template: "<change-password></change-password>",
        data: {
          pageTitle: "Change password",
        },
      });
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
