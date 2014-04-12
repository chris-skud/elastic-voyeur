'use strict';

/* Controllers */
angular.module('voyeureApp.controllers', []).
  
  controller('QueryCtrl', function QueryCtrl($scope, QueryResults, QueryObj, SavedQueries, ElasticSearchQuerySvc, PropertyPathResolver, SelectedColumns) {
    $scope.queryObj = QueryObj;
    //$scope.queryObjString = QueryObjString;
    $scope.loading = false;
    
    $scope.queryName = "";
    $scope.resultKeys = [];
    $scope.queryResults = QueryResults;
    $scope.selectedColumns = SelectedColumns;
    $scope.noResults = true;
    $scope.uris = ['http://seer-es-report.prsn.us/seer/activity/search-raw.json']; // probably could keep track
                //'http://seer-es-report.pqa.prsn.us/seer/activity/search-raw.json'];

    $scope.queryObj.uri = $scope.uris[0]; // initialize to first item in uris list.

    $scope.aceLoaded = function(_editor) {
      _editor.on("blur", function() {
        try {
          //$scope.queryObj.set(JSON.parse(_editor.getValue()));
          $scope.queryObj.set(_editor.getValue());

        } 
        catch (e) {
          // An error has occured, handle it, by e.g. logging it
          console.log('error: ' + e.toString())
        }
      });
    };
    //$scope.aceChanged = function(e) {console.log('changed')};

    $scope.saveQuery = function (qName) {
      SavedQueries.add(qName, $scope.queryObj);
      //console.log(SavedQueries.get(qName));
      console.log(SavedQueries.getAll());
    };

    $scope.getSavedQueries = function () {
      //SavedQueries.getSaved
    };

    $scope.runQuery = function () {

      $scope.loading = true; // start the spinner

      // clear all column related arrays before we go into async operations.
      $scope.selectedColumns.clear();
      $scope.resultKeys.length = 0;

      ElasticSearchQuerySvc.async($scope.queryObj).then(function (data) {
        $scope.loading = false; // stop the spinner
        $scope.queryResults.setRecords(data.hits);

        $scope.setResultKeys($scope.queryResults.getRecordByIndex(0)); // populate model for "Add Column" dropdown
        $scope.noResults = false;
      });
    };

    $scope.setResultKeys = function(resultObj) {
      $scope.resultKeys = PropertyPathResolver.resultsKeys(resultObj);
      // for now, add all keys as table columns (later want to allow select/deslect of columns)
      for (var i = 0;i < $scope.resultKeys.length; i++) {
        $scope.selectedColumns.pushItem($scope.resultKeys[i]);  
      }
    }
  })

  /* Ctrler for right column, results container*/
  .controller('ResultsCtrl', function ResultsCtrl($scope, QueryResults, SelectedColumns) {
    $scope.showRaw = false;
    $scope.queryResults = QueryResults;
    $scope.selectedColumns = SelectedColumns;

    // pagination vars
    $scope.currentPage = 0; 
    $scope.pageSize = 100;

    $scope.getItemValue = function (path, obj) {
      // this evals to produce the value of a n-nested deep javascript object
      return eval("obj." + path); // less code but DEAD SLOW
    };

    //$scope.exportResults = function() {}
    $scope.addColumn = function (columnKey) {
      /*
       $scope.selectedColumns.push(columnKey);

       var index = $scope.resultKeys.indexOf(columnKey);
       $scope.resultKeys.splice(index, 1); // will need to deal with this when remove column implemented.
       */
    };

    $scope.removeColumn = function (columnKey) {
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