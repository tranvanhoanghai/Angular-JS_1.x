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
        url: "main.dashboard",
        icon: "fa fa-th-large",
      };
      item.contact = {
        id: "contact",
        title: "MENU.CONTACT",
        url: "main.contact",
        icon: "fa fa-address-book",
      };
      item.salesOrder = {
        id: "salesOrder",
        title: "MENU.SALES_ORDER",
        url: "main.sales-order",
        icon: "fa fa-cart-plus",
      };
      item.user = {
        id: "user",
        title: "MENU.USER_MANAGEMENT",
        url: "main.user",
        icon: "fa fa-users",
      };
      if ($localStorage.data) {
        if ($localStorage.data.isAdmin === true) {
          sideBarMenu.menuItems = [
            item.dashboard,
            item.contact,
            item.salesOrder,
            item.user,
          ];
        } else {
          sideBarMenu.menuItems = [
            item.dashboard,
            item.contact,
            item.salesOrder,
          ];
        }
      }

      return {
        sideBarMenu: sideBarMenu,
        menuItem: item,
      };
    }
  }
})();
