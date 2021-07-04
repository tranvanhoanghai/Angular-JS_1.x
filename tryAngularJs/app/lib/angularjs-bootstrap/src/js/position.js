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