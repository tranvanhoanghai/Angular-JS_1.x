(function () {
  "use strict";

  angular.module("sidebar").component("sidebars", {
    templateUrl: "shared/sidebar/sidebar.template.html",
    controller: controllerFunction,
  });
  controllerFunction.$inject = ["$scope", "SidebarService"];
  function controllerFunction($scope, SidebarService) {
    var vm = this;
    var sidebar = SidebarService.getSideBar();
    vm.sideBarMenu = sidebar.sideBarMenu;
    vm.home = sidebar.menuItem.home;
  }
})();
