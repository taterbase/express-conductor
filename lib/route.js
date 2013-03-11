"use strict";

var Route = function(app, route) {

  if(!(this instanceof Route))
    return new Route(app, route);

  this._app = app;
  this._route = route;

}

Route.prototype.get = function(method) {
  this._app.get(this._route, method);
}

Route.prototype.put = function(method) {
  this._app.put(this._route, method);
}

Route.prototype.post = function(method) {
  this._app.post(this._route, method);
}

Route.prototype.del = function(method) {
  this._app.del(this._route, method);
}

/* Just in case */
Route.prototype.delete = function(method) {
  this.del(method);
}

module.exports = Route;
