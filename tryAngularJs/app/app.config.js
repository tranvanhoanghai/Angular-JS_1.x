"use strict";

angular.module("myApp").config([
  "TestProviderProvider",
  "$locationProvider",
  "$httpProvider",
  "$stateProvider",
  "$urlRouterProvider",
  "cssInjectorProvider",
  "NotificationProvider",
  "$qProvider",
  function (
    TestProviderProvider,
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
    $urlRouterProvider.otherwise("/404");

    TestProviderProvider.setName("Provider config");
    TestProviderProvider.name = "Set name";
    TestProviderProvider.thingFromConfig = "‘This was set in config’";

    $stateProvider
      .state("main", {
        url: "/",
        templateUrl: "shared/main.template.html",
        controller: function (SharedService) {
          this.isAdmin = SharedService.getData().isAdmin;
        },
        controllerAs: "vm",
        redirectTo: "main.dashboard",
      })
      .state("main.dashboard", {
        url: "dashboard",
        template: "<dashboard></dashboard>",
        data: {
          pageTitle: "Dashboard",
        },
      })
      .state("main.contact", {
        url: "contact",
        template: "<contact></contact>",
        data: {
          pageTitle: "Contact",
        },
        reloadOnSearch: false,
      })
      .state("main.createContact", {
        url: "contact/create",
        template: "<create-contact></create-contact>",
        data: {
          pageTitle: "Create contact",
        },
      })
      .state("main.editContact", {
        url: "contact/edit/:id",
        template: "<edit-contact></edit-contact>",
        data: {
          pageTitle: "Edit contact",
        },
      })
      .state("main.filterContactLeadSource", {
        url: "contact?leadSource",
        template: "<contact></contact>",
        data: {
          pageTitle: "Contact",
        },
      })
      .state("main.filterContactAssignedTo", {
        url: "contact?assignedTo",
        template: "<contact></contact>",
        data: {
          pageTitle: "Contact",
        },
      })
      .state("main.sales-order", {
        url: "sales-order",
        template: "<sales-order></sales-order>",
        data: {
          pageTitle: "Sales order",
        },
      })
      .state("main.sales-orderCreate", {
        url: "sales-order/create",
        template: "<create-sales-order></create-sales-order>",
        data: {
          pageTitle: "Create sales order",
        },
      })
      .state("main.sales-orderEdit", {
        url: "sales-order/edit/:id",
        template: "<edit-sales-order></edit-sales-order>",
        data: {
          pageTitle: "Edit sales order",
        },
      })
      .state("main.filterStatus", {
        url: "sales-order?status",
        template: "<sales-order></sales-order>",
        data: {
          pageTitle: "Sales order",
        },
      })
      .state("main.user", {
        url: "user",
        template: "<user></user>",
        data: {
          pageTitle: "User management",
        },
      })
      .state("main.createUser", {
        url: "user/create",
        template: "<create-user></create-user>",
        data: {
          pageTitle: "Create user",
        },
      })
      .state("main.editUser", {
        url: "user/edit/:id",
        template: "<edit-user></edit-user>",
        data: {
          pageTitle: "Edit user",
        },
      })
      .state("main.403", {
        url: "403",
        template: "<forbidden></forbidden>",
        data: {
          pageTitle: "Error",
        },
      })
      .state("main.404", {
        url: "/404",
        template: "<not-found></not-found>",
        data: {
          pageTitle: "Error",
        },
      })
      .state("main.changePassword", {
        url: "changePassword",
        template: "<change-password></change-password>",
        data: {
          pageTitle: "Change password",
        },
      })
      .state("main.test", {
        url: "test",
        template: "<test></test>",
        data: {
          pageTitle: "Test",
        },
      })
      .state("login", {
        url: "/login",
        template: "<login></login>",
        data: {
          pageTitle: "Login",
        },
      })
      .state("loginError", {
        url: "/login/:error",
        template: "<login></login>",
        data: {
          pageTitle: "Login",
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
      "$state",
      "$localStorage",
      function ($q, $state, $localStorage) {
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
              $state.go("loginError", { error: 401 });
            }
            return $q.reject(response);
          },
        };
      },
    ]);
  },
]);
