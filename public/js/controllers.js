'use strict';

/* Controllers */
angular.module('voyeureApp.controllers', []).
  
  controller('QueryCtrl', function QueryCtrl($scope, Query, QueryRequest, QueryResults, PropertyPathResolver, ResultColumns) {
    $scope.queryObj = Query;
    $scope.loading = false;
    
    $scope.resultKeys = []; // can probably remove this and just set ResultColumns
    $scope.queryResults = QueryResults;
    $scope.resultColumns = ResultColumns;
    $scope.noResults = true;
    
    //$scope.esUri = 'http://es.production.com/_search'; // if your server supports jsonp and doesn't require auth.
    //$scope.esUri = 'http://localhost:9200/_search'; // you've got a local es instance running.
    //$scope.esUri = 'http://localhost:3000/proxy'; // you need to proxy for cross-origin and/or auth reasons.
    $scope.esUri = 'http://localhost:3000/dummydata'; // dummy data for testing.


    $scope.aceLoaded = function(_editor) {
      _editor.on("blur", function() {
        try {
          $scope.queryObj.set(_editor.getValue());

        } 
        catch (e) {
          // An error has occured, handle it, by e.g. logging it
          console.log('error: ' + e.toString())
        }
      });
    };

    $scope.runQuery = function () {
      $scope.loading = true; // start the spinner

      // clear all column related arrays before we go into async operations.
      $scope.resultColumns.clear();
      $scope.resultKeys.length = 0;

      QueryRequest.async($scope.queryObj, $scope.esUri).then(function (data) {
        $scope.loading = false; // stop the spinner

        // locked in to default ES results structure with this.
        // need to perhaps dynamically find array... could be dicey
        $scope.queryResults.setRecords(data.hits.hits);

        $scope.setResultKeys($scope.queryResults.getRecordByIndex(0));
        $scope.noResults = false;
      });
    };

    $scope.setResultKeys = function(resultObj) {
      $scope.resultKeys = PropertyPathResolver.resultsKeys(resultObj);

      // for now, add all keys as table columns (later want to allow select/deslect of columns)
      //remove this loop.
      for (var i = 0;i < $scope.resultKeys.length; i++) {
        $scope.resultColumns.pushItem($scope.resultKeys[i]);
      }
    }
  })

  /* Ctrler for right column, results container*/
  .controller('ResultsCtrl', function ResultsCtrl($scope, QueryResults, ResultColumns) {
    $scope.showRaw = false;
    $scope.queryResults = QueryResults;
    $scope.resultColumns = ResultColumns;

    // pagination vars
    $scope.currentPage = 0; 
    $scope.pageSize = 100;

    $scope.getItemValue = function (path, obj) {
      // this evals to produce the value of a n-nested deep javascript object
      return eval("obj." + path);
    };

    // pagination funcs
    $scope.setCurrentPage = function (currentPage) {
      $scope.currentPage = currentPage;
    };

    $scope.getNumberAsArray = function (num) {
      if ($scope.queryResults.length() > 0) {
        return new Array(num);  
      }
      else {
        return [];
      }
    };

    $scope.numberOfPages = function() {
      return Math.ceil($scope.queryResults.length() / $scope.pageSize);
    };

    $scope.showPaginator = function() {
      return !$scope.showRaw && ($scope.numberOfPages() > 1);
    }

  });