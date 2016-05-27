var log = require('util').log;
log("Starting server...");

var httpsrv = require('./Http');
var gamesrv = require('./Game');

httpsrv.start();
gamesrv(httpsrv.server);
