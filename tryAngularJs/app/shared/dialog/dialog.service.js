"use strict";

angular.module("share").service("DialogService", function ($uibModal) {
  this.showDialog = function (callback, dataTile, id) {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: "modal-title",
      ariaDescribedBy: "modal-body",
      templateUrl: "shared/dialog/dialog.template.html",
      controller: function ($uibModalInstance, data, $scope) {
        $scope.data = data;

        $scope.ok = function () {
          id ? callback(id) : callback();
          $uibModalInstance.close();
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss("cancel");
        };
      },
      // size: size,
      resolve: {
        data: function () {
          return dataTile;
        },
      },
    });

    modalInstance.result.then(function () {
      // alert("now I'll close the modal");
    });
  };
});
