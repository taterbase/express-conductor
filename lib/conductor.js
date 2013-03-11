"use strict";

var Route = require('./route');

var Conductor = function(app) {

  if(!(this instanceof Conductor))
    return new Conductor();

  this._app = app;

}

Conductor.prototype.attach = function(route) {
  return new Route(this._app, route);
}

module.exports = Conductor;
