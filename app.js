var express = require('express')
  , app = express()
  ;

app.get('/', function(req, res){
  res.json({hello: 'world'});
});

app.listen(1337);
