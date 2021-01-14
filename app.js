/**
 * Main application file
 */

'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');
var requestIp = require('request-ip');
var randomIp = require('random-ip');

var app = express();

// HTTP request logger setup
app.use(require('./logger/morgan'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// enable CORS
app.use(cors());
app.use(requestIp.mw());
app.use(function(req, res, next) {
  if (req.clientIp === '::1') { // local test, do mock
    // req.clientIp = randomIp('127.0.0.1', 16, 24);
  } else if (/^::ffff:/.test(req.clientIp)) { // only support ipv4 now
    req.clientIp = req.clientIp.replace(/^::ffff:/, '');
  }

  next();
});

/**
 * Main routing config
 */
app.use('/', require('./routes/index'));
app.use('/app', require('./api/app'));
app.use('/api-doc', express.static(path.join(__dirname, 'apidoc')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err, req, res, next) {
  if (err.name === 'JsonSchemaValidation') {
    // Set a bad request http response status or whatever you want
    res.status(400);

    // Format the response body however you want
    var responseData = {
      statusText: 'Bad Request',
      jsonSchemaValidation: true,
      validations: err.validations // All of your validation information
    };

    // Take into account the content type if your app serves various content types
    if (req.xhr || req.get('Content-Type') === 'application/json') {
      res.json(responseData);
    } else {
      // If this is an html request then you should probably have
      // some type of Bad Request html template to respond with
      res.render('badrequestTemplate', responseData);
    }
  } else {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: app.get('env') === 'development' ? err : {} // print stacktrace for development
    });
  }

});

module.exports = app;