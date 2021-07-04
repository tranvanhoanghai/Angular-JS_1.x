/*
 * Twitter Bootstrap plugin for AngularJS.
 * Copyright (c) 2016-2018 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';
	const popoverModule = angular.module('angularBS.popover', ['angularBS.helpers']);
	/**
	 * Popover default config
	 */
	popoverModule.provider('Popover', function(){
		this.config = {
			animation: true,
			delay: 0,
			html: false,
			placement: 'right',
			title: '',
			content: '',
			trigger: 'click'
		};
		// noinspection JSUnusedGlobalSymbols
		this.$get = function(){
			return this.config;
		};
	});
	/**
	 * @ngdoc component
	 * @name bsPopoverTitle
	 * @description contents of this element would be transcluded to .popover-title element
	 */
	/**
	 * @ngdoc component
	 * @name bsPopoverContent
	 * @description contents of this element would be transcluded to .popover-content element
	 */
	/**
	 * @ngdoc component
	 * @name bsPopover
	 *
	 * @param {expression|boolean} visible
	 * @param {expression|boolean} animation
	 * @param {expression|number} delay
	 * @param {expression} parentElement
	 * @param {expression} boundary
	 * @param {string} placement
	 */
	popoverModule.component('bsPopover', {
		template: '<div class="popover" ' +
			'ng-class="{\'fade\': bsPpCtrl.animation, \'in\': bsPpCtrl.fadeIn}" ' +
			'style="display: {{bsPpCtrl.visible || bsPpCtrl.fadeIn ? \'block\' : \'none\'}}" ' +
			'ng-show="bsPpCtrl.visible || bsPpCtrl.fadeIn">' +
			'<div class="arrow"></div>' +
			'<div class="popover-title" ng-transclude="title" ng-show="bsPpCtrl.titleVisible">{{bsPpCtrl.defaultTitle}}</div>' +
			'<div class="popover-content" ng-transclude="content" ng-show="bsPpCtrl.contentVisible">{{bsPpCtrl.defaultContent}}</div>' +
			'</div>',
		controllerAs: 'bsPpCtrl',
		bindings: {
			visible: '<',
			animation: '<',
			delay: '<',
			parentElement: '<',
			boundary: '<'
		},
		transclude: {
			title: '?bsPopoverTitle',
			content: '?bsPopoverContent'
		},
		controller: [
			'$scope', '$element', '$attrs', '$timeout', 'Popover', 'angularBS',
			function($scope, $element, $attrs, $timeout, Popover, angularBS){
				const ctrl = this;
				let delay, timeout = null;
				//
				ctrl.$onInit = function(){
					if(typeof ctrl.animation === 'undefined'){
						ctrl.animation = Popover.animation;
					}
					if(typeof ctrl.delay === 'undefined'){
						ctrl.delay = Popover.delay;
					}
					ctrl.placement = Popover.placement;
					ctrl.defaultTitle = Popover.title;
					ctrl.defaultContent = Popover.content;
				};
				//
				ctrl.$onChanges = function(changes){
					if(typeof changes.delay !== 'undefined'){
						delay = typeof changes.delay.currentValue !== 'undefined'
							? changes.delay.currentValue : Popover.delay;
					}
					if(
						typeof changes.visible !== 'undefined'
						&& changes.visible.previousValue !== changes.visible.currentValue
					){
						ctrl.visible = changes.visible.currentValue !== false;
						if(typeof delay === 'object'){
							delay = delay[ctrl.visible ? 'show' : 'hide'] || Popover.delay;
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
								}else{ // static popover
									$element.children().removeClass('left right top bottom').addClass(ctrl.placement);
								}
								ctrl.fadeIn = ctrl.visible;
							}else if(ctrl.animation && !changes.visible.isFirstChange()){
								// properly display fade out animation
								ctrl.visible = true;
								ctrl.fadeIn = false;
								const transition = function(){
									ctrl.visible = false;
									$element.children()[0].removeEventListener('transitionend', transition);
									$scope.$digest();
								};
								$element.children()[0].addEventListener('transitionend', transition);
							}else{
								ctrl.fadeIn = false;
							}
						}, delay);
					}
				};
				//
				$attrs.$observe('placement', function(value){
					ctrl.placement = value;
				});
				// check if title & content are not empty
				const title = angular.element($element[0].querySelector('.popover-title')),
					content = angular.element($element[0].querySelector('.popover-content'));
				$scope.$watch(function(){
					return title.text().trim();
				}, function(nV){
					ctrl.titleVisible = nV !== '';
				});
				$scope.$watch(function(){
					return content.text().trim();
				}, function(nV){
					ctrl.contentVisible = nV !== '';
				});
			}
		]
	});
	/**
	 * @ngdoc directive
	 * @name bsPopoverBoundary
	 */
	popoverModule.directive('bsPopoverBoundary', [function(){
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
	 * @name bsPopoverToggle
	 *
	 * @param {expression|boolean} bsPopoverToggle
	 * @param {expression|boolean} animation
	 * @param {expression|number} delay
	 * @param {expression|boolean} html
	 * @param {string} placement
	 * @param {string} title
	 * @param {string} content
	 * @param {string} trigger
	 */
	popoverModule.directive('bsPopoverToggle', [function(){
		// noinspection JSUnusedGlobalSymbols
		return {
			restrict: 'A',
			bindToController: {
				bsPopoverToggle: '=?',
				animation: '<?',
				delay: '<?',
				html: '<?'
			},
			require: ['?^bsPopoverBoundary', 'bsPopoverToggle'],
			controllerAs: 'bsPpCtrl',
			link: function(scope, element, attrs, ctrl){
				ctrl[1].boundary = ctrl[0] === null ? null : ctrl[0].$element;
			},
			controller: [
				'$scope', '$element', '$attrs', '$compile', '$document', '$sce', 'Popover',
				function($scope, $element, $attrs, $compile, $document, $sce, Popover){
					const ctrl = this,
						documentClick = function(e){
							if(!$element[0].contains(e.target)){
								ctrl.bsPopoverToggle = false;
								$scope.$digest();
							}
						};
					let popoverElement = null;
					//
					ctrl.$onInit = function(){
						if(typeof ctrl.bsPopoverToggle === 'undefined'){
							ctrl.bsPopoverToggle = false;
						}
						const triggers = (typeof $attrs.trigger === 'undefined' ? Popover.trigger : $attrs.trigger)
								.split(' '),
							open = function(){
								ctrl.bsPopoverToggle = true;
								$scope.$digest();
							},
							close = function(){
								ctrl.bsPopoverToggle = false;
								$scope.$digest();
							};
						if(!!~triggers.indexOf('hover')){
							$element.on('mouseenter', open);
							$element.on('mouseleave', close);
						}
						if(!!~triggers.indexOf('focus')){
							$element.on('click', open);
							$document.on('click', documentClick);
						}
						if(!!~triggers.indexOf('click')){
							$element.on('click', function(){
								ctrl.bsPopoverToggle = !ctrl.bsPopoverToggle;
								$scope.$digest();
							});
						}
						ctrl.placement = typeof $attrs.placement === 'undefined' ? Popover.placement : $attrs.placement;
						ctrl.$element = $element;
						ctrl.title = $sce.trustAsHtml(Popover.title);
						ctrl.content = $sce.trustAsHtml(Popover.content);
					};
					//
					$attrs.$observe('title', function(value){
						if(!(typeof ctrl.html !== 'undefined' && ctrl.html) || Popover.html){
							value = value.replace(/[\u00A0-\u9999<>&'"]/gim, function(i){
								return '&#' + i.charCodeAt(0) + ';'
							});
						}
						ctrl.title = $sce.trustAsHtml(value);
						$element.attr('title', '');
					});
					//
					$attrs.$observe('content', function(value){
						if(!(typeof ctrl.html !== 'undefined' && ctrl.html) || Popover.html){
							value = value.replace(/[\u00A0-\u9999<>&'"]/gim, function(i){
								return '&#' + i.charCodeAt(0) + ';'
							});
						}
						ctrl.content = $sce.trustAsHtml(value);
					});
					//
					const watcher = $scope.$watch(function(){
						return ctrl.bsPopoverToggle;
					}, function(nV){
						if(nV){
							$compile(
								'<bs-popover visible="bsPpCtrl.bsPopoverToggle" animation="bsPpCtrl.animation" ' +
								'delay="bsPpCtrl.delay" placement="{{bsPpCtrl.placement}}" ' +
								'parent-element="bsPpCtrl.$element" ' +
								'boundary="bsPpCtrl.boundary">' +
								'<bs-popover-title ng-bind-html="bsPpCtrl.title"></bs-popover-title>' +
								'<bs-popover-content ng-bind-html="bsPpCtrl.content"></bs-popover-content>' +
								'</bs-popover>'
							)($scope.$new(), function(newElement, newScope){
								newScope.bsPpCtrl = ctrl;
								$document.find('body').append(newElement);
								popoverElement = newElement;
							});
							watcher(); // create popover element once and leave it be
						}
					});
					//
					ctrl.$onDestroy = function(){
						if(popoverElement !== null){
							popoverElement.remove();
						}
						$document.off('click', documentClick);
					};
				}
			]
		};
	}]);
}();