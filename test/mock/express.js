"use strict";

function App() {
  if(!(this instanceof App))
    return new App();

  this.routes = {
    'get': {}
  , 'put': {}
  , 'del': {}
  , 'post': {}
  };


}

App.prototype.get = function(route, action) {
  this.routes.get[route] = action;
};

App.prototype.put = function(route, action) {
  this.routes.put[route] = action;
};

App.prototype.del = function(route, action) {
  this.routes.del[route] = action;
};

App.prototype.post = function(route, action) {
  this.routes.post[route] = action;
};

/*********
  Data: {
    params: Array
  , query: Object
  , body: String
  }
*********/
App.prototype.makeRequest = function(route, method, data, cb) {
  var res = new Res(cb);
  this.routes[method](req, res, null);
};

module.exports = App;

function Res(cb) {

  Res.prototype.json = function(data) {
    cb(null, JSON.stringify(data));
  };

  return this;

}

