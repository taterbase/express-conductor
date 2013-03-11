/*global it:true describe:true */
"use strict";

var express = require('./mock/express')
  , waitress = require('waitress')
  , expressConductor = require('../lib/express-conductor')
  ;

describe('Express Conductor', function(){

  it('should crawl all files and expose routes', function(done){

    var app = new express();

    expressConductor.init(app, {routes: __dirname + '/controllers'}, function(err, app){
      app.should.have.property('routes');
      app.routes.should.have.property('get');
      app.routes.get.should.have.property('/posts');
      app.routes.get.should.have.property('/posts/:id');
      app.routes.get.should.have.property('/');
      done(err);
    });

  });

  describe('2.0 functionality', function(){

    var app = new express();

    before(function(done){
      expressConductor.init(app, {routes: __dirname + '/controllers2', useDirPath: true}, done);
    });

    describe('Route building', function(){

      it('should build routes based on folder structure', function(done){

        var next = waitress(4, done);

        app.makeRequest('/', 'get', null, function(err, result){
          result.route.should.equal('/');
          result.method.should.equal('get');
          next(err);
        });

        app.makeRequest('/', 'put', null, function(err, result){
          result.route.should.equal('/');
          result.method.should.equal('put');
          next(err);
        });

        app.makeRequest('/', 'post', null, function(err, result){
          result.route.should.equal('/');
          result.method.should.equal('post');
          next(err);
        });

        app.makeRequest('/', 'del', null, function(err, result){
          result.route.should.equal('/');
          result.method.should.equal('delete');
          next(err);
        });

      });

      it('should allow params defined inside of files');

      it('should allow params defined in file name');

      it('should allow params defined in folder name');

    });

    it('should allow for old 1.0 use');

  });

});
