/*
 * Twitter Bootstrap plugin for AngularJS.
 * Copyright (c) 2016-2018 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';
	const carouselModule = angular.module('angularBS.carousel', []);
	/**
	 * Carousel config
	 */
	carouselModule.provider('Carousel', function(){
		this.config = {
			interval: 5000,
			pause: 'hover',
			wrap: true,
			keyboard: true
		};
		// noinspection JSUnusedGlobalSymbols
		this.$get = function(){
			return this.config;
		};
	});
	/**
	 * @ngdoc directive
	 * @name bsCarousel
	 *
	 * @param {number} interval
	 * @param {string|null} pause
	 * @param {expression|boolean} wrap
	 * @param {expression|boolean} keyboard
	 */
	carouselModule.directive('bsCarousel', [function(){
		return {
			restrict: 'A',
			bindToController: {
				wrap: '<?',
				keyboard: '<?'
			},
			controller: [
				'$scope', '$element', '$attrs', '$interval', 'Carousel',
				function($scope, $element, $attrs, $interval, Carousel){
					let sliding = false,
						carouselInterval = null;
					const ctrl = this,
						changeSlide = function(nextSlide, direction){
							if(nextSlide !== ctrl.currentSlide && !sliding){
								sliding = true;
								if(typeof direction === 'undefined'){
									direction = nextSlide > ctrl.currentSlide ? 'left' : 'right';
								}
								const next = ctrl.slides[nextSlide],
									active = ctrl.slides[ctrl.currentSlide],
									transition = function(){
										active[0].removeEventListener('transitionend', transition);
										next.removeClass('next prev ' + direction).addClass('active');
										active.removeClass('active ' + direction);
										sliding = false;
									};
								next.addClass(direction === 'left' ? 'next' : 'prev');
								next[0].offsetWidth; // force reflow
								active.addClass(direction);
								next.addClass(direction);
								active[0].addEventListener('transitionend', transition);
								ctrl.currentSlide = nextSlide;
							}
						};
					/**
					 */
					ctrl.$onInit = function(){
						ctrl.slides = [];
						ctrl.currentSlide = -1;
						const interval = 'interval' in $attrs ? parseInt($attrs['interval']) : Carousel.interval,
							pause = 'pause' in $attrs ? $attrs['pause'] === 'hover' : Carousel.pause;
						if(interval){
							const setInterval = () => {
								carouselInterval = $interval(() => {
									ctrl.prevNextSlide(true);
								}, interval);
							};
							if(pause){
								$element.on('mouseenter', () => {
									$interval.cancel(carouselInterval);
								});
								$element.on('mouseleave', setInterval);
							}
						}
					};
					/**
					 */
					ctrl.$onChanges = function(){
						if(typeof ctrl.wrap === 'undefined'){
							ctrl.wrap = Carousel.wrap;
						}
						if(typeof ctrl.keyboard === 'undefined'){
							ctrl.keyboard = Carousel.keyboard;
						}
					};
					/**
					 * @param $element
					 */
					ctrl.register = function($element){
						ctrl.slides.push($element);
						if($element.hasClass('active')){
							if(!!~ctrl.currentSlide){
								ctrl.slides[ctrl.currentSlide].removeClass('active');
							}
							ctrl.currentSlide = ctrl.slides.length - 1;
						}else if(!~ctrl.currentSlide){
							$element.addClass('active');
							ctrl.currentSlide = ctrl.slides.length - 1;
						}
					};
					/**
					 * @param {number} index
					 * @param {string} direction
					 */
					ctrl.slideTo = function(index, direction){
						if(index < 0){
							index = ctrl.slides.length - 1;
						}else if(index >= ctrl.slides.length){
							index = 0;
						}
						changeSlide(index, direction);
					};
					/**
					 * @param {boolean} isNext
					 */
					ctrl.prevNextSlide = function(isNext){
						const nextIndex = isNext ? ctrl.currentSlide + 1 : ctrl.currentSlide - 1;
						if(
							(nextIndex >= ctrl.slides.length || nextIndex < 0)
							&& !ctrl.wrap
						){
							return;
						}
						ctrl.slideTo(nextIndex, isNext ? 'left' : 'right');
					};
					/**
					 * @param $element
					 */
					ctrl.unregister = function($element){
						ctrl.slides.splice(ctrl.slides.indexOf($element, 1));
					};
					/**
					 */
					ctrl.$onDestroy = function(){
						if(carouselInterval !== null){
							$interval.cancel(carouselInterval);
						}
					};
					$element.on('keydown', function(e){
						if(
							!ctrl.keyboard
							|| (e.which !== 37 && e.which !== 39)
							|| /input|textarea/i.test(e.target.tagName)
						){
							return;
						}
						if(e.which === 37){
							ctrl.prevNextSlide(false);
						}else{
							ctrl.prevNextSlide(true);
						}
						$scope.$digest();
						e.preventDefault();
					});
				}
			]
		};
	}]);
	/**
	 * @ngdoc directive
	 * @name bsCarouselItem
	 */
	carouselModule.directive('bsCarouselItem', [function(){
		// noinspection JSUnusedGlobalSymbols
		return {
			restrict: 'A',
			require: '^bsCarousel',
			link: function(scope, element, attrs, ctrl){
				ctrl.register(element);
			},
			controller: ['$element', function($element){
				const ctrl = this;
				ctrl.$onInit = function(){
					$element.addClass('item');
				};
			}]
		};
	}]);
	/**
	 * @ngdoc component
	 * @name bsCarouselIndicators
	 */
	carouselModule.component('bsCarouselIndicators', {
		template: '<ol class="carousel-indicators">' +
			'<li ng-repeat="s in ctrl.carousel.slides" ng-click="ctrl.carousel.slideTo($index)" ' +
			'ng-class="{active: $index === ctrl.carousel.currentSlide}"></li>' +
			'</ol>',
		require: {
			carousel: '^bsCarousel'
		},
		controllerAs: 'ctrl'
	});
	/**
	 * @ngdoc directive
	 * @name bsCarouselNav
	 * @param {string} bsCarouselNav
	 */
	carouselModule.directive('bsCarouselNav', [function(){
		// noinspection JSUnusedGlobalSymbols
		return {
			restrict: 'A',
			require: '^bsCarousel',
			link: function(scope, element, attrs, ctrl){
				element.on('click', function(){
					ctrl.prevNextSlide(attrs['bsCarouselNav'] === 'right');
					scope.$digest();
				});
			}
		};
	}]);
}();
/*
 * Twitter Bootstrap plugin for AngularJS.
 * Copyright (c) 2016-2018 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';
	const collapseModule = angular.module('angularBS.collapse', []);
	/**
	 * @ngdoc directive
	 * @name bsCollapseGroup
	 */
	collapseModule.directive('bsCollapseGroup', [function(){
		return {
			restrict: 'A',
			controller: [function(){
				const ctrl = this,
					children = [];
				/**
				 * @param bsCollapseCtrl
				 */
				ctrl.register = function(bsCollapseCtrl){
					children.push(bsCollapseCtrl);
				};
				/**
				 * @param bsCollapseCtrl
				 */
				ctrl.unregister = function(bsCollapseCtrl){
					children.splice(children.indexOf(bsCollapseCtrl), 1);
				};
				/**
				 * @param invokingCtrl
				 */
				ctrl.expand = function(invokingCtrl){
					for(let c = 0; c < children.length; c++){
						if(children[c] !== invokingCtrl){
							children[c].bsCollapse = true;
						}
					}
				};
			}]
		};
	}]);
	/**
	 * @ngdoc directive
	 * @name bsCollapse
	 *
	 * @param {expression|boolean} bsCollapse
	 */
	collapseModule.directive('bsCollapse', [function(){
		// noinspection JSUnusedGlobalSymbols
		return {
			restrict: 'A',
			bindToController: {
				bsCollapse: '=?'
			},
			require: ['bsCollapse', '?^bsCollapseGroup'],
			link: function(scope, element, attrs, ctrl){
				if(ctrl[1] !== null){
					ctrl[1].register(ctrl[0]);
					ctrl[0].group = ctrl[1];
					scope.$on('destroy', () => {
						ctrl[1].unregister(ctrl[0]);
					});
				}
			},
			controller: ['$scope', '$element', '$animateCss', function($scope, $element, $animateCss){
				const ctrl = this,
					expand = function(){
						if(!$element.hasClass('in')){
							$element.removeClass('collapse').addClass('collapsing');
							if($animateCss){
								$animateCss($element, {
									addClass: 'in',
									easing: 'ease',
									to: {
										height: $element[0].scrollHeight + 'px'
									}
								}).start()['finally'](() => {
									$element.removeClass('collapsing').addClass('collapse').css({height: 'auto'});
								});
							}
						}
					},
					collapse = function(){
						if($element.hasClass('in')){
							$element.css({
								height: $element[0].scrollHeight + 'px'
							}).removeClass('collapse').addClass('collapsing');
							$animateCss($element, {
								removeClass: 'in',
								to: {height: '0'}
							}).start()['finally'](() => {
								$element.css({height: 0});
								$element.removeClass('collapsing').addClass('collapse');
							});
						}
					};
				/**
				 */
				ctrl.$onInit = function(){
					if(ctrl.bsCollapse){
						$element.removeClass('in collapsing').addClass('collapse');
						$element.css({height: 0});
					}else{
						$element.removeClass('collapsing').addClass('collapse in');
					}
				};
				/**
				 */
				$scope.$watch(() => {
					return ctrl.bsCollapse;
				}, (nV) => {
					ctrl.bsCollapse = !!nV;
					if(ctrl.bsCollapse){
						collapse();
					}else{
						expand();
						if(ctrl.group){
							ctrl.group.expand(ctrl);
						}
					}
				})
			}]
		};
	}]);
}();
/*
 * Twitter Bootstrap plugin for AngularJS.
 * Copyright (c) 2016-2018 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
angular.module('angularBS', [
	'angularBS.modal', 'angularBS.dropdown', 'angularBS.tooltip', 'angularBS.popover', 'angularBS.collapse',
	'angularBS.carousel'
]);
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
/*
 * Twitter Bootstrap plugin for AngularJS.
 * Copyright (c) 2016-2018 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';
	/**
	 * angularBS Service
	 */
	angular.module('angularBS.helpers', []).service('angularBS', [function(){
		const angularBS = this;
		/**
		 * Get element width, height, position from top and left of document/window,
		 * @param element
		 * @returns {{width: number, height: number, top: number, left: number}}
		 */
		angularBS.offset = function(element){
			const elemBCR = element.getBoundingClientRect();
			return {
				width: Math.round(angular.isNumber(elemBCR.width) ? elemBCR.width : element.offsetWidth),
				height: Math.round(angular.isNumber(elemBCR.height) ? elemBCR.height : element.offsetHeight),
				top: Math.round(elemBCR.top + (window.pageYOffset || document.documentElement.scrollTop)),
				left: Math.round(elemBCR.left + (window.pageXOffset || document.documentElement.scrollLeft))
			};
		};
		/**
		 * Position element aside of positionTo on given side (placement)
		 * @param element
		 * @param positionTo
		 * @param placement
		 * @param [boundaryElement] - defaults to document|window
		 * @returns {{top: number, left: number, position: string}}
		 */
		angularBS.positionElement = function(element, positionTo, placement, boundaryElement){
			placement = placement.split(' ');
			let top = 0, left = 0,
				arrowTop = '50%',
				realPlacement = "left",
				offset = angularBS.offset(element[0]);
			const offsetTo = angularBS.offset(positionTo[0]),
				placements = ["right", "top", "bottom"],
				auto = !!~placement.indexOf("auto"),
				calcPosition = function(){
					switch(realPlacement){
						case "bottom":
							top = (offsetTo.top + offsetTo.height);
							left = ((offsetTo.left + (offsetTo.width / 2)) - (offset.width / 2));
							break;
						case "top":
							top = (offsetTo.top - offset.height);
							left = ((offsetTo.left + (offsetTo.width / 2)) - (offset.width / 2));
							break;
						case "left":
							top = (offsetTo.top + ((offsetTo.height - offset.height) / 2));
							left = (offsetTo.left - offset.width);
							break;
						case "right":
							top = (offsetTo.top + ((offsetTo.height - offset.height) / 2));
							left = (offsetTo.left + offsetTo.width);
							break;
					}
					element.removeClass('top left right bottom').addClass(realPlacement);
					// check to see if element has been resized after adding the placement
					let newOffset = angularBS.offset(element[0]);
					if(newOffset.height !== offset.height || newOffset.width !== offset.width){
						offset = newOffset;
						calcPosition();
					}
				};
			for(let p = 0; p < placements.length; p++){
				if(!!~placement.indexOf(placements[p])){
					realPlacement = placements[p];
					break;
				}
			}
			calcPosition();
			// get boundary offset
			const bo = typeof boundaryElement !== 'undefined' ? angularBS.offset(boundaryElement[0]) : {
				top: window.pageYOffset || document.documentElement.scrollTop,
				left: 0,
				width: Math.max(window.innerWidth, document.body.clientWidth),
				height: Math.max(window.innerHeight, document.body.clientHeight)
			};
			// change side if element would be outside of given viewport
			if(auto){
				let newPlacement = realPlacement;
				switch(realPlacement){
					case "left":
						if(left < bo.left){
							newPlacement = "right";
						}
						break;
					case "right":
						if(left + offset.width + 10 > bo.left + bo.width){
							newPlacement = "left";
						}
						break;
					case "bottom":
						if(top + offset.height + 10 > bo.top + bo.height){
							newPlacement = "top";
						}
						break;
					case "top":
						if(top < bo.top){
							newPlacement = "bottom";
						}
						break;
				}
				if(newPlacement !== realPlacement){
					realPlacement = newPlacement;
					calcPosition();
				}
			}
			// adjust arrow position
			const arrow = element.find('.arrow');
			if(typeof arrow !== 'undefined'){
				switch(realPlacement){
					case "left":
					case "right":
						if(top < bo.top){
							top = bo.top;
							arrowTop = offsetTo.top + offsetTo.height / 2;
							arrowTop += 'px';
						}else if(top + offset.height > bo.top + bo.height){
							top = bo.top + bo.height - offset.height;
							arrowTop = offsetTo.top + offsetTo.height / 2 - top;
							if(arrowTop > offset.height - 15){
								arrowTop = offset.height - 15;
							}
							arrowTop += 'px';
						}
						arrow.css('top', arrowTop);
						break;
					case "bottom":
						arrow.css('top', '');
						break;
					case "top":
						arrow.css('top', 'auto');
						break;
				}
			}
			// apply element position
			element.css({
				top: top + 'px',
				left: left + 'px'
			});
		};
	}]);
}();
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