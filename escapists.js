var program = require('commander');
var nconf = require('nconf');
var prompt = require('prompt');

program.version('0.0.1');

program
    .command('config')
    .description('Configure the game')
    .action(function() {
        prompt.start();
    });

program.parse(process.argv);