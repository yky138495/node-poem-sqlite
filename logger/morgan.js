/**
 * Created by ymg on 9/8/20.
 */

'use strict';

var FileStreamRotator = require('file-stream-rotator');
var fs = require('fs');
var path = require('path');
var moment = require('moment');
var morgan = require('morgan');

var logDirectory = path.join(__dirname, '../log');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false,
  max_logs: '7d'
});

// morgan date format
morgan.token('date', function() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
});

if(process.env.NODE_ENV === 'development') {
  module.exports = morgan('dev');
} else {
  module.exports = morgan('combined', {stream: accessLogStream});
}
