'use strict';

/* Services */
angular.module('voyeurApp.services', [])

  /*
    ResultColumns defaults to all keys in a result record.
    Can be used later to add/remove columns from the tabular format. 
  */
  .factory('ResultColumns', function() {
    var resultColumns = [];
    var ResultColumns = {
      getAll: function() {
        return resultColumns;
      },
      getItemByIndex: function(index) {
        return resultColumns[index];
      },
      clear: function() {
        resultColumns.length = 0;
      },
      pushItem: function(obj) {
        resultColumns.push(obj);
      }
    };
    return ResultColumns;
  })


  .factory('Query', function() {
    // uri needs to get pulled out of here.
    var _queryObj = {
      query: {
        size: 150,
        query: {
          match_all: {}
        }
      }
    };
    
    var Query = {
      get: function() {
        return _queryObj;
      },
      set: function(newQueryobj) {
        // handle json string or object
        if (typeof(newQueryobj) != 'object') {
          _queryObj.query = JSON.parse(newQueryobj);
        }
        else {
          _queryObj.query = newQueryobj;
        }
      },

      stringify: function() {  
        return JSON.stringify(_queryObj, null, 2);
      },
      
      // ace requires binding to a non-obj/array
      // also then requires manual parsing to update
      // model from textarea string
      queryJson: JSON.stringify(_queryObj.query, null, 2),
      

      parse: function(queryJson) {
        return JSON.parse(queryJson);
      }      
    };
    return Query;
  })

  .factory('PropertyPathResolver', function() {
    var keyPaths = [];
    
    var PropertyPathResolver = {
      
      resultsKeys: function(obj) {
        if (typeof obj !== 'object') {
          keyPaths.push(0); // safest bet that the value of this key could be accessed later at the 0 index.
          return keyPaths;
        }
        else {
          return this.iterate(obj, '');
        }
      },

      iterate: function (obj, stack) {
        for (var property in obj) {
          if (obj.hasOwnProperty(property)) { // check we're dealing with an object

            if (typeof obj[property] == "object") { // we have children to process so recurse  
              if (stack === '') { // item at first level, but has children.
                this.iterate(obj[property], property);
              }
              else {
                this.iterate(obj[property], stack + '.' + property);
              }
            }
            else { // no children left, time to push it on the columns array
              if (stack === '') { // first level property so no hierarch to prepend.
                keyPaths.push(property);
              }
              else { // we're at least one level deep in the object hierarchy so prepend path (stack).
                if (isNaN(parseInt(property.charAt(0), 10))) { // if first char in property is not a number
                  keyPaths.push(stack + '.' + property);
                }
                else { // property begins with int, which means it must (by js naming rules + our logic) be an array index
                  keyPaths.push(stack + '[' + property + ']');
                }
              }
            }
          }
        }
        return keyPaths;
      }
    };
    return PropertyPathResolver;
  })

  .factory('QueryResults', function() {
    var queryResults = {};

    var QueryResults = {

      setRecords: function(results) {
        queryResults = results;
      },
      getRecords: function() {
        return queryResults;
      },
      getRecordByIndex: function(index) {
        return queryResults[index];
      },
      length: function() {
        return queryResults.length;
      }
    };
    return QueryResults;
  })


  /* this is used for csv export only at this point but could be useful
     to use this same service for the actual table render  */
  .factory('ResultsTable', function(QueryResults, ResultColumns) {
    function _getItemValue(path, obj) {
      // this evals to produce the value of a n-nested deep javascript object
      return eval("obj." + path); // not sure about perf on this
    }

    function _resultsAsArray() {
      var resultsArray = [];
      // build header row
      var headerRow = {};
      for (var j = 0; j < ResultColumns.getAll().length; j++) {
        var tmpKey = j.toString();
        headerRow[tmpKey] = ResultColumns.getItemByIndex(j);
      }
      resultsArray[0] = headerRow;

      // build rows and columns.  note the i = 1 to exclude header row
      for (var i = 1; i < QueryResults.getRecords().length + 1; i++) { // loop through record rows
        var rowObj = {};
        for (var j = 0; j < ResultColumns.getAll().length; j++) { // loop columns
          var val = _getItemValue(ResultColumns.getItemByIndex(j), QueryResults.getRecords()[i-1]);
          // build the row object (each cell is a key:value pair)
          rowObj[ResultColumns.getItemByIndex(j)] = val;
        }
        resultsArray[i] = rowObj; // set the row object in the array
      }
      return resultsArray;
    }

    var ResultsTable = {
      
      getCsvData: function() {
        var data = _resultsAsArray();
        var csvContent = "data:text/csv;charset=utf-8,";
        // Process the data
        angular.forEach(data, function(row, index){
          var dataString, infoArray;

          if (angular.isArray(row)) {
            infoArray = row;
          } else {
            infoArray = [];
            angular.forEach(row, function(field, key){
              this.push(field);
            }, infoArray);
          }

          dataString = infoArray.join(",");
          csvContent += index < data.length ? dataString + "\n" : dataString;
        });

        return encodeURI(csvContent);
      }

    };
    return ResultsTable;
  })


  .factory('QueryRequest', function($http) {
    var QueryRequest = {
      async: function(queryObj, esUri) {
        // $http returns a promise, which has a then function, which also returns a promise
        var payload = queryObj.get();
        
        var promise = $http.post(esUri, payload.query).then(function(response) {
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
        // Return the promise to the controller
        return promise;
      }
    };
    return QueryRequest;
  });