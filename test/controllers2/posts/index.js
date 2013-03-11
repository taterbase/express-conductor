"use strict";

module.exports.init = function(conductor) {
  conductor.get(getPosts);
  conductor.get('postId', getPost);
}

function getPosts(req, res, next) {
  res.json({route: '/posts', method: 'get'});
}

function getPost(req, res, next) {
  res.json({route: '/posts/:postId', method: 'get'});
}
