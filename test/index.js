/*global it:true describe:true */
"use strict";

var express = require('./mock/express'),
    app = express(),
    expressConductor = require('../lib/express-conductor');

describe('Express Conductor', function(){

  it('should crawl all files and expose routes', function(done){

    expressConductor.init(app, {controllers: __dirname + '/controllers'}, function(err, app){
      app.should.have.property('routes');
      app.routes.should.have.property('/posts');
      app.routes.should.have.property('/posts/:id');
      app.routes.should.have.property('/');
      done(err);
    });

  });

});
