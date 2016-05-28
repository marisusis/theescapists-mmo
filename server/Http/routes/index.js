var router = require('express').Router();
var path = require('path');

var cdir = path.resolve(__dirname + "../../../../client");

router.get('/',function(req,res) {
   res.sendFile(cdir+'/index.html'); 
});

router.get('/*',function(req,res) {
   res.sendFile(cdir+'/'+req.params[0]); 
});

module.exports = router;