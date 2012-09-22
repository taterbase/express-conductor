var express = require('express')
  , path = require('path')
  , http = require('http')
  , PORT = process.env.PORT || 1337
  ;

var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
  res.locals = {
    title: "Welcome"
  };

  res.render('index');
});

http.createServer(app).listen(PORT, function(){
  console.log("Express server listening on port " + PORT);
});
