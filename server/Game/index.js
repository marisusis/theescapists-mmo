var s = require('socket.io')



module.exports = {
  start: function() {
    var io = s.listen(8000);
    io.on('connection',function(socket) {
   console.log('connection'); 
    });
  }
}