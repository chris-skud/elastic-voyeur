/**
 * angular-csv module
 * Render a <a href='data:'> link to download a csv file
 *
 * Author: chris-skud - https://github.com/chris-skud
 */
angular.module('angularCsv', []).
  directive('exportCsv', ['ResultsTable', function(ResultsTable) {
    return {
      restrict: 'AC',
      replace: true,
      transclude: true,
      template: '<div class="csv-wrap">' +
        '<div class="element" ng-transclude></div>' +
        '<a class="hidden-link" ng-hide="true" download="data.csv">sdf</a>' +
      '</div>',
      link: function(scope, element, attrs) {
        var subject = angular.element(element.children()[0]),
            link = angular.element(element.children()[1]);

        subject.bind('click', function(e) {
          link[0].href = ResultsTable.getCsvData(); // will want to modularize the entire csv download and pull this object into this module
          link[0].click();
        });
      }
    };
  }]);