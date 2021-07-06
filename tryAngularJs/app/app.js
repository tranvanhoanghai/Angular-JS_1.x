"use strict";

app.config([
  "$locationProvider",
  "$routeProvider",
  "$httpProvider",
  "cssInjectorProvider",
  "NotificationProvider",
  function (
    $locationProvider,
    $routeProvider,
    $httpProvider,
    cssInjectorProvider,
    NotificationProvider
  ) {
    $locationProvider.hashPrefix("!");
    cssInjectorProvider.setSinglePageMode(true);

    // $routeProvider.otherwise({ redirectTo: "/view1" });

    $routeProvider
      .when("/view1", {
        template: "<view1></view1>", //crud demo (<view1></view1> is name component)
      })
      .when("/view2", {
        template: "<view2></view2>",
      })
      .when("/dashboard", {
        template: "<dashboard></dashboard>",
      })
      .when("/contact", {
        template: "<contact></contact>",
      })
      .when("/sales-order", {
        template: "<sales-order></sales-order>",
      })
      .when("/user", {
        template: "<user></user>",
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

    // $httpProvider.interceptors.push([
    //   "$q",
    //   "$location",
    //   "$localStorage",
    //   function ($q, $location, $localStorage) {
    //     return {
    //       request: function (config) {
    //         config.headers = config.headers || {};
    //         if ($localStorage.token) {
    //           config.headers.Authorization = "Bearer " + $localStorage.token;
    //         }
    //         return config;
    //       },
    //       responseError: function (response) {
    //         if (response.status === 401 || response.status === 403) {
    //           $location.path("/login");
    //         }
    //         return $q.reject(response);
    //       },
    //     };
    //   },
    // ]);
  },
]);
// .run([
//   "$rootScope",
//   "$location",
//   "$cookieStore",
//   "$http",
//   function ($rootScope, $location, $cookieStore, $http) {
//     $rootScope.globals = $cookieStore.get("globals") || {};
//     if ($rootScope.globals.currentUser) {
//       $http.defaults.headers.common["Authorization"] =
//         "Basic " + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//     }

//     $rootScope.$on("$locationChangeStart", function (event, next, current) {
//       if ($location.path() !== "/login" && !$rootScope.globals.currentUser) {
//         $location.path("/login");
//       }
//     });
//   },
// ]);
