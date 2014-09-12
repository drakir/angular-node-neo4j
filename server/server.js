var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser')
var methodOverride = require('method-override');

var app = express();

/**
 * Development Settings
 */
if (app.get('env') === 'development') {
    console.log("Starting node in development mode.");
    // This will change in production since we'll be using the dist folder
    app.use(express.static(path.join(__dirname, '../client')));
    // This covers serving up the index page
    app.use(express.static(path.join(__dirname, '../client/.tmp')));
    app.use(express.static(path.join(__dirname, '../client/app')));

    // Error Handling
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/**
 * Production Settings
 */
if (app.get('env') === 'production') {
    console.log("Starting node in production mode.");
    // changes it to use the optimized version for production
    app.use(express.static(path.join(__dirname, '/dist')));

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(methodOverride());

var http = require('http').createServer(app);
var io = require('socket.io')(http);
var db = require('./database');

require('./routes/routes')(app, db, io);
require('./routes/parents')(app, db);

var port = 3000;
console.log("App listening on port " + port);
http.listen(port);





