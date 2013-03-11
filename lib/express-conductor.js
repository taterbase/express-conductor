"use strict";

var fs        = require('fs')
  , waitress  = require('waitress')
  , Conductor = require('./conductor')
  ;

module.exports.init = function(app, options, cb){

  if(!options.hasOwnProperty('useDirPath'))
    console.log('The current way of initializing express-conductor will be deprecated, visit http://github.com/taterbase/express-conductor for more info.')

  if(options.hasOwnProperty('controllers')){
    console.log("The key 'controllers' for route directory is being deprecated, use 'routes' instead. See http://github.com/taterbase/express-controller");

    options.routes = options.controllers
  }

  options.useDirPath = options.useDirPath || false;

  if(options.useDirPath)
    options.conductor = new Conductor(app);

  initControllers(app, options, function(err){
    return cb(err, app);
  });

};

function initControllers(app, options, next){
  //Make sure we are async
  process.nextTick(function(){
    if(options.routes){

      var routes = {}
        , conductor = options.conductor
        ;

      loadDir(options.routes, null, routes, function(err){
        for(var route in routes){

          if(options.useDirPath) {

            var normalizedRoute = route;

            if(route.match('/index') && route.match('/index')['index'] === 0)
              normalizedRoute = '/';
            else
              normalizedRoute = route.replace('/index', '');

            routes[route].init(conductor.attach(normalizedRoute));
          }
          else {
            routes[route].init(app);
          }

        }
        next();
      });
    }
    else
      throw new Error("No routes directory specified");

  });
}

function loadDir(root, path, entities, cb) {
  cb = cb || function(){};
  path = path || root;

  var files = fs.readdirSync(path);
  files.forEach(function inspectFile(file) {
    var fullPath = path + '/' + file;
    var stats = fs.statSync(fullPath);
    if (stats.isFile()) {
      matchFile(root, fullPath, entities);
    } else if (stats.isDirectory()) {
      loadDir(root, fullPath, entities);
    }
  });

  cb(null, entities);
}

function matchFile(root, file, entities) {
  var match = /^(.*?\/([A-Za-z_]*))\.js$/.exec(file);
  if (match) {
    var name = match[1].replace(root, '');
    entities[name] = require(file);
  }
}
