/*
 * Twitter Bootstrap plugin for AngularJS.
 * Copyright (c) 2016-2018 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';
	const modalModule = angular.module('angularBS.modal', []);
	/**
	 * Modal default configuration
	 */
	modalModule.provider('Modal', function(){
		const Modal = this;
		Modal.config = {
			backdrop: 'static',
			keyboard: true,
			transitionDuration: 300,
			backdropTransitionDuration: 150
		};
		Modal.backdropController = null;
		// noinspection JSUnusedGlobalSymbols
		Modal.$get = function(){
			return Modal;
		};
	});
	/**
	 * @ngdoc component
	 * @name bsModalBackdrop
	 */
	modalModule.component('bsModalBackdrop', {
		template: '<div class="modal-backdrop" ng-class="{\'fade\': bsMCtrl.isAnimated()}"></div>',
		controllerAs: 'bsMCtrl',
		controller: ['$element', '$q', '$timeout', 'ModalBackdrop', function($element, $q, $timeout, ModalBackdrop){
			const ctrl = this;
			/**
			 */
			ctrl.$onInit = function(){
				ModalBackdrop.backdropController = ctrl;
				ctrl.isAnimated = ModalBackdrop.isAnimated;
			};

			ctrl.hide = function(){
				const defered = $q.defer(),
					backdropElement = $element.children();
				backdropElement.removeClass('in');
				if(ctrl.isAnimated()){
					let transitionFinished = false;
					const transition = function(){
						if(!transitionFinished){
							defered.resolve();
							transitionFinished = true;
						}
					};
					backdropElement[0].addEventListener('transitionend', transition);
					$timeout(transition, 150);
				}else{
					defered.resolve();
				}
				return defered.promise;
			};
			/**
			 */
			ctrl.$postLink = function(){
				// wait until 'fade' class is added, we don't use $timeout cause we don't need a digest cycle here
				setTimeout(function(){
					$element.children()[0].offsetWidth; // force reflow
					$element.children().addClass('in');
					ModalBackdrop.shown();
				});
			};
		}]
	});
	/**
	 * @ngdoc factory
	 * @name ModalBackdrop
	 */
	modalModule.factory('ModalBackdrop', ['$document', '$compile', '$rootScope', '$q', function($document, $compile, $rootScope, $q){
		let isVisible = false,
			isAnimated = false,
			backDropPromise,
			openModals = 0;
		const bodyElement = $document.find('body'),
			backdropElement = angular.element('<bs-modal-backdrop ng-if="isVisible()"></bs-modal-backdrop>'),
			backdropScope = $rootScope.$new(true),
			ModalBackdrop = {
				isVisible: function(){
					return isVisible;
				},
				isAnimated: function(){
					return isAnimated;
				},
				show: function(backdrop, animate){
					openModals++;
					backDropPromise = $q.defer();
					isAnimated = !!animate;
					bodyElement.addClass('modal-open');
					if(backdrop && !isVisible){
						isVisible = true;
					}else{
						backDropPromise.resolve();
					}
					return backDropPromise.promise;
				},
				shown: function(){
					backDropPromise.resolve();
				},
				hide: function(){
					openModals--;
					if(openModals < 0){
						openModals = 0;
					}
					if(typeof this.backdropController !== 'undefined' && openModals === 0){
						this.backdropController.hide().then(function(){
							isVisible = false;
							bodyElement.removeClass('modal-open');
						});
					}
				}
			};
		// create backdrop element in body
		backdropScope.isVisible = ModalBackdrop.isVisible;
		$compile(backdropElement)(backdropScope);
		bodyElement.append(backdropElement);
		return ModalBackdrop;
	}]);
	/**
	 * @ngdoc directive
	 * @name bsModal
	 *
	 * @param {expression} bsModal
	 * @param {string|boolean} backdrop
	 * @param {boolean} keyboard
	 */
	modalModule.directive('bsModal', ['$document', function($document){
		return {
			restrict: 'A',
			bindToController: {
				bsModal: '='
			},
			controller: [
				'$scope', '$element', '$attrs', '$timeout', 'Modal', 'ModalBackdrop',
				function($scope, $element, $attrs, $timeout, Modal, ModalBackdrop){
					let backdrop = Modal.config.backdrop,
						keyboard = Modal.config.keyboard;
					const ctrl = this,
						show = function(){
							if(!$element.hasClass('in')){
								$element.css({display: 'block'});
								$element[0].offsetWidth; // force reflow
								ModalBackdrop.show(backdrop, $element.hasClass('fade')).then(function(){
									$element.addClass('in');
								});
							}
						},
						hide = function(){
							if($element.hasClass('in')){
								$element.removeClass('in');
								let transitionEnded = false;
								const callback = function(){
										ModalBackdrop.hide();
										$element.css({display: ''});
									},
									transition = function(){
										if(!transitionEnded){
											$element[0].removeEventListener('transitionend', transition);
											callback();
											transitionEnded = true;
										}
									};
								if($element.hasClass('fade')){
									$element[0].addEventListener('transitionend', transition);
									$timeout(transition, 300);
								}else{
									callback();
								}
							}
						},
						keydown = function(e){
							if(keyboard && e.which === 27){
								ctrl.bsModal = false;
								$scope.$digest();
							}
						};
					//
					$attrs.$observe('backdrop', function(value){
						backdrop = value === 'static' ? 'static' : !(value === 'false' || !value);
					});
					//
					$attrs.$observe('keyboard', function(value){
						keyboard = !!value;
					});
					// backdrop click
					$element.on('click', function(e){
						if(backdrop === true && e.target === $element[0]){ // .modal covers whole page
							ctrl.bsModal = false;
							$scope.$digest();
						}
					});
					// keyboard esc
					$document.on('keydown', keydown);
					/**
					 */
					$scope.$watch(function(){
						return ctrl.bsModal;
					}, function(nV){
						if(nV){
							show();
						}else{
							hide();
						}
					});
					/**
					 */
					ctrl.$onDestroy = function(){
						if(ctrl.bsModal){
							hide();
						}
						$document.off('keydown', keydown);
					};
					ctrl.$scope = $scope;
				}
			]
		};
	}]);
	/**
	 * @ngdoc directive
	 * @name dismiss
	 */
	modalModule.directive('dismiss', [function(){
		// noinspection JSUnusedGlobalSymbols
		return {
			restrict: 'A',
			require: '^bsModal',
			link: function(scope, element, attrs, bsModal){
				element.on('click', function(){
					bsModal.bsModal = false;
					bsModal.$scope.$digest();
				});
			}
		};
	}]);
}();