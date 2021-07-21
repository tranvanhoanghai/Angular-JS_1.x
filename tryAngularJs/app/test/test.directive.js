"use strict";

angular.module("test").directive("movieDirective", function () {
  return {
    restrict: "E",
    scope: { movie: "=", rating: "@", display: "&" },
    template:
      "<div>Movie title : {{movie}}</div>" +
      "Type a new movie title : <input type='text' ng-model='movie' />" +
      "<div>Movie rating : {{rating}}</div>" +
      "Rate the movie : <input type='text' ng-model='rating' />" +
      "<div><button ng-click='display(movie)'>View Movie</button></div>" +
      "<div> {{abc}}</div>",

    link: function (scope, element, attrs) {
      scope.abc = "cvcvcvcv";
      scope.display = function (movie) {
        alert("Movie : " + movie);
      };
    },
  };
});
