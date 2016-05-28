var log = require('util').log;
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var path = require('path');

//implement http config
var port = 8080;
app.set('port', port);
app.use('/',require('./routes/index.js'));

module.exports = {
  start: function() {
    server.listen(port, function(e) {
      log("http server listening on :8080");
    })
  },
  server: server
}