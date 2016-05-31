var program = require('commander');
var nconf = require('nconf');
var q = require('q');
var log = require('util').log;

nconf.argv()
    .env()
    .file({
        file: __dirname + '/config.json'
    });

nconf.defaults({
    http: {
        
    }
});

program
.version('0.0.1')
    .option('-d, --debug','Run in debug mode');

program
    .command('config')
    .description('Configure the game')
    .action(function() {
        var prompt = require('prompt');
    });

program
    .command('start')
    .description('Start the game')
    .action(function(options) {
        require('./server');
    });

program.parse(process.argv);