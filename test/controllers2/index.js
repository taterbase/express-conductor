"use strict";

module.exports.init = function(conductor) {
  conductor.get(get);
  conductor.put(put);
  conductor.post(post);
  conductor.del(del);
}

function get(req, res, next) {
  res.json({route: '/', method: 'get'});
}

function put(req, res, next) {
  res.json({route: '/', method: 'put'});
}

function post(req, res, next) {
  res.json({route: '/', method: 'post'});
}

function del(req, res, next) {
  res.json({route: '/', method: 'delete'});
}
