var log = require('util').log;
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var path = require('path');

//implement http config
var port = 9500;
app.set('port', port);

app.get('/*',function(req,res) {
  res.sendFile(path.resolve(
__dirname+'../../../client/'+req.params[0]));
  
});

module.exports = {
  start: function() {
    server.listen(port, function(e) {
      log("http server listening on :9500");
    })
  }
}