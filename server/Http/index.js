var log = require('util').log;
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var path = require('path');

//implement http config
app.use('/',require('./routes/index.js'));

module.exports = {
  start: function(port) {
    app.set('port', port);
    server.listen(port, function(e) {
      log("http server listening on :"+port);
    })
  },
  server: server
}