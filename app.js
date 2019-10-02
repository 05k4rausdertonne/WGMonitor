var http = require('http');
var express = require('express');
var app = express();
var sys = require('util');
var fetch = require('node-fetch');
var path = require('path');
var server = require('./server.js');

app.use( express.static( path.join(__dirname, "public") ) );

server.serverInit();

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
});