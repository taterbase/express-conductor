#express-conductor

A library for moving your routes/controllers out of your app file.

##Usage:

Require express-conductor and after configuring your app file, pass it in detailing the location of your routes and controllers.

```javascript
var express = require('express')
  , path = require('path')
  , http = require('http')
  , PORT = process.env.PORT || 1337
  , expressConductor = require('express-conductor')
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

//Initialize expressConductor and listen to port
expressConductor.init(app, {controllers: __dirname + '/controllers'}, function(err, app){
  http.createServer(app).listen(PORT, function(){
    console.log("Express server listening on port " + PORT);
  });
});
```

Inside your routes/controllers folder you can structure your files however you want. 
Express-conductor will traverse folders and grab any file. You can have a simple file layout

```
controllers
|
|-- index.js
|
|-- posts.js
```

Or you can have a nested structure to imitate actions

```
controllers
|
|-- Posts
|    |
|    |-- show.js
|    |
|    |-- create.js
|    |
|    |-- etc...
|
|-- Comments
    |
    |-- show.js
    |
    |-- create.js
    | 
    |-- etc...
```

Express-conductor will grab them all. Just expose an init function and define your routes accordingly.

```javascript
exports.module.init = function(app){
  app.get('/posts/:id', showPost);
};

function showPost(req, res){
  //Show post
}
```

##License
MIT
