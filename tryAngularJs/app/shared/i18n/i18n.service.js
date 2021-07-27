"use strict";

angular
  .module("i18n")
  .service(
    "translationService",
    function ($localStorage, $resource, $rootScope) {
      this.getTranslation = function (language) {
        var languageFilePath =
          "shared/i18n/translation/translation_" + language + ".json";

        $resource(languageFilePath).get(function (data) {
          $localStorage.i18n = data;
        });
      };

      // $rootScope.data = {
      //   name: $localStorage.i18n.CONTACT.NAME,
      //   salutation: $localStorage.i18n.SALUTATION,
      // };
      // console.log($rootScope.data.name);
    }
  );
