var log = require('util').log;
log("Starting server...");

var httpsrv = require('./Http');

httpsrv.start();