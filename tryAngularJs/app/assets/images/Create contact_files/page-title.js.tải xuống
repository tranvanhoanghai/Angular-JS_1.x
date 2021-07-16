/*!
 * @module ui-router-page-title
 * @description Page Title directive for angular-ui-router
 * @version v1.0.13
 * @link https://github.com/sibiraj-s/ui-router-page-title
 * @licence MIT License, https://opensource.org/licenses/MIT
 */

(function() {
  'use strict';
  var $uiRouterTitleDirective;

  $uiRouterTitleDirective = function($timeout, $transitions) {
    return {
      restrict: 'A',
      scope: {},
      link: function(_, element) {
        $transitions.onStart({}, function(trans) {
          var getTitle, title;
          getTitle = function() {
            var _title;
            _title = element[0].innerText ? element[0].innerText : 'Default Title';
            return _title;
          };
          title = trans.to().data && trans.to().data.pageTitle ? trans.to().data.pageTitle : getTitle();
          $timeout((function() {
            element.text(title);
          }), 0, false);
        });
      }
    };
  };

  $uiRouterTitleDirective.$inject = ['$timeout', '$transitions'];

  angular.module('uiRouterTitle', []).directive('pageTitle', $uiRouterTitleDirective);

}).call(this);
