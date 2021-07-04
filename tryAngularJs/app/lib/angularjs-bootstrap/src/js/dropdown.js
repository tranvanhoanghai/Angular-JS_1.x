/*
 * Twitter Bootstrap plugin for AngularJS.
 * Copyright (c) 2016-2018 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';
	const bsDropdownModule = angular.module('angularBS.dropdown', []);
	/**
	 * @ngdoc directive
	 * @name bsDropdown
	 * @property {expression|boolean} bsDropdown
	 */
	bsDropdownModule.directive('bsDropdown', [function(){
		// noinspection JSUnusedGlobalSymbols
		return {
			restrict: 'A',
			bindToController: {
				bsDropdown: '=?'
			},
			controller: ['$scope', '$document', '$element', function($scope, $document, $element){
				const ctrl = this,
					onClick = function(e){
						if(ctrl.bsDropdown && !$element[0].contains(e.target)){
							ctrl.bsDropdown = false;
							$scope.$digest();
						}
					},
					keydown = function(e){
						if(ctrl.bsDropdown && e.which === 27){
							ctrl.bsDropdown = false;
							$scope.$digest();
							return;
						}
						if(e.which === 38 || e.which === 40){
							const items = $element[0].querySelectorAll('.dropdown-menu li:not(.disabled) a');
							let idx = -1;
							for(let i = 0; i < items.length; i++){
								if(items[i].contains(e.target)){
									idx = i;
									break;
								}
							}
							if(e.which === 38 && idx > 0){
								idx--;
							}else if(e.which === 40 && idx < items.length - 1){
								idx++;
							}
							if(!~idx){
								idx = 0;
							}
							items[idx].focus();
						}
					};
				/**
				 */
				ctrl.$onInit = function(){
					ctrl.bsDropdown = !!ctrl.bsDropdown;
					$element.addClass('dropdown');
				};
				/**
				 */
				$scope.$watch(function(){
					return ctrl.bsDropdown;
				}, function(nV){
					if(nV){
						$element.addClass('open');
					}else{
						$element.removeClass('open');
					}
				});
				/**
				 */
				ctrl.$onDestroy = function(){
					$document.off('click', onClick);
					$document.off('keydown', keydown);
				};
				$document.on('click', onClick);
				$document.on('keydown', keydown);
			}]
		};
	}]);
	/**
	 * @ngdoc directive
	 * @name bsDropdownToggle
	 */
	bsDropdownModule.directive('bsDropdownToggle', [function(){
		// noinspection JSUnusedGlobalSymbols
		return {
			restrict: 'A',
			require: '^bsDropdown',
			link: function(scope, element, attrs, dropdownCtrl){
				element.on('click', function(){
					dropdownCtrl.bsDropdown = !dropdownCtrl.bsDropdown;
					scope.$digest();
				});
			}
		};
	}]);
}();