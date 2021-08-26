(function () {
  "use strict";

  angular.module("sidebar").factory("SidebarService", serviceFunction);
  serviceFunction.$inject = ["$localStorage"];

  function serviceFunction($localStorage) {
    var factory = { getSideBar };

    return factory;

    ////////////////////////////////

    function getSideBar() {
      var sideBarMenu = {},
        item = {};

      sideBarMenu = {
        // id: "id",
        // title: "title",
        menuItems: [],
        // disabled: true,
      };
      item.dashboard = {
        id: "dashboard",
        title: "MENU.DASHBOARD",
        state: "main.dashboard",
        icon: "bx bx-grid-alt",
      };
      item.contact = {
        id: "contact",
        title: "MENU.CONTACT",
        state: "main.contact",
        icon: "bx bx-chat",
      };
      item.salesOrder = {
        id: "salesOrder",
        title: "MENU.SALES_ORDER",
        state: "main.sales-order",
        icon: "bx bx-cart-alt",
      };
      item.user = {
        id: "user",
        title: "MENU.USER_MANAGEMENT",
        state: "main.user",
        icon: "bx bx-user",
      };
      if ($localStorage.data) {
        $localStorage.data.isAdmin === true
          ? (sideBarMenu.menuItems = [
              item.dashboard,
              item.contact,
              item.salesOrder,
              item.user,
            ])
          : (sideBarMenu.menuItems = [
              item.dashboard,
              item.contact,
              item.salesOrder,
            ]);
      }

      return {
        sideBarMenu: sideBarMenu,
        menuItem: item,
      };
    }
  }
})();
