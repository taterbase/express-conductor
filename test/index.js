/*global it:true describe:true */
"use strict";

var express = require('./mock/express'),
    app,
    expressConductor = require('../lib/express-conductor');

describe('Express Conductor', function(){

  it('should crawl all files and expose routes', function(done){

    var app = new express();

    expressConductor.init(app, {controllers: __dirname + '/controllers'}, function(err, app){
      app.should.have.property('routes');
      app.routes.should.have.property('get');
      app.routes.get.should.have.property('/posts');
      app.routes.get.should.have.property('/posts/:id');
      app.routes.get.should.have.property('/');
      done(err);
    });

  });

  describe('2.0 functionality', function(){

    describe('Route building', function(){

      it('should build routes based on folder structure', function(done){

        var app = new express();

        expressConductor.init(app, {controllers: __dirname + '/controllers', useDirPath: true}, function(err, app){

          app.should.have.property('routes');
          app.routes.should.have.property('get');
          app.routes.should.have.property('put');
          app.routes.should.have.property('del');
          app.routes.should.have.property('post');

          app.routes.get.should.have.property('/');
          app.routes.put.should.have.property('/');
          app.routes.post.should.have.property('/');
          app.routes.del.should.have.property('/');

          app.routes.get.should.have.property('/posts');
          app.routes.get.should.have.property('/posts/:postId');

        });

      });

      it('should expose get');
      it('should expose put');
      it('should expose del');
      it('should expose post');

    });

    it('should allow for old 1.0 use');

  });

});
