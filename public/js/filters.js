'use strict';
/* Filters */
angular.module('voyeurApp.filters', [])
  .filter('startFrom', function() {
    return function(input, start) {         
      
      // check we have a valid array
      if (angular.isArray(input)) {
        return input.slice(start);
      }
      else {
        return []; // just pass the template an empty array if non-array type passed
      }
    };
  });