'use strict';

/* Directives */

angular.module('voyeurApp.directives', [])

  .directive("saveFavorite", function (localStorageService) {
    return {
      link: function (scope, element, attr, ctrl) {
        element.on('click', function() {
          console.log('hi');
        });
      }
    };
  })

  .directive("rawResults", function () {
    return {
      link: function (scope, element, attr, ctrl) {
        element.on('click', function() {
          scope.showRaw = true;
          scope.$apply();
          //console.log(scope.showRaw);
        });
      }
    };
  })
  .directive("tableResults", function () {
    return {
      link: function (scope, element, attr, ctrl) {
        element.on('click', function() {
          scope.showRaw = false;
          scope.$apply();

          //console.log(attr.class);
          
        });
      }
    };
  })


  .directive("addColumns", function () {
    return {
      link: function (scope, element, attr, ctrl) {
        element.on('click', function() {
          console.log('hi');
        });
      }
    };
  });