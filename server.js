var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var config = require('./config.js');

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

/*
*  3 ways you can (relatively) easily use the ElasticVoyeur site.
*  
*  1- run a localhost or jsonp-enabled ElasticSearch instance and set ui to it without using any of the post routes below (just the static routing)
*  2- set URL in the UI to http://<your url>:3000/proxy and set the request uri to your ES server in the /proxy route below
*  3- set URL in UI to http://<your url>:3000/dummydata and you'll get an example ES response to the client.
*/

app.route('/dummydata')
  .post(function(req, res, next) {
    var dummyData = '{"took":2,"timed_out":false,"_shards":{"total":5,"successful":5,"failed":0},"hits":{"total":6,"max_score":1.0,"hits":[{"_index":"movies","_type":"movie","_id":"2","_score":1.0, "_source" : { "title": "Lawrence of Arabia", "director": "David Lean", "year": 1962, "genres": ["Adventure", "Biography", "Drama"]}},{"_index":"movies","_type":"movie","_id":"3","_score":1.0, "_source" : { "title": "To Kill a Mockingbird", "director": "Robert Mulligan", "year": 1962, "genres": ["Crime", "Drama", "Mystery"]}},{"_index":"movies","_type":"movie","_id":"1","_score":1.0, "_source" : { "title": "The Godfather", "director": "Francis Ford Coppola", "year": 1972, "genres": ["Crime", "Drama"]}},{"_index":"movies","_type":"movie","_id":"6","_score":1.0, "_source" : { "title": "The Assassination of Jesse James by the Coward Robert Ford", "director": "Andrew Dominik", "year": 2007, "genres": ["Biography", "Crime", "Drama"]}},{"_index":"movies","_type":"movie","_id":"5","_score":1.0, "_source" : { "title": "Kill Bill: Vol. 1", "director": "Quentin Tarantino", "year": 2003, "genres": ["Action", "Crime", "Thriller"]}},{"_index":"movies","_type":"movie","_id":"4","_score":1.0, "_source" : { "title": "Apocalypse Now", "director": "Francis Ford Coppola", "year": 1979, "genres": ["Drama", "War"]}}]}}';
    res.send(dummyData);
  });

app.route('/proxy')
  .post(function(req, res, next) {
    var creds = {};
    creds[config.userName] = config.password; // this is just one way to authenticate

    var jsonquery = {}
    if (req.body.size) {
      jsonquery['size'] = req.body.size;
    }
    jsonquery['query'] = req.body.query;
    
    request({
      method: 'POST',
      uri: 'http://localhost:9200/_search',
      json: jsonquery,
      headers: creds
    },
    function(error, response, body) {
      if (error) {
        console.log("Error: " + error);
        console.log("Response: " + response);
        console.log("body: " + body);
        res.send(error);
      }
      res.send(body);
    });
  });

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});