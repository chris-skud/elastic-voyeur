var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var config = require('./config.js');

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));


/*
* Would love to get away from any server-side proxy
* for this app but might be needed to ease cross-orgin and/or
* auth cases. Not currently using it for localhost ES testing.
*/


app.route('/_search')

  .post(function(req, res, next) {
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