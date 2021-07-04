/*
 * Twitter Bootstrap plugin for AngularJS.
 * Copyright (c) 2016-2018 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
const tooltipModule = angular.module('angularBS.tooltip', ['angularBS.helpers']);
!function(){
	'use strict';
	/**
	 * Tooltip default configuration
	 */
	tooltipModule.provider('Tooltip', function(){
		this.config = {
			animation: true,
			delay: 0,
			placement: 'bottom',
			html: false,
			title: "",
			trigger: 'hover focus'
		};
		// noinspection JSUnusedGlobalSymbols
		this.$get = function(){
			return this.config;
		};
	});
	/**
	 * @ngdoc component
	 * @name bsTooltip
	 *
	 * @param {expression|boolean} visible
	 * @param {expression|boolean} animation
	 * @param {expression|number} delay
	 * @param {expression} parentElement
	 * @param {expression} boundary
	 * @param {string} placement
	 */
	tooltipModule.component('bsTooltip', {
		template: '<div class="tooltip" ' +
			'ng-class="{\'fade\': bsTpCtrl.animation, \'in\': bsTpCtrl.fadeIn}" ' +
			'ng-show="bsTpCtrl.visible || bsTpCtrl.fadeIn">' +
			'<div class="tooltip-arrow" ng-show="bsTpCtrl.titleVisible"></div>' +
			'<div class="tooltip-inner" ng-transclude ng-show="bsTpCtrl.titleVisible">{{bsTpCtrl.defaultTitle}}</div>' +
			'</div>',
		controllerAs: 'bsTpCtrl',
		bindings: {
			visible: '<',
			animation: '<',
			delay: '<',
			parentElement: '<',
			boundary: '<'
		},
		transclude: true,
		controller: [
			'$scope', '$element', '$attrs', '$timeout', 'Tooltip', 'angularBS',
			function($scope, $element, $attrs, $timeout, Tooltip, angularBS){
				const ctrl = this;
				let delay, timeout = null;
				//
				ctrl.$onInit = function(){
					if(typeof ctrl.animation === 'undefined'){
						ctrl.animation = Tooltip.animation;
					}
					if(typeof ctrl.delay === 'undefined'){
						ctrl.delay = Tooltip.delay;
					}
					ctrl.placement = Tooltip.placement;
					ctrl.defaultTitle = Tooltip.title;
					$element.children().css({top: 0});
				};
				//
				ctrl.$onChanges = function(changes){
					if(typeof changes.delay !== 'undefined'){
						delay = typeof changes.delay.currentValue !== 'undefined'
							? changes.delay.currentValue : Tooltip.delay;
					}
					if(
						typeof changes.visible !== 'undefined'
						&& changes.visible.previousValue !== changes.visible.currentValue
					){
						ctrl.visible = changes.visible.currentValue !== false;
						if(typeof delay === 'object'){
							delay = delay[ctrl.visible ? 'show' : 'hide'] || Tooltip.delay;
						}
						if(timeout !== null){
							$timeout.cancel(timeout);
						}
						timeout = $timeout(function(){
							timeout = null;
							if(ctrl.visible){
								if(ctrl.parentElement){
									angularBS.positionElement(
										$element.children(), ctrl.parentElement, ctrl.placement,
										ctrl.boundary !== null ? ctrl.boundary : undefined
									);
								}else{ // static tooltip
									$element.children().removeClass('left right top bottom').addClass(ctrl.placement);
								}
								ctrl.fadeIn = ctrl.visible;
							}else{
								// properly display fade out animation
								ctrl.visible = true;
								ctrl.fadeIn = false;
								const transition = function(){
									ctrl.visible = false;
									$element.children()[0].removeEventListener('transitionend', transition);
									$scope.$digest();
								};
								$element.children()[0].addEventListener('transitionend', transition);
							}
						}, delay);
					}
				};
				//
				$attrs.$observe('placement', function(value){
					ctrl.placement = value;
				});
				// check if title is not empty
				const title = angular.element($element[0].querySelector('.tooltip-inner'));
				$scope.$watch(function(){
					return title.text().trim();
				}, function(nV){
					ctrl.titleVisible = nV !== '';
				});
			}
		]
	});
	/**
	 * @ngdoc directive
	 * @name bsTooltipBoundary
	 */
	tooltipModule.directive('bsTooltipBoundary', [function(){
		// noinspection JSUnusedGlobalSymbols
		return {
			restrict: 'A',
			controller: ['$element', function($element){
				this.$element = $element;
			}]
		};
	}]);
	/**
	 * @ngdoc directive
	 * @name bsTooltipToggle
	 *
	 * @param {expression|boolean} bsTooltipToggle
	 * @param {expression|boolean} animation
	 * @param {expression|number} delay
	 * @param {expression|boolean} html
	 * @param {string} placement
	 * @param {string} title
	 * @param {string} trigger
	 */
	tooltipModule.directive('bsTooltipToggle', [function(){
		// noinspection JSUnusedGlobalSymbols
		return {
			restrict: 'A',
			bindToController: {
				bsTooltipToggle: '=?',
				animation: '<?',
				delay: '<?',
				html: '<?'
			},
			require: ['?^bsTooltipBoundary', 'bsTooltipToggle'],
			controllerAs: 'bsTpCtrl',
			link: function(scope, element, attrs, ctrl){
				ctrl[1].boundary = ctrl[0] === null ? null : ctrl[0].$element;
			},
			controller: [
				'$scope', '$element', '$attrs', '$compile', '$document', '$sce', 'Tooltip',
				function($scope, $element, $attrs, $compile, $document, $sce, Tooltip){
					const ctrl = this;
					let tooltipElement = null;
					//
					ctrl.$onInit = function(){
						if(typeof ctrl.bsTooltipToggle === 'undefined'){
							ctrl.bsTooltipToggle = false;
						}
						const triggers = (typeof $attrs.trigger === 'undefined' ? Tooltip.trigger : $attrs.trigger)
								.split(' '),
							open = function(){
								ctrl.bsTooltipToggle = true;
								$scope.$digest();
							},
							close = function(){
								ctrl.bsTooltipToggle = false;
								$scope.$digest();
							};
						if(!!~triggers.indexOf('hover')){
							$element.on('mouseenter', open);
							$element.on('mouseleave', close);
						}
						if(!!~triggers.indexOf('focus')){
							$element.on('focus', open);
							$element.on('blur', close);
						}
						if(!!~triggers.indexOf('click')){
							$element.on('click', function(){
								ctrl.bsTooltipToggle = !ctrl.bsTooltipToggle;
								$scope.$digest();
							});
						}
						ctrl.placement = typeof $attrs.placement === 'undefined' ? Tooltip.placement : $attrs.placement;
						ctrl.$element = $element;
						ctrl.title = $sce.trustAsHtml(Tooltip.title);
					};
					//
					$attrs.$observe('title', function(value){
						if(!(typeof ctrl.html !== 'undefined' && ctrl.html) || Tooltip.html){
							value = value.replace(/[\u00A0-\u9999<>&'"]/gim, function(i){
								return '&#' + i.charCodeAt(0) + ';'
							});
						}
						ctrl.title = $sce.trustAsHtml(value);
						$element.attr('title', '');
					});
					//
					const watcher = $scope.$watch(function(){
						return ctrl.bsTooltipToggle;
					}, function(nV){
						if(nV){
							$compile(
								'<bs-tooltip visible="bsTpCtrl.bsTooltipToggle" animation="bsTpCtrl.animation" ' +
								'delay="bsTpCtrl.delay" placement="{{bsTpCtrl.placement}}" ' +
								'parent-element="bsTpCtrl.$element" ' +
								'boundary="bsTpCtrl.boundary">' +
								'<span ng-bind-html="bsTpCtrl.title"></span></bs-tooltip>'
							)($scope.$new(), function(newElement, newScope){
								newScope.bsTpCtrl = ctrl;
								$document.find('body').append(newElement);
								tooltipElement = newElement;
							});
							watcher(); // create tooltip element once and leave it be
						}
					});
					//
					ctrl.$onDestroy = function(){
						if(tooltipElement !== null){
							tooltipElement.remove();
						}
					};
				}
			]
		};
	}]);
	/**
	 * @ngdoc factory
	 * @name bsTooltipFactory
	 */
	tooltipModule.factory('bsTooltipFactory', ['$injector', function($injector){
		return {
			customBindingDirective: function(){
				return {
					restrict: 'A',
					require: '?^bsTooltipBoundary',
					compile: function(element, attrs){
						if(!('bsTooltipToggle' in attrs) && !('bsPopoverToggle' in attrs)){
							return function(scope, element, attrs, ctrl){
								const directive = $injector.get('bsTooltipToggleDirective')[0],
									bsTooltipToggleCtrl = $injector.instantiate(directive.controller, {
										'$scope': scope,
										'$element': element,
										'$attrs': attrs
									});
								directive.compile(
									element, scope, attrs, [ctrl, bsTooltipToggleCtrl]
								)(
									scope, element, attrs, [ctrl, bsTooltipToggleCtrl]
								);
								bsTooltipToggleCtrl.$onInit();
								scope.$on('$destroy', function(){
									bsTooltipToggleCtrl.$onDestroy();
								});
							}
						}
					}
				}
			}
		};
	}]);
}();