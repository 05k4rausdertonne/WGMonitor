var http = require('http');
var express = require('express');
var app = express();
var sys = require('util');
var path = require('path');

app.use( express.static( path.join(__dirname, "public") ) );

/*http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The date and time are currently: " + dt.myDateTime());
  res.end();
}).listen(8080);*/

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
});