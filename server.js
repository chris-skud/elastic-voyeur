var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var config = require('./config.js');

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

app.route('/query')

  .post(function(req, res, next) {
    /*
    * Make request to ElasticSearch server. The only reason for
    * this node proxy is to handle auth (just basic for now)
    */

    var creds = {};
    creds[config.userName] = config.password;
    
    request({
      method: 'POST',
      uri: req.body.uri,
      json: {query: req.body.query, size:req.body.size},
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