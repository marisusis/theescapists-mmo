var log = require('util').log;
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

//implement http config
var port = 9500;
app.set('port', port);

module.exports = {
  start: function() {
    server.listen(port, function(e) {
      log("http server listening on :9500");
    })
  }
}