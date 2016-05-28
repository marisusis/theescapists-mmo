var log = require('util').log;


module.exports = function(app) {
 var io = require('socket.io')(app);
  log('starting socket.io server...')
  io.on('connection',function(socket) {
    log('a user connected');
    socket.on('help',function(d) {
      log('[HELP]: '+d);
    })
  });
  
}