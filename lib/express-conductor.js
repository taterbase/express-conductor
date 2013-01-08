var fs = require('fs')
  ;

module.exports.init = function(app, options, cb){
  initialize(
      app //Always send app first
    , cb  //and cb second
    , options  //and options third!
    , initControllers
  );

  cb(null, app);  
}

function initControllers(app, options, next){
  //Make sure we are async
  process.nextTick(function(){
    if(options.controllers){
      var controllers = {};

      loadDir(options.controllers, controllers, function(err){
        for(var c in controllers){
          controllers[c].init(app) //Setting routes
        }
        next();
      });
    }
    else
      next();
  });
}

function loadDir(path, entities, cb) {
  cb = cb || function(){};

  var files = fs.readdirSync(path);
  files.forEach(function inspectFile(file) {
    var fullPath = path + '/' + file;
    var stats = fs.statSync(fullPath);
    if (stats.isFile()) {
      matchFile(fullPath, entities);
    } else if (stats.isDirectory()) {
      loadDir(fullPath, entities);
    }
  });

  cb(null, entities);
}

function matchFile(file, entities) {
  var match = /^(.*?\/([A-Za-z_]*))\.js$/.exec(file);
  if (match) {
    var name = match[2].split('_').map(function(v) {
      return v.charAt(0).toUpperCase() + v.slice(1);
    }).join('');
    entities[name] = require(file);
  }
}

function initialize(){
  var args = arguments
    , app = args[0]
    , cb = args[1]
    , options = args[2]
    ;

  delete args[0];
  delete args[1];  
  delete args[2]; //Remove app, cb, and options from args
  
  for(var i in args){
    args[i](app, options, function(err){
      if(err)
        return cb(err);
    });
  } 
}
