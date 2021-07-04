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